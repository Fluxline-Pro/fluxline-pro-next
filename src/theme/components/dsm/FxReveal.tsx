'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface FxRevealProps {
  variant?: 'up' | 'left';
  /** Stagger delay in ms, applied via animation-delay */
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function FxReveal({
  variant = 'up',
  delay = 0,
  children,
  style,
  className,
}: FxRevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -6% 0px',
    freezeOnceVisible: true,
  });

  const baseClass = variant === 'left' ? 'fx-rv-left' : 'fx-rv';

  return (
    <div
      ref={ref}
      className={[baseClass, isVisible ? 'in' : '', className].filter(Boolean).join(' ')}
      style={{ animationDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
}
