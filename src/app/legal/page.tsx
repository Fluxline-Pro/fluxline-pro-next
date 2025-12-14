import { Metadata } from 'next';
import LegalPageClient from './LegalPageClient';

export const metadata: Metadata = {
  title: 'Legal & Reference',
  description:
    'Access legal documents and reference materials for Fluxline Resonance Group, including terms of use, privacy policy, stewardship contract, and glossary.',
  keywords:
    'legal documents, terms of use, privacy policy, stewardship contract, glossary, legal compliance, Fluxline',
  openGraph: {
<<<<<<< HEAD
    title: 'Legal & Reference - Fluxline Resonance Group',
    description:
      'Access legal documents and reference materials for Fluxline Resonance Group.',
    url: 'https://www.fluxline.pro/legal',
    siteName: 'Fluxline',
=======
    title: 'Legal & Reference - Fluxline Professional Services',
    description:
      'Access legal documents and reference materials for Fluxline Resonance Group.',
    url: 'https://www.fluxline.pro/legal',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    type: 'website',
  },
  twitter: {
    card: 'summary',
<<<<<<< HEAD
    title: 'Legal & Reference - Fluxline Resonance Group',
    description:
      'Access legal documents and reference materials for Fluxline Resonance Group.',
    creator: '@fluxlinepro',
=======
    title: 'Legal & Reference - Fluxline Professional Services',
    description:
      'Access legal documents and reference materials for Fluxline Resonance Group.',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
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
