import React from 'react';
import { format } from 'date-fns';
import { PressReleaseListingClient } from './PressReleaseListingClient';
import { getAllPressReleases, getAllYears } from './lib/pressReleaseLoader';

/**
 * Press Release Page Component - Server Component
 * Loads press releases from markdown files and passes to client component
 */
export default function PressReleasePage() {
  // Load all press releases from file system (sorted by date, newest first)
  const allPressReleases = getAllPressReleases();

  // Get all unique years for filtering
  const allYears = getAllYears();

  // Transform press releases to card format
  const cards = allPressReleases.map((release) => ({
    id: release.id,
    title: release.title,
    description: release.subtitle || release.description,
    imageUrl: release.imageUrl,
    imageAlt: release.imageAlt || release.title,
    imageText: format(release.publishedDate, 'MMMM d, yyyy'),
  }));

  return (
    <PressReleaseListingClient cards={cards} allYears={allYears.map(String)} />
  );
}
