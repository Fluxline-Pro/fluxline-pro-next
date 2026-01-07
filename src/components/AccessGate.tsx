'use client';

/**
 * AccessGate Component
 *
 * Provides token-based access control for DEV and TEST environments.
 * Shows a full-screen gate that requires a valid access token before
 * allowing access to the site content.
 */

import React, { useState } from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { PrimaryButton, TextField } from '@fluentui/react';
import { useAccessControl } from '@/hooks/useAccessControl';

interface AccessGateProps {
  children: React.ReactNode;
}

export const AccessGate: React.FC<AccessGateProps> = ({ children }) => {
  const { theme } = useAppTheme();
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

  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  // If authentication is not required or user is authenticated, show children
  if (!authRequired || isAuthenticated) {
    return <>{children}</>;
  }

  // Show loading state
  if (isLoading) {
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
          backgroundColor: isDark ? theme.palette.black : theme.palette.white,
          color: isDark ? theme.palette.white : theme.palette.black,
          fontFamily: theme.fonts.medium.fontFamily,
          fontSize: theme.fonts.medium.fontSize,
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

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
        backgroundColor: isDark
          ? theme.palette.black
          : theme.palette.neutralLighter,
        fontFamily: theme.fonts.medium.fontFamily,
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          backgroundColor: isDark
            ? theme.palette.neutralDark
            : theme.palette.white,
          borderRadius: '8px',
          boxShadow: theme.effects.elevation16,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              fontFamily: theme.fonts.xxLarge.fontFamily,
              fontSize: theme.fonts.xxLarge.fontSize,
              fontWeight: 600,
              color: theme.palette.themePrimary,
              margin: '0 0 16px 0',
            }}
          >
            Fluxline Resonance Group
          </h1>
          <h2
            style={{
              fontFamily: theme.fonts.large.fontFamily,
              fontSize: theme.fonts.large.fontSize,
              fontWeight: 400,
              color: isDark
                ? theme.palette.neutralLight
                : theme.palette.neutralPrimary,
              margin: 0,
            }}
          >
            {environment === 'dev' ? 'Development' : 'Test'} Environment
          </h2>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p
            style={{
              fontFamily: theme.fonts.medium.fontFamily,
              fontSize: theme.fonts.medium.fontSize,
              color: isDark
                ? theme.palette.neutralSecondary
                : theme.palette.neutralPrimary,
              textAlign: 'center',
              margin: '0 0 24px 0',
            }}
          >
            This is a protected environment. Please enter your access token to
            continue.
          </p>

          <form onSubmit={handleSubmit}>
            <TextField
              placeholder='Enter access token'
              value={tokenInput}
              onChange={(_, newValue) => setTokenInput(newValue || '')}
              type='password'
              disabled={isSubmitting}
              errorMessage={error}
              styles={{
                root: { marginBottom: '16px' },
                field: {
                  backgroundColor: isDark
                    ? theme.palette.neutralQuaternaryAlt
                    : theme.palette.white,
                  color: isDark ? theme.palette.white : theme.palette.black,
                },
              }}
              autoComplete='current-password'
              autoFocus
            />

            <PrimaryButton
              text={isSubmitting ? 'Validating...' : 'Access Site'}
              type='submit'
              disabled={!tokenInput.trim() || isSubmitting}
              styles={{
                root: {
                  width: '100%',
                  height: '44px',
                  backgroundColor: theme.palette.themePrimary,
                },
                rootHovered: {
                  backgroundColor: theme.palette.themeDark,
                },
                rootPressed: {
                  backgroundColor: theme.palette.themeDarker,
                },
              }}
            />
          </form>
        </div>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: `1px solid ${isDark ? theme.palette.neutralQuaternary : theme.palette.neutralLight}`,
          }}
        >
          <p
            style={{
              fontFamily: theme.fonts.small.fontFamily,
              fontSize: theme.fonts.small.fontSize,
              color: isDark
                ? theme.palette.neutralTertiary
                : theme.palette.neutralSecondary,
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
