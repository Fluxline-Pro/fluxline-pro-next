'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { FadeUp } from '@/animations/fade-animations';
import { Callout } from '@/theme/components/callout';
import FxButton from '@/theme/components/dsm/FxButton';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { ContentSection } from './ContentSection';
import { SectionHeader } from './SectionHeader';
import { Divider } from './Divider';

export interface TRIContentPost {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  imageAlt?: string;
  tags: string[];
  publishedDate: string;
  featured?: boolean;
}

export interface TRIContentFilteredViewProps {
  posts: TRIContentPost[];
  basePath?: string;
  backArrowPath?: string;
  title: string;
  description: string;
  iconName: string;
  itemLabelSingular: string;
  itemLabelPlural: string;
  cardLabel: string;
  allItemsLabel: string;
  allItemsSectionTitle: string;
  featuredSectionTitle: string;
  featuredButtonLabel: string;
  featuredButtonIcon: string;
  featuredButtonAriaLabelPrefix: string;
  heroCtaTitle: string;
  heroCtaButtonLabel: string;
  heroCtaButtonIcon: string;
  heroCtaAriaLabelPrefix: string;
  emptyStateTitle: string;
  emptyStateMessage: string;
  availableViewTypes?: Array<'grid' | 'small-tile' | 'large-tile'>;
  filterLabel?: string;
  allFilterOptionLabel?: string;
  excludedTags?: string[];
}

