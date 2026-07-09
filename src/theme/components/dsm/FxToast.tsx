'use client';

import React from 'react';

type Tone = 'success' | 'error' | 'warning' | 'info';

interface FxToastProps {
  tone?: Tone;
  title?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

const toneMap: Record<Tone, { color: string; border: string; bg: string; mark: string }> = {
  success: { color: 'var(--fx-success)', border: 'var(--fx-success-border)', bg: 'var(--fx-success-bg)', mark: '✓' },
  error: { color: 'var(--fx-error)', border: 'var(--fx-error-border)', bg: 'var(--fx-error-bg)', mark: '✕' },
  warning: { color: 'var(--fx-warning)', border: 'var(--fx-warning-border)', bg: 'var(--fx-warning-bg)', mark: '!' },
  info: { color: 'var(--fx-info)', border: 'var(--fx-info-border)', bg: 'var(--fx-info-bg)', mark: 'i' },
};

export default function FxToast({
  tone = 'info',
  title,
  children,
  onDismiss,
  style,
}: FxToastProps) {
  const t = toneMap[tone];

  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        maxWidth: 380,
        background: `linear-gradient(${t.bg}, ${t.bg}), var(--fx-toast-bg)`,
        border: `1px solid ${t.border}`,
        borderRadius: 'var(--fx-radius-card-sm)',
        padding: '14px 16px',
        boxShadow: 'var(--fx-toast-shadow)',
        fontFamily: 'var(--fx-font)',
        ...style,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          flex: 'none',
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
          border: `1px solid ${t.color}`,
          color: t.color,
          fontSize: 11,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {t.mark}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: 'var(--fx-text-bright)',
            }}
          >
            {title}
          </div>
        )}
        {children && (
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.55,
              color: 'var(--fx-text-muted)',
            }}
          >
            {children}
          </div>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            marginTop: 1,
            color: 'var(--fx-text-faint)',
            fontSize: 13,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
