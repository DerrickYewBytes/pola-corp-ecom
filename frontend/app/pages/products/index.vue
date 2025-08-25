<template>
  <div class="products-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">Products</h1>
        <p class="page-subtitle">
          Find the perfect drone parts for your project
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          class="error-icon"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="2"
          />
          <line
            x1="15"
            y1="9"
            x2="9"
            y2="15"
            stroke="currentColor"
            stroke-width="2"
          />
          <line
            x1="9"
            y1="9"
            x2="15"
            y2="15"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
        <h3>Error loading products</h3>
        <p>{{ error }}</p>
        <button @click="fetchProducts" class="btn btn-primary">
          Try Again
        </button>
      </div>

      <!-- Products Content -->
      <div v-else class="products-content">
        <div class="products-layout">
          <!-- Sidebar Filters -->
          <aside class="filters-sidebar">
            <div class="filters-card">
              <h2 class="filters-title">Filters</h2>

              <!-- Categories Filter -->
              <div class="filter-section">
                <h3 class="filter-section-title">Categories</h3>
                <div class="filter-options">
                  <label class="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      :checked="selectedCategory === ''"
                      @change="setSelectedCategory('')"
                      class="filter-checkbox"
                    />
                    <span class="filter-label">All Categories</span>
                  </label>
                  <label
                    v-for="category in categories"
                    :key="category"
                    class="filter-option"
                  >
                    <input
                      type="radio"
                      name="category"
                      :value="category"
                      :checked="selectedCategory === category"
                      @change="setSelectedCategory(category)"
                      class="filter-checkbox"
                    />
                    <span class="filter-label">{{ category }}</span>
                  </label>
                </div>
              </div>

              <!-- Price Range Filter -->
              <div class="filter-section">
                <h3 class="filter-section-title">Price Range</h3>
                <div class="price-range">
                  <input
                    v-model.number="priceRange.min"
                    type="number"
                    placeholder="Min"
                    class="price-input"
                    min="0"
                  />
                  <span class="price-separator">-</span>
                  <input
                    v-model.number="priceRange.max"
                    type="number"
                    placeholder="Max"
                    class="price-input"
                    min="0"
                  />
                </div>
              </div>

              <!-- Stock Filter -->
              <div class="filter-section">
                <h3 class="filter-section-title">Availability</h3>
                <label class="filter-option">
                  <input
                    type="checkbox"
                    v-model="inStockOnly"
                    class="filter-checkbox"
                  />
                  <span class="filter-label">In Stock Only</span>
                </label>
              </div>

              <!-- Clear Filters -->
              <button
                @click="clearFilters"
                class="btn btn-outline w-full"
                :disabled="!hasActiveFilters"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="products-main">
            <!-- Top Controls -->
            <div class="top-controls">
              <!-- Search Bar -->
              <div class="search-section">
                <div class="search-input-wrapper">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="search-icon"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                    <path
                      d="m21 21-4.35-4.35"
                      stroke="currentColor"
                      stroke-width="2"
                    />
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search products..."
                    class="search-input"
                    @input="handleSearch"
                  />
                  <button
                    v-if="searchQuery"
                    @click="clearSearch"
                    class="clear-search-btn"
                    title="Clear search"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="15"
                        y1="9"
                        x2="9"
                        y2="15"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="9"
                        y1="9"
                        x2="15"
                        y2="15"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="results-info">
                <span class="results-count">{{ totalItems }} products</span>
                <span v-if="selectedCategory" class="results-category"
                  >in {{ selectedCategory }}</span
                >
                <span v-if="debouncedSearchQuery" class="results-search"
                  >matching "{{ debouncedSearchQuery }}"</span
                >
                <span class="results-page"
                  >Page {{ currentPage }} of {{ totalPages }}</span
                >
              </div>

              <div class="controls-right">
                <!-- Sort Dropdown -->
                <select v-model="sortBy" class="sort-select">
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>

                <!-- View Toggle -->
                <div class="view-toggle">
                  <button
                    @click="viewMode = 'grid'"
                    class="view-btn"
                    :class="{ active: viewMode === 'grid' }"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                  <button
                    @click="viewMode = 'list'"
                    class="view-btn"
                    :class="{ active: viewMode === 'list' }"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <line
                        x1="8"
                        y1="6"
                        x2="21"
                        y2="6"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="8"
                        y1="12"
                        x2="21"
                        y2="12"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="8"
                        y1="18"
                        x2="21"
                        y2="18"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="3"
                        y1="6"
                        x2="3.01"
                        y2="6"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="3"
                        y1="12"
                        x2="3.01"
                        y2="12"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <line
                        x1="3"
                        y1="18"
                        x2="3.01"
                        y2="18"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Products Grid -->
            <div
              v-if="products.length > 0"
              class="products-grid"
              :class="viewMode"
            >
              <ProductCard
                v-for="product in sortedProducts"
                :key="product.id"
                :product="product"
                @add-to-cart="handleAddToCart"
              />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination">
              <button
                @click="productsStore.prevPage()"
                :disabled="!hasPrev"
                class="pagination-btn"
                :class="{ disabled: !hasPrev }"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Previous
              </button>

              <div class="pagination-pages">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="productsStore.goToPage(page)"
                  class="page-btn"
                  :class="{ active: page === currentPage }"
                >
                  {{ page }}
                </button>
              </div>

              <button
                @click="productsStore.nextPage()"
                :disabled="!hasNext"
                class="pagination-btn"
                :class="{ disabled: !hasNext }"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            <!-- Empty State -->
            <div
              v-else-if="!loading && products.length === 0"
              class="empty-state"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                class="empty-icon"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <polyline
                  points="3.27,6.96 12,12.01 20.73,6.96"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <line
                  x1="12"
                  y1="22.08"
                  x2="12"
                  y2="12"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria.</p>
              <button @click="clearFilters" class="btn btn-primary">
                Clear Filters
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Stores
  const productsStore = useProductsStore();
  const cartStore = useCartStore();

  // Reactive state
  const viewMode = ref('grid');
  const sortBy = ref('name');
  const priceRange = ref({ min: null, max: null });
  const inStockOnly = ref(false);
  const searchQuery = ref('');
  const debouncedSearchQuery = ref('');

  // Computed
  const loading = computed(() => productsStore.loading);
  const error = computed(() => productsStore.error);
  const products = computed(() => productsStore.products);
  const categories = computed(() => productsStore.categories);
  const selectedCategory = computed(() => productsStore.selectedCategory);

  // Pagination state
  const currentPage = computed(() => productsStore.currentPage);
  const totalPages = computed(() => productsStore.totalPages);
  const totalItems = computed(() => productsStore.totalItems);
  const hasNext = computed(() => productsStore.hasNext);
  const hasPrev = computed(() => productsStore.hasPrev);

  const sortedProducts = computed(() => {
    const sorted = [...products.value];

    switch (sortBy.value) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case 'name':
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  });

  const hasActiveFilters = computed(() => {
    return (
      selectedCategory.value ||
      priceRange.value.min !== null ||
      priceRange.value.max !== null ||
      inStockOnly.value ||
      debouncedSearchQuery.value.trim()
    );
  });

  const visiblePages = computed(() => {
    const pages = [];
    const maxVisible = 5;
    const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages.value, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  // Methods
  const fetchProducts = () => {
    productsStore.fetchProducts(1, 20);
  };

  const fetchCategories = () => {
    productsStore.fetchCategories();
  };

  const setSelectedCategory = async category => {
    await productsStore.setSelectedCategory(category);
  };

  const clearFilters = async () => {
    await productsStore.clearFilters();
    priceRange.value = { min: null, max: null };
    inStockOnly.value = false;
    sortBy.value = 'name';
    searchQuery.value = '';
    debouncedSearchQuery.value = '';
  };

  const handleSearch = async () => {
    await productsStore.setSearchQuery(debouncedSearchQuery.value);
  };

  const clearSearch = async () => {
    searchQuery.value = '';
    debouncedSearchQuery.value = '';
    await productsStore.setSearchQuery('');
  };

  // Debounce function
  let searchTimeout = null;

  // Watch for search query changes and debounce
  watch(searchQuery, newQuery => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = newQuery;
    }, 300); // 300ms debounce delay
  });

  const handleAddToCart = product => {
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: 1,
    });
  };

  // Lifecycle
  onMounted(() => {
    fetchProducts();
    fetchCategories();
  });
