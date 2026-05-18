# GitHub Copilot Instructions

Comprehensive development guidelines for working with the Fluxline Pro Next.js repository.

This repository contains the **Fluxline Resonance Group's** web platform. It is built with **Next.js 16.0.0** using the **App Router** and **React 19.2.0**, following strict design, layout, and architectural guidelines for maintainability, UI consistency, and future integration with Azure backend services.

## Essential Configuration

### Package Manager & Node

- **Use `yarn` exclusively** - No npm, pnpm, or bun
- **Node.js >= 20.0.0** required
- Commands: `yarn dev`, `yarn build`, `yarn start`

### Styling Priority (Strict Order)

1. **Tailwind CSS** - Layout, spacing, all utilities
2. **Fluent UI theme.ts** - Theme colors, typography, design tokens
3. **Typography** component - Use this extensively for consistent typography styles
4. **SCSS Modules** - Complex component-specific styling only
5. **Sass** - Only as a fallback (avoid using)

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
  ├── blog/                 # Blog system (Markdown-based)
  ├── portfolio/            # Portfolio projects (Markdown-based)
  ├── case-studies/         # Case studies (Markdown-based)
  ├── press-release/        # Press releases (Markdown-based)
  ├── videos/               # YouTube integration
  ├── podcasts/             # Podcast player (Azure Storage)
  ├── services/             # Services + scrolls/white papers
  ├── content/              # Content hub
  └── ...
src/components/             # Shared components
  ├── ContentListingPage.tsx    # Unified listing (~85% code reduction)
  ├── UnifiedContentDetail.tsx  # Unified detail view
  ├── UnifiedPageWrapper.tsx           # Page layout wrapper
  └── AccessGate.tsx            # Token-based access control
src/hooks/                  # Custom React hooks
src/theme/                  # Fluent UI theme system
  ├── theme.ts              # Main theme configuration
  ├── components/           # Theme-aware components
  ├── hooks/                # useAppTheme, useMediaQuery, etc.
  └── contexts/             # ThemeProvider, ThemeOverrideContext
src/animations/             # Framer Motion animations
src/utils/                  # Utility functions
src/store/                  # Zustand state management
public/                     # Static assets
  ├── blog/posts/           # Blog Markdown content
  ├── portfolio/posts/      # Portfolio Markdown content
  ├── case-studies/posts/   # Case studies Markdown content
  ├── press-release/posts/  # Press release Markdown content
  └── ...
