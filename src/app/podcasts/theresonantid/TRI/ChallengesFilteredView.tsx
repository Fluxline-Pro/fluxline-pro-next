'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { FadeUp } from '@/animations/fade-animations';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import type { ChallengePost } from '@/app/podcasts/types';
import { ContentSection } from './ContentSection';
import { SectionHeader } from './SectionHeader';
import { Divider } from './Divider';

export interface ChallengesFilteredViewProps {
  /** Challenge posts pre-filtered to category "Resonant Identity" + tag "Identity Challenge" */
  posts: ChallengePost[];
  /** Base path for card navigation (default: "/blog") */
  basePath?: string;
  /** Back-arrow navigation path (default: "/blog") */
  backArrowPath?: string;
  /** Hero title (default: "Identity Challenges") */
  title?: string;
  /** Hero description */
  description?: string;
}

/**
 * ChallengesFilteredView
 *
 * Reusable component for displaying a filtered list of TRI identity challenges.
 * Provides:
 *  - Tag-chip quick-filter row
 *  - Featured challenge callout (most recent with `featured: true`)
 *  - Full-page grid using ContentListingPage (mirrors main blog page look/feel)
 *  - Hero CTA auto-linked to the newest featured or newest-by-date challenge
 *  - /blog is still the basepath due to taxonomy setup and blog post structure
 *  - The /podcast/resonant-identity/challenges page takes TRI posts and filters them down by the tag "Resonant Identity"
 *
 * Used on /podcast/resonant-identity/challenges and embeddable in other TRI sections.
 */
export function ChallengesFilteredView({
  posts,
  basePath = '/blog',
  backArrowPath = '/podcast/theresonantid',
  title = 'Identity Challenges',
  description = '7-day guided practices for identity coherence — structured challenges rooted in the Resonance Core Framework™.',
}: ChallengesFilteredViewProps) {
  const { theme } = useAppTheme();
  const router = useRouter();
  const isMobileHook = useIsMobile();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobile = isMounted ? isMobileHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [selectedTag, setSelectedTag] = React.useState<string | undefined>();

  // ── Available tags ──────────────────────────────────────────────────────────
  // Collect all unique tags from posts, excluding the base "Identity Challenge" tag
  const availableTags = React.useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tag !== 'Identity Challenge') {
          tagsSet.add(tag);
        }
      });
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  // ── Filtered posts ──────────────────────────────────────────────────────────
  const filteredPosts = React.useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  // ── Featured post ───────────────────────────────────────────────────────────
  // Most recent post with featured=true; null if none are featured
  const featuredPost = React.useMemo(() => {
    const featured = posts.filter((p) => p.featured);
    if (featured.length === 0) return null;
    return [...featured].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    )[0];
  }, [posts]);

  // ── Newest challenge for hero CTA ───────────────────────────────────────────
  const newestChallenge = React.useMemo(() => {
    if (featuredPost) return featuredPost;
    if (posts.length === 0) return null;
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    )[0];
  }, [posts, featuredPost]);

  // ── ContentCard format ──────────────────────────────────────────────────────
  const cards = React.useMemo(
    () =>
      filteredPosts.map((post) => ({
        id: post.slug,
        title: post.title,
        description: post.excerpt,
        imageUrl: post.imageUrl,
        imageAlt: post.imageAlt || post.title,
        imageText: 'Identity Challenge',
        date: new Date(post.publishedDate),
      })),
    [filteredPosts]
  );

  // ── Filter config ───────────────────────────────────────────────────────────
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Tag',
      options: [
        { key: '', text: 'All Tags' },
        ...availableTags.map((tag) => ({ key: tag, text: tag })),
      ],
      value: selectedTag,
      onChange: setSelectedTag,
    },
  ];

  const resultsMessage = `Showing ${filteredPosts.length} ${
    filteredPosts.length === 1 ? 'challenge' : 'challenges'
  }${selectedTag ? ` tagged with ${selectedTag}` : ''}`;

  // ── Tag chips (rendered above the grid as customSection) ────────────────────
  const tagChips = (
    <>
      <Divider />
      <SectionHeader
        title='All Challenges'
        style={{ marginTop: theme.spacing.l }}
      />
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.s2,
          flexWrap: 'wrap',
          paddingBottom: theme.spacing.m,
        }}
        role='group'
        aria-label='Filter challenges by tag'
      >
        <TagChip
          label='All Challenges'
          isActive={!selectedTag}
          onClick={() => setSelectedTag(undefined)}
          theme={theme}
        />
        {availableTags.map((tag) => (
          <TagChip
            key={tag}
            label={tag}
            isActive={selectedTag === tag}
            onClick={() =>
              setSelectedTag(selectedTag === tag ? undefined : tag)
            }
            theme={theme}
          />
        ))}
      </div>
    </>
  );

  // ── Featured challenge callout ──────────────────────────────────────────────
  const featuredSection = featuredPost ? (
    <FadeUp>
      <ContentSection
        backgroundColor={theme.palette.neutralLighter}
        padding
        borderRadius
        isMobile={isMobile}
        style={{
          marginTop: theme.spacing.xxxxl,
          marginBottom: theme.spacing.l,
          maxWidth: '800px',
        }}
      >
        <SectionHeader
          title='Featured Challenge'
          isWithinCta
          isMobile={isMobile}
          style={{ marginBottom: theme.spacing.m, marginTop: theme.spacing.s1 }}
        />
        <Callout
          variant='neutral'
          title={featuredPost.title}
          subtitle={featuredPost.excerpt}
          action={
            <FormButton
              variant='primary'
              icon='FitPage'
              iconPosition='left'
              onClick={() => router.push(`${basePath}/${featuredPost.slug}`)}
              aria-label={`Start the featured challenge: ${featuredPost.title}`}
            >
              Start Challenge
            </FormButton>
          }
        >
          <Typography
            variant='caption'
            style={{
              color: theme.palette.neutralSecondary,
              display: 'block',
              marginTop: theme.spacing.s2,
              textAlign: 'left',
            }}
          >
            {format(new Date(featuredPost.publishedDate), 'MMMM d, yyyy')}
            <br />
            {featuredPost.tags.filter((t) => t !== 'Identity Challenge')
              .length > 0 &&
              ` ${featuredPost.tags
                .filter((t) => t !== 'Identity Challenge')
                .join(' · ')}`}
          </Typography>
        </Callout>
      </ContentSection>
    </FadeUp>
  ) : null;

  // ── Hero CTA ────────────────────────────────────────────────────────────────
  const heroCta = newestChallenge ? (
    <div className='pt-8'>
      <Callout
        variant='accent'
        title='Start the Latest 7-day Challenge'
        subtitle={newestChallenge.title}
        action={
          <FormButton
            variant='secondary'
            size='large'
            icon='FitPage'
            iconPosition='left'
            onClick={() => router.push(`${basePath}/${newestChallenge.slug}`)}
            aria-label={`Start the most recent challenge: ${newestChallenge.title}`}
          >
            Start the Latest Challenge
          </FormButton>
        }
      />
    </div>
  ) : null;

  return (
    <ContentListingPage
      title={title}
      iconName='FitPage'
      description={description}
      basePath={basePath}
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No challenges found'
      emptyStateMessage='Try adjusting your filters to see more challenges.'
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
      availableViewTypes={['grid', 'small-tile', 'large-tile']}
      heroChildren={heroCta}
    />
  );
}

// ─── TagChip helper ────────────────────────────────────────────────────────────

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
        padding: `${theme.spacing.s1} ${theme.spacing.m}`,
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
          fontSize: '0.825rem',
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
