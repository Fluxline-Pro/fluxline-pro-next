import { Metadata } from 'next';
import GlossaryLandingClient from './GlossaryLandingClient';

export const metadata: Metadata = {
  title: 'Glossary of Terms',
  description:
    'Comprehensive glossary covering both mythic architecture terminology and technical/professional terms used by Fluxline Resonance Group.',
  keywords:
    'glossary, terminology, definitions, mythic terms, technical terms, business terms, Fluxline',
  openGraph: {
    title: 'Glossary of Terms - Fluxline Resonance Group',
    description:
      'Comprehensive glossary covering mythic architecture terminology and technical/professional terms.',
    url: 'https://www.fluxline.pro/legal/glossary',
    siteName: 'Fluxline Resonance Group',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Glossary of Terms - Fluxline Resonance Group',
    description:
      'Comprehensive glossary covering mythic architecture terminology and technical/professional terms.',
  },
  alternates: {
    canonical: '/legal/glossary',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GlossaryPage() {
  return <GlossaryLandingClient />;
}
