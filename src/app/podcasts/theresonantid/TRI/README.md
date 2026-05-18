# TRI Scaffolding Components

Reusable component library for building consistent TRI pages (Library, Challenges, Articles, Demos, etc.).

## Overview

This folder contains the scaffolding components that provide a consistent structure, visual hierarchy, and theming across all TRI pages. Components are designed to be composable and accept configuration props rather than hardcoded content.

## Components

### 1. **TRILayout**

Base layout wrapper for all TRI pages. Provides responsive grid layout with optional TRI logo sidebar.

```tsx
import { TRILayout } from '../TRI';

<TRILayout tabletPortraitLayout='side-by-side'>{/* Page content */}</TRILayout>;
```

**Props:**

- `children: React.ReactNode` - Page content
- `tabletPortraitLayout?: 'side-by-side' | 'stacked' | 'image-small'` - Layout mode (default: 'side-by-side')

---

### 2. **HeroSimple**

Hero section with title, subtitle, optional back arrow navigation, and **optional latest episode callout**.

```tsx
import { HeroSimple } from '../TRI';
import type { PodcastEpisode } from '@/app/podcasts/types';

// With latest episode callout
<HeroSimple
  title='The Resonant Identity'
  subtitle='A living extension of The Resonance Core Framework'
  backArrow={true}
  backArrowPath='/podcasts/theresonantid'
  animationDelay={0}
  latestEpisode={latestEpisode}
  onPlayLatestEpisode={() => setSelectedEpisode(latestEpisode)}
  episodesLoading={false}
/>

// Without latest episode callout
<HeroSimple
  title='Page Title'
  subtitle='Page subtitle'
  animationDelay={0}
/>
```

**Props:**

- `title: string` - Hero title (required)
- `subtitle?: string` - Hero subtitle
- `description?: string` - Additional description text
- `backArrow?: boolean` - Show back arrow navigation
- `backArrowPath?: string` - Back arrow destination URL
- `animationDelay?: number` - FadeUp animation delay (default: 0)
- `latestEpisode?: PodcastEpisode | null` - Latest podcast episode for featured callout
- `onPlayLatestEpisode?: () => void` - Handler when user clicks "Listen Now"
- `episodesLoading?: boolean` - Loading state for episodes (default: false)

**Latest Episode Callout:**

When `latestEpisode` and `onPlayLatestEpisode` are provided, a featured callout appears below the hero with:

- Episode title as the subtitle
- "Listen Now" button that triggers `onPlayLatestEpisode`
- Accent variant styling for visual prominence
- Only displays after episodes finish loading (`!episodesLoading`)

---

### 3. **SectionHeader**

Reusable section header with title, optional subtitle, and optional CTA button.

```tsx
import { SectionHeader } from '../TRI';

<SectionHeader
  title='Latest TRI Content'
  subtitle='Auto-populated from markdown metadata'
  cta={{
    label: 'View All',
    onClick: () => router.push('/library'),
    icon: 'Library',
    iconPosition: 'left',
    variant: 'primary',
  }}
/>;
```

**Props:**

- `title: string` - Section title (required)
- `subtitle?: string` - Section subtitle
- `cta?: object` - Optional CTA button configuration
  - `label: string` - Button text
  - `onClick: () => void` - Click handler
  - `icon?: string` - Fluent UI icon name
  - `iconPosition?: 'left' | 'right'` - Icon position
  - `variant?: 'primary' | 'secondary' | 'outline'` - Button style
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Inline styles

---

### 4. **ContentSection**

Wrapper component for content sections with consistent spacing and optional styling.

```tsx
import { ContentSection } from '../TRI';

<ContentSection
  backgroundColor={theme.palette.neutralLighterAlt}
  padding={true}
  borderRadius={true}
>
  {/* Section content */}
</ContentSection>;
```

**Props:**

- `children: React.ReactNode` - Section content (required)
- `backgroundColor?: string` - Background color
- `padding?: boolean` - Apply padding (default: false)
- `borderRadius?: boolean` - Apply border radius (default: false)
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Inline styles

---

### 5. **CardGrid**

Responsive grid of InteractiveCards with fade-up animations.

