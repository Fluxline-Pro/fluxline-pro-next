'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { BlogPost } from '@/app/blog/types';
import { TAG_GROUPS, extractTopics, normalizeTag } from '../lib/taxonomy';

interface TRILibraryClientProps {
  /** All blog posts with category "Resonant Identity" */
  initialPosts: BlogPost[];
}

/**
 * TRILibraryClient
 *
 * Client component for the Resonant Identity Library page.
 * Displays all TRI content with tag-chip filtering.
 * Topics are dynamically extracted from actual post tags.
 * URL: /podcasts/theresonantid/library
 */
export function TRILibraryClient({ initialPosts }: TRILibraryClientProps) {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [selectedTag, setSelectedTag] = React.useState<string | undefined>();

  // Dynamically extract all available tags from posts
  // Content types come from taxonomy, topics come from post tags
  const availableTags = React.useMemo(() => {
    const allTagsInPosts = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags.forEach((t) => allTagsInPosts.add(t));
    });

    // Separate content types and topics
    const contentTypes = TAG_GROUPS.contentTypes.filter((ct) =>
      allTagsInPosts.has(ct)
    );

    // Extract topics from posts (any tag that isn't a content type)
    const topicsSet = new Set<string>();
    initialPosts.forEach((post) => {
      const topics = extractTopics(post.tags);
      // Get original casing from post.tags
      topics.forEach((normalizedTopic) => {
        const originalTag = post.tags.find(
          (t) => normalizeTag(t) === normalizedTopic
        );
        if (originalTag) topicsSet.add(originalTag);
      });
    });

    const topics = Array.from(topicsSet).sort();

    // Return content types first, then topics
    return [...contentTypes, ...topics];
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
          color: isActive
            ? theme.palette.white
            : hovered
              ? theme.palette.themePrimary
              : theme.palette.neutralSecondary,
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
