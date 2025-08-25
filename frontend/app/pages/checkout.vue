<template>
  <div class="checkout-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">Checkout</h1>
        <p class="page-subtitle">Complete your order</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>

      <!-- Empty Cart -->
      <div v-else-if="isEmpty" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>Your cart is empty</h3>
        <p>Add some items to your cart before checkout.</p>
        <NuxtLink to="/products" class="btn btn-primary">
          Continue Shopping
        </NuxtLink>
      </div>

      <!-- Checkout Form -->
      <div v-else class="checkout-layout">
        <!-- Checkout Form -->
        <div class="checkout-form">
          <form @submit.prevent="handleSubmit" class="form-container">
            <!-- Customer Information -->
            <div class="form-section">
              <h2 class="section-title">Customer Information</h2>
              
              <div class="form-grid">
                <div class="form-group">
                  <label for="customerName" class="form-label">Full Name</label>
                  <input 
                    id="customerName"
                    v-model="form.customerName"
                    type="text"
                    class="form-input"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="customerEmail" class="form-label">Email Address</label>
                  <input 
                    id="customerEmail"
                    v-model="form.customerEmail"
                    type="email"
                    class="form-input"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="form-section">
              <h2 class="section-title">Shipping Address</h2>
              
              <div class="form-group">
                <label for="street" class="form-label">Street Address</label>
                <input 
                  id="street"
                  v-model="form.shippingAddress.street"
                  type="text"
                  class="form-input"
                  required
                >
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label for="city" class="form-label">City</label>
                  <input 
                    id="city"
                    v-model="form.shippingAddress.city"
                    type="text"
                    class="form-input"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="state" class="form-label">State</label>
                  <input 
                    id="state"
                    v-model="form.shippingAddress.state"
                    type="text"
                    class="form-input"
                    required
                  >
                </div>
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label for="zipCode" class="form-label">ZIP Code</label>
                  <input 
                    id="zipCode"
                    v-model="form.shippingAddress.zipCode"
                    type="text"
                    class="form-input"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="country" class="form-label">Country</label>
                  <select 
                    id="country"
                    v-model="form.shippingAddress.country"
                    class="form-select"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="form-section">
              <h2 class="section-title">Payment Information</h2>
              
              <div class="form-group">
                <label for="cardNumber" class="form-label">Card Number</label>
                <input 
                  id="cardNumber"
                  v-model="form.payment.cardNumber"
                  type="text"
                  class="form-input"
                  placeholder="1234 5678 9012 3456"
                  required
                >
              </div>
              
              <div class="form-grid">
                <div class="form-group">
                  <label for="expiryDate" class="form-label">Expiry Date</label>
                  <input 
                    id="expiryDate"
                    v-model="form.payment.expiryDate"
                    type="text"
                    class="form-input"
                    placeholder="MM/YY"
                    required
                  >
                </div>
                
                <div class="form-group">
                  <label for="cvv" class="form-label">CVV</label>
                  <input 
                    id="cvv"
                    v-model="form.payment.cvv"
                    type="text"
                    class="form-input"
                    placeholder="123"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="form-actions">
              <button 
                type="submit" 
                class="btn btn-primary btn-large w-full"
                :disabled="submitting"
              >
                <span v-if="submitting">Processing...</span>
                <span v-else>Place Order - ${{ (total * 1.08).toFixed(2) }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="order-summary">
          <div class="summary-card">
            <h2 class="summary-title">Order Summary</h2>
            
            <!-- Order Items -->
            <div class="order-items">
              <div 
                v-for="item in items" 
                :key="item.id"
                class="order-item"
              >
                <div class="item-image">
                  <img :src="item.image" :alt="item.name" class="product-image">
                </div>
                
                <div class="item-details">
                  <h4 class="item-name">{{ item.name }}</h4>
                  <p class="item-quantity">Qty: {{ item.quantity }}</p>
                </div>
                
                <div class="item-price">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>
            
            <!-- Order Totals -->
            <div class="order-totals">
              <div class="total-item">
                <span class="total-label">Subtotal ({{ itemCount }} items)</span>
                <span class="total-value">${{ total.toFixed(2) }}</span>
              </div>
              <div class="total-item">
                <span class="total-label">Shipping</span>
                <span class="total-value">Free</span>
              </div>
              <div class="total-item">
                <span class="total-label">Tax</span>
                <span class="total-value">${{ (total * 0.08).toFixed(2) }}</span>
              </div>
              
              <div class="total-final">
                <span class="final-label">Total</span>
                <span class="final-value">${{ (total * 1.08).toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="summary-note">
              <p>Free shipping on orders over $100</p>
              <p>Estimated delivery: 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Stores
const cartStore = useCartStore()

// Router
const router = useRouter()

// Reactive state
const submitting = ref(false)

// Form data
const form = ref({
  customerName: '',
  customerEmail: '',
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  },
  payment: {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  }
})

// Computed
const loading = computed(() => cartStore.loading)
const items = computed(() => cartStore.items)
const total = computed(() => cartStore.total)
const itemCount = computed(() => cartStore.itemCount)
const isEmpty = computed(() => cartStore.isEmpty)

// Methods
const handleSubmit = async () => {
  submitting.value = true
  
  try {
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now().toString().slice(-8)
    
    // Clear cart after successful checkout
    cartStore.clearCart()
    
    // Redirect to confirmation page
    await router.push(`/checkout/confirmation/${orderNumber}`)
  } catch (error) {
    console.error('Checkout failed:', error)
    // You could show an error message to the user here
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  padding: 40px 0;
  background-color: #F5F6FA;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 36px;
  margin-bottom: 12px;
  color: #2D2D2D;
}

.page-subtitle {
  font-size: 18px;
  color: #7B7B7B;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: #7B7B7B;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E5E7EB;
  border-top: 4px solid #FF6B35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  color: #7B7B7B;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #2D2D2D;
}

.empty-state p {
  color: #7B7B7B;
  margin-bottom: 24px;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
}

.checkout-form {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #2D2D2D;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E7EB;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #2D2D2D;
}

.form-input,
.form-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px;
  background-color: #FFFFFF;
  transition: all 0.2s ease-in-out;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #0A3D62;
  box-shadow: 0 0 0 3px rgba(10, 61, 98, 0.1);
}

.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #E5E7EB;
}

.order-summary {
  position: sticky;
  top: 100px;
}

.summary-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.summary-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #2D2D2D;
}

.order-items {
  margin-bottom: 24px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #E5E7EB;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #F5F6FA;
  flex-shrink: 0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #2D2D2D;
  margin-bottom: 4px;
  line-height: 1.4;
}

.item-quantity {
  font-size: 12px;
  color: #7B7B7B;
}

.item-price {
  font-size: 14px;
  font-weight: 600;
  color: #2D2D2D;
}

.order-totals {
  border-top: 2px solid #E5E7EB;
  padding-top: 16px;
  margin-bottom: 24px;
}

.total-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.total-label {
  font-size: 14px;
  color: #7B7B7B;
}

.total-value {
  font-size: 14px;
  font-weight: 600;
  color: #2D2D2D;
}

.total-final {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
  margin-top: 16px;
}

.final-label {
  font-size: 18px;
  font-weight: 600;
  color: #2D2D2D;
}

.final-value {
  font-size: 24px;
  font-weight: 700;
  color: #2D2D2D;
}

.summary-note {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
}

.summary-note p {
  font-size: 12px;
  color: #7B7B7B;
  margin-bottom: 4px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .checkout-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .order-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 24px 0;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .page-subtitle {
    font-size: 16px;
  }
  
  .checkout-form {
    padding: 24px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .order-item {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
  }
}
</style>
