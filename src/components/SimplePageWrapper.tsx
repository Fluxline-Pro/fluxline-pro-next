'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useSimpleLayout } from '@/theme/hooks/useSimpleLayout';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { useIsMobile, useIsTabletPortrait } from '@/theme/hooks/useMediaQuery';
import { useContentScrollable } from '@/theme/hooks/useContentScrollable';
import { createPlaceholderSVG } from '@/utils/placeholder';
import FluxlineLogo from '@/assets/images/FluxlineLogo.png';
import FluxlineLogoDarkMode from '@/assets/images/FluxlineLogoDarkMode.png';
import FluxlineLogoLightMode from '@/assets/images/FluxlineLogoLightMode.png';
import ContactMeImage from '@/assets/images/ContactMe2400x1600.jpg';

// Page configurations with placeholder images for now
const PAGE_CONFIGS = {
  '/about': {
    image: createPlaceholderSVG(600, 800, 'About Fluxline', '#2563eb', 'white'),
    imageText: 'About Fluxline',
  },
  '/contact': {
    image: ContactMeImage,
    imageText: 'contact',
  },
  '/services': {
    image: createPlaceholderSVG(600, 800, 'Our Services', '#059669', 'white'),
    imageText: 'Our Services',
  },
} as const;

const EXCLUDED_PAGES = ['/'];

type TabletPortraitLayout = 'side-by-side' | 'stacked' | 'image-small';

interface SimplePageWrapperProps {
  children: React.ReactNode;
  showImageTitle?: boolean;
  contentImage?: string;
  tabletPortraitLayout?: TabletPortraitLayout;
}

