'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageWrapper } from '@/components/PageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { Dropdown } from '@fluentui/react';
import { format } from 'date-fns';
import { pressReleasesMockData } from '@/store/mock-data/pressReleaseMock';

/**
 * Press Release Page Component
 * Displays press releases in a card grid layout
 * Mirrors the design logic from Blog and Portfolio views
 *
 * Features:
 * - Responsive card grid layout
 * - Theme-aware styling with Fluent UI
 * - Loading and error states
 * - Integration with PageWrapper for consistent layout
 * - Portrait image and title display
 */
export default function PressReleasePage() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();
  const orientation = useDeviceOrientation();

  // Use direct import of mock data (sorted by date, newest first)
  const pressReleases = React.useMemo(() => {
    return [...pressReleasesMockData].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }, []);

  const isLoading = false;
  const error = null;

  // View type options for dropdown
  const viewOptions = [
    { key: 'grid', text: 'Grid View' },
    { key: 'small-tile', text: 'Small Tile' },
    { key: 'large-tile', text: 'Large Tile' },
  ];

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

  // Transform press releases to card format
  const cards = React.useMemo(() => {
    const transformedCards = pressReleases.map((release) => ({
      id: release.id,
      title: release.title,
      description: release.subtitle || release.description,
      imageUrl: release.imageUrl,
      imageAlt: release.imageAlt || release.title,
      imageText: format(release.date, 'MMMM d, yyyy'),
    }));
    console.log('PressReleasePage render - state:', {
      pressReleasesCount: pressReleases?.length || 0,
      isLoading,
      error,
      orientation,
      viewType,
      gridColumns,
      mappedViewType,
    });
    return transformedCards;
  }, [
    gridColumns,
    mappedViewType,
    isLoading,
    error,
    orientation,
    pressReleases,
    viewType,
  ]);

  // Handle card click to navigate to detail view
  const handleCardClick = React.useCallback(
    (id: string) => {
      console.log('handleCardClick called with ID:', id);
      const selectedRelease = pressReleases.find((r) => r.id === id);
      console.log('Found release:', selectedRelease?.title);
      if (selectedRelease) {
        console.log('Navigating to:', `/press-release/${id}`);
        router.push(`/press-release/${id}`);
      }
    },
    [pressReleases, router]
  );

  return (
    <PageWrapper>
      <div
        style={{
          padding: theme.spacing.xl,
          width: '100%',
        }}
      >
        {/* Page Header */}
        <div
          style={{
            marginBottom: theme.spacing.xl,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: theme.spacing.m,
            }}
          >
            <Typography
              variant='h1'
              style={{
                color: theme.palette.neutralPrimary,
              }}
            >
              Press Release
            </Typography>
            {/* View Selector Dropdown */}
            <div style={{ minWidth: '200px' }}>
              <Dropdown
                placeholder='Select view type'
                options={viewOptions}
                selectedKey={viewType}
                onChange={(event, option) => {
                  if (option) {
                    setViewType(option.key as any);
                  }
                }}
                styles={{
                  root: {
                    minWidth: '200px',
                  },
                  dropdown: {
                    backgroundColor: theme.palette.neutralLighter,
                    border: `1px solid ${theme.palette.neutralLight}`,
                    borderRadius: theme.effects.roundedCorner4,
                  },
                  title: {
                    backgroundColor: 'transparent',
                    borderColor: theme.palette.neutralLight,
                    color: theme.palette.neutralPrimary,
                  },
                  caretDown: {
                    color: theme.palette.themePrimary,
                  },
                }}
              />
            </div>
          </div>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              maxWidth: '800px',
            }}
          >
            Public announcements, media features, and milestone broadcasts from
            Fluxline Resonance Group. Stay informed about our latest
            developments, partnerships, and achievements.
          </Typography>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <Typography
              variant='h3'
              style={{ color: theme.palette.themePrimary }}
            >
              Loading press releases...
            </Typography>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div
            style={{
              padding: theme.spacing.xl,
              backgroundColor: theme.palette.redDark,
              borderRadius: theme.effects.roundedCorner4,
              marginBottom: theme.spacing.xl,
            }}
          >
            <Typography variant='h3' style={{ color: theme.palette.white }}>
              Error loading press releases
            </Typography>
            <Typography variant='p' style={{ color: theme.palette.white }}>
              {error}
            </Typography>
          </div>
        )}

        {/* Press Release Cards */}
        {!isLoading && !error && cards.length > 0 && (
          <div
            onClick={(e) => {
              console.log('Click event triggered:', e.target);
              const target = e.target as HTMLElement;
              const card = target.closest('[data-card-id]');
              console.log('Found card element:', card);
              if (card) {
                const cardId = card.getAttribute('data-card-id');
                console.log('Card ID:', cardId);
                if (cardId) {
                  handleCardClick(cardId);
                }
              }
            }}
          >
            <AdaptiveCardGrid
              cards={cards.map((card) => ({
                ...card,
                // Add data attribute to identify clickable cards
                id: card.id,
              }))}
              viewType={mappedViewType}
              gap={theme.spacing.m}
              enableImageAdaptation={true}
              gridColumns={gridColumns}
              onCardClick={handleCardClick}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && cards.length === 0 && (
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
              No press releases found
            </Typography>
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralTertiary }}
            >
              Check back soon for updates and announcements.
            </Typography>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
