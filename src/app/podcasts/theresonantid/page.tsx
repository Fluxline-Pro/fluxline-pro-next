import type { Metadata } from 'next';
import { PodcastListingClient } from '../PodcastListingClient';
import { PodcastPageWrapper } from '../PodcastPageWrapper';

export const metadata: Metadata = {
  title: 'The Resonant Identity Podcast',
  description:
    'The Resonant Identity — a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
  keywords:
    'podcast, audio, The Resonant Identity, Fluxline, transformation, strategy, identity, authenticity, mental health, self-help, self-improvement, personal development, Apple Podcasts, Spotify, Amazon Music, Deezer, Podchaser, Spreaker',
  openGraph: {
    title: 'The Resonant Identity Podcast — Fluxline',
    description:
      'A podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid',
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
    title: 'The Resonant Identity Podcast — Fluxline',
    description:
      'A podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts/theresonantid',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * The Resonant Identity Podcast Home Page
 * URL: /podcasts/theresonantid
 * Shows episodes, player, and platform links
 */
export default function TheResonantIdentityPodcastPage() {
  return (
    <PodcastPageWrapper>
      <PodcastListingClient />
    </PodcastPageWrapper>
  );
}
