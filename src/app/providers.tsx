'use client';

import React from 'react';
import ThemeProvider from '../theme/contexts/ThemeProvider';
import { ThemeOverrideProvider } from '../theme/contexts/ThemeOverrideContext';
import { FontScaleProvider } from '../theme/providers';
import { ReCaptchaProvider } from '../components/ReCaptchaProvider';
import { AccessGate } from '../components/AccessGate';
import { Header } from '../theme/components/header';
import { SkipToContent } from '../theme/components/skip-to-content';
import { GlobalFooter } from '../theme/components/layout/global-footer';
import { IosDetector } from '../components/IosDetector';
import { NewsletterPopup } from '../components/NewsletterPopup';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Client-side Providers Wrapper
 *
 * Centralizes all client-side providers in a single 'use client' component.
 * This prevents issues with context initialization during static prerendering.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <IosDetector />
      <FontScaleProvider>
        <ThemeProvider>
          <ThemeOverrideProvider>
            <ReCaptchaProvider>
              <AccessGate>
                <SkipToContent />
                <Header />
                {children}
                <NewsletterPopup />
                <GlobalFooter />
              </AccessGate>
            </ReCaptchaProvider>
          </ThemeOverrideProvider>
        </ThemeProvider>
      </FontScaleProvider>
    </>
  );
}
