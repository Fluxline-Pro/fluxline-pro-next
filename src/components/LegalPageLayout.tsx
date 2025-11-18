'use client';

import React from 'react';
import { UnifiedMarkdownRenderer } from '../utils/markdownRenderer';
import { Typography } from '../theme/components/typography';
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { typography, spacing } from '../theme/theme';

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  content: string;
  lastUpdated?: string;
}

/**
 * Legal Page Layout Component
 * 
 * Provides consistent layout and styling for all legal/reference pages
 * - Displays title and optional subtitle
 * - Renders markdown content with theme-aware styling
 * - Shows last updated date
 * - Includes copyright footer
 */
export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  subtitle,
  content,
  lastUpdated,
}) => {
  const { theme } = useAppTheme();

  const currentYear = new Date().getFullYear();

  return (
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
          marginBottom: subtitle ? spacing.s : spacing.l,
        }}
      >
        {title}
      </Typography>

      {/* Subtitle (if provided) */}
      {subtitle && (
        <Typography
          variant="h3"
          style={{
            ...typography.fonts.h3,
            color: theme.palette.neutralSecondary,
            marginBottom: spacing.l,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Last Updated (if provided) */}
      {lastUpdated && (
        <Typography
          variant="p"
          style={{
            ...typography.fonts.bodySmall,
            color: theme.palette.neutralTertiary,
            marginBottom: spacing.xl,
            fontStyle: 'italic',
          }}
        >
          Last Updated: {lastUpdated}
        </Typography>
      )}

      {/* Main Content */}
      <div
        style={{
          marginTop: spacing.xl,
          marginBottom: spacing.xxl,
        }}
      >
        <UnifiedMarkdownRenderer content={content} />
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
  );
};

export default LegalPageLayout;
