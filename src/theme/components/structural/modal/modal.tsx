'use client';

import React from 'react';
import styles from './modal.module.scss';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback when the modal should close
   */
  onDismiss: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Additional modal configuration options
   */
  modalProps?: Record<string, unknown>;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Modal component using plain HTML overlay
 * Client Component - renders a div-based modal with backdrop
 *
 * @example
 * ```tsx
 * const [isOpen, , open, close] = useToggle();
 *
 * return (
 *   <>
 *     <button onClick={open}>Open Modal</button>
 *     <Modal isOpen={isOpen} onDismiss={close} title="My Modal">
 *       <p>Modal content goes here</p>
 *     </Modal>
 *   </>
 * );
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
  title,
  children,
  showCloseButton = true,
  className = '',
}) => {
  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onDismiss]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onDismiss();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal dialog'}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        className={`${styles.container} ${className}`}
        style={{
          backgroundColor: 'var(--fx-surface-card)',
          borderRadius: '8px',
          padding: 0,
          minWidth: '400px',
          maxWidth: '90vw',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          animation: 'fx-modal-in 0.2s ease-out',
        }}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {showCloseButton && (
            <button
              onClick={onDismiss}
              className={styles.closeButton}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
                transform: 'scale(1)',
                fontSize: '1.25rem',
                lineHeight: 1,
                color: 'var(--fx-text-muted)',
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
              &#x2715;
            </button>
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
      <style>{`@keyframes fx-modal-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};

export default Modal;
