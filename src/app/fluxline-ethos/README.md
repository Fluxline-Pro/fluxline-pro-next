# Fluxline Ethos Page

## Overview
The Fluxline Ethos page presents the company's philosophy, mission, and service framework at `/fluxline-ethos`.

## Implementation
- **Content Module**: `src/lib/ethos/ethosContent.ts` - Strongly typed content definitions
- **Page Component**: `src/app/fluxline-ethos/page.tsx` - SSG page with SimplePageWrapper
- **Layout**: `src/app/fluxline-ethos/layout.tsx` - Metadata and SEO configuration

## Features
- Static Site Generation (SSG) with `export const dynamic = 'force-static'`
- Comprehensive SEO metadata including OpenGraph and Twitter cards
- Responsive design using SimplePageWrapper layout pattern
- Theme-aware styling with Fluent UI theme system
- Interactive hover effects on service cards and CTAs
- Internal navigation to /about, /services, /contact, and individual service pages

## Content Sections
1. **Hero**: Title, subtitle, and mission statement
2. **About Fluxline**: Company philosophy and approach
3. **Core Services**: Six service offerings with descriptions and links
4. **CTA**: Call-to-action for consultation
5. **Footer Links**: Quick navigation to key pages

## Styling
- Uses theme.ts typography tokens for consistency
- Responsive font sizing with clamp()
- Border-based cards with hover animations
- Follows existing design patterns from services and about pages
