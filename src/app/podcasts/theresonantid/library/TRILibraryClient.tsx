'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxButton from '@/theme/components/dsm/FxButton';
import { TRIPost } from '@/app/podcasts/types';
import {
  TAG_GROUPS,
  extractTopics,
  normalizeTag,
  getContentTypeTag,
} from '../lib/taxonomy';
import { useTRILatestEpisode, EpisodeModal, SectionHeader } from '../TRI';

interface TRILibraryClientProps {
  /** Serialized blog posts with category "Resonant Identity" */
  initialPosts: TRIPost[];
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
  const router = useRouter();

  const {
    latestEpisode,
    episodesLoading,
    selectedEpisode,
    setSelectedEpisode,
  } = useTRILatestEpisode();
  const [selectedContentTypes, setSelectedContentTypes] = React.useState<
    string[]
  >([]);
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);

  // Dynamically extract available content types and topics from posts
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
    const topicsMap = new Map<string, string>();
    initialPosts.forEach((post) => {
      const topics = extractTopics(post.tags);
      topics.forEach((normalizedTopic) => {
        if (!topicsMap.has(normalizedTopic)) {
          const originalTag = post.tags.find(
            (t) => normalizeTag(t) === normalizedTopic
          );
          if (originalTag) {
            topicsMap.set(normalizedTopic, originalTag);
          }
        }
      });
    });

    const topics = Array.from(topicsMap.values()).sort();

    return {
      availableContentTypes: contentTypes,
      availableTopics: topics,
    };
  }, [initialPosts]);

  const filteredPosts = React.useMemo(() => {
    let filtered = initialPosts;

    if (selectedContentTypes.length > 0) {
      filtered = filtered.filter((post) => {
        const normalizedPostTags = post.tags.map(normalizeTag);
        return selectedContentTypes.some((ct) =>
          normalizedPostTags.includes(normalizeTag(ct))
        );
      });
    }

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
      const contentTypeTag = getContentTypeTag(post.tags);

      return {
        id: post.slug,
        title: post.title,
        description: post.excerpt,
        imageUrl: post.imageUrl,
        imageAlt: post.imageAlt || post.title,
        imageText: contentTypeTag || 'Article',
        date: new Date(post.publishedDate),
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
        gap: 4,
        flexWrap: 'wrap',
        paddingBottom: 12,
      }}
      role='group'
      aria-label='Filter by tag'
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'row', gap: 8 }}>
          <SectionHeader title='All Articles' />
          <TagChip
            label='All Content'
            isActive={
              selectedContentTypes.length === 0 && selectedTopics.length === 0
            }
            onClick={() => {
              setSelectedContentTypes([]);
              setSelectedTopics([]);
            }}
          />
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
                border: '1px solid var(--fx-accent)',
                borderRadius: '999px',
                padding: '4px 12px',
                backgroundColor: 'transparent',
                transition: 'all 0.15s ease',
                outline: 'none',
                marginTop: 20,
              }}
              aria-label='Clear all tag selections'
            >
              <span
                style={{
                  color: 'var(--fx-accent)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  transition: 'color 0.15s ease',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                Clear Tags
              </span>
            </button>
          )}
        </div>
        <div>
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
            />
          ))}
        </div>
      </div>
    </div>
  );

  const resultsMessage = (() => {
    const count = filteredPosts.length;
    const article = count === 1 ? 'article' : 'articles';
    const filterParts: string[] = [];

    if (selectedContentTypes.length > 0) {
      filterParts.push(`type: ${selectedContentTypes.join(', ')}`);
    }
    if (selectedTopics.length > 0) {
      filterParts.push(`topic: ${selectedTopics.join(', ')}`);
    }

    const filterText = filterParts.length > 0 ? ` (${filterParts.join(' | ')})` : '';
    return `Showing ${count} ${article}${filterText}`;
  })();

  const episodeCallout =
    !episodesLoading && latestEpisode ? (
      <div style={{ paddingTop: 32 }}>
        <FxCallout tone='gold' title='Listen to the Most Recent Episode'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span>{latestEpisode.episode_title || 'Start listening now'}</span>
            <FxButton
              variant='outline'
              size='lg'
              onClick={() => setSelectedEpisode(latestEpisode)}
            >
              Listen Now
            </FxButton>
          </div>
        </FxCallout>
      </div>
    ) : null;

  return (
    <>
      <ContentListingPage
        title='TRI Library'
        iconName='Library'
        description='All articles, challenges, and interactive demos from The Resonant Identity Podcast -- a living extension of The Resonance Core Framework. Use the tag filters to explore content by type or topic.'
        basePath='/podcasts/theresonantid/library'
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
        heroChildren={episodeCallout}
      />

      {selectedEpisode && (
        <EpisodeModal
          episode={selectedEpisode}
          onDismiss={() => setSelectedEpisode(null)}
        />
      )}
    </>
  );
}

// ---- TagChip helper ----

interface TagChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TagChip({ label, isActive, onClick }: TagChipProps) {
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
        marginBottom: 2,
        marginRight: 4,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        border: `1px solid ${
          isActive
            ? 'var(--fx-accent)'
            : hovered
              ? 'var(--fx-gold)'
              : 'var(--fx-border)'
        }`,
        borderRadius: '999px',
        padding: '8px 12px',
        backgroundColor: isActive
          ? 'var(--fx-accent)'
          : hovered
            ? 'var(--fx-surface-card)'
            : 'transparent',
        transition: 'all 0.15s ease',
        outline: 'none',
      }}
    >
      <span
        style={{
          color: isActive
            ? '#fff'
            : hovered
              ? 'var(--fx-accent)'
              : 'var(--fx-text-body)',
          fontSize: '0.8125rem',
          fontWeight: isActive ? 600 : 400,
          transition: 'color 0.15s ease',
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
}

export default TRILibraryClient;
