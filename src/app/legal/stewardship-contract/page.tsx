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
    title: 'Stewardship Contract - Fluxline',
    description:
      'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy.',
    url: 'https://www.fluxline.pro/legal/stewardship-contract',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Stewardship Contract - Fluxline',
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
