# LOS ALTOS Architecture Portfolio

A sophisticated architecture and construction portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS, featuring glassmorphism effects and premium interactions inspired by i-mad.com.

## 🏗️ Project Overview

**Company**: LOS ALTOS
**Industry**: Construction & Architecture
**Website Type**: Portfolio & Business Showcase
**Design Inspiration**: i-mad.com

## 📍 Sitemap & File Structure

### Homepage (`/`)
**Files Used**:
- `app/page.tsx` - Main homepage component with carousel, search, and navigation
- `components/home/ProjectsGrid.tsx` - Masonry grid layout for projects
- `components/home/AboutSection.tsx` - "Inspired by Nature" and team sections
- `lib/constants/projects.ts` - Project data and configurations

**Features**:
- Auto-sliding project carousel with rounded corners
- Glassmorphism search sidebar with tag-based filtering
- Masonry grid with liquid glass hover effects
- Responsive navigation with dropdown menus

### Projects Pages

#### All Projects (`/projects`)
**Files Used**:
- `app/projects/page.tsx` - Projects listing page
- `app/projects/layout.tsx` - Projects section layout
- `components/layout/Navigation.tsx` - Reusable header component
- `components/layout/Footer.tsx` - Footer component

#### Individual Project (`/projects/[slug]`)
**Files Used**:
- `app/projects/[slug]/page.tsx` - Dynamic project detail page
- `lib/constants/projects.ts` - Project data source

### About Pages

#### About Us (`/about`)
**Files Used**:
- `app/about/page.tsx` - About us main page
- `app/about/layout.tsx` - About section layout

#### Team Section (`/about#team`)
- Integrated within about page using anchor navigation

### Services (`/services`)
**Files Used**:
- `app/services/page.tsx` - Services listing
- `app/services/layout.tsx` - Services layout
- `lib/constants/projects.ts` - Services data

### Contact (`/contact`)
**Files Used**:
- `app/contact/page.tsx` - Contact form and information
- `app/contact/layout.tsx` - Contact section layout

### Additional Routes
- `/services#architecture` - Architecture services
- `/services#construction` - Construction services
- `/services#interior` - Interior design services
- `/services#consulting` - Consulting services
- `/careers` - Career opportunities (if implemented)

## 🎨 Design System

### Color Palette

```scss
// Primary Colors
$white: #ffffff
$black: #000000
$zinc-900: #18181b
$zinc-800: #27272a
$zinc-700: #3f3f46
$zinc-600: #52525b
$gray-100: #f3f4f6
$gray-200: #e5e7eb
$gray-300: #d1d5db

// Glassmorphism Effects
$glass-white: rgba(255, 255, 255, 0.8)
$glass-gray: rgba(243, 244, 246, 0.85)
$glass-dark: rgba(255, 255, 255, 0.2)
```

### Typography

```css
// Font Family
font-family: system-ui, -apple-system, sans-serif

// Font Sizes
text-7xl: 4.5rem (72px) - Hero headings
text-6xl: 3.75rem (60px) - Section headings
text-5xl: 3rem (48px) - Large headings
text-4xl: 2.25rem (36px) - Medium headings
text-3xl: 1.875rem (30px) - Small headings
text-2xl: 1.5rem (24px) - Subheadings
text-base: 1rem (16px) - Body text
text-sm: 0.875rem (14px) - Small text
text-xs: 0.75rem (12px) - Tiny text

// Font Weights
font-light: 300
font-normal: 400
font-medium: 500
font-bold: 700
```

### Spacing System

```css
// Padding & Margin Scale
p-2: 0.5rem (8px)
p-3: 0.75rem (12px)
p-4: 1rem (16px)
p-6: 1.5rem (24px)
p-8: 2rem (32px)
p-12: 3rem (48px)
p-16: 4rem (64px)
p-24: 6rem (96px)
```

### Border Radius

```css
rounded: 0.25rem (4px)
rounded-lg: 0.5rem (8px)
rounded-xl: 0.75rem (12px)
rounded-2xl: 1rem (16px)
rounded-3xl: 1.5rem (24px)
rounded-full: 9999px
```

### Glassmorphism Components

```css
// Navigation Bar (Scrolled)
.navbar-glass {
  background: rgba(243, 244, 246, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
}

// Search Sidebar
.search-sidebar {
  background: rgba(243, 244, 246, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
}

// Dropdown Menus
.dropdown-glass {
  background: rgba(243, 244, 246, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(229, 231, 235, 0.5);
}

// Project Hover Cards
.liquid-glass-card {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

// Buttons (Glass)
.button-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Animations & Transitions

```typescript
// Framer Motion Presets
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

