'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TheResonantIdentityLogo from '@/assets/images/TheResonantIdentity_Logo.png';
import { UnifiedPageWrapperProps } from '@/components/UnifiedPageWrapper';

interface PodcastPageWrapperProps {
  // Allow any additional props so cloneElement only injects imageConfig
  // while preserving other props (e.g. triPosts) set by the parent page.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<Record<string, any>>;
}

/**
 * PodcastPageWrapper - Client Component
 * Wraps the podcasts page to provide clickable image functionality
 */
export function PodcastPageWrapper({ children }: PodcastPageWrapperProps) {
  const router = useRouter();

  const handleImageClick = () => {
    router.push('/podcasts');
  };

  const imageConfig: UnifiedPageWrapperProps['imageConfig'] = {
    source: TheResonantIdentityLogo.src,
    alt: 'The Resonant Identity Logo',
    title: '',
    showTitle: false,
    onClick: handleImageClick,
    enableHoverEffect: true,
  };

  // Clone the child element and inject the imageConfig prop
  return React.cloneElement(children, { imageConfig });
}
