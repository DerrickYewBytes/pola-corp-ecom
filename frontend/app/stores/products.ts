import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { Product, PaginatedResponse } from '~/types/api'
import { getProducts, getCategories } from '~/composables/useApi'

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const selectedCategory = ref<string>('')
  
  // Pagination state
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const itemsPerPage = ref(20)
  const hasNext = ref(false)
  const hasPrev = ref(false)

  // Getters
  const filteredProducts = computed(() => {
    let filtered = products.value

    // Filter by category
    if (selectedCategory.value) {
      filtered = filtered.filter(product => product.category === selectedCategory.value)
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      )
    }

    return filtered
  })

  const getProductById = computed(() => {
    return (id: number) => products.value.find(product => product.id === id)
  })

  // Actions
  const fetchProducts = async (page: number = 1, limit: number = 20) => {
    loading.value = true
    error.value = null
    try {
      console.log('Store: Fetching products...')
      const params: any = { page, limit }
      
      if (selectedCategory.value) {
        params.category = selectedCategory.value
      }
      if (searchQuery.value) {
        params.search = searchQuery.value
      }
      
      const response = await getProducts(params)
      console.log('Store: API Response:', response)
      
      products.value = response.items
      currentPage.value = response.page
      totalPages.value = response.totalPages
      totalItems.value = response.total
      itemsPerPage.value = response.limit
      hasNext.value = response.hasNext
      hasPrev.value = response.hasPrev
      
      console.log('Store: Products loaded:', products.value.length)
      console.log('Store: Pagination info:', {
        page: currentPage.value,
        totalPages: totalPages.value,
        totalItems: totalItems.value,
        hasNext: hasNext.value,
        hasPrev: hasPrev.value
      })
    } catch (err) {
      console.error('Store: Error fetching products:', err)
      error.value = err instanceof Error ? err.message : 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      categories.value = await getCategories()
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const setSearchQuery = async (query: string) => {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page
    await fetchProducts(1, itemsPerPage.value)
  }

  const setSelectedCategory = async (category: string) => {
    selectedCategory.value = category
    currentPage.value = 1 // Reset to first page
    await fetchProducts(1, itemsPerPage.value)
  }

  const clearFilters = async () => {
    searchQuery.value = ''
    selectedCategory.value = ''
    currentPage.value = 1
    await fetchProducts(1, itemsPerPage.value)
  }

  const goToPage = async (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      await fetchProducts(page, itemsPerPage.value)
    }
  }

  const nextPage = async () => {
    if (hasNext.value) {
      await goToPage(currentPage.value + 1)
    }
  }

  const prevPage = async () => {
    if (hasPrev.value) {
      await goToPage(currentPage.value - 1)
    }
  }

  return {
    // State
    products: readonly(products),
    categories: readonly(categories),
    loading: readonly(loading),
    error: readonly(error),
    searchQuery: readonly(searchQuery),
    selectedCategory: readonly(selectedCategory),

    // Pagination state
    currentPage: readonly(currentPage),
    totalPages: readonly(totalPages),
    totalItems: readonly(totalItems),
    itemsPerPage: readonly(itemsPerPage),
    hasNext: readonly(hasNext),
    hasPrev: readonly(hasPrev),

    // Getters
    filteredProducts,
    getProductById,

    // Actions
    fetchProducts,
    fetchCategories,
    setSearchQuery,
    setSelectedCategory,
    clearFilters,
    goToPage,
    nextPage,
    prevPage
  }
})