const slideIn = {
  initial: { x: '100%' },
  animate: { x: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

const scaleHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 }
}
```

## 🚀 Key Features

### Homepage Features
1. **Auto-Sliding Carousel**
   - 6-second auto-rotation
   - Manual navigation arrows
   - Rounded corners with padding
   - Smooth fade transitions

2. **Tag-Based Search System**
   - Click tags to filter projects
   - Shows result count
   - Instant filtering
   - Clear visual feedback

3. **Glassmorphism Effects**
   - Semi-transparent overlays
   - Backdrop blur effects
   - Subtle borders and shadows
   - Smooth color transitions

4. **Responsive Design**
   - Mobile-first approach
   - Tablet optimizations
   - Desktop enhancements
   - Touch-friendly interactions

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Components**: shadcn/ui
- **State Management**: React Hooks
- **Image Optimization**: Next.js Image Component
- **Icons**: Lucide React

## 📝 Design System Prompt for Future Reference

When implementing new pages or components for the LOS ALTOS website, follow these guidelines:

### Component Creation Prompt
```
Create a [component name] for the LOS ALTOS architecture website with these specifications:

Visual Style:
- Use glassmorphism effects (bg-gray-100/85 backdrop-blur-xl)
- Implement rounded corners (rounded-2xl for containers)
- Add subtle shadows (shadow-xl)
- Maintain 10-20px padding from edges

Colors:
- Backgrounds: White or gray-100 with transparency
- Text: zinc-800 for headers, zinc-600 for body
- Borders: gray-200/50 or gray-300/50
- Hover states: Darken by one shade

Typography:
- Headers: font-light with larger sizes
- Body: font-light or font-normal
- Uppercase text: text-xs or text-sm with tracking-wider

Interactions:
- Use Framer Motion for animations
- Transition duration: 0.3-0.6s
- Easing: [0.22, 1, 0.36, 1]
- Hover effects: scale(1.05) or opacity changes

Layout:
- Mobile-first responsive design
- Use grid or flex layouts
- Maintain consistent spacing (gap-4, gap-6, gap-8)
- Max container width: 1600px

Remember:
- Navigation should be white at top, glass when scrolled
- Search sidebar should be a rounded rectangle with padding
- All interactive elements need hover states
- Maintain consistency with existing components
```

### Navigation Behavior
```
Navigation specifications:
- Position: fixed top-0 left-0 right-0 z-40
- Initial state: bg-white shadow-sm
- Scrolled state: bg-gray-100/80 backdrop-blur-xl
- Dropdown menus: bg-gray-100/90 backdrop-blur-xl
- Mobile menu: Full-height sidebar with glass effect
```

### Project Card Specifications
```
Project cards should include:
- Aspect ratio containers for consistent sizing
- Rounded corners (rounded-xl or rounded-2xl)
- Image with scale(1.05) on hover
- Liquid glass overlay on hover
- Project title and location/tags
- Smooth transitions (duration-500 or duration-700)
```

## 🔧 Development Setup

```bash
# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Start production server
npm start
# or
pnpm start
```

## 📁 Project Structure

```
architecture-portfolio/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── projects/          # Projects section
│   ├── about/             # About section
│   ├── services/          # Services section
│   └── contact/           # Contact section
├── components/            # React components
│   ├── home/             # Homepage-specific components
│   ├── layout/           # Layout components (header, footer)
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and constants
│   ├── constants/        # Data constants
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── public/               # Static assets
│   ├── image.png         # Project images (1-6)
│   └── ...
├── styles/               # Additional styles (if any)
└── README.md            # This file
```

## 🎯 Performance Optimizations

1. **Image Optimization**
   - Using Next.js Image component
   - Lazy loading for below-fold images
   - Responsive image sizing
   - Priority loading for hero images

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Route-based code splitting
   - Conditional component loading

3. **Animation Performance**
   - GPU-accelerated transforms
   - Will-change CSS property
   - Reduced motion preferences support

## 🔐 Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_SITE_URL=https://losaltos.com
NEXT_PUBLIC_API_URL=https://api.losaltos.com
```

## 📄 License

Copyright © 2024 LOS ALTOS. All rights reserved.

## 🤝 Contributing

For internal development team only. Please follow the design system guidelines and maintain consistency with existing patterns.

---

Built with precision and passion by LOS ALTOS Development Team