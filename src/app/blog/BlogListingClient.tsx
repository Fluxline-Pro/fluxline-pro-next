'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { FormSelect } from '@/theme/components/form';
import { format } from 'date-fns';
import { BlogPost } from './types';
import { Hero } from '@/theme/components/hero/Hero';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import FluxlineLogoDarkMode from '@/assets/images/FluxlineLogoDarkMode.png';

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
  const isMobile = useIsMobile();

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
    // Get aspect ratio for more precise detection
    const aspectRatio =
      typeof window !== 'undefined'
        ? window.innerWidth / window.innerHeight
        : 1.5;

    // For small tile view, use 1-2 columns
    if (viewType === 'small-tile') {
      switch (orientation) {
        case 'portrait':
        case 'tablet-portrait':
          return 1;
        default:
          return 2;
      }
    }

    // For large tile view, use 1-4 columns based on screen size
    if (viewType === 'large-tile') {
      switch (orientation) {
        case 'portrait':
          return 1;
        case 'tablet-portrait':
        case 'square':
          return 2;
        case 'landscape':
          // Treat narrow landscape (aspect < 1.5) as square-like
          return aspectRatio < 1.5 ? 2 : 3;
        case 'large-portrait':
          return 3;
        case 'ultrawide':
          return 4;
        default:
          return 2;
      }
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
        // Treat narrow landscape (aspect < 1.5) as square-like
        return aspectRatio < 1.5 ? 2 : 3;
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
      imageUrl: post.imageUrl || FluxlineLogoDarkMode.src,
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
      <Hero
        title='Blog'
        iconName='TextDocumentShared'
        description='Insights, best practices, and thoughts on technology, design, and business transformation. Explore articles on software development, leadership, wellness, and strategic innovation.'
        filters={
          <>
            {/* Category Filter */}
            <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
              <FormSelect
                label='Category'
                options={categoryOptions}
                value={selectedCategory || ''}
                onChange={(value) => {
                  setSelectedCategory(value || undefined);
                }}
              />
            </div>

            {/* Tag Filter */}
            <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
              <FormSelect
                label='Tag'
                options={tagOptions}
                value={selectedTag || ''}
                onChange={(value) => {
                  setSelectedTag(value || undefined);
                }}
              />
            </div>

            {/* View Type Selector */}
            <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
              <FormSelect
                label='View Type'
                options={viewOptions}
                value={viewType}
                onChange={(value) => {
                  setViewType(value as 'grid' | 'small-tile' | 'large-tile');
                }}
              />
            </div>
          </>
        }
      />

      {/* Results Count */}
      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          marginBottom: theme.spacing.l1,
          marginTop: isMobile ? theme.spacing.m : theme.spacing.xl,
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
