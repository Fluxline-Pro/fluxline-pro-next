'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Book } from '../types';
import { InteractiveCard } from '@/components/InteractiveCard';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';

interface BookDetailClientProps {
  book: Book;
}

type SelectedFormat = 'hardcopy' | 'softcopy' | 'digital';

// Placeholder function for Shop integration
const handleShopIntegrationPlaceholder = () => {
  alert('Shop integration coming soon');
};

/**
 * Purchase Options Section Component
 * Multi-stage purchase flow unique to books
 */
function PurchaseOptionsSection({ book }: { book: Book }) {
  const { theme } = useAppTheme();
  const [selectedFormat, setSelectedFormat] = useState<SelectedFormat | null>(
    null
  );

  const handleFormatSelect = (format: SelectedFormat) => {
    setSelectedFormat(format);
  };

  const handleReset = () => {
    setSelectedFormat(null);
  };

  return (
    <div
      id='purchase'
      style={{
        padding: theme.spacing.xl,
        backgroundColor: theme.palette.neutralLighterAlt,
        borderRadius: theme.effects.roundedCorner6,
      }}
    >
      {/* Stage 1: Format Selection */}
      {!selectedFormat && (
        <div>
          <p
            className='text-center mb-8 text-lg'
            style={{ color: theme.palette.neutralPrimary }}
          >
            Choose your preferred format:
          </p>
          <div className='grid md:grid-cols-3 gap-6'>
            <InteractiveCard
              id='hardcopy'
              title='Hard Copy'
              description='Premium hardcover or softcover editions available through Amazon'
              icon='BookmarkReport'
              iconPosition='center'
              onClick={() => handleFormatSelect('hardcopy')}
            />
            <InteractiveCard
              id='softcopy'
              title='Soft Copy'
              description='Softcover paperback edition available through Amazon'
              icon='BookSearch'
              iconPosition='center'
              onClick={() => handleFormatSelect('softcopy')}
            />
            <InteractiveCard
              id='digital'
              title='Digital / eBook'
              description='Instant access to PDF or eBook formats from multiple retailers'
              icon='BookAnswers'
              iconPosition='center'
              onClick={() => handleFormatSelect('digital')}
            />
          </div>
        </div>
      )}

      {/* Stage 2: Format-Specific Options */}
      {selectedFormat && (
        <div>
          {/* Back Button */}
          <button
            onClick={handleReset}
            className='mb-6 px-4 py-2 rounded'
            style={{
              backgroundColor: theme.palette.neutralLighter,
              color: theme.palette.themePrimary,
              border: `1px solid ${theme.palette.neutralTertiary}`,
              cursor: 'pointer',
            }}
          >
            ← Back to Format Selection
          </button>

          {/* Hard Copy Options */}
          {selectedFormat === 'hardcopy' && (
            <div>
              <h3
                className='text-2xl font-bold mb-4'
                style={{ color: theme.palette.themePrimary }}
              >
                Hard Copy Editions
              </h3>
              <p
                className='mb-6'
                style={{ color: theme.palette.neutralPrimary }}
              >
                Choose your preferred hardcover edition from Amazon:
              </p>
              <div className='grid md:grid-cols-2 gap-6'>
                {book.retailers
                  .filter((r) => r.formats.includes('hardcover'))
                  .map((retailer) => {
                    const price = book.prices.find(
                      (p) =>
                        p.format === 'hardcover' && p.retailer === retailer.name
                    );
                    return (
                      <a
                        key={retailer.name}
                        href={retailer.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className='p-6 rounded-lg transition-all'
                          style={{
                            backgroundColor: theme.palette.neutralLighter,
                            border: `2px solid ${theme.palette.neutralTertiary}`,
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              theme.palette.themePrimary;
                            e.currentTarget.style.transform =
                              'translateY(-4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              theme.palette.neutralTertiary;
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <h4
                            className='text-xl font-bold mb-2'
                            style={{ color: theme.palette.themePrimary }}
                          >
                            {retailer.name} - Hardcover
                          </h4>
                          <p
                            className='mb-4'
                            style={{ color: theme.palette.neutralPrimary }}
                          >
                            {price ? `$${price.price}` : 'View Price'}
                          </p>
                          <span style={{ color: theme.palette.themePrimary }}>
                            Purchase on {retailer.name} →
                          </span>
                        </div>
                      </a>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Soft Copy Options */}
          {selectedFormat === 'softcopy' && (
            <div>
              <h3
                className='text-2xl font-bold mb-4'
                style={{ color: theme.palette.themePrimary }}
              >
                Soft Copy Editions
              </h3>
              <p
                className='mb-6'
                style={{ color: theme.palette.neutralPrimary }}
              >
                Choose your preferred softcover edition from Amazon:
              </p>
              <div className='grid md:grid-cols-2 gap-6'>
                {book.retailers
                  .filter((r) => r.formats.includes('softcover'))
                  .map((retailer) => {
                    const price = book.prices.find(
                      (p) =>
                        p.format === 'softcover' && p.retailer === retailer.name
                    );
                    return (
                      <a
                        key={retailer.name}
                        href={retailer.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className='p-6 rounded-lg transition-all'
                          style={{
                            backgroundColor: theme.palette.neutralLighter,
                            border: `2px solid ${theme.palette.neutralTertiary}`,
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              theme.palette.themePrimary;
                            e.currentTarget.style.transform =
                              'translateY(-4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              theme.palette.neutralTertiary;
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <h4
                            className='text-xl font-bold mb-2'
                            style={{ color: theme.palette.themePrimary }}
                          >
                            {retailer.name} - Softcover
                          </h4>
                          <p
                            className='mb-4'
                            style={{ color: theme.palette.neutralPrimary }}
                          >
                            {price ? `$${price.price}` : 'View Price'}
                          </p>
                          <span style={{ color: theme.palette.themePrimary }}>
                            Purchase on {retailer.name} →
                          </span>
                        </div>
                      </a>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Digital / eBook Options */}
          {selectedFormat === 'digital' && (
            <div>
              <h3
                className='text-2xl font-bold mb-4'
                style={{ color: theme.palette.themePrimary }}
              >
                Digital / eBook Editions
              </h3>

              {/* Direct Purchase from Fluxline.pro */}
              {book.directPurchaseAvailable && (
                <div className='mb-8'>
                  <h4
                    className='text-xl font-bold mb-4'
                    style={{ color: theme.palette.themePrimary }}
                  >
                    Purchase Directly from Fluxline.pro
                  </h4>
                  <div className='grid md:grid-cols-3 gap-6'>
                    {/* eBook Only */}
                    <div
                      className='p-6 rounded-lg'
                      style={{
                        backgroundColor: theme.palette.neutralLighter,
                        border: `2px solid ${theme.palette.neutralTertiary}`,
                      }}
                    >
                      <h5 className='text-lg font-bold mb-2'>
                        eBook Only (PDF)
                      </h5>
                      <p
                        className='text-2xl font-bold mb-4'
                        style={{ color: theme.palette.themePrimary }}
                      >
                        ${book.directPurchasePrice}
                      </p>
                      <p
                        className='text-sm mb-4'
                        style={{ color: theme.palette.neutralSecondary }}
                      >
                        Instant download. Watermarked PDF with your information.
                      </p>
                      <button
                        className='w-full py-3 px-4 rounded font-bold transition-all'
                        style={{
                          backgroundColor: theme.palette.themePrimary,
                          color: theme.palette.white,
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleShopIntegrationPlaceholder()}
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* eBook + Workbook Bundle */}
                    {book.includesWorkbook && (
                      <div
                        className='p-6 rounded-lg relative'
                        style={{
                          backgroundColor: theme.palette.themeLighterAlt,
                          border: `2px solid ${theme.palette.themePrimary}`,
                        }}
                      >
                        <div
                          className='absolute top-0 right-0 px-3 py-1 text-xs font-bold'
                          style={{
                            backgroundColor: theme.palette.themePrimary,
                            color: theme.palette.white,
                            borderBottomLeftRadius: '8px',
                          }}
                        >
                          BEST VALUE
                        </div>
                        <h5 className='text-lg font-bold mb-2'>
                          eBook + Workbook Bundle
                        </h5>
                        <p
                          className='text-2xl font-bold mb-1'
                          style={{ color: theme.palette.themePrimary }}
                        >
                          ${book.bundlePrice}
                        </p>
                        <p
                          className='text-sm mb-4'
                          style={{ color: theme.palette.neutralSecondary }}
                        >
                          {(() => {
                            const originalPrice =
                              (book.directPurchasePrice || 0) +
                              (book.workbookPrice || 0);
                            const savings =
                              originalPrice - (book.bundlePrice || 0);
                            return (
                              <>
                                <s>${originalPrice.toFixed(2)}</s> Save $
                                {savings.toFixed(2)}
                              </>
                            );
                          })()}
                        </p>
                        <p
                          className='text-sm mb-4'
                          style={{ color: theme.palette.neutralSecondary }}
                        >
                          Both PDFs with instant download. Watermarked with your
                          information.
                        </p>
                        <button
                          className='w-full py-3 px-4 rounded font-bold transition-all'
                          style={{
                            backgroundColor: theme.palette.themePrimary,
                            color: theme.palette.white,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleShopIntegrationPlaceholder()}
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}

                    {/* Workbook Only */}
                    {book.includesWorkbook && (
                      <div
                        className='p-6 rounded-lg'
                        style={{
                          backgroundColor: theme.palette.neutralLighter,
                          border: `2px solid ${theme.palette.neutralTertiary}`,
                        }}
                      >
                        <h5 className='text-lg font-bold mb-2'>
                          Workbook Only (PDF)
                        </h5>
                        <p
                          className='text-2xl font-bold mb-4'
                          style={{ color: theme.palette.themePrimary }}
                        >
                          ${book.workbookPrice}
                        </p>
                        <p
                          className='text-sm mb-4'
                          style={{ color: theme.palette.neutralSecondary }}
                        >
                          Companion workbook with exercises and templates.
                        </p>
                        <button
                          className='w-full py-3 px-4 rounded font-bold transition-all'
                          style={{
                            backgroundColor: theme.palette.themePrimary,
                            color: theme.palette.white,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleShopIntegrationPlaceholder()}
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* External Retailers */}
              <div>
                <h4
                  className='text-xl font-bold mb-4'
                  style={{ color: theme.palette.themePrimary }}
                >
                  Or Purchase from Other Retailers
                </h4>
                <div className='grid md:grid-cols-3 gap-6'>
                  {book.retailers
                    .filter((r) => r.formats.includes('ebook'))
                    .map((retailer) => (
                      <a
                        key={retailer.name}
                        href={retailer.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className='p-6 rounded-lg text-center transition-all'
                          style={{
                            backgroundColor: theme.palette.neutralLighter,
                            border: `2px solid ${theme.palette.neutralTertiary}`,
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              theme.palette.themePrimary;
                            e.currentTarget.style.transform =
                              'translateY(-4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor =
                              theme.palette.neutralTertiary;
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <h5
                            className='text-lg font-bold mb-2'
                            style={{ color: theme.palette.themePrimary }}
                          >
                            {retailer.name}
                          </h5>
                          <p
                            className='mb-4'
                            style={{ color: theme.palette.neutralPrimary }}
                          >
                            {retailer.name === 'Amazon' && 'Kindle Edition'}
                            {retailer.name === 'Barnes & Noble' &&
                              'Nook Edition'}
                            {retailer.name === 'Apple Books' &&
                              'iBooks Edition'}
                          </p>
                          <span style={{ color: theme.palette.themePrimary }}>
                            View on {retailer.name} →
                          </span>
                        </div>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Book Detail Client Component
 * Uses UnifiedContentDetail with book-specific purchase flow
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
    ...(book.isbn ? [{ label: 'ISBN', value: book.isbn }] : []),
    {
      label: 'Status',
      value:
        book.status === 'available'
          ? 'Available Now'
          : book.status === 'pre-order'
            ? 'Pre-Order'
            : 'Coming Soon',
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
    sectionsPosition: 'before', // Show purchase section before main content
    sections: [
      {
        title: 'Purchase Options',
        content: <PurchaseOptionsSection book={book} />,
      },
    ],
    cta: {
      title: 'Ready to Transform?',
      description:
        'Explore our services and discover how we can help you achieve your transformation goals.',
      buttons: [
        {
          label: 'View Our Services',
          onClick: () => router.push('/services'),
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
