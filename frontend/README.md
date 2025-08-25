# Pola Corp Frontend

A modern e-commerce frontend built with Nuxt 3, TypeScript, Tailwind CSS, and Pinia for managing drone components.

## Features

- **Product Catalog**: Browse and search drone components with filtering and sorting
- **Product Details**: View detailed product information with specifications
- **Shopping Cart**: Add, update, and remove items with real-time updates
- **Checkout Process**: Complete order with customer information and shipping details
- **Order Confirmation**: View order details and confirmation
- **Responsive Design**: Mobile-first design that works on all devices
- **Type Safety**: Full TypeScript support with strict type checking
- **State Management**: Pinia stores for reactive state management
- **Modern UI**: Beautiful interface built with Tailwind CSS and Heroicons

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **UI Components**: Headless UI
- **Deployment**: Vercel

## Project Structure

```
frontend/
├── assets/
│   └── css/
│       └── main.css          # Global styles and Tailwind directives
├── components/
│   ├── ProductCard.vue       # Product display component
│   └── CartItem.vue          # Cart item component
├── composables/
│   └── useApi.ts             # API integration composable
├── layouts/
│   └── default.vue           # Main layout with navigation
├── pages/
│   ├── index.vue             # Product catalog page
│   ├── products/
│   │   └── [id].vue          # Product detail page
│   ├── cart.vue              # Shopping cart page
│   ├── checkout.vue          # Checkout form page
│   └── checkout/
│       └── confirmation/
│           └── [orderNumber].vue  # Order confirmation page
├── stores/
│   ├── products.ts           # Product state management
│   └── cart.ts               # Cart state management
├── types/
│   └── api.ts                # TypeScript interfaces
├── nuxt.config.ts            # Nuxt configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## Pages

### Product Catalog (`/`)

- Display all products in a responsive grid
- Search functionality with real-time filtering
- Category filtering
- Sort options (name, price, newest)
- Add to cart functionality

### Product Details (`/products/[id]`)

- Detailed product information
- Product specifications
- Quantity selector
- Add to cart with custom quantity
- Related products

### Shopping Cart (`/cart`)

- View all cart items
- Update quantities
- Remove items
- Order summary
- Proceed to checkout

### Checkout (`/checkout`)

- Customer information form
- Shipping address form
- Order review
- Place order functionality

### Order Confirmation (`/checkout/confirmation/[orderNumber]`)

- Order success message
- Order details
- Customer information
- Order items
- Print functionality

## Components

### ProductCard

- Displays product information in a card format
- Product image, name, price, and stock status
- Add to cart button
- Links to product detail page

### CartItem

- Displays individual cart items
- Quantity controls (increase/decrease)
- Remove item functionality
- Product image and information

## Stores

### Products Store

- Manages product data and filtering
- Search functionality
- Category filtering
- Loading and error states

### Cart Store

- Manages shopping cart state
- Add, update, and remove items
- Cart totals and item counts
- Loading and error states

## API Integration

The frontend communicates with the NestJS backend through the `useApi` composable, which provides:

- **Products API**: Fetch products, categories, and individual products
- **Cart API**: Manage cart operations (add, update, remove, clear)
- **Checkout API**: Process orders and retrieve order information

All API calls include session management using localStorage for cart persistence.

## Styling

The application uses Tailwind CSS with custom utility classes defined in `assets/css/main.css`:

- **Button Styles**: `.btn-primary`, `.btn-secondary`, `.btn-danger`
- **Card Styles**: `.card`
- **Form Styles**: `.input-field`
- **Badge Styles**: `.badge`, `.badge-primary`, `.badge-success`, `.badge-warning`

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
NUXT_PUBLIC_API_URL=http://localhost:3000/api
```

For production, set the API URL to your deployed backend URL.

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application: `npm run build`
2. Deploy the `.output` directory to your hosting provider

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Lazy Loading**: Images and components are loaded on demand
- **Code Splitting**: Automatic code splitting by Nuxt 3
- **Tree Shaking**: Unused code is automatically removed
- **Caching**: API responses are cached appropriately
- **Optimized Images**: Images are optimized for web delivery

## Accessibility

- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant color contrast
- **Focus Management**: Proper focus indicators and management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
