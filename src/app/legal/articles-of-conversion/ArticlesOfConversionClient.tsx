'use client';

import React from 'react';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Typography } from '../../../theme/components/typography';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import { typography, spacing } from '../../../theme/theme';
import { FadeUp } from '@/animations/fade-animations';

export default function ArticlesOfConversionClient() {
  const { theme } = useAppTheme();
  const currentYear = new Date().getFullYear();

  // In a real implementation, you would have the actual PDF file
  // For now, we'll provide a placeholder and download link
  const pdfUrl = '/assets/legal/articles-of-conversion.pdf';

  return (
    <UnifiedPageWrapper layoutType='responsive-grid' showImageTitle={false}>
      <FadeUp duration={0.5} delay={0}>
        <div
          style={{
            padding: theme.spacing.xl,
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Hero Section */}
          <Hero
            title='Articles of Conversion'
            description='Legal Entity Conversion Documentation'
            backArrow={true}
            backArrowPath='/legal'
          />

          {/* Description */}
          <Typography
            variant='p'
            style={{
              ...typography.fonts.body,
              color: theme.semanticColors.bodyText,
              marginBottom: spacing.l,
              marginTop: spacing.xl,
            }}
          >
            The Articles of Conversion document the legal transformation of
            Fluxline Resonance Group business entity structure. This official
            filing records the conversion process and regulatory compliance.
          </Typography>

          {/* PDF Viewer Container */}
          <div
            style={{
              marginTop: spacing.xl,
              marginBottom: spacing.xl,
              border: `1px solid ${theme.palette.neutralQuaternary}`,
              borderRadius: theme.borderRadius.m,
              padding: spacing.l,
              backgroundColor: theme.palette.neutralQuaternaryAlt,
              textAlign: 'center',
            }}
          >
            <Typography
              variant='h4'
              style={{
                ...typography.fonts.h4,
                color: theme.semanticColors.bodyText,
                marginBottom: spacing.m,
              }}
            >
              PDF Document
            </Typography>

            {/* PDF Embed or Download Link */}
            <div
              style={{
                marginTop: spacing.m,
                marginBottom: spacing.m,
              }}
            >
              {/* For browsers that support PDF embedding */}
              <object
                data={pdfUrl}
                type='application/pdf'
                width='100%'
                style={{
                  minHeight: '600px',
                  border: `1px solid ${theme.palette.neutralTertiary}`,
                  borderRadius: theme.borderRadius.s,
                }}
              >
                {/* Fallback for browsers that don't support PDF embedding */}
                <div
                  style={{
                    padding: spacing.xl,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant='p'
                    style={{
                      ...typography.fonts.body,
                      color: theme.semanticColors.bodyText,
                      marginBottom: spacing.m,
                    }}
                  >
                    Your browser does not support embedded PDF viewing.
                  </Typography>
                  <a
                    href={pdfUrl}
                    download='Fluxline-Articles-of-Conversion.pdf'
                    style={{
                      display: 'inline-block',
                      padding: `${spacing.s} ${spacing.l}`,
                      backgroundColor: theme.palette.themePrimary,
                      color: theme.palette.white,
                      borderRadius: theme.borderRadius.m,
                      textDecoration: 'none',
                      fontWeight: typography.fontWeights.semiBold,
                      transition: theme.animations.transitions.button,
                    }}
                  >
                    Download PDF
                  </a>
                </div>
              </object>
            </div>

            {/* Download Button */}
            <a
              href={pdfUrl}
              download='Fluxline-Articles-of-Conversion.pdf'
              style={{
                display: 'inline-block',
                marginTop: spacing.m,
                padding: `${spacing.s} ${spacing.l}`,
                backgroundColor: theme.palette.themePrimary,
                color: theme.palette.white,
                borderRadius: theme.borderRadius.m,
                textDecoration: 'none',
                fontWeight: typography.fontWeights.semiBold,
                transition: theme.animations.transitions.button,
              }}
            >
              Download PDF
            </a>
          </div>

          {/* Copyright Footer */}
          <div
            style={{
              marginTop: theme.spacing.xxxl,
              paddingTop: theme.spacing.l,
              borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
              textAlign: 'center',
              color: theme.palette.neutralTertiary,
              fontSize: theme.fonts.small.fontSize,
            }}
          >
            <p>
              © {currentYear} Fluxline Resonance Group, LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </FadeUp>
    </UnifiedPageWrapper>
  );
}
