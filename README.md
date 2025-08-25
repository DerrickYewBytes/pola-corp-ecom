# Pola Corp - Drone Components E-Commerce

A full-stack e-commerce application for Pola Corp, specializing in drone components. Built with NestJS backend and NuxtJS 3 frontend.
Most of the code generated with Cursor AI, Chatgpt and Deepseek. Requirements are refined in Chatgpt and Deepseek before executed in Cursor AI with manual monitoring and fine tuning to get required result.

## 🚀 Features

- **Product Catalog**: Browse drone components with search and category filtering
- **Product Details**: View detailed specifications and images
- **Shopping Cart**: Add, remove, and update quantities with persistent state
- **Mocked Checkout Process**: Complete order processing with backend integration and database persistence
- **Order Management**: Order creation, confirmation, and tracking with unique order numbers
- **Session Management**: Anonymous user session handling with cookies and database persistence
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Docker Deployment**: Complete containerized deployment with development and production configurations
- **Supabase Integration**: Cloud database with real-time data persistence
- **Frontend-Backend Sync**: Real-time cart synchronization between frontend and backend

## Tech Stack

### Backend

- **Framework**: NestJS
- **Database**: PostgreSQL (Supabase)
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI

### Frontend

- **Framework**: Nuxt 3 (Vue 3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Icons**: Heroicons
- **HTTP Client**: Axios

### DevOps & Deployment

- **Containerization**: Docker & Docker Compose
- **Environment Management**: Multi-stage builds for dev/prod
- **Network Configuration**: IPv6 support for cloud database connectivity
- **Hot Reloading**: Development environment with live code changes

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

### 🚀 Quick Start with Docker (Recommended)

**1. Clone the repository:**
```bash
git clone <repository-url>
cd pola-corp
```

**2. Set up environment:**
```bash
cp env.example .env
# Edit .env with your Supabase connection string
```

**3. Start the application:**
```bash
# Development environment
docker-compose -f docker-compose.dev.yml up -d --build

# Production environment
docker-compose up -d --build
```

**4. Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api/docs

### Manual Installation

### Prerequisites

**Option 1: Docker Deployment (Recommended)**
- **Docker Desktop** installed and running
- **Supabase** database (free tier available)

**Option 2: Local Development**
- **Node.js** (v20 or higher)
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

## 🐳 Docker Deployment (Recommended)

### Quick Start

**Prerequisites:**
- Docker Desktop installed and running
- Supabase database connection string

**1. Clone and Setup:**
```bash
git clone <repository-url>
cd pola-corp
cp env.example .env
```

**2. Configure Environment:**
Edit `.env` file with your Supabase connection:
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
NUXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

**3. Start the Application:**
```bash
# Development (with hot reloading)
docker-compose -f docker-compose.dev.yml up -d --build

# Production
docker-compose up -d --build
```

**4. Access the Application:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs

### Docker Architecture

The application uses a multi-container Docker setup:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Supabase     │
│   (Nuxt 3)      │◄──►│   (NestJS)      │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 3001    │    │   (External)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Docker Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d --build

# Start production environment
docker-compose up -d --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop containers
docker-compose -f docker-compose.dev.yml down

# Restart containers
docker-compose -f docker-compose.dev.yml restart

# Check container status
docker ps

# Access container shell
docker exec -it pola-corp-backend-dev sh
docker exec -it pola-corp-frontend-dev sh
```

### Environment Configuration

**Development Environment:**
- Hot reloading enabled
- Debug logging enabled
- Source code mounted for live editing
- Node.js 20 with development dependencies

**Production Environment:**
- Optimized builds
- Production dependencies only
- Static file serving
- Performance optimized

### Troubleshooting

**Common Issues:**

1. **Port Already in Use:**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :3001
   
   # Stop conflicting services
   docker-compose down
   ```

2. **Database Connection Issues:**
   - Verify Supabase connection string in `.env`
   - Check if Supabase project is active
   - Ensure IPv6 connectivity (Docker network configured)

3. **Container Won't Start:**
   ```bash
   # Check container logs
   docker logs pola-corp-backend-dev
   docker logs pola-corp-frontend-dev
   
   # Rebuild containers
   docker-compose -f docker-compose.dev.yml up -d --build --force-recreate
   ```

4. **Permission Issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Docker Files Structure

```
pola-corp/
├── docker-compose.yml              # Production configuration
├── docker-compose.dev.yml          # Development configuration
├── .env.example                    # Environment variables template
├── .dockerignore                   # Docker ignore file
├── backend/
│   ├── Dockerfile                  # Production backend image
│   └── Dockerfile.dev              # Development backend image
└── frontend/
    ├── Dockerfile                  # Production frontend image
    └── Dockerfile.dev              # Development frontend image
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
