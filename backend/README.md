# Pola Corp Backend API

NestJS backend for the Pola Corp drone parts e-commerce platform.

## Features

- **Products API**: CRUD operations for drone parts
- **Cart API**: Shopping cart management with session support
- **Checkout API**: Order processing and management
- **Swagger Documentation**: Auto-generated API documentation
- **TypeORM**: Database ORM with PostgreSQL support
- **Validation**: Request validation with class-validator
- **CORS**: Cross-origin resource sharing enabled

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL (Supabase)
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Deployment**: Vercel

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products?category=Motors` - Filter by category
- `GET /api/products?search=drone` - Search products
- `GET /api/products/categories` - Get all categories

### Cart
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart contents
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process checkout and create order
- `GET /api/checkout/orders/:orderNumber` - Get order by number
- `GET /api/checkout/orders` - Get orders for session

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file:
```bash
cp env.example .env
```

Update the `.env` file with your database credentials:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/polacorp
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001
```

### 3. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL locally
# Create database
createdb polacorp
```

#### Option B: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings > Database
4. Update your `.env` file with the Supabase connection string

### 4. Run the Application

#### Development
```bash
npm run start:dev
```

#### Production
```bash
npm run build
npm run start:prod
```

### 5. Seed Database (Optional)
The application will automatically seed sample products on first run.

## Deployment

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Set Environment Variables**
In Vercel dashboard, add these environment variables:
- `DATABASE_URL`: Your Supabase connection string
- `NODE_ENV`: `production`
- `FRONTEND_URL`: Your frontend URL

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port (default: 3000) | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## API Documentation

Once the application is running, visit:
- **Swagger UI**: `http://localhost:3000/api/docs`
- **API Base URL**: `http://localhost:3000/api`

## Database Schema

### Products Table
- `id`: Primary key
- `name`: Product name
- `description`: Product description
- `price`: Product price
- `category`: Product category
- `imageUrl`: Product image URL
- `specifications`: JSON specifications
- `stockQuantity`: Available stock
- `sku`: Stock keeping unit
- `weight`: Product weight in grams
- `dimensions`: Product dimensions (JSON)

### Cart Items Table
- `id`: Primary key
- `productId`: Foreign key to products
- `quantity`: Item quantity
- `sessionId`: Session identifier
- `userId`: User ID (for future use)

### Orders Table
- `id`: Primary key
- `orderNumber`: Unique order number
- `customerName`: Customer name
- `customerEmail`: Customer email
- `shippingAddress`: Shipping address
- `total`: Order total
- `status`: Order status
- `sessionId`: Session identifier
- `items`: Order items (JSON)

## Development

### Project Structure
```
src/
├── config/           # Configuration files
├── products/         # Products module
├── cart/            # Cart module
├── checkout/        # Checkout module
├── seeds/           # Database seeds
├── app.module.ts    # Main module
└── main.ts          # Application entry point
```

### Available Scripts
- `npm run start:dev` - Start development server
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Pola Corp e-commerce platform.
