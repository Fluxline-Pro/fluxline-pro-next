'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TheResonantIdentityLogo from '@/assets/images/TheResonantIdentity_Logo.png';
import { UnifiedPageWrapperProps } from '@/components/UnifiedPageWrapper';

interface PodcastPageWrapperProps {
  children: React.ReactElement<{
    imageConfig?: UnifiedPageWrapperProps['imageConfig'];
  }>;
}

/**
 * PodcastPageWrapper - Client Component
 * Wraps the podcasts page to provide clickable image functionality
 */
export function PodcastPageWrapper({ children }: PodcastPageWrapperProps) {
  const router = useRouter();

  const handleImageClick = () => {
    router.push('/podcasts/theresonantid/about');
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
