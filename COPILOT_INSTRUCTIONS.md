# COPILOT_INSTRUCTIONS.md

## Purpose

This repository contains the Fluxline Resonance Group's web platform. It is built with **Next.js 16.0.0** using the **App Router** and **React 19.2.0**, following strict design, layout, and architectural guidelines for maintainability, UI consistency, and future integration with Azure backend services.

---

## General Development Guidelines

### Framework & Architecture

- **Always use Next.js App Router conventions**
  - App Router directory structure (`/app` directory)
  - Server Components by default, Client Components when needed
  - File-based routing with `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
  - API routes in `/app/api` directory
  - Leverage Next.js built-in optimizations (Image, Font, Bundle optimization)

### Theme & Design System

- **Use Tailwind CSS 4+ and component-based design patterns**
  - All new components and features must utilize Tailwind utility classes
  - Create reusable component libraries for consistency
  - Support dark mode, light mode, and high-contrast mode
  - Use CSS custom properties for theme variables

### Package Management

- **Use the `yarn` package manager exclusively** for all dependency management and scripts
  - Do not use `npm`, `pnpm`, or `bun` for installs, scripts, or lockfiles
  - Current Node.js requirement: **>= 20.0.0** (specified in `package.json`)
  - Ensure all packages (Next.js, React, TypeScript, Tailwind, etc.) are kept up to date
  - If a version upgrade is required for any packages, do so under a separate feature branch request for full testing

### Node & Environment

- The project uses **Node.js >= 20.0.0**
- `.nvmrc` file should be maintained if Node version needs to be pinned for consistency
- Environment variables should be configured in `.env.local` (see `.env.example` for reference)
- Development server: `yarn dev`
- Production build: `yarn build`
- Production server: `yarn start`

### Styling

- **Priority order: Tailwind CSS → Fluent UI theme.ts JSX Styling → SCSS component-specific Modules → Sass**
  - Primary styling should be achieved with **Tailwind CSS** utility classes
  - Utilize Fluent UI v8's useTheme() in theme.ts for anything theme, dark mode, typography related
  - Fluent UI v8 is where theme switching occurs; please use JSX-based styling from Fluent UI for these purposes, not Tailwind
  - Use CSS Modules (`*.module.scss`) for component-specific styles
  - Use SASS (`*.module.scss`) for complex styling when needed
  - Avoid excessive custom CSS and minimize the use of `!important`
  - Follow responsive-first design principles
  - Auto-generated CSS type definitions are ignored in git

### Component Reuse & Layout

- **Favor reusing existing components and Next.js patterns**:
  - Use Next.js built-in components: `Image`, `Link`, `Font`
  - Use `PageWrapper` component for consistent page layouts
  - Create reusable layout components in `src/theme/components/layout/`
  - Implement consistent page layouts using `layout.tsx` files
  - Use Server Components for static content, Client Components for interactivity
- **Follow Next.js App Router conventions**
- Use component generators when available: `yarn generate:component ComponentName`
- **Component Development Workflow**:
  1. Generate: `yarn generate:component ComponentName`
  2. Generate SCSS types: `yarn scss-types` or `yarn scss-types:watch`
  3. Develop in `src/theme/components/component-name/`
  4. Test with: `yarn test component-name`
  5. Document with Storybook: `yarn storybook`
- **Page Layout Usage**:

  ```tsx
  // In your page.tsx file
  import { PageWrapper } from '@/components';

  export default function AboutPage() {
    return (
      <PageWrapper>
        <h1>About Us</h1>
        <p>Your content here...</p>
      </PageWrapper>
    );
  }
  ```

### State & Data Handling

- **Use appropriate state management for Next.js**
  - React Server Components for server-side data fetching
  - React state hooks (`useState`, `useReducer`) for local component state
  - Context API for shared client-side state
  - Consider Zustand or similar for complex client-side state management
  - Server Actions for form handling and mutations
- **Data fetching patterns**:
  - Server Components for initial data loading
  - `fetch` API with Next.js caching for server-side requests
  - SWR or TanStack Query for client-side data fetching when needed
- Provide **mock data with complete schema** for new features to aid backend development

### API Routes & Backend Integration

- **Use Next.js API Routes for backend functionality**
  - API routes in `/app/api` directory
  - Follow RESTful conventions and proper HTTP status codes
  - Implement proper error handling and validation
  - Use TypeScript for request/response types
- **Future Azure integration**:
  - API routes can interface with Azure services
  - Consider Azure Functions for complex backend logic
  - Use Azure Storage for file uploads and media
- **Environment variables for API configuration**:
  - `NEXT_PUBLIC_API_BASE_URL` (for client-side API calls)
  - `API_BASE_URL` (for server-side API calls)
  - `AZURE_STORAGE_CONNECTION_STRING`
  - `AZURE_CDN_BASE_URL`

### Content & Routing

- **Use Next.js App Router for all routing**
  - File-based routing with proper `page.tsx` files
  - Dynamic routes with `[param]` directories
  - Route groups with `(group)` directories when needed
  - Nested layouts for consistent page structure
  - Include image and routing within the PageWrapper.tsx file so images will appear based on route taken
- **Content management**:
  - Markdown content can be processed with MDX or similar
  - Static content in `/public` directory
  - Dynamic content through API routes or external APIs
  - Use Next.js `generateStaticParams` for static generation when applicable

### Scrolls/White Papers Management

- **Location**: `/src/app/services/scrolls/`
- **Asset Storage**: PDFs stored in `/public/scrolls/pdfs/`
- **Data Configuration**: Scroll metadata defined in `scrollsData.ts`

**Adding New Scrolls**:

1. Place PDF file in `/public/scrolls/pdfs/`
2. Update `scrollsData.ts` with scroll metadata:

   ```typescript
   {
     id: 'unique-scroll-id',
     title: 'Scroll Title',
     description: 'Brief description for card display',
     category: 'business-strategy' | 'development' | 'design' | 'wellness' | 'education' | 'coaching',
     pdfUrl: '/scrolls/pdfs/filename.pdf',
     fileSize: 'X.X MB',
     tags: ['tag1', 'tag2'],
     publishedDate: new Date('YYYY-MM-DD'),
     lastUpdated: new Date('YYYY-MM-DD'),
     seoMetadata: {
       title: 'SEO Title',
       description: 'SEO Description',
       keywords: ['keyword1', 'keyword2']
     }
   }
   ```

3. Run `yarn build` to regenerate static pages
4. New scroll will be automatically added to grid and detail route

**Component Patterns**:

- `ScrollCard`: Individual scroll card with download functionality
- `ScrollsGrid`: Responsive grid layout for scroll listings
- All scrolls use Server Components for listings
- Client Components used only for interactive download buttons
- Static generation for all scroll detail pages via `generateStaticParams`

**SEO Best Practices**:

- Each scroll has unique metadata with OpenGraph and Twitter Card support
- Dynamic metadata generation in detail pages
- Proper breadcrumbs for navigation context
- Structured data for enhanced search results

### Press Release System

- **Location**: `/src/app/press-release/`
- **Components**: Complete responsive card system with AdaptiveCardGrid
- **Data**: Mock data stored in `/src/store/mock-data/pressReleaseMock.ts`

**System Architecture**:

- **Listing Page**: Client component with 3 view modes (Grid, Small Tile, Large Tile)
- **Detail Pages**: Server components with static generation via `generateStaticParams`
- **Card System**: AdaptiveCardGrid → UnifiedCardContainer → UnifiedCard
- **Animations**: Framer Motion with 25ms staggered card appearances
- **Mobile Optimized**: Overflow protection and responsive breakpoints

**Adding New Press Releases**:

1. Update `pressReleaseMockData` array in mock file with complete schema
2. Include all required fields: `id`, `title`, `subtitle`, `description`, `date`, `imageUrl`
3. Add images to `/public/images/` directory
4. Run `yarn build` to regenerate static detail pages
5. New press release automatically appears in grid and gets detail route

**Key Features**:

- **Responsive Grid**: 1-4 columns based on device orientation
- **Fast Animations**: 125ms total stagger time for 6 cards
- **Hover Effects**: Smooth upward slide transitions with pointer cursor
- **Click Navigation**: Event delegation to detail pages
- **Mobile Protection**: No horizontal overflow, proper text wrapping
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation

**Component Details**:

- `AdaptiveCardGrid`: Smart grid with image dimension adaptation
- `UnifiedCardContainer`: Responsive container with CSS Grid/Flexbox
- `UnifiedCard`: Multi-view card component (grid, small, large, image modes)
- All use Fluent UI theming and Next.js Image optimization

For complete technical documentation, see `PRESS_RELEASE_README.md`

---

## Coding Best Practices

### Next.js Best Practices

- **Leverage Server Components by default**
  - Use Client Components only when necessary (interactivity, browser APIs, state)
  - Mark Client Components with `'use client'` directive at the top of files
  - Keep Client Components small and focused
- **Optimize performance**:
  - Use Next.js `Image` component for all images
  - Implement proper loading states with `loading.tsx`
  - Use `Suspense` boundaries for progressive loading
  - Optimize bundle size with dynamic imports when needed

### TypeScript

- Maintain **strict TypeScript typing** throughout the codebase
- No implicit `any` types - define proper interfaces and types
- Use Next.js TypeScript patterns for pages, layouts, and API routes
- Type definitions for external libraries should be kept up to date

### Component Development

- Use **functional components and hooks exclusively**
- Follow React 19.2.0 best practices and concurrent features
- Prefer composition over inheritance
- Keep components focused and single-responsibility
- Use Server Components for static content, Client Components for interactivity

### Styling Approach

- **Use Fluent UI for theme-aware styling**
  - Handle theme colors, interactive states, and design tokens with Fluent UI theming properties
  - Ensure accessibility and proper contrast ratios through Fluent UI color system
  - Example: Use `theme.palette.themePrimary` instead of hardcoded colors
- **Use Tailwind CSS for layout and utilities**
  - Example: Use `flex items-center justify-between` for layout instead of custom CSS
  - Example: Use `px-4 py-2 rounded-lg shadow-md` for consistent spacing and styling
  - Replace old JSX layout components with Tailwind utility classes where appropriate
- **SCSS Modules for complex component-specific styles**
  - Use when Tailwind utilities and Fluent UI theming are insufficient
  - Follow BEM naming conventions
  - Keep styles co-located with components
- **Global SCSS usage guidelines**
  - Avoid adding global styles unless absolutely necessary
  - Document reasoning when global styles are added
  - Prefer component-based or utility-based solutions

### Accessibility & Responsiveness

- Follow all **WCAG 2.1 AA accessibility guidelines**
- Ensure keyboard navigation works throughout
- Provide appropriate ARIA labels and roles
- Test with screen readers when implementing interactive components
- Use Tailwind's responsive utilities for mobile-first design
- Support all breakpoints:
  - sm: 640px+ (small devices)
  - md: 768px+ (medium devices)
  - lg: 1024px+ (large devices)
  - xl: 1280px+ (extra large devices)
  - 2xl: 1536px+ (2x extra large devices)

### Theme Support

- Ensure all pages/components work with theme modes:
  - **Dark mode** (using Tailwind's dark mode utilities)
  - **Light mode**: Clean, accessible design
  - **System preference**: Respect user's OS theme setting
- Use Tailwind's dark mode classes: `dark:bg-gray-900`, `dark:text-white`
- Implement theme switching functionality

### Documentation

- **Document all new features, API routes, and components**:
  - JSDoc comments for functions and components
  - README updates for major features
  - API documentation for route handlers
  - Component usage examples
- **API documentation**:
  - Request/response schemas
  - Authentication requirements
  - Error handling patterns

### Technical Debt & Quality

- **Actively remove technical debt found along the way**
  - Refactor outdated patterns when encountered
  - Migrate from Pages Router patterns if any remain
  - Test functionality after cleanup
- **Testing strategy**:
  - Unit tests for utility functions and API routes
  - Component tests with React Testing Library
  - Integration tests for critical user flows
  - Use Jest and Testing Library ecosystem
- Run tests with `yarn test` (when implemented)
- Ensure linting passes with `yarn lint`

---

## Technology Stack

### Core Framework

- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - Frontend library with concurrent features
- **TypeScript 5+** - Type safety and developer experience

### Styling & UI

- **Tailwind CSS 4+** - Utility-first CSS framework
- **Sass 1.93.2+** - CSS preprocessing (when needed)
- **CSS Modules** - Component-scoped styling
- **PostCSS** - CSS processing pipeline

### Development Tools

- **ESLint** - Code linting with Next.js configuration
- **Prettier** - Code formatting (if configured)
- **Babel React Compiler** - React optimization
- **TypeScript** - Static type checking

### Backend Integration (Planned)

- **Next.js API Routes** - Server-side API endpoints
- **Azure Static Web Apps** - Hosting platform
- **Azure Storage** - Media and asset storage
- **Azure CDN** - Content delivery network
- **Azure Functions** - External serverless functions (if needed)

---

## Project Structure

### Next.js App Router Structure

```text
/
├── app/                     # App Router directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Global loading UI
│   ├── error.tsx           # Global error UI
│   ├── not-found.tsx       # 404 page
│   ├── api/                # API routes
│   │   └── example/
│   │       └── route.ts    # API endpoint
│   └── (routes)/           # Route groups
│       ├── about/
│       │   ├── page.tsx    # About page
│       │   └── layout.tsx  # About layout
│       └── blog/
│           ├── page.tsx    # Blog listing
│           ├── [slug]/
│           │   └── page.tsx # Blog post
│           └── layout.tsx  # Blog layout
├── components/             # Reusable components
│   ├── ui/                # Basic UI components
│   └── layout/            # Layout components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
├── styles/                # Additional CSS files
├── public/                # Static assets
├── docs/                  # Documentation
└── config files           # Next.js, TypeScript, etc.
```

### Key Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `package.json` - Dependencies and scripts (use yarn only)
- `.gitignore` - Excludes build artifacts, node_modules, .env files

---

## Development Workflow

### Starting Development

```bash
yarn install              # Install dependencies
yarn dev                  # Start development server
```

### Building for Production

```bash
yarn build               # Create optimized production build
yarn start               # Start production server locally
```

### Code Quality

```bash
yarn lint                # Run ESLint
yarn lint --fix          # Fix auto-fixable issues
```

### Component Development Commands

```bash
# Generate new component with full structure
yarn generate:component ComponentName
# Creates:
# - component-name.tsx (React component with Fluent UI integration)
# - component-name.module.scss (SCSS styles with theme support)
# - component-name.module.scss.d.ts (TypeScript definitions - auto-generated)
# - component-name.test.tsx (Jest tests with React Testing Library)
# - component-name.stories.tsx (Storybook stories)
# - index.ts (barrel export)

