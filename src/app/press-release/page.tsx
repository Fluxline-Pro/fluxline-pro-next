'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageWrapper } from '@/components/PageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { usePressReleaseApi } from '@/hooks/usePressReleaseApi';
import { usePressReleaseStore } from '@/store/store';
import { format } from 'date-fns';

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
  const { viewType } = useContentFilterStore();
  const { pressReleases, isLoading, error } = usePressReleaseApi();
  const { getFilteredPressReleases } = usePressReleaseStore();

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

  // Get filtered press releases (supports future filtering by category/year)
  const filteredReleases = React.useMemo(() => {
    return getFilteredPressReleases();
  }, [getFilteredPressReleases]);

  // Transform press releases to card format
  const cards = React.useMemo(() => {
    return filteredReleases.map((release) => ({
      id: release.id,
      title: release.title,
      description: release.subtitle || release.description,
      imageUrl: release.imageUrl,
      imageAlt: release.imageAlt || release.title,
      imageText: format(release.date, 'MMMM d, yyyy'),
    }));
  }, [filteredReleases]);

  // Handle card click to navigate to detail view
  const handleCardClick = React.useCallback(
    (id: string) => {
      const selectedRelease = filteredReleases.find((r) => r.id === id);
      if (selectedRelease) {
        router.push(`/press-release/${id}`);
      }
    },
    [filteredReleases, router]
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
          <Typography
            variant="h1"
            style={{
              marginBottom: theme.spacing.s,
              color: theme.palette.neutralPrimary,
            }}
          >
            Press Release
          </Typography>
          <Typography
            variant="p"
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
            <Typography variant="h3" style={{ color: theme.palette.themePrimary }}>
              Loading press releases...
            </Typography>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              padding: theme.spacing.xl,
              backgroundColor: theme.palette.redDark,
              borderRadius: theme.effects.roundedCorner4,
              marginBottom: theme.spacing.xl,
            }}
          >
            <Typography variant="h3" style={{ color: theme.palette.white }}>
              Error loading press releases
            </Typography>
            <Typography
              variant="p"
              style={{ color: theme.palette.white }}
            >
              {error}
            </Typography>
          </div>
        )}

        {/* Press Release Cards */}
        {!isLoading && !error && cards.length > 0 && (
          <div onClick={(e) => {
            const target = e.target as HTMLElement;
            const card = target.closest('[data-card-id]');
            if (card) {
              const cardId = card.getAttribute('data-card-id');
              if (cardId) {
                handleCardClick(cardId);
              }
            }
          }}>
            <AdaptiveCardGrid
              cards={cards.map(card => ({
                ...card,
                // Add data attribute to identify clickable cards
                id: card.id,
              }))}
              viewType={mappedViewType}
              gap={theme.spacing.m}
              enableImageAdaptation={true}
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
              variant="h3"
              style={{ color: theme.palette.neutralSecondary }}
            >
              No press releases found
            </Typography>
            <Typography
              variant="p"
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
