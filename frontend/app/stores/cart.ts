import { defineStore } from 'pinia';
import { ref, computed, nextTick, watch } from 'vue';
import { CookieManager } from '~/utils/cookies';
import type { BackendCartItem } from '~/types/api';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);
  const loading = ref(false);

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const total = computed(() => {
    return items.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  const isEmpty = computed(() => items.value.length === 0);

  // Actions
  const addItem = async (
    item: Omit<CartItem, 'quantity'> & { quantity?: number }
  ) => {
    const existingItem = items.value.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      items.value.push({
        ...item,
        quantity: item.quantity || 1,
      });
    }

    // Save to localStorage
    saveToStorage();

    // Sync with backend
    try {
      const { addToCart } = await import('~/composables/useApi');
      await addToCart({
        productId: item.id,
        quantity: item.quantity || 1,
      });
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find(i => i.id === id);
    if (item) {
      if (quantity <= 0) {
        removeItem(id);
      } else {
        item.quantity = quantity;
        saveToStorage();
      }
    }
  };

  const removeItem = (id: number) => {
    const index = items.value.findIndex(i => i.id === id);
    if (index > -1) {
      items.value.splice(index, 1);
      saveToStorage();
    }
  };

  const clearCart = () => {
    items.value = [];
    saveToStorage();
  };

  const saveToStorage = () => {
    if (process.client) {
      try {
        // Store cart data in localStorage
        localStorage.setItem('cart', JSON.stringify(items.value));
        console.log('Cart saved to storage:', items.value.length, 'items');
      } catch (error) {
        console.error('Failed to save cart to storage:', error);
      }
    }
  };

  const loadFromStorage = () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('cart');
        if (stored) {
          const parsedItems = JSON.parse(stored);
          // Validate that parsed data is an array
          if (Array.isArray(parsedItems)) {
            items.value = parsedItems;
            console.log('Cart loaded from storage:', items.value.length, 'items');
          } else {
            console.warn('Invalid cart data in storage, resetting cart');
            items.value = [];
            localStorage.removeItem('cart');
          }
        }
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
        items.value = [];
        localStorage.removeItem('cart');
      }
    }
  };

  const loadFromBackend = async () => {
    try {
      const { getCart } = await import('~/composables/useApi');
      const backendCart = await getCart();
      if (backendCart && backendCart.items) {
        // Convert backend cart items to frontend format
        const frontendItems = backendCart.items.map((item: BackendCartItem) => ({
          id: item.productId,
          name: item.product.name,
          price: item.product.price,
          image: item.product.imageUrl,
          quantity: item.quantity,
        }));
        items.value = frontendItems;
        saveToStorage();
        console.log('Cart loaded from backend:', frontendItems.length, 'items');
      }
    } catch (error) {
      console.error('Failed to load cart from backend:', error);
      // Fall back to localStorage
      loadFromStorage();
    }
  };

  // Watch for cart changes and auto-save
  if (process.client) {
    watch(items, () => {
      console.log('Cart store: Items changed, auto-saving...');
      saveToStorage();
    }, { deep: true });
  }

  // Initialize cart from backend first, then fall back to storage
  if (process.client) {
    // Use nextTick to ensure DOM is ready
    nextTick(async () => {
      console.log('Cart store: Initializing from backend...');
      await loadFromBackend();
    });
  }

  // Clear session cookie when cart is cleared
  const clearCartWithCookie = () => {
    items.value = [];
    saveToStorage();
    if (process.client) {
      CookieManager.clearSessionCookie();
    }
  };

  return {
    // State
    items,
    loading,

    // Getters
    itemCount,
    total,
    isEmpty,

    // Actions
    addItem,
    updateQuantity,
    removeItem,
    clearCart: clearCartWithCookie,
    loadFromStorage,
    loadFromBackend,
    saveToStorage,
  };
});
