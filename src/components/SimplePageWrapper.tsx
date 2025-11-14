'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useSimpleLayout } from '@/theme/hooks/useSimpleLayout';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { useIsMobile, useIsTabletPortrait } from '@/theme/hooks/useMediaQuery';
import { useContentScrollable } from '@/theme/hooks/useContentScrollable';
import { createPlaceholderSVG } from '@/utils/placeholder';

// Page configurations with placeholder images for now
const PAGE_CONFIGS = {
  '/about': {
    image: createPlaceholderSVG(600, 800, 'About Fluxline', '#2563eb', 'white'),
    imageText: 'About Fluxline',
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
  const { theme, layoutPreference } = useAppTheme();
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
  const [isContentMounted, setIsContentMounted] = React.useState(false);

  // Wait for content to be fully rendered before applying centering
  React.useEffect(() => {
    // Reset to false first
    setIsContentMounted(false);

    let timerId: NodeJS.Timeout;

    // Use requestAnimationFrame to wait for paint, then setTimeout for animations
    const rafId = requestAnimationFrame(() => {
      timerId = setTimeout(() => {
        setIsContentMounted(true);
      }, 600); // Longer delay to account for Framer Motion animations (500ms + buffer)
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [pathname]); // Re-run when pathname changes

  // Check if current path should use the wrapper
  const shouldUseWrapper = !EXCLUDED_PAGES.includes(pathname);

  if (!shouldUseWrapper) {
    return <>{children}</>;
  }

  // Get configuration for current page
  const config = PAGE_CONFIGS[pathname as keyof typeof PAGE_CONFIGS] || {
    image: '/images/home/fluxline-logo.png',
    imageText: 'Fluxline',
  };

  const imageToDisplay = contentImage || config.image;

  // Handle tablet portrait layout options
  const shouldUseStackedLayout = isTabletPortrait && tabletPortraitLayout === 'stacked';
  const shouldUseImageSmall = isTabletPortrait && tabletPortraitLayout === 'image-small';

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: 'easeOut',
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
  const adjustedContainerStyle = isMobile || shouldUseStackedLayout
    ? {
        ...containerStyle,
        // Stacked layout for mobile and tablet portrait 'stacked' option
        gridTemplateColumns: '1fr',
        gridTemplateRows: shouldUseImageSmall ? 'auto 1fr' : 'minmax(300px, 40vh) 1fr',
        alignItems: 'start',
      }
    : {
        ...containerStyle,
        gridTemplateColumns: layoutPreference === 'left-handed' ? '1fr' : '1fr',
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
      !isMobile && !shouldUseStackedLayout && isContentMounted && !isContentScrollable
        ? 'none'
        : contentStyle.flex,
    justifyContent:
      !isMobile && !shouldUseStackedLayout && isContentMounted && !isContentScrollable
        ? 'center'
        : 'flex-start',
  };

  // Adjust image style for different tablet layouts
  const adjustedImageStyle = shouldUseStackedLayout || shouldUseImageSmall
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
                boxShadow: theme.shadows?.depth8 || '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Image
                src={imageToDisplay}
                alt={config.imageText}
                fill
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
                      fontFamily: theme.fonts.xLarge.fontFamily,
                    }}
                  >
                    {config.imageText}
                  </h2>
                </div>
              )}
            </motion.div>
          </div>

          {/* Content Panel */}
          <div ref={contentRef} style={adjustedContentStyle}>
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
            boxShadow: theme.shadows?.depth8 || '0 4px 12px rgba(0,0,0,0.15)',
            pointerEvents: 'auto', // Re-enable pointer events on the actual image
          }}
        >
          <Image
            src={imageToDisplay}
            alt={config.imageText}
            fill
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
                  fontFamily: theme.fonts.xLarge.fontFamily,
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
        <div ref={contentRef} style={adjustedContentStyle}>
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
