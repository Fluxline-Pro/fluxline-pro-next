'use client';

import React from 'react';
import { motion } from 'framer-motion';

import styles from './loading-spinner.module.scss';

/**
 * Spinner size values matching the legacy SpinnerSize enum for API compatibility.
 */
export enum SpinnerSize {
  xSmall = 0,
  small = 1,
  medium = 2,
  large = 3,
}

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default SpinnerSize.large
   */
  size?: SpinnerSize;
  /**
   * Label text to display below spinner
   * @default 'Loading...'
   */
  label?: string;
  /**
   * Whether to show the label
   * @default false
   */
  showLabel?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/** Map SpinnerSize enum to pixel dimensions */
const sizeMap: Record<SpinnerSize, number> = {
  [SpinnerSize.xSmall]: 16,
  [SpinnerSize.small]: 24,
  [SpinnerSize.medium]: 32,
  [SpinnerSize.large]: 48,
};

/**
 * Loading spinner component with animation
 * Client Component - CSS-based spinner with motion wrapper
 *
 * @example
 * ```tsx
 * <LoadingSpinner size={SpinnerSize.large} label="Loading data..." showLabel />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = SpinnerSize.large,
  label = 'Loading...',
  showLabel = false,
  className = '',
}) => {
  const dimension = sizeMap[size] || 48;
  const borderWidth = Math.max(2, Math.round(dimension / 10));

  return (
    <div className={`${styles.container} ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div
          role="status"
          aria-label={label}
          style={{
            width: dimension,
            height: dimension,
            border: `${borderWidth}px solid var(--fx-border)`,
            borderTopColor: 'var(--fx-accent)',
            borderRadius: '50%',
            animation: 'fx-spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes fx-spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          style={{
            marginTop: '12px',
            color: 'var(--fx-text-heading)',
            fontSize: 'var(--fx-body-size)',
            fontFamily: 'var(--fx-font-body)',
          }}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
