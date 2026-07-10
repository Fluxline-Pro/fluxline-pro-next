'use client';

import React from 'react';

interface FxStatCardProps {
  value: string | number;
  label: string;
  style?: React.CSSProperties;
}

export default function FxStatCard({ value, label, style }: FxStatCardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--fx-surface-card)',
        border: `1px solid ${hovered ? 'var(--fx-border-hover)' : 'var(--fx-border)'}`,
        borderRadius: 'var(--fx-radius-card-sm)',
        padding: '20px 18px',
        textAlign: 'center',
        fontFamily: 'var(--fx-font)',
        transition: 'border-color var(--fx-color-duration), transform var(--fx-color-duration), box-shadow var(--fx-color-duration)',
        transform: hovered ? 'var(--fx-hover-lift)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.18)' : 'none',
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
