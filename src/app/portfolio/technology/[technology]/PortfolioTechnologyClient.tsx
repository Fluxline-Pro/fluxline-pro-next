'use client';

import React from 'react';
import { ContentListingPage } from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import type { PortfolioProject } from '../../types';

interface PortfolioTechnologyClientProps {
  technology: string;
  projects: PortfolioProject[];
}

/**
 * Portfolio Technology Filter Client Component
 * Displays portfolio projects filtered by a specific technology using ContentListingPage
 */
export function PortfolioTechnologyClient({
  technology,
  projects,
}: PortfolioTechnologyClientProps) {
  // Transform projects to cards
  const cards = React.useMemo(() => {
    return projects.map((project) => ({
      id: project.slug,
      title: project.title,
      description: project.shortDescription,
      imageUrl: project.featuredImage.url,
      imageAlt: project.featuredImage.alt,
      imageText: `${project.role}${project.client ? ` • ${project.client}` : ''}`,
    }));
  }, [projects]);

  // Build results message
  const resultsMessage = `Showing ${projects.length} ${projects.length === 1 ? 'project' : 'projects'} using ${technology}`;

  return (
    <ContentListingPage
      title={`Projects Using: ${technology}`}
      iconName={getIconForPath('/portfolio') || 'FolderQuery'}
      description={`Browse all portfolio projects built with ${technology}.`}
      basePath='/portfolio'
      cards={cards}
      filters={[]}
      resultsMessage={resultsMessage}
      emptyStateTitle='No projects found'
      emptyStateMessage='No projects use this technology.'
    />
  );
}
