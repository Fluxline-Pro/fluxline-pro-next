'use client';

/**
 * Modal Component
 * Reusable full-screen modal with overlay
 * Supports custom content and styling with smooth animations
 *
 * Styled with DSM CSS custom properties (var(--fx-*) tokens).
 */

import React, { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';

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
  const { shouldReduceMotion } = useReducedMotion();

  // useSyncExternalStore returns false on server and true on client —
  // the React-recommended way to detect the client without an effect.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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

  if (!isClient) return null;

  return createPortal(
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
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
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
              backgroundColor: 'var(--fx-surface-card)',
              border: '1px solid var(--fx-border)',
              borderRadius: 'var(--fx-radius-card)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
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
                  padding: '0.75rem',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  transform: 'scale(1)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--fx-text-bright)',
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
                {'✕'}
              </button>
            )}

            {/* Content */}
            <div style={{ padding: '32px' }}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
