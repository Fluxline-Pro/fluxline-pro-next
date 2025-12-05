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

  const getGridConfig = () => {
    // Special case: Image view type uses flexbox, not grid
    if (viewType === 'image') {
      return {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap,
        width: '100%',
        height: '100%',
      };
    }

    // Determine column count based on view type and device
    let columns: number;

    // If we have image dimensions and adaptation is enabled, use aspect ratio for column decisions
    if (adaptToImageDimensions && imageDimensions) {
      const { aspectRatio } = imageDimensions;

      if (aspectRatio > 1.5) {
        // Wide landscape images - use fewer columns to preserve aspect ratio
        columns = isMobile ? 1 : isTablet ? 2 : 3;
      } else if (aspectRatio < 0.75) {
        // Portrait images - can use more columns
        columns = isMobile ? 1 : isTablet ? 2 : 3;
      } else {
        // Square or moderate aspect ratios - standard grid
        columns = isMobile ? 1 : isTablet ? 2 : 3;
      }
    } else {
      // Standard column calculation based on view type
      switch (viewType) {
        case 'grid':
          columns =
            gridColumns || forceColumns || (isMobile ? 1 : isTablet ? 3 : 4);
          break;
        case 'small':
          columns = gridColumns || (isMobile ? 1 : 2);
          break;
        case 'large':
          columns = gridColumns || (isMobile ? 1 : isTablet ? 2 : 3);
          break;
        default:
          columns = isMobile ? 1 : isTablet ? 3 : 4;
      }
    }

    // All grid layouts use the same structure now (minHeight in cards handles sizing)
    return {
      display: 'grid' as const,
      templateColumns: `repeat(${columns}, 1fr)`,
      gap,
      gridAutoRows: '1fr',
      alignItems: 'stretch',
    };
  };

  const config = getGridConfig();

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