```tsx
import { CardGrid, type CardGridItem } from '../TRI';

const cards: CardGridItem[] = [
  {
    id: 'micro-lessons',
    title: 'Micro-Lessons',
    description: 'Short, practical lessons...',
    icon: 'Lightbulb',
    iconPosition: 'center',
  },
  // More cards...
];

<CardGrid
  cards={cards}
  columns={3}
  animationDelay={0.25}
  animationStagger={0.05}
/>;
```

**Props:**

- `cards: CardGridItem[]` - Array of card configurations (required)
- `columns?: 1 | 2 | 3 | 4` - Number of columns (default: 3)
- `animationDelay?: number` - Initial animation delay (default: 0)
- `animationStagger?: number` - Stagger delay between cards (default: 0.05)
- `className?: string` - Additional CSS classes

**CardGridItem Interface:**

```tsx
interface CardGridItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // Fluent UI icon name
  iconPosition?: 'left' | 'center';
  href?: string; // Link destination
  onClick?: () => void; // Click handler
  showLearnMore?: boolean; // Show "Learn More" link
}
```

---

### 6. **FilteredContentList**

Displays filtered blog posts using InteractiveCard components.

```tsx
import { FilteredContentList } from '../TRI';

<FilteredContentList posts={triPosts} basePath='/blog' limit={6} />;
```

**Props:**

- `posts: TRIPost[]` - Array of serializable TRI posts (required)
- `basePath?: string` - Base URL path for links (default: '/blog')
- `limit?: number` - Maximum number of posts to display (default: 6)

---

## Usage Example: About Page

See [page.client.tsx](../about/page.client.tsx) for a complete implementation example.

```tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { FadeUp } from '@/animations/fade-animations';
import { getApiEndpoint } from '@/lib/getApiUrl';
import type { PodcastEpisode } from '@/app/podcasts/types';
import type { TRIPost } from '@/app/podcasts/types';
import {
  TRILayout,
  HeroSimple,
  SectionHeader,
  ContentSection,
  CardGrid,
  FilteredContentList,
  type CardGridItem,
} from '../TRI';

export function MyTRIPageClient({ triPosts }: { triPosts: TRIPost[] }) {
  const { theme } = useAppTheme();
  const router = useRouter();

  // Podcast episode state for featured callout
  const [episodes, setEpisodes] = React.useState<PodcastEpisode[]>([]);
  const [episodesLoading, setEpisodesLoading] = React.useState(true);
  const [selectedEpisode, setSelectedEpisode] =
    React.useState<PodcastEpisode | null>(null);

  // Fetch podcast episodes
  React.useEffect(() => {
    let cancelled = false;

    async function fetchEpisodes() {
      try {
        const endpoint = getApiEndpoint('/api/podcasts/episodes');
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch episodes`);
        const data = await response.json();
        if (!cancelled) {
          setEpisodes(data.episodes || []);
          setEpisodesLoading(false);
        }
      } catch (err) {
        console.error('Error fetching podcast episodes:', err);
        if (!cancelled) setEpisodesLoading(false);
      }
    }

    fetchEpisodes();
    return () => {
      cancelled = true;
    };
  }, []);

  const latestEpisode = episodes.length > 0 ? episodes[0] : null;

  // Configuration: Hero Section
  const heroConfig = {
    title: 'My TRI Page',
    subtitle: 'Page subtitle here',
    backArrow: true,
    backArrowPath: '/podcasts/theresonantid',
  };

  // Configuration: Feature Cards
  const featureCards: CardGridItem[] = [
    {
      id: 'feature-1',
      title: 'Feature One',
      description: 'Description of feature one',
      icon: 'Lightbulb',
      iconPosition: 'center' as const,
    },
    // More cards...
  ];

  return (
    <>
      <TRILayout tabletPortraitLayout='side-by-side'>
        {/* Hero Section with Latest Episode Callout */}
        <HeroSimple
          {...heroConfig}
          animationDelay={0}
          latestEpisode={latestEpisode}
          onPlayLatestEpisode={() =>
            latestEpisode && setSelectedEpisode(latestEpisode)
          }
          episodesLoading={episodesLoading}
        />

        {/* Introduction Section */}
        <FadeUp delay={0.1}>
          <ContentSection>
            <Typography variant='h2'>Section Title</Typography>
            <Typography variant='p'>Section content...</Typography>
          </ContentSection>
        </FadeUp>

        {/* Features Section */}
        <FadeUp delay={0.2}>
          <ContentSection
            backgroundColor={theme.palette.neutralLighterAlt}
            padding={true}
            borderRadius={true}
          >
            <Typography variant='h2'>Features</Typography>
            <CardGrid
              cards={featureCards}
              columns={3}
              animationDelay={0.25}
              animationStagger={0.05}
            />
          </ContentSection>
        </FadeUp>

        {/* Content List Section */}
        <FadeUp delay={0.4}>
          <ContentSection>
            <SectionHeader
              title='Latest Content'
              subtitle='Auto-populated from markdown'
              cta={{
                label: 'View All',
                onClick: () => router.push('/library'),
                icon: 'Library',
                iconPosition: 'left',
                variant: 'primary',
              }}
            />
            <FilteredContentList posts={triPosts} limit={6} />
          </ContentSection>
        </FadeUp>
      </TRILayout>

      {/* Episode Modal - automatically shows when user clicks "Listen Now" */}
      {selectedEpisode && (
        <PodcastDetailModal
          episode={selectedEpisode}
          onDismiss={() => setSelectedEpisode(null)}
        />
      )}
    </>
  );
}

