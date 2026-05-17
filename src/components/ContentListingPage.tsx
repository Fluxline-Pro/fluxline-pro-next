'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { Callout } from '@/theme/components/callout';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { FormButton, FormDateInput, FormSelect } from '@/theme/components/form';
import { Hero } from '@/theme/components/hero/Hero';

/**
 * Sort order options for content listing
 */
export type SortOrder = 'newest' | 'oldest' | 'a-z' | 'z-a';

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
  /** Optional date used for sorting and date-range filtering */
  date?: Date;
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

  // View configuration
  availableViewTypes?: Array<'grid' | 'small-tile' | 'large-tile'>;

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
  backArrow?: boolean;
  backArrowPath?: string;

  // Custom section (e.g., for GitHub contributions graph)
  customSection?: React.ReactNode;

  // Sort and filter controls
  /** Called when user clicks "Clear All Filters" – wrapper resets its own state */
  onClearFilters?: () => void;
  /** Set true when wrapper-specific filters (category, tag, etc.) are active */
  hasActiveFilters?: boolean;

  /** Extra content rendered inside the Hero (below description/filters) */
  heroChildren?: React.ReactNode;
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
  backArrow = false,
  backArrowPath = '/content',
  customSection,
  onClearFilters,
  hasActiveFilters = false,
  availableViewTypes = ['grid', 'small-tile', 'large-tile'],
  heroChildren,
}: ContentListingPageProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isTabletHook = useIsTablet();
  const isMobile = isMounted ? isMobileHook : false;
  const isTablet = isMounted ? isTabletHook : false;
  const isCompactFilterLayout = isMobile || isTablet;

  // Sort and date range state (local – independent per page)
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('newest');
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Build view options from available view types
  const allViewOptions = [
    { key: 'grid', text: 'Grid View' },
    { key: 'small-tile', text: 'Small Tile' },
    { key: 'large-tile', text: 'Large Tile' },
  ];
  const viewOptions = allViewOptions.filter((opt) =>
    availableViewTypes.includes(opt.key as 'grid' | 'small-tile' | 'large-tile')
  );

  const sortOptions = [
    { key: 'newest', text: 'Newest First' },
    { key: 'oldest', text: 'Oldest First' },
    { key: 'a-z', text: 'A – Z' },
    { key: 'z-a', text: 'Z – A' },
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

  // Apply date-range filter then sort to the cards received from the wrapper
  const processedCards = React.useMemo(() => {
    let result = [...cards];

    // Date-range filter (only for cards that carry a date)
    if (startDate) {
      const start = new Date(startDate);
      result = result.filter((card) => !card.date || card.date >= start);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((card) => !card.date || card.date <= end);
    }

    // Sort
    switch (sortOrder) {
      case 'newest':
        return result.sort((a, b) => {
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return b.date.getTime() - a.date.getTime();
        });
      case 'oldest':
        return result.sort((a, b) => {
          if (!a.date && !b.date) return 0;
          if (!a.date) return 1;
          if (!b.date) return -1;
          return a.date.getTime() - b.date.getTime();
        });
      case 'a-z':
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return result.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return result;
    }
  }, [cards, startDate, endDate, sortOrder]);

  // Determine whether any sort/date filters are active
  const internalHasActiveFilters =
    sortOrder !== 'newest' || startDate !== '' || endDate !== '';
  const showClearAll = internalHasActiveFilters || hasActiveFilters;

  // Reset all filters (internal + wrapper)
  const handleClearAll = () => {
    setSortOrder('newest');
    setStartDate('');
    setEndDate('');
    onClearFilters?.();
  };

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
    if (title === 'Books') return null; // No filters for Books page as per requirements

    const filterGridStyle: React.CSSProperties = {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: isCompactFilterLayout
        ? 'repeat(2, minmax(0, 1fr))'
        : 'repeat(3, minmax(0, 1fr))',
      gap: isMobile ? theme.spacing.s1 : theme.spacing.m,
      alignItems: 'end',
    };

    const filterCellStyle: React.CSSProperties = {
      minWidth: 0,
      width: '100%',
    };

    const clearButtonCellStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-end',
      gridColumn: '1 / -1',
    };

    return (
      <div style={filterGridStyle}>
        {/* Wrapper-supplied filters (category, tag, etc.) */}
        {filters.map((filter, index) => (
          <div key={index} style={filterCellStyle}>
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

        {/* Sort Order */}
        <div style={filterCellStyle}>
          <FormSelect
            label='Sort By'
            options={sortOptions}
            value={sortOrder}
            onChange={(value) => setSortOrder(value as SortOrder)}
          />
        </div>

        {/* Date Range – desktop only (per requirements: mobile must NOT show date range) */}
        {!isCompactFilterLayout && (
          <>
            <div style={filterCellStyle}>
              <FormDateInput
                label='Date From'
                value={startDate}
                max={endDate || undefined}
                onChange={setStartDate}
                aria-label='Filter from date'
              />
            </div>
            <div style={filterCellStyle}>
              <FormDateInput
                label='Date To'
                value={endDate}
                min={startDate || undefined}
                onChange={setEndDate}
                aria-label='Filter to date'
              />
            </div>
          </>
        )}

        {/* View Type Selector */}
        <div style={filterCellStyle}>
          <FormSelect
            label='View Type'
            options={viewOptions}
            value={viewType}
            onChange={(value) => {
              setViewType(value as 'grid' | 'small-tile' | 'large-tile');
            }}
          />
        </div>

        {/* Clear All Filters – shown when any filter is active */}
        {showClearAll && (
          <div style={clearButtonCellStyle}>
            <FormButton
              variant='secondary'
              size='small'
              icon='ClearFilter'
              iconPosition='left'
              onClick={handleClearAll}
              aria-label='Clear all filters'
            >
              Clear Filters
            </FormButton>
          </div>
        )}
      </div>
    );
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
          backArrow={backArrow}
          backArrowPath={backArrowPath}
        >
          {heroChildren}
        </Hero>

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
            {(startDate || endDate) &&
              processedCards.length !== cards.length &&
              ` · ${processedCards.length} matching date range`}
          </Typography>
        )}

        {/* Custom Section (e.g., GitHub contributions) */}
        {customSection && (
          <div style={{ marginBottom: theme.spacing.xl }}>{customSection}</div>
        )}

        {/* Content Cards */}
        {processedCards.length > 0 ? (
          <div>
            <AdaptiveCardGrid
              cards={processedCards}
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
