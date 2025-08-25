import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])
  const loading = ref(false)

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const total = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  // Actions
  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const existingItem = items.value.find(i => i.id === item.id)
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1
    } else {
      items.value.push({
        ...item,
        quantity: item.quantity || 1
      })
    }
    
    // Save to localStorage
    saveToStorage()
  }

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find(i => i.id === id)
    if (item) {
      if (quantity <= 0) {
        removeItem(id)
      } else {
        item.quantity = quantity
        saveToStorage()
      }
    }
  }

  const removeItem = (id: number) => {
    const index = items.value.findIndex(i => i.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToStorage()
    }
  }

  const clearCart = () => {
    items.value = []
    saveToStorage()
  }

  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('cart', JSON.stringify(items.value))
    }
  }

  const loadFromStorage = () => {
    if (process.client) {
      const stored = localStorage.getItem('cart')
      if (stored) {
        try {
          items.value = JSON.parse(stored)
        } catch (error) {
          console.error('Failed to load cart from storage:', error)
          items.value = []
        }
      }
    }
  }

  // Initialize cart from storage
  if (process.client) {
    loadFromStorage()
  }

  return {
    // State
    items,
    loading,

    // Getters
    itemCount,
    total,
    isEmpty,

    // Actions
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    loadFromStorage
  }
})
