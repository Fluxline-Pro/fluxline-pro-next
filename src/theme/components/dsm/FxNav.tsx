'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FxButton from './FxButton';

interface FxNavProps {
  variant?: 'home' | 'subpage';
  backLabel?: string;
  backHref?: string;
  breadcrumb?: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export default function FxNav({
  variant,
  backLabel = '← Back',
  backHref = '/',
  breadcrumb,
  ctaLabel = 'Book a Consultation',
  ctaHref = '/contact',
}: FxNavProps) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? (pathname === '/' ? 'home' : 'subpage');
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Content & Podcast', href: '#content' },
    { label: 'Contact', href: '#contact' },
  ];

  const linkStyle = (key: string): React.CSSProperties => ({
    color: hoveredLink === key ? 'var(--fx-text-bright)' : 'var(--fx-text-muted)',
    textDecoration: 'none',
    fontSize: 14.5,
    fontWeight: 500,
    transition: 'color var(--fx-color-duration)',
  });

  const pillHovered = hoveredLink === '__back';
  const backPillStyle: React.CSSProperties = {
    border: `1px solid ${pillHovered ? 'var(--fx-border-hover)' : 'var(--fx-border)'}`,
    borderRadius: 'var(--fx-radius-pill)',
    padding: '6px 13px',
    fontSize: 12.5,
    color: pillHovered ? 'var(--fx-text-bright)' : 'var(--fx-text-muted)',
    textDecoration: 'none',
    transition: 'color var(--fx-color-duration), border-color var(--fx-color-duration)',
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--fx-nav-bg)',
        backdropFilter: 'var(--fx-nav-blur)',
        borderBottom: '1px solid var(--fx-border-subtle)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--fx-container)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: '14px 32px',
        }}
      >
        {resolvedVariant === 'home' ? (
          <>
            <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--fx-text-bright)' }}>
              Fluxline Resonance Group
              <span style={{ color: 'var(--fx-text-soft)', fontWeight: 500 }}>, LLC</span>
            </span>
            <nav
              style={{
                display: 'flex',
                gap: 26,
                marginLeft: 'auto',
                alignItems: 'center',
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={linkStyle(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                </Link>
              ))}
              <FxButton size="sm" href={ctaHref}>
                {ctaLabel}
              </FxButton>
            </nav>
          </>
        ) : (
          <>
            <Link
              href={backHref!}
              style={backPillStyle}
              onMouseEnter={() => setHoveredLink('__back')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {backLabel}
            </Link>
            {breadcrumb && breadcrumb.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  fontSize: 13,
                  color: 'var(--fx-text-faint)',
                }}
              >
                {breadcrumb.map((item, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span>{'›'}</span>}
                    <span
                      style={
                        i === breadcrumb.length - 1
                          ? { color: 'var(--fx-text-muted)' }
                          : undefined
                      }
                    >
                      {item}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
            <div style={{ marginLeft: 'auto' }}>
              <FxButton size="sm" href={ctaHref}>
                {ctaLabel}
              </FxButton>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
