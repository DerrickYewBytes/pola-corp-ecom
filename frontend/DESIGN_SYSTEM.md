# DroneParts Design System

## Overview

This document outlines the design system implemented for the DroneParts e-commerce application, following the specifications provided for a modern, responsive drone parts store.

## Color Palette

### Primary Colors
- **Primary Blue**: `#0A3D62` - Used for headers, navigation, and primary UI elements
- **Accent Orange**: `#FF6B35` - Used for CTAs, buttons, and interactive elements
- **Background Gray**: `#F5F6FA` - Main background color for the application

### Text Colors
- **Primary Text**: `#2D2D2D` - Main text color for headings and body text
- **Secondary Text**: `#7B7B7B` - Used for less important text, captions, and hints

### Surface Colors
- **Surface White**: `#FFFFFF` - Used for cards, modals, and content areas
- **Success Green**: `#065F46` - Used for success states and in-stock indicators
- **Error Red**: `#991B1B` - Used for error states and out-of-stock indicators

## Typography

### Font Families
- **Poppins**: Used for headings (Bold, SemiBold, Medium weights)
- **Inter**: Used for body text and UI elements (Regular, Medium weights)
- **Montserrat**: Alternative heading font (available for future use)

### Font Sizes
- **H1**: 32px (48px on mobile) - Main page titles
- **H2**: 24px (28px on mobile) - Section headers
- **H3**: 20px (24px on mobile) - Subsection headers
- **Body**: 16px (14px on mobile) - Main content text
- **Caption**: 14px (12px on mobile) - Labels, hints, and small text

## Components

### Buttons
- **Primary Button**: Orange background (`#FF6B35`) with white text
- **Secondary Button**: Transparent with blue border (`#0A3D62`)
- **Outline Button**: Transparent with orange border (`#FF6B35`)
- **Sizes**: Small (8px padding), Regular (12px padding), Large (16px padding)

### Cards
- **Product Cards**: White background with soft shadow, 12px border radius
- **Category Cards**: Hover effects with elevation change
- **Testimonial Cards**: Light gray background (`#F5F6FA`)

### Forms
- **Input Fields**: 2px border, 8px border radius, focus states with blue outline
- **Select Dropdowns**: Consistent styling with input fields
- **Checkboxes**: Custom styled with orange accent color

### Navigation
- **Header**: Fixed position, white background with soft shadow
- **Mobile Menu**: Slide-out overlay with dark background
- **Bottom Navigation**: Fixed bottom bar for mobile devices

## Layout

### Grid System
- **Desktop**: 4-column grid for products, responsive breakpoints
- **Tablet**: 2-3 column grid
- **Mobile**: Single column layout

### Spacing
- **Container**: Max-width 1440px with 24px padding (16px on mobile)
- **Grid Gaps**: 24px standard, 16px on mobile
- **Section Padding**: 80px vertical (48px on mobile)

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Responsive Design

### Mobile-First Approach
- All components designed for mobile first
- Progressive enhancement for larger screens
- Touch-friendly button sizes (minimum 44px)

### Mobile Enhancements
- Sticky bottom navigation
- Collapsible search overlay
- Bottom sheet filters
- Pull-to-refresh ready

## Animations

### Transitions
- **Standard**: 0.2s ease-in-out for most interactions
- **Hover Effects**: Subtle transform and shadow changes
- **Loading States**: Spinner animations for async operations

### Micro-interactions
- Button hover states with slight elevation
- Card hover effects with scale transform
- Smooth page transitions

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- High contrast ratios maintained
- Color not used as sole indicator

### Keyboard Navigation
- All interactive elements keyboard accessible
- Focus indicators clearly visible
- Logical tab order maintained

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels
- Alt text for images

## Implementation

### CSS Architecture
- Utility-first approach with Tailwind CSS
- Custom CSS variables for design tokens
- Component-scoped styles where needed

### File Structure
```
app/
├── assets/
│   └── css/
│       └── main.css          # Global styles and design system
├── components/
│   ├── AppHeader.vue         # Main navigation header
│   ├── ProductCard.vue       # Product display component
│   └── MobileBottomNav.vue   # Mobile bottom navigation
├── layouts/
│   └── default.vue           # Main layout with header/footer
└── pages/
    ├── index.vue             # Homepage with hero and sections
    └── products/
        └── index.vue         # Product catalog with filters
```

### Key Features Implemented

1. **Hero Section**: Full-width banner with drone imagery and CTA
2. **Featured Categories**: Grid of category cards with icons
3. **Product Catalog**: Filterable grid with sidebar filters
4. **Mobile Navigation**: Bottom navigation and collapsible menus
5. **Responsive Design**: Mobile-first approach with progressive enhancement
6. **Search Functionality**: Desktop search bar with mobile overlay
7. **Cart Integration**: Real-time cart updates with localStorage
8. **Newsletter Signup**: Footer newsletter with email capture

## Usage Guidelines

### When to Use Each Component
- **ProductCard**: For displaying individual products in grids or lists
- **AppHeader**: Main navigation on all pages
- **MobileBottomNav**: Mobile-only bottom navigation
- **Buttons**: Follow hierarchy (Primary > Secondary > Outline)

### Best Practices
- Maintain consistent spacing using the defined grid system
- Use semantic HTML elements for proper accessibility
- Test all interactions on mobile devices
- Ensure color contrast meets accessibility standards
- Keep animations subtle and purposeful

## Future Enhancements

### Planned Features
- Dark mode support
- AR viewer integration for drone parts
- Product comparison tool
- Advanced filtering with price sliders
- Wishlist functionality
- User account dashboard

### Technical Improvements
- Component library documentation
- Design token system
- Automated accessibility testing
- Performance optimization
- PWA capabilities
