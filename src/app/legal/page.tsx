'use client';

import React from 'react';
import Link from 'next/link';
import { UnifiedPageWrapper } from '../../components/UnifiedPageWrapper';
import { Typography } from '../../theme/components/typography';
import { Hero } from '@/theme/components/hero/Hero';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { spacing } from '../../theme/theme';
import { useHoverEffects } from '../../hooks/useHoverEffects';

interface LegalDocument {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    title: 'Terms of Use',
    description:
      'Review the terms and conditions governing your use of the Fluxline pro website and services.',
    href: '/legal/terms',
  },
  {
    title: 'Privacy Policy',
    description:
      'Learn how we collect, use, and protect your personal information.',
    href: '/legal/privacy-policy',
  },
  {
    title: 'Stewardship Contract',
    description:
      'Explore the foundational principles and commitments that guide our client relationships.',
    href: '/legal/stewardship-contract',
  },
  {
    title: 'Glossary of Terms',
    description:
      'Understand key concepts, methodologies, and terminology used throughout Fluxline.',
    href: '/legal/glossary',
  },
  {
    title: 'Articles of Conversion',
    description:
      'View or download the official Articles of Conversion document (PDF).',
    href: '/legal/articles-of-conversion',
  },
];

/**
 * Legal Landing Page
 *
 * Provides access to all legal documents and reference materials
 * for the Fluxline Resonance Group
 */
export default function LegalPage() {
  const { theme } = useAppTheme();
  const cardHoverEffects = useHoverEffects({ type: 'card' });

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: spacing.xl,
          color: theme.semanticColors.bodyText,
        }}
      >
        {/* Hero Section */}
        <Hero
          title='Legal & Reference'
          iconName='LegalDocument'
          description='Access important legal documents and reference materials for the Fluxline Resonance Group. These documents outline our policies, terms, and core definitions.'
        />

        {/* Document Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: spacing.l,
            marginTop: spacing.xl,
            marginBottom: spacing.xxl,
          }}
        >
          {LEGAL_DOCUMENTS.map((doc) => (
            <Link
              key={doc.title}
              href={doc.href}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  backgroundColor: theme.palette.neutralLighterAlt,
                  border: `1px solid ${theme.palette.neutralQuaternary}`,
                  borderRadius: '8px',
                  padding: spacing.l,
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                {...cardHoverEffects}
              >
                <div>
                  <Typography
                    variant='h3'
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: theme.semanticColors.bodyText,
                      marginBottom: spacing.s2,
                    }}
                  >
                    {doc.title}
                  </Typography>
                  <Typography
                    variant='p'
                    style={{
                      fontSize: '0.875rem',
                      color: theme.palette.neutralSecondary,
                      lineHeight: '1.5',
                    }}
                  >
                    {doc.description}
                  </Typography>
                </div>

                {/* Special indicator for PDF document */}
                {doc.title === 'Articles Of Conversion' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.s1,
                      color: theme.palette.themePrimary,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    <svg
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' />
                    </svg>
                    VIEW PDF
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Fluxline Logo Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: spacing.xxxl,
            marginBottom: spacing.xl,
          }}
        >
          <div
            style={{
              backgroundColor: theme.palette.black,
              padding: spacing.xl,
              borderRadius: '12px',
              textAlign: 'center',
              maxWidth: '400px',
            }}
          >
            {/* This would be where the Fluxline logo goes - you can replace with actual logo component */}
            <Typography
              variant='h2'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: spacing.s1,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              FLUXLINE
            </Typography>
            <Typography
              variant='p'
              style={{
                color: '#FFD700', // Gold color for tagline
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              STRUCTURE THE SHIFT
            </Typography>
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
