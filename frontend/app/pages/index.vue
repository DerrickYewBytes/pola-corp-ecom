<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Premium Drone Parts for
              <span class="text-accent">Professional Pilots</span>
            </h1>
            <p class="hero-subtitle">
              Discover high-quality motors, propellers, flight controllers, and
              more. Built for performance, designed for reliability.
            </p>
            <div class="hero-actions">
              <NuxtLink to="/products" class="btn btn-primary btn-large">
                Shop Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="categories-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Shop by Category</h2>
          <p class="section-subtitle">
            Find exactly what you need for your drone project
          </p>
        </div>

        <div class="categories-grid">
          <div
            v-for="category in categories"
            :key="category"
            class="category-card"
            @click="navigateToCategory(category)"
          >
            <div class="category-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="category-name">{{ category }}</h3>
            <p class="category-description">
              High-quality {{ category.toLowerCase() }} for your drone
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="bestsellers-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Best Sellers</h2>
          <p class="section-subtitle">Our most popular products</p>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading products...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <p>{{ error }}</p>
          <button @click="fetchProducts" class="btn btn-primary">
            Try Again
          </button>
        </div>

        <div v-else class="products-carousel">
          <ProductCard
            v-for="product in bestSellers"
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
          />
        </div>

        <div class="section-actions">
          <NuxtLink to="/products" class="btn btn-outline">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Promotional Banner -->
    <section class="promo-section">
      <div class="container">
        <div class="promo-content">
          <div class="promo-text">
            <h2 class="promo-title">Free Shipping on Orders Over $50</h2>
            <p class="promo-subtitle">
              Get your drone parts delivered fast and free
            </p>
            <NuxtLink to="/products" class="btn btn-accent">
              Shop Now
            </NuxtLink>
          </div>
          <div class="promo-image">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What Our Customers Say</h2>
          <p class="section-subtitle">Real feedback from drone enthusiasts</p>
        </div>

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-rating">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="testimonial-text">
              "Excellent quality motors and fast shipping. My drone performance
              improved significantly!"
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <div class="avatar-placeholder">AC</div>
              </div>
              <div class="author-info">
                <h4 class="author-name">Alex Chen</h4>
                <p class="author-title">FPV Racing Pilot</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="testimonial-text">
              "Great selection of propellers and excellent customer service.
              Highly recommended!"
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <div class="avatar-placeholder">SJ</div>
              </div>
              <div class="author-info">
                <h4 class="author-name">Sarah Johnson</h4>
                <p class="author-title">Aerial Photographer</p>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-rating">
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
              <span class="star">★</span>
            </div>
            <p class="testimonial-text">
              "Reliable batteries and flight controllers. Perfect for
              professional drone operations."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <div class="avatar-placeholder">MR</div>
              </div>
              <div class="author-info">
                <h4 class="author-name">Mike Rodriguez</h4>
                <p class="author-title">Commercial Drone Operator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h2 class="newsletter-title">Stay Updated</h2>
            <p class="newsletter-subtitle">
              Get the latest product releases, drone tips, and exclusive offers
            </p>
          </div>
          <div class="newsletter-form">
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="email-input"
                @keyup.enter="subscribeNewsletter"
              />
              <button @click="subscribeNewsletter" class="btn btn-primary">
                Subscribe
              </button>
            </div>
            <p class="newsletter-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  // Stores
  const productsStore = useProductsStore();
  const cartStore = useCartStore();

  // Reactive state
  const email = ref('');
  const loading = ref(false);
  const error = ref(null);

  // Computed
  const products = computed(() => productsStore.products);
  const categories = computed(() => productsStore.categories);

  const bestSellers = computed(() => {
    // Get products with stock and sort by some criteria (could be sales, rating, etc.)
    return products.value
      .filter(product => product.stockQuantity > 0)
      .slice(0, 8); // Show top 8 products
  });

  // Methods
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
      await productsStore.fetchProducts();
      await productsStore.fetchCategories();
    } catch (err) {
      console.error('Error fetching products:', err);
      error.value = err.message || 'Failed to load products';
    } finally {
      loading.value = false;
    }
  };

  const navigateToCategory = category => {
    navigateTo(`/products?category=${encodeURIComponent(category)}`);
  };

  const handleAddToCart = product => {
    cartStore.addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price || 0),
      image: product.image || product.imageUrl || '',
      quantity: 1,
    });
  };

  const subscribeNewsletter = () => {
    if (email.value && email.value.includes('@')) {
      // Here you would typically send the email to your backend
      console.log('Subscribing email:', email.value);
      alert('Thank you for subscribing!');
      email.value = '';
    } else {
      alert('Please enter a valid email address');
    }
  };

  // Lifecycle
  onMounted(() => {
    fetchProducts();
  });
