'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { Dropdown } from '@fluentui/react';
import { format } from 'date-fns';
import { BlogPost } from './types';

interface BlogListingClientProps {
  initialPosts: BlogPost[];
  allTags: string[];
  allCategories: string[];
}

/**
 * Blog Listing Client Component
 * Handles filtering, view switching, and user interactions for blog posts
 */
export function BlogListingClient({
  initialPosts,
  allTags,
  allCategories,
}: BlogListingClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();
  const orientation = useDeviceOrientation();

  // State for filters
  const [selectedTag, setSelectedTag] = React.useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | undefined
  >();

  // Filter blog posts based on selected filters
  const blogPosts = React.useMemo(() => {
    let filtered = [...initialPosts];

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    return filtered.sort(
      (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
    );
  }, [initialPosts, selectedTag, selectedCategory]);

  // View type options for dropdown
  const viewOptions = [
    { key: 'grid', text: 'Grid View' },
    { key: 'small-tile', text: 'Small Tile' },
    { key: 'large-tile', text: 'Large Tile' },
  ];

  // Tag filter options
  const tagOptions = React.useMemo(() => {
    return [
      { key: '', text: 'All Tags' },
      ...allTags.map((tag) => ({ key: tag, text: tag })),
    ];
  }, [allTags]);

  // Category filter options
  const categoryOptions = React.useMemo(() => {
    return [
      { key: '', text: 'All Categories' },
      ...allCategories.map((cat) => ({ key: cat, text: cat })),
    ];
  }, [allCategories]);

  // Determine grid columns based on orientation and view type
  const gridColumns = React.useMemo(() => {
    // For tile views, use single column layout
    if (viewType === 'small-tile' || viewType === 'large-tile') {
      return 1;
    }

    // For grid view, use responsive columns
    switch (orientation) {
      case 'portrait': // Mobile portrait
      case 'tablet-portrait':
        return 1;
      case 'mobile-landscape':
      case 'square':
        return 2;
      case 'landscape':
      case 'large-portrait':
        return 3;
      case 'ultrawide':
        return 4;
      default:
        return 3;
    }
  }, [orientation, viewType]);

  // Map ContentViewType to AdaptiveCardGrid viewType
  const mappedViewType = React.useMemo(() => {
    switch (viewType) {
      case 'small-tile':
        return 'small';
      case 'large-tile':
        return 'large';
      default:
        return viewType; // 'grid' maps directly
    }
  }, [viewType]);

  // Transform blog posts to card format
  const cards = React.useMemo(() => {
    return blogPosts.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl,
      imageAlt: post.imageAlt || post.title,
      imageText: format(post.publishedDate, 'MMMM d, yyyy'),
    }));
  }, [blogPosts]);

  // Handle card click to navigate to detail view
  const handleCardClick = React.useCallback(
    (slug: string) => {
      router.push(`/blog/${slug}`);
    },
    [router]
  );

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      {/* Header Section */}
      <div style={{ marginBottom: theme.spacing.l2 }}>
        <Typography
          variant='h1'
          style={{
            fontWeight: 700,
            color: theme.palette.themePrimary,
            marginBottom: theme.spacing.m,
            fontSize: '2.5rem',
          }}
        >
          Blog
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            marginBottom: theme.spacing.l1,
            fontSize: '1.1rem',
          }}
        >
          Insights, best practices, and thoughts on technology, design, and
          business transformation.
        </Typography>
      </div>

      {/* Filters and View Selector */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.m,
          marginBottom: theme.spacing.l1,
          alignItems: 'flex-end',
        }}
      >
        {/* Category Filter */}
        <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
          <Dropdown
            label='Category'
            options={categoryOptions}
            selectedKey={selectedCategory || ''}
            onChange={(_, option) => {
              setSelectedCategory(option?.key ? String(option.key) : undefined);
            }}
            styles={{
              dropdown: { minWidth: 200 },
              root: { width: '100%' },
            }}
          />
        </div>

        {/* Tag Filter */}
        <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
          <Dropdown
            label='Tag'
            options={tagOptions}
            selectedKey={selectedTag || ''}
            onChange={(_, option) => {
              setSelectedTag(option?.key ? String(option.key) : undefined);
            }}
            styles={{
              dropdown: { minWidth: 200 },
              root: { width: '100%' },
            }}
          />
        </div>

        {/* View Type Selector */}
        <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
          <Dropdown
            label='View Type'
            options={viewOptions}
            selectedKey={viewType}
            onChange={(_, option) => {
              if (option?.key) {
                setViewType(option.key as 'grid' | 'small-tile' | 'large-tile');
              }
            }}
            styles={{
              dropdown: { minWidth: 200 },
              root: { width: '100%' },
            }}
          />
        </div>
      </div>

      {/* Results Count */}
      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          marginBottom: theme.spacing.l1,
        }}
      >
        Showing {blogPosts.length} {blogPosts.length === 1 ? 'post' : 'posts'}
        {selectedCategory && ` in ${selectedCategory}`}
        {selectedTag && ` tagged with ${selectedTag}`}
      </Typography>

      {/* Blog Posts Grid */}
      {blogPosts.length > 0 ? (
        <AdaptiveCardGrid
          cards={cards}
          gridColumns={gridColumns}
          onCardClick={handleCardClick}
          viewType={mappedViewType}
        />
      ) : (
        <div
          style={{
            padding: theme.spacing.l2,
            textAlign: 'center',
            color: theme.palette.neutralSecondary,
          }}
        >
          <Typography variant='h3'>
            No blog posts found with the selected filters.
          </Typography>
          <Typography variant='p' style={{ marginTop: theme.spacing.m }}>
            Try adjusting your filters to see more posts.
          </Typography>
        </div>
      )}
    </UnifiedPageWrapper>
  );
}
