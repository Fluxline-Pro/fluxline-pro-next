'use client';

import React from 'react';
import Link from 'next/link';
import FxHero from '@/theme/components/dsm/FxHero';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxGroupLabel from '@/theme/components/dsm/FxGroupLabel';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxCard from '@/theme/components/dsm/FxCard';
import FxReveal from '@/theme/components/dsm/FxReveal';
import FxButton from '@/theme/components/dsm/FxButton';
import { SERVICE_CATEGORIES } from '@/app/services/constants';
import {
  AUDIENCES,
  BOOK_PREORDER,
  FOUNDER_LINE,
  HOW_IT_WORKS,
  SERVICE_STORIES,
} from '@/lib/fluxlineStory';
import {
  RCF_FRAMEWORK_PATH,
  RCF_ONE_LINER,
  RCF_PREVIEW_PDF,
  RCF_RELEASE_WINDOW,
  RCF_RINGS,
  RCF_TRADEMARK,
  TRI_START_HERE_URL,
  TW_ABOUT_URL,
} from '@/lib/resonanceCore';

const SECTION_PADDING = 'var(--fx-space-xxxxl) 0';

const grid = (min: number): React.CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
  gap: 'var(--fx-space-m)',
  alignItems: 'stretch',
});

const cardTitle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: 'var(--fx-text-heading)',
  margin: '0 0 var(--fx-space-xs)',
  fontFamily: 'var(--fx-font)',
};

const cardBody: React.CSSProperties = {
  fontSize: 14.5,
  lineHeight: 1.6,
  color: 'var(--fx-text-body)',
  margin: 0,
};

const cardLink: React.CSSProperties = {
  display: 'inline-block',
  marginTop: 'var(--fx-space-m)',
  fontSize: 'var(--fx-cta-link-size)',
  fontWeight: 700,
  letterSpacing: 'var(--fx-cta-link-tracking)',
  textTransform: 'uppercase',
  color: 'var(--fx-teal-text)',
};

const priceTag: React.CSSProperties = {
  marginTop: 'var(--fx-space-m)',
  fontSize: 13.5,
  fontWeight: 600,
  color: 'var(--fx-text-bright)',
};

const textLink: React.CSSProperties = {
  color: 'var(--fx-accent-text)',
  fontWeight: 600,
};

/**
 * Home page: the 60-second version of Fluxline. Who it helps, how it works,
 * the five services with a starting price each, the framework and the book,
 * and one next step. Everything longer lives one click away on /services,
 * /pricing and /resonance-core-framework. Copy comes from
 * `src/lib/fluxlineStory.ts` so those pages and /llms.txt say the same thing.
 */
