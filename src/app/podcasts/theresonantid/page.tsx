import type { Metadata } from 'next';
import { TheResonantIdentityPage } from './TheResonantIdentityPage';

export const metadata: Metadata = {
  title: 'About The Resonant Identity',
  description:
    'The Resonant Identity is a space for identity transformation, micro-lessons, and applied resonance — extending the Resonance Core Framework into a living, accessible practice.',
  keywords:
    'The Resonant Identity, TRI, identity transformation, resonance, micro-lessons, 7-day setup, identity practice, Resonance Core Framework, community, Facebook Group, Terence Waters, Fluxline',
  openGraph: {
    title: 'About The Resonant Identity — Fluxline',
    description:
      'A living extension of the Resonance Core Framework — where identity becomes practice. Explore micro-lessons, the 7-day setup, and the TRI community.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/TheResonantIdentity_Logo.png',
        width: 2048,
        height: 2048,
        alt: 'The Resonant Identity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Resonant Identity — Fluxline',
    description:
      'A living extension of the Resonance Core Framework — where identity becomes practice.',
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
 * The Resonant Identity — About Page
 * URL: /podcasts/theresonantid
 */
export default function TheResonantIdentityAboutPage() {
  return <TheResonantIdentityPage />;
}
