'use client';

import React from 'react';

interface FxStatCardProps {
  value: string | number;
  label: string;
  style?: React.CSSProperties;
}

export default function FxStatCard({ value, label, style }: FxStatCardProps) {
  return (
    <div
      style={{
        background: 'var(--fx-surface-card)',
        border: '1px solid var(--fx-border)',
        borderRadius: 'var(--fx-radius-card-sm)',
        padding: '20px 18px',
        textAlign: 'center',
        fontFamily: 'var(--fx-font)',
        ...style,
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--fx-text-heading)' }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: 'var(--fx-text-muted)', marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}
