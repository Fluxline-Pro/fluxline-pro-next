# Press Release System

A complete press release management system built with Next.js 16, featuring responsive card layouts, dynamic routing, and smooth animations.

## Overview

The press release system provides a professional platform for displaying company announcements, media features, and milestone broadcasts. It includes both listing and detail views with full responsive design and accessibility support.

## Architecture

### Core Components

#### 1. **Press Release Page** (`/src/app/press-release/page.tsx`)

- **Type**: Client Component
- **Features**:
  - Responsive card grid with 3 view modes (Grid, Small Tile, Large Tile)
  - Dynamic column calculation based on device orientation
  - View type selector with Fluent UI dropdown
  - Click delegation for navigation to detail pages
  - Loading and error state handling
  - Empty state with helpful messaging

#### 2. **Press Release Detail Page** (`/src/app/press-release/[id]/page.tsx`)

- **Type**: Server Component
- **Features**:
  - Static generation with `generateStaticParams()`
  - Individual press release detail views
  - SEO-optimized metadata generation
  - Client-side detail component delegation

#### 3. **Press Release Detail Client** (`/src/app/press-release/[id]/PressReleaseDetailClient.tsx`)

- **Type**: Client Component
- **Features**:
  - Dynamic content rendering
  - Theme-aware styling
  - UnifiedPageWrapper integration
  - 404 handling for missing press releases

### Card System Components

#### 4. **AdaptiveCardGrid** (`/src/theme/components/card/AdaptiveCardGrid.tsx`)

- **Purpose**: Smart card grid with image dimension adaptation
- **Features**:
  - Automatic layout adaptation based on image aspect ratios
  - Staggered animations (25ms delay per card)
  - Click handler delegation to individual cards
  - Image dimension tracking for responsive layouts
  - Support for landscape, portrait, and square images

#### 5. **UnifiedCardContainer** (`/src/theme/components/card/UnifiedCardContainer.tsx`)

- **Purpose**: Responsive container for different view types
- **Features**:
  - CSS Grid layout for grid and small tile views
  - Flexbox layout for large tile and image views
  - Device-aware column calculations
  - Mobile overflow protection
  - Consistent row heights with `minmax()` functions

#### 6. **UnifiedCard** (`/src/theme/components/card/unified-card.tsx`)

- **Purpose**: Individual card rendering with multiple view modes
- **Features**:
  - Four view types: `grid`, `small`, `large`, `image`
  - Framer Motion animations with stagger support
  - Hover effects with smooth transitions
  - Responsive image handling with Next.js Image
  - Theme-aware styling with Fluent UI
  - Accessibility support and proper cursor states

### Data Management

#### 7. **Mock Data** (`/src/store/mock-data/pressReleaseMock.ts`)

- **Structure**: Complete press release schema
- **Features**:
  - Date-based sorting (newest first)
  - Rich metadata (title, subtitle, description, dates)
  - Image URLs and alt text
  - Unique IDs for routing
  - Export functions for data access

## View Modes

### Grid View

- **Layout**: 3-column grid (responsive)
- **Cards**: Image cards with title overlay
- **Aspect Ratio**: 5:3 ratio for consistent appearance
- **Animation**: 4px upward slide on hover

### Small Tile View

- **Layout**: Horizontal cards with thumbnail
- **Cards**: 80px image + text content
- **Responsive**: Single column on mobile, 2 columns on tablet+
- **Animation**: 2px upward slide on hover

### Large Tile View

- **Layout**: Full-width cards with large images
- **Cards**: 5:2 aspect ratio images + detailed content
- **Content**: Title, description, and date
- **Animation**: 3px upward slide on hover

## Responsive Design

### Breakpoints

- **Portrait**: 1 column
- **Mobile Landscape**: 2 columns
- **Tablet**: 3 columns
- **Desktop**: 3-4 columns (based on orientation)
- **Ultrawide**: 4 columns

### Mobile Optimizations

- Reduced padding on mobile devices
- Responsive dropdown sizing (150px min-width on portrait)
- Overflow protection with `width: auto` and `maxWidth: 100%`
- Text wrapping enabled (no `whiteSpace: nowrap`)
- Touch-friendly hover states

## Animation System

### Stagger Animations

- **Timing**: 25ms delay per card for fast appearance
- **Duration**: 0.15s fade-in with `easeOut` timing
- **Framer Motion**: Direct `motion.div` implementation
- **States**: `initial`, `animate`, `whileHover`

