'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface FormTextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> {
  label?: string;
  description?: string;
  fullWidth?: boolean;
  requiredIndicator?: boolean;
  onChange?: (value: string) => void;
}

/**
 * FormTextarea Component
 * Theme-aware textarea aligned with Fluxline DSM form controls
 */
export const FormTextarea: React.FC<FormTextareaProps> = ({
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
  ...textareaProps
}) => {
  const { theme } = useAppTheme();

  const labelFontSize = theme.typography.fonts.label.fontSize;
  const descriptionFontSize = theme.typography.fonts.bodySmall.fontSize;
  const controlFontSize = theme.typography.fonts.body.fontSize;

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: labelFontSize,
            fontWeight: theme.typography.fontWeights.semiBold,
            marginBottom: description ? '0.25rem' : '0.5rem',
            display: 'block',
          }}
        >
          {label}
          {(required || requiredIndicator) && (
            <span
              style={{
                color: theme.semanticColors.errorText || theme.palette.red,
                marginLeft: '0.25rem',
              }}
            >
              *
            </span>
          )}
        </Typography>
      )}

      {description && (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: descriptionFontSize,
            lineHeight: theme.typography.lineHeights.normal,
            marginBottom: '0.5rem',
            display: 'block',
          }}
        >
          {description}
        </Typography>
      )}

      <textarea
        {...textareaProps}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 0.5rem 0.5rem 0.75rem',
          borderRadius: theme.borderRadius.container.small,
          backgroundColor: theme.palette.neutralLight,
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
          color: theme.palette.neutralPrimary,
          fontSize: controlFontSize,
          fontFamily: theme.typography.fonts.body.fontFamily,
          cursor: disabled ? 'not-allowed' : 'text',
          opacity: disabled ? 0.6 : 1,
          transition: 'border-color 0.2s ease',
          outline: 'none',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = theme.palette.themePrimary;
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = theme.palette.neutralTertiaryAlt;
          onBlur?.(e);
        }}
      />
    </div>
  );
};
