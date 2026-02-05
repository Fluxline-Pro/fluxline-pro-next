import React from 'react';
import type { Metadata } from 'next';
import {
  getAllPortfolioProjects,
  getAllPortfolioTags,
} from '../../lib/portfolioLoader';
import { PortfolioTagClient } from './PortfolioTagClient';
import { notFound } from 'next/navigation';

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllPortfolioTags();

  // Ensure we return an array even if empty
  if (!tags || tags.length === 0) {
    console.warn('No portfolio tags found for static generation');
    return [];
  }

  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

// Generate metadata for portfolio tag pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Tag: ${decodedTag}`,
    description: `Explore portfolio projects tagged with "${decodedTag}". View our work in ${decodedTag} and related areas.`,
    keywords: `${decodedTag}, portfolio, projects, web development, design, case studies`,
    openGraph: {
      title: `Tag: ${decodedTag} - Fluxline Portfolio`,
      description: `Explore portfolio projects tagged with "${decodedTag}".`,
      url: `https://www.fluxline.pro/portfolio/tag/${encodeURIComponent(tag)}`,
      siteName: 'Fluxline Resonance Group',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Tag: ${decodedTag} - Fluxline Portfolio`,
      description: `Explore portfolio projects tagged with "${decodedTag}".`,
      creator: '@aplusinflux',
    },
    alternates: {
      canonical: `/portfolio/tag/${encodeURIComponent(tag)}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface PortfolioTagPageProps {
  params: Promise<{ tag: string }>;
}

/**
 * Portfolio Tag Filter Page - Server Component
 * Handles static generation and passes data to client component
 */
export default async function PortfolioTagPage({
  params,
}: PortfolioTagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Get all projects and filter by tag
  const allProjects = getAllPortfolioProjects();
  const projects = allProjects.filter((project) =>
    project.tags.includes(decodedTag)
  );

  if (projects.length === 0) {
    notFound();
  }

  return <PortfolioTagClient tag={decodedTag} projects={projects} />;
}
