# Pola Corp - Drone Components E-Commerce

A full-stack e-commerce application for Pola Corp, specializing in drone components. Built with NestJS backend and NuxtJS 3 frontend.

## 🚀 Features

- **Product Catalog**: Browse drone components with search and category filtering
- **Product Details**: View detailed specifications and images
- **Shopping Cart**: Add, remove, and update quantities with persistent state
- **Checkout Process**: Mock checkout with order confirmation
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

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
- **npm** or **yarn**
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
   NUXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🏗️ Build Instructions

### Backend Build

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend Build

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

### Checkout
- `POST /api/checkout` - Process order and clear cart

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
  image: string;
  sku: string;
}

// CartItem: Shopping cart line items
interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

// Order: Checkout orders
interface Order {
  id: number;
  orderNumber: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  createdAt: Date;
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
- localStorage persistence
- cart total calculations
```

#### **Component Structure**
- **ProductCard**: Reusable product display component
- **CartItem**: Individual cart item with quantity controls
- **SearchBar**: Debounced search input
- **CategoryFilter**: Category selection dropdown

## 🤔 Assumptions & Trade-offs

### **Data Persistence**
- **Assumption**: In-memory cart storage with localStorage backup
- **Trade-off**: Cart data lost on server restart, but simple implementation
- **Future**: Could implement Redis for distributed cart storage

### **Product Images**
- **Assumption**: Static image URLs or placeholder images
- **Trade-off**: No image upload functionality for simplicity
- **Future**: Could integrate with cloud storage (AWS S3, Cloudinary)

### **Payment Processing**
- **Assumption**: Mock checkout process only
- **Trade-off**: No real payment integration for demo purposes
- **Future**: Could integrate Stripe, PayPal, or other payment providers

### **Authentication**
- **Assumption**: No user authentication required
- **Trade-off**: No user accounts or order history
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

1. **User Authentication**: JWT-based user management
2. **Order History**: User order tracking
3. **Product Reviews**: Customer review system
4. **Inventory Management**: Stock tracking and alerts
5. **Admin Panel**: Product and order management
6. **Email Notifications**: Order confirmations and updates
7. **Payment Integration**: Real payment processing
8. **Image Upload**: Product image management
9. **Advanced Search**: Elasticsearch integration
10. **Performance Optimization**: Caching and CDN

## 📞 Support

For questions or issues, please contact:
- **Email**: derrickyewcm@gmail.com
- **Repository**: github[https://github.com/DerrickYewBytes]

---

**Built with ❤️ using NestJS, NuxtJS 3, TypeScript, and Tailwind CSS**
