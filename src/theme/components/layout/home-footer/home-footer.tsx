'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceOrientation } from '../../../hooks/useMediaQuery';
import { Typography } from '../../typography';
import { themeMap } from '@/theme/theme';
import { useColorVisionFilter } from '@/theme/hooks';
import { useNewsletterStore } from '@/store/store';
import { getApiEndpoint } from '@/lib/getApiUrl';

/**
 * HomeFooter Component
 *
 * Footer specifically for the home page, displayed only on desktop and widescreen tablet.
 * Features company logo, navigation links, and contact information.
 *** Important:*** Does not include collapsible behavior; for that, use GlobalFooter.
 *** Important:*** This does not use the theme palettes to change color modes during various themeMode changes; colors are hardcoded for consistency.
 */

const getFooterTextColor = (themeMode: string): string => {
  switch (themeMode) {
    case 'high-contrast':
    case 'grayscale-dark':
    case 'dark':
    case 'tritanopia':
    case 'deuteranopia':
    case 'protanopia':
      return '#FFFFFF';
    case 'light':
    case 'grayscale':
      return '#000000';
    default:
      return '#000000';
  }
};

const getHoverLinkAndHeaderColor = (themeMode: string): string => {
  switch (themeMode) {
    case 'grayscale':
      return '#010101';
    case 'light':
    case 'dark':
    case 'grayscale-dark':
    case 'high-contrast':
      return themeMap[themeMode].palette.themePrimary;
    case 'tritanopia':
    case 'protanopia':
    case 'deuteranopia':
      return '#FFFFFF';
    default:
      return '#DFCDFC';
  }
};

