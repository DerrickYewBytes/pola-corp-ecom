// Product related interfaces (matching backend)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  imageUrl: string;
  stockQuantity: number;
  specifications: Record<string, any>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Cart related interfaces (simplified for frontend)
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Checkout related interfaces
export interface CheckoutRequest {
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
