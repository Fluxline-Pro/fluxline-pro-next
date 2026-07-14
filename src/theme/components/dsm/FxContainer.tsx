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
    maxWidth: 'var(--fx-container)',
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
