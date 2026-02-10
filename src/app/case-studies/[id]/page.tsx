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
 * - SEO optimized with metadata
 */

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
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.seoMetadata.title,
      description: caseStudy.seoMetadata.description,
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

  return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
