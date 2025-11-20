'use client';

/**
 * SocialLinks Component
 * Social media links for the navigation menu footer
 */

import React from 'react';

import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { FacebookIcon } from '@/assets/svgs/FacebookLogo';
import { InstagramIcon } from '@/assets/svgs/InstagramLogo';
import { LinkedInIcon } from '@/assets/svgs/LinkedInLogo';
import { ThreadsIcon } from '@/assets/svgs/ThreadsLogo';
import { YouTubeLogo } from '@/assets/svgs/YouTubeLogo';
import { EmailLogo } from '@/assets/svgs/EmailLogo';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  ariaLabel: string;
}

// Social links are correct as of November 2025
const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/fluxline',
    icon: FacebookIcon,
    ariaLabel: 'Visit our Facebook page',
  },
  {
    name: 'Threads',
    url: 'https://threads.net/@fluxlineco',
    icon: ThreadsIcon,
    ariaLabel: 'Follow us on Threads',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/fluxlineco',
    icon: InstagramIcon,
    ariaLabel: 'Follow us on Instagram',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/TerenceWaters',
    icon: YouTubeLogo,
    ariaLabel: 'Subscribe to our YouTube channel',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/terencewaters',
    icon: LinkedInIcon,
    ariaLabel: 'Connect with us on LinkedIn',
  },
  {
    name: 'Email',
    url: 'mailto:support' + '@' + 'fluxline.pro',
    icon: EmailLogo,
    ariaLabel: 'Email us at support [at] fluxline.pro',
  },
];

export const SocialLinks: React.FC = () => {
  const { theme } = useAppTheme();
  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {SOCIAL_LINKS.map((social) => {
        const IconComponent = social.icon;
        const isHovered = hoveredIcon === social.name;
        return (
          <div
            key={social.name}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <a
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={social.ariaLabel}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                textDecoration: 'none',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                opacity: isHovered ? 0.8 : 1,
              }}
              onMouseEnter={() => setHoveredIcon(social.name)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <IconComponent
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </a>

            {/* Tooltip */}
            <div
              style={{
                position: 'absolute',
                top: '90%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'transparent',
                color: theme.palette.themePrimary,
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                opacity: isHovered ? 1 : 0,
                visibility: isHovered ? 'visible' : 'hidden',
                transition: 'opacity 0.2s ease, visibility 0.2s ease',
                pointerEvents: 'none',
                zIndex: 1000,
                paddingTop: '0',
              }}
            >
              {social.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SocialLinks;
