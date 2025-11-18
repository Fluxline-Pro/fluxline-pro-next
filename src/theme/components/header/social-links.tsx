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
import { MicrosoftLogo } from '@/assets/svgs/MicrosoftLogo';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  ariaLabel: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/fluxlinepro',
    icon: FacebookIcon,
    ariaLabel: 'Visit our Facebook page',
  },
  {
    name: 'Threads',
    url: 'https://threads.net/@fluxlinepro',
    icon: ThreadsIcon,
    ariaLabel: 'Follow us on Threads',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/fluxlinepro',
    icon: InstagramIcon,
    ariaLabel: 'Follow us on Instagram',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@fluxlinepro',
    icon: YouTubeLogo,
    ariaLabel: 'Subscribe to our YouTube channel',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/fluxlinepro',
    icon: LinkedInIcon,
    ariaLabel: 'Connect with us on LinkedIn',
  },
  {
    name: 'Microsoft',
    url: 'mailto:support@fluxline.pro',
    icon: MicrosoftLogo,
    ariaLabel: 'Email us at support@fluxline.pro',
  },
];

export const SocialLinks: React.FC = () => {
  const { theme } = useAppTheme();

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
        return (
          <a
            key={social.name}
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
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            <IconComponent
              style={{
                width: '32px',
                height: '32px',
              }}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
