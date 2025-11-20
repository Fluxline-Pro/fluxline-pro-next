'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { Icon } from '@fluentui/react';
import { CaseStudy } from '../types';

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
}

/**
 * Client component for Case Study Detail Page
 * Handles interactive elements and theme-aware rendering
 */
export default function CaseStudyDetailClient({
  caseStudy,
}: CaseStudyDetailClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  const isMobile =
    orientation === 'portrait' || orientation === 'tablet-portrait';

  return (
    <UnifiedPageWrapper layoutType='viewport-grid'>
      <div
        style={{
          padding: isMobile ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
        }}
      >
        {/* Back Navigation */}
        <button
          onClick={() => router.push('/case-studies')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.s2,
            padding: `${theme.spacing.s2} ${theme.spacing.m}`,
            backgroundColor: 'transparent',
            color: theme.palette.themePrimary,
            border: 'none',
            borderRadius: theme.effects.roundedCorner4,
            fontSize: theme.fonts.medium.fontSize,
            cursor: 'pointer',
            marginBottom: theme.spacing.l,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.palette.themeLighterAlt;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Icon iconName='ChevronLeft' />
          Back to Case Studies
        </button>

        {/* Header Section */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <Typography
            variant='h1'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.s1,
            }}
          >
            {caseStudy.title}
          </Typography>

          <div
            style={{
              display: 'flex',
              gap: theme.spacing.m,
              flexWrap: 'wrap',
              marginBottom: theme.spacing.m,
              color: theme.palette.neutralSecondary,
              fontSize: theme.fonts.medium.fontSize,
            }}
          >
            <span>
              <strong>Client:</strong> {caseStudy.client}
            </span>
            <span>•</span>
            <span>
              <strong>Industry:</strong> {caseStudy.industry}
            </span>
            {caseStudy.projectDuration && (
              <>
                <span>•</span>
                <span>
                  <strong>Duration:</strong> {caseStudy.projectDuration}
                </span>
              </>
            )}
          </div>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {caseStudy.description}
          </Typography>
        </div>

        {/* Services and Technologies Badges */}
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.l,
            marginBottom: theme.spacing.xl,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Typography
              variant='h4'
              style={{
                color: theme.palette.neutralPrimary,
                marginBottom: theme.spacing.s1,
              }}
            >
              Services
            </Typography>
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.s2,
                flexWrap: 'wrap',
              }}
            >
              {caseStudy.services.map((service) => (
                <span
                  key={service}
                  style={{
                    padding: `${theme.spacing.s2} ${theme.spacing.s1}`,
                    backgroundColor: theme.palette.themeLighterAlt,
                    color: theme.palette.themePrimary,
                    borderRadius: theme.effects.roundedCorner4,
                    fontSize: theme.fonts.small.fontSize,
                    fontWeight: theme.typography.fontWeights.semiBold,
                    textTransform: 'capitalize',
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Typography
              variant='h4'
              style={{
                color: theme.palette.neutralPrimary,
                marginBottom: theme.spacing.s1,
              }}
            >
              Technologies
            </Typography>
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.s2,
                flexWrap: 'wrap',
              }}
            >
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: `${theme.spacing.s2} ${theme.spacing.s1}`,
                    backgroundColor: theme.palette.neutralLighter,
                    color: theme.palette.neutralPrimary,
                    borderRadius: theme.effects.roundedCorner4,
                    fontSize: theme.fonts.small.fontSize,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div
          style={{
            marginBottom: theme.spacing.xl,
            padding: theme.spacing.l,
            backgroundColor: theme.palette.neutralLighterAlt,
            borderRadius: theme.effects.roundedCorner6,
          }}
        >
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.l,
            }}
          >
            Key Results
          </Typography>
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
                    fontWeight: theme.typography.fontWeights.bold,
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

        {/* Challenge Section */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            The Challenge
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {caseStudy.challenge}
          </Typography>
        </div>

        {/* Solution Section */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            Our Solution
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {caseStudy.solution}
          </Typography>
        </div>

        {/* Results Section */}
        <div style={{ marginBottom: theme.spacing.xl }}>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            The Results
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {caseStudy.results}
          </Typography>
        </div>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <div
            style={{
              marginBottom: theme.spacing.xl,
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
                lineHeight: theme.typography.lineHeights.relaxed,
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
        )}

        {/* Call to Action Section */}
        <div
          style={{
            marginTop: theme.spacing.xxl,
            padding: theme.spacing.xl,
            backgroundColor: theme.palette.neutralLighterAlt,
            borderRadius: theme.effects.roundedCorner6,
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
            Ready for Similar Results?
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Let&apos;s discuss how we can help you achieve your transformation
            goals.
          </Typography>
          <div
            style={{
              display: 'flex',
              gap: theme.spacing.m,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => router.push('/services')}
              style={{
                padding: `${theme.spacing.s1} ${theme.spacing.l}`,
                backgroundColor: theme.palette.themePrimary,
                color: theme.palette.white,
                border: 'none',
                borderRadius: theme.effects.roundedCorner4,
                fontSize: theme.fonts.mediumPlus.fontSize,
                fontWeight: theme.typography.fontWeights.semiBold,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.palette.themeDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.palette.themePrimary;
              }}
            >
              View Our Services
            </button>
            <button
              onClick={() => router.push('/contact')}
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
                e.currentTarget.style.backgroundColor =
                  theme.palette.themeLighterAlt;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
