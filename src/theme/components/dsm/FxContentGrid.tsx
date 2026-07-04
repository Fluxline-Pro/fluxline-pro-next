'use client';

import React from 'react';

interface FxContentGridProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function FxContentGrid({ children, style }: FxContentGridProps) {
  return (
    <>
      <style>{`
        .fx-content-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--fx-card-gap, 20px);
        }
        @media (max-width: 1023px) {
          .fx-content-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .fx-content-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="fx-content-grid" style={style}>
        {children}
      </div>
    </>
  );
}
