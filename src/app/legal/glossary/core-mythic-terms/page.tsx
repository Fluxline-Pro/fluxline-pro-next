import { Metadata } from 'next';
import CoreMythicTermsClient from './CoreMythicTermsClient';

export const metadata: Metadata = {
  title: 'Core Mythic Terms',
  description:
    "Comprehensive glossary of Fluxline's mythic architecture terminology, archetypal concepts, and ritual language.",
  keywords:
    'mythic terms, archetype, threshold, emotional ROI, resonance, Fluxline mythology, ritual language',
  openGraph: {
    title: 'Core Mythic Terms - Fluxline',
    description:
      "Comprehensive glossary of Fluxline's mythic architecture terminology and archetypal concepts.",
    url: 'https://www.fluxline.pro/legal/glossary/core-mythic-terms',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Core Mythic Terms - Fluxline Resonance Group',
    description:
      "Comprehensive glossary of Fluxline's mythic architecture terminology and archetypal concepts.",
  },
  alternates: {
    canonical: '/legal/glossary/core-mythic-terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CoreMythicTermsPage() {
  return <CoreMythicTermsClient />;
}
