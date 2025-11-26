'use client';

/**
 * Modal Component
 * Reusable full-screen modal with overlay
 * Supports custom content and styling
 */

import React, { useEffect } from 'react';
import { IconButton } from '@fluentui/react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

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
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
  children,
  ariaLabel = 'Modal',
  maxWidth = '800px',
  maxHeight = '90vh',
  showCloseButton = true,
}) => {
  const { theme } = useAppTheme();
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

  if (!isOpen) return null;

  return (
    <div
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
      <div
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
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseButton && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 1,
            }}
          >
            <IconButton
              iconProps={{ iconName: 'Cancel' }}
              onClick={onDismiss}
              ariaLabel='Close modal'
              styles={{
                root: {
                  color: theme.palette.neutralPrimary,
                },
                rootHovered: {
                  color: theme.palette.themePrimary,
                },
              }}
            />
          </div>
        )}

        {/* Content */}
        <div style={{ padding: theme.spacing.xl }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
