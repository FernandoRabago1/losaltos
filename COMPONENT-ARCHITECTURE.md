# Component Architecture - LOS ALTOS Website

## Why We Had Multiple Header Components

### Previous Structure (Problematic)

**Before unification, we had:**

1. **Navigation embedded in `app/page.tsx`** (Homepage)
   - Fully custom navigation with search functionality
   - Glassmorphism effects
   - Dropdown menus
   - Mobile menu
   - **Problem**: Not reusable, only on homepage

2. **`components/layout/ALTOSHeader.tsx`**
   - Separate header for other pages (projects, about, services, contact)
   - Different styling/behavior than homepage
   - **Problem**: Inconsistent with homepage navigation

3. **Possibly `components/layout/Header.tsx`**
   - Another header variant
   - **Problem**: Even more duplication and inconsistency

### Issues with Old Structure

❌ **Duplication**: Same navigation logic written multiple times
❌ **Inconsistency**: Different header styles across pages
❌ **Hard to maintain**: Changes needed in multiple files
❌ **Visibility bugs**: Navigation not visible on some pages until scroll
❌ **Confusing**: Which header should be used where?

## New Unified Structure (Solution)

### Single Navigation Component

**Now we have ONE component:**

`components/layout/Navigation.tsx`

✅ **Single source of truth** for all navigation
✅ **Consistent** across all pages
✅ **Easy to maintain**: Edit once, applies everywhere
✅ **Configurable**: Optional search button via props
✅ **Always visible**: White background on load, glass effect on scroll

### How It Works

```tsx
<Navigation
  showSearch={true}  // Homepage only
  onSearchClick={() => setIsSearchOpen(true)}
/>

<Navigation />  // All other pages (no search)
```

### Component Features

**Desktop Navigation:**
- Logo with link to homepage
- Dropdown menus for Projects, Services, Office
- Optional search button (homepage only)
- Language selector
- Glassmorphism effect on scroll

**Mobile Navigation:**
- Hamburger menu button
- Full-screen glass sidebar
- Categorized links
- Optional search button
- Smooth animations

**Scroll Behavior:**
- Default: `bg-white shadow-sm` (visible immediately)
- Scrolled: `bg-gray-100/50 backdrop-blur-xl` (glass effect)

## Component Usage Guide

### Homepage (`app/page.tsx`)

```tsx
import Navigation from '@/components/layout/Navigation';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navigation
        showSearch={true}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      {/* Page content */}
    </>
  );
}
```

### Other Pages (Projects, About, Services, Contact)

```tsx
import Navigation from '@/components/layout/Navigation';

export default function ProjectsLayout({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
```

## Footer Component Strategy

### Current Approach

- Check if `components/layout/Footer.tsx` exists
- If multiple footer components exist, unify them
- Use the same footer across all pages for consistency

### Implementation

```tsx
// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-16">
      {/* Footer content */}
    </footer>
  );
}

// In each layout file:
import Footer from '@/components/layout/Footer';
```

## Benefits of Unified Components

### 1. **Maintainability**
- Single file to edit for navigation changes
- Consistent updates across entire site
- Easier debugging

### 2. **Consistency**
- Same look and feel everywhere
- Unified user experience
- Professional appearance

### 3. **Performance**
- No duplicate code
- Smaller bundle size
- Faster development

### 4. **Simplicity**
- Easy to understand
- Clear component hierarchy
- Less confusion for developers

## Migration Steps

### ✅ Completed
1. Created unified `Navigation.tsx` component
2. Extracted all navigation logic from homepage
3. Made search functionality optional via props

### 🚧 In Progress
1. Updating all layouts to use new Navigation
2. Removing old ALTOSHeader.tsx
3. Checking for duplicate Header.tsx

### 📝 Next Steps
1. Update homepage to use Navigation component
2. Update all page layouts (projects, about, services, contact)
3. Remove old header files
4. Test navigation on all pages
5. Ensure navbar visibility on page load for all routes

## File Structure After Unification

```
components/
├── layout/
│   ├── Navigation.tsx       ✅ Single navigation component
│   ├── Footer.tsx          ✅ Single footer component
│   ├── ALTOSHeader.tsx     ❌ REMOVED
│   └── Header.tsx          ❌ TO BE REMOVED (if exists)
├── home/
│   ├── ProjectsGrid.tsx
│   └── AboutSection.tsx
└── ...

app/
├── page.tsx               🔄 Will use <Navigation />
├── layout.tsx             ✅ Root layout
├── projects/
│   ├── layout.tsx        🔄 Will use <Navigation />
│   └── page.tsx
├── about/
│   ├── layout.tsx        🔄 Will use <Navigation />
│   └── page.tsx
├── services/
│   ├── layout.tsx        🔄 Will use <Navigation />
│   └── page.tsx
└── contact/
    ├── layout.tsx        🔄 Will use <Navigation />
    └── page.tsx
```

## Design System Compliance

The unified Navigation component follows all design system specifications:

- ✅ Glassmorphism: `bg-gray-100/50 backdrop-blur-xl`
- ✅ Typography: `text-sm uppercase tracking-wider`
- ✅ Colors: `text-zinc-700` with `hover:text-zinc-900`
- ✅ Animations: Framer Motion with `ease: [0.22, 1, 0.36, 1]`
- ✅ Spacing: `px-6 md:px-8 py-4 md:py-6`
- ✅ Responsive: Mobile menu for small screens

---

**Last Updated**: 2024-09-30
**Status**: Migration in progress
