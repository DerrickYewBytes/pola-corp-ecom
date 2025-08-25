import axios from 'axios';
import type {
  Product,
  CheckoutRequest,
  Order,
  PaginatedResponse,
} from '~/types/api';

// Create API instance factory
const createApi = () => {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Session management
  const getSessionId = () => {
    if (import.meta.client) {
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('sessionId', sessionId);
      }
      return sessionId;
    }
    return null;
  };

  // Add session ID to requests
  api.interceptors.request.use(config => {
    const sessionId = getSessionId();
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId;
    }
    return config;
  });

  return api;
};

// Product API functions
export const getProducts = async (params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse<Product>> => {
  const api = createApi();
  console.log(
    'API: Fetching products from:',
    api.defaults.baseURL + '/products'
  );
  console.log('API: With params:', params);
  try {
    const response = await api.get<PaginatedResponse<Product>>('/products', {
      params,
    });
    console.log('API: Raw response:', response);
    console.log('API: Response data:', response.data);
    console.log('API: Response status:', response.status);
    console.log('API: Response headers:', response.headers);
    return response.data;
  } catch (error: any) {
    console.error('API: Error fetching products:', error);
    if (error.response) {
      console.error('API: Error response status:', error.response.status);
      console.error('API: Error response data:', error.response.data);
    }
    throw error;
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  const api = createApi();
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const api = createApi();
  const response = await api.get<string[]>('/categories');
  return response.data;
};

// Checkout API functions
export const processCheckout = async (
  data: CheckoutRequest
): Promise<Order> => {
  const api = createApi();
  const response = await api.post<Order>('/checkout', data);
  return response.data;
};

export const getOrder = async (orderNumber: string): Promise<Order> => {
  const api = createApi();
  const response = await api.get<Order>(`/orders/${orderNumber}`);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const api = createApi();
  const response = await api.get<Order[]>('/orders');
  return response.data;
};
