'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { ContentNotFound } from '@/components/ContentNotFound';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { format } from 'date-fns';
import type { PressRelease } from '@/store/mock-data/pressReleaseMock';
import type { SocialLinksData } from '@/app/about/components/SocialLinks';

interface PressReleaseDetailClientProps {
  pressRelease: PressRelease | undefined;
}

// Terence Waters' social links
const TERENCE_SOCIAL_LINKS: SocialLinksData = {
  linkedin: 'https://linkedin.com/in/terencewaters',
  instagram: 'https://instagram.com/aplusinflux',
  github: 'https://github.com/aplusandminus',
  email: 'terence@fluxline.pro',
};

/**
 * Press Release Detail Client Component
 * Handles all client-side interactions using UnifiedContentDetail
 */
export function PressReleaseDetailClient({
  pressRelease,
}: PressReleaseDetailClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();

  if (!pressRelease) {
    return (
      <ContentNotFound
        title='Press Release Not Found'
        message='The requested press release could not be found.'
        backButton={{
          label: '← Back to Press Releases',
          url: '/press-release',
        }}
      />
    );
  }

  const config: UnifiedContentDetailConfig = {
    title: pressRelease.title,
    content:
      pressRelease.content ||
      `
      <p>This is the full content of the press release.</p>
      <p>Press release content would typically include detailed information about announcements, 
      partnerships, product launches, company news, or other significant developments.</p>
      <p>The content can contain HTML formatting, images, and other media references to provide 
      a comprehensive view of the news being shared.</p>
    `,
    contentType: 'html',
    excerpt: pressRelease.subtitle || pressRelease.description,
    backLink: {
      url: '/press-release',
      label: 'Back to Press Releases',
    },
    imageConfig: pressRelease.imageUrl
      ? {
          source: pressRelease.imageUrl,
          alt: pressRelease.imageAlt || pressRelease.title,
          title: pressRelease.title,
          showTitle: false,
        }
      : undefined,
    authorInfo: pressRelease.author
      ? {
          name: pressRelease.author,
          publishDate: format(pressRelease.date, 'MMMM d, yyyy'),
          socialLinks:
            pressRelease.author === 'Terence Waters'
              ? TERENCE_SOCIAL_LINKS
              : undefined,
        }
      : undefined,
    metadata: !pressRelease.author
      ? [
          {
            label: '',
            value: format(pressRelease.date, 'MMMM d, yyyy'),
          },
        ]
      : undefined,
    badges: [
      ...(pressRelease.category
        ? [{ label: pressRelease.category, variant: 'primary' as const }]
        : []),
      ...(pressRelease.tags || []).map((tag) => ({
        label: `#${tag}`,
        variant: 'secondary' as const,
      })),
    ],
  };

  return <UnifiedContentDetail config={config} />;
}
