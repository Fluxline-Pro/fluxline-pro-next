import type { Metadata } from 'next';
import { PodcastListingClient } from './PodcastListingClient';

export const metadata: Metadata = {
  title: 'Podcasts',
  description:
    '"A+ In FLUX Mythmaker" — audio episodes covering transformation, strategy, and personal development by Fluxline.',
  keywords:
    'podcast, audio, A+ In FLUX Mythmaker, Fluxline, transformation, strategy, personal development, Apple Podcasts, Spotify, Amazon Music, Deezer, Podchaser, Spreaker',
  openGraph: {
    title: 'Podcasts - Fluxline',
    description:
      '"A+ In FLUX Mythmaker" — audio episodes covering transformation, strategy, and personal development.',
    url: 'https://www.fluxline.pro/podcasts',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'A+ In FLUX Mythmaker Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcasts - Fluxline',
    description:
      '"A+ In FLUX Mythmaker" — audio episodes covering transformation, strategy, and personal development.',
    images: ['/images/FluxlineLogo.png'],
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
