'use client';

import React from 'react';
import {
  Modal as FluentModal,
  IModalProps,
  IModalStyles,
  IconButton,
  IIconProps,
} from '@fluentui/react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { ClientOnly } from '@/theme/components/client-only';
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
   * Additional Fluent UI modal props
   */
  modalProps?: Partial<IModalProps>;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Modal component with ClientOnly wrapper for hydration safety
 * Client Component - uses Fluent UI Modal with portal rendering
 *
 * ⚠️ This component is wrapped with ClientOnly to prevent hydration issues
 * due to Fluent UI's dynamic ID generation.
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
  modalProps,
  className = '',
}) => {
  const { theme } = useAppTheme();

  const closeIcon: IIconProps = { iconName: 'Cancel' };

  const modalStyles: Partial<IModalStyles> = {
    main: {
      backgroundColor: theme.palette.white,
      borderRadius: '8px',
      padding: 0,
      minWidth: '400px',
      maxWidth: '90vw',
    },
  };

  return (
    <ClientOnly
      fallback={
        <div className={styles.fallback}>
          {/* Optional: Add a loading state */}
        </div>
      }
    >
      <FluentModal
        isOpen={isOpen}
        onDismiss={onDismiss}
        isBlocking={false}
        containerClassName={`${styles.container} ${className}`}
        styles={modalStyles}
        {...modalProps}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {showCloseButton && (
            <IconButton
              className={styles.closeButton}
              iconProps={closeIcon}
              ariaLabel="Close modal"
              onClick={onDismiss}
            />
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </FluentModal>
    </ClientOnly>
  );
};

export default Modal;
