import React from 'react';
import { Metadata } from 'next';
import {
  getAllPressReleaseIds,
  getPressReleaseById,
} from '../lib/pressReleaseLoader';
import { PressReleaseDetailClient } from './PressReleaseDetailClient';
import notFound from '@/app/services/scrolls/[scroll]/not-found';

// Generate static params for all press releases
export async function generateStaticParams() {
  const ids = getAllPressReleaseIds();
  return ids.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pressRelease = getPressReleaseById(id);

  if (!pressRelease) {
    return {
      title: 'Press Release Not Found',
    };
  }

  const title = pressRelease.seoMetadata?.title ?? pressRelease.title;
  const description =
    pressRelease.seoMetadata?.description ?? pressRelease.description;
  const keywords = pressRelease.seoMetadata?.keywords;
  const image = pressRelease.imageUrl
    ? {
        url: pressRelease.imageUrl,
        alt: pressRelease.imageAlt || pressRelease.title,
      }
    : {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: pressRelease.title,
      };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: pressRelease.publishedDate.toISOString(),
      url: `https://www.fluxline.pro/press-release/${id}`,
      siteName: 'Fluxline Resonance Group',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fluxlinepro',
    },
    alternates: {
      canonical: `/press-release/${id}`,
    },
  };
}

/**
 * Individual Press Release Detail Page - Server Component
 * Handles static generation and passes data to client component
 */
export default async function PressReleaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Load the press release from file system
  const pressRelease = getPressReleaseById(id);

  if (!pressRelease) {
    notFound();
  }

  return <PressReleaseDetailClient pressRelease={pressRelease} />;
}
