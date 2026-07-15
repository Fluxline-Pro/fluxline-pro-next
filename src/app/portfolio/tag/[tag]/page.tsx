import React from 'react';
import type { Metadata } from 'next';
import {
  getPortfolioByTag,
  getAllPortfolioTags,
} from '../../lib/portfolioLoader';
import { PortfolioTagClient } from './PortfolioTagClient';
import { notFound } from 'next/navigation';
import { slugify, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllPortfolioTags();

  // Ensure we return an array even if empty
  if (!tags || tags.length === 0) {
    console.warn('No portfolio tags found for static generation');
    return [];
  }

  // Route params are URL-safe slugs, so generated folder names are byte-identical
  // whether the incoming request is percent-encoded or not.
  return tags.map((tag) => ({
    tag: slugify(tag),
  }));
}

// Generate metadata for portfolio tag pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = resolveSlug(tagSlug, getAllPortfolioTags());

  if (!tag) return {};

  return {
    title: `Tag: ${tag}`,
    description: `Explore portfolio projects tagged with "${tag}". View our work in ${tag} and related areas.`,
    keywords: `${tag}, portfolio, projects, web development, design, case studies`,
    openGraph: {
      title: `Tag: ${tag} - Fluxline Portfolio`,
      description: `Explore portfolio projects tagged with "${tag}".`,
      url: `https://www.fluxline.pro/portfolio/tag/${tagSlug}`,
      siteName: 'Fluxline Resonance Group',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Tag: ${tag} - Fluxline Portfolio`,
      description: `Explore portfolio projects tagged with "${tag}".`,
      creator: '@aplusinflux',
    },
    alternates: {
      canonical: `/portfolio/tag/${tagSlug}`,
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
 * Resolves the URL slug back to its display name, then filters projects by that name.
 */
export default async function PortfolioTagPage({
  params,
}: PortfolioTagPageProps) {
  const { tag: tagSlug } = await params;

  // Resolve the slug to the canonical display name from content frontmatter
  const tag = resolveSlug(tagSlug, getAllPortfolioTags());

  if (!tag) {
    notFound();
  }

  const projects = getPortfolioByTag(tag);

  if (projects.length === 0) {
    notFound();
  }

  return <PortfolioTagClient tag={tag} projects={projects} />;
}
