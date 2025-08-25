import { useCartStore } from '~/stores/cart';

export const useCart = () => {
  const cartStore = useCartStore();
  
  // Ensure cart is loaded from storage when this composable is used
  if (process.client) {
    onMounted(() => {
      cartStore.loadFromStorage();
    });
  }
  
  return cartStore;
};
