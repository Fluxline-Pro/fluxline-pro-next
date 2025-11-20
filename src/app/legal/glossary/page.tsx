import React from 'react';
import { Metadata } from 'next';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import GlossaryLandingClient from './GlossaryLandingClient';

export const metadata: Metadata = {
  title: 'Glossary of Terms - Fluxline Professional Services',
  description:
    'Comprehensive glossary covering both mythic architecture terminology and technical/professional terms used by Fluxline Professional Services.',
  keywords:
    'glossary, terminology, definitions, mythic terms, technical terms, business terms, Fluxline',
};

export default function GlossaryPage() {
  return (
    <UnifiedPageWrapper layoutType='viewport-grid'>
      <GlossaryLandingClient />
    </UnifiedPageWrapper>
  );
}
