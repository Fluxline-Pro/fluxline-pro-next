import React from 'react';
import { Metadata } from 'next';
import StewardshipCharterClientPage from './StewardshipCharterClientPage';

export const metadata: Metadata = {
  title: 'Stewardship Charter',
  description:
    'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy and client relationship values.',
  keywords:
    'stewardship, ethics, professional conduct, client rights, service commitment, Fluxline',
  openGraph: {
    title: 'Stewardship Charter - Fluxline',
    description:
      'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy.',
    url: 'https://www.fluxline.pro/legal/stewardship-charter',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Stewardship Charter - Fluxline',
    description:
      'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy.',
  },
  alternates: {
    canonical: '/legal/stewardship-charter',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StewardshipCharterPage() {
  return <StewardshipCharterClientPage />;
}
