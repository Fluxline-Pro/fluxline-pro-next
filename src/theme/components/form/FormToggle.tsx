'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface FormToggleProps {
  label: string;
  description?: string;
  icon?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

/**
 * FormToggle Component
 * Consistent toggle switch component following Fluxline DSM
 *
 * Features:
 * - Theme-aware styling with smooth transitions
 * - Optional icon and description
 * - Accessible with ARIA attributes and role
 * - Animated toggle with proper contrast
 * - Responsive font scaling
 */
export const FormToggle: React.FC<FormToggleProps> = ({
  label,
  description,
  icon,
  checked,
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const { theme, fontScale } = useAppTheme();

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
        opacity: disabled ? 0.6 : 1,
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
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: `${1 * fontScale}rem`,
            fontWeight: theme.typography.fontWeights.semiBold,
            marginBottom: description ? '0.25rem' : 0,
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: `${0.875 * fontScale}rem`,
              lineHeight: theme.typography.lineHeights.normal,
            }}
          >
            {description}
          </Typography>
        )}
      </div>
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        style={{
          width: '48px',
          height: '28px',
          borderRadius: '14px',
          backgroundColor: checked
            ? theme.palette.themePrimary
            : theme.palette.neutralQuaternary,
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          flexShrink: 0,
        }}
        aria-label={ariaLabel || `Toggle ${label}`}
        role='switch'
        aria-checked={checked ? 'true' : 'false'}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: theme.palette.white,
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            transition: 'left 0.2s ease',
            boxShadow: theme.shadows.s,
          }}
        />
      </button>
    </div>
  );
};
