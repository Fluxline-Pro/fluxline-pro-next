'use client';

import React from 'react';

interface FxChipProps {
  kind?: 'category' | 'filter' | 'badge' | 'tag';
  tone?: 'teal' | 'gold';
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function FxChip({
  kind = 'category',
  tone = 'teal',
  active,
  onClick,
  children,
  style,
}: FxChipProps) {
  const [hovered, setHovered] = React.useState(false);

  const shared: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 'var(--fx-radius-pill)',
    fontFamily: 'var(--fx-font)',
    fontWeight: 600,
  };

  let kindStyles: React.CSSProperties = {};

  if (kind === 'filter') {
    kindStyles = {
      cursor: 'pointer',
      padding: '8px 16px',
      fontSize: 13,
      border: `1px solid ${active ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
      background: active ? 'var(--fx-accent)' : 'transparent',
      color: active
        ? 'var(--fx-accent-ink)'
        : hovered
          ? 'var(--fx-text-bright)'
          : 'var(--fx-text-muted)',
    };
  } else if (kind === 'badge') {
    kindStyles = {
      padding: '5px 12px',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background:
        tone === 'gold' ? 'rgba(232,185,91,0.14)' : 'var(--fx-teal-bg)',
      color: tone === 'gold' ? 'var(--fx-gold)' : 'var(--fx-teal)',
    };
  } else if (kind === 'tag') {
    kindStyles = {
      padding: '5px 13px',
      fontSize: 12,
      color: 'var(--fx-text-soft)',
      border: '1px solid var(--fx-border)',
    };
  } else {
    kindStyles = {
      cursor: 'pointer',
      padding: '6px 13px',
      fontSize: 12,
      border: `1px solid ${hovered ? 'var(--fx-border-hover)' : 'var(--fx-border-strong)'}`,
      color: hovered ? 'var(--fx-text-bright)' : 'var(--fx-accent)',
    };
  }

  const merged = { ...shared, ...kindStyles, ...style };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={merged} {...handlers}>
        {children}
      </button>
    );
  }

  return (
    <span style={merged} {...handlers}>
      {children}
    </span>
  );
}
