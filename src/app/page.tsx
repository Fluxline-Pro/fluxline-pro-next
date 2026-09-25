import type { Metadata } from 'next';
import HomeClient from './HomeClient';

const TITLE =
  'Fluxline Resonance Group | Consulting, Coaching & The Resonance Core Framework™';
const DESCRIPTION =
  'Fluxline Resonance Group offers consulting, coaching, and identity systems work through The Resonance Core Framework™ — helping founders, leaders, and creatives build congruence between who they are and what they build.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.fluxline.pro/',
    siteName: 'Fluxline Resonance Group',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Resonance Group Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/FluxlineLogo.png'],
    creator: '@fluxlineco',
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeClient />;
}
