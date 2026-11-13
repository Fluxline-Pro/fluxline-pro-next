'use client';

import React from 'react';
import Link from 'next/link';
import './FxFooter.css';

interface FxFooterProps {
  backLink?: { label: string; href: string };
  style?: React.CSSProperties;
}

export default function FxFooter({ backLink, style }: FxFooterProps) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  const linkStyle = (key: string): React.CSSProperties => ({
    color: hovered === key ? 'var(--fx-text-heading)' : 'var(--fx-text-faint)',
    fontSize: 13,
    textDecoration: 'none',
    transition: 'color .15s',
  });

  return (
    <footer
      style={{
        borderTop: '1px solid var(--fx-border-subtle)',
        background: 'var(--fx-surface-alt)',
        ...style,
      }}
    >
      <div
        className='fx-c footerContainer'
        style={{
          maxWidth: 1220,
          margin: '0 auto',
          padding: '26px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--fx-text-faint)' }}>
          &copy; 2026 Fluxline Resonance Group, LLC &middot; Salt Lake City,
          Utah
        </span>
        <div
          className='fx-footlinks'
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {!backLink && (
            <>
              <Link
                href='/legal'
                style={linkStyle('legal')}
                onMouseEnter={() => setHovered('legal')}
                onMouseLeave={() => setHovered(null)}
              >
                Legal &amp; Governance
              </Link>
              <span
                aria-hidden='true'
                style={{ color: 'var(--fx-text-faint)', fontSize: 13 }}
              >
                &middot;
              </span>
              <Link
                href='/press-release'
                style={linkStyle('press')}
                onMouseEnter={() => setHovered('press')}
                onMouseLeave={() => setHovered(null)}
              >
                Press Releases
              </Link>
              <span
                aria-hidden='true'
                style={{ color: 'var(--fx-text-faint)', fontSize: 13 }}
              >
                &middot;
              </span>
              <a
                href='https://fluxline.pro'
                style={linkStyle('site')}
                onMouseEnter={() => setHovered('site')}
                onMouseLeave={() => setHovered(null)}
              >
                fluxline.pro
              </a>
            </>
          )}
          {backLink && (
            <Link
              href={backLink.href}
              style={linkStyle('back')}
              onMouseEnter={() => setHovered('back')}
              onMouseLeave={() => setHovered(null)}
            >
              {backLink.label}
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
