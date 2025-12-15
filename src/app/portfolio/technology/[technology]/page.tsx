import React from 'react';
import type { Metadata } from 'next';
import {
  getAllPortfolioProjects,
  getAllPortfolioTechnologies,
} from '../../lib/portfolioLoader';
import { PortfolioTechnologyClient } from './PortfolioTechnologyClient';
import { notFound } from 'next/navigation';

// Generate static params for all technologies
export async function generateStaticParams() {
  const technologies = getAllPortfolioTechnologies();

  // Ensure we return an array even if empty
  if (!technologies || technologies.length === 0) {
    console.warn('No portfolio technologies found for static generation');
    return [];
  }

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
 */
export default async function PortfolioTechnologyPage({
  params,
}: PortfolioTechnologyPageProps) {
  const { technology } = await params;
  const decodedTechnology = decodeURIComponent(technology);

  // Get all projects and filter by technology
  const allProjects = getAllPortfolioProjects();
  const projects = allProjects.filter((project) =>
    project.technologies.includes(decodedTechnology)
  );

  if (projects.length === 0) {
    notFound();
  }

  return (
    <PortfolioTechnologyClient
      technology={decodedTechnology}
      projects={projects}
    />
  );
}
