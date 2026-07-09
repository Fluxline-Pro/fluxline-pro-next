'use client';

import React, { useState } from 'react';

interface FxSelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<string | { value: string; label: string }>;
  placeholder?: string;
  style?: React.CSSProperties;
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12.5,
  fontWeight: 600,
  color: 'var(--fx-text-soft)',
  marginBottom: 6,
  fontFamily: 'var(--fx-font)',
};

export default function FxSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  style,
}: FxSelectProps) {
  const [focused, setFocused] = useState(false);

  const selectStyle: React.CSSProperties = {
    width: '100%',
    appearance: 'none',
    WebkitAppearance: 'none' as any,
    background: 'var(--fx-surface-input)',
    border: `1px solid ${focused ? 'var(--fx-border-hover)' : 'var(--fx-border)'}`,
    borderRadius: 'var(--fx-radius-control)',
    padding: '12px 38px 12px 14px',
    fontSize: 14.5,
    color: 'var(--fx-text-bright)',
    outline: 'none',
    fontFamily: 'var(--fx-font)',
    boxSizing: 'border-box' as const,
    cursor: 'pointer',
    ...style,
  };

  const normalized = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o
  );

  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <select
          style={selectStyle}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {normalized.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--fx-text-soft)',
            fontSize: 12,
          }}
        >
          ▾
        </span>
      </div>
    </div>
  );
}