export const StyledLink: React.FC<{
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
}> = ({ href, children, openInNewTab }) => {
  const { themeMode } = useAppTheme();

  const linkStyle: React.CSSProperties = {
    color: getFooterTextColor(themeMode), // don't change the text color on any mode changes
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition:
      'color 0.2s ease-in-out, font-variation-settings 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = getHoverLinkAndHeaderColor(themeMode); // light blue on hover by default on dark modes
    e.currentTarget.style.textDecoration = 'underline';
    e.currentTarget.style.fontVariationSettings = '"wght" 600';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = getFooterTextColor(themeMode); // revert to original color
    e.currentTarget.style.textDecoration = 'none';
    e.currentTarget.style.fontVariationSettings = '"wght" 400';
  };

  return (
    <Link
      href={href}
      style={linkStyle}
      target={openInNewTab ? '_blank' : '_self'}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
};

type FooterSubmitState = 'idle' | 'loading' | 'success' | 'error';

const FooterNewsletterSignup: React.FC = () => {
  const { themeMode } = useAppTheme();
  const { newsletterSubscribed, setNewsletterSubscribed } =
    useNewsletterStore();
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<FooterSubmitState>('idle');

  const textColor = getFooterTextColor(themeMode);
  const accentColor = getHoverLinkAndHeaderColor(themeMode);
  const isLightMode = themeMode === 'light' || themeMode === 'grayscale';

  const handleSubscribe = async () => {
    if (!email.trim()) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return;
    setSubmitState('loading');
    try {
      const response = await fetch(
        getApiEndpoint('/api/newsletter-subscribe'),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setSubmitState('success');
        setNewsletterSubscribed(true);
        setEmail('');
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  };

  const colStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  };

  const headStyle: React.CSSProperties = {
    color: accentColor,
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    textTransform: 'capitalize',
  };

  if (newsletterSubscribed || submitState === 'success') {
    return (
      <div style={colStyle}>
        <Typography variant='h3' style={headStyle}>
          Newsletter
        </Typography>
        <span style={{ color: '#4CAF50', fontSize: '0.875rem' }}>
          ✓ You&apos;re subscribed!
        </span>
      </div>
    );
  }

  return (
    <div style={colStyle}>
      <Typography variant='h3' style={headStyle}>
        Stay in the Loop
      </Typography>
      <Typography
        variant='p'
        style={{
          color: textColor,
          fontSize: '0.8rem',
          margin: 0,
          lineHeight: '1.5',
        }}
      >
        Biweekly insights on Fluxline and The Resonance Core Framework.
      </Typography>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
        placeholder='your@email.com'
        aria-label='Email address for newsletter'
        style={{
          backgroundColor: isLightMode
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.1)',
          border: `1px solid ${accentColor}`,
          borderRadius: '4px',
          color: textColor,
          fontSize: '0.8rem',
          padding: '0.4rem 0.6rem',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={handleSubscribe}
        disabled={submitState === 'loading'}
        style={{
          backgroundColor: accentColor,
          border: 'none',
          borderRadius: '4px',
          color: accentColor === '#FFFFFF' ? '#000000' : '#ffffff',
          cursor: submitState === 'loading' ? 'not-allowed' : 'pointer',
          fontSize: '0.8rem',
          fontWeight: 600,
          opacity: submitState === 'loading' ? 0.7 : 1,
          padding: '0.4rem 1rem',
          transition: 'opacity 0.2s ease',
          width: '100%',
        }}
      >
        {submitState === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {submitState === 'error' && (
        <span style={{ color: '#ff6b6b', fontSize: '0.75rem' }} role='alert'>
          Something went wrong. Please try again.
        </span>
      )}
    </div>
  );
};

export const HomeFooter: React.FC = () => {
  const { theme, themeMode } = useAppTheme();
  const orientation = useDeviceOrientation();
  const { filter: logoFilter } = useColorVisionFilter();

  const getBackground = (): string => {
    switch (themeMode) {
      case 'high-contrast':
        return '#000000';
      case 'grayscale-dark':
        return 'rgba(26, 26, 26, 0.9)';
      case 'grayscale':
        return 'linear-gradient(135deg, rgba(220, 220, 220, 0.95) 0%, rgba(245, 245, 245, 0.95) 50%, rgba(235, 235, 235, 0.95) 100%)';
      case 'light':
        return 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(245, 200, 92, 0.12) 30%, rgba(39, 71, 112, 0.12) 70%, rgba(248, 250, 252, 0.95) 100%)';
      case 'tritanopia':
        return 'rgba(140, 30, 35, 0.9)';
      case 'protanopia':
      case 'deuteranopia':
        return 'rgba(0, 70, 120, 0.9)';
      case 'dark':
      default:
        return 'rgba(25, 40, 60, 0.9)';
    }
  };

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
    background: getBackground(),
    backdropFilter: 'blur(10px)',
    padding: '2rem 4rem',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr',
    gap: '3rem',
    alignItems: 'start',
    borderTop: `2px solid ${theme.palette.themePrimary}`,
    zIndex: 5,
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  };

  const headingStyle: React.CSSProperties = {
    color: getHoverLinkAndHeaderColor(themeMode), // don't change the text color on any mode changes
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeights.semiBold,
    marginBottom: '0.5rem',
    textTransform: 'capitalize',
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
          src={
            themeMode === 'light'
              ? '/images/home/FluxlineLogoLightMode.png'
              : '/images/home/FluxlineLogoHomePage.png'
          }
          alt='Fluxline Logo'
          width={200}
          height={60}
          style={{
            objectFit: 'contain',
            filter:
              themeMode === 'grayscale'
                ? `invert(1) ${logoFilter}`
                : logoFilter,
          }}
        />
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
          <Typography variant='h3' style={headingStyle}>
            About
          </Typography>
          <StyledLink href='/about'>About Us</StyledLink>
          <StyledLink href='/fluxline-ethos'>Fluxline Ethos</StyledLink>
          <StyledLink href='/case-studies'>Case Studies</StyledLink>
          <StyledLink href='/press-release'>Press Releases</StyledLink>
          {/* <StyledLink href='/cue-cards'>Cue Cards</StyledLink> */}
        </div>

        {/* Services Column */}
        <div style={columnStyle}>
          <Typography variant='h3' style={headingStyle}>
            Services
          </Typography>
          <StyledLink href='/services'>All Services</StyledLink>
          <StyledLink href='/services/resonance-core'>
            The Resonance Core Framework™
          </StyledLink>
          <StyledLink href='/services/personal-training'>
            Personal Training
          </StyledLink>
          <StyledLink href='/services/design'>Design</StyledLink>
          <StyledLink href='/services/development'>Development</StyledLink>
          <StyledLink href='/services/consulting'>Consulting</StyledLink>
        </div>

        {/* Resources Column */}
        <div style={columnStyle}>
          <Typography variant='h3' style={headingStyle}>
            Resources
          </Typography>
          <StyledLink href='/blog'>Blog</StyledLink>
          <StyledLink href='/portfolio'>Portfolio</StyledLink>
          <StyledLink href='/content'>Content Hub</StyledLink>
          <StyledLink href='/services/scrolls'>Scrolls</StyledLink>
          <StyledLink href='/legal'>Legal</StyledLink>
          <StyledLink href='/contact'>Contact Us</StyledLink>
        </div>
      </div>

      {/* Contact Information */}
      <div style={columnStyle}>
        <div style={contactInfoStyle}>
          <Typography
            variant='h3'
            style={{ ...headingStyle, marginBottom: '1rem' }}
          >
            Get in Touch
          </Typography>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={iconStyle}>📍</span>
            <span style={{ color: getFooterTextColor(themeMode) }}>
              Salt Lake City, Utah
            </span>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={iconStyle}>🔗</span>
            <StyledLink href='https://www.fluxline.pro'>
              www.fluxline.pro
            </StyledLink>
          </div>
          <div>
            <span style={iconStyle}>✉️</span>
            <StyledLink
              href='https://outlook.office.com/book/Bookings@terencewaters.com/?ismsaljsauthenabled'
              openInNewTab={true}
            >
              Book an appointment
            </StyledLink>
          </div>
        </div>
      </div>

      {/* Newsletter Sign-up */}
      <FooterNewsletterSignup />
    </footer>
  );
};

export default HomeFooter;
