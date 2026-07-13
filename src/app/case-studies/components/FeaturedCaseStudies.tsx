'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormButton } from '@/theme/components/form';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { useHoverEffects } from '@/hooks/useHoverEffects';
import { getFeaturedCaseStudies } from '../caseStudiesData';

/**
 * Featured Case Studies Component
 * Displays top featured case studies in a prominent layout
 *
 * Features:
 * - Showcases 2-3 featured case studies
 * - Responsive grid layout
 * - Theme-aware styling via DSM tokens
 * - Click to navigate to detail view
 * - Used on home page and services page
 */
export default function FeaturedCaseStudies() {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const orientationHook = useDeviceOrientation();
  const orientation = isMounted ? orientationHook : 'landscape';
  const cardHoverEffects = useHoverEffects({
    type: 'card',
    hoverBorderColor: 'var(--fx-accent)',
    defaultBorderColor: 'var(--fx-border)',
  });
  const buttonHoverEffects = useHoverEffects({
    type: 'button',
    hoverBgColor: 'var(--fx-accent)',
    defaultBgColor: 'transparent',
    hoverTextColor: 'var(--fx-text-bright)',
    defaultTextColor: 'var(--fx-accent)',
    enableTransform: false,
  });

  const featuredStudies = React.useMemo(() => getFeaturedCaseStudies(), []);
  const isMobile =
    orientation === 'portrait' || orientation === 'tablet-portrait';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (featuredStudies.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        padding: isMobile ? '16px' : '32px',
        width: '100%',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'var(--fx-h2-size)',
            fontWeight: 700,
            color: 'var(--fx-accent)',
            marginBottom: '16px',
            marginTop: 0,
          }}
        >
          Featured Success Stories
        </h2>
        <p
          style={{
            fontSize: 'var(--fx-body-size)',
            color: 'var(--fx-text-muted)',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          Discover how we&apos;ve helped organizations achieve transformative
          results through strategic partnerships and innovative solutions.
        </p>
      </div>

      {/* Featured Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {featuredStudies.map((study) => (
          <Link
            key={study.id}
            href={`/case-studies/${study.id}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              backgroundColor: 'var(--fx-surface-card)',
              borderRadius: '6px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid var(--fx-border)',
            }}
            {...cardHoverEffects}
          >
            {/* Card Header */}
            <div
              style={{
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--fx-h3-size)',
                  fontWeight: 700,
                  color: 'var(--fx-accent)',
                  marginBottom: '8px',
                  marginTop: 0,
                }}
              >
                {study.title}
              </h3>
              <p
                style={{
                  color: 'var(--fx-text-muted)',
                  fontSize: '0.875rem',
                  margin: 0,
                }}
              >
                {study.client} • {study.industry}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: 'var(--fx-body-size)',
                marginBottom: '16px',
                marginTop: 0,
                lineHeight: 1.7,
              }}
            >
              {study.description}
            </p>

            {/* Key Metrics Preview */}
            {study.metrics.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  marginBottom: '16px',
                  padding: '16px',
                  backgroundColor: 'var(--fx-surface-card)',
                  borderRadius: '4px',
                }}
              >
                {study.metrics.slice(0, 2).map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      flex: '1 1 auto',
                      minWidth: '120px',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: 'var(--fx-accent)',
                        marginBottom: '4px',
                        marginTop: 0,
                      }}
                    >
                      {metric.value}
                    </h2>
                    <p
                      style={{
                        color: 'var(--fx-text-heading)',
                        fontSize: '0.875rem',
                        margin: 0,
                      }}
                    >
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Services Tags */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                flexWrap: 'wrap',
                marginBottom: '16px',
              }}
            >
              {study.services.slice(0, 3).map((service) => (
                <span
                  key={service}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: 'var(--fx-surface-card)',
                    color: 'var(--fx-accent)',
                    borderRadius: '4px',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Read More Link */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--fx-accent)',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              <span>Read Case Study</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* View All CTA */}
      <div style={{ textAlign: 'center' }}>
        <FormButton
          variant='secondary'
          onClick={() => router.push('/case-studies')}
          size='large'
        >
          View All Case Studies
        </FormButton>
      </div>
    </div>
  );
}