# Generate SCSS TypeScript definitions
yarn scss-types              # One-time generation
yarn scss-types:watch        # Watch mode for development

# Testing
yarn test                     # Run all tests
yarn test component-name      # Run specific component tests

# Storybook
yarn storybook               # Start Storybook server
yarn build-storybook         # Build for deployment
```

---

## Issue & Pull Request Instructions

### For New Issues and PRs

1. **Reference this file** - Copy critical context into the issue body if needed
2. **Tag related files** - Mention specific components, pages, or API routes affected
3. **Document requirements clearly**:
   - API endpoints needed and their schemas
   - Component reuse opportunities
   - Responsive design requirements
   - Theme support (dark/light mode)
4. **State integration needs**:
   - Server vs. Client Component requirements
   - Data fetching patterns needed
   - State management approach
5. **Specify UX/design**:
   - Layout expectations and responsive behavior
   - Accessibility requirements
   - Performance considerations

### Branching Strategy

- Create feature branches from `master` or `develop`
- Use descriptive branch names: `feature/add-blog-system`, `fix/mobile-navigation`
- Ensure all linting and build checks pass before PR
- Include tests for new features when applicable

### Code Review Checklist

- [ ] Follows Next.js App Router conventions
- [ ] Uses yarn (not npm/pnpm/bun) for any dependency changes
- [ ] TypeScript types are properly defined
- [ ] Uses Tailwind CSS for styling
- [ ] Server/Client Components used appropriately
- [ ] Works in dark mode and light mode
- [ ] Responsive across all breakpoints
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] API routes follow proper patterns (if applicable)
- [ ] Documentation updated (code comments, README if needed)
- [ ] Build passes: `yarn build`
- [ ] Linting passes: `yarn lint`
- [ ] No console errors or warnings in development

---

## Notes

- This site is being migrated from a Create React App codebase to Next.js
- **Theme System Migration (Completed)**: The complete theme system has been successfully migrated from the React app, including:
  - Core theme configuration with 1888 lines of theme definitions
  - Zustand-based state management for user preferences
  - Fluent UI v8 integration with custom Fluxline Pro themes
  - Theme hooks (useAppTheme, useMediaQuery, useThemeColor, useReducedMotion)
  - Core components (Button, Card) with full theme integration
  - Support for dark mode (default), light mode, and high-contrast themes
  - SSR-compatible ThemeProvider with proper hydration handling
- API integration will initially use Next.js API routes, with potential Azure Functions for complex operations
- Environment variables should be properly configured for different deployment environments
- The project uses Next.js App Router (not Pages Router)
- All routing uses Next.js file-based routing conventions
- Build output is optimized for Azure Static Web Apps deployment

## Theme System Architecture

### State Management

- **Zustand Store**: `src/store/store-specs/userPreferencesStore.ts` - Manages user preferences including theme mode, font scale, layout preferences
- **Persistence**: User preferences are persisted to localStorage automatically
- **SSR Compatibility**: Theme state is hydrated properly on client-side

### Theme Provider

- **Location**: `src/theme/contexts/ThemeProvider.tsx`
- **Integration**: Wraps the entire app in `app/layout.tsx`
- **Features**: Applies theme to document, handles theme switching, integrates with Fluent UI

### Theme Configuration

- **Main File**: `src/theme/theme.ts` (1888 lines)
- **Exports**: Multiple theme modes (dark, light, high-contrast, grayscale)
- **Design Tokens**: Colors, typography, spacing, animations, shadows, gradients
- **Breakpoints**: xs (0px), sm (576px), md (768px), lg (1024px), xl (1366px), xxl (1920px)

### Available Hooks

- **useAppTheme**: Access theme object and theme switching functions
- **useMediaQuery**: Responsive breakpoint detection and device type queries
- **useThemeColor**: Get theme-aware colors based on current mode
- **useReducedMotion**: Detect and respect motion preferences

### Component Development Best Practices

- All components should be generated using `yarn generate:component ComponentName`
- Use Fluent UI components and theming properties for theme-aware styling
- Apply Tailwind CSS for layout and utilities (non-theme-dependent)
- Use SCSS modules only when Fluent UI and Tailwind are insufficient
- Add 'use client' directive to components that use hooks or interactivity

---

## Page Layout Infrastructure

### PageWrapper Component

- **Location**: `src/components/PageWrapper.tsx`
- **Purpose**: Main layout wrapper for all pages (except home page)
- **Features**:
  - Responsive 3fr/9fr grid layout (image left, content right)
  - Dynamic page-specific images based on route
  - Theme-aware Fluxline logo display
  - Animated page transitions with Framer Motion
  - Support for detail views with custom images
  - Mobile-first responsive design (stacked in portrait mode)

### ViewportGrid Component

- **Location**: `src/theme/components/layout/ViewportGrid.tsx`
- **Type**: Client Component ('use client')
- **Features**:
  - CSS Grid-based responsive layout
  - Automatic layout switching based on device orientation
  - Left-handed mode support (swaps image and content positions)
  - Auto-scroll to top on route changes
  - Content scrollability detection
  - Supports nested layouts

### UnifiedCard Component

- **Location**: `src/theme/components/card/unified-card.tsx`
- **Type**: Client Component ('use client')
- **Purpose**: Flexible card component for displaying images and content
- **Features**:
  - Image loading with spinner animation
  - Aspect ratio preservation for landscape images
  - Dark mode filtering with color vision accessibility
  - Title overlay on images
  - Multiple view types (image, grid, small, large)
  - Fluent UI typography integration

### Layout Hooks

All hooks are located in `src/theme/hooks/`:

- **useLayoutConfig**: Calculates grid layout based on device, orientation, and preferences
- **useContentScrollable**: Detects if content area is scrollable
- **useColorVisionFilter**: Applies color vision accessibility filters
- **useIsTextColorLight**: Determines text color based on image brightness
- **useDateFormatter**: Formats dates consistently across the app

### Page Configurations

PageWrapper includes pre-configured routes for:

- Services pages (consulting, development, design, etc.)
- Legal pages (terms, privacy, glossary)
- Content pages (blog, portfolio, my-content)
- About, contact, and other pages
- Dynamic 404 handling

---

**Built with strategic precision for modern business transformation.**

### Last Updated: 2025-11-19 - Author updated content for PageWrapper and Markdown formatting errors -Aplusandminus
