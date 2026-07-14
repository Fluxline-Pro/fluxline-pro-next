import type { Metadata } from 'next';
import { PodcastListingClient } from './PodcastListingClient';

export const metadata: Metadata = {
  title: 'Podcasts',
  description:
    'Long-form audio exploring identity, technology, and transformation. Discover The Resonant Identity podcast and more.',
  keywords:
    'podcast, audio, The Resonant Identity, Fluxline, transformation, strategy, identity, authenticity, mental health, self-help, self-improvement, personal development',
  openGraph: {
    title: 'Podcasts - Fluxline',
    description:
      'Long-form audio exploring identity, technology, and transformation. Discover The Resonant Identity podcast and more.',
    url: 'https://www.fluxline.pro/podcasts',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/TheResonantIdentity_Logo.png',
        width: 2048,
        height: 2048,
        alt: 'Podcasts Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcasts - Fluxline',
    description:
      'Long-form audio exploring identity, technology, and transformation.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Podcasts Page - Server Component
 * Shows The Resonant Identity podcast directory and episodes
 */
export default function PodcastsPage() {
  return <PodcastListingClient />;
}
