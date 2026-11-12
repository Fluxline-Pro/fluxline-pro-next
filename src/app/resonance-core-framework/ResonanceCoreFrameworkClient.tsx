'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxGroupLabel from '@/theme/components/dsm/FxGroupLabel';
import FxCard from '@/theme/components/dsm/FxCard';
import FxButton from '@/theme/components/dsm/FxButton';
import FxReveal from '@/theme/components/dsm/FxReveal';
import FxSectionPanel from '@/theme/components/dsm/FxSectionPanel';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import DriveModelDiagram from '@/assets/images/drive_model.jpg';
import NewsletterSignup from '@/components/NewsletterSignup';
import { COMPANY_VALUES } from '@/lib/siteContent';
import { SERVICE_CATEGORIES } from '@/app/services/constants';
import { BOOK_PREORDER, SERVICE_STORIES } from '@/lib/fluxlineStory';
import {
  RCF_CONCEPTS,
  RCF_FAQ,
  RCF_LOGO_IMAGE,
  RCF_ONE_LINER,
  RCF_PREORDER_STATUS,
  RCF_PREVIEW_PDF,
  RCF_RELEASE_WINDOW,
  RCF_RINGS,
  RCF_TRADEMARK,
  TRI_FRAMEWORK_URL,
  TRI_START_HERE_URL,
  TW_FRAMEWORK_URL,
} from '@/lib/resonanceCore';

const SECTION_GAP = 'var(--fx-space-xxl)';

const sectionTitle: React.CSSProperties = {
  fontSize: 'var(--fx-h2-size)',
  fontWeight: 700,
  color: 'var(--fx-text-heading)',
  margin: '0 0 var(--fx-space-m)',
  fontFamily: 'var(--fx-font)',
  letterSpacing: '-.01em',
};

const bodyText: React.CSSProperties = {
  fontSize: 'var(--fx-body-size)',
  lineHeight: 'var(--fx-body-leading)',
  color: 'var(--fx-text-body)',
  maxWidth: '68ch',
  margin: '0 0 var(--fx-space-m)',
};

const cardTitle: React.CSSProperties = {
  fontSize: 'var(--fx-h4-size, 18px)',
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

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
  gap: 'var(--fx-space-m)',
};

const textLink: React.CSSProperties = {
  color: 'var(--fx-accent-text)',
  fontWeight: 600,
  textDecoration: 'none',
};

const termName: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: 'var(--fx-text-heading)',
  margin: 0,
};

const termBody: React.CSSProperties = {
  ...cardBody,
  margin: 'var(--fx-space-xxs) 0 0',
};

/**
 * /resonance-core-framework: the short, canonical account of the framework.
 * What it is, its three parts, its named tools, the six core values, how each
 * Fluxline service applies it, the book, and a short FAQ. Detail beyond this
 * belongs in the book and on the podcast; this page is the 60-second map.
 *
 * Section and concept ids are linked from theresonantidentity.com and
 * terencewaters.com (`#three-rings`, `#core-concepts`, each concept id,
 * `#drive-model`, `#core-values`, `#notify`, `#faq`), so keep them stable.
 */
