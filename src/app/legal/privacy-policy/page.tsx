import React from 'react';
import { Metadata } from 'next';
import PrivacyPolicyClientPage from './PrivacyPolicyClientPage';

export const metadata: Metadata = {
  title: 'Privacy Policy - Fluxline Professional Services',
  description:
    'Privacy Policy for Fluxline Professional Services. Learn how we collect, use, and protect your personal information.',
  keywords:
    'privacy policy, data protection, GDPR, CCPA, privacy, personal information, Fluxline',
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClientPage />;
}
