import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicyClientPage from './PrivacyPolicyClientPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Fluxline Professional Services. Learn how we collect, use, and protect your personal information.',
  keywords:
    'privacy policy, data protection, GDPR, CCPA, privacy, personal information, Fluxline',
  openGraph: {
    title: 'Privacy Policy - Fluxline Professional Services',
    description:
      'Learn how Fluxline Professional Services collects, uses, and protects your personal information.',
    url: 'https://www.fluxline.pro/legal/privacy-policy',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Fluxline Professional Services',
    description:
      'Learn how Fluxline Professional Services collects, uses, and protects your personal information.',
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