export default function HomeClient() {
  const serviceById = (id: string) =>
    SERVICE_CATEGORIES.find((s) => s.id === id);

  return (
    <>
      <FxHero
        eyebrow='Welcome To'
        title='FLUXLINE'
        headline='Identity alignment for businesses, solopreneurs, and individuals.'
        body={
          <>
            Fluxline helps you get clear on who you are and what you stand for,
            then make informed decisions that fit. The method is{' '}
            <Link href={RCF_FRAMEWORK_PATH} style={textLink}>
              {RCF_TRADEMARK}
            </Link>
            : a practical system for making change that holds, built on
            alignment rather than force.
          </>
        }
        secondaryCta={{ label: 'Services and pricing', href: '/pricing' }}
        primaryCta={{ label: 'Book a Free Consultation', href: '/contact' }}
        backgroundImage='/images/home/HomePageMobileGeometricBackground.jpg'
        tagline='Structure the Shift'
        location='Salt Lake City, Utah, and online'
      />

      {/* How it works: identity, decisions, structure */}
      <section id='about' style={{ padding: SECTION_PADDING }}>
        <FxContainer>
          <FxReveal>
            <FxSectionHeading
              kicker='How Fluxline works'
              title='Identity first. Then decisions. Then structure.'
              subhead='Resonance, not force.'
              as='h2'
            />
          </FxReveal>
          <FxReveal delay={100}>
            <ol
              style={{
                ...grid(260),
                listStyle: 'none',
                margin: 'var(--fx-space-xl) 0 0',
                padding: 0,
              }}
            >
              {HOW_IT_WORKS.map((item) => (
                <li key={item.step}>
                  <FxCard
                    variant='raised'
                    style={{ padding: 24, height: '100%' }}
                  >
                    <FxGroupLabel>Step {item.step}</FxGroupLabel>
                    <h3 style={cardTitle}>{item.title}</h3>
                    <p style={cardBody}>{item.body}</p>
                  </FxCard>
                </li>
              ))}
            </ol>
          </FxReveal>
        </FxContainer>
      </section>

      {/* Who Fluxline helps */}
      <section
        id='who'
        style={{
          padding: SECTION_PADDING,
          background: 'var(--fx-surface-alt)',
        }}
      >
        <FxContainer>
          <FxReveal>
            <FxSectionHeading
              kicker='Who Fluxline helps'
              title='Businesses, solopreneurs, and individuals'
              as='h2'
            />
          </FxReveal>
          <FxReveal delay={100}>
            <div style={{ ...grid(260), marginTop: 'var(--fx-space-xl)' }}>
              {AUDIENCES.map((audience) => {
                const service = serviceById(audience.startServiceId);
                return (
                  <FxCard
                    key={audience.id}
                    interactive
                    href={service?.path}
                    style={{ padding: 24, height: '100%' }}
                  >
                    <h3 style={cardTitle}>{audience.title}</h3>
                    <p style={cardBody}>{audience.body}</p>
                    <span style={cardLink}>{audience.startLabel} ›</span>
                  </FxCard>
                );
              })}
            </div>
          </FxReveal>
        </FxContainer>
      </section>

      {/* Five services, each with a starting price */}
      <section id='services' style={{ padding: SECTION_PADDING }}>
        <FxContainer>
          <FxReveal>
            <FxSectionHeading
              kicker='Services'
              title='Five services, one framework'
              subhead='Each service applies the RCF to a different part of your life or business.'
              as='h2'
            />
          </FxReveal>
          <FxReveal delay={100}>
            <div style={{ ...grid(300), marginTop: 'var(--fx-space-xl)' }}>
              {SERVICE_STORIES.map((story) => {
                const service = serviceById(story.id);
                if (!service) return null;
                return (
                  <FxCard
                    key={story.id}
                    variant='raised'
                    interactive
                    href={service.path}
                    style={{
                      padding: 24,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h3 style={cardTitle}>{service.title}</h3>
                    <p style={cardBody}>{story.outcome}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={priceTag}>{story.priceLabel}</div>
                      <span
                        style={{ ...cardLink, marginTop: 'var(--fx-space-xs)' }}
                      >
                        See the service ›
                      </span>
                    </div>
                  </FxCard>
                );
              })}
            </div>
          </FxReveal>
          <FxReveal delay={200}>
            <div
              style={{
                display: 'flex',
                gap: 'var(--fx-space-s)',
                flexWrap: 'wrap',
                marginTop: 'var(--fx-space-xl)',
              }}
            >
              <FxButton variant='outline' href='/pricing'>
                Compare all pricing
              </FxButton>
              <FxButton variant='quiet' href='/services'>
                All services
              </FxButton>
            </div>
          </FxReveal>
        </FxContainer>
      </section>

      {/* The framework and the book */}
      <section
        id='resonance-core'
        style={{
          padding: SECTION_PADDING,
          background: 'var(--fx-surface-alt)',
        }}
      >
        <FxContainer>
          <FxReveal>
            <FxSectionHeading
              kicker='The framework'
              title={RCF_TRADEMARK}
              subhead={RCF_ONE_LINER}
              as='h2'
            />
            <p
              style={{
                fontSize: 'var(--fx-body-size)',
                lineHeight: 'var(--fx-body-leading)',
                maxWidth: '68ch',
                margin: 'var(--fx-space-m) 0 0',
              }}
            >
              Resonance is alignment between your identity, values, feelings,
              and actions. The RCF maps it in three parts:{' '}
              {RCF_RINGS.map((ring) => ring.title).join(', ')}.
            </p>
          </FxReveal>
          <FxReveal delay={100}>
            <div style={{ ...grid(260), marginTop: 'var(--fx-space-xl)' }}>
              <FxCard
                interactive
                href={RCF_FRAMEWORK_PATH}
                style={{ padding: 24, height: '100%' }}
              >
                <FxGroupLabel>Read</FxGroupLabel>
                <h3 style={cardTitle}>What the framework is</h3>
                <p style={cardBody}>
                  The premise, the three parts, the tools, and how each Fluxline
                  service applies them.
                </p>
                <span style={cardLink}>Explore the framework ›</span>
              </FxCard>
              <FxCard
                variant='feature'
                interactive
                href={BOOK_PREORDER.url}
                style={{ padding: 24, height: '100%' }}
              >
                <FxGroupLabel tone='gold'>
                  Targeted for {RCF_RELEASE_WINDOW}
                </FxGroupLabel>
                <h3 style={cardTitle}>Pre-order the book</h3>
                <p style={cardBody}>
                  The book, the companion workbook, and the audiobook narrated
                  by the author. {BOOK_PREORDER.priceLabel}.
                </p>
                <span style={{ ...cardLink, color: 'var(--fx-gold-text)' }}>
                  Pre-order on the Fluxline Store ›
                </span>
              </FxCard>
              <FxCard
                interactive
                href={TRI_START_HERE_URL}
                style={{ padding: 24, height: '100%' }}
              >
                <FxGroupLabel>Listen</FxGroupLabel>
                <h3 style={cardTitle}>The Resonant Identity Podcast</h3>
                <p style={cardBody}>
                  The framework in conversation, one concept at a time.
                </p>
                <span style={cardLink}>Start here ›</span>
              </FxCard>
            </div>
          </FxReveal>
          <FxReveal delay={200}>
            <p
              style={{
                fontSize: 14.5,
                color: 'var(--fx-text-muted)',
                margin: 'var(--fx-space-l) 0 0',
              }}
            >
              Not ready to pre-order?{' '}
              <a href={RCF_PREVIEW_PDF} style={textLink}>
                Read the free introduction (PDF)
              </a>
              .
            </p>
          </FxReveal>
        </FxContainer>
      </section>

      {/* Founder line and the next step */}
      <section id='contact' style={{ padding: SECTION_PADDING }}>
        <FxContainer>
          <FxReveal>
            <p
              style={{
                fontSize: 'var(--fx-body-size)',
                lineHeight: 'var(--fx-body-leading)',
                maxWidth: '72ch',
                margin: '0 0 var(--fx-space-xl)',
              }}
            >
              {FOUNDER_LINE}{' '}
              <a href={TW_ABOUT_URL} rel='me' style={textLink}>
                About Terence
              </a>
              .
            </p>
            <FxCTABand
              title='Ready to structure the shift?'
              body='Tell Fluxline where you are and where you want to go. The first consultation is free.'
              primaryLabel='Book a Free Consultation'
              primaryHref='/contact'
              secondaryLabel='See pricing'
              secondaryHref='/pricing'
            />
          </FxReveal>
        </FxContainer>
      </section>
    </>
  );
}
