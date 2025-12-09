'use client';

import React from 'react';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { ContentNotFound } from '@/components/ContentNotFound';
import { format } from 'date-fns';
import type { PressRelease } from '../types';
import { TERENCE_SOCIAL_LINKS } from '@/app/about/constants';

interface PressReleaseDetailClientProps {
  pressRelease: PressRelease | null;
}

/**
 * Press Release Detail Client Component
 * Handles all client-side interactions using UnifiedContentDetail
 */
export function PressReleaseDetailClient({
  pressRelease,
}: PressReleaseDetailClientProps) {
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
    content: pressRelease.content,
    contentType: 'markdown',
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
          gallery: pressRelease.gallery,
        }
      : {
          source: '/images/home/FluxlineLogo.png',
          alt: 'Default Press Release Image',
          title: pressRelease.title,
          showTitle: false,
        },
    authorInfo: pressRelease.author
      ? {
          name: pressRelease.author,
          publishDate: format(pressRelease.publishedDate, 'MMMM d, yyyy'),
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
            value: format(pressRelease.publishedDate, 'MMMM d, yyyy'),
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
