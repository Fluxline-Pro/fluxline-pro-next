'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { Dropdown, IconButton } from '@fluentui/react';
import { format } from 'date-fns';
import type { BlogPost } from '../../types';

interface BlogCategoryClientProps {
  category: string;
  posts: BlogPost[];
}

/**
 * Blog Category Filter Client Component
 * Displays blog posts filtered by a specific category
 */
export function BlogCategoryClient({
  category,
  posts,
}: BlogCategoryClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();
  const orientation = useDeviceOrientation();

  // View type options
  const viewOptions = [
    { key: 'grid', text: 'Grid View' },
    { key: 'small-tile', text: 'Small Tile' },
    { key: 'large-tile', text: 'Large Tile' },
  ];

  // Determine grid columns
  const gridColumns = React.useMemo(() => {
    if (viewType === 'small-tile' || viewType === 'large-tile') {
      return 1;
    }

    switch (orientation) {
      case 'portrait':
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

  // Map view type
  const mappedViewType = React.useMemo(() => {
    switch (viewType) {
      case 'small-tile':
        return 'small';
      case 'large-tile':
        return 'large';
      default:
        return viewType;
    }
  }, [viewType]);

  // Transform posts to cards
  const cards = React.useMemo(() => {
    return posts.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl,
      imageAlt: post.imageAlt || post.title,
      imageText: format(post.publishedDate, 'MMMM d, yyyy'),
    }));
  }, [posts]);

  // Handle card click
  const handleCardClick = React.useCallback(
    (slug: string) => {
      router.push(`/blog/${slug}`);
    },
    [router]
  );

  // Handle back to all posts
  const handleBack = React.useCallback(() => {
    router.push('/blog');
  }, [router]);

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      {/* Back Button */}
      <div style={{ marginBottom: theme.spacing.l1 }}>
        <IconButton
          iconProps={{ iconName: 'Back' }}
          title='Back to Blog'
          ariaLabel='Back to Blog'
          onClick={handleBack}
          styles={{
            root: {
              color: theme.palette.themePrimary,
            },
            rootHovered: {
              color: theme.palette.themeDark,
              backgroundColor: theme.palette.neutralLighter,
            },
          }}
        />
      </div>

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
          Category: {category}
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            marginBottom: theme.spacing.l1,
            fontSize: '1.1rem',
          }}
        >
          Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'} in
          this category.
        </Typography>
      </div>

      {/* View Type Selector */}
      <div
        style={{
          display: 'flex',
          marginBottom: theme.spacing.l1,
        }}
      >
        <div style={{ minWidth: '200px' }}>
          <Dropdown
            label='View Type'
            options={viewOptions}
            selectedKey={viewType}
            onChange={(_, option) => {
              if (option?.key) {
                setViewType(
                  option.key as 'grid' | 'small-tile' | 'large-tile'
                );
              }
            }}
            styles={{
              dropdown: { minWidth: 200 },
            }}
          />
        </div>
      </div>

      {/* Blog Posts Grid */}
      {posts.length > 0 ? (
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
            No blog posts found in this category.
          </Typography>
        </div>
      )}
    </UnifiedPageWrapper>
  );
}
