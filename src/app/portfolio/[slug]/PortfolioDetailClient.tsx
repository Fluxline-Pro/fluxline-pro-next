'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
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
      <UnifiedPageWrapper layoutType='responsive-grid'>
        <div
          style={{
            padding: theme.spacing.xl,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h1'
            style={{ color: theme.palette.themePrimary }}
          >
            Project Not Found
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginTop: theme.spacing.m,
            }}
          >
            The portfolio project you&apos;re looking for doesn&apos;t exist.
          </Typography>
          <button
            onClick={() => router.push('/portfolio')}
            style={{
              marginTop: theme.spacing.l,
              padding: `${theme.spacing.s1} ${theme.spacing.l}`,
              backgroundColor: theme.palette.themePrimary,
              color: theme.palette.white,
              border: 'none',
              borderRadius: theme.effects.roundedCorner4,
              fontSize: theme.fonts.medium.fontSize,
              fontWeight: theme.typography.fontWeights.semiBold,
              cursor: 'pointer',
            }}
          >
            Back to Portfolio
          </button>
        </div>
      </UnifiedPageWrapper>
    );
  }

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
      })),
      ...project.technologies.map((tech) => ({
        label: tech,
        variant: 'tertiary' as const,
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
    sections:
      project.gallery && project.gallery.length > 0
        ? [
            {
              title: 'Project Gallery',
              content: (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: theme.spacing.l,
                  }}
                >
                  {project.gallery.map((image, index) => (
                    <div key={index}>
                      <div
                        style={{
                          width: '100%',
                          height: '200px',
                          backgroundColor: theme.palette.neutralLight,
                          borderRadius: theme.effects.roundedCorner4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: theme.spacing.s1,
                        }}
                      >
                        <Typography
                          variant='p'
                          style={{ color: theme.palette.neutralTertiary }}
                        >
                          {image.alt}
                        </Typography>
                      </div>
                      {image.caption && (
                        <Typography
                          variant='p'
                          style={{
                            color: theme.palette.neutralSecondary,
                            fontSize: theme.fonts.small.fontSize,
                            fontStyle: 'italic',
                          }}
                        >
                          {image.caption}
                        </Typography>
                      )}
                    </div>
                  ))}
                </div>
              ),
            },
          ]
        : undefined,
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
