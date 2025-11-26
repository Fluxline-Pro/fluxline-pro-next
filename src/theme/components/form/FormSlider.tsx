'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

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
 * - Responsive font scaling
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
  const { theme, fontScale } = useAppTheme();

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
    background: `linear-gradient(to right, ${theme.palette.themePrimary} 0%, ${theme.palette.themePrimary} ${percentage}%, ${theme.palette.neutralQuaternary} ${percentage}%, ${theme.palette.neutralQuaternary} 100%)`,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem',
        borderRadius: theme.borderRadius.container.small,
        backgroundColor: theme.palette.neutralLighterAlt,
        border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
      }}
    >
      {icon && (
        <FluentIcon
          iconName={icon}
          size='medium'
          color={theme.palette.themePrimary}
        />
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
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralPrimary,
              fontSize: `${1 * fontScale}rem`,
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            {label}
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.themePrimary,
              fontSize: `${0.875 * fontScale}rem`,
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            {formatValue ? formatValue(value) : value}
          </Typography>
        </div>
        {description && (
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: `${0.875 * fontScale}rem`,
              lineHeight: theme.typography.lineHeights.normal,
              marginBottom: '0.5rem',
            }}
          >
            {description}
          </Typography>
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