</script>

<style scoped>
  .homepage {
    min-height: 100vh;
  }

  /* Hero Section */
  .hero-section {
    background:
      linear-gradient(rgba(10, 61, 98, 0.2), rgba(30, 74, 107, 0.5)),
      url('/images/hero.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0;
  }

  .hero-title {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 24px;
    color: white;
  }

  .hero-subtitle {
    font-size: 20px;
    line-height: 1.6;
    margin-bottom: 32px;
    opacity: 0.9;
    color: white;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
  }

  /* Categories Section */
  .categories-section {
    padding: 80px 0;
    background-color: #f5f6fa;
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-title {
    font-size: 36px;
    font-weight: 700;
    color: #2d2d2d;
    margin-bottom: 16px;
  }

  .section-subtitle {
    font-size: 18px;
    color: #7b7b7b;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .category-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  .category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .category-icon {
    margin-bottom: 16px;
    color: #ff6b35;
  }

  .category-name {
    font-size: 20px;
    font-weight: 600;
    color: #2d2d2d;
    margin-bottom: 8px;
  }

  .category-description {
    font-size: 14px;
    color: #7b7b7b;
  }

  /* Best Sellers Section */
  .bestsellers-section {
    padding: 80px 0;
    background-color: #ffffff;
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
    text-align: center;
    padding: 40px 0;
    color: #7b7b7b;
  }

  .products-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
  }

  .section-actions {
    text-align: center;
  }

  /* Promotional Banner */
  .promo-section {
    background: linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%);
    color: white;
    padding: 60px 0;
  }

  .promo-content {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 48px;
    align-items: center;
  }

  .promo-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  .promo-subtitle {
    font-size: 18px;
    margin-bottom: 24px;
    opacity: 0.9;
  }

  .promo-image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .promo-image svg {
    color: rgba(255, 255, 255, 0.8);
  }

  /* Testimonials Section */
  .testimonials-section {
    padding: 80px 0;
    background-color: #f5f6fa;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 32px;
  }

  .testimonial-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .testimonial-rating {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }

  .star {
    color: #ff6b35;
    font-size: 20px;
  }

  .testimonial-text {
    font-size: 16px;
    line-height: 1.6;
    color: #2d2d2d;
    margin-bottom: 24px;
    font-style: italic;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-placeholder {
    font-size: 16px;
    font-weight: 600;
    color: #7b7b7b;
  }

  .author-name {
    font-size: 16px;
    font-weight: 600;
    color: #2d2d2d;
    margin-bottom: 4px;
  }

  .author-title {
    font-size: 14px;
    color: #7b7b7b;
  }

  /* Newsletter Section */
  .newsletter-section {
    background-color: #0a3d62;
    color: white;
    padding: 60px 0;
  }

  .newsletter-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .newsletter-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  .newsletter-subtitle {
    font-size: 18px;
    opacity: 0.9;
  }

  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    display: flex;
    gap: 12px;
  }

  .email-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 16px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    outline: none;
  }

  .email-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .email-input:focus {
    border-color: #ff6b35;
    background-color: rgba(255, 255, 255, 0.15);
  }

  .newsletter-note {
    font-size: 14px;
    opacity: 0.7;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-content {
      max-width: 600px;
      align-items: flex-start;
      text-align: left;
    }

    .hero-title {
      font-size: 36px;
    }

    .newsletter-content {
      grid-template-columns: 1fr;
      gap: 32px;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      padding: 60px 0;
    }

    .hero-title {
      font-size: 28px;
    }

    .hero-subtitle {
      font-size: 18px;
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .section-title {
      font-size: 28px;
    }

    .categories-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .products-carousel {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .promo-content {
      grid-template-columns: 1fr;
      gap: 32px;
      text-align: center;
    }

    .testimonials-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .form-group {
      flex-direction: column;
    }
  }
</style>
