'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useDeviceOrientation, useIsMobile } from './useMediaQuery';
import { IExtendedTheme } from '../theme';

interface SimpleLayoutConfig {
  gridTemplateColumns: string;
  containerStyle: React.CSSProperties;
  contentStyle: React.CSSProperties;
}

export const useSimpleLayout = (
  theme: IExtendedTheme,
  layoutPreference: 'left-handed' | 'right-handed' = 'right-handed'
): SimpleLayoutConfig => {
  const pathname = usePathname();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();

  const isHomePage = pathname === '/';
  const isLeftHanded = layoutPreference === 'left-handed';

  const config = useMemo(() => {
    // Calculate header height (this should match your header component)
    const headerHeight = '4rem'; // Adjust this to match your actual header height

    // Simple grid columns based on orientation
    const gridColumns =
      orientation === 'portrait' ? '1fr' : isLeftHanded ? '9fr 3fr' : '3fr 9fr';

    // Base container styles with proper header spacing
    const containerStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: gridColumns,
      gridTemplateRows: orientation === 'portrait' ? 'auto 1fr' : '1fr',
      minHeight: '100vh',
      paddingTop: headerHeight, // This prevents content from going under the header
      gap: isMobile ? theme.spacing.s : theme.spacing.m,
      padding: isMobile ? theme.spacing.s : theme.spacing.l,
      paddingTop: `calc(${headerHeight} + ${isMobile ? theme.spacing.s : theme.spacing.l})`,
      backgroundColor: isHomePage
        ? 'transparent'
        : theme.semanticColors.bodyBackground,
    };

    // Content area styles
    const contentStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0, // Allows content to shrink
      overflowX: 'hidden',
      wordWrap: 'break-word',
      maxWidth: '100%',
    };

    return {
      gridTemplateColumns: gridColumns,
      containerStyle,
      contentStyle,
    };
  }, [orientation, isMobile, theme, isHomePage, isLeftHanded]);

  return config;
};
