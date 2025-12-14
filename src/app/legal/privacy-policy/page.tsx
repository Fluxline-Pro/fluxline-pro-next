import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicyClientPage from './PrivacyPolicyClientPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Fluxline. Learn how we collect, use, and protect your personal information.',
  keywords:
    'privacy policy, data protection, GDPR, CCPA, privacy, personal information, Fluxline',
  openGraph: {
<<<<<<< HEAD
    title: 'Privacy Policy - Fluxline',
    description:
      'Learn how Fluxline collects, uses, and protects your personal information.',
    url: 'https://www.fluxline.pro/legal/privacy-policy',
    siteName: 'Fluxline',
=======
    title: 'Privacy Policy - Fluxline Professional Services',
    description:
      'Learn how Fluxline Professional Services collects, uses, and protects your personal information.',
    url: 'https://www.fluxline.pro/legal/privacy-policy',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    type: 'website',
  },
  twitter: {
    card: 'summary',
<<<<<<< HEAD
    title: 'Privacy Policy - Fluxline',
    description:
      'Learn how Fluxline collects, uses, and protects your personal information.',
    creator: '@fluxlinepro',
=======
    title: 'Privacy Policy - Fluxline Professional Services',
    description:
      'Learn how Fluxline Professional Services collects, uses, and protects your personal information.',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
  },
  alternates: {
    canonical: '/legal/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClientPage />;
}