</script>

<style scoped>
  .products-page {
    padding: 40px 0;
    background-color: #f5f6fa;
    min-height: 100vh;
  }

  .page-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .page-title {
    font-size: 36px;
    margin-bottom: 12px;
    color: #2d2d2d;
  }

  .page-subtitle {
    font-size: 18px;
    color: #7b7b7b;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    color: #7b7b7b;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    text-align: center;
  }

  .error-icon {
    color: #991b1b;
    margin-bottom: 16px;
  }

  .error-state h3 {
    font-size: 20px;
    margin-bottom: 8px;
    color: #2d2d2d;
  }

  .error-state p {
    color: #7b7b7b;
    margin-bottom: 24px;
  }

  .products-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 32px;
  }

  .filters-sidebar {
    position: sticky;
    top: 100px;
    height: fit-content;
  }

  .filters-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .filters-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #2d2d2d;
  }

  .filter-section {
    margin-bottom: 24px;
  }

  .filter-section-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #2d2d2d;
  }

  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filter-option {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .filter-checkbox {
    width: 16px;
    height: 16px;
    accent-color: #ff6b35;
  }

  .filter-label {
    font-size: 14px;
    color: #2d2d2d;
  }

  .price-range {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .price-input {
    flex: 1;
    min-width: 0;
    padding: 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    background-color: #ffffff;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
  }

  .price-input:focus {
    outline: none;
    border-color: #0a3d62;
  }

  .price-separator {
    color: #7b7b7b;
    font-weight: 500;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .top-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 16px 24px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    gap: 16px;
  }

  .search-section {
    flex: 1;
    max-width: 400px;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    color: #7b7b7b;
    z-index: 1;
  }

  .search-input {
    width: 100%;
    padding: 12px 40px 12px 40px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    background-color: #ffffff;
    transition: border-color 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #0a3d62;
  }

  .clear-search-btn {
    position: absolute;
    right: 8px;
    background: none;
    border: none;
    color: #7b7b7b;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: color 0.2s ease;
  }

  .clear-search-btn:hover {
    color: #991b1b;
  }

  .results-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .results-count {
    font-weight: 500;
    color: #2d2d2d;
  }

  .results-category {
    color: #7b7b7b;
    font-size: 14px;
  }

  .results-search {
    color: #0a3d62;
    font-size: 14px;
    font-weight: 500;
  }

  .results-page {
    color: #7b7b7b;
    font-size: 14px;
  }

  .results-count {
    font-size: 16px;
    font-weight: 600;
    color: #2d2d2d;
  }

  .results-category {
    font-size: 14px;
    color: #7b7b7b;
  }

  .controls-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .sort-select {
    padding: 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    background-color: #ffffff;
    cursor: pointer;
  }

  .sort-select:focus {
    outline: none;
    border-color: #0a3d62;
  }

  .view-toggle {
    display: flex;
    gap: 4px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    padding: 4px;
  }

  .view-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    color: #7b7b7b;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .view-btn:hover {
    background-color: #f5f6fa;
  }

  .view-btn.active {
    background-color: #ff6b35;
    color: white;
  }

  .products-grid {
    display: grid;
    gap: 24px;
  }

  .products-grid.grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .products-grid.list {
    grid-template-columns: 1fr;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 0;
    text-align: center;
  }

  .empty-icon {
    color: #7b7b7b;
    margin-bottom: 16px;
  }

  .empty-state h3 {
    font-size: 20px;
    margin-bottom: 8px;
    color: #2d2d2d;
  }

  .empty-state p {
    color: #7b7b7b;
    margin-bottom: 24px;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .products-layout {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .filters-sidebar {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .products-page {
      padding: 24px 0;
    }

    .page-title {
      font-size: 28px;
    }

    .page-subtitle {
      font-size: 16px;
    }

    .top-controls {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }

    .controls-right {
      justify-content: space-between;
    }

    .products-grid.grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }
  }

  /* Pagination Styles */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 40px;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .pagination-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background-color: #ffffff;
    color: #2d2d2d;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-btn:hover:not(.disabled) {
    border-color: #0a3d62;
    color: #0a3d62;
  }

  .pagination-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-pages {
    display: flex;
    gap: 8px;
  }

  .page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background-color: #ffffff;
    color: #2d2d2d;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .page-btn:hover {
    border-color: #0a3d62;
    color: #0a3d62;
  }

  .page-btn.active {
    background-color: #0a3d62;
    border-color: #0a3d62;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    .pagination {
      flex-direction: column;
      gap: 12px;
    }

    .pagination-pages {
      order: 2;
    }

    .pagination-btn {
      order: 1;
    }
  }
</style>