api/                        # Azure Functions
azure/                      # Azure deployment documentation
```

## Available Documentation

- `HOOKS.md` - Custom hooks reference
- `ANIMATIONS.md` - Animation system guide
- `ENVIRONMENT_VARIABLES.md` - Environment variable reference
- `FILE_BASED_BLOG_GUIDE.md` - Blog post creation guide
- `QUICK_SETUP_GUIDE.md` - Token access control setup
- `TOKEN_ACCESS_README.md` - Detailed token access implementation
- `VIDEO_UPLOAD_INSTRUCTIONS.md` - Testimonial video upload guide
- `src/theme/THEMING.md` - Theme system architecture
- `api/README.md` - Azure Functions API documentation
- `azure/README.md` - Azure deployment guides

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

### Component Reuse & Layout

- **Favor reusing existing components and Next.js patterns**:
  - Use Next.js built-in components: `Image`, `Link`, `Font`
  - Use `ContentListingPage` for all content listing views (Blog, Portfolio, Press Release, Case Studies)
  - Use `PageWrapper` component for consistent page layouts
  - Create reusable layout components in `src/theme/components/layout/`
  - Implement consistent page layouts using `layout.tsx` files
  - Use Server Components for static content, Client Components for interactivity
- **Follow Next.js App Router conventions**
- Use component generators when available: `yarn generate:component ComponentName`
- **Content Listing Pattern**:
  - Server Component loads data from file system or data source
  - Client Wrapper manages filters and transforms data to `ContentCard[]`
  - `ContentListingPage` renders unified UI with responsive grids and filtering
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
- **Content management with Server/Client Component pattern**:
  - **Server Components** for data loading from Markdown files or file system
  - **Client Components** for user interactions and filtering
  - Markdown content processed with `react-markdown` and `gray-matter`
  - Blog posts stored in `/public/blog/posts/[slug]/markdown/post.md`
  - Images co-located with content in `/public/blog/posts/[slug]/images/`
  - Use Next.js `generateStaticParams` for static generation (SSG)
  - Pass data from Server Components to Client Components via props
  - Never use `'use client'` in components that read from file system

## Content Systems

### Content Listing System (Unified)

**Location**: `src/components/ContentListingPage.tsx`

The application uses a unified content listing system that consolidates all listing pages (Blog, Portfolio, Press Release, Case Studies, Podcasts) into a single, reusable component. This reduces code duplication by ~85% while maintaining flexibility for each content type.

**Core Architecture**:

- **ContentListingPage Component**: Unified listing component with responsive grids, filtering, and view types
- **Wrapper Pattern**: Each content type has a thin wrapper that manages state and transforms data
- **Server/Client Split**: Server Components load data (SSG), Client Components handle interactivity
- **Filter System**: Flexible configuration supporting single-select and multi-select filters
- **Hero Integration**: Filter controls embedded in Hero component for better visual hierarchy

**Key Features**:

- Three view types: Grid View, Small Tile, Large Tile
- Responsive column layouts (1-4 columns based on device orientation)
- Integrated filtering system with single and multi-select support
- **Sort Order**: Newest First, Oldest First, A–Z, Z–A (always shown, except Books page)
- **Date Range Filter**: Date From / Date To inputs — **desktop and tablet only** (hidden on mobile per requirements)
- **Clear Filters button**: shown when sort, date range, or any wrapper filter is active
- Optional CTA sections per page
- Theme-aware styling with Fluent UI
- Orientation-aware column calculations
- Empty states and results messaging

**Sort & Date Range Behavior**:

- Mobile: shows only Sort dropdown (no date range, per requirements)
- Desktop/Tablet: shows Sort + Date From + Date To + Clear Filters (when active)
- `date?: Date` field on `ContentCard` drives sort order and date range filtering
- Clear Filters resets sort to "Newest First", clears date range, and calls `onClearFilters()` on the wrapper

**Wrapper Integration**:

Each content wrapper should:

1. Add `date` to every card object (from `publishedDate`, `updated_at`, etc.)
2. Pass `hasActiveFilters={boolean}` (true when wrapper-specific filters like category/tag are selected)
3. Pass `onClearFilters={() => { /* reset wrapper state */ }}` so Clear Filters resets everything

### Detail Pages System

**Location**: `src/components/UnifiedContentDetail.tsx`

All content detail pages (Blog, Portfolio, Press Release, Case Studies) use the unified `UnifiedContentDetail` component, which provides consistent styling and structure across all content types.

**Core Architecture**:

- **UnifiedContentDetail Component**: Single component for all detail page rendering
- **Content-Specific Wrappers**: Thin client wrappers that transform content data into `UnifiedContentDetailConfig`
- **ContentNotFound Component**: Reusable not-found page for all content types

**Why Detail Wrappers Remain Content-Specific**:

While listing pages were successfully consolidated into a single component, detail page wrappers remain separate because they handle distinct content-specific features:

1. **Blog**: Tag/category navigation, click handlers for filtered views
2. **Portfolio**: Gallery rendering with responsive image grids, external links (GitHub, live demos)
3. **Press Release**: Simplified metadata, HTML content fallback for legacy data
4. **Case Studies**: Complex custom sections (metrics visualization with custom styling, testimonial formatting with special design, challenge/solution/results narrative structure)

**Wrapper Architecture**:

Each wrapper is a thin client component (50-150 lines) that:

- Receives typed content data from parent Server Component
- Transforms data into `UnifiedContentDetailConfig` interface
- Handles content-specific interactions and state
- Passes config to `UnifiedContentDetail` for consistent rendering

**Not-Found Handling**:

Shared `ContentNotFound` component provides consistent error states:

```typescript
<ContentNotFound
  title="Project Not Found"
  message="The portfolio project you're looking for doesn't exist."
  backButton={{ label: 'Back to Portfolio', url: '/portfolio' }}
