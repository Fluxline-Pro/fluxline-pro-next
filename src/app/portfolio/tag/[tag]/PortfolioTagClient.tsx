'use client';

import React from 'react';
import { ContentListingPage } from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import type { PortfolioProject } from '../../types';

interface PortfolioTagClientProps {
  tag: string;
  projects: PortfolioProject[];
}

/**
 * Portfolio Tag Filter Client Component
 * Displays portfolio projects filtered by a specific tag using ContentListingPage
 */
export function PortfolioTagClient({ tag, projects }: PortfolioTagClientProps) {
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
  const resultsMessage = `Showing ${projects.length} ${projects.length === 1 ? 'project' : 'projects'} tagged with ${tag}`;

  return (
    <ContentListingPage
      title={`Projects Tagged: ${tag}`}
      iconName={getIconForPath('/portfolio') || 'FolderQuery'}
      description={`Browse all portfolio projects tagged with ${tag}.`}
      basePath='/portfolio'
      cards={cards}
      filters={[]}
      resultsMessage={resultsMessage}
      emptyStateTitle='No projects found'
      emptyStateMessage='No projects match this tag.'
    />
  );
}
