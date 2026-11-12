'use client';

import React from 'react';
import Link from 'next/link';
import './FxFooter.css';

interface FxFooterProps {
  preferencesOnClick?: () => void;
  backLink?: { label: string; href: string };
  style?: React.CSSProperties;
}

export default function FxFooter({
  preferencesOnClick,
  backLink,
  style,
}: FxFooterProps) {
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
      {/* The shared cross-sell block (Listen, Read, Work, author), in the
          same order on all three sites. Cross-site links are plain same-tab
          anchors with rel="me" so search engines connect the three sites to
          one identity. The Work line names this site, so it is plain text. */}
      <nav
        aria-label='Fluxline Ecosystem'
        className='fx-c'
        style={{
          maxWidth: 1220,
          margin: '0 auto',
          padding: '22px 32px 0',
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px 20px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--fx-text-soft)',
          }}
        >
          Fluxline Ecosystem
        </span>
        <a
          href='https://theresonantidentity.com/start-here/'
          rel='me'
          style={linkStyle('tri')}
          onMouseEnter={() => setHovered('tri')}
          onMouseLeave={() => setHovered(null)}
        >
          Listen: The Resonant Identity Podcast. Where the Framework is spoken.
        </a>
        <Link
          href='/resonance-core-framework/'
          style={linkStyle('rcf')}
          onMouseEnter={() => setHovered('rcf')}
          onMouseLeave={() => setHovered(null)}
        >
          Read: The Resonance Core Framework™. Where the Framework is mapped.
        </Link>
        <span style={linkStyle('work')}>
          Work: Fluxline. Fluxline builds systems that work, brands that
          connect, and practices that last.
        </span>
        <a
          href='https://terencewaters.com/about/'
          rel='me'
          style={linkStyle('tw')}
          onMouseEnter={() => setHovered('tw')}
          onMouseLeave={() => setHovered(null)}
        >
          By Terence Waters: Founder &amp; CEO, author, systems architect, and
          identity coach.
        </a>
      </nav>
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
          {preferencesOnClick && (
            <button
              type='button'
              onClick={preferencesOnClick}
              onMouseEnter={() => setHovered('prefs')}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...linkStyle('prefs'),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--fx-font)',
                padding: 0,
              }}
            >
              Display &amp; Appearance
            </button>
          )}
          {preferencesOnClick && (
            <>
              <span
                aria-hidden='true'
                style={{ color: 'var(--fx-text-faint)', fontSize: 13 }}
              >
                &middot;
              </span>
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
          {!preferencesOnClick && !backLink && (
            <span style={{ fontSize: 13, color: 'var(--fx-text-faint)' }}>
              Structure the Shift
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
