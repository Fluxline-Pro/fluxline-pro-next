import React from 'react';
import type { Metadata } from 'next';
import { format } from 'date-fns';
import { PressReleaseListingClient } from './PressReleaseListingClient';
import { getAllPressReleases, getAllYears } from './lib/pressReleaseLoader';

export const metadata: Metadata = {
  title: 'Press Release',
  description:
    'Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group. Stay updated with our latest news and achievements.',
  keywords:
    'press release, news, announcements, media, milestones, Fluxline news, company updates',
  openGraph: {
    title: 'Press Release - Fluxline Professional Services',
    description:
      'Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group.',
    url: 'https://www.fluxline.pro/press-release',
    siteName: 'Fluxline Professional Services',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Press Releases',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Release - Fluxline Professional Services',
    description:
      'Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/press-release',
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
