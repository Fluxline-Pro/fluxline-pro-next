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
import { COMPANY_VALUES } from '@/lib/siteContent';
import {
  RCF_CANONICAL_PARAGRAPH,
  RCF_CONCEPTS,
  RCF_FAQ,
  RCF_LOGO_IMAGE,
  RCF_ONE_LINER,
  RCF_PREVIEW_PDF,
  RCF_RELEASE_WINDOW,
  RCF_RINGS,
  RCF_TRADEMARK,
  TRI_FRAMEWORK_URL,
  TRI_SITE_URL,
  TW_FRAMEWORK_URL,
} from '@/lib/resonanceCore';

const SECTION_GAP = 'var(--fx-space-xxxxl)';

const sectionTitle: React.CSSProperties = {
  fontSize: 'var(--fx-h2-size)',
  fontWeight: 700,
  color: 'var(--fx-text-heading)',
  margin: '0 0 var(--fx-space-s)',
  fontFamily: 'var(--fx-font)',
  letterSpacing: '-.01em',
};

const sectionLede: React.CSSProperties = {
  fontSize: 'var(--fx-body-size)',
  color: 'var(--fx-text-muted)',
  lineHeight: 'var(--fx-body-leading)',
  maxWidth: '68ch',
  margin: '0 0 var(--fx-space-xl)',
};

const cardTitle: React.CSSProperties = {
  fontSize: 'var(--fx-h4-size, 18px)',
  fontWeight: 700,
  color: 'var(--fx-text-heading)',
  margin: '0 0 var(--fx-space-xs)',
  fontFamily: 'var(--fx-font)',
};

const cardBody: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: 'var(--fx-text-muted)',
  margin: 0,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 'var(--fx-space-m)',
};

const textLink: React.CSSProperties = {
  color: 'var(--fx-accent)',
  fontWeight: 600,
  textDecoration: 'none',
};

/** The ways to work with the framework — coaching, consulting, book, podcast. */
const ENGAGEMENTS: {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}[] = [
  {
    label: '1:1',
    title: 'Coaching',
    body: 'Work through the framework one-to-one with Terence — mapping your patterns, naming what pulls you off course, and building decisions you can trust.',
    href: '/services/resonance-core',
    cta: 'Resonance Core Coaching ›',
  },
  {
    label: 'Teams & founders',
    title: 'Consulting packages',
    body: 'Bring the RCF into how you lead and build — values-aligned strategy, decision integrity, and systems that reflect who you are as an organization.',
    href: '/services/consulting',
    cta: 'Explore Consulting ›',
  },
  {
    label: `Coming ${RCF_RELEASE_WINDOW}`,
    title: 'The book',
    body: 'The complete framework in print, digital, and audio, with a companion workbook that turns it into daily practice.',
    href: '/books',
    cta: "See What's Coming ›",
  },
  {
    label: 'Weekly',
    title: 'The Resonant Identity Podcast',
    body: 'Hear the framework in conversation — each episode explores one or more RCF concepts in everyday life.',
    href: TRI_SITE_URL,
    cta: 'Listen to the Podcast ›',
  },
];

