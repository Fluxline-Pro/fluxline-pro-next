import React from 'react';
import type { Metadata } from 'next';
import {
  getPortfolioByTechnology,
  getAllPortfolioTechnologies,
} from '../../lib/portfolioLoader';
import { PortfolioTechnologyClient } from './PortfolioTechnologyClient';
import { notFound } from 'next/navigation';
import { slugify, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all technologies
export async function generateStaticParams() {
  const technologies = getAllPortfolioTechnologies();

  // Ensure we return an array even if empty
  if (!technologies || technologies.length === 0) {
    console.warn('No portfolio technologies found for static generation');
    return [];
  }

  // Route params are URL-safe slugs, so generated folder names are byte-identical
  // whether the incoming request is percent-encoded or not.
  return technologies.map((technology) => ({
    technology: slugify(technology),
  }));
}

// Generate metadata for portfolio technology pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ technology: string }>;
}): Promise<Metadata> {
  const { technology: technologySlug } = await params;
  const technology = resolveSlug(
    technologySlug,
    getAllPortfolioTechnologies()
  );

  if (!technology) return {};

  return {
    title: `Technology: ${technology}`,
    description: `Browse portfolio projects built with ${technology}. See our expertise in ${technology} development and implementation.`,
    keywords: `${technology}, portfolio, projects, technology, web development, software engineering`,
    openGraph: {
      title: `Technology: ${technology} - Fluxline Portfolio`,
      description: `Browse portfolio projects built with ${technology}.`,
      url: `https://www.fluxline.pro/portfolio/technology/${technologySlug}`,
      siteName: 'Fluxline Resonance Group',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Technology: ${technology} - Fluxline Portfolio`,
      description: `Browse portfolio projects built with ${technology}.`,
      creator: '@aplusinflux',
    },
    alternates: {
      canonical: `/portfolio/technology/${technologySlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface PortfolioTechnologyPageProps {
  params: Promise<{ technology: string }>;
}

/**
 * Portfolio Technology Filter Page - Server Component
 * Resolves the URL slug back to its display name, then filters projects by that name.
 */
export default async function PortfolioTechnologyPage({
  params,
}: PortfolioTechnologyPageProps) {
  const { technology: technologySlug } = await params;

  // Resolve the slug to the canonical display name from content frontmatter
  const technology = resolveSlug(
    technologySlug,
    getAllPortfolioTechnologies()
  );

  if (!technology) {
    notFound();
  }

  const projects = getPortfolioByTechnology(technology);

  if (projects.length === 0) {
    notFound();
  }

  return (
    <PortfolioTechnologyClient technology={technology} projects={projects} />
  );
}
