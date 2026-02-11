'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Book } from '../types';
import { InteractiveCard } from '@/components/InteractiveCard';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { Typography } from '@/theme/components/typography/';
import { FadeUp, FadeIn } from '@/animations/fade-animations';

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
 * Uses progressive disclosure - stages stack vertically
 */
function PurchaseOptionsSection({ book }: { book: Book }) {
  const { theme } = useAppTheme();
  const [selectedFormat, setSelectedFormat] = useState<SelectedFormat | null>(
    null
  );

  const handleFormatSelect = (format: SelectedFormat) => {
    setSelectedFormat(format);
  };

  return (
    <div
      id='purchase'
      style={{
        padding: theme.spacing.xl,
        backgroundColor: theme.palette.neutralLighterAlt,
        borderRadius: theme.effects.roundedCorner6,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.xl,
      }}
    >
      {/* Stage 1: Format Selection - Always Visible */}
      <div>
        <Typography
          variant='h3'
          className='mb-4'
          style={{
            color: theme.palette.themePrimary,
          }}
        >
          Step 1: Choose Your Format
        </Typography>
        <div
          className='grid md:grid-cols-3 gap-6'
          style={{ marginTop: theme.spacing.l }}
        >
          <div
            style={{
              border:
                selectedFormat === 'hardcopy'
                  ? `3px solid ${theme.palette.themePrimary}`
                  : '3px solid transparent',
              borderRadius: theme.effects.roundedCorner6,
              padding: selectedFormat === 'hardcopy' ? '2px' : '0',
              backgroundColor:
                selectedFormat === 'hardcopy'
                  ? theme.palette.themeLighterAlt
                  : 'transparent',
            }}
          >
            <InteractiveCard
              id='hardcopy'
              title='Hard Copy'
              description='Premium hardcover or softcover editions available through Amazon'
              icon='BookmarkReport'
              iconPosition='center'
              onClick={() => handleFormatSelect('hardcopy')}
            />
          </div>
          <div
            style={{
              border:
                selectedFormat === 'softcopy'
                  ? `3px solid ${theme.palette.themePrimary}`
                  : '3px solid transparent',
              borderRadius: theme.effects.roundedCorner6,
              padding: selectedFormat === 'softcopy' ? '2px' : '0',
              backgroundColor:
                selectedFormat === 'softcopy'
                  ? theme.palette.themeLighterAlt
                  : 'transparent',
            }}
          >
            <InteractiveCard
              id='softcopy'
              title='Soft Copy'
              description='Softcover paperback edition available through Amazon'
              icon='BookAnswers'
              iconPosition='center'
              onClick={() => handleFormatSelect('softcopy')}
            />
          </div>
          <div
            style={{
              border:
                selectedFormat === 'digital'
                  ? `3px solid ${theme.palette.themePrimary}`
                  : '3px solid transparent',
              borderRadius: theme.effects.roundedCorner6,
              padding: selectedFormat === 'digital' ? '2px' : '0',
              backgroundColor:
                selectedFormat === 'digital'
                  ? theme.palette.themeLighterAlt
                  : 'transparent',
            }}
          >
            <InteractiveCard
              id='digital'
              title='Digital / eBook'
              description='Instant access to PDF or eBook formats from multiple retailers'
              icon='Tablet'
              iconPosition='center'
              onClick={() => handleFormatSelect('digital')}
            />
          </div>
        </div>
      </div>

      {/* Stage 2: Format-Specific Options - Appears Below Stage 1 */}
      <AnimatePresence mode='wait'>
        {selectedFormat && (
          <FadeUp
            key={selectedFormat}
            distance={30}
            duration={0.2}
            delay={0.1}
            style={{
              borderTop: `2px solid ${theme.palette.themePrimary}`,
              paddingTop: theme.spacing.xl,
            }}
          >
            <Typography
              variant='h3'
              className='mb-6'
              style={{ color: theme.palette.themePrimary }}
            >
              Step 2: Select Your Purchase Option
            </Typography>

            {/* Hard Copy Options */}
            {selectedFormat === 'hardcopy' && (
              <div>
                <Typography
                  variant='h4'
                  className='mb-4'
                  style={{ color: theme.palette.themePrimary }}
                >
                  Hardcover Editions
                </Typography>
                <Typography
                  variant='body'
                  className='mb-6'
                  style={{ color: theme.palette.neutralPrimary }}
                >
                  Choose your preferred hardcover edition:
                </Typography>
                <div className='grid md:grid-cols-2 gap-6'>
                  {book.retailers
                    .filter((r) => r.formats.includes('hardcover'))
                    .map((retailer, index) => {
                      const price = book.prices.find(
                        (p) =>
                          p.format === 'hardcover' &&
                          p.retailer === retailer.name
                      );
                      return (
                        <FadeIn
                          key={retailer.name}
                          delay={index * 0.1}
                          duration={0.3}
                        >
                          <a
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
                                e.currentTarget.style.transform =
                                  'translateY(0)';
                              }}
                            >
                              <Typography
                                variant='h4'
                                className='mb-2'
                                style={{ color: theme.palette.themePrimary }}
                              >
                                {retailer.name} - Hardcover
                              </Typography>
                              <Typography
                                variant='body'
                                className='mb-4'
                                style={{ color: theme.palette.neutralPrimary }}
                              >
                                {price ? `$${price.price}` : 'View Price'}
                              </Typography>
                              <Typography
                                variant='span'
                                style={{ color: theme.palette.themePrimary }}
                              >
                                Purchase on {retailer.name} →
                              </Typography>
                            </div>
                          </a>
                        </FadeIn>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Soft Copy Options */}
            {selectedFormat === 'softcopy' && (
              <div>
                <Typography
                  variant='h4'
                  className='mb-4'
                  style={{ color: theme.palette.themePrimary }}
                >
                  Softcover Editions
                </Typography>
                <Typography
                  variant='body'
                  className='mb-6'
                  style={{ color: theme.palette.neutralPrimary }}
                >
                  Choose your preferred softcover edition:
                </Typography>
                <div className='grid md:grid-cols-2 gap-6'>
                  {book.retailers
                    .filter((r) => r.formats.includes('softcover'))
                    .map((retailer, index) => {
                      const price = book.prices.find(
                        (p) =>
                          p.format === 'softcover' &&
                          p.retailer === retailer.name
                      );
                      return (
                        <FadeIn
                          key={retailer.name}
                          delay={index * 0.1}
                          duration={0.2}
                        >
                          <a
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
                                e.currentTarget.style.transform =
                                  'translateY(0)';
                              }}
                            >
                              <Typography
                                variant='h4'
                                className='mb-2'
                                style={{ color: theme.palette.themePrimary }}
                              >
                                {retailer.name} - Softcover
                              </Typography>
                              <Typography
                                variant='body'
                                className='mb-4'
                                style={{ color: theme.palette.neutralPrimary }}
                              >
                                {price ? `$${price.price}` : 'View Price'}
                              </Typography>
                              <Typography
                                variant='span'
                                style={{ color: theme.palette.themePrimary }}
                              >
                                Purchase on {retailer.name} →
                              </Typography>
                            </div>
                          </a>
                        </FadeIn>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Digital / eBook Options */}
            {selectedFormat === 'digital' && (
              <div>
                <Typography
                  variant='h4'
                  className='mb-4'
                  style={{
                    color: theme.palette.themePrimary,
                    textTransform: 'none',
                    marginBottom: theme.spacing.l,
                  }}
                >
                  Digital & eBook Options
                </Typography>

                {/* Direct Purchase from Fluxline.pro */}
                {book.directPurchaseAvailable && (
                  <div className='mb-8'>
                    <div className='grid md:grid-cols-3 gap-6'>
                      {/* eBook + Workbook Bundle */}
                      {book.includesWorkbook && (
                        <FadeIn delay={0.1} duration={0.2}>
                          <div
                            className='p-6 rounded-lg relative'
                            style={{
                              backgroundColor: theme.palette.themeLighter,
                              border: `4px solid ${theme.palette.themePrimary}`,
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
                            <Typography variant='h5' className='mb-2' style={{ textTransform: 'none' }}>
                              eBook + Workbook Bundle
                            </Typography>
                            <Typography
                              variant='body'
                              className='mb-1'
                              style={{
                                color: theme.palette.themePrimary,
                                fontSize: '24px',
                                fontWeight: 'bold',
                              }}
                            >
                              ${book.bundlePrice}
                            </Typography>
                            <Typography
                              variant='bodySmall'
                              className='mb-4'
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
                            </Typography>
                            <Typography
                              variant='bodySmall'
                              className='mb-4'
                              style={{ color: theme.palette.neutralSecondary }}
                            >
                              Both PDFs with instant download. Watermarked with
                              your information.
                            </Typography>
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
                        </FadeIn>
                      )}
                      {/* eBook Only */}
                      <FadeIn delay={0.1} duration={0.2}>
                        <div
                          className='p-6 rounded-lg'
                          style={{
                            backgroundColor: theme.palette.neutralLighter,
                            border: `2px solid ${theme.palette.neutralTertiary}`,
                          }}
                        >
                          <Typography
                            variant='h5'
                            className='mb-2'
                            style={{ textTransform: 'none' }}
                          >
                            eBook Only (PDF)
                          </Typography>
                          <Typography
                            variant='body'
                            className='mb-4'
                            style={{
                              color: theme.palette.themePrimary,
                              fontSize: '24px',
                              fontWeight: 'bold',
                            }}
                          >
                            ${book.directPurchasePrice}
                          </Typography>
                          <Typography
                            variant='bodySmall'
                            className='mb-4'
                            style={{ color: theme.palette.neutralSecondary }}
                          >
                            Instant download. Watermarked PDF with your
                            information.
                          </Typography>
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
                      </FadeIn>

                      {/* Workbook Only */}
                      {book.includesWorkbook && (
                        <FadeIn delay={0.1} duration={0.2}>
                          <div
                            className='p-6 rounded-lg'
                            style={{
                              backgroundColor: theme.palette.neutralLighter,
                              border: `2px solid ${theme.palette.neutralTertiary}`,
                            }}
                          >
                            <Typography variant='h5' className='mb-2'>
                              Workbook Only (PDF)
                            </Typography>
                            <Typography
                              variant='body'
                              className='mb-4'
                              style={{
                                color: theme.palette.themePrimary,
                                fontSize: '24px',
                                fontWeight: 'bold',
                              }}
                            >
                              ${book.workbookPrice}
                            </Typography>
                            <Typography
                              variant='bodySmall'
                              className='mb-4'
                              style={{ color: theme.palette.neutralSecondary }}
                            >
                              Companion workbook with exercises and templates.
                            </Typography>
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
                        </FadeIn>
                      )}
                    </div>
                  </div>
                )}

                {/* External Retailers */}
                <div>
                  <Typography
                    variant='h5'
                    className='mb-4'
                    style={{ color: theme.palette.themePrimary }}
                  >
                    Or Purchase from Other Retailers
                  </Typography>
                  <div className='grid md:grid-cols-3 gap-6'>
                    {book.retailers
                      .filter((r) => r.formats.includes('ebook'))
                      .map((retailer, index) => (
                        <FadeIn
                          key={retailer.name}
                          delay={index * 0.1}
                          duration={0.2}
                        >
                          <a
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
                                e.currentTarget.style.transform =
                                  'translateY(0)';
                              }}
                            >
                              <Typography
                                variant='h5'
                                className='mb-2'
                                style={{ color: theme.palette.themePrimary }}
                              >
                                {retailer.name}
                              </Typography>
                              <Typography
                                variant='body'
                                className='mb-4'
                                style={{ color: theme.palette.neutralPrimary }}
                              >
                                {retailer.name === 'Amazon' && 'Kindle Edition'}
                                {retailer.name === 'Barnes & Noble' &&
                                  'Nook Edition'}
                                {retailer.name === 'Apple Books' &&
                                  'iBooks Edition'}
                              </Typography>
                              <Typography
                                variant='span'
                                style={{ color: theme.palette.themePrimary }}
                              >
                                View on {retailer.name} →
                              </Typography>
                            </div>
                          </a>
                        </FadeIn>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </FadeUp>
        )}
      </AnimatePresence>
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
