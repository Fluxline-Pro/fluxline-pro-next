'use client';

import React from 'react';
import { getIconGlyph } from '../../utils/iconMap';

export interface FormSliderProps {
  label: string;
  description?: string;
  icon?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * FormSlider Component
 * Consistent range slider component following Fluxline DSM
 *
 * Features:
 * - Theme-aware styling with gradient track
 * - Optional icon and description
 * - Custom value formatting
 * - Accessible with ARIA attributes
 * - Smooth transitions and hover effects
 */
export const FormSlider: React.FC<FormSliderProps> = ({
  label,
  description,
  icon,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  // Calculate percentage for gradient
  const percentage = ((value - min) / (max - min)) * 100;

  const sliderStyles: React.CSSProperties = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: `linear-gradient(to right, var(--fx-accent) 0%, var(--fx-accent) ${percentage}%, var(--fx-border) ${percentage}%, var(--fx-border) 100%)`,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem',
        borderRadius: 'var(--fx-radius-control)',
        backgroundColor: 'var(--fx-surface-card)',
        border: '1px solid var(--fx-border)',
      }}
    >
      {icon && (
        <span
          style={{
            color: 'var(--fx-accent)',
            fontSize: '1.25rem',
            lineHeight: 1,
            flexShrink: 0,
          }}
          aria-hidden='true'
        >
          {getIconGlyph(icon)}
        </span>
      )}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: description ? '0.25rem' : '0.5rem',
          }}
        >
          <p
            style={{
              color: 'var(--fx-text-heading)',
              fontSize: '1rem',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {label}
          </p>
          <span
            style={{
              color: 'var(--fx-accent)',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {formatValue ? formatValue(value) : value}
          </span>
        </div>
        {description && (
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              marginBottom: '0.5rem',
              margin: 0,
              marginBlockEnd: '0.5rem',
            }}
          >
            {description}
          </p>
        )}
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => !disabled && onChange(parseFloat(e.target.value))}
          disabled={disabled}
          style={sliderStyles}
          aria-label={ariaLabel || label}
        />
      </div>
    </div>
  );
};
