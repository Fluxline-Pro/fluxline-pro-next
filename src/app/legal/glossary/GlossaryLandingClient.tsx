'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../../../theme/components/typography';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import { typography, spacing } from '../../../theme/theme';
import { ProtectedEmail } from '../../../components/ProtectedEmail';

export default function GlossaryLandingClient() {
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
          marginBottom: spacing.l,
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
          Glossary of Terms
        </Typography>
      </div>

      {/* Subtitle */}
      <Typography
        variant='h3'
        style={{
          ...typography.fonts.h3,
          color: theme.palette.neutralSecondary,
          marginBottom: spacing.xl,
        }}
      >
        Comprehensive Terminology and Definitions
      </Typography>

      {/* Introduction */}
      <Typography
        variant='p'
        style={{
          ...typography.fonts.body,
          color: theme.semanticColors.bodyText,
          marginBottom: spacing.xl,
          lineHeight: typography.lineHeights.normal,
        }}
      >
        Fluxline operates across both mythic and technical domains. Our
        comprehensive glossary is divided into two specialized sections to serve
        different aspects of our work and communication.
      </Typography>

      {/* Glossary Sections Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: spacing.xl,
          marginBottom: spacing.xxl,
        }}
      >
        {/* Core Mythic Terms */}
        <Link
          href='/legal/glossary/core-mythic-terms'
          style={{
            display: 'block',
            padding: spacing.xl,
            border: `2px solid ${theme.palette.neutralQuaternary}`,
            borderRadius: theme.borderRadius.l,
            backgroundColor: theme.palette.white,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.palette.themePrimary;
            e.currentTarget.style.backgroundColor =
              theme.palette.neutralLighterAlt;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${theme.effects.elevation8}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.palette.neutralQuaternary;
            e.currentTarget.style.backgroundColor = theme.palette.white;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ marginBottom: spacing.m }}>
            <span style={{ fontSize: '2rem' }}>🔮</span>
          </div>
          <Typography
            variant='h3'
            style={{
              ...typography.fonts.h3,
              color: theme.semanticColors.bodyText,
              marginBottom: spacing.s,
            }}
          >
            Core Mythic Terms
          </Typography>
          <Typography
            variant='p'
            style={{
              ...typography.fonts.body,
              color: theme.palette.neutralSecondary,
              lineHeight: typography.lineHeights.normal,
            }}
          >
            Archetypal terminology, emotional stewardship concepts, ritual
            language, and the foundational vocabulary of Fluxline&apos;s mythic
            architecture.
          </Typography>
        </Link>

        {/* Technical Terms */}
        <Link
          href='/legal/glossary/technical-terms'
          style={{
            display: 'block',
            padding: spacing.xl,
            border: `2px solid ${theme.palette.neutralQuaternary}`,
            borderRadius: theme.borderRadius.l,
            backgroundColor: theme.palette.white,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.palette.themePrimary;
            e.currentTarget.style.backgroundColor =
              theme.palette.neutralLighterAlt;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${theme.effects.elevation8}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.palette.neutralQuaternary;
            e.currentTarget.style.backgroundColor = theme.palette.white;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ marginBottom: spacing.m }}>
            <span style={{ fontSize: '2rem' }}>📚</span>
          </div>
          <Typography
            variant='h3'
            style={{
              ...typography.fonts.h3,
              color: theme.semanticColors.bodyText,
              marginBottom: spacing.s,
            }}
          >
            Technical & Professional Terms
          </Typography>
          <Typography
            variant='p'
            style={{
              ...typography.fonts.body,
              color: theme.palette.neutralSecondary,
              lineHeight: typography.lineHeights.normal,
            }}
          >
            Business, legal, and technical terminology used across
            Fluxline&apos;s professional services, development, and consulting
            work.
          </Typography>
        </Link>
      </div>

      {/* Usage Note */}
      <div
        style={{
          padding: spacing.l,
          backgroundColor: theme.palette.neutralLighterAlt,
          borderRadius: theme.borderRadius.m,
          marginBottom: spacing.xxl,
        }}
      >
        <Typography
          variant='h4'
          style={{
            ...typography.fonts.h4,
            color: theme.semanticColors.bodyText,
            marginBottom: spacing.s,
          }}
        >
          Need More Information?
        </Typography>
        <Typography
          variant='p'
          style={{
            ...typography.fonts.body,
            color: theme.semanticColors.bodyText,
            lineHeight: typography.lineHeights.normal,
          }}
        >
          If you encounter a term not defined in either glossary, please contact
          us for clarification.
        </Typography>
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
}
