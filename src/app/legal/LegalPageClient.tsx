'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxCard from '@/theme/components/dsm/FxCard';

interface LegalDocument {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    title: 'Terms of Use',
    description:
      'Review the terms and conditions governing your use of the Fluxline pro website and services.',
    href: '/legal/terms',
  },
  {
    title: 'Privacy Policy',
    description:
      'Learn how we collect, use, and protect your personal information.',
    href: '/legal/privacy-policy',
  },
  {
    title: 'Stewardship Contract',
    description:
      'Explore the foundational principles and commitments that guide our client relationships.',
    href: '/legal/stewardship-contract',
  },
  {
    title: 'Glossary of Terms',
    description:
      'Understand key concepts, methodologies, and terminology used throughout Fluxline.',
    href: '/legal/glossary',
  },
  {
    title: 'Articles of Conversion',
    description:
      'View or download the official Articles of Conversion document (PDF).',
    href: '/legal/articles-of-conversion',
  },
  {
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
    <FxContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {/* Hero Section */}
        <div
          style={{
            border: '1px solid var(--fx-border)',
            backgroundColor: 'var(--fx-surface-card)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            borderRadius: 'var(--fx-radius-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <h1
            style={{
              color: 'var(--fx-accent)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
              fontFamily: 'var(--fx-font)',
            }}
          >
            Legal &amp; Reference
          </h1>
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: '1.125rem',
              lineHeight: 1.6,
              margin: '1rem 0 0',
            }}
          >
            Access important legal documents and reference materials for the
            Fluxline Resonance Group. These documents outline our policies,
            terms, and core definitions.
          </p>
        </div>

        {/* Document Grid */}
        <section>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(325px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {LEGAL_DOCUMENTS.map((doc) => (
              <FxCard
                key={doc.title}
                variant="standard"
                interactive
                href={doc.href}
                padding="1.5rem"
                style={{
                  height: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--fx-text-body)',
                      marginBottom: '0.125rem',
                      margin: 0,
                      marginBlockEnd: '0.125rem',
                    }}
                  >
                    {doc.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--fx-text-muted)',
                      lineHeight: '1.5',
                      margin: 0,
                    }}
                  >
                    {doc.description}
                  </p>
                </div>

                {/* Special indicator for PDF document */}
                {doc.title === 'Articles Of Conversion' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      color: 'var(--fx-accent)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    VIEW PDF
                  </div>
                )}
              </FxCard>
            ))}
          </div>
        </section>
      </div>
    </FxContainer>
  );
}
