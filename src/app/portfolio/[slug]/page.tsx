import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPortfolioSlugs, getPortfolioBySlug } from '../portfolioData';
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

  return <PortfolioDetailClient project={project} />;
}

/**
 * Generate static paths for all portfolio projects
 */
export async function generateStaticParams() {
  const slugs = getAllPortfolioSlugs();
  return slugs.map((slug) => ({
    slug,
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
    },
  };
}
