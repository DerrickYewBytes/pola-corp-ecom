<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <ExclamationTriangleIcon class="mx-auto h-12 w-12 text-red-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Error loading order
      </h3>
      <p class="text-gray-600 mb-4">{{ error }}</p>
      <button @click="fetchOrder" class="btn-primary">Try Again</button>
    </div>

    <!-- Order Confirmation -->
    <div v-else-if="order" class="max-w-4xl mx-auto">
      <!-- Success Message -->
      <div class="text-center mb-8">
        <CheckCircleIcon class="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Thank you for your order!
        </h1>
        <p class="text-gray-600">
          Your order has been successfully placed and is being processed.
        </p>
      </div>

      <!-- Order Details -->
      <div class="card p-6 mb-8">
        <h2 class="text-xl font-medium text-gray-900 mb-4">Order Details</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Order Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              Order Information
            </h3>
            <dl class="space-y-2">
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-600">Order Number:</dt>
                <dd class="text-sm text-gray-900">{{ order.orderNumber }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-600">Order Date:</dt>
                <dd class="text-sm text-gray-900">
                  {{ formatDate(order.createdAt) }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-600">Status:</dt>
                <dd class="text-sm">
                  <span
                    :class="[
                      'badge',
                      order.status === 'pending'
                        ? 'badge-warning'
                        : 'badge-success',
                    ]"
                  >
                    {{ order.status }}
                  </span>
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-sm font-medium text-gray-600">Total:</dt>
                <dd class="text-sm font-bold text-gray-900">
                  ${{ order.total.toFixed(2) }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Customer Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-3">
              Customer Information
            </h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-sm font-medium text-gray-600">Name:</dt>
                <dd class="text-sm text-gray-900">{{ order.customerName }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-600">Email:</dt>
                <dd class="text-sm text-gray-900">{{ order.customerEmail }}</dd>
              </div>
            </dl>

            <h4 class="text-md font-medium text-gray-900 mt-4 mb-2">
              Shipping Address
            </h4>
            <address class="text-sm text-gray-900 not-italic">
              {{ order.shippingAddress }}
            </address>
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="card p-6 mb-8">
        <h2 class="text-xl font-medium text-gray-900 mb-4">Order Items</h2>

        <div class="space-y-4">
          <div
            v-for="item in order.items"
            :key="item.productId"
            class="flex items-center space-x-4 py-3 border-b border-gray-200 last:border-b-0"
          >
            <div class="flex-1">
              <h4 class="text-sm font-medium text-gray-900">
                {{ item.productName }}
              </h4>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-900">Qty: {{ item.quantity }}</p>
              <p class="text-sm font-medium text-gray-900">
                ${{ item.price.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="border-t border-gray-200 pt-4 mt-4">
          <div class="flex justify-between text-lg font-medium">
            <span class="text-gray-900">Total</span>
            <span class="text-gray-900">${{ order.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/" class="btn-primary text-center">
          Continue Shopping
        </NuxtLink>
        <button @click="printOrder" class="btn-secondary">Print Order</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
  } from '@heroicons/vue/24/outline';
  import type { Order } from '~/types/api';
  import { getOrder } from '~/composables/useApi';

  // Route
  const route = useRoute();
  const orderNumber = computed(() => route.params.orderNumber as string);

  // Reactive state
  const order = ref<Order | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Methods
  const fetchOrder = async () => {
    loading.value = true;
    error.value = null;

    try {
      order.value = await getOrder(orderNumber.value);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to fetch order';
    } finally {
      loading.value = false;
    }
  };

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const printOrder = () => {
    window.print();
  };

  // Lifecycle
  onMounted(() => {
    fetchOrder();
  });
</script>

<style scoped>
  @media print {
    .btn-primary,
    .btn-secondary {
      display: none;
    }
  }
</style>
