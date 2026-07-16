import type { Metadata } from 'next';
import { VideoListingClient } from './VideoListingClient';

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Watch videos from the @TheResonantIdentity, @TerenceRWaters, and @fluxlinepro YouTube channels — tutorials, live streams, playlists, and more.',
  keywords:
    'videos, YouTube, tutorials, live stream, playlists, Fluxline, TheResonantIdentity, TerenceRWaters, fluxlinepro, content',
  openGraph: {
    title: 'Videos - Fluxline',
    description:
      'Watch videos from the @TheResonantIdentity, @TerenceRWaters, and @fluxlinepro YouTube channels — tutorials, live streams, playlists, and more.',
    url: 'https://www.fluxline.pro/videos',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videos - Fluxline',
    description:
      'Watch videos from the @TheResonantIdentity, @TerenceRWaters, and @fluxlinepro YouTube channels — tutorials, live streams, playlists, and more.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/videos',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Video Page - Server Component
 * Renders the video listing client component
 */
export default function VideoPage() {
  return <VideoListingClient />;
}
