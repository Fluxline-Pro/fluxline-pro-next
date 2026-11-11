import React from 'react';
import { Metadata } from 'next';
import PersonalTrainingWaiverClientPage from './PersonalTrainingWaiverClientPage';

export const metadata: Metadata = {
  title: 'Personal Training Waiver',
  description:
    'Informed Consent, Assumption of Risk, and Liability Waiver for Fluxline personal training and wellness clients.',
  keywords:
    'personal training waiver, liability release, informed consent, assumption of risk, Fluxline',
  openGraph: {
    title: 'Personal Training Waiver - Fluxline',
    description:
      'Informed Consent, Assumption of Risk, and Liability Waiver for Fluxline personal training and wellness clients.',
    url: 'https://www.fluxline.pro/legal/personal-training-waiver',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Personal Training Waiver - Fluxline',
    description:
      'Informed Consent, Assumption of Risk, and Liability Waiver for Fluxline personal training and wellness clients.',
  },
  alternates: {
    canonical: '/legal/personal-training-waiver',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PersonalTrainingWaiverPage() {
  return <PersonalTrainingWaiverClientPage />;
}
