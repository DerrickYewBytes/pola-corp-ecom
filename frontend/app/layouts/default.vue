<template>
  <div class="app-layout">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation -->
    <MobileBottomNav />
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">Shop</h3>
            <ul class="footer-links">
              <li><NuxtLink to="/products">All Products</NuxtLink></li>
              <li><NuxtLink to="/categories/motors">Motors</NuxtLink></li>
              <li><NuxtLink to="/categories/propellers">Propellers</NuxtLink></li>
              <li><NuxtLink to="/categories/batteries">Batteries</NuxtLink></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Support</h3>
            <ul class="footer-links">
              <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
              <li><NuxtLink to="/shipping">Shipping Info</NuxtLink></li>
              <li><NuxtLink to="/returns">Returns</NuxtLink></li>
              <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Company</h3>
            <ul class="footer-links">
              <li><NuxtLink to="/about">About Us</NuxtLink></li>
              <li><NuxtLink to="/blog">Blog</NuxtLink></li>
              <li><NuxtLink to="/careers">Careers</NuxtLink></li>
              <li><NuxtLink to="/press">Press</NuxtLink></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Connect</h3>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" stroke-width="2"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
            
            <div class="newsletter-signup">
              <h4 class="newsletter-title">Stay Updated</h4>
              <p class="newsletter-text">Get the latest drone parts and tips</p>
              <div class="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  class="newsletter-input"
                >
                <button class="newsletter-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="copyright">&copy; 2024 DroneParts. All rights reserved.</p>
            <div class="footer-bottom-links">
              <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
              <NuxtLink to="/terms">Terms of Service</NuxtLink>
              <NuxtLink to="/sitemap">Sitemap</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No additional logic needed for layout
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F5F6FA;
}

.main-content {
  flex: 1;
}

.footer {
  background-color: #0A3D62;
  color: white;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 48px;
  padding: 64px 0 48px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease-in-out;
}

.footer-links a:hover {
  color: #FF6B35;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease-in-out;
}

.social-link:hover {
  border-color: #FF6B35;
  color: #FF6B35;
  transform: translateY(-2px);
}

.newsletter-signup {
  margin-top: 16px;
}

.newsletter-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
}

.newsletter-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
}

.newsletter-form {
  display: flex;
  gap: 8px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-input:focus {
  outline: none;
  border-color: #FF6B35;
  background-color: rgba(255, 255, 255, 0.15);
}

.newsletter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: #FF6B35;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.newsletter-btn:hover {
  background-color: #e55a2b;
  transform: translateY(-1px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.footer-bottom-links {
  display: flex;
  gap: 24px;
}

.footer-bottom-links a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.footer-bottom-links a:hover {
  color: #FF6B35;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 48px 0 32px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-bottom-links {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-bottom-links {
    flex-direction: column;
    gap: 12px;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-btn {
    width: 100%;
  }
}
</style>
