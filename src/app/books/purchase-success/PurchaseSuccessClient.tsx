'use client';

import React from 'react';
import Link from 'next/link';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography/';
import { FormButton } from '@/theme/components/form/FormButton';

/**
 * Purchase Success page shown after a successful Stripe checkout.
 * Informs the customer that their personalized PDF will arrive by email.
 */
export function PurchaseSuccessClient() {
  const { theme } = useAppTheme();

  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          textAlign: 'center',
          padding: theme.spacing.xl,
          backgroundColor: theme.palette.neutralLighterAlt,
          borderRadius: theme.effects.roundedCorner6,
          border: `2px solid ${theme.palette.themePrimary}`,
        }}
      >
        <Typography
          variant='h2'
          style={{ color: theme.palette.themePrimary, marginBottom: theme.spacing.m }}
        >
          🎉 Thank You!
        </Typography>
        <Typography
          variant='body'
          style={{ color: theme.palette.neutralPrimary, marginBottom: theme.spacing.m }}
        >
          Your purchase was successful. Your personalized PDF is being prepared and will be
          emailed to you within a few minutes.
        </Typography>
        <Typography
          variant='bodySmall'
          style={{ color: theme.palette.neutralSecondary, marginBottom: theme.spacing.l }}
        >
          {/* Note: 7-day validity matches SAS_VALIDITY_DAYS in api/stripe-webhook/index.js */}
          The download link in your email is valid for 7 days. If you don&apos;t receive it,
          please check your spam folder or contact{' '}
          <a
            href='mailto:support@fluxline.pro'
            style={{ color: theme.palette.themePrimary }}
          >
            support@fluxline.pro
          </a>
          .
        </Typography>
        <Link href='/books' style={{ textDecoration: 'none' }}>
          <FormButton variant='secondary' text='Back to Books' />
        </Link>
      </div>
    </main>
  );
}
