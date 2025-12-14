'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceOrientation } from '../../../hooks/useMediaQuery';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { HomeFooter } from '../home-footer/home-footer';

/**
 * GlobalFooter Component
 *
 * Wraps HomeFooter and provides collapsible behavior for non-home pages.
 * - Home page: Shows footer directly (fixed at bottom)
 * - Other pages: Shows collapsible footer with hover/click trigger
 */
export const GlobalFooter: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const { shouldReduceMotion } = useReducedMotion();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const isHomePage = pathname === '/';

  // Only show on desktop and widescreen tablet (landscape orientations)
  const shouldShowFooter =
    orientation === 'landscape' ||
    orientation === 'ultrawide' ||
    orientation === 'square';

  if (!shouldShowFooter) {
    return null;
  }

  // Home page: render fixed footer directly
  if (isHomePage) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      >
        <HomeFooter />
      </div>
    );
  }

  // Other pages: collapsible footer with overlay trigger
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.5rem 2rem',
    backgroundColor: theme.palette.themePrimary,
    color: theme.isInverted ? theme.palette.black : theme.palette.white,
    fontSize: '0.875rem',
    fontWeight: theme.typography.fontWeights.semiBold,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    cursor: 'pointer',
    zIndex: 41,
    boxShadow: theme.shadows.l,
    transition: 'all 0.2s ease',
    userSelect: 'none',
  };

  const footerContainerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 40,
  };

  const slideVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: 'spring' as const,
          stiffness: 300,
          damping: 30,
          duration: shouldReduceMotion ? 0 : 0.3,
        },
        opacity: {
          duration: shouldReduceMotion ? 0 : 0.07,
          delay: shouldReduceMotion ? 0 : 0.05,
          ease: 'easeOut' as const,
        },
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <>
      {/* Overlay trigger - always visible */}
      <div
        style={overlayStyle}
        onMouseEnter={() => setIsExpanded(true)}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseLeave={(e) => {
          // Only collapse if mouse is not moving to the footer
          const relatedTarget = e.relatedTarget as HTMLElement;
          if (!relatedTarget?.closest('[data-footer="true"]')) {
            setIsExpanded(false);
          }
        }}
      >
        Footer {isExpanded ? '▼' : '▲'}
      </div>

      {/* Collapsible footer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            data-footer='true'
            style={footerContainerStyle}
            variants={slideVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onMouseLeave={() => setIsExpanded(false)}
          >
            <HomeFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalFooter;
