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
import { getCaseStudies } from './caseStudiesData';

/**
 * Case Studies Page Component
 * Displays client success stories in a card grid layout
 *
 * Features:
 * - Responsive card grid layout with view type selector
 * - Theme-aware styling with Fluent UI
 * - Integration with PageWrapper for consistent layout
 * - SSG static rendering
 * - Navigation to detail views
 */
export default function CaseStudiesPage() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();
  const orientation = useDeviceOrientation();

  // Load case studies data
  const caseStudies = React.useMemo(() => getCaseStudies(), []);

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

  // Transform case studies to card format
  const cards = React.useMemo(() => {
    return caseStudies.map((study) => ({
      id: study.id,
      title: study.title,
      description: study.description,
      imageUrl: study.imageUrl,
      imageAlt: study.imageAlt || study.title,
      imageText: `${study.client} • ${study.industry}`,
    }));
  }, [caseStudies]);

  // Handle card click to navigate to detail view
  const handleCardClick = React.useCallback(
    (id: string) => {
      console.log('Navigating to case study:', id);
      router.push(`/case-studies/${id}`);
    },
    [router]
  );

  return (
    <PageWrapper>
      <div
        style={{
          padding:
            orientation === 'portrait' ? theme.spacing.m : theme.spacing.xl,
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
              Case Studies
            </Typography>
            {/* View Selector Dropdown */}
            <div
              style={{
                minWidth: orientation === 'portrait' ? '150px' : '200px',
              }}
            >
              <Dropdown
                placeholder='Select view type'
                options={viewOptions}
                selectedKey={viewType}
                onChange={(event, option) => {
                  if (option) {
                    setViewType(
                      option.key as 'grid' | 'small-tile' | 'large-tile'
                    );
                  }
                }}
                styles={{
                  root: {
                    minWidth: orientation === 'portrait' ? '150px' : '200px',
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
            Explore our client success stories and discover how strategic
            transformation drives measurable results. From digital
            transformation to wellness platforms, see how we partner with
            organizations to achieve their most ambitious goals.
          </Typography>
        </div>

        {/* Case Study Cards */}
        {cards.length > 0 && (
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
        )}

        {/* Empty State */}
        {cards.length === 0 && (
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
              No case studies found
            </Typography>
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralTertiary }}
            >
              Check back soon for client success stories.
            </Typography>
          </div>
        )}

        {/* Call to Action Section */}
        <div
          style={{
            marginTop: theme.spacing.xxl,
            padding: theme.spacing.xl,
            backgroundColor: theme.palette.neutralLighterAlt,
            borderRadius: theme.effects.roundedCorner6,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            Ready to Transform Your Business?
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Join the growing list of organizations achieving measurable results
            with Fluxline&apos;s strategic approach to transformation.
          </Typography>
          <div
            style={{
              display: 'flex',
              gap: theme.spacing.m,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => router.push('/services')}
              style={{
                padding: `${theme.spacing.s1} ${theme.spacing.l}`,
                backgroundColor: theme.palette.themePrimary,
                color: theme.palette.white,
                border: 'none',
                borderRadius: theme.effects.roundedCorner4,
                fontSize: theme.fonts.mediumPlus.fontSize,
                fontWeight: theme.typography.fontWeights.semiBold,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.palette.themeDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themePrimary;
              }}
            >
              View Our Services
            </button>
            <button
              onClick={() => router.push('/contact')}
              style={{
                padding: `${theme.spacing.s1} ${theme.spacing.l}`,
                backgroundColor: 'transparent',
                color: theme.palette.themePrimary,
                border: `2px solid ${theme.palette.themePrimary}`,
                borderRadius: theme.effects.roundedCorner4,
                fontSize: theme.fonts.mediumPlus.fontSize,
                fontWeight: theme.typography.fontWeights.semiBold,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themeLighterAlt;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
