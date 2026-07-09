'use client';

import React from 'react';

interface FxButtonProps {
  variant?: 'primary' | 'outline' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const sizes: Record<string, React.CSSProperties> = {
  sm: { fontSize: 14, padding: '9px 18px' },
  md: { fontSize: 15, padding: '13px 26px' },
  lg: { fontSize: 15.5, padding: '14px 30px' },
};

const variants: Record<string, React.CSSProperties> = {
  primary: {
    background: 'var(--fx-accent)',
    color: 'var(--fx-accent-ink)',
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: 'var(--fx-accent)',
    border: '1px solid var(--fx-line)',
  },
  quiet: {
    background: 'transparent',
    color: 'var(--fx-text-soft)',
    border: 'none',
    padding: 0,
  },
};

export default function FxButton({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  style,
  disabled,
  className,
  type = 'button',
}: FxButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
    borderRadius: 'var(--fx-radius-control)',
    fontFamily: 'var(--fx-font)',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer',
    transition:
      'filter var(--fx-color-duration), background var(--fx-color-duration), color var(--fx-color-duration), border-color var(--fx-color-duration)',
    ...sizes[size],
    ...variants[variant],
  };

  if (variant === 'quiet' && size !== 'md') {
    base.padding = 0;
  }

  if (hovered) {
    if (variant === 'primary') base.filter = 'brightness(1.08)';
    if (variant === 'outline') base.background = 'rgba(184,205,245,0.08)';
    if (variant === 'quiet') base.color = 'var(--fx-text-bright)';
  }

  if (disabled) {
    base.opacity = 0.5;
    base.pointerEvents = 'none';
  }

  const merged = { ...base, ...style };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href) {
    return (
      <a href={href} className={className} style={merged} {...handlers}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={merged}
      {...handlers}
    >
      {children}
    </button>
  );
}
