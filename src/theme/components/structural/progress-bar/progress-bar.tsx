'use client';

import React, { useEffect, useState } from 'react';

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
   * @default 100
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
 * Client Component - plain HTML/CSS progress bar
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

  useEffect(() => {
    if (percentComplete !== undefined) {
      setProgress(percentComplete);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + intervalIncrement;
        return next >= 1 ? 1 : next;
      });
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [percentComplete, intervalDelay, intervalIncrement]);

  const divStyles: React.CSSProperties = {
    ...(autoCenter && {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }),
  };

  return (
    <div style={divStyles}>
      <div
        className={className}
        style={{
          width: 'auto',
          fontFamily: 'var(--fx-font-body)',
          fontSize: 'var(--fx-body-size)',
          padding: '12px 32px',
          backgroundColor: 'transparent',
          color: 'var(--fx-text-heading)',
        }}
      >
        {label && (
          <div style={{ marginBottom: '8px', fontWeight: 600 }}>{label}</div>
        )}
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
          style={{
            width: '100%',
            height: 6,
            borderRadius: 3,
            backgroundColor: 'var(--fx-border)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              borderRadius: 3,
              backgroundColor: 'var(--fx-accent)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        {description && (
          <div
            style={{
              marginTop: '4px',
              fontSize: 'var(--fx-body-sm-size)',
              color: 'var(--fx-text-muted)',
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
