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

// Backend cart item interface
export interface BackendCartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    stockQuantity: number;
  };
}

// Cart response interface
export interface CartResponse {
  items: BackendCartItem[];
  total: number;
  itemCount: number;
}

// Checkout related interfaces
export interface CheckoutRequest {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  sessionId?: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
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
