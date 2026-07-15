'use client';

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
  socialLinks: SocialLinksData;
  name: string;
  size?: 'small' | 'medium';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  socialLinks,
  name,
  size = 'small',
}) => {
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
    e.currentTarget.style.backgroundColor =
      'var(--fx-surface-hover, var(--fx-border))';
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
            style={{
              width: svgIconSize,
              height: svgIconSize,
            }}
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
          </svg>
        </Link>
      )}
    </div>
  );
};