'use client';

import React from 'react';

interface FxFooterProps {
  preferencesOnClick?: () => void;
  style?: React.CSSProperties;
}

export default function FxFooter({ preferencesOnClick, style }: FxFooterProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <footer
      style={{
        borderTop: '1px solid var(--fx-border-subtle)',
        background: 'var(--fx-bg-deep)',
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--fx-container)',
          margin: '0 auto',
          padding: '26px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--fx-text-faint)', whiteSpace: 'nowrap' }}>
          &copy; 2026 Fluxline Resonance Group, LLC &middot; Salt Lake City, Utah
        </span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {preferencesOnClick && (
            <button
              type="button"
              onClick={preferencesOnClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                fontSize: 13,
                color: hovered ? 'var(--fx-text-bright)' : 'var(--fx-text-soft)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'var(--fx-font)',
                transition: 'color var(--fx-color-duration)',
              }}
            >
              Display &amp; Appearance
            </button>
          )}
          <span style={{ fontSize: 13, color: 'var(--fx-text-faint)', whiteSpace: 'nowrap' }}>
            Structure the Shift
          </span>
        </div>
      </div>
    </footer>
  );
}
