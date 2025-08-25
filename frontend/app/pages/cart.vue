<template>
  <div class="cart-page">
    <div class="container">
      <!-- Header -->
      <div class="page-header">
        <h1 class="page-title">Shopping Cart</h1>
        <p class="page-subtitle">
          {{ itemCount }} item{{ itemCount !== 1 ? 's' : '' }} in your cart
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading your cart...</p>
      </div>

      <!-- Empty Cart -->
      <div v-else-if="isEmpty" class="empty-state">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          class="empty-icon"
        >
          <path
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h3>Your cart is empty</h3>
        <p>Start shopping to add items to your cart.</p>
        <NuxtLink to="/products" class="btn btn-primary">
          Continue Shopping
        </NuxtLink>
      </div>

      <!-- Cart Items -->
      <div v-else class="cart-layout">
        <!-- Cart Items List -->
        <div class="cart-items">
          <div class="cart-items-header">
            <h2 class="cart-items-title">Cart Items</h2>
            <button
              v-if="itemCount > 0"
              @click="clearCart"
              class="clear-cart-btn"
            >
              Clear Cart
            </button>
          </div>

          <div class="cart-items-list">
            <div v-for="item in items" :key="item.id" class="cart-item-card">
              <div class="cart-item-image">
                <img :src="item.image" :alt="item.name" class="item-image" />
              </div>

              <div class="cart-item-details">
                <h3 class="item-name">{{ item.name }}</h3>
                <p class="item-price">
                  ${{ Number(item.price || 0).toFixed(2) }}
                </p>
              </div>

              <div class="cart-item-quantity">
                <div class="quantity-controls">
                  <button
                    @click="updateQuantity(item.id, item.quantity - 1)"
                    class="quantity-btn"
                    :disabled="item.quantity <= 1"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  <span class="quantity-display">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item.id, item.quantity + 1)"
                    class="quantity-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="cart-item-total">
                <p class="item-total-price">
                  ${{ (Number(item.price || 0) * item.quantity).toFixed(2) }}
                </p>
              </div>

              <div class="cart-item-actions">
                <button
                  @click="removeItem(item.id)"
                  class="remove-btn"
                  title="Remove item"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-summary">
          <div class="summary-card">
            <h2 class="summary-title">Order Summary</h2>

            <div class="summary-items">
              <div class="summary-item">
                <span class="summary-label"
                  >Subtotal ({{ itemCount }} items)</span
                >
                <span class="summary-value"
                  >${{ Number(total || 0).toFixed(2) }}</span
                >
              </div>
              <div class="summary-item">
                <span class="summary-label">Shipping</span>
                <span class="summary-value">Free</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Tax</span>
                <span class="summary-value"
                  >${{ (Number(total || 0) * 0.08).toFixed(2) }}</span
                >
              </div>
            </div>

            <div class="summary-total">
              <span class="total-label">Total</span>
              <span class="total-value"
                >${{ (Number(total || 0) * 1.08).toFixed(2) }}</span
              >
            </div>

            <button
              @click="navigateToCheckout"
              class="btn btn-primary btn-large w-full"
              :disabled="itemCount === 0"
              :class="{ 'opacity-50 cursor-not-allowed': itemCount === 0 }"
            >
              Proceed to Checkout
            </button>

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
  const cartStore = useCart();

  // Computed
  const loading = computed(() => cartStore.loading);
  const items = computed(() => cartStore.items);
  const total = computed(() => cartStore.total);
  const itemCount = computed(() => cartStore.itemCount);
  const isEmpty = computed(() => cartStore.isEmpty);

  // Router
  const router = useRouter();

  // Methods
  const updateQuantity = (id, quantity) => {
    cartStore.updateQuantity(id, quantity);
  };

  const removeItem = id => {
    cartStore.removeItem(id);
  };

  const clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      cartStore.clearCart();
    }
  };

  const navigateToCheckout = () => {
    console.log('Navigate to checkout clicked');
    console.log('Item count:', itemCount.value);
    console.log('Cart items:', items.value);
    if (itemCount.value > 0) {
      console.log('Navigating to checkout...');
      router.push('/checkout');
    } else {
      console.log('Cart is empty, cannot navigate to checkout');
    }
  };
</script>

<style scoped>
  .cart-page {
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

  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 32px;
  }

  .cart-items {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .cart-items-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .cart-items-title {
    font-size: 24px;
    font-weight: 600;
    color: #2d2d2d;
  }

  .clear-cart-btn {
    background: none;
    border: none;
    color: #ff6b35;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }

  .clear-cart-btn:hover {
    color: #e55a2b;
  }

  .cart-items-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .cart-item-card {
    display: grid;
    grid-template-columns: 80px 1fr auto auto auto;
    gap: 16px;
    align-items: center;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }

  .cart-item-card:hover {
    border-color: #ff6b35;
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.1);
  }

  .cart-item-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f5f6fa;
  }

  .item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cart-item-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item-name {
    font-size: 16px;
    font-weight: 600;
    color: #2d2d2d;
    line-height: 1.4;
  }

  .item-price {
    font-size: 14px;
    color: #7b7b7b;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 4px;
  }

  .quantity-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background-color: #f5f6fa;
    color: #7b7b7b;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .quantity-btn:hover:not(:disabled) {
    background-color: #ff6b35;
    color: white;
  }

  .quantity-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .quantity-display {
    min-width: 32px;
    text-align: center;
    font-weight: 600;
    color: #2d2d2d;
  }

  .item-total-price {
    font-size: 18px;
    font-weight: 700;
    color: #2d2d2d;
  }

  .remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background-color: #fee2e2;
    color: #991b1b;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .remove-btn:hover {
    background-color: #fee2e2;
    color: #991b1b;
    transform: scale(1.05);
  }

  .order-summary {
    position: sticky;
    top: 100px;
  }

  .summary-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .summary-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
    color: #2d2d2d;
  }

  .summary-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .summary-label {
    font-size: 14px;
    color: #7b7b7b;
  }

  .summary-value {
    font-size: 14px;
    font-weight: 600;
    color: #2d2d2d;
  }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 2px solid #e5e7eb;
    margin-bottom: 24px;
  }

  .total-label {
    font-size: 18px;
    font-weight: 600;
    color: #2d2d2d;
  }

  .total-value {
    font-size: 24px;
    font-weight: 700;
    color: #2d2d2d;
  }

  .summary-note {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  }

  .summary-note p {
    font-size: 12px;
    color: #7b7b7b;
    margin-bottom: 4px;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .cart-layout {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .order-summary {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .cart-page {
      padding: 24px 0;
    }

    .page-title {
      font-size: 28px;
    }

    .page-subtitle {
      font-size: 16px;
    }

    .cart-item-card {
      grid-template-columns: 1fr;
      gap: 12px;
      text-align: center;
    }

    .cart-item-image {
      width: 100%;
      height: 120px;
      margin: 0 auto;
    }

    .quantity-controls {
      justify-content: center;
    }

    .cart-item-actions {
      display: flex;
      justify-content: center;
    }
  }
</style>
