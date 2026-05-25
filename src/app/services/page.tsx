import React from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import { SERVICE_CATEGORIES } from './constants';
import { safeJsonLdStringify } from '@/utils/jsonLd';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Fluxline Resonance Group offers cloud architecture consulting, content ecosystem design, web development, brand identity engineering, personal training, coaching, and transformational frameworks. Modular by design, resonant by nature.',
  keywords:
    'services, cloud architecture consulting, content ecosystem design, web development, brand design, personal training, coaching, strategic planning, business transformation, digital services, systems design, UX design',
  openGraph: {
    title: 'Services - Fluxline Resonance Group',
    description:
      'Cloud architecture, content ecosystem design, web development, brand identity engineering, personal training, coaching, and strategic consulting.',
    url: 'https://www.fluxline.pro/services',
    siteName: 'Fluxline Resonance Group',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - Fluxline Resonance Group',
    description:
      'Cloud architecture, content ecosystem design, web development, brand identity engineering, personal training, coaching, and strategic consulting.',
    images: ['/images/FluxlineLogo.png'],
    creator: '@fluxlinepro',
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
const serviceCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://www.fluxline.pro/services#catalog',
  name: 'Fluxline Services',
  description:
    'Complete catalog of services offered by Fluxline Resonance Group.',
  numberOfItems: SERVICE_CATEGORIES.length,
  itemListElement: SERVICE_CATEGORIES.map((service, index) => ({
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
      <Script
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
