'use client';

import React from 'react';

import { useIsMobile, useIsTablet, useIsXXL } from '../../hooks/useMediaQuery';
import { useAppTheme } from '../../hooks/useAppTheme';

export interface UnifiedCardContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  viewType: 'grid' | 'small' | 'large' | 'image';
  gridColumns?: number;
}

export const UnifiedCardContainer: React.FC<UnifiedCardContainerProps> = ({
  children,
  className = '',
  gap = '1rem',
  viewType,
  gridColumns,
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isTabletHook = useIsTablet();
  const isXXLHook = useIsXXL();
  const isMobile = isMounted ? isMobileHook : false;
  const isTablet = isMounted ? isTabletHook : false;
  const isXXL = isMounted ? isXXLHook : false;
  const { theme } = useAppTheme();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const getGridConfig = () => {
    // Special case: image view uses flexbox, not grid
    if (viewType === 'image') {
      return {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        gap,
        width: '100%',
        height: '100%',
      };
    }

    // Determine columns based on view type and device
    let columns: number;

    if (viewType === 'small') {
      if (isMobile || isTablet) {
        columns = 1;
      } else if (isXXL) {
        columns = 3;
      } else {
        columns = 2;
      }
    } else if (viewType === 'large') {
      columns = isXXL ? 2 : 1;
    } else if (isMobile) {
      columns = 1;
    } else if (isTablet) {
      columns = viewType === 'grid' ? 3 : 2;
    } else {
      // Desktop
      columns = viewType === 'grid' ? 4 : 3;
    }

    // Override columns if gridColumns prop is provided
    if (gridColumns !== undefined) {
      columns = gridColumns;
    }

    return {
      display: 'grid' as const,
      templateColumns: `repeat(${columns}, 1fr)`,
      gap,
      gridAutoRows: '1fr',
      alignItems: 'stretch',
    };
  };

  const config = getGridConfig();

  // For flex layouts
  if (config.display === 'flex') {
    return (
      <div
        className={className}
        style={{
          display: config.display,
          flexDirection: config.flexDirection,
          alignItems: config.alignItems,
          justifyContent: config.justifyContent,
          gap: config.gap,
          width: config.width || '100%',
          height: config.height,
          maxWidth: '100%',
          padding: 0,
          transition: theme.animations.transitions.card,
        }}
      >
        {children}
      </div>
    );
  }

  // For grid layouts
  return (
    <div
      className={className}
      style={{
        display: config.display,
        gridTemplateColumns: config.templateColumns,
        gridAutoRows: config.gridAutoRows,
        alignItems: config.alignItems,
        gap: config.gap,
        width: 'auto',
        maxWidth: '100%',
        overflow: 'hidden',
        padding: isMobile ? '0.5rem 0' : '1rem',
        transition: theme.animations.transitions.card,
      }}
    >
      {children}
    </div>
  );
};

export default UnifiedCardContainer;
