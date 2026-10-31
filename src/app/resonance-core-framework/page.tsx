import React from 'react';
import type { Metadata } from 'next';
import ResonanceCoreFrameworkClient from './ResonanceCoreFrameworkClient';
import { safeJsonLdStringify } from '@/utils/jsonLd';
import {
  RCF_CONCEPTS,
  RCF_FAQ,
  RCF_FRAMEWORK_PATH,
  rcfFaqAnswerText,
} from '@/lib/resonanceCore';
import { COMPANY_VALUES } from '@/lib/siteContent';

const PAGE_URL = `https://www.fluxline.pro${RCF_FRAMEWORK_PATH}`;
const TITLE = 'The Resonance Core Framework™ | Fluxline Resonance Group';
const DESCRIPTION =
  'The Resonance Core Framework™ by Terence Waters, a decision-making and identity framework for leaders: every concept, the DRIVE Model, and the six core values.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'The Resonance Core Framework',
    'Resonance Core Framework',
    'RCF coaching',
    'identity alignment coaching',
    'Resonance Core Framework consulting',
    'decision-making framework',
    'identity framework',
    'Behavioral Gravity',
    'Identity Coherence',
    'Window of Choice',
    'DRIVE Model',
    'Judgment Loop',
    'Data Loop',
    'The Decision Integrity Index',
    'The DII',
    'Decision Alignment Score',
    'six core values',
    'Resonance Core Framework book',
    'Terence Waters',
    'Fluxline Resonance Group',
  ],
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
      // The six core values (The DII's scoring anchors). Kept apart from the
      // concepts above: a core value is not a framework concept.
      '@type': 'DefinedTermSet',
      '@id': `${PAGE_URL}#core-values`,
      name: 'The Six Core Values',
      url: `${PAGE_URL}#core-values`,
      hasDefinedTerm: COMPANY_VALUES.map((v) => ({
        '@type': 'DefinedTerm',
        '@id': `${PAGE_URL}#${v.id}`,
        name: v.title,
        description: v.description,
        url: `${PAGE_URL}#core-values`,
        inDefinedTermSet: `${PAGE_URL}#core-values`,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: RCF_FAQ.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: rcfFaqAnswerText(f) },
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
