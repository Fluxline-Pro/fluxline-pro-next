'use client';

import React from 'react';

export interface FormInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  label?: string;
  description?: string;
  fullWidth?: boolean;
  requiredIndicator?: boolean;
  onChange?: (value: string) => void;
}

/**
 * FormInput Component
 * Theme-aware text input aligned with Fluxline DSM form controls
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  description,
  fullWidth = true,
  requiredIndicator = false,
  onChange,
  onFocus,
  onBlur,
  required,
  disabled,
  style,
  ...inputProps
}) => {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <p
          style={{
            color: 'var(--fx-text-heading)',
            fontSize: 'var(--fx-body-sm-size)',
            fontWeight: 600,
            marginBottom: description ? '0.25rem' : '0.5rem',
            display: 'block',
            margin: 0,
            marginBlockEnd: description ? '0.25rem' : '0.5rem',
          }}
        >
          {label}
          {(required || requiredIndicator) && (
            <span
              style={{
                color: 'var(--fx-error)',
                marginLeft: '0.25rem',
              }}
            >
              *
            </span>
          )}
        </p>
      )}

      {description && (
        <p
          style={{
            color: 'var(--fx-text-muted)',
            fontSize: 'var(--fx-body-sm-size)',
            lineHeight: 1.7,
            marginBottom: '0.5rem',
            display: 'block',
            margin: 0,
            marginBlockEnd: '0.5rem',
          }}
        >
          {description}
        </p>
      )}

      <input
        {...inputProps}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem 0.5rem 0.5rem 0.75rem',
          borderRadius: 'var(--fx-radius-control)',
          backgroundColor: 'var(--fx-surface-input)',
          border: '1px solid var(--fx-border)',
          color: 'var(--fx-text-heading)',
          fontSize: 'var(--fx-body-size)',
          fontFamily: 'var(--fx-font)',
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 0.2s ease',
          outline: 'none',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--fx-accent)';
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--fx-border)';
          onBlur?.(e);
        }}
      />
    </div>
  );
};