/>
```

**Consolidation Summary**:

- ✅ All detail pages use `UnifiedContentDetail` component
- ✅ Not-found states consolidated into `ContentNotFound` component
- ⚠️ Content-specific wrappers preserved to avoid complex configuration system
- 📄 This approach balances code reuse with maintainability

For complete documentation, see `src/components/UnifiedContentDetail.tsx` and the component's inline JSDoc.

### Blog System

- **Location**: `/src/app/blog/`
- **Content Storage**: Markdown files in `/public/blog/posts/[slug]/markdown/post.md`
- **Image Storage**: Images in `/public/blog/posts/[slug]/images/`
- **Architecture**: Server Components for data loading, Client Wrapper for interactivity

**Adding New Blog Posts**:

1. Create folder structure: `public/blog/posts/your-post-slug/markdown/` and `images/`
2. Create `post.md` with frontmatter (title, excerpt, author, date, category, tags, SEO)
3. Add images to images folder
4. Run `yarn build` to generate static pages
5. New post automatically appears in listing, gets detail page, and is added to tag/category filters

**Component Structure**:

- `page.tsx`: Server Component that loads posts from file system
- `BlogListingClientWrapper.tsx`: Client Wrapper that transforms data and manages filters
- Uses unified `ContentListingPage` component for rendering
- `lib/blogLoader.ts`: Server-only file system loader
- `[slug]/page.tsx`: Server Component for detail pages

**Filters**: Category (single-select), Tag (single-select)

For complete documentation, see `FILE_BASED_BLOG_GUIDE.md`

### Press Release System

- **Location**: `/src/app/press-release/`
- **Content Storage**: Markdown files in `/public/press-release/posts/[id]/markdown/release.md`
- **Image Storage**: Images in `/public/press-release/posts/[id]/images/`
- **Architecture**: Server Components for data loading, Client Wrapper for interactivity

**Adding New Press Releases**:

1. Create folder structure: `public/press-release/posts/your-release-id/markdown/` and `images/`
2. Create `release.md` with frontmatter (title, subtitle, description, author, date, category, tags, SEO)
3. Add images to images folder
4. Run `yarn build` to generate static pages
5. New release automatically appears in listing, gets detail page, and is filterable by year

**Component Structure**:

- `page.tsx`: Server Component that loads releases from file system
- `PressReleaseListingClient.tsx`: Client Wrapper that transforms data and manages filters
- Uses unified `ContentListingPage` component for rendering
- `lib/pressReleaseLoader.ts`: Server-only file system loader
- `[id]/page.tsx`: Server Component for detail pages

**Filters**: Year (single-select)

For complete documentation, see `/public/press-release/posts/HOW_TO_CREATE_A_PRESS_RELEASE.md`

### Case Studies System

- **Location**: `/src/app/case-studies/`
- **Content Storage**: Markdown files in `/public/case-studies/posts/[id]/markdown/case-study.md`
- **Image Storage**: Images in `/public/case-studies/posts/[id]/images/`
- **Architecture**: Server Components for data loading, Client Wrapper for interactivity

**Adding New Case Studies**:

1. Create folder structure: `public/case-studies/posts/your-case-study-id/markdown/` and `images/`
2. Create `case-study.md` with frontmatter (title, client, industry, description, challenge, solution, results, metrics, testimonial, SEO)
3. Add images to images folder
4. Run `yarn build` to generate static pages
5. New case study automatically appears in listing, gets detail page, and is filterable by industry and service

**Component Structure**:

- `page.tsx`: Server Component that loads case studies from file system
- `CaseStudiesListingClient.tsx`: Client Wrapper that transforms data and manages filters
- Uses unified `ContentListingPage` component for rendering
- `lib/caseStudyLoader.ts`: Server-only file system loader
- `[id]/page.tsx`: Server Component for detail pages

**Filters**: Industry (multi-select), Service (multi-select)

For complete documentation, see `/public/case-studies/posts/HOW_TO_CREATE_A_CASE_STUDY.md`

### Scrolls/White Papers Management

- **Location**: `/src/app/services/scrolls/`
- **Asset Storage**: PDFs stored in `/public/scrolls/pdfs/`
- **Data Configuration**: Scroll metadata defined in `scrollsData.ts`

**Adding New Scrolls**:

1. Place PDF file in `/public/scrolls/pdfs/`
2. Update `scrollsData.ts` with scroll metadata
3. Run `yarn build` to regenerate static pages
4. New scroll will be automatically added to grid and detail route

**Component Patterns**:

- `ScrollCard`: Individual scroll card with download functionality
- `ScrollsGrid`: Responsive grid layout for scroll listings
- All scrolls use Server Components for listings
- Client Components used only for interactive download buttons
- Static generation for all scroll detail pages via `generateStaticParams`

For complete scrolls documentation, see `src/app/services/scrolls/README.md`

### Video Section (YouTube Integration)

- **Location**: `/src/app/video/`
- **Data Source**: YouTube Data API v3 (fetches from @TerenceWaters channel)
- **Architecture**: Azure Function proxy at `/api/youtube`

**How It Works**:

1. You upload videos directly to YouTube Studio (youtube.com)
2. Azure Function fetches videos via YouTube Data API v3
3. Frontend displays in responsive grid with modal player
4. No manual updates needed - videos appear automatically

**Component Architecture**:

- `VideoListingClient.tsx`: Client component with three tabs (Videos, Live, Playlists)
- `VideoCard`: Individual video card with thumbnail and metadata
- `VideoModal`: Fullscreen modal with embedded YouTube player
- Uses unified layout patterns with responsive grids
- Pagination support for large video libraries

**Features**:

- Three content tabs: Videos, Live Streams, Playlists
- Responsive 3-column grid (adjusts for mobile/tablet)
- Click-to-play modal with embedded YouTube player
- Duration badges, view counts, and publish dates
- Automatic caching (1 hour) to reduce API calls
- CORS-enabled for frontend consumption

**Configuration**:

```bash
# Required environment variable in Azure Static Web App
YOUTUBE_API_KEY=your-youtube-data-api-v3-key  # Server-side only
```

**Setup**:

1. Get API key from Google Cloud Console (console.cloud.google.com)
2. Enable "YouTube Data API v3" in the API Library
3. Restrict key to YouTube Data API v3 only (security best practice)
4. Add to Azure Static Web App application settings
5. Upload videos to YouTube - they automatically appear on site

**Azure Function** (`api/youtube/index.js`):

- Proxies YouTube API to keep API key server-side
- Handles CORS and caching headers
- Fetches channel ID via handle (@TerenceWaters)
- Returns video metadata (title, description, thumbnail, duration, views)
- Error handling with graceful fallbacks

**Important Notes**:

- Videos are NOT uploaded through your web app
- All video management happens in YouTube Studio
- The app only displays videos from your YouTube channel
- No backend storage or database needed for videos

For details, see `/api/README.md` and `VIDEO_UPLOAD_INSTRUCTIONS.md`

### Podcast Section (Azure Storage)

- **Location**: `/src/app/podcasts/`
- **Data Storage**: Azure Table Storage (metadata) + Azure Blob Storage (audio files)
- **Architecture**: Azure Functions for API endpoints and RSS feed

**How It Works**:

1. Upload .mp3 audio files to Azure Blob Storage
2. Add episode metadata to Azure Table Storage
3. Frontend fetches episodes from `/api/podcasts/episodes`
4. RSS feed auto-generated at `/api/podcasts/rss`

**Component Architecture**:

- `PodcastListingClient.tsx`: Client component for episode listing
- `PodcastCard`: Individual episode card with metadata
- `PodcastDetailModal`: Modal with HTML5 audio player
- Uses unified `ContentListingPage` pattern
- Server-side data loading with client-side interactivity

**Azure Functions**:

- `/api/podcasts/episodes` - Lists all episodes from Table Storage
- `/api/podcasts/rss` - Generates RSS 2.0 feed for podcast platforms

**Episode Metadata Schema**:

```typescript
{
  RowKey: 'episode-1',           // Unique ID
  episode_title: string,          // Episode title
  description: string,            // Full description
  audio_url: string,              // Blob storage URL
  duration: string,               // MM:SS or ISO 8601
  publish_date: string,           // ISO 8601 date
  episode_number: number,         // Episode number
  audio_size_bytes: number,       // File size in bytes
  podcast_name: string,           // Show name (optional)
  author_name: string,            // Host name (optional)
  tags: string,                   // Comma-separated (optional)
  imageUrl: string,               // Episode art URL (optional)
  slug: string                    // URL slug (optional)
}
```

**Environment Separation**:

- **Dev/Test**: Uses `podcastsdev` table
- **Production**: Uses `podcasts` table
- Controlled by `NEXT_PUBLIC_ENVIRONMENT` variable
- Blob storage typically organized by container or path (e.g., `/podcasts-dev/` vs `/podcasts/`)

**Configuration**:

```bash
# Required environment variables in Azure Static Web App
AZURE_TABLE_STORAGE_URL=https://yourstore.table.core.windows.net
AZURE_TABLE_SAS_TOKEN=sv=2020-08-04&ss=t&srt=sco&...
AZURE_PODCAST_TABLE_DEV=podcastsdev
AZURE_PODCAST_TABLE_PROD=podcasts
NEXT_PUBLIC_ENVIRONMENT=prod  # or 'dev'/'test'
```

**Adding Episodes Workflow**:

1. **Prepare audio**: Export as MP3, 128-192 kbps, normalize audio levels
2. **Upload to Blob Storage**: Via Azure Portal, Azure Storage Explorer, or CLI
3. **Get blob URL**: Copy the public URL of the uploaded file
4. **Add to Table Storage**: Create entity with episode metadata
5. **Verify**: Episode automatically appears on `/podcasts` page and in RSS feed

**RSS Feed Features**:

- Valid RSS 2.0 format with iTunes extensions
- Compatible with Apple Podcasts, Spotify, Spreaker
- Includes audio enclosures with proper MIME types
- Auto-sorted by publish date (newest first)
- Podcast metadata configured in `api/podcasts-rss/index.js`

**Storage Organization**:

- Audio files can be organized by environment:
  - `https://storage.../podcasts-dev/episode.mp3` (dev)
  - `https://storage.../podcasts/episode.mp3` (prod)
