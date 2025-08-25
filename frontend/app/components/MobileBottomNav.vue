<template>
  <nav class="mobile-bottom-nav">
    <div class="nav-container">
      <NuxtLink
        to="/"
        class="nav-item"
        :class="{ active: $route.path === '/' }"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <polyline
            points="9,22 9,12 15,12 15,22"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="nav-label">Home</span>
      </NuxtLink>

      <NuxtLink
        to="/products"
        class="nav-item"
        :class="{ active: $route.path.startsWith('/products') }"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 10a4 4 0 01-8 0"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="nav-label">Products</span>
      </NuxtLink>

      <NuxtLink
        to="/cart"
        class="nav-item"
        :class="{ active: $route.path === '/cart' }"
      >
        <div class="cart-icon-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span v-if="cartItemCount > 0" class="cart-badge">{{
            cartItemCount
          }}</span>
        </div>
        <span class="nav-label">Cart</span>
      </NuxtLink>

      <NuxtLink
        to="/account"
        class="nav-item"
        :class="{ active: $route.path.startsWith('/account') }"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="nav-label">Account</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
  const cartStore = useCartStore();
  const cartItemCount = computed(() => cartStore.itemCount);
</script>

<style scoped>
  .mobile-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    border-top: 1px solid #e5e7eb;
    z-index: 1000;
    display: none;
  }

  .nav-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px 0;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 8px 4px;
    text-decoration: none;
    color: #7b7b7b;
    transition: all 0.2s ease-in-out;
  }

  .nav-item.active {
    color: #ff6b35;
  }

  .nav-label {
    font-size: 12px;
    font-weight: 500;
    margin-top: 4px;
  }

  .cart-icon-wrapper {
    position: relative;
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ff6b35;
    color: white;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .mobile-bottom-nav {
      display: block;
    }
  }
</style>
