'use client';

/**
 * SocialLinks Component
 * Reusable social media links with hover effects
 */

import React from 'react';
import Link from 'next/link';
import { InstagramIcon } from '@/assets/svgs/InstagramLogo';
import { FacebookIcon } from '@/assets/svgs/FacebookLogo';
import { GitHubLogo } from '@/assets/svgs/GitHubLogo';
import { TwitterLogo } from '@/assets/svgs/TwitterLogo';
import { TiktokLogo } from '@/assets/svgs/TiktokLogo';
import { BlueSkyLogo } from '@/assets/svgs/BlueSkyLogo';
import { YouTubeLogo } from '@/assets/svgs/YouTubeLogo';

export interface SocialLinksData {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  github?: string;
  threads?: string;
  twitter?: string;
  bluesky?: string;
  youtube?: string;
  tiktok?: string;
  email?: string;
}

interface SocialLinksProps {
  /** Social media links */
  socialLinks: SocialLinksData;
  /** Name for aria-label */
  name: string;
  /** Size variant - affects icon size and button dimensions */
  size?: 'small' | 'medium';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  socialLinks,
  name,
  size = 'small',
}) => {
  // Size configurations
  const buttonSize = size === 'small' ? '36px' : '48px';
  const svgIconSize = size === 'small' ? '16px' : '24px';

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: buttonSize,
    height: buttonSize,
    borderRadius: '50%',
    backgroundColor: 'var(--fx-surface-card)',
    transition: 'all 0.2s ease',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--fx-surface-hover, var(--fx-border))';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = 'var(--fx-surface-card)';
  };

  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
      }}
    >
      {socialLinks.facebook && (
        <Link
          href={socialLinks.facebook}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on Facebook`}
        >
          <FacebookIcon
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
          />
        </Link>
      )}
      {socialLinks.instagram && (
        <Link
          href={socialLinks.instagram}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on Instagram`}
        >
          <InstagramIcon
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
          />
        </Link>
      )}
      {socialLinks.twitter && (
        <Link
          href={socialLinks.twitter}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on Twitter`}
        >
          <TwitterLogo
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
          />
        </Link>
      )}

      {socialLinks.bluesky && (
        <Link
          href={socialLinks.bluesky}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on Bluesky`}
        >
          <BlueSkyLogo
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
          />
        </Link>
      )}

      {socialLinks.tiktok && (
        <Link
          href={socialLinks.tiktok}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on TikTok`}
        >
          <TiktokLogo
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
          />
        </Link>
      )}

      {socialLinks.youtube && (
        <Link
          href={socialLinks.youtube}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on YouTube`}
        >
          <YouTubeLogo
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
          />
        </Link>
      )}

      {socialLinks.github && (
        <Link
          href={socialLinks.github}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on GitHub`}
        >
          <GitHubLogo
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
          />
        </Link>
      )}

      {socialLinks.linkedin && (
        <Link
          href={socialLinks.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`${name} on LinkedIn`}
        >
          <svg
            width={svgIconSize}
            height={svgIconSize}
            viewBox="0 0 24 24"
            fill="var(--fx-accent)"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </Link>
      )}

      {socialLinks.email && (
        <Link
          href={`mailto:${socialLinks.email}`}
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`Email ${name}`}
        >
          <svg
            width={svgIconSize}
            height={svgIconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--fx-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 7L2 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
