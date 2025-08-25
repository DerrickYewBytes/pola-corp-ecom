export default defineNuxtPlugin(() => {
  // This plugin runs only on the client side
  if (process.client) {
    // Wait for the app to be ready
    onNuxtReady(async () => {
      // Import the cart store
      const { useCartStore } = await import('~/stores/cart');
      const cartStore = useCartStore();
      
      // Load cart data from localStorage
      cartStore.loadFromStorage();
      
      console.log('Cart plugin: Cart data loaded from storage');
    });
  }
});
