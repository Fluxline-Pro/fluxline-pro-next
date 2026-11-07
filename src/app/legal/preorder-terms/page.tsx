import React from 'react';
import { Metadata } from 'next';
import PreorderTermsClientPage from './PreorderTermsClientPage';

export const metadata: Metadata = {
  title: 'RCF Preorder Terms',
  description:
    'Exactly what happens when you preorder The Resonance Core Framework: charges, cancellation, delivery, and delay rules.',
  keywords:
    'preorder terms, RCF preorder, refund policy, Resonance Core Framework, Fluxline',
  openGraph: {
    title: 'RCF Preorder Terms - Fluxline',
    description:
      'Exactly what happens when you preorder The Resonance Core Framework: charges, cancellation, delivery, and delay rules.',
    url: 'https://www.fluxline.pro/legal/preorder-terms',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'RCF Preorder Terms - Fluxline',
    description:
      'Exactly what happens when you preorder The Resonance Core Framework: charges, cancellation, delivery, and delay rules.',
  },
  alternates: {
    canonical: '/legal/preorder-terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PreorderTermsPage() {
  return <PreorderTermsClientPage />;
}
