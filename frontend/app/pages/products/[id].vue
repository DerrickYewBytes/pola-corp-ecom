<template>
  <div class="product-detail-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading product details...</p>
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
        <h3>Error loading product</h3>
        <p>{{ error }}</p>
        <button @click="fetchProduct" class="btn btn-primary">Try Again</button>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="product-content">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <NuxtLink to="/" class="breadcrumb-item">Home</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <NuxtLink to="/products" class="breadcrumb-item">Products</NuxtLink>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item active">{{ product.name }}</span>
        </nav>

        <div class="product-layout">
          <!-- Product Images -->
          <div class="product-images">
            <div class="main-image-container">
              <NuxtImg
                :src="product.imageUrl || '/images/placeholder-product.jpg'"
                :alt="product.name"
                class="main-image"
                loading="lazy"
                format="webp"
                quality="90"
              />
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <!-- Category -->
            <div class="product-category">
              {{ product.category }}
            </div>

            <!-- Product Name -->
            <h1 class="product-name">{{ product.name }}</h1>

            <!-- SKU -->
            <div class="product-sku">SKU: {{ product.sku }}</div>

            <!-- Price -->
            <div class="product-price">
              <span class="current-price"
                >${{ formatPrice(product.price) }}</span
              >
            </div>

            <!-- Stock Status -->
            <div class="stock-status">
              <div v-if="product.stockQuantity > 0" class="stock-info in-stock">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ product.stockQuantity }} in stock</span>
              </div>
              <div v-else class="stock-info out-of-stock">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                <span>Out of stock</span>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="quantity-section">
              <label class="quantity-label">Quantity:</label>
              <div class="quantity-controls">
                <button
                  @click="decreaseQuantity"
                  class="quantity-btn"
                  :disabled="quantity <= 1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  :max="product.stockQuantity"
                  class="quantity-input"
                  :disabled="product.stockQuantity <= 0"
                />
                <button
                  @click="increaseQuantity"
                  class="quantity-btn"
                  :disabled="
                    quantity >= product.stockQuantity ||
                    product.stockQuantity <= 0
                  "
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <line
                      x1="12"
                      y1="5"
                      x2="12"
                      y2="19"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <line
                      x1="5"
                      y1="12"
                      x2="19"
                      y2="12"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
              <button
                @click="handleAddToCart"
                class="btn btn-primary btn-large w-full"
                :disabled="product.stockQuantity <= 0"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="mr-2"
                >
                  <path
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock' }}
              </button>

              <button
                @click="handleBuyNow"
                class="btn btn-accent btn-large w-full"
                :disabled="product.stockQuantity <= 0"
              >
                Buy Now
              </button>
            </div>

            <!-- Shipping Info -->
            <div class="shipping-info">
              <div class="shipping-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Free shipping on orders over $50</span>
              </div>
              <div class="shipping-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>30-day return policy</span>
              </div>
              <div class="shipping-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Details Tabs -->
        <div class="product-tabs">
          <div class="tabs-header">
            <button
              @click="activeTab = 'description'"
              class="tab-btn"
              :class="{ active: activeTab === 'description' }"
            >
              Description
            </button>
            <button
              @click="activeTab = 'specifications'"
              class="tab-btn"
              :class="{ active: activeTab === 'specifications' }"
            >
              Specifications
            </button>
            <button
              @click="activeTab = 'shipping'"
              class="tab-btn"
              :class="{ active: activeTab === 'shipping' }"
            >
              Shipping & Returns
            </button>
          </div>

          <div class="tab-content">
            <!-- Description Tab -->
            <div v-if="activeTab === 'description'" class="tab-panel">
              <div class="description-content">
                <p>{{ product.description }}</p>
              </div>
            </div>

            <!-- Specifications Tab -->
            <div v-if="activeTab === 'specifications'" class="tab-panel">
              <div class="specifications-content">
                <div
                  v-if="
                    product.specifications &&
                    Object.keys(product.specifications).length > 0
                  "
                  class="specs-grid"
                >
                  <div
                    v-for="(value, key) in product.specifications"
                    :key="key"
                    class="spec-item"
                  >
                    <span class="spec-label">{{ key }}:</span>
                    <span class="spec-value">{{ value }}</span>
                  </div>
                </div>
                <div v-else class="no-specs">
                  <p>No specifications available for this product.</p>
                </div>
              </div>
            </div>

            <!-- Shipping Tab -->
            <div v-if="activeTab === 'shipping'" class="tab-panel">
              <div class="shipping-content">
                <h3>Shipping Information</h3>
                <ul>
                  <li>Free shipping on orders over $50</li>
                  <li>Standard shipping: 3-5 business days</li>
                  <li>Express shipping: 1-2 business days</li>
                  <li>International shipping available</li>
                </ul>

                <h3>Return Policy</h3>
                <ul>
                  <li>30-day return policy</li>
                  <li>Items must be in original condition</li>
                  <li>Return shipping costs may apply</li>
                  <li>Contact customer service for returns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="related-products">
          <h2 class="section-title">Related Products</h2>
          <div class="related-products-grid">
            <ProductCard
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :product="relatedProduct"
              @add-to-cart="handleAddToCart"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Route
  const route = useRoute();
  const router = useRouter();

  // Stores
  const cartStore = useCartStore();
  const productsStore = useProductsStore();

  // Reactive state
  const product = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const quantity = ref(1);
  const activeTab = ref('description');
  const relatedProducts = ref([]);

  // Computed
  const productId = computed(() => parseInt(route.params.id));

  // Methods
  const formatPrice = price => {
    // Ensure price is a number and handle null/undefined
    const numPrice = parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  const fetchProduct = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { getProduct } = await import('~/composables/useApi');
      product.value = await getProduct(productId.value);

      // Fetch related products from the same category
      if (product.value && product.value.category) {
        const { getProducts } = await import('~/composables/useApi');
        const response = await getProducts({
          category: product.value.category,
        });
        relatedProducts.value = response.items
          .filter(p => p.id !== product.value.id)
          .slice(0, 4);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      error.value = err.message || 'Failed to load product';
    } finally {
      loading.value = false;
    }
  };

  const increaseQuantity = () => {
    if (product.value && quantity.value < product.value.stockQuantity) {
      quantity.value++;
    }
  };

  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--;
    }
  };

  const handleAddToCart = () => {
    if (product.value && product.value.stockQuantity > 0) {
      cartStore.addItem({
        id: product.value.id,
        name: product.value.name,
        price: product.value.price,
        image: product.value.imageUrl,
        quantity: quantity.value,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  // Lifecycle
  onMounted(() => {
    fetchProduct();
  });

  // Watch for route changes
  watch(
    () => route.params.id,
    () => {
      if (route.params.id) {
        quantity.value = 1;
        fetchProduct();
      }
    }
  );
</script>

<style scoped>
  .product-detail-page {
    padding: 40px 0;
    background-color: #f5f6fa;
    min-height: 100vh;
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

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
    font-size: 14px;
  }

  .breadcrumb-item {
    color: #7b7b7b;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .breadcrumb-item:hover {
    color: #0a3d62;
  }

  .breadcrumb-item.active {
    color: #2d2d2d;
    font-weight: 500;
  }

  .breadcrumb-separator {
    color: #7b7b7b;
  }

  .product-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-bottom: 48px;
  }

  .product-images {
    position: sticky;
    top: 100px;
  }

  .main-image-container {
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .product-category {
    font-size: 14px;
    color: #7b7b7b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .product-name {
    font-size: 32px;
    font-weight: 700;
    color: #2d2d2d;
    line-height: 1.2;
  }

  .product-sku {
    font-size: 14px;
    color: #7b7b7b;
  }

  .product-price {
    margin-bottom: 8px;
  }

  .current-price {
    font-size: 36px;
    font-weight: 700;
    color: #0a3d62;
  }

  .stock-status {
    margin-bottom: 8px;
  }

  .stock-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
  }

  .stock-info.in-stock {
    color: #059669;
  }

  .stock-info.out-of-stock {
    color: #991b1b;
  }

  .quantity-section {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .quantity-label {
    font-size: 16px;
    font-weight: 500;
    color: #2d2d2d;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .quantity-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background-color: #f5f6fa;
    color: #2d2d2d;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .quantity-btn:hover:not(:disabled) {
    background-color: #e5e7eb;
  }

  .quantity-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .quantity-input {
    width: 60px;
    height: 40px;
    border: none;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    background-color: #ffffff;
  }

  .quantity-input:focus {
    outline: none;
  }

  .quantity-input:disabled {
    background-color: #f5f6fa;
    color: #7b7b7b;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .btn-large {
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
  }

  .shipping-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
  }

  .shipping-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: #2d2d2d;
  }

  .shipping-item svg {
    color: #059669;
    flex-shrink: 0;
  }

  .product-tabs {
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 48px;
  }

  .tabs-header {
    display: flex;
    border-bottom: 2px solid #e5e7eb;
  }

  .tab-btn {
    flex: 1;
    padding: 20px 24px;
    border: none;
    background: none;
    font-size: 16px;
    font-weight: 500;
    color: #7b7b7b;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .tab-btn:hover {
    background-color: #f5f6fa;
  }

  .tab-btn.active {
    color: #0a3d62;
    border-bottom: 2px solid #0a3d62;
    background-color: #f5f6fa;
  }

  .tab-content {
    padding: 32px;
  }

  .tab-panel {
    min-height: 200px;
  }

  .description-content p {
    font-size: 16px;
    line-height: 1.6;
    color: #2d2d2d;
  }

  .specs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
  }

  .spec-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: #f5f6fa;
    border-radius: 8px;
  }

  .spec-label {
    font-weight: 500;
    color: #2d2d2d;
  }

  .spec-value {
    color: #7b7b7b;
  }

  .no-specs {
    text-align: center;
    color: #7b7b7b;
    padding: 40px 0;
  }

  .shipping-content h3 {
    font-size: 18px;
    font-weight: 600;
    color: #2d2d2d;
    margin-bottom: 12px;
    margin-top: 24px;
  }

  .shipping-content h3:first-child {
    margin-top: 0;
  }

  .shipping-content ul {
    list-style: none;
    padding: 0;
    margin-bottom: 24px;
  }

  .shipping-content li {
    padding: 8px 0;
    color: #2d2d2d;
    position: relative;
    padding-left: 20px;
  }

  .shipping-content li::before {
    content: '•';
    color: #ff6b35;
    font-weight: bold;
    position: absolute;
    left: 0;
  }

  .related-products {
    margin-top: 48px;
  }

  .section-title {
    font-size: 24px;
    font-weight: 600;
    color: #2d2d2d;
    margin-bottom: 24px;
  }

  .related-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .product-layout {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .product-images {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .product-detail-page {
      padding: 24px 0;
    }

    .product-name {
      font-size: 24px;
    }

    .current-price {
      font-size: 28px;
    }

    .tabs-header {
      flex-direction: column;
    }

    .tab-btn {
      border-bottom: 1px solid #e5e7eb;
    }

    .tab-btn.active {
      border-bottom: 2px solid #0a3d62;
    }

    .tab-content {
      padding: 20px;
    }

    .specs-grid {
      grid-template-columns: 1fr;
    }

    .related-products-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }
  }
</style>
