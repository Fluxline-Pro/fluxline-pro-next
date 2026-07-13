'use client';

import React from 'react';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
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
  allTechnologies,
}: PortfolioClientWrapperProps) {
  const [selectedTechnology, setSelectedTechnology] = React.useState<
    string | undefined
  >();

  // Filter projects based on selected technology
  const filteredProjects = React.useMemo(() => {
    if (!selectedTechnology) return projects;
    return projects.filter((project) =>
      project.technologies.some((tech) => tech === selectedTechnology)
    );
  }, [projects, selectedTechnology]);

  // Transform portfolio projects to card format
  const cards = React.useMemo(() => {
    return filteredProjects.map((project) => ({
      id: project.slug,
      title: project.title,
      description: project.shortDescription,
      imageUrl: project.featuredImage.url,
      imageAlt: project.featuredImage.alt,
      imageText: `${project.role}${project.client ? ` • ${project.client}` : ''}`,
      date: project.publishedDate,
      category: project.technologies[0],
    }));
  }, [filteredProjects]);

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Technology',
      options: [
        { key: '', text: 'All' },
        ...allTechnologies
          .filter((tech) => tech && typeof tech === 'string')
          .map((tech) => ({ key: tech, text: tech })),
      ],
      value: selectedTechnology,
      onChange: setSelectedTechnology,
    },
  ];

  return (
    <ContentListingPage
      title="Work & Projects"
      kicker="Portfolio"
      subhead="Real systems built for real organizations."
      description="Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more."
      basePath="/portfolio"
      cards={cards}
      filters={filters}
      emptyStateTitle="No projects found"
      emptyStateMessage="Try adjusting your filters to see more projects."
      onClearFilters={() => setSelectedTechnology(undefined)}
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
