import { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Legal & Reference',
  description:
    'Access legal documents and reference materials for Fluxline Resonance Group, including terms of use, privacy policy, stewardship contract, and glossary.',
  keywords:
    'legal documents, terms of use, privacy policy, stewardship contract, glossary, legal compliance, Fluxline',
  openGraph: {
    title: 'Legal & Reference - Fluxline Resonance Group',
    description:
      'Access legal documents and reference materials for Fluxline Resonance Group.',
    url: 'https://www.fluxline.pro/legal',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Legal & Reference - Fluxline Resonance Group',
    description:
      'Access legal documents and reference materials for Fluxline Resonance Group.',
    creator: '@fluxlinepro',
  },
  alternates: {
    canonical: '/legal',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Legal Landing Page
 *
 * Provides access to all legal documents and reference materials
 * for the Fluxline Resonance Group
 */
export default function LegalPage() {
  return <LegalPageClient />;
}
