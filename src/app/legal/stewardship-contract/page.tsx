import React from 'react';
import { Metadata } from 'next';
import StewardshipContractClientPage from './StewardshipContractClientPage';

export const metadata: Metadata = {
  title: 'Stewardship Contract',
  description:
    'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy and client relationship values.',
  keywords:
    'stewardship, ethics, professional conduct, client rights, service commitment, Fluxline',
  openGraph: {
<<<<<<< HEAD
    title: 'Stewardship Contract - Fluxline',
    description:
      'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy.',
    url: 'https://www.fluxline.pro/legal/stewardship-contract',
    siteName: 'Fluxline',
=======
    title: 'Stewardship Contract - Fluxline Professional Services',
    description:
      'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy.',
    url: 'https://www.fluxline.pro/legal/stewardship-contract',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    type: 'website',
  },
  twitter: {
    card: 'summary',
<<<<<<< HEAD
    title: 'Stewardship Contract - Fluxline',
=======
    title: 'Stewardship Contract - Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    description:
      'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy.',
  },
  alternates: {
    canonical: '/legal/stewardship-contract',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StewardshipContractPage() {
  return <StewardshipContractClientPage />;
}
