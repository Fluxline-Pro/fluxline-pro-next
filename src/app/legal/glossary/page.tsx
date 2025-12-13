import React from 'react';
import { Metadata } from 'next';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import GlossaryLandingClient from './GlossaryLandingClient';

export const metadata: Metadata = {
  title: 'Glossary of Terms',
  description:
    'Comprehensive glossary covering both mythic architecture terminology and technical/professional terms used by Fluxline Professional Services.',
  keywords:
    'glossary, terminology, definitions, mythic terms, technical terms, business terms, Fluxline',
  openGraph: {
    title: 'Glossary of Terms - Fluxline Professional Services',
    description:
      'Comprehensive glossary covering mythic architecture terminology and technical/professional terms.',
    url: 'https://www.fluxline.pro/legal/glossary',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Glossary of Terms - Fluxline Professional Services',
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
  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <GlossaryLandingClient />
    </UnifiedPageWrapper>
  );
}