export const SimplePageWrapper: React.FC<SimplePageWrapperProps> = ({
  children,
  showImageTitle = true,
  contentImage,
  tabletPortraitLayout = 'stacked',
}) => {
  const pathname = usePathname();
  const { theme, themeMode, layoutPreference } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const isMobile = useIsMobile();
  const isTabletPortrait = useIsTabletPortrait();
  const { containerStyle, contentStyle, imageStyle } = useSimpleLayout(
    theme,
    layoutPreference
  );

  // Create ref for content to detect scrollability
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isContentScrollable = useContentScrollable(contentRef);

  // Add state to ensure we don't check scrollability until content is fully mounted
  const [isContentMounted, setIsContentMounted] = React.useState(false); // Wait for content to be fully rendered before applying centering
  React.useEffect(() => {
    setIsContentMounted(false);

    if (!contentRef.current || typeof ResizeObserver === 'undefined') {
      // Fallback: immediately set as mounted if ResizeObserver is not available
      setIsContentMounted(true);
      return;
    }

    const observer = new ResizeObserver(() => {
      setIsContentMounted(true);
    });
    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [pathname]); // Re-run when pathname changes

  // Check if current path should use the wrapper
  const shouldUseWrapper = !EXCLUDED_PAGES.includes(pathname);

  if (!shouldUseWrapper) {
    return <>{children}</>;
  }

  // Get theme-based logo
  const getThemeBasedLogo = () => {
    // Use dark mode logo for dark themes, light mode logo for others
    const isDarkTheme = themeMode === 'dark' || themeMode === 'grayscale-dark';

    return isDarkTheme ? FluxlineLogoDarkMode : FluxlineLogoLightMode;
  };

  // Get configuration for current page
  const config = PAGE_CONFIGS[pathname as keyof typeof PAGE_CONFIGS] || {
    image: getThemeBasedLogo(),
    imageText: 'Fluxline',
  };

  const imageToDisplay = contentImage || config.image;

  // Handle tablet portrait layout options
  const shouldUseStackedLayout =
    isTabletPortrait && tabletPortraitLayout === 'stacked';
  const shouldUseImageSmall =
    isTabletPortrait && tabletPortraitLayout === 'image-small';

  // Animation variants
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.4, 0.0, 0.2, 1.0], // Custom cubic-bezier equivalent to easeOut
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  // Adjust container style for different layouts
  const adjustedContainerStyle =
    isMobile || shouldUseStackedLayout
      ? {
          ...containerStyle,
          // Stacked layout for mobile and tablet portrait 'stacked' option
          gridTemplateColumns: '1fr',
          gridTemplateRows: shouldUseImageSmall
            ? 'auto 1fr'
            : 'minmax(300px, 40vh) 1fr',
          alignItems: 'start',
        }
      : {
          ...containerStyle,
          gridTemplateColumns:
            layoutPreference === 'left-handed' ? '1fr' : '1fr',
          paddingLeft:
            layoutPreference === 'left-handed'
              ? containerStyle.padding
              : `calc(25vw + ${theme.spacing.l})`,
          paddingRight:
            layoutPreference === 'left-handed'
              ? `calc(25vw + ${theme.spacing.l})`
              : containerStyle.padding,
          // Vertically center content when not scrollable, align to top when scrollable
          alignItems:
            !isMobile && isContentMounted && !isContentScrollable
              ? 'center'
              : 'start',
        };

  // Adjust content style based on scrollability and layout
  const adjustedContentStyle = {
    ...contentStyle,
    // When content is not scrollable on desktop, remove flex grow to allow centering
    flex:
      !isMobile &&
      !shouldUseStackedLayout &&
      isContentMounted &&
      !isContentScrollable
        ? 'none'
        : contentStyle.flex,
    justifyContent:
      !isMobile &&
      !shouldUseStackedLayout &&
      isContentMounted &&
      !isContentScrollable
        ? 'center'
        : 'flex-start',
  };

  // Adjust image style for different tablet layouts
  const adjustedImageStyle =
    shouldUseStackedLayout || shouldUseImageSmall
      ? {
          // Tablet portrait stacked: image in grid, not fixed
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: shouldUseImageSmall ? 'auto' : '100%',
          padding: theme.spacing.m,
        }
      : imageStyle;

  return (
    <>
      {/* Different layout structures based on tablet portrait preference */}
      {shouldUseStackedLayout || shouldUseImageSmall ? (
        // Stacked Layout: Image and content in same container
        <div style={adjustedContainerStyle}>
          {/* Image Panel */}
          <div style={adjustedImageStyle}>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeInVariants}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: shouldUseImageSmall ? '200px' : '400px',
                aspectRatio: shouldUseImageSmall ? '4/3' : '3/4',
                borderRadius: theme.borderRadius.m,
                overflow: 'hidden',
                backgroundColor: theme.palette.neutralLighter,
                boxShadow: theme.shadows?.l || '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Image
                src={imageToDisplay}
                alt={config.imageText}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px'
                style={{
                  objectFit: 'cover',
                }}
                priority
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              />
              {showImageTitle && config.imageText && !shouldUseImageSmall && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: theme.spacing.m,
                    background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
                    color: theme.palette.white,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: theme.fonts.xLarge.fontSize,
                      fontWeight: theme.fonts.xLarge.fontWeight as number,
                      fontFamily: `${theme.fonts.xLarge.fontFamily} !important`,
                    }}
                  >
                    {config.imageText}
                  </h2>
                </div>
              )}
            </motion.div>
          </div>

          {/* Content Panel */}
          <div ref={contentRef} style={adjustedContentStyle} id='main-content'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={pathname}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={fadeInVariants}
                style={{
                  width: '100%',
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // Fixed Layout: Image fixed to viewport (desktop/tablet landscape)
        <>
          {/* Image Panel - Fixed to viewport */}
          <div style={adjustedImageStyle}>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeInVariants}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '3/4',
                borderRadius: theme.borderRadius.m,
                overflow: 'hidden',
                backgroundColor: theme.palette.neutralLighter,
                boxShadow: theme.shadows?.l || '0 4px 12px rgba(0,0,0,0.15)',
                pointerEvents: 'auto', // Re-enable pointer events on the actual image
              }}
            >
              <Image
                src={imageToDisplay}
                alt={config.imageText}
                fill
                sizes='(max-width: 768px) 100vw, 400px'
                style={{
                  objectFit: 'cover',
                }}
                priority
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              />
              {showImageTitle && config.imageText && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: theme.spacing.m,
                    background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
                    color: theme.palette.white,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: theme.fonts.xLarge.fontSize,
                      fontWeight: theme.fonts.xLarge.fontWeight as number,
                      fontFamily: `${theme.fonts.xLarge.fontFamily} !important`,
                    }}
                  >
                    {config.imageText}
                  </h2>
                </div>
              )}
            </motion.div>
          </div>

          {/* Content Container */}
          <div style={adjustedContainerStyle}>
            {/* Content Panel */}
            <div
              ref={contentRef}
              style={adjustedContentStyle}
              id='main-content'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={pathname}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={fadeInVariants}
                  style={{
                    width: '100%',
                  }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SimplePageWrapper;
