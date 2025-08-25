<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Cart Persistence Test</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Add Items Section -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Add Test Items</h2>
        <div class="space-y-4">
          <button 
            @click="addTestItem(1)" 
            class="btn btn-primary w-full"
          >
            Add Motor (ID: 1)
          </button>
          <button 
            @click="addTestItem(2)" 
            class="btn btn-primary w-full"
          >
            Add Propeller (ID: 2)
          </button>
          <button 
            @click="addTestItem(3)" 
            class="btn btn-primary w-full"
          >
            Add Battery (ID: 3)
          </button>
        </div>
      </div>

      <!-- Cart Status Section -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Cart Status</h2>
        <div class="space-y-2">
          <p><strong>Items in cart:</strong> {{ cartStore.itemCount }}</p>
          <p><strong>Total:</strong> ${{ cartStore.total.toFixed(2) }}</p>
          <p><strong>Is empty:</strong> {{ cartStore.isEmpty ? 'Yes' : 'No' }}</p>
        </div>
        
        <div class="mt-4">
          <h3 class="font-semibold mb-2">Cart Items:</h3>
          <div v-if="cartStore.items.length === 0" class="text-gray-500">
            No items in cart
          </div>
          <div v-else class="space-y-2">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id"
              class="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span>{{ item.name }} (Qty: {{ item.quantity }})</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions Section -->
    <div class="mt-6 bg-white p-6 rounded-lg shadow">
      <h2 class="text-lg font-semibold mb-4">Actions</h2>
      <div class="flex gap-4">
        <button 
          @click="clearCart" 
          class="btn btn-outline"
        >
          Clear Cart
        </button>
        <button 
          @click="loadFromStorage" 
          class="btn btn-outline"
        >
          Reload from Storage
        </button>
        <button 
          @click="saveToStorage" 
          class="btn btn-outline"
        >
          Save to Storage
        </button>
        <button 
          @click="checkLocalStorage" 
          class="btn btn-outline"
        >
          Check localStorage
        </button>
      </div>
    </div>

    <!-- Instructions -->
    <div class="mt-6 bg-blue-50 p-6 rounded-lg">
      <h2 class="text-lg font-semibold mb-4">Test Instructions</h2>
      <ol class="list-decimal list-inside space-y-2">
        <li>Add some items to the cart using the buttons above</li>
        <li>Refresh the page (F5 or Ctrl+R)</li>
        <li>Check if the cart items are still there</li>
        <li>Try navigating to other pages and back</li>
        <li>Check the browser console for any error messages</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
const cartStore = useCart();

const addTestItem = async (id) => {
  const testItems = {
    1: { id: 1, name: 'High-Performance Motor', price: 89.99, image: '/images/motor.jpg' },
    2: { id: 2, name: 'Carbon Fiber Propeller', price: 24.99, image: '/images/propeller.jpg' },
    3: { id: 3, name: 'LiPo Battery Pack', price: 129.99, image: '/images/battery.jpg' }
  };
  
  await cartStore.addItem(testItems[id]);
};

const clearCart = () => {
  cartStore.clearCart();
};

const loadFromStorage = () => {
  cartStore.loadFromStorage();
};

const saveToStorage = () => {
  cartStore.saveToStorage();
};

const checkLocalStorage = () => {
  if (process.client) {
    const stored = localStorage.getItem('cart');
    console.log('localStorage cart data:', stored);
    alert(`localStorage cart data: ${stored || 'null'}`);
  }
};
</script> 
