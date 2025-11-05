'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  useDeviceOrientation,
  useIsLargeDesktop,
} from '../../hooks/useMediaQuery';
import { useLayoutConfig } from '../../hooks/useLayoutConfig';
import { useContentScrollable } from '../../hooks/useContentScrollable';
import { LayoutGrid } from './LayoutGrid';

interface ViewportGridProps {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  className?: string;
  reversed?: boolean;
  respectLayoutPreference?: boolean;
  placeItemsLeft?: 'start' | 'center' | 'end' | 'normal';
  placeItemsRight?: 'start' | 'center' | 'end' | 'normal';
  rightMaxWidth?: string | number;
  fullscreen?: boolean;
  nested?: boolean;
  isHomePage?: boolean;
  backgroundImage?: 'one' | 'two';
}

/**
 * ViewportGrid - Core layout component for the application
 * Handles responsive 3fr/9fr grid layout for image and content areas
 * - Mobile (portrait): Stacked layout (image top, content bottom)
 * - Desktop (landscape): Side-by-side 3fr/9fr layout
 * - Supports left-handed mode (swaps image and content positions)
 */
export const ViewportGrid: React.FC<ViewportGridProps> = ({
  leftChildren,
  rightChildren,
  className = '',
  reversed = false,
  respectLayoutPreference = true,
  placeItemsLeft = 'center',
  placeItemsRight = 'center',
  rightMaxWidth,
  fullscreen = false,
  nested = false,
  isHomePage = false,
  backgroundImage = 'one',
}) => {
  const { layoutPreference, readingDirection, theme } =
    useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const [isEntering, setIsEntering] = React.useState(false);
  const orientation = useDeviceOrientation();
  const isXLScreen = useIsLargeDesktop();
  const pathname = usePathname();

  // Create ref for right content area to detect scrollability
  const rightContentRef = React.useRef<HTMLDivElement>(null);
  const isRightContentScrollable = useContentScrollable(rightContentRef);

  // Handle route changes
  React.useEffect(() => {
    setIsEntering(true);
    const timer = setTimeout(
      () => setIsEntering(false),
      shouldReduceMotion ? 1 : 200
    );
    return () => clearTimeout(timer);
  }, [isHomePage, backgroundImage, orientation, shouldReduceMotion]);

  // Auto-scroll to top on navigation if not already at top
  React.useEffect(() => {
    const SCROLL_TOLERANCE = 5; // px - small tolerance for scroll position precision
    
    const scrollToTop = () => {
      // Check if the page is not at the top
      if (window.scrollY > SCROLL_TOLERANCE) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      }
    };

    // Small delay to ensure the route has fully changed
    const timer = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timer);
  }, [pathname, shouldReduceMotion]);

  // Handle scroll behavior for portrait mode
  React.useEffect(() => {
    const shouldAllowScroll = orientation === 'portrait' && !isHomePage;
    document.documentElement.classList.toggle(
      'allow-scroll',
      shouldAllowScroll
    );
    document.body.classList.toggle('allow-scroll', shouldAllowScroll);

    return () => {
      document.documentElement.classList.remove('allow-scroll');
      document.body.classList.remove('allow-scroll');
    };
  }, [orientation, isHomePage]);

  // Get layout configuration
  const { gridTemplateColumns, containerStyle } = useLayoutConfig(
    orientation,
    isHomePage,
    backgroundImage,
    isXLScreen,
    nested,
    theme,
    layoutPreference
  );

  // Determine if we should swap left and right children based on layout preference
  const shouldSwapChildren =
    respectLayoutPreference && layoutPreference === 'left-handed';

  // Calculate placeItems for right content based on device orientation and scrollability
  const rightPlaceItems = React.useMemo(() => {
    // Mobile portrait always uses the prop value
    if (orientation === 'portrait') {
      return placeItemsRight;
    }

    // If content is scrollable, align to start (top)
    if (isRightContentScrollable) {
      return 'start';
    }

    // Otherwise use the prop value
    return placeItemsRight;
  }, [orientation, isRightContentScrollable, placeItemsRight]);

  // Build class names
  const classes = React.useMemo(() => {
    const baseClasses = ['viewport-grid'];
    if (className) baseClasses.push(className);
    if (reversed) baseClasses.push('reversed');
    if (fullscreen) baseClasses.push('fullscreen');
    if (nested) baseClasses.push('nested');
    if (shouldSwapChildren) baseClasses.push('swapped');
    return baseClasses.join(' ');
  }, [className, reversed, fullscreen, nested, shouldSwapChildren]);

  // Determine which children to show where
  const leftContent = shouldSwapChildren ? rightChildren : leftChildren;
  const rightContent = shouldSwapChildren ? leftChildren : rightChildren;

  return (
    <LayoutGrid
      className={classes}
      style={{
        ...containerStyle,
        gridTemplateColumns,
        direction: readingDirection,
      }}
    >
      {/* Left content area (typically image in right-handed mode) */}
      {leftContent && (
        <div
          style={{
            display: 'flex',
            placeItems: placeItemsLeft,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            overflow: orientation === 'portrait' ? 'visible' : 'hidden',
          }}
        >
          {leftContent}
        </div>
      )}

      {/* Right content area (typically scrollable content in right-handed mode) */}
      {rightContent && (
        <div
          ref={rightContentRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: rightPlaceItems,
            alignItems: 'start',
            justifyContent: rightPlaceItems === 'start' ? 'start' : 'center',
            width: '100%',
            maxWidth: rightMaxWidth,
            height: '100%',
            overflow: orientation === 'portrait' ? 'visible' : 'auto',
            overflowX: 'hidden',
            padding: orientation === 'portrait' ? 0 : theme.spacing.m,
          }}
        >
          {rightContent}
        </div>
      )}
    </LayoutGrid>
  );
};
