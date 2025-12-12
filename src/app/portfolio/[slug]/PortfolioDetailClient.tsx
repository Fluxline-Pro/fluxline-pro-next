'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { ContentNotFound } from '@/components/ContentNotFound';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { PortfolioProject } from '../types';

interface PortfolioDetailClientProps {
  project: PortfolioProject;
}

/**
 * Portfolio Detail Client Component
 * Renders the full portfolio project page using UnifiedContentDetail
 */
export default function PortfolioDetailClient({
  project,
}: PortfolioDetailClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();

  if (!project) {
    return (
      <ContentNotFound
        title='Project Not Found'
        message="The portfolio project you're looking for doesn't exist."
        backButton={{
          label: 'Back to Portfolio',
          url: '/portfolio',
        }}
      />
    );
  }

  const handleTagClick = (tag: string) => {
    router.push(`/portfolio/tag/${encodeURIComponent(tag)}`);
  };

  const handleTechnologyClick = (technology: string) => {
    router.push(`/portfolio/technology/${encodeURIComponent(technology)}`);
  };

  const config: UnifiedContentDetailConfig = {
    title: project.title,
    content: project.content,
    contentType: 'markdown',
    excerpt: project.longDescription || project.shortDescription,
    backLink: {
      url: '/portfolio',
      label: 'Back to Portfolio',
    },
    imageConfig: project.featuredImage
      ? {
          source: project.featuredImage.url,
          alt: project.featuredImage.alt,
          title: project.title,
          showTitle: false,
          gallery: project.gallery, // Pass gallery array
        }
      : undefined,
    metadata: [
      { label: 'Role', value: project.role },
      ...(project.client ? [{ label: 'Client', value: project.client }] : []),
      ...(project.projectDate
        ? [{ label: 'Timeline', value: project.projectDate }]
        : []),
    ],
    badges: [
      {
        label: project.category,
        variant: 'primary' as const,
      },
      ...project.tags.map((tag) => ({
        label: tag,
        variant: 'secondary' as const,
        onClick: () => handleTagClick(tag),
      })),
      ...project.technologies.map((tech) => ({
        label: tech,
        variant: 'tertiary' as const,
        onClick: () => handleTechnologyClick(tech),
      })),
    ],
    externalLinks: [
      ...(project.githubUrl
        ? [
            {
              label: 'View on GitHub',
              url: project.githubUrl,
              variant: 'github' as const,
            },
          ]
        : []),
      ...(project.liveUrl
        ? [
            {
              label: 'View Live Project',
              url: project.liveUrl,
              variant: 'live' as const,
            },
          ]
        : []),
    ],
    showGallerySection: project.gallery && project.gallery.length > 0,
    sectionsPosition: 'before', // Show gallery at top of page
    cta: {
      title: 'Interested in Working Together?',
      description: "Let's discuss how we can help bring your project to life.",
      buttons: [
        {
          label: 'Get in Touch',
          onClick: () => router.push('/contact'),
          variant: 'primary',
        },
      ],
    },
  };

  return <UnifiedContentDetail config={config} />;
}
