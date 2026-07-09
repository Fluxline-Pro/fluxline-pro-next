'use client';

import React, { useState } from 'react';
import styles from './card.module.scss';

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
  elevation?: 1 | 2 | 3;
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
  hoverable?: boolean;
}

const SHADOW = {
  s: '0 1px 3px rgba(0,0,0,0.12)',
  m: '0 3px 6px rgba(0,0,0,0.15)',
  l: '0 6px 12px rgba(0,0,0,0.2)',
  xl: '0 12px 24px rgba(0,0,0,0.25)',
} as const;

const PADDING_MAP = {
  none: 0,
  small: 8,
  medium: 16,
  large: 20,
} as const;

function getShadow(elevation: 1 | 2 | 3): string {
  return elevation === 1 ? SHADOW.s : elevation === 2 ? SHADOW.m : SHADOW.l;
}

function getHoverShadow(elevation: 1 | 2 | 3): string {
  return elevation === 1 ? SHADOW.m : elevation === 2 ? SHADOW.l : SHADOW.xl;
}

/**
 * Card component with DSM token integration
 *
 * @param props - Component props
 * @returns Card component
 */
export const Card: React.FC<CardProps> = ({
  className,
  children,
  elevation = 1,
  padding = 'medium',
  onClick,
  hoverable = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isInteractive = !!(onClick || hoverable);

  const style: React.CSSProperties = {
    backgroundColor: 'var(--fx-surface-card)',
    borderRadius: 'var(--fx-radius-card)',
    boxShadow: isHovered && isInteractive ? getHoverShadow(elevation) : getShadow(elevation),
    padding: PADDING_MAP[padding],
    cursor: isInteractive ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    transform: isHovered && isInteractive ? 'translateY(-2px)' : undefined,
  };

  const rootClass = [styles.card, className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClass}
      style={style}
      onClick={onClick}
      onMouseEnter={isInteractive ? () => setIsHovered(true) : undefined}
      onMouseLeave={isInteractive ? () => setIsHovered(false) : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