export default function ResonanceCoreFrameworkClient() {
  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* Header */}
      <div
        className='fx-stack'
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--fx-space-xl)',
          flexWrap: 'wrap',
          marginBottom: 'var(--fx-space-xl)',
        }}
      >
        <img
          src={RCF_LOGO_IMAGE}
          alt={`${RCF_TRADEMARK} logo`}
          style={{
            width: 120,
            height: 120,
            objectFit: 'contain',
            borderRadius: 'var(--fx-radius-card-sm)',
            border: '1px solid var(--fx-border)',
            background: 'var(--fx-surface-inset)',
            padding: 10,
          }}
        />
        <div style={{ flex: 1, minWidth: 260 }}>
          <FxSectionHeading
            kicker='The framework behind Fluxline'
            title={RCF_TRADEMARK}
            subhead={RCF_ONE_LINER}
            as='h1'
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'var(--fx-space-s)',
          flexWrap: 'wrap',
          marginBottom: SECTION_GAP,
        }}
      >
        <FxButton variant='primary' href='/contact'>
          Book a Free Consultation
        </FxButton>
        <FxButton variant='outline' href={BOOK_PREORDER.url}>
          Pre-order the book
        </FxButton>
        <FxButton variant='quiet' href={RCF_PREVIEW_PDF}>
          Read the free introduction
        </FxButton>
      </div>

      {/* 1. What it is */}
      <FxReveal>
        <section id='overview' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>Overview</FxGroupLabel>
          <h2 style={sectionTitle}>What the framework is</h2>
          <p style={bodyText}>
            The RCF helps you get clear on who you are, then make decisions that
            fit. Resonance is alignment between your identity, values, feelings,
            and actions. The framework gives you language for your patterns, a
            way to test decisions against your values, and tools to track
            alignment over time.
          </p>
          <FxCallout tone='gold' title='The premise, in one line.'>
            <em>
              People make their best decisions when they act in alignment with
              who they are.
            </em>
          </FxCallout>
        </section>
      </FxReveal>

      {/* 2. The three parts */}
      <FxReveal>
        <FxSectionPanel
          tone='alt'
          id='three-rings'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel>Structure</FxGroupLabel>
          <h2 style={sectionTitle}>Three parts, from the inside out</h2>
          <div style={gridStyle}>
            {RCF_RINGS.map((ring) => (
              <FxCard key={ring.title} variant='raised' style={{ padding: 22 }}>
                <FxGroupLabel>{ring.part}</FxGroupLabel>
                <h3 style={cardTitle}>{ring.title}</h3>
                <p style={cardBody}>{ring.body}</p>
              </FxCard>
            ))}
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* 3. The tools */}
      <FxReveal>
        <FxSectionPanel
          tone='inset'
          id='core-concepts'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel>Language for what you feel</FxGroupLabel>
          <h2 style={sectionTitle}>The tools</h2>
          <p style={bodyText}>
            Named concepts that help you see what is happening and choose how to
            respond.
          </p>
          <div className='fx-media-split'>
            <div id='drive-model' style={{ scrollMarginTop: 96 }}>
              <img
                src={DriveModelDiagram.src}
                alt='The DRIVE Model: Spark, Coherence, Activation, Momentum, Endurance, and Embodiment arranged as a continuous alignment loop.'
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: 280,
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: 'var(--fx-radius-card)',
                  border: '1px solid var(--fx-border)',
                }}
              />
              <p style={{ ...cardBody, maxWidth: 280, marginTop: 12 }}>
                DRIVE stands for Directional, Repeatable, Identity-Aligned
                Virtuous Expressions: repeatable actions that move you toward
                the person you are becoming.
              </p>
            </div>
            <dl
              style={{
                ...gridStyle,
                gap: 'var(--fx-space-l)',
                margin: 0,
                width: '100%',
              }}
            >
              {RCF_CONCEPTS.map((concept) => (
                <div
                  key={concept.id}
                  id={concept.id}
                  style={{ scrollMarginTop: 96 }}
                >
                  <dt style={termName}>{concept.name}</dt>
                  <dd style={termBody}>{concept.summary}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* 4. The six core values */}
      <FxReveal>
        <FxSectionPanel
          tone='band'
          id='core-values'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel tone='gold'>Decision integrity</FxGroupLabel>
          <h2 style={sectionTitle}>The Six Core Values</h2>
          <p style={bodyText}>
            The DII checks each decision against six values.
          </p>
          <dl style={{ ...gridStyle, gap: 'var(--fx-space-l)', margin: 0 }}>
            {COMPANY_VALUES.map((value) => (
              <div key={value.id}>
                <dt style={termName}>{value.title}</dt>
                <dd style={termBody}>{value.description}</dd>
              </div>
            ))}
          </dl>
        </FxSectionPanel>
      </FxReveal>

      {/* 5. How it ties into Fluxline's services */}
      <FxReveal>
        <FxSectionPanel
          tone='alt'
          id='work-with-the-framework'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel>Ways in</FxGroupLabel>
          <h2 style={sectionTitle}>How Fluxline applies the framework</h2>
          <p style={bodyText}>
            Every Fluxline service applies the RCF to a different part of your
            life or business.
          </p>
          <div style={gridStyle}>
            {SERVICE_STORIES.map((story) => {
              const service = SERVICE_CATEGORIES.find((s) => s.id === story.id);
              if (!service) return null;
              return (
                <FxCard
                  key={story.id}
                  variant='raised'
                  interactive
                  href={service.path}
                  style={{ padding: 22, height: '100%' }}
                >
                  <h3 style={cardTitle}>{service.title}</h3>
                  <p style={cardBody}>{story.rcfTie}</p>
                  <p
                    style={{
                      ...cardBody,
                      marginTop: 'var(--fx-space-s)',
                      fontWeight: 600,
                      color: 'var(--fx-text-bright)',
                    }}
                  >
                    {story.priceLabel}
                  </p>
                </FxCard>
              );
            })}
          </div>
          <p style={{ ...bodyText, margin: 'var(--fx-space-l) 0 0' }}>
            <Link href='/pricing' style={textLink}>
              Compare all pricing →
            </Link>
          </p>
        </FxSectionPanel>
      </FxReveal>

      {/* 6. The book */}
      <FxReveal>
        <FxSectionPanel
          tone='gold'
          id='book'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel tone='gold'>
            Targeted for {RCF_RELEASE_WINDOW}
          </FxGroupLabel>
          <h2 style={sectionTitle}>The book</h2>
          <p style={bodyText}>
            The full framework, with a companion workbook for daily practice and
            an audiobook narrated by the author. {RCF_PREORDER_STATUS}.{' '}
            {BOOK_PREORDER.priceLabel}.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--fx-space-s)',
              flexWrap: 'wrap',
              marginBottom: 'var(--fx-space-l)',
            }}
          >
            <FxButton variant='primary' href={BOOK_PREORDER.url}>
              Pre-order on the Fluxline Store
            </FxButton>
            <FxButton variant='outline' href='/books'>
              About the book
            </FxButton>
            <FxButton variant='quiet' href={RCF_PREVIEW_PDF}>
              Read the free introduction (PDF)
            </FxButton>
          </div>
          <div
            id='notify'
            style={{ scrollMarginTop: 'calc(var(--fx-nav-height) + 16px)' }}
          >
            <FxCard variant='inset' style={{ padding: '22px 24px' }}>
              <h3 style={cardTitle}>Be notified when the book lands</h3>
              <p style={{ ...cardBody, marginBottom: 'var(--fx-space-s)' }}>
                Join the TRI Newsletter for launch updates. No spam, ever.
              </p>
              <NewsletterSignup
                size='sm'
                ariaLabel='Email address for book launch updates'
              />
            </FxCard>
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* 7. FAQ */}
      <FxReveal>
        <section id='faq' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>Questions</FxGroupLabel>
          <h2 style={sectionTitle}>Frequently Asked Questions</h2>
          <div
            style={{
              display: 'grid',
              gap: 'var(--fx-space-l)',
              maxWidth: '72ch',
            }}
          >
            {RCF_FAQ.map((item) => (
              <div key={item.question}>
                <h3 style={{ ...cardTitle, fontSize: 17 }}>{item.question}</h3>
                <p style={{ ...cardBody, fontSize: 'var(--fx-body-size)' }}>
                  {item.answer}
                </p>
                {item.points && (
                  <ul
                    style={{
                      ...cardBody,
                      fontSize: 'var(--fx-body-size)',
                      margin: 'var(--fx-space-xs) 0 0',
                      paddingLeft: 'var(--fx-space-l)',
                      listStyle: 'disc',
                    }}
                  >
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </FxReveal>

      {/* Next step and the rest of the ecosystem */}
      <FxReveal>
        <FxCTABand
          title='Ready when you are'
          body='Talk through where you are and find a useful next step. The first consultation is free.'
          primaryLabel='Book a Free Consultation'
          primaryHref='/contact'
          secondaryLabel='See pricing'
          secondaryHref='/pricing'
        />
        <ul
          style={{
            listStyle: 'none',
            margin: 'var(--fx-space-l) 0 0',
            padding: 0,
            display: 'flex',
            gap: '10px 28px',
            flexWrap: 'wrap',
          }}
        >
          <li>
            <a href={TRI_START_HERE_URL} style={textLink}>
              Listen to The Resonant Identity Podcast →
            </a>
          </li>
          <li>
            <a href={TRI_FRAMEWORK_URL} style={textLink}>
              Hear each concept on the podcast →
            </a>
          </li>
          <li>
            <a href={TW_FRAMEWORK_URL} style={textLink}>
              About the author →
            </a>
          </li>
          <li>
            <Link
              href='/blog/announcement-resonance-core-book'
              style={textLink}
            >
              Read the origin story →
            </Link>
          </li>
        </ul>
      </FxReveal>
    </FxContainer>
  );
}
