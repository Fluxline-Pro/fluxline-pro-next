'use client';

import React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { motion } from 'framer-motion';

import { useAppTheme } from '@/theme/hooks/useAppTheme';
import styles from './loading-spinner.module.scss';

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

/**
 * Loading spinner component with animation
 * Client Component - uses Fluent UI Spinner with motion
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
  const { theme } = useAppTheme();

  const spinnerStyles = {
    color: theme.palette.themePrimary,
    fontSize: '4rem',
  };

  const labelStyles = {
    marginTop: theme.spacing.m,
    color: theme.palette.neutralPrimary,
    fontSize: theme.typography.fonts.medium.fontSize,
    fontFamily: theme.typography.fonts.medium.fontFamily,
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Spinner size={size} style={spinnerStyles} />
      </motion.div>
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
          style={labelStyles}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
