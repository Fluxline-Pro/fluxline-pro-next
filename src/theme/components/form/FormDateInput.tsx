'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface FormDateInputProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  'aria-label'?: string;
}

/**
 * FormDateInput Component
 * Theme-aware date input aligned with Fluxline DSM form controls
 */
export const FormDateInput: React.FC<FormDateInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  disabled = false,
  fullWidth = true,
  'aria-label': ariaLabel,
}) => {
  const { theme, themeMode } = useAppTheme();

  const labelFontSize = theme.typography.fonts.label.fontSize;
  const controlFontSize = theme.typography.fonts.body.fontSize;

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralPrimary,
          fontSize: labelFontSize,
          fontWeight: theme.typography.fontWeights.semiBold,
          marginBottom: '0.5rem',
          display: 'block',
        }}
      >
        {label}
      </Typography>

      <input
        type='date'
        value={value || ''}
        min={min}
        max={max}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        aria-label={ariaLabel || label}
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: theme.borderRadius.container.small,
          backgroundColor: theme.palette.neutralLight,
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
          color: theme.palette.neutralPrimary,
          fontSize: controlFontSize,
          fontFamily: theme.typography.fonts.body.fontFamily,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 0.2s ease',
          outline: 'none',
          colorScheme:
            themeMode === 'dark' || themeMode === 'high-contrast'
              ? 'dark'
              : 'light',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = theme.palette.themePrimary;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = theme.palette.neutralTertiaryAlt;
        }}
      />
    </div>
  );
};
