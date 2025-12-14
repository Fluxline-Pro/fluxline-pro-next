import { Metadata } from 'next';
import TermsClientPage from './TermsClientPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for Fluxline Resonance Group, LLC (Fluxline). Learn about our service terms, user responsibilities, and legal agreements.',
  keywords:
    'terms of use, terms and conditions, legal, service agreement, Fluxline',
  openGraph: {
<<<<<<< HEAD
    title: 'Terms of Use - Fluxline',
    description:
      'Terms of Use for Fluxline Resonance Group, LLC (Fluxline). Learn about our service terms, user responsibilities, and legal agreements.',
    url: 'https://www.fluxline.pro/legal/terms',
    siteName: 'Fluxline',
=======
    title: 'Terms of Use - Fluxline Professional Services',
    description:
      'Terms of Use for Fluxline Professional Services. Learn about our service terms and legal agreements.',
    url: 'https://www.fluxline.pro/legal/terms',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    type: 'website',
  },
  twitter: {
    card: 'summary',
<<<<<<< HEAD
    title: 'Terms of Use - Fluxline',
    description:
      'Terms of Use for Fluxline Resonance Group, LLC (Fluxline). Learn about our service terms, user responsibilities, and legal agreements.',
    creator: '@fluxlinepro',
=======
    title: 'Terms of Use - Fluxline Professional Services',
    description:
      'Terms of Use for Fluxline Professional Services. Learn about our service terms and legal agreements.',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
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
