'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxGroupLabel from '@/theme/components/dsm/FxGroupLabel';
import FxCard from '@/theme/components/dsm/FxCard';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxButton from '@/theme/components/dsm/FxButton';
import { SERVICE_CATEGORIES } from '@/app/services/constants';
import {
  BOOK_PREORDER,
  PRICING_FAQ,
  SERVICE_STORIES,
} from '@/lib/fluxlineStory';
import { RCF_RELEASE_WINDOW, RCF_TRADEMARK } from '@/lib/resonanceCore';

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
  gap: 'var(--fx-space-l)',
  alignItems: 'start',
  padding: 'var(--fx-space-l)',
};

const rowTitle: React.CSSProperties = {
  fontSize: 'var(--fx-h3-size)',
  fontWeight: 700,
  color: 'var(--fx-text-heading)',
  margin: '0 0 var(--fx-space-xs)',
  fontFamily: 'var(--fx-font)',
};

const rowBody: React.CSSProperties = {
  fontSize: 14.5,
  lineHeight: 1.6,
  color: 'var(--fx-text-body)',
  margin: 0,
};

const priceList: React.CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: 'var(--fx-space-xs)',
  fontSize: 15,
  fontWeight: 600,
  color: 'var(--fx-text-bright)',
  fontVariantNumeric: 'tabular-nums',
};

const noteStyle: React.CSSProperties = {
  fontSize: 13.5,
  lineHeight: 1.55,
  color: 'var(--fx-text-muted)',
  margin: 'var(--fx-space-s) 0 0',
};

const textLink: React.CSSProperties = {
  color: 'var(--fx-accent-text)',
  fontWeight: 600,
};

/**
 * /pricing: every starting price in one place. One row per offering, in the
 * same order as the home page and /services, each linking to the service page
 * that holds the full tier table. Figures come from `SERVICE_STORIES`, which a
 * unit test checks against `pricing-data.ts`.
 */
export default function PricingPageClient() {
  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <FxSectionHeading
        kicker='Starting prices'
        title='Pricing'
        subhead='Starting prices for every Fluxline service, in one place.'
        as='h1'
      />
      <p
        style={{
          fontSize: 'var(--fx-body-size)',
          color: 'var(--fx-text-body)',
          lineHeight: 'var(--fx-body-leading)',
          maxWidth: '68ch',
          margin: 'var(--fx-space-l) 0 var(--fx-space-m)',
        }}
      >
        Every engagement starts with a free consultation. The prices below are
        starting points, and each links to the full detail on its service page.
      </p>
      <div style={{ marginBottom: 'var(--fx-space-xxl)' }}>
        <FxButton variant='primary' href='/contact'>
          Book a Free Consultation
        </FxButton>
      </div>

      <FxGroupLabel>Services</FxGroupLabel>
      <div
        style={{
          display: 'grid',
          gap: 'var(--fx-space-m)',
          marginBottom: 'var(--fx-space-xxl)',
        }}
      >
        {SERVICE_STORIES.map((story) => {
          const service = SERVICE_CATEGORIES.find((s) => s.id === story.id);
          if (!service) return null;
          return (
            <FxCard key={story.id} style={{ padding: 0 }}>
              <div id={story.id} style={rowStyle}>
                <div>
                  <h2 style={rowTitle}>{service.title}</h2>
                  <p style={rowBody}>{story.outcome}</p>
                  <p style={{ ...rowBody, marginTop: 'var(--fx-space-s)' }}>
                    <Link
                      href={service.path}
                      style={textLink}
                      aria-label={`See what is included in ${service.title}`}
                    >
                      See what is included →
                    </Link>
                  </p>
                </div>
                <div>
                  <ul style={priceList}>
                    {story.priceLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {story.priceNote && (
                    <p style={noteStyle}>{story.priceNote}</p>
                  )}
                </div>
              </div>
            </FxCard>
          );
        })}
      </div>

      <FxGroupLabel tone='gold'>The book</FxGroupLabel>
      <FxCard variant='feature' style={{ padding: 0 }}>
        <div id='book' style={rowStyle}>
          <div>
            <h2 style={rowTitle}>{RCF_TRADEMARK}, the book</h2>
            <p style={rowBody}>
              The book, the companion workbook, and the audiobook narrated by
              the author. Targeted for {RCF_RELEASE_WINDOW}.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 'var(--fx-space-s)',
                flexWrap: 'wrap',
                marginTop: 'var(--fx-space-m)',
              }}
            >
              <FxButton variant='primary' href={BOOK_PREORDER.url}>
                Pre-order on the Fluxline Store
              </FxButton>
              <FxButton variant='quiet' href='/books'>
                About the book
              </FxButton>
            </div>
          </div>
          <div>
            <ul style={priceList}>
              {BOOK_PREORDER.priceLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p style={noteStyle}>
              {BOOK_PREORDER.priceNote}{' '}
              <Link href={BOOK_PREORDER.termsPath} style={textLink}>
                Pre-order terms
              </Link>
              .
            </p>
          </div>
        </div>
      </FxCard>

      <section
        id='faq'
        style={{
          margin: 'var(--fx-space-xxxxl) 0',
          maxWidth: '72ch',
        }}
      >
        <FxGroupLabel>Questions</FxGroupLabel>
        <h2 style={{ ...rowTitle, fontSize: 'var(--fx-h2-size)' }}>
          Questions about pricing
        </h2>
        <dl style={{ margin: 'var(--fx-space-l) 0 0' }}>
          {PRICING_FAQ.map((item) => (
            <div
              key={item.question}
              style={{ marginBottom: 'var(--fx-space-l)' }}
            >
              <dt
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  marginBottom: 'var(--fx-space-xxs)',
                }}
              >
                {item.question}
              </dt>
              <dd style={{ ...rowBody, fontSize: 'var(--fx-body-size)' }}>
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <FxCTABand
        title='Not sure which service fits?'
        body='Share where you are and where you want to go. The first consultation is free.'
        primaryLabel='Book a Free Consultation'
        primaryHref='/contact'
        secondaryLabel='All services'
        secondaryHref='/services'
      />
    </FxContainer>
  );
}
