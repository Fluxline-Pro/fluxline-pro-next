'use client';

import React from 'react';
import Image from 'next/image';

import { useColorVisionFilter } from '../../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import type { IExtendedTheme, ThemeMode } from '../../../theme';

interface BackgroundLayerProps {
  isHomePage: boolean;
  backgroundImage: 'one' | 'two';
  orientation:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'mobile-landscape'
    | 'tablet-portrait'
    | 'ultrawide'
    | 'large-portrait';
  themeMode: ThemeMode;
  theme: IExtendedTheme;
  layoutPreference: 'left-handed' | 'right-handed';
  backgroundLoaded?: boolean;
}

/**
 * BackgroundLayer Component
 * 
 * Renders the background image for the home page with proper positioning
 * based on device orientation and background selection.
 */
export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  isHomePage,
  backgroundImage,
  orientation,
  themeMode,
  theme,
  layoutPreference,
  backgroundLoaded = true,
}) => {
  const { filter } = useColorVisionFilter();
  const { shouldReduceMotion } = useReducedMotion();
  
  // Determine if image should be flipped for left-handed mode
  const shouldFlipHorizontally = layoutPreference === 'left-handed';

  const getBackgroundImagePath = (
    backgroundImage: 'one' | 'two',
    orientation: string
  ) => {
    const isLandscape = orientation === 'landscape' || orientation === 'ultrawide';
    const isPortrait = orientation === 'portrait';
    const isTabletPortrait = orientation === 'tablet-portrait';
    
    if (backgroundImage === 'one') {
      return isPortrait || isTabletPortrait
        ? '/images/home/HomePageCover4kPortrait.jpeg'
        : '/images/home/HomePageCover4kLandscape.jpg';
    } else {
      return isPortrait || isTabletPortrait
        ? '/images/home/HomePageCover4kPortrait2.jpg'
        : '/images/home/HomePageCover4kLandscape2.jpg';
    }
  };

  const getBackgroundPosition = (
    orientation: string,
    backgroundImage: 'one' | 'two'
  ) => {
    if (orientation === 'square') {
      return backgroundImage === 'one' ? '80% center' : '20% center';
    }
    if (orientation === 'portrait') {
      return backgroundImage === 'one' ? 'center' : '33% center';
    }
    if (orientation === 'tablet-portrait') {
      return backgroundImage === 'one' ? '60% center' : '40% center';
    }
    if (orientation === 'large-portrait') {
      return backgroundImage === 'one' ? '55% center' : '45% center';
    }
    if (orientation === 'landscape' || orientation === 'ultrawide') {
      return 'center';
    }
    return 'center';
  };

  const getBackgroundGradient = (
    themeMode: ThemeMode,
    theme: IExtendedTheme
  ) => {
    switch (themeMode) {
      case 'high-contrast':
        return theme.gradients.light.background;
      case 'dark':
        return theme.gradients.dark.background;
      case 'protanopia':
      case 'deuteranopia':
      case 'tritanopia':
      case 'grayscale':
        return theme.gradients.light.background;
      default:
        return theme.gradients.light.background;
    }
  };

  if (!isHomePage) {
    return null;
  }

  const imagePath = getBackgroundImagePath(backgroundImage, orientation);
  const backgroundPosition = getBackgroundPosition(orientation, backgroundImage);
  const gradient = getBackgroundGradient(themeMode, theme);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        opacity: backgroundLoaded ? 1 : 0,
        transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          filter: filter,
        }}
      >
        <Image
          src={imagePath}
          alt="Fluxline Pro background"
          fill
          priority
          quality={90}
          style={{
            objectFit: 'cover',
            objectPosition: backgroundPosition,
            transform: shouldFlipHorizontally ? 'scaleX(-1)' : undefined,
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: gradient,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default BackgroundLayer;
