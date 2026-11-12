'use client';

/**
 * AccessGate Component
 *
 * Provides token-based access control for DEV and TEST environments.
 * Shows a full-screen gate that requires a valid access token before
 * allowing access to the site content.
 *
 * Migrated to DSM CSS custom properties (var(--fx-*) tokens).
 */

import React, { useState } from 'react';
import { useAccessControl } from '@/hooks/useAccessControl';
import FxButton from '@/theme/components/dsm/FxButton';

interface AccessGateProps {
  children: React.ReactNode;
}

export const AccessGate: React.FC<AccessGateProps> = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    error,
    environment,
    authRequired,
    submitToken,
  } = useAccessControl();
  const [tokenInput, setTokenInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If authentication is not required or user is authenticated, show children
  if (!authRequired || isAuthenticated) {
    return <>{children}</>;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div
        role='status'
        aria-live='polite'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--fx-surface-page)',
          color: 'var(--fx-text-heading)',
          fontFamily: 'var(--fx-font)',
          fontSize: 14,
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple rapid submissions
    if (isSubmitting || !tokenInput.trim()) return;

    setIsSubmitting(true);
    const success = await submitToken(tokenInput.trim());
    setIsSubmitting(false);

    // Clear input on failed submission to prompt re-entry
    if (!success) {
      setTokenInput('');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--fx-surface-page)',
        fontFamily: 'var(--fx-font)',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          backgroundColor: 'var(--fx-surface-card)',
          borderRadius: 'var(--fx-radius-card)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              fontFamily: 'var(--fx-font)',
              fontSize: 28,
              fontWeight: 600,
              color: 'var(--fx-accent)',
              margin: '0 0 16px 0',
            }}
          >
            Fluxline Resonance Group
          </h1>
          <h2
            style={{
              fontFamily: 'var(--fx-font)',
              fontSize: 18,
              fontWeight: 400,
              color: 'var(--fx-text-heading)',
              margin: 0,
            }}
          >
            {environment === 'dev' ? 'Development' : 'Test'} Environment
          </h2>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              fontFamily: 'var(--fx-font)',
              fontSize: 14,
              color: 'var(--fx-text-muted)',
              textAlign: 'center',
              margin: '0 0 24px 0',
            }}
          >
            This is a protected environment. Please enter your access token to
            continue.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <input
                placeholder='Enter access token'
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                type='password'
                disabled={isSubmitting}
                autoComplete='current-password'
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: 14,
                  fontFamily: 'var(--fx-font)',
                  backgroundColor: 'var(--fx-surface-page)',
                  color: 'var(--fx-text-heading)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 'var(--fx-radius-control)',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color var(--fx-color-duration)',
                }}
              />
              {error && (
                <p
                  style={{
                    color: '#d13438',
                    fontSize: 12,
                    marginTop: 4,
                    marginBottom: 0,
                  }}
                >
                  {error}
                </p>
              )}
            </div>

            <FxButton
              variant='primary'
              size='lg'
              type='submit'
              disabled={!tokenInput.trim() || isSubmitting}
              style={{ width: '100%', height: '44px' }}
            >
              {isSubmitting ? 'Validating...' : 'Access Site'}
            </FxButton>
          </form>
        </div>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid var(--fx-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--fx-font)',
              fontSize: 12,
              color: 'var(--fx-text-faint)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Need access? Contact your administrator for an access token.
          </p>
        </div>
      </div>
    </div>
  );
};
