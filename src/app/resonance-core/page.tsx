import React from 'react';
import type { Metadata } from 'next';
import ResonanceCoreClient from './ResonanceCoreClient';

export const metadata: Metadata = {
  title: 'The Resonance Core Framework™ | Fluxline',
  description:
    'What The Resonance Core Framework™ is: the premise, the DRIVE Model, what it is built on, and who it is for. A practical system for making change that holds — built on alignment rather than force.',
  keywords:
    'resonance core framework, RCF, DRIVE model, DRIVE alignment loop, resonance, identity, alignment, sustainable change, personal transformation, decision making, Terence Waters, Fluxline',
  openGraph: {
    title: 'The Resonance Core Framework™',
    description:
      'A practical system for making change that holds — built on alignment rather than force. The premise, the DRIVE Model, and who it is for.',
    url: 'https://www.fluxline.pro/resonance-core',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/RCF_Logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'The Resonance Core Framework™',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Resonance Core Framework™',
    description:
      'A practical system for making change that holds — built on alignment rather than force.',
    images: ['/images/RCF_Logo.jpeg'],
  },
  alternates: {
    canonical: '/resonance-core',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * /resonance-core — the canonical explanation of the framework.
 *
 * Distinct from /books (the publications built on it) and
 * /services/resonance-core (the guided engagement you can buy).
 */
export default function ResonanceCorePage() {
  return <ResonanceCoreClient />;
}
