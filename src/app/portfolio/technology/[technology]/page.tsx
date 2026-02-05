import React from 'react';
import type { Metadata } from 'next';
import {
  getAllPortfolioProjects,
  getAllPortfolioTechnologies,
} from '../../lib/portfolioLoader';
import { PortfolioTechnologyClient } from './PortfolioTechnologyClient';
import { notFound } from 'next/navigation';
import { findMatchingTag, tagsMatch } from '@/utils/tag-utils';

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

  // Return unencoded technologies - filesystem will have real spaces,
  // browser and Azure will handle URL encoding automatically
  return technologies.map((technology) => ({
    technology: technology,
  }));
}

// Generate metadata for portfolio technology pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ technology: string }>;
}): Promise<Metadata> {
  const { technology } = await params;
  const decodedTechnology = decodeURIComponent(technology);

  return {
    title: `Technology: ${decodedTechnology}`,
    description: `Browse portfolio projects built with ${decodedTechnology}. See our expertise in ${decodedTechnology} development and implementation.`,
    keywords: `${decodedTechnology}, portfolio, projects, technology, web development, software engineering`,
    openGraph: {
      title: `Technology: ${decodedTechnology} - Fluxline Portfolio`,
      description: `Browse portfolio projects built with ${decodedTechnology}.`,
      url: `https://www.fluxline.pro/portfolio/technology/${encodeURIComponent(technology)}`,
      siteName: 'Fluxline Resonance Group',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Technology: ${decodedTechnology} - Fluxline Portfolio`,
      description: `Browse portfolio projects built with ${decodedTechnology}.`,
      creator: '@aplusinflux',
    },
    alternates: {
      canonical: `/portfolio/technology/${encodeURIComponent(technology)}`,
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
 * Handles static generation and passes data to client component
 * Uses fuzzy matching to handle spaces and case variations
 */
export default async function PortfolioTechnologyPage({
  params,
}: PortfolioTechnologyPageProps) {
  const { technology } = await params;
  const decodedTechnology = decodeURIComponent(technology);

  // Get all projects and filter by technology (with fuzzy matching)
  const allProjects = getAllPortfolioProjects();
  const allTechnologies = getAllPortfolioTechnologies();

  // Find the canonical technology that matches
  const matchedTechnology = findMatchingTag(decodedTechnology, allTechnologies);

  if (!matchedTechnology) {
    notFound();
  }

  // Filter projects using fuzzy technology matching
  const projects = allProjects.filter((project) =>
    project.technologies.some((tech) => tagsMatch(tech, decodedTechnology))
  );

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
