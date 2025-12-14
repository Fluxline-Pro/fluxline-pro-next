'use client';

import React from 'react';
import Image from 'next/image';

import { useColorVisionFilter } from '../../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { VideoBackground } from '../video-background';
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
  // Skip dark mode brightness filter for background hero images
  // The skipDarkModeFilter parameter prevents the image from being darkened in dark mode
  const { filter } = useColorVisionFilter(true);
  const { shouldReduceMotion } = useReducedMotion();
  
  // Determine if image should be flipped for left-handed mode
  const shouldFlipHorizontally = layoutPreference === 'left-handed';

  const getBackgroundImagePath = (
    backgroundImage: 'one' | 'two',
    orientation: string
  ) => {
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
    themeMode: ThemeMode
  ) => {
    // For home page with background image, use a very subtle vignette overlay
    // that allows the image to show through clearly while providing minimal depth
    switch (themeMode) {
      case 'high-contrast':
        return '#000000';
      case 'dark':
        return 'radial-gradient(circle at center, transparent 0%, rgba(1, 1, 1, 0.3) 100%)';
      case 'grayscale-dark':
        return 'radial-gradient(circle at center, transparent 0%, rgba(31, 31, 31, 0.25) 100%)';
      case 'protanopia':
      case 'deuteranopia':
      case 'tritanopia':
      case 'grayscale':
        return 'radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.1) 100%)';
      default:
        return 'radial-gradient(circle at center, transparent 0%, rgba(245, 245, 245, 0.15) 100%)';
    }
  };

  if (!isHomePage) {
    return null;
  }

  const imagePath = getBackgroundImagePath(backgroundImage, orientation);
  const backgroundPosition = getBackgroundPosition(orientation, backgroundImage);
  const gradient = getBackgroundGradient(themeMode);

  // Determine if we should use video (only for backgroundImage === 'one')
  const useVideo = backgroundImage === 'one';
  
  // Video paths - placeholder for now, will be updated when video is uploaded
  const videoPath = orientation === 'portrait' || orientation === 'tablet-portrait'
    ? '/videos/home/testimonial-portrait.mp4'
    : '/videos/home/testimonial-landscape.mp4';
  const captionsPath = '/videos/home/testimonial-captions.vtt';

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
      {useVideo ? (
        /* Video Background for backgroundImage === 'one' */
        <VideoBackground
          videoSrc={videoPath}
          posterSrc={imagePath}
          fallbackImageSrc={imagePath}
          captionsSrc={captionsPath}
          orientation={orientation}
          backgroundPosition={backgroundPosition}
          gradient={gradient}
          shouldFlipHorizontally={shouldFlipHorizontally}
          themeMode={themeMode}
          theme={theme}
        />
      ) : (
        /* Static Image Background for backgroundImage === 'two' */
        <>
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
        </>
      )}
    </div>
  );
};

export default BackgroundLayer;
