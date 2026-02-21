import type { Metadata } from 'next';
import { VideoListingClient } from './VideoListingClient';

export const metadata: Metadata = {
  title: 'Video',
  description:
    'Watch videos from the @aplusinflux YouTube channel — tutorials, live streams, playlists, and more.',
  keywords:
    'video, YouTube, tutorials, live stream, playlists, Fluxline, aplusinflux, content',
  openGraph: {
    title: 'Video - Fluxline',
    description:
      'Watch videos from the @aplusinflux YouTube channel — tutorials, live streams, playlists, and more.',
    url: 'https://www.fluxline.pro/video',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Video',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video - Fluxline',
    description:
      'Watch videos from the @aplusinflux YouTube channel — tutorials, live streams, playlists, and more.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/video',
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
