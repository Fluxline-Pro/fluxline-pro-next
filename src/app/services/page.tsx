import React from 'react';
import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import { SERVICE_CATEGORIES } from './constants';
import { safeJsonLdStringify } from '@/utils/jsonLd';

const SERVICES_TITLE =
  'Consulting & Coaching Services | Fluxline Resonance Group';
const SERVICES_DESCRIPTION =
  'Five offerings for founders and leaders: Resonance Core Framework™ coaching, business strategy consulting, brand design, web development, and personal training.';

export const metadata: Metadata = {
  title: { absolute: SERVICES_TITLE },
  description: SERVICES_DESCRIPTION,
  keywords:
    'services, Resonance Core Framework coaching, RCF coaching, identity alignment coaching, leadership coaching, consulting, business strategy and systems alignment, brand design, brand and experience design, web architecture, cloud architecture consulting, content ecosystem design, web development, personal training, wellness, coaching, strategic planning, systems design, UX design',
  openGraph: {
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    url: 'https://www.fluxline.pro/services',
    siteName: 'Fluxline Resonance Group',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Resonance Group consulting and coaching services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    images: ['/images/FluxlineLogo.png'],
    creator: '@fluxlineco',
  },
  alternates: {
    canonical: '/services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Service catalog JSON-LD for AI ingest — lists all offerings so AI systems
// can answer "What services does Fluxline provide?"
const VISIBLE_SERVICES = SERVICE_CATEGORIES;

const serviceCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://www.fluxline.pro/services#catalog',
  name: 'Fluxline Services',
  description:
    'Complete catalog of services offered by Fluxline Resonance Group.',
  numberOfItems: VISIBLE_SERVICES.length,
  itemListElement: VISIBLE_SERVICES.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      '@id': `https://www.fluxline.pro${service.path}#service`,
      name: service.title,
      description: service.description,
      url: `https://www.fluxline.pro${service.path}`,
      provider: {
        '@type': 'Organization',
        '@id': 'https://www.fluxline.pro/#organization',
        name: 'Fluxline Resonance Group',
      },
    },
  })),
};

/**
 * Services Page
 * Displays Fluxline services and offerings
 */
export default function ServicesPage() {
  return (
    <>
      <script
        id='services-catalog-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: safeJsonLdStringify(serviceCatalogSchema),
        }}
      />
      <ServicesPageClient />
    </>
  );
}
