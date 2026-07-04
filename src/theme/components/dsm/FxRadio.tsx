'use client';

import React from 'react';

interface FxRadioProps {
  name?: string;
  options: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'column' | 'row';
  style?: React.CSSProperties;
}

export default function FxRadio({
  name,
  options,
  value,
  onChange,
  direction = 'column',
  style,
}: FxRadioProps) {
  const normalized = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o
  );

  return (
    <div
      role="radiogroup"
      style={{
        display: 'flex',
        flexDirection: direction,
        gap: direction === 'row' ? 20 : 12,
        fontFamily: 'var(--fx-font)',
        ...style,
      }}
    >
      {normalized.map((opt) => {
        const selected = opt.value === value;
        return (
          <label
            key={opt.value}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
            }}
            onClick={() => onChange?.(opt.value)}
          >
            <span
              role="radio"
              aria-checked={selected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onChange?.(opt.value);
                }
              }}
              style={{
                width: 18,
                height: 18,
                flex: 'none',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${selected ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
                background: 'var(--fx-surface-input)',
                transition: 'border-color var(--fx-color-duration)',
              }}
            >
              {selected && (
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: 'var(--fx-accent)',
                  }}
                />
              )}
            </span>
            <span style={{ fontSize: 14, color: 'var(--fx-text-body)' }}>
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
