'use client';

/**
 * Unsubscribe Page
 * Allows users to remove their email from The Resonant Identity newsletter.
 * Centered card layout with FormInput and FxButton.
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxButton from '@/theme/components/dsm/FxButton';
import { FormInput } from '@/theme/components/form/FormInput';
import { getApiEndpoint } from '@/lib/getApiUrl';

type PageState = 'idle' | 'loading' | 'success' | 'error';

export default function UnsubscribePage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pageState, setPageState] = useState<PageState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* Full-height centred container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '44px 20px',
        }}
      >
        {/* Card */}
        <div
          style={{
            backgroundColor: 'var(--fx-surface-card)',
            border: '1px solid var(--fx-border)',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: 44,
            width: '100%',
            maxWidth: '480px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {pageState === 'success' ? (
            /* Confirmation view */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 48,
                  color: 'var(--fx-success, #107c10)',
                }}
                aria-hidden='true'
              >
                &#10003;
              </span>
              <h3
                style={{
                  fontSize: 'var(--fx-h3-size)',
                  color: 'var(--fx-accent)',
                  fontWeight: 700,
                  margin: 0,
                  lineHeight: 1.1,
                  fontFamily: 'var(--fx-font)',
                }}
              >
                You&apos;ve been unsubscribed
              </h3>
              <p
                style={{
                  color: 'var(--fx-text-body)',
                  margin: 0,
                  lineHeight: 1.7,
                  textAlign: 'left',
                  fontSize: 'var(--fx-body-size)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                Your email has been removed from the{' '}
                <strong>The Resonant Identity</strong> newsletter. We&apos;re
                sorry to see you go!
              </p>
              <FxButton
                variant='primary'
                size='lg'
                onClick={() => router.push('/')}
              >
                Go to Home Page
              </FxButton>
            </div>
          ) : (
            /* Unsubscribe form */
            <>
              {/* Title */}
              <h3
                style={{
                  fontSize: 'var(--fx-h3-size)',
                  color: 'var(--fx-accent)',
                  fontWeight: 700,
                  margin: 0,
                  fontFamily: 'var(--fx-font)',
                }}
              >
                Unsubscribe
              </h3>

              <p
                style={{
                  color: 'var(--fx-text-body)',
                  margin: 0,
                  lineHeight: 1.7,
                  fontSize: 'var(--fx-body-size)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                Enter your email address below to remove yourself from the{' '}
                <strong>The Resonant Identity</strong> newsletter.
              </p>

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
                    color: 'var(--fx-error, #a4262c)',
                    fontSize: '0.875rem',
                    margin: 0,
                  }}
                  role='alert'
                >
                  {errorMessage}
                </p>
              )}

              <FxButton
                variant='primary'
                size='lg'
                onClick={handleUnsubscribe}
                disabled={pageState === 'loading'}
                style={{ width: '100%' }}
              >
                {pageState === 'loading' ? 'Unsubscribing...' : 'Unsubscribe'}
              </FxButton>
            </>
          )}
        </div>
      </div>
    </FxContainer>
  );
}
