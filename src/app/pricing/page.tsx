import React from 'react';
import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';
import { SERVICE_CATEGORIES } from '@/app/services/constants';
import {
  BOOK_PREORDER,
  PRICING_FAQ,
  SERVICE_STORIES,
} from '@/lib/fluxlineStory';
import { safeJsonLdStringify } from '@/utils/jsonLd';

const SITE = 'https://www.fluxline.pro';
const PAGE_URL = `${SITE}/pricing/`;
const TITLE = 'Pricing: Coaching, Consulting, Design & Training | Fluxline';
const DESCRIPTION =
  'Starting prices for every Fluxline service: RCF coaching from $99, brand design from $800, web development from $1,750, and personal training from $100 a session.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'Fluxline pricing',
    'coaching prices',
    'identity coaching cost',
    'brand design packages',
    'web development packages',
    'personal training rates Salt Lake City',
    'business strategy consulting',
    'The Resonance Core Framework book pre-order',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Fluxline Resonance Group',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Resonance Group pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/FluxlineLogo.png'],
    creator: '@fluxlineco',
  },
  alternates: {
    canonical: '/pricing',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Structured data that mirrors the visible page: one Service per offering,
 * with its lowest published price when there is one, plus the pricing FAQ.
 * Services priced by consultation carry no Offer rather than an invented one.
 */
const pricingSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'OfferCatalog',
      '@id': `${PAGE_URL}#catalog`,
      name: 'Fluxline services and starting prices',
      url: PAGE_URL,
      itemListElement: [
        ...SERVICE_STORIES.flatMap((story) => {
          const service = SERVICE_CATEGORIES.find((s) => s.id === story.id);
          if (!service) return [];
          return [
            {
              '@type': 'Service',
              '@id': `${SITE}${service.path}#service`,
              name: service.title,
              description: story.outcome,
              url: `${SITE}${service.path}`,
              provider: { '@id': `${SITE}/#organization` },
              ...(story.fromPriceUsd !== undefined && {
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'USD',
                  lowPrice: story.fromPriceUsd,
                  url: `${SITE}${service.path}`,
                },
              }),
            },
          ];
        }),
        {
          '@type': 'Book',
          name: 'The Resonance Core Framework™',
          author: { '@type': 'Person', name: 'Terence Waters' },
          url: `${SITE}/books/`,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: BOOK_PREORDER.fromPriceUsd,
            availability: 'https://schema.org/PreOrder',
            url: BOOK_PREORDER.url,
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: PRICING_FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: PAGE_URL },
      ],
    },
  ],
};

/** /pricing: starting prices for the five offerings and the book pre-order. */
export default function PricingPage() {
  return (
    <>
      <script
        id='pricing-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: safeJsonLdStringify(pricingSchema),
        }}
      />
      <PricingPageClient />
    </>
  );
}
