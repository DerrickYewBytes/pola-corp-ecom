<template>
  <header class="header bg-surface shadow-soft sticky top-0 z-50">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <div class="logo-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 4L20 12L28 16L20 20L16 28L12 20L4 16L12 12L16 4Z"
                  fill="#0A3D62"
                />
                <circle cx="16" cy="16" r="2" fill="#FF6B35" />
              </svg>
            </div>
            <span class="logo-text font-poppins font-semibold text-primary"
              >Pola Corp</span
            >
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop hidden md:flex items-center gap-6">
          <NuxtLink to="/cart" class="nav-icon-btn relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                stroke="#7B7B7B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span v-if="cartItemCount > 0" class="cart-badge">{{
              cartItemCount
            }}</span>
          </NuxtLink>
        </nav>

        <!-- Mobile Navigation -->
        <nav class="nav-mobile md:hidden flex items-center gap-4">
          <NuxtLink to="/cart" class="nav-icon-btn relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                stroke="#7B7B7B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span v-if="cartItemCount > 0" class="cart-badge">{{
              cartItemCount
            }}</span>
          </NuxtLink>

          <button class="nav-icon-btn" @click="toggleMobileMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="#7B7B7B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu Overlay -->
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
        <div class="mobile-menu-container">
          <div class="mobile-menu-header">
            <h3 class="font-poppins font-semibold text-primary">Menu</h3>
            <button class="close-menu-btn" @click="closeMobileMenu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="#7B7B7B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <nav class="mobile-menu-nav">
            <NuxtLink to="/" class="mobile-menu-item" @click="closeMobileMenu"
              >Home</NuxtLink
            >
            <NuxtLink
              to="/products"
              class="mobile-menu-item"
              @click="closeMobileMenu"
              >Products</NuxtLink
            >
            <NuxtLink
              to="/categories"
              class="mobile-menu-item"
              @click="closeMobileMenu"
              >Categories</NuxtLink
            >
            <NuxtLink
              to="/account"
              class="mobile-menu-item"
              @click="closeMobileMenu"
              >Account</NuxtLink
            >
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  const isMobileMenuOpen = ref(false);

  // Cart store integration
  const cartStore = useCartStore();
  const cartItemCount = computed(() => cartStore.itemCount);

  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
  };
</script>

<style scoped>
  .header {
    border-bottom: 1px solid #e5e7eb;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    gap: 24px;
  }

  .logo-link {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .logo-text {
    font-size: 24px;
  }

  .search-container {
    flex: 1;
    max-width: 480px;
    margin: 0 24px;
  }

  .nav-icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
  }

  .nav-icon-btn:hover {
    background-color: #f5f6fa;
  }

  .cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background-color: #ff6b35;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    text-align: center;
  }

  .profile-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 8px 0;
    min-width: 160px;
    z-index: 1000;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 12px 16px;
    text-decoration: none;
    color: #2d2d2d;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    background: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .dropdown-item:hover {
    background-color: #f5f6fa;
  }

  .dropdown-divider {
    margin: 8px 0;
    border: none;
    border-top: 1px solid #e5e7eb;
  }

  .mobile-search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 100px;
  }

  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .mobile-menu-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 280px;
    height: 100%;
    background-color: #ffffff;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .close-menu-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s ease-in-out;
  }

  .close-menu-btn:hover {
    background-color: #f5f6fa;
  }

  .mobile-menu-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-menu-item {
    display: block;
    padding: 16px 0;
    text-decoration: none;
    color: #2d2d2d;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #e5e7eb;
    transition: color 0.2s ease-in-out;
  }

  .mobile-menu-item:hover {
    color: #0a3d62;
  }

  @media (max-width: 768px) {
    .header-content {
      height: 64px;
      gap: 16px;
    }

    .logo-text {
      font-size: 20px;
    }
  }

  /* Ensure mobile navigation is hidden on desktop */
  @media (min-width: 768px) {
    .nav-mobile {
      display: none !important;
    }
  }

  /* Ensure desktop navigation is hidden on mobile */
  @media (max-width: 767px) {
    .nav-desktop {
      display: none !important;
    }
  }

  /* Ensure desktop navigation has horizontal layout when visible */
  @media (min-width: 768px) {
    .nav-desktop {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
    }
  }

  /* Ensure mobile navigation has horizontal layout when visible */
  @media (max-width: 767px) {
    .nav-mobile {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
    }
  }
</style>
