import React from 'react';
import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import { SERVICE_CATEGORIES } from './constants';
import { safeJsonLdStringify } from '@/utils/jsonLd';

const SERVICES_TITLE =
  'Services | Fluxline Resonance Group — RCF Coaching, Brand Design, Web Architecture & Consulting';
const SERVICES_DESCRIPTION =
  'Consulting, coaching, brand design, web architecture, and Resonance Core Framework™ engagements — offered by Fluxline Resonance Group for founders, leaders, and creative organizations.';

export const metadata: Metadata = {
  title: { absolute: SERVICES_TITLE },
  description: SERVICES_DESCRIPTION,
  keywords:
    'services, Resonance Core Framework coaching, RCF coaching, identity alignment coaching, consulting, brand design, web architecture, cloud architecture consulting, content ecosystem design, web development, personal training, coaching, strategic planning, systems design, UX design',
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
        alt: 'Fluxline Services',
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
const VISIBLE_SERVICES = SERVICE_CATEGORIES.filter(
  (s) => s.id !== 'education-training'
);

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
