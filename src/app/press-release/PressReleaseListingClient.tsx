'use client';

import React from 'react';
import {
  ContentListingPage,
  FilterConfig,
  ContentCard,
} from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';

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
  // Filter state
  const [selectedYear, setSelectedYear] = React.useState<string | undefined>();

  // Filter cards based on selected year
  const filteredCards = React.useMemo(() => {
    if (!selectedYear) {
      return cards;
    }
    return cards.filter((card) => card.imageText?.includes(selectedYear));
  }, [cards, selectedYear]);

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
  const resultsMessage = `Showing ${filteredCards.length} ${filteredCards.length === 1 ? 'press release' : 'press releases'}${selectedYear ? ` from ${selectedYear}` : ''}`;

  return (
    <ContentListingPage
      title='Press Release'
      iconName={getIconForPath('/press-release') || 'News'}
      description='Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group. Stay informed about our latest developments, partnerships, and achievements.'
      basePath='/press-release'
      cards={filteredCards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No press releases found'
      emptyStateMessage='Check back soon for updates and announcements.'
    />
  );
}
