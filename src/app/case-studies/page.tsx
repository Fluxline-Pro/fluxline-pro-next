import React from 'react';
import type { Metadata } from 'next';
import { getAllCaseStudies } from './lib/caseStudyLoader';
import CaseStudiesListingClient from './CaseStudiesListingClient';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore client success stories and discover how strategic transformation drives measurable results across various industries. Real-world examples of business transformation.',
  keywords:
    'case studies, client success, transformation, business results, consulting, strategic planning, success stories',
  openGraph: {
    title: 'Case Studies - Fluxline Professional Services',
    description:
      'Client success stories showcasing strategic transformation and measurable results.',
    url: 'https://www.fluxline.pro/case-studies',
    siteName: 'Fluxline Professional Services',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies - Fluxline Professional Services',
    description:
      'Client success stories showcasing strategic transformation and measurable results.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/case-studies',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Case Studies Page - Server Component
 * Loads case studies from Markdown files and passes to client component
 */
export default async function CaseStudiesPage() {
  const allCaseStudies = getAllCaseStudies();

  return <CaseStudiesListingClient caseStudies={allCaseStudies} />;
}
