import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Fluxline Resonance Group is a systems-design and consulting practice founded by Terence Waters. We combine cloud architecture, content ecosystem design, UX, brand identity engineering, and strategic consulting into one coherent offering.',
  openGraph: {
    title: 'About Fluxline Resonance Group',
    description:
      'Systems-design and consulting practice combining cloud architecture, content ecosystem design, UX, brand identity engineering, and strategic consulting.',
    url: 'https://www.fluxline.pro/about',
    siteName: 'Fluxline Resonance Group',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Resonance Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Fluxline Resonance Group',
    description:
      'Systems-design and consulting practice combining cloud architecture, content ecosystem design, UX, brand identity engineering, and strategic consulting.',
    creator: '@fluxlinepro',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AboutPage schema — reinforces founder/organization authority for AI ingest
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.fluxline.pro/about#about-page',
    url: 'https://www.fluxline.pro/about',
    name: 'About Fluxline Resonance Group',
    description:
      'Fluxline Resonance Group is a systems-design and consulting practice combining cloud architecture, content ecosystem design, UX and taxonomy design, brand identity engineering, and strategic consulting.',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.fluxline.pro/#organization',
      name: 'Fluxline Resonance Group',
      url: 'https://www.fluxline.pro',
      founder: {
        '@type': 'Person',
        '@id': 'https://www.terencewaters.com/#person',
        name: 'Terence Waters',
        url: 'https://www.terencewaters.com',
        jobTitle: 'Founder & Principal Consultant',
        sameAs: [
          'https://www.linkedin.com/in/terencewaters',
          'https://www.instagram.com/fluxlineco',
        ],
      },
    },
  };

  return (
    <>
      <Script
        id='about-page-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {children}
    </>
  );
}
