'use client';

import React from 'react';
import Link from 'next/link';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceOrientation } from '../../../hooks/useMediaQuery';

/**
 * HomeCtaBanner Component
 *
 * Call-to-action banner for the home page, displayed above the footer.
 * Only visible on desktop and widescreen tablet.
 */
export const HomeCtaBanner: React.FC = () => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  // Only show on desktop and widescreen tablet (landscape orientations)
  const shouldShowBanner =
    orientation === 'landscape' ||
    orientation === 'ultrawide' ||
    orientation === 'square';

  if (!shouldShowBanner) {
    return null;
  }

  const bannerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(35, 50, 70, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `3px solid ${theme.palette.themePrimary}`,
    zIndex: 5,
  };

  const textStyle: React.CSSProperties = {
    color: theme.palette.white,
    fontSize: '1.5rem',
    fontWeight: theme.typography.fontWeights.semiBold,
  };

  const ctaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: theme.palette.themePrimary,
    fontSize: '1.125rem',
    fontWeight: theme.typography.fontWeights.medium,
    textDecoration: 'none',
    transition: 'transform 0.2s ease',
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    transition: 'transform 0.2s ease',
  };

  return (
    <div style={bannerStyle}>
      <span style={textStyle}>Explore the Fluxline architecture → </span>
      <Link
        href='/services'
        style={ctaStyle}
        onMouseEnter={(e) => {
          const arrow = e.currentTarget.querySelector(
            '[data-arrow]'
          ) as HTMLElement;
          if (arrow) {
            arrow.style.transform = 'translateX(5px)';
          }
        }}
        onMouseLeave={(e) => {
          const arrow = e.currentTarget.querySelector(
            '[data-arrow]'
          ) as HTMLElement;
          if (arrow) {
            arrow.style.transform = 'translateX(0)';
          }
        }}
      >
        <span>Learn More</span>
        <span data-arrow style={arrowStyle}>
          →
        </span>
      </Link>
    </div>
  );
};

export default HomeCtaBanner;
