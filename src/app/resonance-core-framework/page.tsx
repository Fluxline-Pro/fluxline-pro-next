import React from 'react';
import type { Metadata } from 'next';
import ResonanceCoreFrameworkClient from './ResonanceCoreFrameworkClient';
import { safeJsonLdStringify } from '@/utils/jsonLd';
import { RCF_CONCEPTS, RCF_FAQ, RCF_FRAMEWORK_PATH } from '@/lib/resonanceCore';

const PAGE_URL = `https://www.fluxline.pro${RCF_FRAMEWORK_PATH}`;
const TITLE = 'The Resonance Core Framework™ | Fluxline Resonance Group';
const DESCRIPTION =
  'The complete reference for The Resonance Core Framework™ by Terence Waters: every concept, the DRIVE Model, the six core values, and how to work with it.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords:
    'Resonance Core Framework, RCF coaching, identity alignment coaching, Resonance Core Framework consulting, Behavioral Gravity, Identity Coherence, Window of Choice, DRIVE System, Creative Truth, DII Protocol, Decision Integrity Index, Decision Alignment Score, Terence Waters, Fluxline Resonance Group',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Fluxline Resonance Group',
    type: 'website',
    images: [
      {
        url: '/images/RCF_Logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'The Resonance Core Framework™',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/RCF_Logo.jpeg'],
  },
  alternates: {
    canonical: RCF_FRAMEWORK_PATH,
  },
};

/** Breadcrumb + FAQ structured data, specific to this page. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.fluxline.pro/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'The Resonance Core Framework™',
          item: PAGE_URL,
        },
      ],
    },
    {
      // This page is the canonical glossary for the RCF's named concepts.
      '@type': 'DefinedTermSet',
      '@id': `${PAGE_URL}#terms`,
      name: 'The Resonance Core Framework™ — Core Concepts',
      url: PAGE_URL,
      hasDefinedTerm: RCF_CONCEPTS.map((c) => ({
        '@type': 'DefinedTerm',
        '@id': `${PAGE_URL}#${c.id}`,
        name: c.name,
        description: c.body,
        url: `${PAGE_URL}#${c.id}`,
        inDefinedTermSet: `${PAGE_URL}#terms`,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: RCF_FAQ.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
};

export default function ResonanceCoreFrameworkPage() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
      />
      <ResonanceCoreFrameworkClient />
    </>
  );
}
