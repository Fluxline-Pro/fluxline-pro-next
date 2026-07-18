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
- [Fluxline Ecosystem Integration](#-fluxline-ecosystem-integration)
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
- 📹 **Video Section** - YouTube channel integration with automatic video fetching
- 🎙️ **Podcast Section** - Azure-backed podcast episodes with RSS feed generation
- **Services** - Dynamic service pages with detailed information

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
│   │   ├── blog/                 # File-based blog system
│   │   ├── case-studies/         # Case study pages
│   │   ├── contact/              # Contact page
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
│   ├── lib/                      # Environment & API helpers (server-side / env-specific)
   │   ├── environment.ts        # Centralized environment detection
   │   └── getApiUrl.ts          # API URL helper
   └── utils/                    # Isomorphic utilities (safe for client + server)
       ├── jsonLd.ts             # Safe JSON-LD serialization
       └── tag-utils.ts          # Tag/category helpers
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
├── scripts/                      # Build scripts
│   └── generate-component.js     # Component generator
├── ANIMATIONS.md                 # Animation system guide
├── HOOKS.md                      # Custom hooks reference
├── FILE_BASED_BLOG_GUIDE.md      # Blog content guide
├── ENVIRONMENT_VARIABLES.md      # Environment variables reference
├── TOKEN_ACCESS_README.md        # Token-based access control
├── VIDEO_UPLOAD_INSTRUCTIONS.md  # Video upload guide
└── QUICK_SETUP_GUIDE.md          # Quick setup reference
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

- **[GitHub Copilot Instructions](.github/copilot-instructions.md)** - Development guidelines and architecture (⭐ Start here)
- **[ANIMATIONS.md](ANIMATIONS.md)** - Animation system guide
- **[HOOKS.md](HOOKS.md)** - Custom React hooks reference
- **[src/theme/THEMING.md](src/theme/THEMING.md)** - Theme system documentation

### Feature Documentation

- **[FILE_BASED_BLOG_GUIDE.md](FILE_BASED_BLOG_GUIDE.md)** - Complete blog system guide
- **[ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md)** - Environment variables reference
- **[TOKEN_ACCESS_README.md](TOKEN_ACCESS_README.md)** - Token-based access control
- **[VIDEO_UPLOAD_INSTRUCTIONS.md](VIDEO_UPLOAD_INSTRUCTIONS.md)** - Testimonial video upload guide

### Azure Documentation

- **[azure/README.md](azure/README.md)** - Azure infrastructure overview
- **[azure/docs/SETUP-GUIDE.md](azure/docs/SETUP-GUIDE.md)** - Complete Azure setup
- **[azure/docs/QUICK-REFERENCE.md](azure/docs/QUICK-REFERENCE.md)** - Common commands

### Content Creation

- **[public/blog/posts/HOW_TO_CREATE_A_BLOG_POST.md](public/blog/posts/HOW_TO_CREATE_A_BLOG_POST.md)** - Blog post creation guide
- **[public/portfolio/posts/HOW_TO_CREATE_A_PORTFOLIO_PROJECT.md](public/portfolio/posts/HOW_TO_CREATE_A_PORTFOLIO_PROJECT.md)** - Portfolio project guide
- **[public/press-release/posts/HOW_TO_CREATE_A_PRESS_RELEASE.md](public/press-release/posts/HOW_TO_CREATE_A_PRESS_RELEASE.md)** - Press release creation guide
- **[public/case-studies/posts/HOW_TO_CREATE_A_CASE_STUDY.md](public/case-studies/posts/HOW_TO_CREATE_A_CASE_STUDY.md)** - Case study creation guide
- **[api/HOW_TO_ADD_PODCAST_EPISODE.md](api/HOW_TO_ADD_PODCAST_EPISODE.md)** - Podcast episode upload guide
- **[VIDEO_UPLOAD_INSTRUCTIONS.md](VIDEO_UPLOAD_INSTRUCTIONS.md)** - YouTube video instructions

## 🔗 Fluxline Ecosystem Integration

Fluxline.pro is one of four apps sharing a single identity + data backbone.
The canonical design doc is
[INTEGRATION-ARCHITECTURE.md](INTEGRATION-ARCHITECTURE.md) (the same copy
ships in all four repos).

### The Four Apps

| App                | Host                   | Role                                                |
| ------------------ | ---------------------- | --------------------------------------------------- |
| **Fluxline.pro**   | `fluxline.pro`         | Public site, marketing, identity surface (this repo)|
| **CMS**            | `cms.fluxline.pro`     | Courses, lessons, guides, dashboard, achievements   |
| **Storefront**     | `store.fluxline.pro`   | Catalog, checkout, entitlements (only Stripe owner) |
| **Account**        | `account.fluxline.pro` | Identity hub: profile, settings, progress           |

### Shared Entra Sign-in (Header Avatar)

All four apps use **one shared Entra External ID app registration** via
`@azure/msal-browser`, giving true SSO across subdomains. On this site:

- The MSAL auth stack lives in `src/lib/auth/` (`AuthProvider`, `useAuth`,
  `msalConfig`, `authStatus`), mounted in `src/app/providers.tsx`.
- The header (`src/theme/components/dsm/FxNav.tsx` +
  `FxUserMenu.tsx`) shows a **Sign in** control when signed out and an
  **initials avatar** with a My Account / Sign out menu when signed in.
- The MSAL redirect lands on `/auth/callback/`
  (`src/app/auth/callback/page.tsx`, static-export compatible).
- Cross-subdomain state uses the non-secret `fluxline_auth_status` cookie on
  `.fluxline.pro` (plus same-origin localStorage): a sign-in on
  account.fluxline.pro is reflected here instantly, and MSAL `ssoSilent`
  upgrades the hint to a real session. The cookie is a UI hint only — never a
  token, never a security boundary.
- **`oid` is the universal user key** across the ecosystem; anything
  privileged calls a Function that validates the real Entra Bearer token.

### `/api/entitlements`

`GET /api/entitlements` (classic-model Azure Function) validates the caller's
Entra token (RS256 via tenant JWKS, issuer + audience checks) and reads the
SHARED Entitlements/Events tables to answer "what does this user own". See
`api/entitlements/` and `api/lib/`.

### Environment Variables (Integration)

Frontend (build-time, `.env.example`):

| Variable                     | Required | Purpose                                            |
| ---------------------------- | -------- | -------------------------------------------------- |
| `NEXT_PUBLIC_MSAL_CLIENT_ID` | Yes      | Shared Entra app registration (client) ID          |
| `NEXT_PUBLIC_MSAL_AUTHORITY` | Yes      | Entra authority URL (CIAM authority for Ext. ID)   |
| `NEXT_PUBLIC_ACCOUNT_URL`    | No       | Account portal URL (default `https://account.fluxline.pro`) |

Backend (Functions, `api/local.settings.sample.json`):

| Variable                            | Required               | Purpose                                       |
| ----------------------------------- | ---------------------- | --------------------------------------------- |
| `ENTRA_TENANT_ID`                   | Yes (entitlements)     | Tenant GUID for token validation              |
| `ENTRA_API_AUDIENCE`                | No (default)           | Expected `aud` (default `api://fluxline-identity`) |
| `ENTRA_ISSUER` / `ENTRA_JWKS_URI`   | CIAM only              | Issuer / JWKS overrides for Entra External ID |
| `SHARED_STORAGE_CONNECTION_STRING`  | Yes (entitlements)     | SHARED user-data storage account              |
| `ENTITLEMENTS_TABLE` / `EVENTS_TABLE` | No (defaults)        | Table-name overrides                          |
| `EVENT_SOURCE`                      | No (default `www`)     | Source tag for Events rows written here       |

The full variable reference (all scopes) is in
[ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md).

## 🚢 Deployment

### Azure Static Web Apps

The project is configured for Azure Static Web Apps deployment:

**Environments:**

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

These are the project's breakpoints defined in [`src/theme/theme.ts`](src/theme/theme.ts), used for media queries and `useMediaQuery`/`useDeviceType` hooks:

- **xs**: 0px (extra small devices)
- **sm**: 576px (small devices)
- **md**: 768px (tablets)
- **lg**: 1024px (large tablets / small desktop)
- **xl**: 1366px (desktop)
- **xxl**: 1920px (large desktop / ultrawide)

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

### Testing Tag Navigation Locally

Taxonomy routes (blog tags/categories, portfolio tags/technologies) use **URL slugs**, so they
behave identically in `yarn dev`, a local production build, and on Azure. Test them wherever is
convenient:

```bash
yarn dev
# Visit http://localhost:3000/blog/tag/personal-growth/ or click any tag chip
```

Validation errors on these routes in dev mode are **real bugs** — they are no longer expected
behavior and should not be ignored.

**Taxonomy routing convention:**

```typescript
// Route params are slugs; display names live in content frontmatter.
export async function generateStaticParams() {
  return tags.map((tag) => ({
    tag: slugify(tag), // 'Personal Growth' -> creates "personal-growth/" folder
  }));
}

// Pages resolve the slug back to its display name for all visible text.
const tag = resolveSlug(tagSlug, getAllTags()); // 'personal-growth' -> 'Personal Growth'
if (!tag) notFound();
```

A slug is lowercase ASCII with hyphens only, so it is byte-identical whether encoded or not.
That removes the old dependency on exact encode/decode symmetry between the browser, the Azure
edge, and the file system — the source of the PR #111 404s.

**Do not:**

- ❌ Remove `dynamicParams = false` from tag/category/technology pages
- ❌ Use `encodeURIComponent()` for taxonomy paths — build hrefs with `slugify()` instead
- ❌ Put display names in route params or `generateStaticParams()` returns
- ❌ Add a second slugify implementation — import it from `src/utils/slug.ts`

Slug collisions (two distinct display names producing the same slug) **fail the build by design**.
Resolve them by renaming the conflicting term in content frontmatter.

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
- `src/app/tailwind.css` - Tailwind CSS 4 entry point (CSS-based config; no `tailwind.config.ts`)
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

- **Documentation**: Start with [GitHub Copilot Instructions](.github/copilot-instructions.md)
- **Issues**: Open GitHub issues for bugs
- **Questions**: Check existing documentation first

## 🎯 Roadmap

### Completed

- ✅ Next.js 16 migration
- ✅ Theme system implementation
- ✅ File-based blog system
- ✅ MDX content support
- ✅ Azure Static Web Apps integration
- ✅ Component generator
- ✅ Animation system
- ✅ Testing infrastructure

### Planned

- [ ] Search functionality
- [ ] Newsletter integration
- [ ] Analytics dashboard
- [ ] Performance monitoring
- [ ] E2E testing with Playwright

---

**Built with precision for modern business transformation.**

**Last Updated:** June 11, 2026
