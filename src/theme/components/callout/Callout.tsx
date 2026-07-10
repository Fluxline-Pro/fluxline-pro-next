'use client';

import React from 'react';
import { Typography } from '../typography';

export interface CalloutProps {
  /**
   * Visual intensity variant
   * - 'accent': Full mythic gold accent (for important quotes/highlights)
   * - 'subtle': Softer appearance with primary color dominance
   * - 'neutral': Minimal accent, theme-primary focused
   */
  variant?: 'accent' | 'subtle' | 'neutral';

  /**
   * Main heading text
   */
  title: string;

  /**
   * Optional subtitle or supporting text
   */
  subtitle?: string;

  /**
   * Body content
   */
  children?: React.ReactNode;

  /**
   * Optional action element (button, link, etc.)
   */
  action?: React.ReactNode;

  /**
   * Custom icon or decorative element
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Callout Component
 *
 * DSM-compliant callout component with strategic use of mythic gold accent.
 * Supports three variants for different visual intensity levels.
 */
export const Callout: React.FC<CalloutProps> = ({
  variant = 'subtle',
  title,
  subtitle,
  children,
  action,
  icon,
  className,
}) => {
  // Variant-specific styling
  const getVariantStyles = React.useMemo((): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      padding: '24px 32px',
      borderRadius: 'var(--fx-radius-md, 8px)',
    };

    switch (variant) {
      case 'accent':
        return {
          ...baseStyles,
          border: '1px solid var(--fx-border)',
          backgroundColor: 'var(--fx-surface-card)',
          borderTop: '4px solid var(--fx-accent-gold, var(--fx-accent))',
          boxShadow: '0 0 0 1px var(--fx-border)',
        };

      case 'subtle':
        return {
          ...baseStyles,
          border: '1px solid var(--fx-border)',
          backgroundColor: 'var(--fx-surface-card)',
          borderTop: '3px solid var(--fx-accent)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        };

      case 'neutral':
        return {
          ...baseStyles,
          border: '1px solid var(--fx-border)',
          backgroundColor: 'var(--fx-surface-card)',
          borderTop: '2px solid var(--fx-text-faint)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        };

      default:
        return baseStyles;
    }
  }, [variant]);

  const getTitleColor = React.useMemo((): string => {
    switch (variant) {
      case 'accent':
        return 'var(--fx-accent-gold, var(--fx-accent))';
      case 'subtle':
        return 'var(--fx-accent)';
      case 'neutral':
        return 'var(--fx-text-heading)';
      default:
        return 'var(--fx-text-heading)';
    }
  }, [variant]);

  return (
    <div className={className} style={getVariantStyles}>
      {/* Icon (optional) */}
      {icon && <div style={{ marginBottom: '12px' }}>{icon}</div>}

      {/* Title */}
      <Typography
        variant='h3'
        style={{
          color: getTitleColor,
          marginBottom: subtitle || children ? '8px' : 0,
          fontSize: '1.5rem',
        }}
      >
        {title}
      </Typography>

      {/* Subtitle (optional) */}
      {subtitle && (
        <Typography
          variant='p'
          style={{
            color: 'var(--fx-text-muted)',
            fontStyle: variant === 'accent' ? 'italic' : 'normal',
            marginBottom: children ? '12px' : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Body content (optional) */}
      {children && (
        <div style={{ marginBottom: action ? '12px' : 0 }}>
          {children}
        </div>
      )}

      {/* Action element (optional) */}
      {action && <div style={{ marginTop: '12px' }}>{action}</div>}
    </div>
  );
};

export default Callout;
