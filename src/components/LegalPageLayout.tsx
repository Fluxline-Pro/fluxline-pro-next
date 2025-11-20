'use client';

import React from 'react';
import Link from 'next/link';
import { UnifiedMarkdownRenderer } from '../utils/markdownRenderer';
import { Typography } from '../theme/components/typography';
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { typography, spacing } from '../theme/theme';
import { ProtectedEmail } from './ProtectedEmail';

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  content: string;
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
      {/* Back Navigation and Page Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.m,
          marginBottom: subtitle ? spacing.s : spacing.l,
        }}
      >
        <Link
          href='/legal'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: spacing.s1,
            borderRadius: '8px',
            color: theme.palette.themePrimary,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              theme.palette.neutralLighterAlt;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </Link>
        <Typography
          variant='h1'
          style={{
            ...typography.fonts.h2,
            color: theme.semanticColors.bodyText,
            fontSize: '2rem',
            fontWeight: 600,
            margin: 0,
          }}
        >
          {title}
        </Typography>
      </div>

      {/* Subtitle (if provided) */}
      {subtitle && (
        <Typography
          variant='h3'
          style={{
            ...typography.fonts.h3,
            color: theme.palette.neutralSecondary,
            marginBottom: spacing.l,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Main Content */}
      <div
        className='legal-content'
        style={{
          marginTop: spacing.xl,
          marginBottom: spacing.xxl,
        }}
      >
        <UnifiedMarkdownRenderer content={content} />
        <style jsx>{`
          :global(.legal-content h1:first-child) {
            display: none;
          }
          :global(.legal-content h2) {
            font-size: 2rem !important;
            font-weight: 600 !important;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
          }
        `}</style>
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
          variant='p'
          style={{
            ...typography.fonts.bodySmall,
            color: theme.palette.neutralTertiary,
            textAlign: 'center',
          }}
        >
          © {currentYear} Fluxline Professional Services. All rights reserved.
        </Typography>
        <Typography
          variant='p'
          style={{
            ...typography.fonts.bodySmall,
            color: theme.palette.neutralTertiary,
            textAlign: 'center',
            marginTop: spacing.s,
          }}
        >
          Questions? Contact us at{' '}
          <ProtectedEmail
            username='support'
            domain='fluxline.pro'
            style={{
              color: theme.semanticColors.link,
              textDecoration: 'underline',
            }}
          >
            support [at] fluxline.pro
          </ProtectedEmail>
        </Typography>
      </footer>
    </div>
  );
};

export default LegalPageLayout;
