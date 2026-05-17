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
import type { ArticlePost } from '@/app/podcasts/types';
import { ContentSection } from './ContentSection';
import { SectionHeader } from './SectionHeader';
import { Divider } from './Divider';
import { IExtendedTheme } from '@/theme';

export interface ArticlesFilteredViewProps {
  posts: ArticlePost[];
  basePath?: string;
  backArrowPath?: string;
  title?: string;
  description?: string;
}

export function ArticlesFilteredView({
  posts,
  basePath = '/blog',
  backArrowPath = '/podcasts/theresonantid',
  title = 'Companion Articles',
  description = 'Deep dives, frameworks, and reflections from the Resonant Identity ecosystem.',
}: ArticlesFilteredViewProps) {
  const { theme } = useAppTheme();
  const router = useRouter();
  const isMobileHook = useIsMobile();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobile = isMounted ? isMobileHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const [selectedTag, setSelectedTag] = React.useState<string | undefined>();

  const availableTags = React.useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  const filteredPosts = React.useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  const featuredPost = React.useMemo(() => {
    const featured = posts.filter((p) => p.featured);
    if (featured.length === 0) return null;
    return [...featured].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )[0];
  }, [posts]);

  const newestArticle = React.useMemo(() => {
    if (posts.length === 0) return null;
    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )[0];
  }, [posts]);

  const cards = React.useMemo(
    () =>
      filteredPosts.map((post) => ({
        id: post.slug,
        title: post.title,
        description: post.excerpt,
        imageUrl: post.imageUrl,
        imageAlt: post.imageAlt || post.title,
        imageText: 'Companion Article',
        date: new Date(post.publishedDate),
      })),
    [filteredPosts]
  );

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
    filteredPosts.length === 1 ? 'article' : 'articles'
  }${selectedTag ? ` tagged with ${selectedTag}` : ''}`;

  const tagChips = (
    <>
      <Divider />
      <SectionHeader title='All Articles' style={{ marginTop: theme.spacing.l }} />
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.s2,
          flexWrap: 'wrap',
          paddingBottom: theme.spacing.m,
        }}
        role='group'
        aria-label='Filter articles by tag'
      >
        <TagChip
          label='All Articles'
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
          title='Featured Article'
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
              icon='ReadingMode'
              iconPosition='left'
              onClick={() => router.push(`${basePath}/${featuredPost.slug}`)}
              aria-label={`Read the featured article: ${featuredPost.title}`}
            >
              Read Article
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
            {featuredPost.tags.join(' · ')}
          </Typography>
        </Callout>
      </ContentSection>
    </FadeUp>
  ) : null;

  const heroCta = newestArticle ? (
    <div className='pt-8'>
      <Callout
        variant='accent'
        title='Read the Latest Article'
        subtitle={newestArticle.title}
        action={
          <FormButton
            variant='secondary'
            size='large'
            icon='ReadingMode'
            iconPosition='left'
            onClick={() => router.push(`${basePath}/${newestArticle.slug}`)}
            aria-label={`Read the latest article: ${newestArticle.title}`}
          >
            Read the Latest Article
          </FormButton>
        }
      />
    </div>
  ) : null;

  return (
    <ContentListingPage
      title={title}
      iconName='TextDocumentShared'
      description={description}
      basePath={basePath}
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No companion articles found'
      emptyStateMessage='Try adjusting your filters to see more articles.'
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
      availableViewTypes={['large-tile']}
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
