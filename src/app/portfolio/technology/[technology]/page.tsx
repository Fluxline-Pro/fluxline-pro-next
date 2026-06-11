import React from 'react';
import type { Metadata } from 'next';
import {
  getAllPortfolioTechnologies,
  getPortfolioByTechnology,
} from '../../lib/portfolioLoader';
import { PortfolioTechnologyClient } from './PortfolioTechnologyClient';
import { notFound } from 'next/navigation';
import { buildSlugMap, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all technologies
export async function generateStaticParams() {
  const technologies = getAllPortfolioTechnologies();

  if (!technologies || technologies.length === 0) {
    console.warn('No portfolio technologies found for static generation');
    return [];
  }

  return Array.from(buildSlugMap(technologies).keys()).map((technology) => ({
    technology,
  }));
}

// Generate metadata for portfolio technology pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ technology: string }>;
}): Promise<Metadata> {
  const { technology } = await params;
  const displayTechnology = resolveSlug(
    technology,
    getAllPortfolioTechnologies()
  );

  if (!displayTechnology) {
    return {};
  }

  return {
    title: `Technology: ${displayTechnology}`,
    description: `Browse portfolio projects built with ${displayTechnology}. See our expertise in ${displayTechnology} development and implementation.`,
    keywords: `${displayTechnology}, portfolio, projects, technology, web development, software engineering`,
    openGraph: {
      title: `Technology: ${displayTechnology} - Fluxline Portfolio`,
      description: `Browse portfolio projects built with ${displayTechnology}.`,
      url: `https://www.fluxline.pro/portfolio/technology/${technology}`,
      siteName: 'Fluxline Resonance Group',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Technology: ${displayTechnology} - Fluxline Portfolio`,
      description: `Browse portfolio projects built with ${displayTechnology}.`,
      creator: '@aplusinflux',
    },
    alternates: {
      canonical: `/portfolio/technology/${technology}`,
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
 * Handles static generation and resolves slugged technologies for display.
 */
export default async function PortfolioTechnologyPage({
  params,
}: PortfolioTechnologyPageProps) {
  const { technology } = await params;
  const matchedTechnology = resolveSlug(
    technology,
    getAllPortfolioTechnologies()
  );

  if (!matchedTechnology) {
    notFound();
  }

  const projects = getPortfolioByTechnology(matchedTechnology);

  if (projects.length === 0) {
    notFound();
  }

  return (
    <PortfolioTechnologyClient
      technology={matchedTechnology}
      projects={projects}
    />
  );
}
