'use client';

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxGroupLabel from '@/theme/components/dsm/FxGroupLabel';
import FxCard from '@/theme/components/dsm/FxCard';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxChip from '@/theme/components/dsm/FxChip';
import FxButton from '@/theme/components/dsm/FxButton';
import FxReveal from '@/theme/components/dsm/FxReveal';
import FxSectionPanel from '@/theme/components/dsm/FxSectionPanel';
import DriveModelDiagram from '@/assets/images/drive_model_framework.jpeg';
import {
  DRIVE_STEPS,
  PODCAST_BLURB,
  RCF_AUDIENCE,
  RCF_EXPLAINER,
  RCF_FOUNDATIONS,
  RCF_LOGO_IMAGE,
  RCF_ONE_LINER,
  RCF_PREVIEW_PDF,
  RCF_RELEASE_WINDOW,
  RCF_TRADEMARK,
} from '@/lib/resonanceCore';
import { StaggeredGrid } from '@/animations/staggered-container';

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

/**
 * /resonance-core — the canonical explanation of the framework.
 *
 * This page is about the framework itself. The book built on it lives at
 * /books, and the guided engagement is a service at /services/resonance-core;
 * both are linked from the bottom rather than described here.
 */
export default function ResonanceCoreClient() {
  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
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
        <div style={{ flex: 1, minWidth: 280 }}>
          <FxSectionHeading
            kicker='The Framework'
            title={RCF_TRADEMARK}
            subhead={RCF_ONE_LINER}
            as='h1'
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'var(--fx-space-xs)',
          flexWrap: 'wrap',
          marginBottom: SECTION_GAP,
        }}
      >
        <FxChip kind='tag'>Identity</FxChip>
        <FxChip kind='tag'>Alignment</FxChip>
        <FxChip kind='tag'>Decision-making</FxChip>
        <FxChip kind='tag'>Sustainable change</FxChip>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* What it is                                                        */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='alt' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>What It Is</FxGroupLabel>
          <h2 style={sectionTitle}>Resonance, not force</h2>
          <FxCallout
            tone='gold'
            title='The premise, in one line.'
            style={{
              marginTop: 'var(--fx-space-xl)',
              marginBottom: 'var(--fx-space-l)',
            }}
          >
            <em>
              People make their best decisions when they act in alignment with
              who they are.
            </em>
          </FxCallout>

          <div
            className='fx-g2'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--fx-space-l)',
            }}
          >
            {RCF_EXPLAINER.map((block) => (
              <FxCard
                key={block.heading}
                interactive
                style={{ padding: '28px 28px 24px' }}
              >
                <h3
                  style={{
                    fontSize: 'var(--fx-h3-size)',
                    fontWeight: 700,
                    color: 'var(--fx-text-heading)',
                    margin: '0 0 var(--fx-space-xs)',
                    fontFamily: 'var(--fx-font)',
                  }}
                >
                  {block.heading}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--fx-body-size)',
                    color: 'var(--fx-text-body)',
                    lineHeight: 'var(--fx-body-leading)',
                    margin: 0,
                  }}
                >
                  {block.body}
                </p>
              </FxCard>
            ))}
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* The DRIVE Model                                                   */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='band' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>The DRIVE Model</FxGroupLabel>
          <h2 style={sectionTitle}>Six steps, one loop</h2>
          <p style={sectionLede}>
            The DRIVE Model is how the framework moves an intention from a
            flicker of interest into a durable part of your identity. Each step
            feeds the DRIVE Alignment Loop, where every action gets re-tested
            against your values before it compounds.
          </p>

          {/* Diagram rail on the left, step cards on the right; the split
              collapses to a single stacked column at tablet and below. */}
          <div className='fx-media-split'>
            <img
              src={DriveModelDiagram.src}
              alt='The DRIVE Model — Spark, Coherence, Activation, Momentum, Endurance, and Expansion arranged as a continuous alignment loop.'
              style={{
                display: 'block',
                width: '100%',
                maxWidth: 320,
                aspectRatio: '1 / 1',
                objectFit: 'cover',
                borderRadius: 'var(--fx-radius-card)',
                border: '1px solid var(--fx-border)',
              }}
            />

            <div
              className='fx-g2'
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--fx-space-m)',
                width: '100%',
              }}
            >
              {DRIVE_STEPS.map((step, i) => (
                <FxCard
                  key={step.step}
                  interactive
                  variant='raised'
                  style={{ padding: 22 }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '.08em',
                      color: 'var(--fx-teal)',
                      marginBottom: 'var(--fx-space-xs)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} · {step.step.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'var(--fx-text-heading)',
                      marginBottom: 'var(--fx-space-xxs)',
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: 'var(--fx-text-muted)',
                    }}
                  >
                    {step.body}
                  </div>
                </FxCard>
              ))}
            </div>
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* What it's built on                                                */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='inset' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>What It&apos;s Built On</FxGroupLabel>
          <h2 style={sectionTitle}>Tested before it was written down</h2>
          <p style={sectionLede}>
            The framework draws on six sources, and every part of it was run in
            practice — daily journaling, decision tracking, pattern observation,
            and alignment scorecards — before it became a system anyone else was
            asked to use.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--fx-space-xs)',
              flexWrap: 'wrap',
            }}
          >
            {RCF_FOUNDATIONS.map((item) => (
              <FxChip key={item} kind='category'>
                {item}
              </FxChip>
            ))}
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* Who it's for                                                      */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='alt' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>Who It&apos;s For</FxGroupLabel>
          <h2 style={{ ...sectionTitle, marginBottom: 'var(--fx-space-l)' }}>
            You&apos;ll recognize yourself here
          </h2>
          <p style={sectionLede}>
            The framework is designed for individuals who are committed to
            personal growth and alignment in their professional and personal
            lives. If any of these sound like you, <br />
            <strong>
              <em>you're in the right place.</em>
            </strong>
          </p>

          <StaggeredGrid columns={3} gap='1rem' stagger={0.1}>
            {RCF_AUDIENCE.map((line) => (
              <FxCard
                key={line}
                interactive
                variant='feature'
                style={{ padding: '28px 32px' }}
              >
                {line}
              </FxCard>
            ))}
          </StaggeredGrid>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* Read the introduction                                             */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='gold' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel tone='gold'>Start Here</FxGroupLabel>
          <FxCard
            variant='feature'
            interactive
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
            <h2
              style={{
                fontSize: 'var(--fx-h2-size)',
                fontWeight: 800,
                color: 'var(--fx-text-heading)',
                margin: '0 0 10px',
                fontFamily: 'var(--fx-font)',
              }}
            >
              Read the introduction preview
            </h2>
            <p
              style={{
                fontSize: 'var(--fx-body-size)',
                color: 'var(--fx-text-body)',
                lineHeight: 'var(--fx-body-leading)',
                margin: '0 0 var(--fx-space-l)',
                maxWidth: '60ch',
              }}
            >
              The published preview covers why self-help usually fails, the
              personal story that led to the framework, the universal truths it
              rests on, how it was built, and what the book and workbook will
              guide you through. It is free, and it is the fastest way to know
              whether this is for you.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 'var(--fx-space-s)',
                flexWrap: 'wrap',
              }}
            >
              <FxButton variant='primary' href={RCF_PREVIEW_PDF}>
                Download the Preview PDF
              </FxButton>
              <FxButton
                variant='outline'
                href='/blog/announcement-resonance-core-book'
              >
                Read the Origin Story
              </FxButton>
            </div>
          </FxCard>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* Where the framework shows up                                      */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='inset' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>Where It Shows Up</FxGroupLabel>
          <h2 style={sectionTitle}>Three ways in</h2>
          <p style={sectionLede}>
            The framework is one thing expressed three ways — read it, hear it,
            or work through it with us.
          </p>

          <div
            className='fx-g3'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--fx-space-l)',
            }}
          >
            <FxCard
              variant='raised'
              interactive
              href='/books'
              style={{ padding: '28px 28px 24px' }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: 'var(--fx-gold)',
                  marginBottom: 10,
                }}
              >
                Coming {RCF_RELEASE_WINDOW}
              </div>
              <h3
                style={{
                  fontSize: 'var(--fx-h3-size)',
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  margin: '0 0 var(--fx-space-xs)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                The book &amp; workbook
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  margin: '0 0 var(--fx-space-l)',
                }}
              >
                The complete framework in print, digital, and audio — with a
                companion workbook that turns it into daily practice.
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
                See What&apos;s Coming ›
              </span>
            </FxCard>

            <FxCard
              variant='raised'
              interactive
              href='/podcasts'
              style={{ padding: '28px 28px 24px' }}
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
                Podcast
              </div>
              <h3
                style={{
                  fontSize: 'var(--fx-h3-size)',
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  margin: '0 0 var(--fx-space-xs)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                The Resonant Identity
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  margin: '0 0 var(--fx-space-l)',
                }}
              >
                {PODCAST_BLURB}
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
                Listen ›
              </span>
            </FxCard>

            <FxCard
              variant='raised'
              interactive
              href='/services/resonance-core'
              style={{ padding: '28px 28px 24px' }}
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
                Guided
              </div>
              <h3
                style={{
                  fontSize: 'var(--fx-h3-size)',
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  margin: '0 0 var(--fx-space-xs)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                Work through it with us
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  margin: '0 0 var(--fx-space-l)',
                }}
              >
                Identity coherence, narrative reframing, and embodiment
                integration — the framework applied one-to-one rather than read.
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
                Resonance Core Services ›
              </span>
            </FxCard>
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* CTA                                                               */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxCTABand
          title='Where are you misaligned?'
          body="Tell us what you're working through and we'll map the right first step — whether that's the framework, a guided engagement, or something else entirely."
          primaryLabel='Book a Consultation'
          primaryHref='/contact'
          secondaryLabel='Explore Our Services →'
          secondaryHref='/services'
        />
      </FxReveal>
    </FxContainer>
  );
}
