import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllGroundingDemoSlugs,
  getGroundingDemoBySlug,
  getRelatedGroundingDemos,
} from '../lib/groundingDemosLoader';
import { GroundingDemoDetailClient } from './GroundingDemoDetailClient';

export async function generateStaticParams() {
  return getAllGroundingDemoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getGroundingDemoBySlug(slug);

  if (!post) {
    return {
      title: 'Grounding Demo Not Found',
    };
  }

  return {
    title: post.seoMetadata.title,
    description: post.seoMetadata.description,
    keywords: post.seoMetadata.keywords,
    openGraph: {
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
      type: 'article',
      publishedTime: post.publishedDate.toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
    },
    alternates: {
      canonical: `/blog/resonant-identity/demos/${slug}`,
    },
  };
}

export default async function GroundingDemoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getGroundingDemoBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedGroundingDemos(post);

  return <GroundingDemoDetailClient post={post} relatedPosts={relatedPosts} />;
}
