'use client';

import React from 'react';
import {
  GoogleReCaptchaProvider,
  IGoogleReCaptchaConsumerProps,
} from 'react-google-recaptcha-v3';

interface ReCaptchaProviderProps {
  children: React.ReactNode;
}

/**
 * ReCaptchaProvider wraps the application with Google reCAPTCHA v3 provider
 *
 * This component provides reCAPTCHA functionality to all child components.
 * It requires NEXT_PUBLIC_RECAPTCHA_SITE_KEY to be set in environment variables.
 *
 * @example
 * ```tsx
 * <ReCaptchaProvider>
 *   <App />
 * </ReCaptchaProvider>
 * ```
 */
export const ReCaptchaProvider: React.FC<ReCaptchaProviderProps> = ({
  children,
}) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Graceful degradation: If no site key, render children without reCAPTCHA
  if (!siteKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set. reCAPTCHA will be disabled.'
      );
    }
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

// Export the hook type for use in other components
export type { IGoogleReCaptchaConsumerProps };
