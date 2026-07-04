'use client';

import React from 'react';

interface FxToastStackProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function FxToastStack({ children, style }: FxToastStackProps) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
