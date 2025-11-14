'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useSimpleLayout } from '@/theme/hooks/useSimpleLayout';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
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

interface SimplePageWrapperProps {
  children: React.ReactNode;
  showImageTitle?: boolean;
  contentImage?: string;
}

export const SimplePageWrapper: React.FC<SimplePageWrapperProps> = ({
  children,
  showImageTitle = true,
  contentImage,
}) => {
  const pathname = usePathname();
  const { theme, layoutPreference } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const { containerStyle, contentStyle } = useSimpleLayout(
    theme,
    layoutPreference
  );

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

  return (
    <div style={containerStyle}>
      {/* Image Panel */}
      <motion.div
        initial='hidden'
        animate='visible'
        variants={fadeInVariants}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '300px',
          height: '100%',
          borderRadius: theme.borderRadius.m,
          overflow: 'hidden',
          backgroundColor: theme.palette.neutralLighter,
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

      {/* Content Panel */}
      <div style={contentStyle}>
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
  );
};

export default SimplePageWrapper;
