'use client';

import React from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';

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
  const { themeMode } = useAppTheme();
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      <p
        style={{
          color: 'var(--fx-text-heading)',
          fontSize: 'var(--fx-body-sm-size)',
          fontWeight: 600,
          marginBottom: '0.5rem',
          display: 'block',
          margin: 0,
          marginBlockEnd: '0.5rem',
        }}
      >
        {label}
      </p>

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
          borderRadius: 'var(--fx-radius-control)',
          backgroundColor: 'var(--fx-surface-input)',
          border: '1px solid var(--fx-border)',
          color: 'var(--fx-text-heading)',
          fontSize: 'var(--fx-body-size)',
          fontFamily: 'var(--fx-font)',
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
          e.currentTarget.style.borderColor = 'var(--fx-accent)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--fx-border)';
        }}
      />
    </div>
  );
};
