'use client';

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import {
  SERVICE_CATEGORIES,
  SERVICES_SUMMARY,
  FLUXLINE_SECONDARY_TAGLINE,
} from './constants';

const VISIBLE_SERVICES = SERVICE_CATEGORIES.filter(
  (s) => s.id !== 'education-training'
);

const CONSULTING = VISIBLE_SERVICES.find((s) => s.id === 'consulting')!;
const OTHER_SERVICES = VISIBLE_SERVICES.filter((s) => s.id !== 'consulting');

const CATEGORY_SECTIONS: {
  key: string;
  title: string;
  description: string;
}[] = [
  {
    key: 'brand-digital',
    title: 'Brand & Digital Presence',
    description:
      'Web development and brand design to build your digital foundation.',
  },
  {
    key: 'body-practice',
    title: 'Body & Practice',
    description:
      'Physical training and transformational frameworks rooted in identity work and embodiment.',
  },
  {
    key: 'depth-strategy',
    title: 'Strategy & Leadership',
    description:
      'Senior-level strategic direction and fractional leadership for founders and growing teams.',
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

      {/* Featured: Consulting */}
      <section
        style={{ padding: '16px 0', marginBottom: 'var(--fx-section-gap)' }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fx-gold)',
            marginBottom: 14,
          }}
        >
          Featured Service
        </div>
        <FxCard
          variant='feature'
          interactive
          href={CONSULTING.path}
          style={{
            padding: '36px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                'linear-gradient(90deg, var(--fx-gold), var(--fx-accent))',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 32,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <h3
                style={{
                  fontSize: 'var(--fx-h2-size)',
                  fontWeight: 800,
                  color: 'var(--fx-text-heading)',
                  margin: '0 0 10px',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                {CONSULTING.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--fx-body-size)',
                  color: 'var(--fx-text-body)',
                  lineHeight: 'var(--fx-body-leading)',
                  margin: '0 0 8px',
                  maxWidth: '56ch',
                }}
              >
                {CONSULTING.description}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--fx-text-muted)',
                  lineHeight: 1.65,
                  margin: '0 0 20px',
                  maxWidth: '56ch',
                }}
              >
                Strategic systems design, operational optimization, and
                values-aligned business consulting for founders and growing
                teams.
              </p>
              <span
                style={{
                  fontSize: 'var(--fx-cta-link-size)',
                  color: 'var(--fx-gold)',
                  fontWeight: 700,
                  letterSpacing: 'var(--fx-cta-link-tracking)',
                  textTransform: 'uppercase',
                }}
              >
                Explore Consulting ›
              </span>
            </div>
          </div>
        </FxCard>
      </section>

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
          primaryLabel='Book a Consultation'
          primaryHref='/contact'
        />
      </div>
    </FxContainer>
  );
}
