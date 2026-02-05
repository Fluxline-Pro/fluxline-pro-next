import React from 'react';
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
