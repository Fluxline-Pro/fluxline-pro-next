'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { getFeaturedCaseStudies } from '../caseStudiesData';
import { Icon } from '@fluentui/react';

/**
 * Featured Case Studies Component
 * Displays top featured case studies in a prominent layout
 *
 * Features:
 * - Showcases 2-3 featured case studies
 * - Responsive grid layout
 * - Theme-aware styling
 * - Click to navigate to detail view
 * - Used on home page and services page
 */
export default function FeaturedCaseStudies() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  const featuredStudies = React.useMemo(() => getFeaturedCaseStudies(), []);
  const isMobile =
    orientation === 'portrait' || orientation === 'tablet-portrait';

  if (featuredStudies.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        padding: isMobile ? theme.spacing.m : theme.spacing.xl,
        width: '100%',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          marginBottom: theme.spacing.xl,
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
          Featured Success Stories
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Discover how we&apos;ve helped organizations achieve transformative
          results through strategic partnerships and innovative solutions.
        </Typography>
      </div>

      {/* Featured Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing.l,
          marginBottom: theme.spacing.xl,
        }}
      >
        {featuredStudies.map((study) => (
          <Link
            key={study.id}
            href={`/case-studies/${study.id}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              backgroundColor: theme.palette.neutralLighterAlt,
              borderRadius: theme.effects.roundedCorner6,
              padding: theme.spacing.l,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: `1px solid ${theme.palette.neutralLight}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = theme.effects.elevation8;
              e.currentTarget.style.borderColor = theme.palette.themePrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = theme.palette.neutralLight;
            }}
          >
            {/* Card Header */}
            <div
              style={{
                marginBottom: theme.spacing.m,
              }}
            >
              <Typography
                variant='h3'
                style={{
                  color: theme.palette.themePrimary,
                  marginBottom: theme.spacing.s1,
                }}
              >
                {study.title}
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  fontSize: theme.fonts.small.fontSize,
                }}
              >
                {study.client} • {study.industry}
              </Typography>
            </div>

            {/* Description */}
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                marginBottom: theme.spacing.m,
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {study.description}
            </Typography>

            {/* Key Metrics Preview */}
            {study.metrics.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing.m,
                  flexWrap: 'wrap',
                  marginBottom: theme.spacing.m,
                  padding: theme.spacing.m,
                  backgroundColor: theme.palette.neutralLighter,
                  borderRadius: theme.effects.roundedCorner4,
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
                    <Typography
                      variant='h2'
                      style={{
                        color: theme.palette.themePrimary,
                        fontSize: '1.75rem',
                        fontWeight: theme.typography.fontWeights.bold,
                        marginBottom: theme.spacing.s2,
                      }}
                    >
                      {metric.value}
                    </Typography>
                    <Typography
                      variant='p'
                      style={{
                        color: theme.palette.neutralPrimary,
                        fontSize: theme.fonts.small.fontSize,
                      }}
                    >
                      {metric.label}
                    </Typography>
                  </div>
                ))}
              </div>
            )}

            {/* Services Tags */}
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.s2,
                flexWrap: 'wrap',
                marginBottom: theme.spacing.m,
              }}
            >
              {study.services.slice(0, 3).map((service) => (
                <span
                  key={service}
                  style={{
                    padding: `${theme.spacing.s2} ${theme.spacing.s1}`,
                    backgroundColor: theme.palette.themeLighterAlt,
                    color: theme.palette.themePrimary,
                    borderRadius: theme.effects.roundedCorner4,
                    fontSize: theme.fonts.tiny.fontSize,
                    fontWeight: theme.typography.fontWeights.semiBold,
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
                gap: theme.spacing.s2,
                color: theme.palette.themePrimary,
                fontSize: theme.fonts.medium.fontSize,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              <span>Read Case Study</span>
              <Icon iconName='ChevronRight' />
            </div>
          </Link>
        ))}
      </div>

      {/* View All CTA */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => router.push('/case-studies')}
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
            e.currentTarget.style.backgroundColor = theme.palette.themePrimary;
            e.currentTarget.style.color = theme.palette.white;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.palette.themePrimary;
          }}
        >
          View All Case Studies
        </button>
      </div>
    </div>
  );
}