export function TRIContentFilteredView({
  posts,
  basePath = '/blog',
  backArrowPath = '/podcasts/theresonantid',
  title,
  description,
  iconName,
  itemLabelSingular,
  itemLabelPlural,
  cardLabel,
  allItemsLabel,
  allItemsSectionTitle,
  featuredSectionTitle,
  featuredButtonLabel,
  featuredButtonIcon,
  featuredButtonAriaLabelPrefix,
  heroCtaTitle,
  heroCtaButtonLabel,
  heroCtaButtonIcon,
  heroCtaAriaLabelPrefix,
  emptyStateTitle,
  emptyStateMessage,
  availableViewTypes = ['large-tile'],
  filterLabel = 'Tag',
  allFilterOptionLabel = 'All Tags',
  excludedTags = [],
}: TRIContentFilteredViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobileHook = useIsMobile();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobile = isMounted ? isMobileHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Derive requestedTag directly from URL search params (reactively updates on navigation)
  const requestedTag = searchParams.get('tag') || undefined;

  const normalizedExcludedTags = React.useMemo(
    () => new Set(excludedTags.map((tag) => tag.toLowerCase())),
    [excludedTags]
  );

  const availableTags = React.useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!normalizedExcludedTags.has(tag.toLowerCase())) {
          tagsSet.add(tag);
        }
      });
    });
    return Array.from(tagsSet).sort();
  }, [posts, normalizedExcludedTags]);
  const [selectedTag, setSelectedTag] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (!requestedTag) {
      setSelectedTag(undefined);
      return;
    }

    setSelectedTag(
      availableTags.includes(requestedTag) ? requestedTag : undefined
    );
  }, [requestedTag, availableTags]);

  const filteredPosts = React.useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  const featuredPost = React.useMemo(() => {
    const featured = posts.filter((post) => post.featured);
    if (featured.length === 0) return null;
    return [...featured].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    )[0];
  }, [posts]);

  const latestPost = React.useMemo(() => {
    if (featuredPost) return featuredPost;
    if (posts.length === 0) return null;
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    )[0];
  }, [posts, featuredPost]);

  const cards = React.useMemo(
    () =>
      filteredPosts.map((post) => ({
        id: post.slug,
        title: post.title,
        description: post.excerpt,
        imageUrl: post.imageUrl,
        imageAlt: post.imageAlt || post.title,
        imageText: cardLabel,
        date: new Date(post.publishedDate),
      })),
    [filteredPosts, cardLabel]
  );

  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: filterLabel,
      options: [
        { key: '', text: allFilterOptionLabel },
        ...availableTags.map((tag) => ({ key: tag, text: tag })),
      ],
      value: selectedTag,
      onChange: setSelectedTag,
    },
  ];

  const resultsMessage = `Showing ${filteredPosts.length} ${
    filteredPosts.length === 1 ? itemLabelSingular : itemLabelPlural
  }${selectedTag ? ` tagged with ${selectedTag}` : ''}`;

  const tagChips = (
    <>
      <Divider />
      <SectionHeader
        title={allItemsSectionTitle}
        style={{ marginTop: 24 }}
      />
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          paddingBottom: 16,
        }}
        role='group'
        aria-label={`Filter ${itemLabelPlural.toLowerCase()} by tag`}
      >
        <TagChip
          label={allItemsLabel}
          isActive={!selectedTag}
          onClick={() => setSelectedTag(undefined)}
        />
        {availableTags.map((tag) => (
          <TagChip
            key={tag}
            label={tag}
            isActive={selectedTag === tag}
            onClick={() =>
              setSelectedTag(selectedTag === tag ? undefined : tag)
            }
          />
        ))}
      </div>
    </>
  );

  const featuredTags = featuredPost
    ? featuredPost.tags.filter(
        (tag) => !normalizedExcludedTags.has(tag.toLowerCase())
      )
    : [];

  const featuredSection = featuredPost ? (
    <FadeUp>
      <ContentSection
        backgroundColor='var(--fx-surface-card)'
        padding
        borderRadius
        isMobile={isMobile}
        style={{
          marginTop: 80,
          marginBottom: 24,
          maxWidth: '800px',
        }}
      >
        <SectionHeader
          title={featuredSectionTitle}
          isWithinCta
          isMobile={isMobile}
          style={{ marginBottom: 16, marginTop: 12 }}
        />
        <Callout
          variant='neutral'
          title={featuredPost.title}
          subtitle={featuredPost.excerpt}
          action={
            <FxButton
              variant='primary'
              onClick={() => router.push(`${basePath}/${featuredPost.slug}`)}
              aria-label={`${featuredButtonAriaLabelPrefix}: ${featuredPost.title}`}
            >
              {featuredButtonLabel}
            </FxButton>
          }
        >
          <span
            style={{
              color: 'var(--fx-text-body)',
              display: 'block',
              marginTop: 8,
              textAlign: 'left',
              fontSize: '0.8rem',
            }}
          >
            {format(new Date(featuredPost.publishedDate), 'MMMM d, yyyy')}
            <br />
            {featuredTags.length > 0 ? featuredTags.join(' · ') : ''}
          </span>
        </Callout>
      </ContentSection>
    </FadeUp>
  ) : null;

  const heroCta = latestPost ? (
    <div style={{ paddingTop: 32 }}>
      <Callout
        variant='accent'
        title={heroCtaTitle}
        subtitle={latestPost.title}
        action={
          <FxButton
            variant='outline'
            size='lg'
            onClick={() => router.push(`${basePath}/${latestPost.slug}`)}
            aria-label={`${heroCtaAriaLabelPrefix}: ${latestPost.title}`}
          >
            {heroCtaButtonLabel}
          </FxButton>
        }
      />
    </div>
  ) : null;

  return (
    <ContentListingPage
      title={title}
      iconName={iconName}
      description={description}
      basePath={basePath}
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle={emptyStateTitle}
      emptyStateMessage={emptyStateMessage}
      backArrow={true}
      backArrowPath={backArrowPath}
      hasActiveFilters={!!selectedTag}
      onClearFilters={() => setSelectedTag(undefined)}
      customSection={
        <>
          {featuredSection}
          {tagChips}
        </>
      }
      onCardClick={(slug) => router.push(`${basePath}/${slug}`)}
      availableViewTypes={availableViewTypes}
      heroChildren={heroCta}
    />
  );
}

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
        marginRight: 8,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        border: `1px solid ${
          isActive
            ? 'var(--fx-accent)'
            : hovered
              ? 'var(--fx-accent)'
              : 'var(--fx-border)'
        }`,
        borderRadius: '999px',
        padding: '12px 16px',
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
          fontSize: '0.825rem',
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
