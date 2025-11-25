'use client';

/**
 * SocialLinks Component
 * Reusable social media links with hover effects
 */

import React from 'react';
import Link from 'next/link';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { InstagramIcon } from '@/assets/svgs/InstagramLogo';

export interface SocialLinksData {
  linkedin?: string;
  instagram?: string;
  github?: string;
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
  const { theme } = useAppTheme();
  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  // Size configurations
  const buttonSize = size === 'small' ? '36px' : '48px';
  const iconSize = size === 'small' ? 'small' : 'medium';
  const instagramIconSize = size === 'small' ? '16px' : '24px';

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: buttonSize,
    height: buttonSize,
    borderRadius: '50%',
    backgroundColor: theme.palette.neutralLighter,
    transition: 'all 0.2s ease',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = isDark
      ? theme.palette.themeLighter
      : theme.palette.neutralQuaternaryAlt;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = theme.palette.neutralLighter;
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
          <FluentIcon
            iconName='LinkedInLogo'
            size={iconSize}
            color={theme.palette.themePrimary}
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
              width: instagramIconSize,
              height: instagramIconSize,
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
          <FluentIcon
            iconName='GitGraph'
            size={iconSize}
            color={theme.palette.themePrimary}
          />
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
          <FluentIcon
            iconName='Mail'
            size={iconSize}
            color={theme.palette.themePrimary}
          />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
