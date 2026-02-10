'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { Callout } from '@/theme/components/callout';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
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
  totalCount = cards.length,
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
  const isMobile = useIsMobile();

  // View type options for dropdown
  const viewOptions = [
    { key: 'grid', text: 'Grid View' },
    { key: 'small-tile', text: 'Small Tile' },
    { key: 'large-tile', text: 'Large Tile' },
  ];

  React.useEffect(() => {
    if (title === 'Books') {
      setViewType('large-tile'); // Force large tile view for Books page as per requirements
    }
  }, [title, setViewType]);

  // Ensure filters array is always defined
  if (!filters) {
    console.warn('Filters prop is undefined, defaulting to empty array');
    filters = [];
  }

  // Ensure cards array is always defined
  if (!cards) {
    console.warn('Cards prop is undefined, defaulting to empty array');
    cards = [];
  }

  // Log if resultsMessage is missing when totalCount is provided
  if (totalCount !== undefined && !resultsMessage) {
    console.warn(
      'totalCount prop is provided without resultsMessage. Consider providing a resultsMessage for better user feedback.'
    );
  }

  // Map view type for grid component
  const getViewType = () => {
    if (viewType === 'small-tile') return 'small';
    if (viewType === 'large-tile') return 'large';
    return 'grid';
  };

  // Handle card click
  const handleCardClick = (id: string) => {
    if (onCardClick) {
      onCardClick(id);
    } else {
      router.push(`${basePath}/${id}`);
    }
  };

  // Render filter controls
  const renderFilters = () => {
    return title !== 'Books' ? ( // Only show filters if not on the Books Listing page, per requirements
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
    ) : null /* No filters for Books page as per requirements */;
  };

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding: isMobile ? theme.spacing.m : theme.spacing.xl,
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
              viewType={getViewType()}
              gridColumns={title === 'Books' ? 2 : undefined} // Force 2 columns for Books page as per requirements
              gap={theme.spacing.m}
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
