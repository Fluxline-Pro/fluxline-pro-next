'use client';

import React from 'react';
import { PageWrapper } from '../../../components/PageWrapper';
import { Typography } from '../../../theme/components/typography';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import { typography, spacing } from '../../../theme/theme';

export default function ArticlesOfConversionPage() {
  const { theme } = useAppTheme();
  const currentYear = new Date().getFullYear();

  // In a real implementation, you would have the actual PDF file
  // For now, we'll provide a placeholder and download link
  const pdfUrl = '/assets/legal/articles-of-conversion.pdf';

  return (
    <PageWrapper>
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: spacing.xl,
          color: theme.semanticColors.bodyText,
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h1"
          style={{
            ...typography.fonts.h1,
            color: theme.semanticColors.bodyText,
            marginBottom: spacing.s,
          }}
        >
          Articles of Conversion
        </Typography>

        <Typography
          variant="h3"
          style={{
            ...typography.fonts.h3,
            color: theme.palette.neutralSecondary,
            marginBottom: spacing.l,
          }}
        >
          Legal Entity Conversion Documentation
        </Typography>

        {/* Description */}
        <Typography
          variant="p"
          style={{
            ...typography.fonts.body,
            color: theme.semanticColors.bodyText,
            marginBottom: spacing.l,
          }}
        >
          The Articles of Conversion document the legal transformation of
          Fluxline Professional Services business entity structure. This
          official filing records the conversion process and regulatory
          compliance.
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
            variant="h4"
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
              type="application/pdf"
              width="100%"
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
                  variant="p"
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
                  download="Fluxline-Articles-of-Conversion.pdf"
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
            download="Fluxline-Articles-of-Conversion.pdf"
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
        <footer
          style={{
            marginTop: spacing.xxxl,
            paddingTop: spacing.l,
            borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
          }}
        >
          <Typography
            variant="p"
            style={{
              ...typography.fonts.bodySmall,
              color: theme.palette.neutralTertiary,
              textAlign: 'center',
            }}
          >
            © {currentYear} Fluxline Professional Services. All rights reserved.
          </Typography>
          <Typography
            variant="p"
            style={{
              ...typography.fonts.bodySmall,
              color: theme.palette.neutralTertiary,
              textAlign: 'center',
              marginTop: spacing.s,
            }}
          >
            Questions? Contact us at{' '}
            <a
              href="mailto:contact@fluxline.pro"
              style={{
                color: theme.semanticColors.link,
                textDecoration: 'underline',
              }}
            >
              contact@fluxline.pro
            </a>
          </Typography>
        </footer>
      </div>
    </PageWrapper>
  );
}
