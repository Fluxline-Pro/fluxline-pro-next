'use client';

import React from 'react';

interface FxContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  as?: React.ElementType;
}

export default function FxContainer({
  children,
  style,
  className,
  as: Tag = 'div',
}: FxContainerProps) {
  const base: React.CSSProperties = {
    // Cap to the viewport width as well as the design max, so the container
    // never forces horizontal overflow on mobile (e.g. when it sits inside a
    // flex parent that would otherwise size it to its content's width).
    maxWidth: 'min(var(--fx-container), 100%)',
    minWidth: 0,
    margin: '0 auto',
    padding: '0 32px',
  };

  return (
    <Tag
      className={className}
      style={{ ...base, ...style } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
