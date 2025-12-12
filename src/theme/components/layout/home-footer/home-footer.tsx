'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceOrientation } from '../../../hooks/useMediaQuery';

/**
 * HomeFooter Component
 * 
 * Footer specifically for the home page, displayed only on desktop and widescreen tablet.
 * Features company logo, navigation links, and contact information.
 */
export const HomeFooter: React.FC = () => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  // Only show on desktop and widescreen tablet (landscape orientations)
  const shouldShowFooter =
    orientation === 'landscape' ||
    orientation === 'ultrawide' ||
    orientation === 'square';

  if (!shouldShowFooter) {
    return null;
  }

  const footerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(25, 40, 60, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '2rem 4rem',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gap: '3rem',
    alignItems: 'start',
    borderTop: `1px solid ${theme.palette.themePrimary}`,
    zIndex: 5,
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  };

  const headingStyle: React.CSSProperties = {
    color: theme.palette.white,
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeights.semiBold,
    marginBottom: '0.5rem',
    textTransform: 'capitalize',
  };

  const linkStyle: React.CSSProperties = {
    color: theme.palette.neutralSecondary,
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  };

  const contactInfoStyle: React.CSSProperties = {
    color: theme.palette.neutralSecondary,
    fontSize: '0.875rem',
    lineHeight: '1.6',
  };

  const iconStyle: React.CSSProperties = {
    display: 'inline-block',
    marginRight: '0.5rem',
  };

  return (
    <footer style={footerStyle}>
      {/* Logo Section */}
      <div style={columnStyle}>
        <Image
          src="/images/home/FluxlineLogo.png"
          alt="Fluxline Logo"
          width={200}
          height={60}
          style={{ objectFit: 'contain' }}
        />
        <p style={{ ...contactInfoStyle, marginTop: '1rem', fontSize: '0.8rem' }}>
          Structure the shift
        </p>
      </div>

      {/* Navigation Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
        }}
      >
        {/* About Column */}
        <div style={columnStyle}>
          <h3 style={headingStyle}>About</h3>
          <Link href="/about" style={linkStyle}>
            About 1
          </Link>
          <Link href="/about" style={linkStyle}>
            About 2
          </Link>
          <Link href="/about" style={linkStyle}>
            About 3
          </Link>
          <Link href="/about" style={linkStyle}>
            About 4
          </Link>
        </div>

        {/* Company Column */}
        <div style={columnStyle}>
          <h3 style={headingStyle}>Company</h3>
          <Link href="/services" style={linkStyle}>
            Company 1
          </Link>
          <Link href="/services" style={linkStyle}>
            Company 2
          </Link>
          <Link href="/services" style={linkStyle}>
            Company 3
          </Link>
          <Link href="/services" style={linkStyle}>
            Company 4
          </Link>
        </div>

        {/* Contact Me Column */}
        <div style={columnStyle}>
          <h3 style={headingStyle}>Contact Me</h3>
          <Link href="/contact" style={linkStyle}>
            Contact Me 1
          </Link>
          <Link href="/contact" style={linkStyle}>
            Contact Me 2
          </Link>
          <Link href="/contact" style={linkStyle}>
            Contact Me 3
          </Link>
          <Link href="/contact" style={linkStyle}>
            Contact Me 4
          </Link>
        </div>
      </div>

      {/* Contact Information */}
      <div style={columnStyle}>
        <div style={contactInfoStyle}>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={iconStyle}>📍</span>
            576 e briarsprings cir, midvale, ut
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={iconStyle}>✉️</span>
            <a
              href="mailto:terence@fluxline.pro"
              style={{ ...linkStyle, color: theme.palette.neutralSecondary }}
            >
              terence@fluxline.pro
            </a>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={iconStyle}>📞</span>
            <a
              href="tel:385.306.8113"
              style={{ ...linkStyle, color: theme.palette.neutralSecondary }}
            >
              385.306.8113
            </a>
          </div>
          <div>
            <span style={iconStyle}>🔗</span>
            <a
              href="https://www.fluxline.pro"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...linkStyle, color: theme.palette.neutralSecondary }}
            >
              www.fluxline.pro
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
