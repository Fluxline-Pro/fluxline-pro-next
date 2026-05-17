'use client';

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';

export interface TRILayoutProps {
  children: React.ReactNode;
  tabletPortraitLayout?: 'side-by-side' | 'stacked' | 'image-small';
}

/**
 * TRILayout - Base layout wrapper for all TRI pages
 * Provides consistent spacing, theming, and responsive grid layout
 * with optional TRI logo sidebar on tablet/desktop.
 */
export function TRILayout({
  children,
  tabletPortraitLayout = 'side-by-side',
}: TRILayoutProps) {
  const { theme } = useAppTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isMobile = isMounted ? isMobileHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div style={{ padding: isMobile ? theme.spacing.m : undefined }}>
      <UnifiedPageWrapper
        layoutType='responsive-grid'
        tabletPortraitLayout={tabletPortraitLayout}
      >
        {children}
      </UnifiedPageWrapper>
    </div>
  );
}