/**
 * /resonance-core-framework — the commercial home of the framework: what it
 * is, its named concepts, the six values behind the DII, how to work with it,
 * and plain-language answers to common questions.
 *
 * The deeper explainer (premise, DRIVE Model, origins) stays at
 * /resonance-core; this page is where someone ready to engage should land.
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
            background: '#000',
            padding: 10,
          }}
        />
        <div style={{ flex: 1, minWidth: 260 }}>
          <FxSectionHeading
            kicker='Coaching & Consulting'
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
        <FxButton variant='outline' href={TRI_SITE_URL}>
          Listen to the Podcast
        </FxButton>
        <FxButton variant='quiet' href={RCF_PREVIEW_PDF}>
          Download the RCF Preview
        </FxButton>
      </div>

      {/* 1. What the framework is */}
      <FxReveal>
        <FxSectionPanel tone='alt' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>Overview</FxGroupLabel>
          <h2 style={sectionTitle}>What the Framework Is</h2>
          <p style={{ ...sectionLede, color: 'var(--fx-text-body)' }}>
            {RCF_CANONICAL_PARAGRAPH}
          </p>
          <div style={gridStyle}>
            {RCF_RINGS.map((ring) => (
              <FxCard key={ring.title} variant='raised' style={{ padding: 22 }}>
                <h3 style={cardTitle}>{ring.title}</h3>
                <p style={cardBody}>{ring.body}</p>
              </FxCard>
            ))}
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* 2. Core concepts */}
      <FxReveal>
        <FxSectionPanel
          tone='inset'
          id='core-concepts'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel>Language for what you feel</FxGroupLabel>
          <h2 style={sectionTitle}>Core Concepts</h2>
          <p style={sectionLede}>
            Each concept gives a name to something you&apos;ve likely already
            experienced — and a way to work with it.
          </p>
          <div style={gridStyle}>
            {RCF_CONCEPTS.map((c) => (
              <div
                key={c.id}
                id={c.id}
                style={{ scrollMarginTop: 96, height: '100%' }}
              >
                <FxCard style={{ padding: 22, height: '100%' }}>
                  <h3 style={cardTitle}>{c.name}</h3>
                  <p style={cardBody}>{c.body}</p>
                </FxCard>
              </div>
            ))}
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* 3. The six core values */}
      <FxReveal>
        <FxSectionPanel
          tone='band'
          id='core-values'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel tone='gold'>Decision Integrity</FxGroupLabel>
          <h2 style={sectionTitle}>The Six Core Values</h2>
          <p style={sectionLede}>
            These six values are the scoring anchors of the framework&apos;s
            Decision Integrity Index (DII). When you score a decision,
            you&apos;re asking how well it honors each one.
          </p>
          <div style={gridStyle}>
            {COMPANY_VALUES.map((val) => (
              <FxCard key={val.id} variant='raised' style={{ padding: 22 }}>
                <h3 style={cardTitle}>{val.title}</h3>
                <p style={cardBody}>{val.description}</p>
              </FxCard>
            ))}
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* 4. How to work with the framework */}
      <FxReveal>
        <FxSectionPanel tone='alt' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>Ways In</FxGroupLabel>
          <h2 style={sectionTitle}>How to Work with the Framework</h2>
          <p style={sectionLede}>
            Start wherever feels right. Every path uses the same framework — you
            choose how deep and how guided you want it to be.
          </p>
          <div style={gridStyle}>
            {ENGAGEMENTS.map((e) => (
              <FxCard
                key={e.title}
                variant='raised'
                interactive
                href={e.href}
                style={{ padding: '24px 24px 20px', height: '100%' }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-teal)',
                    marginBottom: 10,
                  }}
                >
                  {e.label}
                </div>
                <h3 style={cardTitle}>{e.title}</h3>
                <p style={{ ...cardBody, marginBottom: 'var(--fx-space-m)' }}>
                  {e.body}
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
                  {e.cta}
                </span>
              </FxCard>
            ))}
          </div>

          <FxCard
            variant='inset'
            style={{ padding: '22px 24px', marginTop: 'var(--fx-space-l)' }}
          >
            <h3 style={cardTitle}>Read the introduction first</h3>
            <p style={{ ...cardBody, marginBottom: 'var(--fx-space-s)' }}>
              The free RCF Preview is the book&apos;s introduction: why most
              self-help doesn&apos;t stick, the idea the framework rests on —
              that you decide best when you act as who you actually are — and
              where it came from. It&apos;s a quick, honest look at Behavioral
              Gravity, Identity Coherence, the Window of Choice, and the DRIVE
              System before you commit to anything.
            </p>
            <a href={RCF_PREVIEW_PDF} style={textLink}>
              Download the RCF Preview (PDF) →
            </a>
          </FxCard>
        </FxSectionPanel>
      </FxReveal>

      {/* 5. FAQ */}
      <FxReveal>
        <FxSectionPanel
          tone='inset'
          id='faq'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel>Questions</FxGroupLabel>
          <h2 style={sectionTitle}>Frequently Asked Questions</h2>
          <div
            style={{
              display: 'grid',
              gap: 'var(--fx-space-l)',
              maxWidth: '72ch',
            }}
          >
            {RCF_FAQ.map((f) => (
              <div key={f.question}>
                <h3 style={cardTitle}>{f.question}</h3>
                <p
                  style={{
                    ...cardBody,
                    fontSize: 'var(--fx-body-size)',
                    color: 'var(--fx-text-body)',
                  }}
                >
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* Cross-site + CTA */}
      <FxReveal>
        <FxSectionPanel tone='band'>
          <h2 style={sectionTitle}>Ready when you are</h2>
          <p style={sectionLede}>
            A free consultation is a relaxed conversation about where you are
            and where you&apos;d like to be. No pressure — just clarity on the
            right first step.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--fx-space-s)',
              flexWrap: 'wrap',
              marginBottom: 'var(--fx-space-l)',
            }}
          >
            <FxButton variant='primary' href='/contact'>
              Book a Free Consultation
            </FxButton>
            <FxButton variant='outline' href={TRI_SITE_URL}>
              Listen to the Podcast
            </FxButton>
            <FxButton variant='quiet' href={RCF_PREVIEW_PDF}>
              Download the RCF Preview
            </FxButton>
          </div>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              gap: '10px 28px',
              flexWrap: 'wrap',
            }}
          >
            <li>
              <a href={TRI_FRAMEWORK_URL} style={textLink}>
                Explore the educational framework overview →
              </a>
            </li>
            <li>
              <a href={TW_FRAMEWORK_URL} style={textLink}>
                About the author →
              </a>
            </li>
            <li>
              <Link href='/resonance-core' style={textLink}>
                The premise &amp; the DRIVE Model →
              </Link>
            </li>
          </ul>
        </FxSectionPanel>
      </FxReveal>
    </FxContainer>
  );
}
