'use client';

import React from 'react';

interface FxSwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function FxSwitch({
  label,
  checked = false,
  onChange,
  disabled = false,
  style,
}: FxSwitchProps) {
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
        role="switch"
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
          width: 38,
          height: 22,
          flex: 'none',
          borderRadius: 999,
          position: 'relative',
          border: `1px solid ${checked ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
          background: checked ? 'var(--fx-accent)' : 'var(--fx-surface-input)',
          transition:
            'background var(--fx-color-duration), border-color var(--fx-color-duration)',
          boxSizing: 'border-box' as const,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: checked
              ? 'var(--fx-accent-ink)'
              : 'var(--fx-text-soft)',
            transition:
              'left var(--fx-hover-duration) var(--fx-ease), background var(--fx-color-duration)',
          }}
        />
      </span>
      {label && (
        <span style={{ fontSize: 14, color: 'var(--fx-text-body)' }}>
          {label}
        </span>
      )}
    </label>
  );
}
