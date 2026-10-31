'use client';

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxFeatureCallout from '@/theme/components/dsm/FxFeatureCallout';
import {
  SERVICE_CATEGORIES,
  SERVICES_SUMMARY,
  FLUXLINE_SECONDARY_TAGLINE,
} from './constants';

const VISIBLE_SERVICES = SERVICE_CATEGORIES.filter(
  (s) => s.id !== 'education-training'
);

const CONSULTING = VISIBLE_SERVICES.find((s) => s.id === 'consulting')!;
const RESONANCE_CORE = VISIBLE_SERVICES.find((s) => s.id === 'resonance-core')!;
const OTHER_SERVICES = VISIBLE_SERVICES.filter(
  (s) => s.id !== 'consulting' && s.id !== 'resonance-core'
);

const CATEGORY_SECTIONS: {
  key: string;
  title: string;
  description: string;
}[] = [
  {
    key: 'brand-digital',
    title: 'Brand & Digital Presence',
    description:
      'Brand design and web development that give your work a clear, lasting presence online.',
  },
  {
    key: 'body-practice',
    title: 'Body & Practice',
    description: 'Physical training rooted in identity work and embodiment.',
  },
];

export default function ServicesPageClient() {
  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* Page Header */}
      <FxSectionHeading
        kicker='Services'
        title='What We Build, Train & Transform'
        subhead={FLUXLINE_SECONDARY_TAGLINE}
        as='h1'
      />

      <p
        style={{
          fontSize: 'var(--fx-body-size)',
          color: 'var(--fx-text-body)',
          lineHeight: 'var(--fx-body-leading)',
          maxWidth: '68ch',
          marginTop: 20,
          marginBottom: 48,
        }}
      >
        {SERVICES_SUMMARY}
      </p>

      <FeatureSection
        label='Foundation'
        service={RESONANCE_CORE}
        blurb='The method every engagement uses. Delivered through one-to-one coaching, group workshops, and speaking.'
        ctaLabel='Explore the Framework'
      />

      <FeatureSection
        label='Strategy & Leadership'
        service={CONSULTING}
        blurb='Strategic systems design, operational optimization, and values-aligned business consulting for founders and growing teams.'
        ctaLabel='Explore Consulting'
      />

      {/* Service Category Sections */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--fx-section-gap)',
        }}
      >
        {CATEGORY_SECTIONS.map((cat) => {
          const services = OTHER_SERVICES.filter((s) => s.category === cat.key);
          if (services.length === 0) return null;

          return (
            <section key={cat.key} style={{ padding: '16px 0' }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--fx-accent)',
                  marginBottom: 8,
                }}
              >
                {cat.title}
              </div>
              <p
                style={{
                  fontSize: 'var(--fx-body-size)',
                  color: 'var(--fx-text-muted)',
                  lineHeight: 'var(--fx-body-leading)',
                  marginBottom: 20,
                  maxWidth: '56ch',
                }}
              >
                {cat.description}
              </p>
              <div
                className='fx-g2'
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 20,
                }}
              >
                {services.map((service) => (
                  <FxCard
                    key={service.id}
                    interactive
                    href={service.path}
                    style={{ padding: '28px 28px 24px' }}
                  >
                    <h4
                      style={{
                        fontSize: 'var(--fx-h3-size)',
                        fontWeight: 700,
                        color: 'var(--fx-text-heading)',
                        marginBottom: 8,
                        fontFamily: 'var(--fx-font)',
                      }}
                    >
                      {service.title}
                    </h4>
                    <p
                      style={{
                        fontSize: 'var(--fx-body-size)',
                        color: 'var(--fx-text-body)',
                        lineHeight: 'var(--fx-body-leading)',
                        marginTop: 0,
                        marginBottom: 20,
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
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA Band */}
      <div style={{ marginTop: 'var(--fx-section-gap)' }}>
        <FxCTABand
          title='Not sure where to start?'
          body="Share your needs in a free consultation below. Let's map out what's possible for you or your business together."
          primaryLabel='Book a Free Consultation'
          primaryHref='/contact'
        />
      </div>
    </FxContainer>
  );
}

/**
 * A full-width featured service with its group label above it. Used for the
 * Foundation (the RCF, which every engagement builds on) and for Strategy &
 * Leadership, each of which holds a single service. The same callout makes the
 * free consultation the standout on /contact.
 */
function FeatureSection({
  label,
  service,
  blurb,
  ctaLabel,
}: {
  label: string;
  service: (typeof SERVICE_CATEGORIES)[number];
  blurb: string;
  ctaLabel: string;
}) {
  return (
    <FxFeatureCallout
      label={label}
      title={service.title}
      description={service.description}
      blurb={blurb}
      href={service.path}
      ctaLabel={ctaLabel}
      style={{ marginBottom: 'var(--fx-section-gap)' }}
    />
  );
}
