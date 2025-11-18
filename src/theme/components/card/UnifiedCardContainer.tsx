'use client';

import React from 'react';

import { useIsMobile, useIsTablet } from '../../hooks/useMediaQuery';
import { useAppTheme } from '../../hooks/useAppTheme';

export interface UnifiedCardContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  viewType: 'grid' | 'small' | 'large' | 'image';
  // Image dimension-based props
  imageDimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  } | null;
  // Optional override for grid behavior
  forceColumns?: number;
  // Responsive behavior
  adaptToImageDimensions?: boolean;
  // Custom grid columns override
  gridColumns?: number;
}

export const UnifiedCardContainer: React.FC<UnifiedCardContainerProps> = ({
  children,
  className = '',
  gap = '1rem',
  viewType,
  imageDimensions,
  forceColumns,
  adaptToImageDimensions = false,
  gridColumns,
}) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { theme } = useAppTheme();

  const getAdaptiveGridConfig = () => {
    // If we have image dimensions and adaptation is enabled
    if (adaptToImageDimensions && imageDimensions) {
      const { aspectRatio } = imageDimensions;

      // Determine layout based on aspect ratio
      if (aspectRatio > 1.5) {
        // Wide landscape images - use fewer columns to preserve aspect ratio
        const columns = isMobile ? 1 : isTablet ? 2 : 3;
        return {
          display: 'grid' as const,
          templateColumns: `repeat(${columns}, 1fr)`,
          gap,
          gridAutoRows: '1fr',
          alignItems: 'stretch',
        };
      } else if (aspectRatio < 0.75) {
        // Portrait images - can use more columns
        const columns = isMobile ? 1 : isTablet ? 3 : 4;
        return {
          display: 'grid' as const,
          templateColumns: `repeat(${columns}, 1fr)`,
          gap,
          gridAutoRows: '1fr',
          alignItems: 'stretch',
        };
      } else {
        // Square or moderate aspect ratios - standard grid
        const columns = isMobile ? 1 : isTablet ? 3 : 4;
        return {
          display: 'grid' as const,
          templateColumns: `repeat(${columns}, 1fr)`,
          gap,
          gridAutoRows: '1fr',
          alignItems: 'stretch',
        };
      }
    }

    // Fallback to standard grid configuration
    return getStandardGridConfig();
  };

  const getStandardGridConfig = () => {
    switch (viewType) {
      case 'grid':
        // Use custom gridColumns if provided, otherwise use existing logic
        const columns =
          gridColumns || forceColumns || (isMobile ? 1 : isTablet ? 3 : 4);
        return {
          display: 'grid' as const,
          templateColumns: `repeat(${columns}, 1fr)`,
          gap,
          gridAutoRows: 'minmax(auto, 1fr)',
          alignItems: 'stretch',
        };
      case 'small':
        const smallColumns = gridColumns || (isMobile ? 1 : 2);
        return {
          display: 'grid' as const,
          templateColumns: `repeat(${smallColumns}, 1fr)`,
          gap,
          gridAutoRows: '1fr',
          alignItems: 'stretch',
        };
      case 'large':
        return {
          display: 'flex' as const,
          flexDirection: 'column' as const,
          gap,
        };
      case 'image':
        // For image view type, use a flexible container
        return {
          display: 'flex' as const,
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          gap,
          width: '100%',
          height: '100%',
        };
      default:
        return getStandardGridConfig();
    }
  };

  const config = adaptToImageDimensions
    ? getAdaptiveGridConfig()
    : getStandardGridConfig();

  // For flex layouts (large and image view types)
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
