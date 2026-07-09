'use client';

import React from 'react';

interface FxCheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function FxCheckbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
}: FxCheckboxProps) {
  const toggle = () => {
    if (!disabled) onChange?.(!checked);
  };

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        fontFamily: 'var(--fx-font)',
        ...style,
      }}
    >
      <span
        role="checkbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggle();
          }
        }}
        style={{
          width: 18,
          height: 18,
          flex: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          border: `1px solid ${checked ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
          background: checked ? 'var(--fx-accent)' : 'var(--fx-surface-input)',
          color: 'var(--fx-accent-ink)',
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1,
          transition:
            'background var(--fx-color-duration), border-color var(--fx-color-duration)',
        }}
      >
        {checked && '✓'}
      </span>
      {label && (
        <span style={{ fontSize: 14, color: 'var(--fx-text-body)' }}>
          {label}
        </span>
      )}
    </label>
  );
}
