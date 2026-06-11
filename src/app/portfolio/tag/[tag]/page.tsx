import React from 'react';
import type { Metadata } from 'next';
import { getAllPortfolioTags, getPortfolioByTag } from '../../lib/portfolioLoader';
import { PortfolioTagClient } from './PortfolioTagClient';
import { notFound } from 'next/navigation';
import { buildSlugMap, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllPortfolioTags();

  if (!tags || tags.length === 0) {
    console.warn('No portfolio tags found for static generation');
    return [];
  }

  return Array.from(buildSlugMap(tags).keys()).map((tag) => ({ tag }));
}

// Generate metadata for portfolio tag pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const displayTag = resolveSlug(tag, getAllPortfolioTags());

  if (!displayTag) {
    return {};
  }

  return {
    title: `Tag: ${displayTag}`,
    description: `Explore portfolio projects tagged with "${displayTag}". View our work in ${displayTag} and related areas.`,
    keywords: `${displayTag}, portfolio, projects, web development, design, case studies`,
    openGraph: {
      title: `Tag: ${displayTag} - Fluxline Portfolio`,
      description: `Explore portfolio projects tagged with "${displayTag}".`,
      url: `https://www.fluxline.pro/portfolio/tag/${tag}`,
      siteName: 'Fluxline Resonance Group',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Tag: ${displayTag} - Fluxline Portfolio`,
      description: `Explore portfolio projects tagged with "${displayTag}".`,
      creator: '@aplusinflux',
    },
    alternates: {
      canonical: `/portfolio/tag/${tag}`,
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
 * Handles static generation and resolves slugged tags for display.
 */
export default async function PortfolioTagPage({
  params,
}: PortfolioTagPageProps) {
  const { tag } = await params;
  const matchedTag = resolveSlug(tag, getAllPortfolioTags());

  if (!matchedTag) {
    notFound();
  }

  const projects = getPortfolioByTag(matchedTag);

  if (projects.length === 0) {
    notFound();
  }

  return <PortfolioTagClient tag={matchedTag} projects={projects} />;
}