// Note: PodcastDetailModal implementation is in page.client.tsx
```

---

## Design Principles

1. **Composability**: Components are designed to be combined and reused
2. **Configuration over Hardcoding**: Content is passed as props/config objects
3. **Consistency**: All components use Fluent UI theming and spacing tokens
4. **Accessibility**: Built-in ARIA support and keyboard navigation
5. **Animations**: FadeUp animations with staggered delays for visual polish
6. **Responsiveness**: Mobile-first design with responsive breakpoints

---

## Theming

All components use Fluent UI theme tokens via `useAppTheme()` hook:

```tsx
const { theme } = useAppTheme();

// Colors
theme.palette.neutralPrimary;
theme.palette.neutralSecondary;
theme.palette.neutralLighterAlt;
theme.palette.themePrimary;

// Spacing
theme.spacing.s;
theme.spacing.m;
theme.spacing.l;
theme.spacing.xl;
theme.spacing.xxl;

// Typography
theme.typography.fontSizes.sm;
theme.typography.lineHeights.relaxed;

// Border Radius
theme.borderRadius.container.medium;
```

---

## Animation Guidelines

Use FadeUp animations with staggered delays for progressive reveal:

```tsx
import { FadeUp } from '@/animations/fade-animations';

<FadeUp delay={0}>     {/* Hero: 0s */}
<FadeUp delay={0.1}>   {/* Section 1: 0.1s */}
<FadeUp delay={0.2}>   {/* Section 2: 0.2s */}
<FadeUp delay={0.25}>  {/* Card 1: 0.25s */}
<FadeUp delay={0.3}>   {/* Card 2: 0.3s */}
<FadeUp delay={0.35}>  {/* Card 3: 0.35s */}
```

**Stagger pattern:**

- Sections: 0.1s increments (0, 0.1, 0.2, 0.3, 0.4)
- Cards within section: 0.05s increments (0.25, 0.3, 0.35)

---

## Future Pages

These components are ready for use in:

- ✅ **About Page** (implemented)
- 🔄 **Library Page** (use TRILayout + FilteredContentList with filters)
- 🔄 **Challenges Page** (use TRILayout + CardGrid for challenge tiles)
- 🔄 **Articles Page** (use TRILayout + FilteredContentList with tag filters)
- 🔄 **Demos Page** (use TRILayout + CardGrid for interactive demos)
- 🔄 **Episodes Hub** (use TRILayout + HeroSimple + episode list)

---

## Contributing

When adding new TRI pages:

1. Use these scaffolding components instead of creating custom ones
2. Pass content as configuration props
3. Follow the staggered animation pattern
4. Use Fluent UI theme tokens for styling
5. Test with different screen sizes
6. Ensure keyboard navigation works

---

## Questions?

See the About page implementation for a complete working example:

- [page.tsx](../about/page.tsx) - Server Component (data loading)
- [page.client.tsx](../about/page.client.tsx) - Client Component (UI with configuration)

For files created inside this `TRI/` directory, import from `./`. For sibling TRI subpages such as `about/`, `library/`, or `challenges/`, import from `../TRI`.
