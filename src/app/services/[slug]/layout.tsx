/**
 * Service Detail Layout
 * Layout for individual service pages with SEO metadata and JSON-LD structured data
 */

import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SERVICE_CATEGORIES } from '../constants';
import { safeJsonLdStringify } from '@/utils/jsonLd';

interface ServiceDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate metadata for service detail pages
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Find the service by slug
  const service = SERVICE_CATEGORIES.find((s) => {
    const serviceSlug = s.path.split('/').pop();
    return serviceSlug === slug;
  });

  // Default metadata if service not found
  if (!service) {
    return {
      title: 'Service Not Found | Fluxline Resonance Group',
      description: 'The requested service could not be found.',
    };
  }

  // Remove HTML tags from summary for meta description
  const plainTextSummary = service.summary
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 160);

  return {
    title: `${service.title} | Fluxline Resonance Group`,
    description: plainTextSummary,
    openGraph: {
      title: `${service.title} | Fluxline Resonance Group`,
      description: plainTextSummary,
      type: 'website',
      url: `https://www.fluxline.pro${service.path}`,
      siteName: 'Fluxline Resonance Group',
      images: [
        {
          url: '/images/FluxlineLogo.png',
          width: 1200,
          height: 630,
          alt: `${service.title} - Fluxline Resonance Group`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Fluxline Resonance Group`,
      description: plainTextSummary,
      creator: '@fluxlinepro',
    },
    alternates: {
      canonical: service.path,
    },
  };
}

/**
 * Generate static params for all service pages
 */
export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((service) => ({
    slug: service.path.split('/').pop() || '',
  }));
}

export default async function ServiceDetailLayout({
  children,
  params,
}: ServiceDetailLayoutProps) {
  const { slug } = await params;

  const service = SERVICE_CATEGORIES.find(
    (s) => s.path.split('/').pop() === slug
  );

  if (!service) {
    return <>{children}</>;
  }

  const plainTextSummary = service.summary
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Service schema.org structured data
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://www.fluxline.pro${service.path}#service`,
    name: service.title,
    description: plainTextSummary,
    url: `https://www.fluxline.pro${service.path}`,
    provider: {
      '@type': 'Organization',
      '@id': 'https://www.fluxline.pro/#organization',
      name: 'Fluxline Resonance Group',
      url: 'https://www.fluxline.pro',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    serviceType: service.title,
  };

  // FAQPage schema.org structured data (only if FAQs exist)
  const faqSchema =
    service.faqs && service.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <Script
        id={`service-schema-${slug}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(serviceSchema) }}
      />
      {faqSchema && (
        <Script
          id={`faq-schema-${slug}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(faqSchema) }}
        />
      )}
      {children}
    </>
  );
}
