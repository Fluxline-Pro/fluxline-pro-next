'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '../types';
import FxCard from '@/theme/components/dsm/FxCard';
import FxButton from '@/theme/components/dsm/FxButton';
import FxCallout from '@/theme/components/dsm/FxCallout';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { RCF_OFFERINGS, STOREFRONT_URL } from '../constants';
import { RCF_PREVIEW_PDF, RCF_RELEASE_WINDOW } from '@/lib/resonanceCore';

interface BookDetailClientProps {
  book: Book;
}

/**
 * Availability section.
 *
 * Replaces the former multi-stage purchase flow. Purchase — Stripe checkout,
 * print fulfillment, entitlements — is owned entirely by store.fluxline.pro, so
 * this site only announces and hands off. No prices are quoted here on purpose:
 * the storefront catalog is the authority on pricing.
 */
function AvailabilitySection({ book }: { book: Book }) {
  const isReleased = book.status === 'available';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--fx-space-l)',
      }}
    >
      <FxCallout
        tone='gold'
        title={isReleased ? 'Available now' : `Coming ${RCF_RELEASE_WINDOW}`}
      >
        {isReleased ? (
          <>
            Every edition is sold through the Fluxline store. Pricing, formats,
            and shipping are handled there.
          </>
        ) : (
          <>
            The book and its companion workbook are in final production. When
            they launch, every edition will be available from the Fluxline
            store — there is nothing to pre-order here.
          </>
        )}
      </FxCallout>

      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fx-accent)',
            marginBottom: 'var(--fx-space-s)',
          }}
        >
          What will be offered
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--fx-space-l)',
          }}
        >
          {RCF_OFFERINGS.map((group) => (
            <div key={group.group}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  marginBottom: 'var(--fx-space-xs)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                {group.group}
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 'var(--fx-space-m)',
                }}
              >
                {group.items.map((item) => (
                  <FxCard key={item.name} variant='raised' style={{ padding: 20 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: 'var(--fx-text-heading)',
                        marginBottom: 'var(--fx-space-xxs)',
                        fontFamily: 'var(--fx-font)',
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: 'var(--fx-text-muted)',
                      }}
                    >
                      {item.body}
                    </div>
                    {item.note && (
                      <div
                        style={{
                          fontSize: 12.5,
                          lineHeight: 1.5,
                          color: 'var(--fx-text-soft)',
                          marginTop: 'var(--fx-space-xs)',
                          fontStyle: 'italic',
                        }}
                      >
                        {item.note}
                      </div>
                    )}
                  </FxCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'var(--fx-space-s)',
          flexWrap: 'wrap',
        }}
      >
        <FxButton variant='primary' href={STOREFRONT_URL}>
          Visit the Fluxline Store
        </FxButton>
        <FxButton variant='outline' href={RCF_PREVIEW_PDF}>
          Read the Introduction Preview
        </FxButton>
      </div>
    </div>
  );
}

/**
 * Book Detail Client Component
 * Uses UnifiedContentDetail with an availability hand-off to the storefront.
 */
export default function BookDetailClient({ book }: BookDetailClientProps) {
  const router = useRouter();

  // Prepare metadata
  const metadata = [
    ...(book.author ? [{ label: 'Author', value: book.author }] : []),
    ...(book.publisher ? [{ label: 'Publisher', value: book.publisher }] : []),
    ...(book.pageCount ? [{ label: 'Pages', value: `${book.pageCount}` }] : []),
    ...(book.language ? [{ label: 'Language', value: book.language }] : []),
    ...(book.dimensions
      ? [{ label: 'Dimensions', value: book.dimensions }]
      : []),
    {
      label: 'Status',
      value:
        book.status === 'available'
          ? 'Available Now'
          : `Coming ${RCF_RELEASE_WINDOW}`,
    },
  ];

  // Prepare badges (category + tags)
  const badges = [
    ...(book.category
      ? [{ label: book.category, variant: 'primary' as const }]
      : []),
    ...(book.tags || []).map((tag) => ({
      label: `#${tag}`,
      variant: 'secondary' as const,
    })),
  ];

  const config: UnifiedContentDetailConfig = {
    title: book.title,
    content: book.content,
    contentType: 'markdown',
    excerpt: book.excerpt || book.description,
    backLink: {
      url: '/books',
      label: 'Back to Books',
    },
    imageConfig: book.coverImageUrl
      ? {
          source: book.coverImageUrl,
          alt: book.coverImageAlt || book.title,
          title: book.title,
          showTitle: false,
          gallery: book.gallery,
        }
      : undefined,
    metadata,
    badges,
    sectionsPosition: 'before', // Show availability before the main content
    sections: [
      {
        title: 'Availability',
        content: <AvailabilitySection book={book} />,
      },
    ],
    cta: {
      title: 'Ready to structure the shift?',
      description:
        'Explore the Resonance Core Framework™ as a guided engagement, or tell us where you are and we will map the right first step.',
      buttons: [
        {
          label: 'Resonance Core Services',
          onClick: () => router.push('/services/resonance-core'),
          variant: 'primary',
        },
        {
          label: 'Get in Touch',
          onClick: () => router.push('/contact'),
          variant: 'secondary',
        },
      ],
    },
  };

  return <UnifiedContentDetail config={config} />;
}
