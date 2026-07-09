'use client';

/**
 * Services Page Client Component
 * Displays Fluxline services and offerings
 */

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';
import FxButton from '@/theme/components/dsm/FxButton';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxCallout from '@/theme/components/dsm/FxCallout';
import {
  SERVICE_CATEGORIES,
  SERVICES_SUMMARY,
  FLUXLINE_SECONDARY_TAGLINE,
} from './constants';

const CATEGORY_SECTIONS: {
  key: string;
  title: string;
  description: string;
}[] = [
  {
    key: 'body-practice',
    title: 'Body & Practice',
    description:
      'Physical training and transformational frameworks rooted in identity work and embodiment.',
  },
  {
    key: 'brand-digital',
    title: 'Brand & Digital Presence',
    description:
      'Web development and brand design to build your digital foundation.',
  },
  {
    key: 'depth-strategy',
    title: 'Depth Work & Strategy',
    description:
      'Strategic consulting and transformational frameworks for clarity and growth.',
  },
];

export default function ServicesPageClient() {
  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* Page Header */}
      <FxSectionHeading
        kicker="Services"
        title="Our Services"
        subhead={FLUXLINE_SECONDARY_TAGLINE}
      />

      {/* Summary */}
      <p
        style={{
          fontSize: 'var(--fx-body-size)',
          color: 'var(--fx-text-body)',
          lineHeight: 'var(--fx-body-leading)',
          maxWidth: '72ch',
          marginTop: 24,
          marginBottom: 'var(--fx-section-gap)',
        }}
      >
        {SERVICES_SUMMARY}
      </p>

      {/* Service Category Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fx-section-gap)' }}>
        {CATEGORY_SECTIONS.map((cat) => (
          <section key={cat.key}>
            <h3
              style={{
                fontSize: 'var(--fx-h3-size)',
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 8px',
                fontFamily: 'var(--fx-font)',
              }}
            >
              {cat.title}
            </h3>
            <p
              style={{
                fontSize: 'var(--fx-body-size)',
                color: 'var(--fx-text-muted)',
                lineHeight: 'var(--fx-body-leading)',
                marginBottom: 'var(--fx-block-gap)',
              }}
            >
              {cat.description}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 20,
              }}
            >
              {SERVICE_CATEGORIES.filter((s) => s.category === cat.key).map(
                (service) => (
                  <FxCard
                    key={service.id}
                    interactive
                    href={service.path}
                    style={{ padding: 24 }}
                  >
                    <h4
                      style={{
                        fontSize: 'var(--fx-h3-size)',
                        fontWeight: 700,
                        color: 'var(--fx-text-heading)',
                        marginBottom: 8,
                      }}
                    >
                      {service.title}
                    </h4>
                    <p
                      style={{
                        fontSize: 'var(--fx-body-size)',
                        color: 'var(--fx-text-body)',
                        lineHeight: 'var(--fx-body-leading)',
                        marginBottom: 16,
                      }}
                    >
                      {service.description}
                    </p>
                    <span
                      style={{
                        fontSize: 'var(--fx-cta-link-size)',
                        color: 'var(--fx-accent)',
                        fontWeight: 700,
                        letterSpacing: 'var(--fx-cta-link-tracking)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Learn More ›
                    </span>
                  </FxCard>
                )
              )}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Band */}
      <div style={{ marginTop: 'var(--fx-section-gap)' }}>
        <FxCTABand
          title="Not sure where to start?"
          body="Share your needs in a free consultation."
          primaryLabel="Book a Consultation"
          primaryHref="/contact"
        />
      </div>

      {/* Legal & Governance Callout */}
      <div style={{ marginTop: 'var(--fx-block-gap)' }}>
        <FxCallout tone="info" title="Legal & Governance">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <span>
              Review our terms, policies, and stewardship commitments that
              govern our professional relationship.
            </span>
            <FxButton variant="outline" href="/legal">
              View Legal Documents
            </FxButton>
          </div>
        </FxCallout>
      </div>
    </FxContainer>
  );
}
