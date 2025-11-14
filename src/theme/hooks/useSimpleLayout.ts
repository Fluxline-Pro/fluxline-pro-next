'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useDeviceOrientation, useIsMobile } from './useMediaQuery';
import { useHeaderHeight } from './useHeaderHeight';
import { IExtendedTheme } from '../theme';

interface SimpleLayoutConfig {
  gridTemplateColumns: string;
  containerStyle: React.CSSProperties;
  contentStyle: React.CSSProperties;
  imageStyle: React.CSSProperties;
}

export const useSimpleLayout = (
  theme: IExtendedTheme,
  layoutPreference: 'left-handed' | 'right-handed' = 'right-handed'
): SimpleLayoutConfig => {
  const pathname = usePathname();
  const orientation = useDeviceOrientation();
  const isMobile = useIsMobile();
  const headerHeight = useHeaderHeight();

  const isHomePage = pathname === '/';
  const isLeftHanded = layoutPreference === 'left-handed';

  const config = useMemo(() => {
    // Simple grid columns based on orientation
    const gridColumns =
      orientation === 'portrait' ? '1fr' : isLeftHanded ? '9fr 3fr' : '3fr 9fr';

    // Base container styles with proper header spacing
    const containerStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: gridColumns,
      gridTemplateRows: orientation === 'portrait' ? 'auto 1fr' : '1fr',
      minHeight: '100vh',
      gap: isMobile ? theme.spacing.s : theme.spacing.m,
      padding: isMobile ? theme.spacing.s : theme.spacing.l,
      paddingTop: `calc(${headerHeight} + 1rem)`, // Dynamic header height + 1rem breathing room
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

    // Image panel styles - fixed to viewport on non-mobile
    const imageStyle: React.CSSProperties = isMobile
      ? {
          // Mobile: normal grid behavior
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: theme.spacing.m,
        }
      : {
          // Non-mobile: fixed to viewport
          position: 'fixed',
          top: 0,
          left: isLeftHanded ? 'auto' : 0,
          right: isLeftHanded ? 0 : 'auto',
          width: orientation === 'portrait' ? '100%' : '25vw', // 3fr out of 12fr ≈ 25%
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing.l,
          zIndex: 10,
          pointerEvents: 'none', // Allow clicking through to content behind
        };

    return {
      gridTemplateColumns: gridColumns,
      containerStyle,
      contentStyle,
      imageStyle,
    };
  }, [orientation, isMobile, theme, isHomePage, isLeftHanded, headerHeight]);

  return config;
};
