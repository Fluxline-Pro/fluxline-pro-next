'use client';

import React from 'react';
import { ContentListingPage, FilterConfig } from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { PortfolioProject } from './types';

interface PortfolioClientWrapperProps {
  projects: PortfolioProject[];
  allTags: string[];
  allTechnologies: string[];
}

/**
 * Portfolio Client Wrapper
 * Handles filtering logic and transforms portfolio data for the unified ContentListingPage
 */
export function PortfolioClientWrapper({
  projects,
  allTags,
  allTechnologies,
}: PortfolioClientWrapperProps) {
  // Filter state
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = React.useState<
    string[]
  >([]);

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
        project.technologies.some((tech) => selectedTechnologies.includes(tech))
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

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'multi',
      label: 'Tags',
      placeholder: 'All Tags',
      options: allTags.map((tag) => ({ key: tag, text: tag })),
      selectedKeys: selectedTags,
      onChange: setSelectedTags,
    },
    {
      type: 'multi',
      label: 'Technologies',
      placeholder: 'All Technologies',
      options: allTechnologies.map((tech) => ({ key: tech, text: tech })),
      selectedKeys: selectedTechnologies,
      onChange: setSelectedTechnologies,
    },
  ];

  // Build results message
  const resultsMessage = `Showing ${filteredProjects.length} ${filteredProjects.length === 1 ? 'project' : 'projects'}${selectedTags.length > 0 ? ` with tags: ${selectedTags.join(', ')}` : ''}${selectedTechnologies.length > 0 ? ` using: ${selectedTechnologies.join(', ')}` : ''}`;

  const hasActiveFilters =
    selectedTags.length > 0 || selectedTechnologies.length > 0;

  return (
    <ContentListingPage
      title='Portfolio'
      iconName={getIconForPath('/portfolio') || 'FolderQuery'}
      description='Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more. Each project demonstrates our commitment to excellence and innovation.'
      basePath='/portfolio'
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No projects found'
      emptyStateMessage={
        hasActiveFilters
          ? 'Try adjusting your filters to see more projects.'
          : 'Check back soon for new projects.'
      }
      ctaSection={{
        title: "Let's Build Something Amazing Together",
        description:
          "Have a project in mind? We'd love to hear about it and explore how we can bring your vision to life.",
        buttons: [
          {
            label: 'Get in Touch',
            variant: 'primary',
            path: '/contact',
          },
          {
            label: 'View Our Services',
            variant: 'secondary',
            path: '/services',
          },
        ],
      }}
    />
  );
}