- Separation achieved via different URLs stored in different tables
- No code changes needed to maintain environment separation

**Important Notes**:

- Audio files are NOT uploaded through the web interface
- All uploads happen via Azure Portal, Azure Storage Explorer, or CLI
- The app only displays metadata and streams audio from Azure
- Table Storage provides the "database" for episode information
- RSS feed enables distribution to major podcast platforms

For complete podcast documentation, see:

- `/api/HOW_TO_ADD_PODCAST_EPISODE.md` - Step-by-step episode upload guide
- `/api/README.md` - API documentation
- `/api/podcasts-episodes/index.js` - Episodes API implementation
- `/api/podcasts-rss/index.js` - RSS feed implementation

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
- **Reuse unified components**: Leverage `ContentListingPage` for all listing views
- **Wrapper pattern**: Create thin client wrappers for page-specific logic and state management
- **Data transformation**: Transform domain data to common interfaces (`ContentCard`, `FilterConfig`)

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

## Testing Tag Navigation Locally

**⚠️ Known Behavior**: Tag/category/technology navigation with spaces (e.g., "Personal Growth", "Machine Learning") **will show validation errors in development mode** (`yarn dev`). This is a Next.js limitation with static export validation and is **expected behavior**.

**To test tag navigation properly:**

```bash
# 1. Build the production static export
yarn build

# 2. Serve the static files (NOT yarn dev)
npx serve@latest out -p 3000

# 3. Test tag navigation at http://localhost:3000
# All tags with spaces should work correctly
```

