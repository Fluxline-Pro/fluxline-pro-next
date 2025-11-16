'use client';

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/fluxlinepro',
    icon: 'facebook-f',
    ariaLabel: 'Visit our Facebook page',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/fluxlinepro',
    icon: 'twitter',
    ariaLabel: 'Follow us on Twitter',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/fluxlinepro',
    icon: 'instagram',
    ariaLabel: 'Follow us on Instagram',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/fluxlinepro',
    icon: 'linkedin-in',
    ariaLabel: 'Connect with us on LinkedIn',
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
      }}
    >
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            color: theme.palette.neutralPrimary,
            transition: 'color 0.2s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.palette.themePrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = theme.palette.neutralPrimary;
          }}
        >
          {/* Using simple text icons for now - can be replaced with icon library */}
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {social.icon === 'facebook-f' && 'f'}
            {social.icon === 'twitter' && '𝕏'}
            {social.icon === 'instagram' && '📷'}
            {social.icon === 'linkedin-in' && 'in'}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
