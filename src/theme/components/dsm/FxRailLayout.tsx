'use client';

import React from 'react';

interface FxRailLayoutProps {
  rail: React.ReactNode;
  children: React.ReactNode;
  stickyTop?: number;
  style?: React.CSSProperties;
}

export default function FxRailLayout({
  rail,
  children,
  stickyTop = 100,
  style,
}: FxRailLayoutProps) {
  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .fx-rail-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div
        className="fx-rail-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'var(--fx-rail-width) minmax(0,1fr)',
          gap: 'var(--fx-rail-gap)',
          alignItems: 'start',
          ...style,
        }}
      >
        <div style={{ position: 'sticky', top: stickyTop }}>{rail}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {children}
        </div>
      </div>
    </>
  );
}
