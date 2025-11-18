import React from 'react';
import { pressReleasesMockData } from '@/store/mock-data/pressReleaseMock';
import { PressReleaseDetailClient } from './PressReleaseDetailClient';
import notFound from '@/app/services/scrolls/[scroll]/not-found';

// Generate static params for all press releases
export async function generateStaticParams() {
  return pressReleasesMockData.map((release) => ({
    id: release.id,
  }));
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

  // Find the press release data
  const pressRelease = pressReleasesMockData.find(
    (release) => release.id === id
  );

  if (!pressRelease) {
    notFound();
  };

  return <PressReleaseDetailClient pressRelease={pressRelease} />;
}
