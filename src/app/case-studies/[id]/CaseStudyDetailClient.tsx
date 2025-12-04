'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { CaseStudy } from '../types';
import type { SocialLinksData } from '@/app/about/components/SocialLinks';

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
}

// Terence Waters' social links
const TERENCE_SOCIAL_LINKS: SocialLinksData = {
  linkedin: 'https://linkedin.com/in/terencewaters',
  instagram: 'https://instagram.com/aplusinflux',
  github: 'https://github.com/aplusandminus',
  email: 'terence@fluxline.pro',
};

/**
 * Client component for Case Study Detail Page
 * Uses UnifiedContentDetail for consistent styling
 */
export default function CaseStudyDetailClient({
  caseStudy,
}: CaseStudyDetailClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  const isMobile =
    orientation === 'portrait' || orientation === 'tablet-portrait';

  // Build key metrics section
  const metricsSection = (
    <div
      style={{
        padding: theme.spacing.l,
        backgroundColor: theme.palette.neutralLighterAlt,
        borderRadius: theme.effects.roundedCorner6,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: theme.spacing.l,
        }}
      >
        {caseStudy.metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              textAlign: 'center',
              padding: theme.spacing.m,
            }}
          >
            <Typography
              variant='h1'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: theme.spacing.s2,
              }}
            >
              {metric.value}
            </Typography>
            <Typography
              variant='h4'
              style={{
                color: theme.palette.neutralPrimary,
                marginBottom: theme.spacing.s2,
              }}
            >
              {metric.label}
            </Typography>
            {metric.description && (
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  fontSize: theme.fonts.small.fontSize,
                }}
              >
                {metric.description}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Build testimonial section if available
  const testimonialSection = caseStudy.testimonial ? (
    <div
      style={{
        padding: theme.spacing.xl,
        backgroundColor: theme.palette.themeLighterAlt,
        borderLeft: `4px solid ${theme.palette.themePrimary}`,
        borderRadius: theme.effects.roundedCorner4,
      }}
    >
      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralPrimary,
          fontSize: '1.25rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          marginBottom: theme.spacing.m,
        }}
      >
        {`"${caseStudy.testimonial.quote}"`}
      </Typography>
      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: theme.fonts.medium.fontSize,
        }}
      >
        <strong>{caseStudy.testimonial.author}</strong>
        <br />
        {caseStudy.testimonial.role}
      </Typography>
    </div>
  ) : null;

  const config: UnifiedContentDetailConfig = {
    title: caseStudy.title,
    content: '', // Case studies don't have markdown content - using sections instead
    contentType: 'markdown',
    excerpt: caseStudy.description,
    backLink: {
      url: '/case-studies',
      label: 'Back to Case Studies',
    },
    imageConfig: caseStudy.imageUrl
      ? {
          source: caseStudy.imageUrl,
          alt: caseStudy.imageAlt || caseStudy.title,
          title: caseStudy.title,
          showTitle: false,
        }
      : undefined,
    authorInfo: {
      name: caseStudy.author,
      publishDate: caseStudy.date,
      socialLinks:
        caseStudy.author === 'Terence Waters'
          ? TERENCE_SOCIAL_LINKS
          : undefined,
    },
    metadata: [
      { label: 'Client', value: caseStudy.client },
      { label: 'Industry', value: caseStudy.industry },
      ...(caseStudy.projectDuration
        ? [{ label: 'Duration', value: caseStudy.projectDuration }]
        : []),
    ],
    badges: [
      ...caseStudy.services.map((service) => ({
        label: service,
        variant: 'primary' as const,
      })),
      ...caseStudy.technologies.map((tech) => ({
        label: tech,
        variant: 'secondary' as const,
      })),
    ],
    sections: [
      {
        title: 'Key Results',
        content: metricsSection,
      },
      {
        title: 'The Challenge',
        content: caseStudy.challenge,
      },
      {
        title: 'Our Solution',
        content: caseStudy.solution,
      },
      {
        title: 'The Results',
        content: caseStudy.results,
      },
      ...(testimonialSection
        ? [
            {
              title: 'Client Testimonial',
              content: testimonialSection,
            },
          ]
        : []),
    ],
    cta: {
      title: 'Ready for Similar Results?',
      description:
        "Let's discuss how we can help you achieve your transformation goals.",
      buttons: [
        {
          label: 'View Our Services',
          onClick: () => router.push('/services'),
          variant: 'primary',
        },
        {
          label: 'Start Your Transformation',
          onClick: () => router.push('/contact'),
          variant: 'secondary',
        },
      ],
    },
  };

  return <UnifiedContentDetail config={config} />;
}
