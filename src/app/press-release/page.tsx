'use client';

import React from 'react';
import { format } from 'date-fns';
import { ContentListingPage, FilterConfig } from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { pressReleasesMockData } from '@/store/mock-data/pressReleaseMock';

/**
 * Press Release Page Component
 * Uses the unified ContentListingPage component
 * 
 * Note: Currently uses mock data. This will be migrated to use
 * file-based content loading (MDX) similar to Blog and Portfolio
 */
export default function PressReleasePage() {
  // Use direct import of mock data (sorted by date, newest first)
  const allPressReleases = React.useMemo(() => {
    return [...pressReleasesMockData].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }, []);

  // Filter state
  const [selectedYear, setSelectedYear] = React.useState<string | undefined>();

  // Get all unique years
  const allYears = React.useMemo(() => {
    const years = new Set(
      allPressReleases.map((release) => release.date.getFullYear().toString())
    );
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [allPressReleases]);

  // Filter press releases based on selected year
  const pressReleases = React.useMemo(() => {
    if (!selectedYear) {
      return allPressReleases;
    }
    return allPressReleases.filter(
      (release) => release.date.getFullYear().toString() === selectedYear
    );
  }, [allPressReleases, selectedYear]);

  // Transform press releases to card format
  const cards = React.useMemo(() => {
    return pressReleases.map((release) => ({
      id: release.id,
      title: release.title,
      description: release.subtitle || release.description,
      imageUrl: release.imageUrl,
      imageAlt: release.imageAlt || release.title,
      imageText: format(release.date, 'MMMM d, yyyy'),
    }));
  }, [pressReleases]);

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Year',
      options: [
        { key: '', text: 'All Years' },
        ...allYears.map((year) => ({ key: year, text: year })),
      ],
      value: selectedYear,
      onChange: setSelectedYear,
    },
  ];

  // Build results message
  const resultsMessage = `Showing ${pressReleases.length} ${pressReleases.length === 1 ? 'press release' : 'press releases'}${selectedYear ? ` from ${selectedYear}` : ''}`;

  return (
    <ContentListingPage
      title='Press Release'
      iconName={getIconForPath('/press-release') || 'News'}
      description='Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group. Stay informed about our latest developments, partnerships, and achievements.'
      basePath='/press-release'
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No press releases found'
      emptyStateMessage='Check back soon for updates and announcements.'
    />
  );
}
