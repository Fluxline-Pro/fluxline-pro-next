/**
 * Case Study Detail Page Component
 * Displays comprehensive information about a single case study
 *
 * Features:
 * - Static generation with generateStaticParams
 * - Markdown content rendering
 * - Metrics display with visual emphasis
 * - Service and technology badges
 * - Client testimonial
 * - Navigation CTAs
 * - Responsive layout
 * - SEO optimized with metadata and JSON-LD structured data
 */

import React from 'react';
import Script from 'next/script';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCaseStudySlugs, getCaseStudyById } from '../lib/caseStudyLoader';
import CaseStudyDetailClient from './CaseStudyDetailClient';

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((id) => ({
    id: id,
  }));
}

// Generate metadata for each case study
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = getCaseStudyById(id);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Fluxline',
    };
  }

  return {
    title: caseStudy.seoMetadata.title,
    description: caseStudy.seoMetadata.description,
    keywords: caseStudy.seoMetadata.keywords,
    openGraph: {
      title: caseStudy.seoMetadata.title,
      description: caseStudy.seoMetadata.description,
      type: 'article',
      publishedTime: caseStudy.publishedDate.toISOString(),
      url: `https://www.fluxline.pro/case-studies/${id}`,
      siteName: 'Fluxline Resonance Group',
      images: caseStudy.imageUrl
        ? [{ url: caseStudy.imageUrl, alt: caseStudy.imageAlt || caseStudy.title }]
        : [
            {
              url: '/images/FluxlineLogo.png',
              width: 1200,
              height: 630,
              alt: caseStudy.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.seoMetadata.title,
      description: caseStudy.seoMetadata.description,
      creator: '@fluxlinepro',
    },
    alternates: {
      canonical: `/case-studies/${id}`,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = getCaseStudyById(id);

  if (!caseStudy) {
    notFound();
  }

  // Article/CaseStudy JSON-LD structured data for AI ingest and rich results
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://www.fluxline.pro/case-studies/${id}#article`,
    headline: caseStudy.title,
    description: caseStudy.seoMetadata.description,
    url: `https://www.fluxline.pro/case-studies/${id}`,
    datePublished: caseStudy.publishedDate.toISOString(),
    image: caseStudy.imageUrl || 'https://www.fluxline.pro/images/FluxlineLogo.png',
    author: {
      '@type': 'Organization',
      '@id': 'https://www.fluxline.pro/#organization',
      name: 'Fluxline Resonance Group',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.fluxline.pro/#organization',
      name: 'Fluxline Resonance Group',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.fluxline.pro/images/FluxlineLogo.png',
      },
    },
    keywords: caseStudy.seoMetadata.keywords?.join(', '),
    about: {
      '@type': 'Thing',
      name: caseStudy.industry,
    },
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': 'https://www.fluxline.pro/case-studies#collection',
      name: 'Fluxline Case Studies',
      publisher: {
        '@id': 'https://www.fluxline.pro/#organization',
      },
    },
  };

  return (
    <>
      <Script
        id={`case-study-schema-${id}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <CaseStudyDetailClient caseStudy={caseStudy} />
    </>
  );
}
