'use client';

import React from 'react';

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
        opacity: disabled ? 0.6 : 1,
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
          {icon}
        </span>
      )}
      <div style={{ flex: 1 }}>
        <p
          style={{
            color: 'var(--fx-text-heading)',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: description ? '0.25rem' : 0,
            margin: 0,
            marginBlockEnd: description ? '0.25rem' : 0,
          }}
        >
          {label}
        </p>
        {description && (
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {description}
          </p>
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
            ? 'var(--fx-accent)'
            : 'var(--fx-border)',
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
            backgroundColor: 'var(--fx-text-bright)',
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            transition: 'left 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </button>
    </div>
  );
};
