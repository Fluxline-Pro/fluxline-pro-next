'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { BlogPost } from '@/app/blog/types';
import {
  TAG_GROUPS,
  extractTopics,
  normalizeTag,
  getContentTypeTag,
} from '../lib/taxonomy';

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
  const [selectedContentTypes, setSelectedContentTypes] = React.useState<
    string[]
  >([]);
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);

  // Dynamically extract available content types and topics from posts
  // Content types come from taxonomy, topics come from post tags
  const { availableContentTypes, availableTopics } = React.useMemo(() => {
    const allTagsInPosts = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags.forEach((t) => allTagsInPosts.add(t));
    });

    // Content types from taxonomy that exist in posts
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

    return {
      availableContentTypes: contentTypes,
      availableTopics: topics,
    };
  }, [initialPosts]);

  const filteredPosts = React.useMemo(() => {
    let filtered = initialPosts;

    // Filter by content types if any selected
    if (selectedContentTypes.length > 0) {
      filtered = filtered.filter((post) => {
        const normalizedPostTags = post.tags.map(normalizeTag);
        return selectedContentTypes.some((ct) =>
          normalizedPostTags.includes(normalizeTag(ct))
        );
      });
    }

    // Filter by topics if any selected
    if (selectedTopics.length > 0) {
      filtered = filtered.filter((post) => {
        const normalizedPostTags = post.tags.map(normalizeTag);
        return selectedTopics.some((topic) =>
          normalizedPostTags.includes(normalizeTag(topic))
        );
      });
    }

    return filtered;
  }, [initialPosts, selectedContentTypes, selectedTopics]);

  const cards = React.useMemo(() => {
    return filteredPosts.map((post) => {
      // Get the actual content type tag from the post
      const contentTypeTag = getContentTypeTag(post.tags);

      return {
        id: post.slug,
        title: post.title,
        description: post.excerpt,
        imageUrl: post.imageUrl,
        imageAlt: post.imageAlt || post.title,
        imageText: contentTypeTag || 'Article', // Use actual tag or default
        date: post.publishedDate,
      };
    });
  }, [filteredPosts]);

  const filters: FilterConfig[] = [
    {
      type: 'multi',
      label: 'Content Type',
      options: availableContentTypes.map((ct) => ({ key: ct, text: ct })),
      selectedKeys: selectedContentTypes,
      onChange: setSelectedContentTypes,
    },
    {
      type: 'multi',
      label: 'Topic',
      options: availableTopics.map((topic) => ({ key: topic, text: topic })),
      selectedKeys: selectedTopics,
      onChange: setSelectedTopics,
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
        isActive={
          selectedContentTypes.length === 0 && selectedTopics.length === 0
        }
        onClick={() => {
          setSelectedContentTypes([]);
          setSelectedTopics([]);
        }}
        theme={theme}
      />
      {availableContentTypes.map((tag) => (
        <TagChip
          key={tag}
          label={tag}
          isActive={selectedContentTypes.includes(tag)}
          onClick={() => {
            if (selectedContentTypes.includes(tag)) {
              setSelectedContentTypes(
                selectedContentTypes.filter((t) => t !== tag)
              );
            } else {
              setSelectedContentTypes([...selectedContentTypes, tag]);
            }
          }}
          theme={theme}
        />
      ))}
      {availableTopics.map((tag) => (
        <TagChip
          key={tag}
          label={tag}
          isActive={selectedTopics.includes(tag)}
          onClick={() => {
            if (selectedTopics.includes(tag)) {
              setSelectedTopics(selectedTopics.filter((t) => t !== tag));
            } else {
              setSelectedTopics([...selectedTopics, tag]);
            }
          }}
          theme={theme}
        />
      ))}
      {(selectedContentTypes.length > 0 || selectedTopics.length > 0) && (
        <button
          onClick={() => {
            setSelectedContentTypes([]);
            setSelectedTopics([]);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            border: `1px solid ${theme.palette.themePrimary}`,
            borderRadius: '999px',
            padding: `${theme.spacing.s2} ${theme.spacing.m}`,
            backgroundColor: 'transparent',
            transition: 'all 0.15s ease',
            outline: 'none',
            marginTop: theme.spacing.l,
          }}
          aria-label='Clear all tag selections'
        >
          <Typography
            variant='caption'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '0.8125rem',
              fontWeight: 600,
              transition: 'color 0.15s ease',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Clear Tags
          </Typography>
        </button>
      )}
    </div>
  );

  const resultsMessage = (() => {
    const count = filteredPosts.length;
    const article = count === 1 ? 'article' : 'articles';
    const filters: string[] = [];

    if (selectedContentTypes.length > 0) {
      filters.push(`type: ${selectedContentTypes.join(', ')}`);
    }
    if (selectedTopics.length > 0) {
      filters.push(`topic: ${selectedTopics.join(', ')}`);
    }

    const filterText = filters.length > 0 ? ` (${filters.join(' | ')})` : '';
    return `Showing ${count} ${article}${filterText}`;
  })();

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
      emptyStateMessage='Try selecting different filters to see more content.'
      backArrow={true}
      backArrowPath='/podcasts/theresonantid'
      hasActiveFilters={
        selectedContentTypes.length > 0 || selectedTopics.length > 0
      }
      onClearFilters={() => {
        setSelectedContentTypes([]);
        setSelectedTopics([]);
      }}
      customSection={tagChips}
      onCardClick={(slug) => router.push(`/blog/${slug}`)}
      availableViewTypes={['small-tile', 'large-tile']}
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
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xxs,
        marginRight: theme.spacing.s2,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        border: `1px solid ${
          isActive
            ? theme.palette.themePrimary
            : hovered
              ? theme.palette.themeSecondary
              : theme.palette.neutralQuaternary
        }`,
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
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </button>
  );
}

export default TRILibraryClient;
