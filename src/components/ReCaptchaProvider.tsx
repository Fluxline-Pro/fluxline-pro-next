'use client';

/**
 * ReCaptchaProvider - Wrapper for Google reCAPTCHA v3
 * Provides invisible spam protection across the application
 */

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface ReCaptchaProviderProps {
  children: React.ReactNode;
}

export const ReCaptchaProvider: React.FC<ReCaptchaProviderProps> = ({
  children,
}) => {
  const reCaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // If no site key is provided, render without reCAPTCHA
  if (!reCaptchaSiteKey) {
    console.warn(
      'NEXT_PUBLIC_RECAPTCHA_SITE_KEY not found. reCAPTCHA protection is disabled.'
    );
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaSiteKey}
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
