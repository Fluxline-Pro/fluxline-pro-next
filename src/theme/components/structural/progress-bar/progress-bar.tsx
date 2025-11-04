'use client';

import React, { useEffect, useState } from 'react';
import { ProgressIndicator, IProgressIndicatorStyles } from '@fluentui/react';

import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface ProgressBarProps {
  /**
   * Whether to center the progress bar
   * @default true
   */
  autoCenter?: boolean;
  /**
   * Label text
   * @default 'Loading...'
   */
  label?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Manual progress value (0-1)
   * If not provided, progress auto-increments
   */
  percentComplete?: number;
  /**
   * Interval delay for auto-increment (ms)
   * @default 1000
   */
  intervalDelay?: number;
  /**
   * Interval increment amount
   * @default 0.01
   */
  intervalIncrement?: number;
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Progress bar component with auto-increment or manual control
 * Client Component - uses Fluent UI ProgressIndicator
 *
 * @example
 * ```tsx
 * // Auto-increment
 * <ProgressBar label="Loading..." />
 *
 * // Manual control
 * <ProgressBar label="Upload progress" percentComplete={uploadProgress} />
 * ```
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  autoCenter = true,
  label = 'Loading...',
  description = '',
  percentComplete,
  intervalDelay = 100,
  intervalIncrement = 0.01,
  className = '',
}) => {
  const [progress, setProgress] = useState(0);
  const { theme } = useAppTheme();

  const customStyles: Partial<IProgressIndicatorStyles> = {
    root: {
      width: 'auto',
      fontFamily: theme.typography.fonts.medium.fontFamily,
      fontSize: theme.typography.fonts.medium.fontSize,
      padding: `${theme.spacing.m} ${theme.spacing.xl}`,
      backgroundColor: 'transparent',
      color: theme.palette.neutralPrimary,
    },
    progressBar: {
      background: theme.palette.themePrimary,
      height: 6,
      borderRadius: 3,
    },
    itemProgress: {
      borderRadius: 3,
    },
  };

  const divStyles: React.CSSProperties = {
    ...(autoCenter && {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }),
  };

  useEffect(() => {
    if (percentComplete !== undefined) {
      setProgress(percentComplete);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + intervalIncrement;
        return next >= 1 ? 0 : next; // Reset to 0 when reaching 100%
      });
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [percentComplete, intervalDelay, intervalIncrement]);

  return (
    <div style={divStyles}>
      <ProgressIndicator
        className={className}
        label={label}
        description={description}
        percentComplete={progress}
        styles={customStyles}
      />
    </div>
  );
};

export default ProgressBar;
