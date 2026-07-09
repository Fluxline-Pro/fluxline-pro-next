'use client';

import React, { useState } from 'react';

interface FxInputProps {
  label?: string;
  textarea?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  name?: string;
  id?: string;
  required?: boolean;
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

export default function FxInput({
  label,
  textarea = false,
  value,
  onChange,
  placeholder,
  rows = 6,
  name,
  id,
  required,
  style,
}: FxInputProps) {
  const [focused, setFocused] = useState(false);

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--fx-surface-input)',
    border: `1px solid ${focused ? 'var(--fx-border-hover)' : 'var(--fx-border)'}`,
    borderRadius: 'var(--fx-radius-control)',
    padding: '12px 14px',
    fontSize: 14.5,
    color: 'var(--fx-text-bright)',
    outline: 'none',
    fontFamily: 'var(--fx-font)',
    boxSizing: 'border-box' as const,
    resize: textarea ? ('vertical' as const) : undefined,
    ...style,
  };

  const shared = {
    style: fieldStyle,
    value,
    onChange,
    placeholder,
    name,
    id,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      {textarea ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} />
      )}
    </div>
  );
}
