'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ContentListingPage, FilterConfig } from '@/components/ContentListingPage';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { BlogPost } from '@/app/blog/types';

/**
 * TRI taxonomy tags available as filter chips in the library.
 * Grouped for clarity but flattened to a single filter dropdown.
 */
const TRI_CONTENT_TYPE_TAGS = [
  'Episode Companion',
  'Identity Challenge',
  'Interactive Demo',
  'Foundations',
  'Deep Dive',
];

const TRI_TOPIC_TAGS = [
  'Truth',
  'Distortion',
  'Perception',
  'Interpretive Hygiene',
  'The Triad',
  'Resonance & Dissonance',
  'Identity Coherence',
  'Identity Erosion',
  'Agency',
  'Somatic Cues',
  'Narrative Cues',
  'Emotional Cues',
];

const ALL_TRI_TAGS = [...TRI_CONTENT_TYPE_TAGS, ...TRI_TOPIC_TAGS];

interface TRILibraryClientProps {
  /** All blog posts with category "Resonant Identity" */
  initialPosts: BlogPost[];
}

/**
 * TRILibraryClient
 *
 * Client component for the Resonant Identity Library page.
 * Displays all TRI content with tag-chip filtering.
 * URL: /podcasts/theresonantid/library
 */
export function TRILibraryClient({ initialPosts }: TRILibraryClientProps) {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [selectedTag, setSelectedTag] = React.useState<string | undefined>();

  // Collect tags that actually exist in the loaded posts (intersection with taxonomy)
  const availableTags = React.useMemo(() => {
    const tagsInPosts = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags.forEach((t) => tagsInPosts.add(t));
    });
    // Preserve taxonomy order, only show tags that have content
    return ALL_TRI_TAGS.filter((t) => tagsInPosts.has(t));
  }, [initialPosts]);

  const filteredPosts = React.useMemo(() => {
    if (!selectedTag) return initialPosts;
    return initialPosts.filter((post) => post.tags.includes(selectedTag));
  }, [initialPosts, selectedTag]);

  const cards = React.useMemo(() => {
    return filteredPosts.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl,
      imageAlt: post.imageAlt || post.title,
      imageText: post.publishedDate
        ? format(post.publishedDate, 'MMMM d, yyyy')
        : 'Date unknown',
      date: post.publishedDate,
    }));
  }, [filteredPosts]);

  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Filter by Tag',
      options: [
        { key: '', text: 'All Content' },
        ...availableTags.map((tag) => ({ key: tag, text: tag })),
      ],
      value: selectedTag,
      onChange: setSelectedTag,
    },
  ];

  // Tag-chip row for quick filtering (shown above the grid)
  const tagChips = (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.s2,
        flexWrap: 'wrap',
        paddingBottom: theme.spacing.m,
      }}
      role='group'
      aria-label='Filter by tag'
    >
      <TagChip
        label='All Content'
        isActive={!selectedTag}
        onClick={() => setSelectedTag(undefined)}
        theme={theme}
      />
      {availableTags.map((tag) => (
        <TagChip
          key={tag}
          label={tag}
          isActive={selectedTag === tag}
          onClick={() => setSelectedTag(selectedTag === tag ? undefined : tag)}
          theme={theme}
        />
      ))}
    </div>
  );

  const resultsMessage = `Showing ${filteredPosts.length} ${filteredPosts.length === 1 ? 'article' : 'articles'}${selectedTag ? ` tagged with "${selectedTag}"` : ''}`;

  return (
    <ContentListingPage
      title='Resonant Identity Library'
      iconName='Library'
      description='All articles, challenges, and interactive demos from The Resonant Identity — a living extension of the Resonance Core Framework™. Use the tag filters to explore content by type or topic.'
      basePath='/blog'
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No content found'
      emptyStateMessage='Try selecting a different tag to see more content.'
      backArrow={true}
      backArrowPath='/podcasts/theresonantid'
      hasActiveFilters={!!selectedTag}
      onClearFilters={() => setSelectedTag(undefined)}
      customSection={tagChips}
      onCardClick={(slug) => router.push(`/blog/${slug}`)}
    />
  );
}

// ─── TagChip helper ───────────────────────────────────────────────────────────

interface TagChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}

function TagChip({ label, isActive, onClick, theme }: TagChipProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={isActive}
      style={{
        cursor: 'pointer',
        border: `1px solid ${isActive ? theme.palette.themePrimary : hovered ? theme.palette.themeSecondary : theme.palette.neutralQuaternaryAlt}`,
        borderRadius: '999px',
        padding: `${theme.spacing.s2} ${theme.spacing.m}`,
        backgroundColor: isActive
          ? theme.palette.themePrimary
          : hovered
            ? theme.palette.neutralLighterAlt
            : 'transparent',
        transition: 'all 0.15s ease',
        outline: 'none',
      }}
    >
      <Typography
        variant='caption'
        style={{
          color: isActive ? theme.palette.white : hovered ? theme.palette.themePrimary : theme.palette.neutralSecondary,
          fontSize: '0.8125rem',
          fontWeight: isActive ? 600 : 400,
          transition: 'color 0.15s ease',
          margin: 0,
        }}
      >
        {label}
      </Typography>
    </button>
  );
}

export default TRILibraryClient;
