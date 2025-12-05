# Fluxline Pro Next.js

A modern, enterprise-grade web platform built with **Next.js 16.0.0**, **React 19.2.0**, and **TypeScript** for the Fluxline Resonance Group. Features a comprehensive design system, file-based content management, and full Azure Static Web Apps integration.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Documentation](#-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Core Features

- ✅ **Next.js 16 App Router** - Modern file-based routing with Server and Client Components
- ✅ **Static Site Generation (SSG)** - Pre-rendered pages for optimal performance
- ✅ **TypeScript Strict Mode** - Type-safe throughout with comprehensive interfaces
- ✅ **Responsive Design** - Mobile-first with support for all device sizes
- ✅ **Theme System** - Dark/light modes with Fluent UI integration
- ✅ **Accessibility** - WCAG 2.1 AA compliant with keyboard navigation

### Content Management

- 📝 **Blog System** - File-based Markdown blog with frontmatter, tags, categories, and image galleries
- 📰 **Press Releases** - Markdown-based press releases with year filtering and carousel support
- 📊 **Case Studies** - File-based case studies with industry/service filtering and metrics visualization
- 🎨 **Portfolio** - Markdown project showcases with galleries, tags, and external links
- 📄 **Scrolls/White Papers** - Downloadable strategic insights with metadata
- 🏢 **Services** - Dynamic service pages with detailed information

### Development Tools

- 🎨 **Component Generator** - `yarn generate:component` for scaffolding
- 📖 **Storybook** - Component documentation and testing
- 🧪 **Testing Suite** - Jest and React Testing Library
- 🎭 **Animation System** - Framer Motion with accessibility support
- 🎨 **SCSS Modules** - Component-scoped styling with type generation

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library with concurrent features
- **TypeScript 5+** - Static typing and enhanced DX

### Styling & UI

- **Tailwind CSS 4+** - Utility-first CSS framework
- **Fluent UI v8** - Microsoft design system components
- **SASS 1.93.2+** - CSS preprocessing
- **Framer Motion** - Animation library

### State & Data

- **Zustand** - Lightweight state management
- **gray-matter** - Frontmatter parsing for Markdown
- **react-markdown** - Markdown rendering

### Development

- **ESLint** - Code linting
- **Jest** - Unit testing
- **Storybook** - Component development
- **TypeScript** - Type checking

### Deployment

- **Azure Static Web Apps** - Hosting platform
- **GitHub Actions** - CI/CD pipeline
- **Azure Key Vault** - Secret management

## 📁 Project Structure

```
fluxline-pro-next/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── about/                # About page with team profiles
│   │   ├── blog/                 # File-based blog system
│   │   ├── case-studies/         # Case study pages
│   │   ├── contact/              # Contact page
│   │   ├── fluxline-ethos/       # Company philosophy page
│   │   ├── press-release/        # Press release system
│   │   ├── services/             # Service pages
│   │   │   └── scrolls/          # Strategic insights/white papers
│   │   └── testimonials/         # Client testimonials
│   ├── animations/               # Framer Motion animations
│   │   ├── config.ts             # Animation constants
│   │   ├── variants.ts           # Reusable variants
│   │   └── fade-animations.tsx   # Animation components
│   ├── components/               # Shared React components
│   │   ├── LegalPageLayout.tsx
│   │   ├── ProtectedEmail.tsx
│   │   └── UnifiedPageWrapper.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── useClickOutside.ts
│   │   ├── useDebounce.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── ... (12 hooks total)
│   ├── theme/                    # Theme system
│   │   ├── theme.ts              # Fluent UI theme configuration
│   │   ├── _theme.scss           # SCSS theme variables
│   │   ├── components/           # Themed UI components
│   │   ├── contexts/             # Theme provider
│   │   └── hooks/                # Theme-related hooks
│   ├── store/                    # Zustand state management
│   │   ├── store.ts              # Main store
│   │   └── mock-data/            # Mock data for features
│   └── utils/                    # Utility functions
├── public/                       # Static assets
│   ├── blog/                     # Blog Markdown files & images
│   │   └── posts/
│   │       └── [slug]/
│   │           ├── markdown/
│   │           │   └── post.md
│   │           └── images/
│   ├── press-release/            # Press release Markdown files & images
│   │   └── posts/
│   │       └── [id]/
│   │           ├── markdown/
│   │           │   └── release.md
│   │           └── images/
│   ├── case-studies/             # Case study Markdown files & images
│   │   └── posts/
│   │       └── [id]/
│   │           ├── markdown/
│   │           │   └── case-study.md
│   │           └── images/
│   ├── portfolio/                # Portfolio project Markdown files & images
│   │   └── posts/
│   │       └── [slug]/
│   │           ├── markdown/
│   │           │   └── project.md
│   │           └── images/
│   ├── scrolls/                  # White paper PDFs
│   │   └── pdfs/
│   └── images/                   # General images
├── azure/                        # Azure infrastructure
│   ├── scripts/                  # Deployment scripts
│   ├── arm-templates/            # ARM templates
│   └── docs/                     # Azure documentation
├── docs/                         # Documentation
│   ├── ANIMATIONS.md             # Animation system guide
│   ├── HOOKS.md                  # Custom hooks reference
│   ├── BLOG_IMPLEMENTATION.md    # Blog system docs
│   └── ... (more docs)
└── scripts/                      # Build scripts
    └── generate-component.js     # Component generator
```

## 💻 Development

### Prerequisites

- **Node.js** >= 20.18.0
- **Yarn** >= 1.22.18 (package manager)

### Available Scripts

```bash
# Development
yarn dev                          # Start dev server (http://localhost:3000)
yarn build                        # Production build
yarn start                        # Start production server
yarn lint                         # Run ESLint
yarn lint:fix                     # Fix linting issues

# Component Development
yarn generate:component MyComponent   # Generate new component
yarn scss-types                       # Generate SCSS type definitions
yarn scss-types:watch                 # Watch mode for SCSS types

# Testing
yarn test                         # Run all tests
yarn test:watch                   # Watch mode
yarn test:coverage                # Generate coverage report
yarn test:ci                      # CI test run

# Storybook
yarn storybook                    # Start Storybook (http://localhost:6006)
yarn build-storybook              # Build Storybook for deployment

# Utilities
yarn clean                        # Clean build artifacts
yarn type-check                   # TypeScript type checking
```

### Component Generator

Generate a new component with full scaffolding:

```bash
yarn generate:component ButtonGroup
```

Creates:

- `button-group.tsx` - React component
- `button-group.module.scss` - Styles
- `button-group.module.scss.d.ts` - Type definitions (auto-generated)
- `button-group.test.tsx` - Jest tests
- `button-group.stories.tsx` - Storybook story
- `index.ts` - Barrel export

### SCSS Type Generation

Generate TypeScript definitions for SCSS modules:

```bash
yarn scss-types          # One-time generation
yarn scss-types:watch    # Watch mode (recommended during development)
```

### Theme System

The project uses **Fluent UI v8** for theming with custom extensions:

```typescript
import { useAppTheme } from '@/theme/hooks';

function MyComponent() {
  const { theme, isDark, toggleTheme } = useAppTheme();

  return (
    <div style={{
      backgroundColor: theme.palette.white,
      color: theme.palette.neutralPrimary
    }}>
      Current mode: {isDark ? 'dark' : 'light'}
    </div>
  );
}
```

**Available Themes:**

- Dark mode (default)
- Light mode
- High-contrast mode
- Colorblind modes (protanopia, deuteranopia, tritanopia)
- Grayscale variants

See [`src/theme/THEMING.md`](src/theme/THEMING.md) for complete documentation.

### Custom Hooks

12 production-ready hooks available:

- **Utility:** `useDebounce`, `useThrottle`, `useToggle`, `usePrevious`
- **Browser:** `useClickOutside`, `useKeyPress`, `useScrollPosition`, `useLocalStorage`, `useSessionStorage`
- **Interaction:** `useHoverState`, `useIntersectionObserver`
- **Press Release:** `usePressReleaseApi`

See [`HOOKS.md`](HOOKS.md) for API documentation.

### Animation System

Built on **Framer Motion** with accessibility support:

```tsx
import { FadeUp, StaggeredContainer } from '@/animations';

<StaggeredContainer stagger={0.1}>
  <FadeUp>
    <Card>Item 1</Card>
  </FadeUp>
  <FadeUp>
    <Card>Item 2</Card>
  </FadeUp>
  <FadeUp>
    <Card>Item 3</Card>
  </FadeUp>
</StaggeredContainer>;
```

See [`ANIMATIONS.md`](ANIMATIONS.md) for complete guide.

## 📚 Documentation

### Core Documentation

- **[COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md)** - Development guidelines and architecture (⭐ Start here)
- **[ANIMATIONS.md](ANIMATIONS.md)** - Animation system guide
- **[HOOKS.md](HOOKS.md)** - Custom React hooks reference
- **[src/theme/THEMING.md](src/theme/THEMING.md)** - Theme system documentation

### Feature Documentation

- **[BLOG_IMPLEMENTATION.md](BLOG_IMPLEMENTATION.md)** - Blog system overview
- **[FILE_BASED_BLOG_GUIDE.md](FILE_BASED_BLOG_GUIDE.md)** - Complete blog guide
- **[PORTFOLIO_REFACTORING_SUMMARY.md](PORTFOLIO_REFACTORING_SUMMARY.md)** - Portfolio markdown migration
- **[CASE_STUDIES_IMPLEMENTATION.md](CASE_STUDIES_IMPLEMENTATION.md)** - Case studies markdown system
- **[CONTENT_LISTING_CONSOLIDATION.md](CONTENT_LISTING_CONSOLIDATION.md)** - Unified listing system
- **[UNIFIED_CONTENT_DETAIL_SUMMARY.md](UNIFIED_CONTENT_DETAIL_SUMMARY.md)** - Unified detail pages
- **[SCROLLS_IMPLEMENTATION_SUMMARY.md](SCROLLS_IMPLEMENTATION_SUMMARY.md)** - Scrolls/white papers system

### Phase Documentation

- **[PHASE_2_COMPLETION.md](PHASE_2_COMPLETION.md)** - Phase 2 migration summary
- **[SCROLLS_IMPLEMENTATION_SUMMARY.md](SCROLLS_IMPLEMENTATION_SUMMARY.md)** - Scrolls implementation

### Azure Documentation

- **[azure/README.md](azure/README.md)** - Azure infrastructure overview
- **[azure/docs/SETUP-GUIDE.md](azure/docs/SETUP-GUIDE.md)** - Complete Azure setup
- **[azure/docs/QUICK-REFERENCE.md](azure/docs/QUICK-REFERENCE.md)** - Common commands

### Content Creation

- **[public/blog/posts/HOW_TO_CREATE_A_BLOG_POST.md](public/blog/posts/HOW_TO_CREATE_A_BLOG_POST.md)** - Blog post creation guide
- **[public/portfolio/posts/HOW_TO_CREATE_A_PORTFOLIO_PROJECT.md](public/portfolio/posts/HOW_TO_CREATE_A_PORTFOLIO_PROJECT.md)** - Portfolio project guide
- **[public/press-release/posts/HOW_TO_CREATE_A_PRESS_RELEASE.md](public/press-release/posts/HOW_TO_CREATE_A_PRESS_RELEASE.md)** - Press release creation guide
- **[public/case-studies/posts/HOW_TO_CREATE_A_CASE_STUDY.md](public/case-studies/posts/HOW_TO_CREATE_A_CASE_STUDY.md)** - Case study creation guide

## 🚢 Deployment

### Azure Static Web Apps

The project is configured for Azure Static Web Apps deployment:

**Environments:**

- **Dev** (`develop` branch) - Free tier
- **Test** (`test` branch) - Free tier
- **Production** (`master` branch) - Standard tier

### GitHub Actions

CI/CD pipeline automatically:

1. Runs type checking and linting
2. Executes test suite
3. Builds the application
4. Deploys to appropriate Azure environment

### Manual Deployment

```bash
# Build for production
yarn build

# Deploy to Azure (via Azure CLI)
az staticwebapp deploy \
  --app-name az-fluxline-next-prod \
  --resource-group az-fluxline-rg
```

See [`azure/README.md`](azure/README.md) for detailed deployment instructions.

## 🎨 Design System

### Styling Priority

1. **Tailwind CSS** - Layout and utilities (preferred)
2. **Fluent UI Theme** - Theme-aware colors and typography
3. **SCSS Modules** - Component-specific styles
4. **Inline Styles** - Avoid when possible

Example:

```tsx
// ✅ Preferred: Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-lg">

// ✅ Good: Fluent UI theme for colors
const { theme } = useAppTheme();
<div style={{ backgroundColor: theme.palette.themePrimary }}>

// ✅ OK: SCSS modules for complex styles
import styles from './component.module.scss';
<div className={styles.complexLayout}>

// ❌ Avoid: Inline styles with hardcoded values
<div style={{ backgroundColor: '#0078d4', padding: '24px' }}>
```

### Responsive Breakpoints

- **xs**: 0px (mobile portrait)
- **sm**: 576px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1366px (large desktop)
- **xxl**: 1920px (ultrawide)

## 🧪 Testing

### Unit Tests

Run with Jest and React Testing Library:

```bash
yarn test                # Run all tests
yarn test:watch          # Watch mode
yarn test:coverage       # Generate coverage
```

### Component Testing

Run Storybook for visual testing:

```bash
yarn storybook
```

### Accessibility Testing

Built-in accessibility checks:

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast validation

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
API_BASE_URL=https://api.example.com

# Azure Configuration
AZURE_STORAGE_CONNECTION_STRING=your-connection-string
AZURE_CDN_BASE_URL=https://cdn.example.com

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Build Configuration

Key files:

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS settings
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint rules
- `jest.config.js` - Jest testing configuration

## 📝 Content Management

### Adding Blog Posts

1. Create folder: `public/blog/posts/my-post-slug/`
2. Add Markdown: `public/blog/posts/my-post-slug/markdown/post.md`
3. Add images: `public/blog/posts/my-post-slug/images/`
4. Build: `yarn build`

See [Blog Guide](FILE_BASED_BLOG_GUIDE.md) for details.

### Adding White Papers

1. Add PDF: `public/scrolls/pdfs/my-paper.pdf`
2. Update: `src/app/services/scrolls/scrollsData.ts`
3. Build: `yarn build`

See [Scrolls README](src/app/services/scrolls/README.md) for details.

### Adding Press Releases

Press releases use a markdown-based file system:

1. Create folder: `public/press-release/posts/[release-id]/markdown/`
2. Create `release.md` with frontmatter
3. Add images (optional): `public/press-release/posts/[release-id]/images/`
4. Build: `yarn build`

See [Press Release Guide](public/press-release/posts/HOW_TO_CREATE_A_PRESS_RELEASE.md) for details.

## 🤝 Contributing

### Branching Strategy

- `master` - Production releases
- `develop` - Development branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes with proper commit messages
3. Run tests: `yarn test`
4. Run linting: `yarn lint`
5. Build successfully: `yarn build`
6. Submit PR with description
7. Wait for review and CI checks

### Code Standards

- ✅ TypeScript strict mode
- ✅ ESLint passing
- ✅ Tests included for new features
- ✅ Documentation updated
- ✅ Accessibility standards met
- ✅ Responsive design implemented

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🙋 Support

- **Documentation**: Start with [COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md)
- **Issues**: Open GitHub issues for bugs
- **Questions**: Check existing documentation first

## 🎯 Roadmap

### Completed

- ✅ Next.js 16 migration
- ✅ Theme system implementation
- ✅ File-based blog system
- ✅ Azure Static Web Apps integration
- ✅ Component generator
- ✅ Animation system
- ✅ Testing infrastructure

### Planned

- [ ] MDX support for blog posts
- [ ] Search functionality
- [ ] Newsletter integration
- [ ] Analytics dashboard
- [ ] Performance monitoring
- [ ] E2E testing with Playwright

---

**Built with precision for modern business transformation.**

**Last Updated:** November 24, 2025
