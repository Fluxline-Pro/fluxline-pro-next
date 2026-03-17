'use client';

/**
 * Unsubscribe Page
 * Allows users to remove their email from the A+ in FLUX newsletter.
 * Centered card layout with FormInput and FormButton.
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components';
import { Typography } from '@/theme/components/typography';
import { FormInput } from '@/theme/components/form/FormInput';
import { FormButton } from '@/theme/components/form/FormButton';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { getApiEndpoint } from '@/lib/getApiUrl';

type PageState = 'idle' | 'loading' | 'success' | 'error';

export default function UnsubscribePage() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pageState, setPageState] = useState<PageState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  const handleUnsubscribe = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setPageState('loading');
    setErrorMessage('');

    try {
      const response = await fetch(
        getApiEndpoint('/api/newsletter-unsubscribe'),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setPageState('success');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(
          data?.error || 'Something went wrong. Please try again.'
        );
        setPageState('error');
      }
    } catch {
      setErrorMessage('Unable to connect. Please try again later.');
      setPageState('error');
    }
  };

  return (
    <UnifiedPageWrapper isUnsubscribe layoutType='responsive-grid'>
      {/* Full-height centred container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: `${theme.spacing.xxl} ${theme.spacing.l}`,
        }}
      >
        {/* Card */}
        <div
          style={{
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(0,0,0,0.03)',
            border: `1px solid ${theme.palette.neutralQuaternary}`,
            borderRadius: theme.borderRadius.container.large,
            boxShadow: theme.effects.elevation8,
            padding: theme.spacing.xxl,
            width: '100%',
            maxWidth: '480px',
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.l,
          }}
        >
          {pageState === 'success' ? (
            /* ── Confirmation view ── */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.l,
                textAlign: 'center',
              }}
            >
              <FluentIcon
                iconName='CheckMark'
                size='xLarge'
                color={
                  theme.semanticColors.successIcon || theme.palette.green
                }
              />
              <Typography
                variant='h3'
                style={{
                  color: theme.palette.themePrimary,
                  fontWeight: theme.typography.fontWeights.bold,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                You&apos;ve been unsubscribed
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  margin: 0,
                  lineHeight: theme.typography.lineHeights.relaxed,
                  textAlign: 'left',
                }}
              >
                Your email has been removed from the A+ in FLUX – Mythmaker Drop
                newsletter. We&apos;re sorry to see you go!
              </Typography>
              <FormButton
                text='Go to Home Page'
                variant='primary'
                size='large'
                icon='Home'
                iconPosition='left'
                onClick={() => router.push('/')}
              />
            </div>
          ) : (
            /* ── Unsubscribe form ── */
            <>
              {/* Icon + title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.s1,
                }}
              >
                <FluentIcon
                  iconName='MailAlert'
                  size='large'
                  color={theme.palette.themePrimary}
                  style={{ marginRight: '0.25rem' }}
                />
                <Typography
                  variant='h3'
                  style={{
                    color: theme.palette.themePrimary,
                    fontWeight: theme.typography.fontWeights.bold,
                    margin: 0,
                  }}
                >
                  Unsubscribe
                </Typography>
              </div>

              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  margin: 0,
                  lineHeight: theme.typography.lineHeights.relaxed,
                }}
              >
                Enter your email address below to remove yourself from the{' '}
                <strong>A+ in FLUX – Mythmaker Drop</strong> newsletter.
              </Typography>

              <FormInput
                type='email'
                label='Email Address'
                placeholder='you@example.com'
                value={email}
                onChange={setEmail}
                disabled={pageState === 'loading'}
                required
              />

              {errorMessage && (
                <p
                  style={{
                    color:
                      theme.semanticColors.errorText || theme.palette.red,
                    fontSize: '0.875rem',
                    margin: 0,
                  }}
                  role='alert'
                >
                  {errorMessage}
                </p>
              )}

              <FormButton
                text={
                  pageState === 'loading' ? 'Unsubscribing…' : 'Unsubscribe'
                }
                variant='primary'
                size='large'
                fullWidth
                icon='Cancel'
                iconPosition='left'
                onClick={handleUnsubscribe}
                disabled={pageState === 'loading'}
              />
            </>
          )}
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
