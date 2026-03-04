# GitHub Copilot Instructions

Instructions for GitHub Copilot when working with this Fluxline Pro Next.js repository.

**Full documentation**: See [COPILOT_INSTRUCTIONS.md](../COPILOT_INSTRUCTIONS.md) in the repository root for comprehensive development guidelines, detailed architecture, content systems, and Azure integration.

## Essential Configuration

### Package Manager & Node

- **Use `yarn` exclusively** - No npm, pnpm, or bun
- **Node.js >= 20.0.0** required
- Commands: `yarn dev`, `yarn build`, `yarn start`

### Styling Priority (Strict Order)

1. **Tailwind CSS** - Layout, spacing, all utilities
2. **Fluent UI theme.ts** - Theme colors, typography, design tokens
3. **SCSS Modules** - Complex component-specific styling only
4. **Sass** - Only as a fallback (avoid using)

### Architecture Rules

**Framework & Routing**:

- Use **Next.js App Router** with file-based routing
- **Server Components by default**, add `"use client"` only when needed (state, effects, browser APIs)
- Leverage Next.js built-in optimizations (Image, Font, Bundle)

**Component Organization**:

- Shared components → `src/components/`
- Custom hooks → `src/hooks/`
- Utilities → `src/lib/`
- Theme components → `src/theme/components/`
- Page components → `src/app/[route]/`

**State Management**:

- Use React Server Components for server-side data fetching
- Use Zustand for client-side state
- Use Server Actions for form handling and mutations
- Use SWR or TanStack Query for client-side data fetching when needed

### SEO Requirements

- Use Next.js `metadata` exports for **page/layout files only** (not markdown content)
- Blog posts, portfolio, press releases, and case studies are wrapped in page/layout files
- Page-level SEO is handled at the route level only

### Content Policy

- **Do NOT modify** existing copy or text content without explicit instructions
- Changes should be limited to structure, types, implementation details only
- Keep all tests passing when refactoring
- Preserve all existing functionality

## Critical Implementation Details

### Tag/Category/Technology Navigation ⚠️

**CRITICAL**: This configuration is required for tags with spaces to work on Azure deployment.

**Rules**:

1. Set `export const dynamicParams = false;` on all tag/category/technology pages
2. In `generateStaticParams()`: Return **UNENCODED strings** with real spaces (NOT `encodeURIComponent()`)
3. In navigation: Use `encodeURIComponent()` when building URLs
4. Test with production build: `yarn build && npx serve@latest out -p 3000`
5. Dev mode validation warnings are **expected and safe to ignore**

**Why This Works**:

```
generateStaticParams() → { tag: "Personal Growth" }
↓
Creates folder → /blog/tag/Personal Growth/
↓
Client navigation → router.push("/blog/tag/Personal%20Growth")
↓
Azure decodes → /blog/tag/Personal Growth/index.html ✅
```

**Files Using This Pattern** (already correct):

- `src/app/blog/tag/[tag]/page.tsx` ✅
- `src/app/blog/category/[category]/page.tsx` ✅
- `src/app/portfolio/tag/[tag]/page.tsx` ✅
- `src/app/portfolio/technology/[technology]/page.tsx` ✅

### Content Systems

**Blog System**:

- Location: `src/app/blog/`
- Content: Markdown files in `public/blog/posts/[slug]/markdown/post.md`
- Images: `public/blog/posts/[slug]/images/`
- Filters: Category (single-select), Tags (single-select)
- Server Components for data loading, Client Wrapper for interactivity

**Unified Listing Component**:

- Location: `src/components/ContentListingPage.tsx`
- Used by: Blog, Portfolio, Press Release, Case Studies
- Features: Grid/tile views, responsive layouts, integrated filtering, CTA sections
- Reduces code duplication by ~85%

**Unified Detail Component**:

- Location: `src/components/UnifiedContentDetail.tsx`
- Used by: All content detail pages
- Content-specific wrappers transform data into `UnifiedContentDetailConfig`
- Provides consistent styling and structure across all content types

### Component Development Workflow

1. **Generate**: `yarn generate:component ComponentName`
2. **Develop**: Create component logic in generated file
3. **Style**: Use Tailwind first, then SCSS modules if needed
4. **Test**: Write tests in `.test.tsx` file
5. **Document**: Add Storybook story in `.stories.tsx`
6. **Export**: Use barrel export in `index.ts`

### Typing & Type Safety

- Use **TypeScript strict mode** throughout
- Provide interfaces for all props and data structures
- Use `gray-matter` for Markdown frontmatter parsing
- Generate SCSS type definitions: `yarn scss-types`

### Testing & Quality

- Framework: Jest + React Testing Library
- Run tests: `yarn test`, `yarn test:watch`, `yarn test:coverage`
- Keep all tests passing when refactoring
- Lint: `yarn lint`, `yarn lint:fix`

### Azure & Deployment

- Environment: **Azure Static Web Apps**
- Branches: `develop` (dev), `test` (test), `master` (production)
- CI/CD: GitHub Actions (automatic on push)
- Secrets: Stored in GitHub and Azure Key Vault
- Deployment: Automatic via GitHub Actions

### Animation System

- Framework: **Framer Motion** with accessibility support
- Exports: `FadeUp`, `StaggeredContainer`, slide, scale animations
- Location: `src/animations/`
- Use: Always include accessibility props

### Theme System

- Base: **Fluent UI v8** custom theme
- Location: `src/theme/`
- Supports: Dark/light modes, high-contrast, colorblind modes
- Hook: `useAppTheme()` for theme access and toggle

## Common Commands

```bash
# Development
yarn dev                           # Start dev server
yarn build                         # Production build
yarn start                         # Run production build locally

# Code Quality
yarn lint                          # Run linting
yarn lint:fix                      # Auto-fix linting issues
yarn type-check                    # TypeScript type checking

# Component & Styling
yarn generate:component Name       # Generate component scaffolding
yarn scss-types                    # Generate SCSS type definitions
yarn scss-types:watch              # Watch mode for SCSS types

# Testing & Documentation
yarn test                          # Run tests
yarn test:watch                    # Watch mode tests
yarn storybook                     # Start Storybook
yarn build-storybook               # Build Storybook for deployment
```

## File Structure Reference

```
src/app/                    # Next.js pages and routes
  ├── blog/                 # Blog system
  ├── portfolio/            # Portfolio projects
  ├── case-studies/         # Case studies
  ├── press-release/        # Press releases
  └── ...
src/components/             # Shared components
  ├── ContentListingPage.tsx    # Unified listing
  ├── UnifiedContentDetail.tsx  # Unified detail
  └── ...
src/hooks/                  # Custom hooks (12 available)
src/theme/                  # Theme system & styled components
src/animations/             # Framer Motion animations
src/utils/                  # Utility functions
src/store/                  # Zustand state management
public/                     # Static assets
  ├── blog/                 # Blog content & images
  ├── portfolio/            # Portfolio content & images
  └── ...
azure/                      # Azure infrastructure & docs
```

---

**For comprehensive guidance on all systems, design patterns, architecture decisions, and detailed API documentation, see [COPILOT_INSTRUCTIONS.md](../COPILOT_INSTRUCTIONS.md) in the repository root.**
