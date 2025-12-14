'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceOrientation } from '../../../hooks/useMediaQuery';
import { Typography } from '../../typography';

/**
 * HomeFooter Component
 *
 * Footer specifically for the home page, displayed only on desktop and widescreen tablet.
 * Features company logo, navigation links, and contact information.
 */

export const StyledLink: React.FC<{
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
}> = ({ href, children, openInNewTab }) => {  
  const { theme } = useAppTheme();

  const linkStyle: React.CSSProperties = {
    color: theme.palette.neutralSecondary,
    fontSize: '0.875rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.palette.themePrimary;
    e.currentTarget.style.textDecoration = 'underline';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = theme.palette.neutralSecondary;
    e.currentTarget.style.textDecoration = 'none';
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
          src='/images/home/FluxlineLogoHomePage.png'
          alt='Fluxline Logo'
          width={200}
          height={60}
          style={{ objectFit: 'contain' }}
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
          <StyledLink href='/services/design'>Design</StyledLink>
          <StyledLink href='/services/web-development'>Development</StyledLink>
          <StyledLink href='/services/personal-training'>
            Personal Training
          </StyledLink>
          <StyledLink href='/services/life-coaching'>Life Coaching</StyledLink>
          <StyledLink href='/services/consulting'>Consulting</StyledLink>
        </div>

        {/* Resources Column */}
        <div style={columnStyle}>
          <Typography variant='h3' style={headingStyle}>
            Resources
          </Typography>
          <StyledLink href='/blog'>Blog</StyledLink>
          <StyledLink href='/portfolio'>Portfolio</StyledLink>
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
            Salt Lake City, Utah
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={iconStyle}>🔗</span>
            <StyledLink href='https://www.fluxline.pro'>
              www.fluxline.pro
            </StyledLink>
          </div>
          <div>
            <span style={iconStyle}>✉️</span>
            <StyledLink href='https://outlook.office.com/book/Bookings@terencewaters.com/?ismsaljsauthenabled' openInNewTab={true}>
              Book an appointment
            </StyledLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
