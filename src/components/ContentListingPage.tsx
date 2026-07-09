'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxFilterChips from '@/theme/components/dsm/FxFilterChips';
import FxContentGrid from '@/theme/components/dsm/FxContentGrid';
import FxArticleCard from '@/theme/components/dsm/FxArticleCard';
import FxFeaturedCard from '@/theme/components/dsm/FxFeaturedCard';
import FxCTABand from '@/theme/components/dsm/FxCTABand';

export type SortOrder = 'newest' | 'oldest' | 'a-z' | 'z-a';

export interface ContentCard {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
  imageText: string;
  date?: Date;
  category?: string | null;
}

export interface SingleSelectFilter {
  type: 'single';
  label: string;
  placeholder?: string;
  options: Array<{ key: string; text: string }>;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export interface MultiSelectFilter {
  type: 'multi';
  label: string;
  placeholder?: string;
  options: Array<{ key: string; text: string }>;
  selectedKeys: string[];
  onChange: (selectedKeys: string[]) => void;
}

export type FilterConfig = SingleSelectFilter | MultiSelectFilter;

export interface ContentListingPageProps {
  title: string;
  iconName?: string;
  description: string;
  basePath: string;
  cards: ContentCard[];
  totalCount?: number;
  filters: FilterConfig[];
  availableViewTypes?: Array<'grid' | 'small-tile' | 'large-tile'>;
  resultsMessage?: string;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  ctaSection?: {
    title: string;
    description: string;
    buttons: Array<{
      label: string;
      variant: 'primary' | 'secondary';
      path: string;
    }>;
  };
  onCardClick?: (id: string) => void;
  backArrow?: boolean;
  backArrowPath?: string;
  customSection?: React.ReactNode;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
  heroChildren?: React.ReactNode;
  kicker?: string;
  subhead?: string;
  featuredCard?: {
    id: string;
    title: string;
    excerpt: string;
    category?: string;
    date?: string;
    image?: string;
  };
  sideCard?: React.ReactNode;
}

function formatDate(d?: Date): string {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function ContentListingPage({
  title,
  description,
  basePath,
  cards,
  filters,
  emptyStateTitle = 'No items found',
  emptyStateMessage = 'Try adjusting your filters to see more items.',
  ctaSection,
  onCardClick,
  customSection,
  onClearFilters,
  kicker,
  subhead,
  featuredCard,
  sideCard,
}: ContentListingPageProps) {
  const router = useRouter();

  const primaryFilter = filters.find((f) => f.type === 'single') as
    | SingleSelectFilter
    | undefined;

  const chipOptions = primaryFilter
    ? ['All', ...primaryFilter.options.filter((o) => o.key).map((o) => o.text)]
    : [];

  const activeChip = primaryFilter?.value
    ? primaryFilter.options.find((o) => o.key === primaryFilter.value)?.text ||
      'All'
    : 'All';

  const handleChipChange = (chip: string) => {
    if (!primaryFilter) return;
    if (chip === 'All') {
      primaryFilter.onChange(undefined);
      onClearFilters?.();
    } else {
      const opt = primaryFilter.options.find((o) => o.text === chip);
      primaryFilter.onChange(opt?.key || undefined);
    }
  };

  const sortedCards = React.useMemo(() => {
    return [...cards].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.getTime() - a.date.getTime();
    });
  }, [cards]);

  const handleCardClick = (id: string) => {
    if (onCardClick) {
      onCardClick(id);
    } else {
      router.push(`${basePath}/${id}`);
    }
  };

  return (
    <FxContainer as="section" style={{ padding: '64px 32px 88px' }}>
      <FxSectionHeading
        kicker={kicker || title}
        title={title}
        subhead={subhead || description}
        as="h1"
        style={{ marginBottom: 36 }}
      />

      {chipOptions.length > 0 && (
        <FxFilterChips
          options={chipOptions}
          value={activeChip}
          onChange={handleChipChange}
          style={{ marginBottom: 32 }}
        />
      )}

      {customSection && (
        <div style={{ marginBottom: 32 }}>{customSection}</div>
      )}

      {sortedCards.length > 0 ? (
        <FxContentGrid>
          {featuredCard && (
            <FxFeaturedCard
              title={featuredCard.title}
              excerpt={featuredCard.excerpt}
              category={featuredCard.category}
              date={featuredCard.date}
              image={featuredCard.image}
              href={`${basePath}/${featuredCard.id}`}
            />
          )}
          {sideCard}
          {sortedCards.map((card) => (
            <FxArticleCard
              key={card.id}
              title={card.title}
              excerpt={card.description}
              category={card.category || card.imageText}
              date={formatDate(card.date)}
              image={card.imageUrl}
              href={`${basePath}/${card.id}`}
            />
          ))}
        </FxContentGrid>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <h3
            style={{
              fontSize: 23,
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
            }}
          >
            {emptyStateTitle}
          </h3>
          <p style={{ fontSize: 16, color: 'var(--fx-text-muted)' }}>
            {emptyStateMessage}
          </p>
        </div>
      )}

      {ctaSection && (
        <div style={{ marginTop: 64 }}>
          <FxCTABand
            title={ctaSection.title}
            body={ctaSection.description}
            primaryLabel={ctaSection.buttons[0]?.label}
            primaryHref={ctaSection.buttons[0]?.path}
            secondaryLabel={ctaSection.buttons[1]?.label}
            secondaryHref={ctaSection.buttons[1]?.path}
          />
        </div>
      )}
    </FxContainer>
  );
}
