'use client';

import React from 'react';

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
  
  // Detect mobile Safari synchronously to avoid double render
  const isMobileSafari = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isSafari && isMobile;
  }, []);

  const getBackgroundImagePath = (
    backgroundImage: 'one' | 'two',
    orientation: string
  ) => {
    const isPortrait = orientation === 'portrait';
    const isTabletPortrait = orientation === 'tablet-portrait';

    if (backgroundImage === 'one') {
      return isPortrait || isTabletPortrait
        ? '/images/home/HomePageCoverPortrait2.jpg'
        : '/images/home/HomePageCoverLandscape2.jpg';
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

  const getBackgroundGradient = (themeMode: ThemeMode) => {
    // Darker overlay to improve text contrast and readability
    switch (themeMode) {
      case 'high-contrast':
        return '#000000';
      case 'dark':
        return 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.6) 100%)';
      case 'grayscale-dark':
        return 'linear-gradient(to bottom, rgba(20, 20, 20, 0.5) 0%, rgba(10, 10, 10, 0.6) 100%)';
      case 'protanopia':
      case 'deuteranopia':
      case 'tritanopia':
      case 'grayscale':
        return 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.4) 100%)';
      default:
        return 'linear-gradient(to bottom, rgba(240, 240, 240, 0.3) 0%, rgba(240, 240, 240, 0.4) 100%)';
    }
  };

  // Apply gradient directly to HTML element for mobile Safari
  React.useEffect(() => {
    if (isMobileSafari && isHomePage) {
      const gradient = getBackgroundGradient(themeMode);
      const htmlElement = document.documentElement;

      // Apply gradient directly to HTML element with !important
      htmlElement.style.setProperty('background', gradient, 'important');
      htmlElement.style.setProperty('background-color', gradient, 'important');
      htmlElement.style.setProperty(
        '-webkit-background-color',
        gradient,
        'important'
      );
      // Remove conflicting background properties that might interfere with gradient
      htmlElement.style.setProperty('background-attachment', 'scroll', 'important');
      htmlElement.style.setProperty('background-size', 'auto', 'important');
      htmlElement.style.setProperty('background-position', 'initial', 'important');
    }

    return () => {
      // Cleanup: remove the inline styles when component unmounts
      if (isMobileSafari && isHomePage) {
        const htmlElement = document.documentElement;
        htmlElement.style.removeProperty('background');
        htmlElement.style.removeProperty('background-color');
        htmlElement.style.removeProperty('-webkit-background-color');
        htmlElement.style.removeProperty('background-attachment');
        htmlElement.style.removeProperty('background-size');
        htmlElement.style.removeProperty('background-position');
      }
    };
  }, [isMobileSafari, isHomePage, themeMode]);

  // Determine if image should be flipped for left-handed mode
  const shouldFlipHorizontally = layoutPreference === 'left-handed';

  // If mobile Safari, don't render the background layer div
  // Background is applied directly to HTML element via useEffect
  if (!isHomePage || isMobileSafari) {
    return null;
  }

  const imagePath = getBackgroundImagePath(backgroundImage, orientation);
  const backgroundPosition = getBackgroundPosition(
    orientation,
    backgroundImage
  );
  const gradient = getBackgroundGradient(themeMode);

  // Determine if we should use video (only for backgroundImage === 'one')
  // TODO: Re-enable video when testimonial files are uploaded to /public/videos/home/
  const useVideo = false; // Temporarily disabled until video is ready
  // const useVideo = backgroundImage === 'one';

  // Video paths - placeholder for now, will be updated when video is uploaded
  const videoPath =
    orientation === 'portrait' || orientation === 'tablet-portrait'
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
        width: '100dvw',
        height: '100dvh',
        zIndex: 1,
        overflow: 'hidden',
        opacity: 1, // Always visible - backgroundLoaded animation handled by parent
        transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
      }}
    >
      {useVideo ? (
        /* Video Background for backgroundImage === 'one' (when enabled) */
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
        /* Static Image Background - Currently used for both 'one' and 'two' (video disabled) */
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
              backgroundImage: `url(${imagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: backgroundPosition,
              backgroundRepeat: 'no-repeat',
              transform: shouldFlipHorizontally ? 'scaleX(-1)' : undefined,
            }}
          />

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
