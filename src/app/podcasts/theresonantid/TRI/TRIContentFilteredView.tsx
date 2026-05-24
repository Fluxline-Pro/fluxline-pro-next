'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ContentListingPage, FilterConfig } from '@/components/ContentListingPage';
import { FadeUp } from '@/animations/fade-animations';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { IExtendedTheme } from '@/theme';
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
  const { theme } = useAppTheme();
  const router = useRouter();
  const isMobileHook = useIsMobile();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobile = isMounted ? isMobileHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [requestedTag, setRequestedTag] = React.useState<string | undefined>();
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
    if (typeof window === 'undefined') return;

    const tag = new URLSearchParams(window.location.search).get('tag') || undefined;
    setRequestedTag(tag);
  }, []);

  React.useEffect(() => {
    if (!requestedTag) {
      setSelectedTag(undefined);
      return;
    }

    setSelectedTag(availableTags.includes(requestedTag) ? requestedTag : undefined);
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
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )[0];
  }, [posts]);

  const latestPost = React.useMemo(() => {
    if (featuredPost) return featuredPost;
    if (posts.length === 0) return null;
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
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
      <SectionHeader title={allItemsSectionTitle} style={{ marginTop: theme.spacing.l }} />
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.s2,
          flexWrap: 'wrap',
          paddingBottom: theme.spacing.m,
        }}
        role='group'
        aria-label={`Filter ${itemLabelPlural.toLowerCase()} by tag`}
      >
        <TagChip
          label={allItemsLabel}
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
          title={featuredSectionTitle}
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
              icon={featuredButtonIcon}
              iconPosition='left'
              onClick={() => router.push(`${basePath}/${featuredPost.slug}`)}
              aria-label={`${featuredButtonAriaLabelPrefix}: ${featuredPost.title}`}
            >
              {featuredButtonLabel}
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
            {featuredTags.length > 0 ? featuredTags.join(' · ') : ''}
          </Typography>
        </Callout>
      </ContentSection>
    </FadeUp>
  ) : null;

  const heroCta = latestPost ? (
    <div className='pt-8'>
      <Callout
        variant='accent'
        title={heroCtaTitle}
        subtitle={latestPost.title}
        action={
          <FormButton
            variant='secondary'
            size='large'
            icon={heroCtaButtonIcon}
            iconPosition='left'
            onClick={() => router.push(`${basePath}/${latestPost.slug}`)}
            aria-label={`${heroCtaAriaLabelPrefix}: ${latestPost.title}`}
          >
            {heroCtaButtonLabel}
          </FormButton>
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
  theme: IExtendedTheme;
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
