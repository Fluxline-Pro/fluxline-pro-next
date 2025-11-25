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
import { FormButton } from '@/theme/components/form';
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
  const allCaseStudies = React.useMemo(() => getCaseStudies(), []);

  // Filter state
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>(
    []
  );

  // Get all unique industries
  const allIndustries = React.useMemo(() => {
    const industries = new Set(allCaseStudies.map((study) => study.industry));
    return Array.from(industries).sort();
  }, [allCaseStudies]);

  // Filter case studies based on selected industries
  const caseStudies = React.useMemo(() => {
    if (selectedIndustries.length === 0) {
      return allCaseStudies;
    }
    return allCaseStudies.filter((study) =>
      selectedIndustries.includes(study.industry)
    );
  }, [allCaseStudies, selectedIndustries]);

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

  // Handle industry selection
  const handleIndustryChange = React.useCallback((selectedKeys: string[]) => {
    setSelectedIndustries(selectedKeys);
  }, []);

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding:
            orientation === 'portrait' ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
        }}
      >
        {/* Page Header */}
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
            Case Studies
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l1,
              fontSize: '1.1rem',
            }}
          >
            Explore our client success stories and discover how strategic
            transformation drives measurable results. From digital
            transformation to wellness platforms, see how we partner with
            organizations to achieve their most ambitious goals.
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
          {/* Industry Filter */}
          <div style={{ minWidth: '200px', flex: '1 1 200px' }}>
            <FormSelect
              label='Industry'
              placeholder='All Industries'
              multiSelect
              options={allIndustries.map((industry) => ({
                key: industry,
                text: industry,
              }))}
              selectedKeys={selectedIndustries}
              onMultiChange={handleIndustryChange}
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
        </div>

        {/* Results Count */}
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            marginBottom: theme.spacing.l1,
          }}
        >
          Showing {caseStudies.length}{' '}
          {caseStudies.length === 1 ? 'case study' : 'case studies'}
          {selectedIndustries.length > 0 &&
            ` in: ${selectedIndustries.join(', ')}`}
        </Typography>

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
            <FormButton
              variant='primary'
              onClick={() => router.push('/services')}
              size='large'
            >
              View Our Services
            </FormButton>
            <FormButton
              variant='secondary'
              onClick={() => router.push('/contact')}
              size='large'
            >
              Start Your Transformation
            </FormButton>
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
