'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FxButton from './FxButton';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface FxNavProps {
  variant?: 'home' | 'subpage';
  backLabel?: string;
  backHref?: string;
  breadcrumb?: (string | BreadcrumbItem)[];
  ctaLabel?: string;
  ctaHref?: string;
}

const BACK_ROUTES: Record<string, { label: string; href: string }> = {
  '/services': { label: '← Back to Home', href: '/' },
  '/blog': { label: '← Back to Home', href: '/' },
  '/contact': { label: '← Back to Home', href: '/' },
  '/about': { label: '← Back to Home', href: '/' },
  '/portfolio': { label: '← Back to Home', href: '/' },
  '/books': { label: '← Back to Home', href: '/' },
  '/videos': { label: '← Back to Home', href: '/' },
  '/case-studies': { label: '← Back to Home', href: '/' },
  '/press-release': { label: '← Back to Home', href: '/' },
  '/github': { label: '← Back to Home', href: '/' },
  '/legal': { label: '← Back to Home', href: '/' },
  '/cue-cards': { label: '← Back to Home', href: '/' },
  '/fluxline-ethos': { label: '← Back to Home', href: '/' },
  '/unsubscribe': { label: '← Back to Home', href: '/' },
};

function resolveBack(pathname: string): { label: string; href: string } {
  if (BACK_ROUTES[pathname]) return BACK_ROUTES[pathname];

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length >= 2) {
    const parentPath = '/' + segments.slice(0, -1).join('/');
    const parentName = segments[segments.length - 2]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { label: `← Back to ${parentName}`, href: parentPath };
  }

  return { label: '← Back to Home', href: '/' };
}

export default function FxNav({
  variant,
  backLabel,
  backHref,
  breadcrumb,
  ctaLabel = 'Book a Consultation',
  ctaHref = '/contact',
}: FxNavProps) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? (pathname === '/' ? 'home' : 'subpage');
  const resolvedBack = resolveBack(pathname);
  const finalBackLabel = backLabel ?? resolvedBack.label;
  const finalBackHref = backHref ?? resolvedBack.href;
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '/services' },
    { label: 'Content & Podcast', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const linkStyle = (key: string): React.CSSProperties => ({
    color:
      hoveredLink === key ? 'var(--fx-text-heading)' : 'var(--fx-text-soft)',
    textDecoration: 'none',
    fontSize: 14.5,
    fontWeight: 500,
    transition: 'color .15s',
  });

  const pillHovered = hoveredLink === '__back';
  const backPillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: `1px solid ${pillHovered ? 'var(--fx-text-soft)' : 'var(--fx-border)'}`,
    borderRadius: 8,
    padding: '8px 14px',
    fontSize: 13.5,
    fontWeight: 600,
    color: pillHovered ? 'var(--fx-text-heading)' : 'var(--fx-text-soft)',
    textDecoration: 'none',
    transition: 'border-color .15s, color .15s',
  };

  return (
    <header
      data-fx-glass=''
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'var(--fx-nav-bg)',
        backdropFilter: 'var(--fx-nav-blur)',
        WebkitBackdropFilter: 'var(--fx-nav-blur)',
        borderBottom: '1px solid var(--fx-border-subtle)',
      }}
    >
      <div
        className='fx-c fx-nav-gap'
        style={{
          maxWidth: 1220,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '14px 32px',
        }}
      >
        {resolvedVariant === 'home' ? (
          <>
            <Link
              href='/'
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 10,
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: 'var(--fx-text-heading)',
                }}
              >
                Fluxline Resonance Group
                <span
                  className='fx-nav-llc'
                  style={{ color: 'var(--fx-text-soft)', fontWeight: 500 }}
                >
                  , LLC
                </span>
              </span>
            </Link>
            <nav
              className='fx-navrow'
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
                  className='fx-navlink'
                  style={linkStyle(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                </Link>
              ))}
              <FxButton size='sm' href={ctaHref}>
                {ctaLabel}
              </FxButton>
            </nav>
          </>
        ) : (
          <>
            <Link
              href={finalBackHref}
              style={backPillStyle}
              onMouseEnter={() => setHoveredLink('__back')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {finalBackLabel}
            </Link>
            {breadcrumb && breadcrumb.length > 0 && (
              <div
                className='fx-crumb'
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  fontSize: 13.5,
                  color: 'var(--fx-text-faint)',
                  minWidth: 0,
                }}
              >
                {breadcrumb.map((item, i) => {
                  const label = typeof item === 'string' ? item : item.label;
                  const href = typeof item === 'string' ? undefined : item.href;
                  const isLast = i === breadcrumb.length - 1;
                  return (
                    <React.Fragment key={i}>
                      {i > 0 && <span>{'›'}</span>}
                      {isLast ? (
                        <span
                          style={{
                            color: 'var(--fx-text-bright)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {label}
                        </span>
                      ) : href ? (
                        <Link
                          href={href}
                          style={{
                            color:
                              hoveredLink === `crumb-${i}`
                                ? 'var(--fx-text-bright)'
                                : 'var(--fx-text-soft)',
                            textDecoration: 'none',
                            transition: 'color .15s',
                          }}
                          onMouseEnter={() => setHoveredLink(`crumb-${i}`)}
                          onMouseLeave={() => setHoveredLink(null)}
                        >
                          {label}
                        </Link>
                      ) : (
                        <span style={{ color: 'var(--fx-text-soft)' }}>{label}</span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
            <div style={{ marginLeft: 'auto' }}>
              <FxButton size='sm' href={ctaHref}>
                {ctaLabel}
              </FxButton>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
