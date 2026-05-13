import type { Metadata } from 'next';
import { PodcastListingClient } from './PodcastListingClient';

export const metadata: Metadata = {
  title: 'Podcasts',
  description:
    'The Resonant Identity — a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
  keywords:
    'podcast, audio, The Resonant Identity, Fluxline, transformation, strategy, identity, authenticity, mental health, self-help, self-improvement, personal development, Apple Podcasts, Spotify, Amazon Music, Deezer, Podchaser, Spreaker',
  openGraph: {
    title: 'Podcasts - Fluxline',
    description:
      'The Resonant Identity — a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
    url: 'https://www.fluxline.pro/podcasts',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/TheResonantIdentity_Logo.png',
        width: 2048,
        height: 2048,
        alt: 'The Resonant Identity Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcasts - Fluxline',
    description:
      'The Resonant Identity — a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
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
 * Renders the podcast listing client component which fetches episodes at runtime
 */
export default function PodcastsPage() {
  return <PodcastListingClient />;
}