**Why this happens:**

- Development mode validates incoming params (encoded) against `generateStaticParams()` output (unencoded)
- Production static export has no validation - just serves files from disk
- Azure deployment works correctly (same as production build)

**Critical Configuration (DO NOT CHANGE):**

```typescript
// ✅ CORRECT - Creates folders with REAL SPACES
export async function generateStaticParams() {
  return tags.map((tag) => ({
    tag: tag, // Unencoded! Creates "Personal Growth/" folder
  }));
}

// ❌ WRONG - Creates folders with ENCODED SPACES (causes 404s on Azure)
export async function generateStaticParams() {
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag), // Bad! Creates "Personal%20Growth/" folder
  }));
}
```

**This was a bug in blog tag/category pages (fixed in PR #111)** - they were encoding in `generateStaticParams()` while portfolio pages were not, causing 404s on Azure.

**Do not:**

- ❌ Remove `dynamicParams = false` from tag/category/technology pages
- ❌ Add `encodeURIComponent()` to `generateStaticParams()` returns (causes 404s)
- ❌ Remove `encodeURIComponent()` from navigation calls in client components
- ❌ Worry about dev mode validation errors when testing tags with spaces

This configuration is **correct for production** - ignore dev mode errors when testing tags.

---

## TRI Demo Components

### Overview

Interactive demo components for The Resonant Identity (TRI) live in:

- **Components**: `src/components/demos/`
- **Barrel export**: `src/components/demos/index.ts`

Each demo is a self-contained `'use client'` React component that can be embedded into any blog post detail page via the `sections` prop of `UnifiedContentDetailConfig`.

---

### Existing Demos

#### `RedAppleFilterDemo`

**Location**: `src/components/demos/RedAppleFilterDemo.tsx`

**Purpose**: Interactive visual perception demo. Displays a red apple image and lets the user apply six CSS filter modes to simulate different visual conditions:

| Mode | Description |
|------|-------------|
| `normal` | Original image — no filter |
| `protanopia` | Red colorblindness simulation |
| `tritanopia` | Red–blue colorblindness simulation |
| `deuteranopia` | Green colorblindness simulation |
| `grayscale` | Full desaturation |
| `lowlight` | Dim-lighting simulation |

**Usage in a blog post**:

```tsx
// In BlogPostDetailClient.tsx — detect the specific slug and inject the demo:
import { RedAppleFilterDemo } from '@/components/demos';

const isRedAppleDemo = post.slug === 'tri-red-apple-perception-demo';

const config: UnifiedContentDetailConfig = {
  // ...
  ...(isRedAppleDemo && {
    sections: [{ title: 'Interactive Filter Demo', content: <RedAppleFilterDemo /> }],
    sectionsPosition: 'before',
  }),
};
```

**Filter logic**: Uses `getImageFilterCss(mode: ImageFilterMode)` exported from `src/theme/hooks/useColorVisionFilter.ts`. This is a pure function — no hooks required.

---

### Creating New TRI Demo Components

1. **Create** `src/components/demos/YourDemoName.tsx` — mark `'use client'`
2. **Export** from `src/components/demos/index.ts`
3. **Add** a blog post in `public/blog/posts/[slug]/markdown/post.md` with:
   - `category: "Resonant Identity"`
   - `tags: ["Interactive Demo", ...]`
4. **Inject** the component in `BlogPostDetailClient.tsx` using slug-based detection and `sections`/`sectionsPosition`

**Styling rules** (same as all components):
- Use `useAppTheme()` for all colours, spacing, and border-radius values
- Use the `Typography` component for all text
- Layout via Tailwind CSS utility classes
- No hard-coded colours — pull from `theme.palette.*`

**Filter hook**: If your demo needs colour-vision filter CSS strings, use `getImageFilterCss()`:

```ts
import { getImageFilterCss, type ImageFilterMode } from '@/theme/hooks/useColorVisionFilter';

const cssFilter = getImageFilterCss('protanopia');
// Returns the CSS filter string for the selected image filter mode.
```

---

**For additional documentation, see the repository's other markdown files listed in the Available Documentation section above.**
