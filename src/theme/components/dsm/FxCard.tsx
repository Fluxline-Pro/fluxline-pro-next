'use client';

import React from 'react';
import Link from 'next/link';

interface FxCardProps {
  variant?: 'standard' | 'inset' | 'raised' | 'feature' | 'band';
  interactive?: boolean;
  href?: string;
  padding?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const backgrounds: Record<string, string> = {
  standard: 'var(--fx-surface-card)',
  inset: 'var(--fx-surface-inset)',
  raised: 'var(--fx-surface-raised)',
  feature: 'var(--fx-gradient-feature)',
  band: 'var(--fx-gradient-band)',
};

export default function FxCard({
  variant = 'standard',
  interactive = false,
  href,
  padding,
  children,
  style,
  className,
}: FxCardProps) {
  const [hovered, setHovered] = React.useState(false);

  const isInternalHref =
    typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'));

  const isStrong = variant === 'feature' || variant === 'band';

  const base: React.CSSProperties = {
    background: backgrounds[variant],
    border: `1px solid ${isStrong ? 'var(--fx-border-strong)' : hovered && interactive ? 'var(--fx-border-hover)' : 'var(--fx-border)'}`,
    borderRadius:
      variant === 'band' ? 'var(--fx-radius-band)' : 'var(--fx-radius-card)',
    padding: padding ?? 'var(--fx-card-pad)',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    transition:
      'border-color var(--fx-color-duration), transform var(--fx-color-duration), box-shadow var(--fx-color-duration)',
  };

  if (interactive && hovered) {
    base.transform = 'var(--fx-hover-lift)';
    base.boxShadow = '0 8px 24px rgba(0,0,0,0.18)';
  }

  const merged = { ...base, ...style };

  const handlers = interactive
    ? {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }
    : {};

  if (href) {
    if (isInternalHref) {
      return (
        <Link href={href} className={className} style={merged} {...handlers}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={className} style={merged} {...handlers}>
        {children}
      </a>
    );
  }

  return (
    <div className={className} style={merged} {...handlers}>
      {children}
    </div>
  );
}
