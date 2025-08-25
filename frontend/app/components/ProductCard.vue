<template>
  <div class="product-card">
    <!-- Product Image -->
    <div class="product-image-container">
      <NuxtImg 
        :src="product.imageUrl || '/images/placeholder-product.jpg'" 
        :alt="product.name"
        class="product-image"
        loading="lazy"
        format="webp"
        quality="80"
      />
      
      <!-- Stock Badge -->
      <div v-if="product.stockQuantity <= 0" class="stock-badge out-of-stock">
        Out of Stock
      </div>
      <div v-else-if="product.stockQuantity < 5" class="stock-badge low-stock">
        Low Stock
      </div>
      
      <!-- Quick Actions -->
      <div class="quick-actions">
        <button 
          @click="handleAddToCart"
          class="quick-action-btn primary"
          :disabled="product.stockQuantity <= 0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="product-info">
      <!-- Category -->
      <div class="product-category">
        {{ product.category }}
      </div>

      <!-- Product Name -->
      <NuxtLink :to="`/products/${product.id}`" class="product-name">
        {{ product.name }}
      </NuxtLink>

      <!-- SKU -->
      <div class="product-sku">
        SKU: {{ product.sku }}
      </div>

      <!-- Price -->
      <div class="product-price">
        <span class="current-price">${{ formatPrice(product.price) }}</span>
      </div>

      <!-- Stock Info -->
      <div class="stock-info">
        <span v-if="product.stockQuantity > 0" class="in-stock">
          {{ product.stockQuantity }} in stock
        </span>
        <span v-else class="out-of-stock-text">
          Out of stock
        </span>
      </div>

      <!-- Specifications Preview -->
      <div v-if="product.specifications && Object.keys(product.specifications).length > 0" class="specs-preview">
        <div v-for="(value, key) in getSpecsPreview()" :key="key" class="spec-item">
          <span class="spec-label">{{ key }}:</span>
          <span class="spec-value">{{ value }}</span>
        </div>
      </div>
    </div>

    <!-- Product Actions -->
    <div class="product-actions">
      <button 
        @click="handleAddToCart"
        class="btn btn-primary w-full"
        :disabled="product.stockQuantity <= 0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="mr-2">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" 
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock' }}
      </button>
      
      <NuxtLink :to="`/products/${product.id}`" class="btn btn-outline w-full">
        View Details
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['add-to-cart'])

// Methods
const formatPrice = (price) => {
  // Ensure price is a number and handle null/undefined
  const numPrice = parseFloat(price) || 0
  return numPrice.toFixed(2)
}

const getSpecsPreview = () => {
  if (!props.product.specifications) return {}
  
  const specs = props.product.specifications
  const preview = {}
  
  // Get first 2 specifications for preview
  const keys = Object.keys(specs).slice(0, 2)
  keys.forEach(key => {
    preview[key] = specs[key]
  })
  
  return preview
}

const handleAddToCart = () => {
  if (props.product.stockQuantity > 0) {
    emit('add-to-cart', props.product)
  }
}
</script>

<style scoped>
.product-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: #F5F6FA;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.stock-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
}

.stock-badge.out-of-stock {
  background-color: #991B1B;
  color: white;
}

.stock-badge.low-stock {
  background-color: #FF6B35;
  color: white;
}

.quick-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease-in-out;
}

.product-card:hover .quick-actions {
  opacity: 1;
  transform: translateX(0);
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(8px);
}

.quick-action-btn.primary {
  background-color: rgba(255, 107, 53, 0.9);
  color: white;
}

.quick-action-btn:hover {
  transform: scale(1.05);
}

.quick-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-info {
  padding: 20px;
}

.product-category {
  font-size: 12px;
  color: #7B7B7B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #2D2D2D;
  text-decoration: none;
  line-height: 1.4;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-name:hover {
  color: #0A3D62;
}

.product-sku {
  font-size: 12px;
  color: #7B7B7B;
  margin-bottom: 12px;
}

.product-price {
  margin-bottom: 12px;
}

.current-price {
  font-size: 20px;
  font-weight: 700;
  color: #0A3D62;
}

.stock-info {
  margin-bottom: 12px;
}

.in-stock {
  font-size: 14px;
  color: #059669;
  font-weight: 500;
}

.out-of-stock-text {
  font-size: 14px;
  color: #991B1B;
  font-weight: 500;
}

.specs-preview {
  margin-bottom: 16px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 4px;
}

.spec-label {
  color: #7B7B7B;
  font-weight: 500;
}

.spec-value {
  color: #2D2D2D;
  font-weight: 400;
}

.product-actions {
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-info {
    padding: 16px;
  }
  
  .product-actions {
    padding: 0 16px 16px;
  }
  
  .quick-actions {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
