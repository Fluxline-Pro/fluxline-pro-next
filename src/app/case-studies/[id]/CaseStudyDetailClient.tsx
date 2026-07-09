'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { CaseStudy } from '../types';

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
}

/**
 * Client component for Case Study Detail Page
 * Uses UnifiedContentDetail for consistent styling
 */
export default function CaseStudyDetailClient({
  caseStudy,
}: CaseStudyDetailClientProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const orientationHook = useDeviceOrientation();
  const orientation = isMounted ? orientationHook : 'landscape';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile =
    orientation === 'portrait' || orientation === 'tablet-portrait';

  // Build key metrics section
  const metricsSection = (
    <div
      style={{
        padding: 20,
        backgroundColor: 'var(--fx-surface-card)',
        borderRadius: 8,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          alignItems: 'center',
        }}
      >
        {caseStudy.metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              textAlign: 'center',
              padding: 12,
            }}
          >
            <h1
              style={{
                color: 'var(--fx-accent)',
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: 4,
                fontFamily: 'var(--fx-font)',
              }}
            >
              {metric.value}
            </h1>
            <h4
              style={{
                color: 'var(--fx-text-heading)',
                marginBottom: 4,
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'var(--fx-font)',
              }}
            >
              {metric.label}
            </h4>
            {metric.description && (
              <p
                style={{
                  color: 'var(--fx-text-body)',
                  fontSize: 14,
                  fontFamily: 'var(--fx-font)',
                  margin: 0,
                }}
              >
                {metric.description}
              </p>
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
        padding: 32,
        backgroundColor: 'var(--fx-surface-card)',
        borderLeft: '4px solid var(--fx-accent)',
        borderRadius: 4,
      }}
    >
      <p
        style={{
          color: 'var(--fx-text-heading)',
          fontSize: '1.25rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          marginBottom: 12,
          fontFamily: 'var(--fx-font)',
        }}
      >
        {`"${caseStudy.testimonial.quote}"`}
      </p>
      <p
        style={{
          color: 'var(--fx-text-body)',
          fontSize: 16,
          fontFamily: 'var(--fx-font)',
          margin: 0,
        }}
      >
        <strong>{caseStudy.testimonial.author}</strong>
        <br />
        {caseStudy.testimonial.role}
      </p>
    </div>
  ) : null;

  const config: UnifiedContentDetailConfig = {
    title: caseStudy.title,
    content: caseStudy.content || '', // Use markdown content from file
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
          gallery: caseStudy.gallery, // Pass gallery array
        }
      : undefined,
    authorInfo: undefined, // Case studies don't have authors
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
    sectionsPosition: 'before', // Show testimonial and metrics before body content
    generatedWithAI: caseStudy.generatedWithAI,
    sections: [
      ...(testimonialSection
        ? [
            {
              title: 'Client Testimonial',
              content: testimonialSection,
            },
          ]
        : []),
      {
        title: 'Key Results',
        content: metricsSection,
      },
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
