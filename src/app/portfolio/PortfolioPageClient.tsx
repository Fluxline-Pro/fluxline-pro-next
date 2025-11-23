'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { AdaptiveCardGrid } from '@/theme/components/card/AdaptiveCardGrid';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useContentFilterStore } from '@/store/store';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { PortfolioProject } from './types';

interface PortfolioPageProps {
  projects: PortfolioProject[];
  allTags: string[];
  allTechnologies: string[];
}

/**
 * Portfolio Page Component
 * Displays portfolio projects in a card grid layout with filtering capabilities
 *
 * Features:
 * - Responsive card grid layout with view type selector
 * - Tag and technology filtering
 * - Theme-aware styling with Fluent UI
 * - Integration with PageWrapper for consistent layout
 * - SSG static rendering with client-side interactivity
 */
export default function PortfolioPageClient({
  projects,
  allTags,
  allTechnologies,
}: PortfolioPageProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const { viewType, setViewType } = useContentFilterStore();
  const orientation = useDeviceOrientation();

  // Filter state
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = React.useState<
    string[]
  >([]);

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

  // Filter projects based on selected filters
  const filteredProjects = React.useMemo(() => {
    let filtered = projects;

    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        project.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter((project) =>
        project.technologies.some((tech) =>
          selectedTechnologies.includes(tech)
        )
      );
    }

    return filtered;
  }, [projects, selectedTags, selectedTechnologies]);

  // Transform portfolio projects to card format
  const cards = React.useMemo(() => {
    return filteredProjects.map((project) => ({
      id: project.slug,
      title: project.title,
      description: project.shortDescription,
      imageUrl: project.featuredImage.url,
      imageAlt: project.featuredImage.alt,
      imageText: `${project.role}${project.client ? ` • ${project.client}` : ''}`,
    }));
  }, [filteredProjects]);

  // Handle card click to navigate to detail view
  const handleCardClick = React.useCallback(
    (slug: string) => {
      console.log('Navigating to portfolio project:', slug);
      router.push(`/portfolio/${slug}`);
    },
    [router]
  );

  // Handle tag selection
  const handleTagChange = React.useCallback(
    (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption
    ) => {
      if (option) {
        const tags = option.selected
          ? [...selectedTags, String(option.key)]
          : selectedTags.filter((t) => t !== option.key);
        setSelectedTags(tags);
      }
    },
    [selectedTags]
  );

  // Handle technology selection
  const handleTechnologyChange = React.useCallback(
    (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption
    ) => {
      if (option) {
        const techs = option.selected
          ? [...selectedTechnologies, String(option.key)]
          : selectedTechnologies.filter((t) => t !== option.key);
        setSelectedTechnologies(techs);
      }
    },
    [selectedTechnologies]
  );

  // Clear all filters
  const clearFilters = React.useCallback(() => {
    setSelectedTags([]);
    setSelectedTechnologies([]);
  }, []);

  const hasActiveFilters = selectedTags.length > 0 || selectedTechnologies.length > 0;

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
              Portfolio
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
            Explore our portfolio of innovative projects spanning web
            applications, mobile apps, enterprise software, and more. Each
            project showcases our expertise in delivering high-quality,
            user-centered solutions.
          </Typography>
        </div>

        {/* Filter Section */}
        <div
          style={{
            marginBottom: theme.spacing.l,
            padding: theme.spacing.m,
            backgroundColor: theme.palette.neutralLighterAlt,
            borderRadius: theme.effects.roundedCorner4,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: orientation === 'portrait' ? 'column' : 'row',
              gap: theme.spacing.m,
              marginBottom: hasActiveFilters ? theme.spacing.m : 0,
            }}
          >
            {/* Tag Filter */}
            <div style={{ flex: 1 }}>
              <Dropdown
                placeholder='Filter by tags'
                multiSelect
                options={allTags.map((tag) => ({ key: tag, text: tag }))}
                selectedKeys={selectedTags}
                onChange={handleTagChange}
                styles={{
                  dropdown: {
                    backgroundColor: theme.palette.white,
                    border: `1px solid ${theme.palette.neutralLight}`,
                    borderRadius: theme.effects.roundedCorner4,
                  },
                  title: {
                    backgroundColor: 'transparent',
                    borderColor: theme.palette.neutralLight,
                    color: theme.palette.neutralPrimary,
                  },
                }}
              />
            </div>

            {/* Technology Filter */}
            <div style={{ flex: 1 }}>
              <Dropdown
                placeholder='Filter by technology'
                multiSelect
                options={allTechnologies.map((tech) => ({
                  key: tech,
                  text: tech,
                }))}
                selectedKeys={selectedTechnologies}
                onChange={handleTechnologyChange}
                styles={{
                  dropdown: {
                    backgroundColor: theme.palette.white,
                    border: `1px solid ${theme.palette.neutralLight}`,
                    borderRadius: theme.effects.roundedCorner4,
                  },
                  title: {
                    backgroundColor: 'transparent',
                    borderColor: theme.palette.neutralLight,
                    color: theme.palette.neutralPrimary,
                  },
                }}
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={clearFilters}
                style={{
                  padding: `${theme.spacing.s2} ${theme.spacing.m}`,
                  backgroundColor: 'transparent',
                  color: theme.palette.themePrimary,
                  border: `1px solid ${theme.palette.themePrimary}`,
                  borderRadius: theme.effects.roundedCorner4,
                  fontSize: theme.fonts.small.fontSize,
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
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Portfolio Cards */}
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
              No projects found
            </Typography>
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralTertiary }}
            >
              {hasActiveFilters
                ? 'Try adjusting your filters to see more projects.'
                : 'Check back soon for new projects.'}
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
            Let&apos;s Build Something Amazing Together
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
            Have a project in mind? We&apos;d love to hear about it and explore
            how we can bring your vision to life.
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
              onClick={() => router.push('/contact')}
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
              Get in Touch
            </button>
            <button
              onClick={() => router.push('/services')}
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
              View Our Services
            </button>
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
