import { Metadata } from 'next';
import TermsClientPage from './TermsClientPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for Fluxline Resonance Group, LLC (Fluxline). Learn about our service terms, user responsibilities, and legal agreements.',
  keywords:
    'terms of use, terms and conditions, legal, service agreement, Fluxline',
  openGraph: {
    title: 'Terms of Use - Fluxline',
    description:
      'Terms of Use for Fluxline Resonance Group, LLC (Fluxline). Learn about our service terms, user responsibilities, and legal agreements.',
    url: 'https://www.fluxline.pro/legal/terms',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Use - Fluxline',
    description:
      'Terms of Use for Fluxline Resonance Group, LLC (Fluxline). Learn about our service terms, user responsibilities, and legal agreements.',
    creator: '@fluxlinepro',
  },
  alternates: {
    canonical: '/legal/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  return <TermsClientPage />;
}
