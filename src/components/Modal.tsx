'use client';

/**
 * Modal Component
 * Reusable full-screen modal with overlay
 * Supports custom content and styling with smooth animations
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { FluentIcon } from '@/theme/components/fluent-icon';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onDismiss: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Optional title for aria-label */
  ariaLabel?: string;
  /** Optional max width (default: 800px) */
  maxWidth?: string;
  /** Optional max height (default: 90vh) */
  maxHeight?: string;
  /** Show close button (default: true) */
  showCloseButton?: boolean;
  /** Additional styles for modal content */
  style?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
  children,
  ariaLabel = 'Modal',
  maxWidth = '800px',
  maxHeight = '90vh',
  showCloseButton = true,
  style,
}) => {
  const { theme } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onDismiss();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onDismiss]);

  // Backdrop animation variants
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: 'easeOut' as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.15,
        ease: 'easeIn' as const,
      },
    },
  };

  // Modal content animation variants
  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.4, 0.0, 0.2, 1.0] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: [0.4, 0.0, 1.0, 1.0] as const,
      },
    },
  };

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
          }}
          onClick={onDismiss}
          role='dialog'
          aria-modal='true'
          aria-label={ariaLabel}
        >
          <motion.div
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            style={{
              position: 'relative',
              maxWidth,
              maxHeight,
              width: '100%',
              backgroundColor: isDark
                ? theme.palette.themeDark
                : theme.palette.neutralQuaternary,
              border: `1px solid ${theme.palette.neutralTertiary}`,
              borderRadius: theme.borderRadius.container.medium,
              boxShadow: theme.shadows.hero || theme.effects.elevation16,
              overflow: 'auto',
              ...style,
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={onDismiss}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  transform: 'scale(1)',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label='Close modal'
              >
                <FluentIcon
                  iconName='Cancel'
                  size='large'
                  color={theme.semanticColors.errorIcon}
                />
              </button>
            )}

            {/* Content */}
            <div style={{ padding: theme.spacing.xl }}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
