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
      'The agreement for using Fluxline: accounts, purchases, subscriptions, refunds, the RCF AI Companion, and how disputes are handled.',
    href: '/legal/terms',
  },
  {
    id: 'preorder-terms',
    title: 'RCF Preorder Terms',
    description:
      'Exactly what happens when you preorder The Resonance Core Framework™: when you are charged, how to cancel, what you receive on release day, and what happens if the date moves.',
    href: '/legal/preorder-terms',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description:
      'What we collect, what we do not keep, and the choices that are yours. We keep as little as we can.',
    href: '/legal/privacy-policy',
  },
  {
    id: 'ai',
    title: 'Responsible AI Usage',
    description:
      'How we use AI in our work and in our products, who is accountable, and what AI will never do here.',
    href: '/legal/responsible-ai-usage',
  },
  {
    id: 'stewardship',
    title: 'Stewardship Charter',
    description:
      'The standards we hold ourselves to with clients, readers, and app users: plain pricing, easy cancellation, honest timing, and care with your trust.',
    href: '/legal/stewardship-charter',
  },
  {
    id: 'personal-training-waiver',
    title: 'Personal Training Waiver',
    description:
      'Informed Consent, Assumption of Risk, and Liability Waiver for personal training and wellness clients.',
    href: '/legal/personal-training-waiver',
  },
  {
    id: 'glossary',
    title: 'Glossary of Terms',
    description:
      'The vocabulary of the Fluxline ecosystem.',
    href: '/legal/glossary',
  },
  {
    id: 'articles',
    title: 'Articles of Conversion (PDF)',
    description:
      'Our formal organizational document.',
    href: '/legal/articles-of-conversion',
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
          subhead='Everything about how we work with you, in the open. Last reviewed November 20, 2026. Questions? support@fluxline.pro.'
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
