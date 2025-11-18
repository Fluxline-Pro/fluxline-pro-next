# Scrolls (Strategic Insights) Section

## Overview
The Scrolls section provides downloadable strategic insights and white papers covering Fluxline's core service areas. This feature is built using Next.js 16.0.0 App Router with full static generation support.

## Location
- **Route**: `/services/scrolls`
- **Source Code**: `/src/app/services/scrolls/`
- **Assets**: `/public/scrolls/pdfs/`

## Features
- ✅ 6 strategic insight documents (Business Strategy, Development, Design, Wellness, Education, Coaching)
- ✅ Responsive grid layout with card-based design
- ✅ Individual detail pages for each scroll
- ✅ Download functionality (opens PDFs in new tab)
- ✅ Full SEO optimization with OpenGraph and Twitter Cards
- ✅ Static generation for all pages
- ✅ Loading states and error boundaries
- ✅ Breadcrumb navigation
- ✅ Theme-aware styling (dark/light modes)
- ✅ 20 unit tests with 100% pass rate

## Architecture

### Pages
- `/services/scrolls/page.tsx` - Main scrolls listing page
- `/services/scrolls/[scroll]/page.tsx` - Individual scroll detail pages

### Components
- `ScrollCard` - Individual scroll card with download button
- `ScrollsGrid` - Responsive grid layout for scroll listings

### Data
- `scrollsData.ts` - Scroll metadata and configuration
- `types.ts` - TypeScript type definitions

### Static Generation
All scroll pages are statically generated at build time using `generateStaticParams`. This ensures optimal performance and SEO.

## Adding New Scrolls

1. **Add PDF to public directory**:
   ```bash
   cp your-file.pdf public/scrolls/pdfs/
   ```

2. **Update scrollsData.ts**:
   ```typescript
   {
     id: 'unique-scroll-id',
     title: 'Your Scroll Title',
     description: 'Brief description for card display',
     category: 'business-strategy', // or development, design, wellness, education, coaching
     pdfUrl: '/scrolls/pdfs/your-file.pdf',
     fileSize: 'X.X MB',
     tags: ['tag1', 'tag2', 'tag3'],
     publishedDate: new Date('YYYY-MM-DD'),
     lastUpdated: new Date('YYYY-MM-DD'),
     seoMetadata: {
       title: 'SEO Title',
       description: 'SEO Description',
       keywords: ['keyword1', 'keyword2']
     }
   }
   ```

3. **Rebuild**:
   ```bash
   yarn build
   ```

The new scroll will automatically appear in the grid and have its own detail page generated.

## Testing

Run tests for scroll components:
```bash
yarn test scrolls/components
```

Test suite includes:
- ScrollCard component: 12 tests
- ScrollsGrid component: 8 tests
- Total: 20 tests, 100% pass rate

## Build Output

The scrolls section generates the following static pages:
- `/services/scrolls` - Main listing page
- `/services/scrolls/business-it-consulting` - Business Strategy scroll
- `/services/scrolls/app-web-development` - Development scroll
- `/services/scrolls/graphic-design` - Design scroll
- `/services/scrolls/personal-training` - Wellness scroll
- `/services/scrolls/education-mentoring` - Education scroll
- `/services/scrolls/resonance-core` - Coaching scroll

## SEO Features

Each scroll includes:
- Dynamic page title and meta description
- OpenGraph tags for social sharing
- Twitter Card metadata
- Article published and modified timestamps
- Keyword optimization
- Canonical URLs
- Structured breadcrumb navigation

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Proper heading hierarchy
- ✅ Color contrast compliance
- ✅ Screen reader friendly breadcrumbs

## Performance

- Static generation at build time
- Optimized bundle size (<50KB additional JS)
- Lazy loading for client components
- Efficient grid layout with CSS Grid
- No runtime data fetching required

## Related Documentation

- See `COPILOT_INSTRUCTIONS.md` for development guidelines
- See test files for component usage examples
- See `scrollsData.ts` for data structure details
