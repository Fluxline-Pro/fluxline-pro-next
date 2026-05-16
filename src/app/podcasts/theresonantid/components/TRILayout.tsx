'use client';

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';

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
  return (
    <UnifiedPageWrapper
      layoutType='responsive-grid'
      tabletPortraitLayout={tabletPortraitLayout}
    >
      {children}
    </UnifiedPageWrapper>
  );
}
