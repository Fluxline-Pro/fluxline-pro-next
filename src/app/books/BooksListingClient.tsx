'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxChip from '@/theme/components/dsm/FxChip';
import FxButton from '@/theme/components/dsm/FxButton';
import FxReveal from '@/theme/components/dsm/FxReveal';
import FxGroupLabel from '@/theme/components/dsm/FxGroupLabel';
import FxSectionPanel from '@/theme/components/dsm/FxSectionPanel';
import ResonanceCoreBookCover from '@/assets/images/The-Resonance-Core-Book.jpg';
import { Book } from './types';
import { RCF_LEDE, RCF_OFFERINGS, STOREFRONT_URL } from './constants';
import {
  PODCAST_BLURB,
  RCF_BOOK_IMAGE,
  RCF_BRIEF,
  RCF_LOGO_IMAGE,
  RCF_PREVIEW_PDF,
  RCF_RELEASE_WINDOW,
  RCF_TRADEMARK,
} from '@/lib/resonanceCore';

interface BooksListingClientProps {
  books: Book[];
}

const SECTION_GAP = 'var(--fx-space-xxxxl)';

/**
 * Books — The Resonance Core Framework™ landing page.
 *
 * This page explains the framework and announces the book. Purchase is handled
 * entirely by store.fluxline.pro, so nothing here collects money or quotes a
 * price; the offerings below describe what will be available and hand off.
 */
