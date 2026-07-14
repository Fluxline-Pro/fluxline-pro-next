'use client';

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxContentGrid from '@/theme/components/dsm/FxContentGrid';
import FxArticleCard from '@/theme/components/dsm/FxArticleCard';

interface LegalDocument {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
}

const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'terms',
    title: 'Terms of Use',
    description:
      'Review the terms and conditions governing your use of the Fluxline pro website and services.',
    href: '/legal/terms',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description:
      'Learn how we collect, use, and protect your personal information.',
    href: '/legal/privacy-policy',
  },
  {
    id: 'stewardship',
    title: 'Stewardship Contract',
    description:
      'Explore the foundational principles and commitments that guide our client relationships.',
    href: '/legal/stewardship-contract',
  },
  {
    id: 'glossary',
    title: 'Glossary of Terms',
    description:
      'Understand key concepts, methodologies, and terminology used throughout Fluxline.',
    href: '/legal/glossary',
  },
  {
    id: 'articles',
    title: 'Articles of Conversion',
    description:
      'View or download the official Articles of Conversion document (PDF).',
    href: '/legal/articles-of-conversion',
  },
  {
    id: 'ai',
    title: 'Responsible AI Usage',
    description:
      'Learn how we use AI tools responsibly, transparently, and with full human accountability across our content and services.',
    href: '/legal/responsible-ai-usage',
  },
];

/**
 * Legal Landing Page Client Component
 *
 * Provides access to all legal documents and reference materials
 * for the Fluxline Resonance Group
 */
export default function LegalPageClient() {
  return (
    <FxContainer
      as='section'
      style={{
        padding: '64px 32px 88px',
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1220px' }}>
        <FxSectionHeading
          kicker='Legal'
          title='Legal &amp; Reference'
          subhead='Access important legal documents and reference materials for the Fluxline Resonance Group.'
          as='h1'
          style={{ marginBottom: 36 }}
        />

        <FxContentGrid>
          {LEGAL_DOCUMENTS.map((doc) => (
            <FxArticleCard
              key={doc.id}
              title={doc.title}
              excerpt={doc.description}
              href={doc.href}
            />
          ))}
        </FxContentGrid>
      </div>
    </FxContainer>
  );
}
