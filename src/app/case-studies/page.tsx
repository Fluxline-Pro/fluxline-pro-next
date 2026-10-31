import React from 'react';
import type { Metadata } from 'next';
import { getAllCaseStudies } from './lib/caseStudyLoader';
import CaseStudiesListingClient from './CaseStudiesListingClient';

export const metadata: Metadata = {
  title: 'Consulting, Design & Coaching Case Studies',
  description:
    'Case studies in digital architecture, brand design, and coaching, including Azure and SharePoint infrastructure work for Intermountain Health.',
  keywords:
    'case studies, client success, transformation, business results, consulting, strategic planning, success stories',
  openGraph: {
    title: 'Consulting, Design & Coaching Case Studies | Fluxline.pro',
    description:
      'Case studies in digital architecture, brand design, and coaching, including Azure and SharePoint infrastructure work for Intermountain Health.',
    url: 'https://www.fluxline.pro/case-studies',
    siteName: 'Fluxline',
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
    title: 'Consulting, Design & Coaching Case Studies | Fluxline.pro',
    description:
      'Case studies in digital architecture, brand design, and coaching, including Azure and SharePoint infrastructure work for Intermountain Health.',
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
