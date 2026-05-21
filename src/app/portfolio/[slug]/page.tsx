import React from 'react';
import Script from 'next/script';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllPortfolioSlugs,
  getPortfolioBySlug,
} from '../lib/portfolioLoader';
import PortfolioDetailClient from './PortfolioDetailClient';

interface PortfolioDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Portfolio Detail Page - Server Component
 *
 * Generates static pages for each portfolio project at build time
 */
export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);

  if (!project) {
    notFound();
  }

  // CreativeWork JSON-LD structured data for AI ingest and rich results
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://www.fluxline.pro/portfolio/${slug}#project`,
    name: project.title,
    description: project.seoMetadata.description,
    url: `https://www.fluxline.pro/portfolio/${slug}`,
    datePublished: project.publishedDate.toISOString(),
    image: project.featuredImage.url,
    creator: {
      '@type': 'Organization',
      '@id': 'https://www.fluxline.pro/#organization',
      name: 'Fluxline Resonance Group',
    },
    keywords: project.seoMetadata.keywords?.join(', '),
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': 'https://www.fluxline.pro/portfolio#collection',
      name: 'Fluxline Portfolio',
      publisher: {
        '@id': 'https://www.fluxline.pro/#organization',
      },
    },
  };

  return (
    <>
      <Script
        id={`portfolio-schema-${slug}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <PortfolioDetailClient project={project} />
    </>
  );
}

/**
 * Generate static paths for all portfolio projects
 */
export async function generateStaticParams() {
  const slugs = getAllPortfolioSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * Generate dynamic metadata for each portfolio project
 */
export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Fluxline Resonance Group',
      description: 'The portfolio project you are looking for does not exist.',
    };
  }

  return {
    title: project.seoMetadata.title,
    description: project.seoMetadata.description,
    keywords: project.seoMetadata.keywords,
    openGraph: {
      title: project.seoMetadata.title,
      description: project.seoMetadata.description,
      type: 'article',
      publishedTime: project.publishedDate.toISOString(),
      tags: project.tags,
      url: `https://www.fluxline.pro/portfolio/${slug}`,
      siteName: 'Fluxline Resonance Group',
      images: [
        {
          url: project.featuredImage.url,
          alt: project.featuredImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.seoMetadata.title,
      description: project.seoMetadata.description,
      images: [project.featuredImage.url],
      creator: '@fluxlinepro',
    },
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
  };
}
