'use client';

import React from 'react';
import {
  ContentListingPage,
  FilterConfig,
  ContentCard,
} from '@/components/ContentListingPage';

interface PressReleaseListingClientProps {
  cards: ContentCard[];
  allYears: string[];
}

/**
 * Press Release Listing Client Component
 * Handles filtering and transforms data for ContentListingPage
 */
export function PressReleaseListingClient({
  cards,
  allYears,
}: PressReleaseListingClientProps) {
  const [selectedYear, setSelectedYear] = React.useState<string | undefined>();

  // Filter cards based on selected year
  const filteredCards = React.useMemo(() => {
    if (!selectedYear) return cards;
    return cards.filter((card) => card.imageText?.includes(selectedYear));
  }, [cards, selectedYear]);

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Year',
      options: [
        { key: '', text: 'All' },
        ...allYears.map((year) => ({ key: year, text: year })),
      ],
      value: selectedYear,
      onChange: setSelectedYear,
    },
  ];

  return (
    <ContentListingPage
      title="Announcements"
      kicker="Press"
      subhead="Official updates from Fluxline Resonance Group."
      description="Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group."
      basePath="/press-release"
      cards={filteredCards}
      filters={filters}
      emptyStateTitle="No press releases found"
      emptyStateMessage="Check back soon for updates and announcements."
      onClearFilters={() => setSelectedYear(undefined)}
    />
  );
}
