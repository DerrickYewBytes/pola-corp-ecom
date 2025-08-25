# Pola Corp - Drone Components E-Commerce

A full-stack e-commerce application for Pola Corp, specializing in drone components. Built with NestJS backend and NuxtJS 3 frontend.
Most of the code generated with Cursor AI, Chatgpt and Deepseek. Requirements are refined in Chatgpt and Deepseek before executed in Cursor AI with manual monitoring and fine tuning to get required result.

## 🚀 Features

- **Product Catalog**: Browse drone components with search and category filtering
- **Product Details**: View detailed specifications and images
- **Shopping Cart**: Add, remove, and update quantities with persistent state
- **Mocked Checkout Process**: Complete order processing with backend integration for mock transaction
- **Order Management**: Order creation, confirmation, and tracking
- **Session Management**: Anonymous user session handling with cookies
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

### Backend

- **Framework**: NestJS
- **Database**: PostgreSQL (Supabase)
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Icons**: Heroicons
- **HTTP Client**: Axios

## 📁 Project Structure

```
pola-corp/
├── backend/          # NestJS API server
│   ├── src/
│   │   ├── modules/
│   │   │   ├── products/     # Product management
│   │   │   ├── cart/         # Shopping cart operations
│   │   │   └── checkout/     # Order processing
│   │   └── main.ts
│   ├── package.json
│   └── vercel.json
└── frontend/         # NuxtJS 3 client application
    ├── app/
    │   ├── pages/            # Vue pages
    │   ├── components/       # Reusable components
    │   └── stores/           # Pinia state management
    ├── composables/          # API utilities
    ├── package.json
    └── nuxt.config.ts
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**
- **PostgreSQL** database (Supabase recommended for free hosting)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   PORT=3001
   FRONTEND_URL=http://localhost:3000 (if hosted locally with default settings)
   ```

4. **Database Setup:**
   - Set up a PostgreSQL database (Supabase recommended)
   - Update `DATABASE_URL` in your `.env` file
   - The application will auto-create tables on first run

5. **Run the development server:**
   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the frontend directory:
   ```env
   NUXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🏗️ Build Instructions

### Docker Deployment (Recommended)

For production deployment, use Docker:

```bash
# Production deployment
docker-compose up -d --build

# Development deployment
docker-compose -f docker-compose.dev.yml up -d --build
```

See [DOCKER.md](./DOCKER.md) for detailed Docker deployment instructions.

### Manual Build

#### Backend Build

```bash
cd backend
npm run build
npm run start:prod
```

#### Frontend Build

```bash
cd frontend
npm run build
npm run preview
```

## 🎯 API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, search, category filtering)
- `GET /api/products/:id` - Get product details
- `GET /api/categories` - Get all product categories

### Cart
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart contents
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process order and clear cart
- `GET /api/checkout/orders/:orderNumber` - Get order by order number
- `GET /api/checkout/orders` - Get orders for current session

## 🎨 Design Decisions

### Backend Architecture

#### **Framework Choice: NestJS**
#### **Database: PostgreSQL with TypeORM**
#### **API Design**
- **RESTful Architecture**: Standard HTTP methods and status codes
- **Pagination**: 20 items per page to handle large product catalogs
- **Search & Filtering**: Backend-driven for better performance
- **Validation**: Class-validator for request validation
- **Documentation**: Swagger/OpenAPI for API documentation

#### **Data Models**
```typescript
// Product: Core product information
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sku: string;
  stockQuantity: number;
  specifications: Record<string, any>;
}

// CartItem: Shopping cart line items
interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  sessionId: string;
  product: Product;
}

// Order: Checkout orders
interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  total: number;
  status: string;
  sessionId: string;
  createdAt: Date;
}

// OrderItem: Individual items in an order
interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}
```

### Frontend Architecture

#### **Framework Choice: NuxtJS 3**
#### **State Management: Pinia**
#### **Styling: Tailwind CSS**
#### **User Experience**
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Search & Filtering**: Debounced search (300ms) for better performance
- **Cart Persistence**: localStorage for cart state across sessions
- **Loading States**: Skeleton loaders and loading indicators

## 🔧 Technical Implementation

### Backend Implementation

#### **Module Structure**
```
src/
├── modules/
│   ├── products/
│   │   ├── entities/product.entity.ts
│   │   ├── dto/
│   │   ├── products.service.ts
│   │   ├── products.controller.ts
│   │   └── products.module.ts
│   ├── cart/
│   └── checkout/
└── core/
    └── config/
    └── models/
     ├── products/
     ├── cart/
     └── checkout/
```

#### **Key Features**
- **Pagination**: Page-based pagination with configurable limits
- **Search**: Case-insensitive search across product name, description, and category
- **Category Filtering**: Separate API endpoint for categories
- **Session Management**: Anonymous user sessions with UUID-based session IDs
- **Cart Synchronization**: Frontend-backend cart sync with localStorage fallback
- **Stock Management**: Product stock validation and updates
- **Order Processing**: Complete order creation with order number generation
- **Validation**: Request validation with class-validator
- **Error Handling**: Global exception filters

### Frontend Implementation

#### **Store Architecture**
```typescript
// products.ts - Product catalog management
- fetchProducts(page, limit, category, search)
- pagination state management
- category and search filtering