### Hover Effects

- **Grid Cards**: 4px upward slide + pointer cursor
- **Small Tiles**: 2px upward slide + pointer cursor
- **Large Tiles**: 3px upward slide + pointer cursor
- **Transition**: 0.2s duration with `easeOut` timing

## Navigation System

### Click Handling

- **Method**: Event delegation from parent container
- **Target**: `data-card-id` attribute matching
- **Handler**: Passed through AdaptiveCardGrid → UnifiedCard
- **Routing**: Next.js `router.push()` to `/press-release/[id]`

### URL Structure

```
/press-release                    # Listing page
/press-release/[id]              # Detail page
/press-release/fluxline-pro-launch-2025  # Example detail
```

## Performance Features

### Static Generation

- **Listing Page**: Client-side rendering for interactivity
- **Detail Pages**: Static generation with `generateStaticParams()`
- **Images**: Next.js Image component with optimizations
- **Animations**: Hardware-accelerated transforms

### Loading States

- **Initial Load**: Fast staggered card appearance
- **Navigation**: Next.js built-in page transitions
- **Images**: Progressive loading with Next.js Image
- **Error Handling**: Graceful degradation with error boundaries

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full tab support
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: Fluent UI theme compliance
- **Focus Management**: Visible focus indicators
- **Motion Preferences**: Respect `prefers-reduced-motion`

### Semantic HTML

- **Cards**: Proper heading hierarchy (h1 → h3)
- **Navigation**: Semantic link elements
- **Images**: Descriptive alt text
- **Buttons**: Clear action labels

## Development Workflow

### Adding New Press Releases

1. **Add Data**: Update `pressReleaseMockData` array in mock file
2. **Structure**: Include all required fields (id, title, dates, etc.)
3. **Images**: Add to `/public/images/` directory
4. **Build**: Run `yarn build` to generate static pages
5. **Test**: Verify listing and detail pages work correctly

### Component Customization

1. **Styling**: Modify theme values in Fluent UI theme system
2. **Layout**: Adjust grid configurations in UnifiedCardContainer
3. **Animations**: Update Framer Motion properties in UnifiedCard
4. **Responsiveness**: Modify breakpoint logic in press-release page

### Testing Checklist

- [ ] All 6 press releases display in grid
- [ ] Cards appear with staggered animation (125ms total)
- [ ] Hover effects work with pointer cursor
- [ ] Click navigation works to detail pages
- [ ] All 3 view modes function properly
- [ ] Mobile layout has no horizontal overflow
- [ ] Text wraps properly in small tiles
- [ ] Responsive breakpoints work correctly
- [ ] Dark/light theme support
- [ ] Accessibility compliance

## File Structure

```
src/
├── app/
│   └── press-release/
│       ├── page.tsx                    # Main listing page
│       └── [id]/
│           ├── page.tsx                # Static detail page generator
│           └── PressReleaseDetailClient.tsx  # Client detail component
├── store/
│   └── mock-data/
│       └── pressReleaseMock.ts         # Press release data
└── theme/
    └── components/
        └── card/
            ├── AdaptiveCardGrid.tsx    # Smart card grid
            ├── UnifiedCardContainer.tsx # Responsive container
            └── unified-card.tsx        # Individual card component
```

## Integration Points

### UnifiedPageWrapper Integration

- Detail pages use UnifiedPageWrapper for consistent layout
- Automatic breadcrumb generation
- Theme-aware page transitions

### Theme System Integration

- Fluent UI theming for colors and typography
- Dark/light mode support
- Responsive typography scaling

### State Management

- Zustand store for view type persistence
- Device orientation detection
- User preference handling

## Future Enhancements

### Planned Features

- [ ] Search and filtering capabilities
- [ ] Category-based organization
- [ ] RSS feed generation
- [ ] Social media sharing
- [ ] Print-friendly layouts
- [ ] Archive view by year/month

### Backend Integration

- [ ] CMS integration for content management
- [ ] Azure Static Web Apps deployment
- [ ] CDN integration for images
- [ ] Analytics tracking
- [ ] SEO optimization

---

**Built with Next.js 16 App Router, React 19, TypeScript, and Fluent UI for enterprise-grade performance and accessibility.**

### Last Updated: November 17, 2025
