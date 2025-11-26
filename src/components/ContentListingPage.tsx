'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { Callout } from '@/theme/components/callout';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useDeviceOrientation, useIsMobile } from '@/theme/hooks/useMediaQuery';
import { FormButton, FormSelect } from '@/theme/components/form';
import { Hero } from '@/theme/components/hero/Hero';

/**
 * Base card item interface for content listing
 */
export interface ContentCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
  imageText: string;
}

/**
 * Filter configuration for single-select dropdown
 */
export interface SingleSelectFilter {
  type: 'single';
  label: string;
  placeholder?: string;
  options: Array<{ key: string; text: string }>;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

/**
 * Filter configuration for multi-select dropdown
 */
export interface MultiSelectFilter {
  type: 'multi';
  label: string;
  placeholder?: string;
  options: Array<{ key: string; text: string }>;
  selectedKeys: string[];
  onChange: (selectedKeys: string[]) => void;
}

/**
 * Union type for all filter types
 */
export type FilterConfig = SingleSelectFilter | MultiSelectFilter;

/**
 * Props for ContentListingPage component
 */
export interface ContentListingPageProps {
  // Page identity
  title: string;
  iconName?: string;
  description: string;
  basePath: string;

  // Content
  cards: ContentCard[];
  totalCount?: number; // Optional: for displaying "X of Y" counts

  // Filters
  filters: FilterConfig[];

  // Results messaging
  resultsMessage?: string;
  emptyStateTitle?: string;
  emptyStateMessage?: string;

  // Optional call-to-action section
  ctaSection?: {
    title: string;
    description: string;
    buttons: Array<{
      label: string;
      variant: 'primary' | 'secondary';
      path: string;
    }>;
  };

  // Navigation
  onCardClick?: (id: string) => void;
}

/**
 * Unified Content Listing Page Component
 *
 * Consolidates the shared logic across Blog, Portfolio, Press Release, and Case Studies pages.
 * Supports flexible filtering, view types, and responsive layouts.
 *
 * @example
 * ```tsx
 * <ContentListingPage
 *   title="Blog"
 *   iconName="TextDocumentShared"
 *   description="Latest insights..."
 *   basePath="/blog"
 *   cards={blogCards}
 *   filters={[
 *     {
 *       type: 'single',
 *       label: 'Category',
 *       options: categoryOptions,
 *       value: selectedCategory,
 *       onChange: setSelectedCategory
 *     }
 *   ]}
 * />
 * ```
 */
export function ContentListingPage({
  title,
  iconName,
  description,
  basePath,
  cards,
  filters,
  resultsMessage,
  emptyStateTitle = 'No items found',
  emptyStateMessage = 'Try adjusting your filters to see more items.',
  ctaSection,
  onCardClick,
}: ContentListingPageProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();

  // View type options for dropdown
  const viewOptions = [
    { key: 'grid', text: 'Grid View' },
    { key: 'small-tile', text: 'Small Tile' },
    { key: 'large-tile', text: 'Large Tile' },
  ];

  // Determine grid columns based on orientation and view type
  const gridColumns = React.useMemo(() => {
    // Get aspect ratio for more precise detection
    const aspectRatio =
      typeof window !== 'undefined'
        ? window.innerWidth / window.innerHeight
        : 1.5;

    // For tile views, use single column layout
    if (viewType === 'small-tile') {
      switch (orientation) {
        case 'portrait':
        case 'tablet-portrait':
          return 1;
        default:
          return 2;
      }
    }

    if (viewType === 'large-tile') {
      switch (orientation) {
        case 'portrait':
          return 1;
        case 'tablet-portrait':
        case 'square':
          return 2;
        case 'landscape':
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
      case 'portrait':
      case 'tablet-portrait':
        return 1;
      case 'mobile-landscape':
      case 'square':
        return 2;
      case 'landscape':
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

  // Handle card click
  const handleCardClick = React.useCallback(
    (id: string) => {
      if (onCardClick) {
        onCardClick(id);
      } else {
        router.push(`${basePath}/${id}`);
      }
    },
    [basePath, onCardClick, router]
  );

  // Render filter controls
  const renderFilters = () => {
    return (
      <>
        {filters.map((filter, index) => (
          <div key={index} style={{ minWidth: '200px', flex: '1 1 200px' }}>
            {filter.type === 'single' ? (
              <FormSelect
                label={filter.label}
                placeholder={filter.placeholder}
                options={filter.options}
                value={filter.value || ''}
                onChange={(value) => {
                  filter.onChange(value || undefined);
                }}
              />
            ) : (
              <FormSelect
                label={filter.label}
                placeholder={filter.placeholder}
                multiSelect
                options={filter.options}
                selectedKeys={filter.selectedKeys}
                onMultiChange={filter.onChange}
              />
            )}
          </div>
        ))}

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
    );
  };

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding:
            orientation === 'portrait' ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
        }}
      >
        {/* Page Header with Filters */}
        <Hero
          title={title}
          iconName={iconName}
          description={description}
          filters={renderFilters()}
        />

        {/* Results Count */}
        {resultsMessage && (
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l1,
              marginTop: isMobile ? theme.spacing.m : theme.spacing.xl,
            }}
          >
            {resultsMessage}
          </Typography>
        )}

        {/* Content Cards */}
        {cards.length > 0 ? (
          <div>
            <AdaptiveCardGrid
              cards={cards}
              viewType={mappedViewType}
              gap={theme.spacing.m}
              enableImageAdaptation={true}
              gridColumns={gridColumns}
              onCardClick={handleCardClick}
            />
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              flexDirection: 'column',
              gap: theme.spacing.m,
            }}
          >
            <Typography
              variant='h3'
              style={{ color: theme.palette.neutralSecondary }}
            >
              {emptyStateTitle}
            </Typography>
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralTertiary }}
            >
              {emptyStateMessage}
            </Typography>
          </div>
        )}

        {/* Optional Call to Action Section */}
        {ctaSection && (
          <div style={{ marginTop: theme.spacing.xxl }}>
            <Callout
              variant='subtle'
              title={ctaSection.title}
              subtitle={ctaSection.description}
              action={
                <div
                  style={{
                    display: 'flex',
                    gap: theme.spacing.m,
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}
                >
                  {ctaSection.buttons.map((button, index) => (
                    <FormButton
                      key={index}
                      variant={
                        button.variant === 'primary' ? 'primary' : 'secondary'
                      }
                      onClick={() => router.push(button.path)}
                      style={{
                        backgroundColor:
                          button.variant === 'primary'
                            ? theme.palette.themePrimary
                            : theme.palette.neutralLight,
                        color:
                          button.variant === 'primary'
                            ? theme.palette.white
                            : theme.palette.themePrimary,
                        border: `1px solid ${theme.palette.themePrimary}`,
                        borderRadius: theme.effects.roundedCorner4,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {button.label}
                    </FormButton>
                  ))}
                </div>
              }
            />
          </div>
        )}
      </div>
    </UnifiedPageWrapper>
  );
}