export default function BooksListingClient({ books }: BooksListingClientProps) {
  // The framework book is the one publication we surface directly; anything
  // else in /public/books renders as a secondary card at the bottom.
  const featured = books.find((b) => b.featured) ?? books[0];
  const otherBooks = books.filter((b) => b.slug !== featured?.slug);

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <FxSectionHeading
        kicker='Books'
        title={RCF_TRADEMARK}
        subhead={`The book & companion workbook — coming ${RCF_RELEASE_WINDOW}.`}
        as='h1'
      />

      <p
        style={{
          fontSize: 'var(--fx-body-size)',
          color: 'var(--fx-text-body)',
          lineHeight: 'var(--fx-body-leading)',
          maxWidth: '68ch',
          marginTop: 'var(--fx-space-l)',
          marginBottom: 'var(--fx-space-xl)',
        }}
      >
        {RCF_LEDE}
      </p>

      <div
        style={{
          display: 'flex',
          gap: 'var(--fx-space-xs)',
          flexWrap: 'wrap',
          marginBottom: SECTION_GAP,
        }}
      >
        <FxChip kind='badge' tone='gold'>
          {RCF_RELEASE_WINDOW}
        </FxChip>
        <FxChip kind='tag'>Book</FxChip>
        <FxChip kind='tag'>Companion workbook</FxChip>
        <FxChip kind='tag'>Audiobook</FxChip>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Coming soon feature card                                          */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='gold' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel tone='gold'>Coming Soon</FxGroupLabel>
          <FxCard
            interactive
            variant='feature'
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
              className='fx-stack'
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--fx-space-xl)',
                flexWrap: 'wrap',
              }}
            >
              <img
                src={RCF_BOOK_IMAGE}
                alt={`${RCF_TRADEMARK} — book concept`}
                style={{
                  width: 220,
                  maxWidth: '100%',
                  borderRadius: 'var(--fx-radius-card-sm)',
                  border: '1px solid var(--fx-border)',
                  objectFit: 'cover',
                }}
              />

              <div style={{ flex: 1, minWidth: 280 }}>
                <h2
                  style={{
                    fontSize: 'var(--fx-h2-size)',
                    fontWeight: 800,
                    color: 'var(--fx-text-heading)',
                    margin: '0 0 10px',
                    fontFamily: 'var(--fx-font)',
                  }}
                >
                  The book &amp; workbook arrive {RCF_RELEASE_WINDOW}
                </h2>
                <p
                  style={{
                    fontSize: 'var(--fx-body-size)',
                    color: 'var(--fx-text-body)',
                    lineHeight: 'var(--fx-body-leading)',
                    margin: '0 0 var(--fx-space-m)',
                    maxWidth: '60ch',
                  }}
                >
                  The complete framework, the DRIVE Model, and the companion
                  workbook that turns it into daily practice. The introduction
                  preview is available to read right now — it covers why
                  self-help usually fails, where the framework came from, and
                  who it is built for.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--fx-space-s)',
                    flexWrap: 'wrap',
                  }}
                >
                  <FxButton variant='primary' href={RCF_PREVIEW_PDF}>
                    Read the Introduction Preview
                  </FxButton>
                  {featured && (
                    <FxButton
                      variant='outline'
                      href={`/books/${featured.slug}`}
                    >
                      Full Synopsis &amp; Contents
                    </FxButton>
                  )}
                </div>
              </div>
            </div>
          </FxCard>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* The framework, briefly — the full explainer lives at              */}
      {/* /resonance-core so the two pages don't say the same thing twice.  */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel
          tone='alt'
          id='framework'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel>The Framework</FxGroupLabel>
          <h2
            style={{
              fontSize: 'var(--fx-h2-size)',
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
              margin: '0 0 var(--fx-space-l)',
              fontFamily: 'var(--fx-font)',
              letterSpacing: '-.01em',
            }}
          >
            What the book is about
          </h2>

          <FxCard interactive variant='inset' style={{ padding: '32px 36px' }}>
            {RCF_BRIEF.map((para, i) => (
              <p
                key={para.slice(0, 24)}
                style={{
                  fontSize: 'var(--fx-body-size)',
                  color: 'var(--fx-text-body)',
                  lineHeight: 'var(--fx-body-leading)',
                  maxWidth: '68ch',
                  margin: i === 0 ? '0 0 var(--fx-space-m)' : '0',
                }}
              >
                {para}
              </p>
            ))}

            <div
              style={{
                display: 'flex',
                gap: 'var(--fx-space-s)',
                flexWrap: 'wrap',
                marginTop: 'var(--fx-space-l)',
              }}
            >
              <FxButton variant='outline' href='/resonance-core'>
                What the Framework Is →
              </FxButton>
            </div>
          </FxCard>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* What will be offered                                              */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel
          tone='inset'
          id='offerings'
          style={{ marginBottom: SECTION_GAP }}
        >
          <FxGroupLabel tone='gold'>Coming Soon</FxGroupLabel>
          <h2
            style={{
              fontSize: 'var(--fx-h2-size)',
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
              margin: '0 0 var(--fx-space-s)',
              fontFamily: 'var(--fx-font)',
              letterSpacing: '-.01em',
            }}
          >
            What will be offered
          </h2>
          <p
            style={{
              fontSize: 'var(--fx-body-size)',
              color: 'var(--fx-text-muted)',
              lineHeight: 'var(--fx-body-leading)',
              maxWidth: '68ch',
              margin: '0 0 var(--fx-space-xl)',
            }}
          >
            Every edition below will be sold through the Fluxline store at
            launch. Pricing is announced there, not here.
          </p>

          {/* Cover rail on the left, edition cards on the right; the split
              collapses to a single stacked column at tablet and below. */}
          <div className='fx-media-split'>
            <FxCard
              variant='feature'
              style={{
                padding: 'var(--fx-space-m)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: 320,
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
              <img
                src={ResonanceCoreBookCover.src}
                alt={`${RCF_TRADEMARK} — book cover concept`}
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: 'var(--fx-radius-card-sm)',
                  border: '1px solid var(--fx-border)',
                }}
              />
              <div
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: 'var(--fx-text-soft)',
                  textAlign: 'center',
                  marginTop: 'var(--fx-space-s)',
                  fontStyle: 'italic',
                }}
              >
                Cover concept — every edition below carries it.
              </div>
            </FxCard>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--fx-space-xxl)',
                width: '100%',
              }}
            >
              {RCF_OFFERINGS.map((group) => (
                <div key={group.group}>
                  <FxGroupLabel>{group.group}</FxGroupLabel>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: 'var(--fx-space-m)',
                    }}
                  >
                    {group.items.map((item) => (
                      <FxCard
                        variant='standard'
                        interactive
                        key={item.name}
                        style={{ padding: 22 }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            color: 'var(--fx-text-heading)',
                            marginBottom: 'var(--fx-space-xs)',
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontSize: 13.5,
                            lineHeight: 1.55,
                            color: 'var(--fx-text-muted)',
                          }}
                        >
                          {item.body}
                        </div>
                        {item.note && (
                          <div
                            style={{
                              fontSize: 12.5,
                              lineHeight: 1.5,
                              color: 'var(--fx-text-soft)',
                              marginTop: 'var(--fx-space-xs)',
                              fontStyle: 'italic',
                            }}
                          >
                            {item.note}
                          </div>
                        )}
                      </FxCard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FxCallout
            tone='info'
            title='Pre-orders are coming soon!'
            style={{ marginTop: 'var(--fx-space-l)' }}
          >
            Preorders will soon be available which will be announced here.{' '}
            <em>
              <strong>Stay tuned!</strong>
            </em>
          </FxCallout>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* The Resonant Identity podcast                                     */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='feature' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel tone='gold'>An Extension Of The Framework</FxGroupLabel>
          <FxCard
            variant='band'
            interactive
            style={{
              padding: '32px 36px',
              border: '1px solid var(--fx-gold-border)',
            }}
          >
            <div
              className='fx-stack'
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--fx-space-xl)',
                flexWrap: 'wrap',
              }}
            >
              <img
                src='/images/TheResonantIdentity_Logo.png'
                alt='The Resonant Identity podcast'
                style={{
                  width: 160,
                  maxWidth: '100%',
                  borderRadius: 'var(--fx-radius-card-sm)',
                  border: '1px solid var(--fx-border)',
                }}
              />
              <div style={{ flex: 1, minWidth: 280 }}>
                <h2
                  style={{
                    fontSize: 'var(--fx-h3-size)',
                    fontWeight: 700,
                    color: 'var(--fx-text-bright)',
                    margin: '0 0 var(--fx-space-s)',
                    fontFamily: 'var(--fx-font)',
                  }}
                >
                  The Resonant Identity Podcast
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
                  {PODCAST_BLURB}
                </p>
                <FxButton variant='primary' href='/podcasts'>
                  Listen to the Podcast
                </FxButton>
              </div>
            </div>
          </FxCard>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* Working with the framework directly                               */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxSectionPanel tone='alt' style={{ marginBottom: SECTION_GAP }}>
          <FxGroupLabel>Go Deeper</FxGroupLabel>
          <div
            className='fx-g2'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--fx-space-l)',
            }}
          >
            <FxCard
              interactive
              variant='standard'
              href='/resonance-core'
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
                The framework in full
              </h3>
              <p
                style={{
                  fontSize: 'var(--fx-body-size)',
                  color: 'var(--fx-text-body)',
                  lineHeight: 'var(--fx-body-leading)',
                  margin: '0 0 var(--fx-space-l)',
                }}
              >
                The premise, the DRIVE Model, what it&apos;s built on, and who
                it&apos;s for — the canonical explanation, without the book.
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
                What The Framework Is ›
              </span>
            </FxCard>

            <FxCard
              interactive
              variant='inset'
              href='/blog/announcement-resonance-core-book'
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
                Read the origin story →
              </h3>
              <p
                style={{
                  fontSize: 'var(--fx-body-size)',
                  color: 'var(--fx-text-body)',
                  lineHeight: 'var(--fx-body-leading)',
                  margin: '0 0 var(--fx-space-l)',
                }}
              >
                Why the framework exists, how it was built and tested, and the
                DRIVE Model walked through step by step.
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
                Framework Announcement →
              </span>
            </FxCard>
          </div>
        </FxSectionPanel>
      </FxReveal>

      {/* ---------------------------------------------------------------- */}
      {/* Any other publications                                            */}
      {/* ---------------------------------------------------------------- */}
      {otherBooks.length > 0 && (
        <FxReveal>
          <FxSectionPanel tone='inset' style={{ marginBottom: SECTION_GAP }}>
            <FxGroupLabel>More From The Library</FxGroupLabel>
            <div
              className='fx-g2'
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--fx-space-l)',
              }}
            >
              {otherBooks.map((book) => (
                <FxCard
                  key={book.slug}
                  interactive
                  href={`/books/${book.slug}`}
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
                    {book.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--fx-body-size)',
                      color: 'var(--fx-text-body)',
                      lineHeight: 'var(--fx-body-leading)',
                      margin: '0 0 var(--fx-space-l)',
                    }}
                  >
                    {book.excerpt}
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
                    Read More →
                  </span>
                </FxCard>
              ))}
            </div>
          </FxSectionPanel>
        </FxReveal>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* CTA                                                               */}
      {/* ---------------------------------------------------------------- */}
      <FxReveal>
        <FxCTABand
          title='Want to know when it lands?'
          body="Tell us where you are and what you're working through. We'll let you know the moment the book and workbook are available, and point you at the right first step in the meantime."
          primaryLabel='Get in Touch'
          primaryHref='/contact'
          secondaryLabel='Explore Our Services →'
          secondaryHref='/services'
        />
      </FxReveal>

      {/* Small footer note tying the framework back to the wider practice. */}
      <p
        style={{
          fontSize: 13,
          color: 'var(--fx-text-soft)',
          lineHeight: 1.6,
          textAlign: 'center',
          maxWidth: '60ch',
          margin: 'var(--fx-space-xl) auto 0',
        }}
      >
        {RCF_TRADEMARK} is the practice underneath everything Fluxline builds.{' '}
        <Link href='/resonance-core' style={{ color: 'var(--fx-accent)' }}>
          Read what the framework is →
        </Link>
      </p>

      {/* Logo mark, closing the page the way the framework opens it. */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'var(--fx-space-l)',
        }}
      >
        <img
          src={RCF_LOGO_IMAGE}
          alt={`${RCF_TRADEMARK} logo`}
          style={{
            width: 84,
            height: 84,
            objectFit: 'contain',
            opacity: 0.85,
            borderRadius: 'var(--fx-radius-card-sm)',
          }}
        />
      </div>
    </FxContainer>
  );
}
