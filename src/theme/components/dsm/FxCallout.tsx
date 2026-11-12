'use client';

import React from 'react';

interface FxCalloutProps {
  tone?: 'gold' | 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const toneMap: Record<string, { border: string; bg: string; titleColor: string }> = {
  gold: {
    border: 'var(--fx-gold-border)',
    bg: 'var(--fx-gold-bg)',
    titleColor: 'var(--fx-gold)',
  },
  success: {
    border: 'var(--fx-success-border)',
    bg: 'var(--fx-success-bg)',
    titleColor: 'var(--fx-success)',
  },
  error: {
    border: 'var(--fx-error-border)',
    bg: 'var(--fx-error-bg)',
    titleColor: 'var(--fx-error)',
  },
  warning: {
    border: 'var(--fx-warning-border)',
    bg: 'var(--fx-warning-bg)',
    titleColor: 'var(--fx-warning)',
  },
  info: {
    border: 'var(--fx-info-border)',
    bg: 'var(--fx-info-bg)',
    titleColor: 'var(--fx-info)',
  },
};

export default function FxCallout({
  tone = 'gold',
  title,
  children,
  style,
}: FxCalloutProps) {
  const t = toneMap[tone];

  return (
    <div
      style={{
        border: `1px solid ${t.border}`,
        background: t.bg,
        borderRadius: 'var(--fx-radius-card-sm)',
        padding: '22px 26px',
        fontFamily: 'var(--fx-font)',
        ...style,
      }}
    >
      {title && (
        <div
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: t.titleColor,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          fontSize: 14.5,
          lineHeight: 1.6,
          color: 'var(--fx-text-body)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