// cart.ts - Shopping cart management
- addToCart, removeFromCart, updateQuantity
- localStorage persistence with backend sync
- cart total calculations
- loadFromBackend, loadFromStorage
```

#### **Component Structure**
- **ProductCard**: Reusable product display component
- **CartItem**: Individual cart item with quantity controls
- **SearchBar**: Debounced search input
- **CategoryFilter**: Category selection dropdown

## 🤔 Assumptions & Trade-offs

### **Data Persistence**
- **Assumption**: Database-backed cart storage with localStorage sync
- **Trade-off**: Cart data persists across server restarts with session management
- **Future**: Could implement Redis for distributed cart storage and caching

### **Product Images**
- **Assumption**: Static image URLs or placeholder images
- **Trade-off**: No image upload functionality for simplicity
- **Future**: Could integrate with cloud storage (AWS S3, Cloudinary)

### **Payment Processing**
- **Assumption**: Mock order processing with order confirmation
- **Trade-off**: No payment gateway integration for demo purposes
- **Future**: Could integrate Stripe, PayPal, or other payment providers

### **Authentication**
- **Assumption**: Anonymous user sessions with cookie-based session management
- **Trade-off**: No user accounts but persistent cart and order history per session
- **Future**: Could implement JWT authentication with user management

### **Performance**
- **Assumption**: Small to medium product catalog
- **Trade-off**: No advanced caching or CDN
- **Future**: Could implement Redis caching, CDN for images

### **Security**
- **Assumption**: Basic input validation and CORS
- **Trade-off**: No advanced security features
- **Future**: Could implement rate limiting, input sanitization, CSRF protection

### Environment Variables

**Backend:**
```env
DATABASE_URL=postgresql://...
NODE_ENV=production
PORT=3001
```

**Frontend:**
```env
NUXT_PUBLIC_API_BASE_URL=https://your-backend.app/api
```

## 🆕 Recent Features (Latest Update)

### **Real Checkout System**
- **Complete Order Processing**: Full backend integration for order creation and management
- **Order Confirmation**: Order confirmation pages with order details and tracking
- **Session Management**: Anonymous user sessions with cookie-based persistence
- **Cart Synchronization**: Frontend-backend cart sync with localStorage fallback

### **Enhanced Cart Management**
- **Backend Integration**: Cart items stored in database with session management
- **Real-time Sync**: Cart changes immediately synced between frontend and backend
- **Persistent Sessions**: Cart data persists across browser sessions and server restarts
- **Stock Validation**: Real-time stock checking during cart operations

### **Order Management**
- **Order Creation**: Complete order processing with customer information
- **Order Tracking**: Order confirmation with unique order numbers
- **Order History**: Session-based order history and retrieval
- **Email Integration Ready**: Order confirmation emails (backend ready)

### **Technical Improvements**
- **TypeScript Types**: Complete type safety across frontend and backend
- **Error Handling**: Comprehensive error handling and user feedback
- **API Documentation**: Updated Swagger documentation for all endpoints
- **Performance**: Optimized database queries and frontend state management

## 📝 Development Notes

### **TypeScript Configuration**
- **Strict Mode**: Enabled for type safety
- **Path Aliases**: Configured for clean imports
- **Auto-imports**: NuxtJS auto-imports for Vue composables

### **Code Quality**
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking

### **Testing Strategy**
- **Unit Tests**: Service layer testing (not implemented)
- **Integration Tests**: API endpoint testing (not implemented)
- **E2E Tests**: User flow testing (not implemented)

## 🔮 Future Enhancements

1. **User Authentication**: JWT-based user management with user accounts
2. **Order History**: User order tracking and management
3. **Product Reviews**: Customer review and rating system
4. **Inventory Management**: Real-time stock tracking and low stock alerts
5. **Admin Panel**: Product and order management dashboard
6. **Email Notifications**: Order confirmations, shipping updates, and marketing emails
7. **Payment Integration**: Stripe, PayPal, or other payment gateway integration
8. **Image Upload**: Product image management with cloud storage
9. **Advanced Search**: Elasticsearch integration for better search performance
10. **Performance Optimization**: Redis caching, CDN for images, and database optimization
11. **Wishlist**: User wishlist functionality
12. **Product Recommendations**: AI-powered product suggestions
13. **Multi-language Support**: Internationalization (i18n)
14. **Mobile App**: React Native or Flutter mobile application
15. **Analytics**: Order analytics and business intelligence

## 📞 Support

For questions or issues, please contact:
- **Email**: derrickyewcm@gmail.com
- **Repository**: github[https://github.com/DerrickYewBytes]

---

**Built with ❤️ using NestJS, NuxtJS 3, TypeScript, and Tailwind CSS**
