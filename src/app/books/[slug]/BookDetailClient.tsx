'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { isProduction } from '@/lib/environment';
import { Book } from '../types';
import FxCard from '@/theme/components/dsm/FxCard';
import FxButton from '@/theme/components/dsm/FxButton';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { FadeUp, FadeIn } from '@/animations/fade-animations';

interface BookDetailClientProps {
  book: Book;
}

type SelectedFormat = 'hardcopy' | 'softcopy' | 'digital';
type PdfProductType = 'book' | 'workbook' | 'bundle';

interface FormatSelectionCardProps {
  id: SelectedFormat;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * FormatSelectionCard Component
 * Reusable card for format selection with conditional styling based on selection state
 */
function FormatSelectionCard({
  id,
  title,
  description,
  isSelected,
  onClick,
}: FormatSelectionCardProps) {
  return (
    <FxCard
      interactive
      style={{
        cursor: 'pointer',
        border: isSelected
          ? '2px solid var(--fx-accent)'
          : '2px solid var(--fx-border)',
        padding: 20,
        textAlign: 'center',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
      }}
    >
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        <h4
          style={{
            color: 'var(--fx-accent)',
            margin: '0 0 8px',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: 'var(--fx-font)',
          }}
        >
          {title}
        </h4>
        <p
          style={{
            color: 'var(--fx-text-body)',
            margin: 0,
            fontSize: 'var(--fx-body-size)',
            lineHeight: 'var(--fx-body-leading)',
            fontFamily: 'var(--fx-font)',
          }}
        >
          {description}
        </p>
      </div>
    </FxCard>
  );
}

/**
 * BuyPdfButton Component
 * Renders an inline name-collection form and initiates Stripe checkout for PDF purchases.
 */
function BuyPdfButton({
  productType,
  label,
}: {
  productType: PdfProductType;
  label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Disable checkout in production environment
  const isProdEnvironment = isProduction();

  const handleCheckout = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const apiUrl = getApiEndpoint('/api/create-checkout-session');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productType, customerName: trimmedName }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) {
        setError(data.error || 'Unable to start checkout. Please try again.');
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <>
        <FxButton
          variant='primary'
          onClick={() => !isProdEnvironment && setIsOpen(true)}
          disabled={isProdEnvironment}
          style={{ width: '100%' }}
        >
          {isProdEnvironment ? 'Checkout Disabled' : label}
        </FxButton>
        {isProdEnvironment && (
          <p
            style={{
              color: 'var(--fx-text-body)',
              marginTop: 4,
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'var(--fx-font)',
            }}
          >
            Purchases are disabled for now. Please check back later.
          </p>
        )}
      </>
    );
  }

  return (
    <div
      style={{
        border: '1px solid var(--fx-text-muted)',
        borderRadius: 4,
        padding: 12,
        backgroundColor: 'var(--fx-surface-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <p
        style={{
          color: 'var(--fx-text-heading)',
          fontSize: 14,
          margin: 0,
          fontFamily: 'var(--fx-font)',
        }}
      >
        Enter your full name for your personalized PDF:
      </p>
      <input
        type='text'
        placeholder='Your full name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCheckout()}
        maxLength={100}
        style={{
          width: '100%',
          padding: 12,
          fontSize: '1rem',
          fontFamily: 'var(--fx-font)',
          backgroundColor: 'var(--fx-surface-card)',
          color: 'var(--fx-text-heading)',
          border: '1px solid var(--fx-border)',
          borderRadius: 4,
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        aria-label='Your full name'
      />
      {error && (
        <p
          style={{
            color: 'var(--fx-error, #a4262c)',
            fontSize: 14,
            margin: 0,
            fontFamily: 'var(--fx-font)',
          }}
        >
          {error}
        </p>
      )}
      {isProdEnvironment && (
        <p
          style={{
            color: 'var(--fx-text-body)',
            textAlign: 'center',
            fontSize: 14,
            margin: 0,
            fontFamily: 'var(--fx-font)',
          }}
        >
          Purchases are disabled in production.
        </p>
      )}
      <div style={{ display: 'flex', gap: 4 }}>
        <FxButton
          variant='primary'
          disabled={loading || isProdEnvironment}
          onClick={handleCheckout}
        >
          {loading ? 'Redirecting...' : 'Proceed to Checkout'}
        </FxButton>
        <FxButton
          variant='quiet'
          disabled={loading}
          onClick={() => {
            setIsOpen(false);
            setName('');
            setError(null);
          }}
        >
          Cancel
        </FxButton>
      </div>
    </div>
  );
}

/**
 * Purchase Options Section Component
 * Multi-stage purchase flow unique to books
 * Uses progressive disclosure - stages stack vertically
 */
function PurchaseOptionsSection({ book }: { book: Book }) {
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
        padding: 32,
        backgroundColor: 'var(--fx-surface-card)',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {/* Stage 1: Format Selection - Always Visible */}
      <div>
        <h3
          style={{
            color: 'var(--fx-accent)',
            fontSize: 'var(--fx-h3-size)',
            marginBottom: 16,
            fontFamily: 'var(--fx-font)',
          }}
        >
          Step 1: Choose Your Format
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginTop: 20,
          }}
        >
          <FormatSelectionCard
            id='hardcopy'
            title='Hardcover'
            description='Premium hardcover or softcover editions available through Amazon'
            isSelected={selectedFormat === 'hardcopy'}
            onClick={() => handleFormatSelect('hardcopy')}
          />
          <FormatSelectionCard
            id='softcopy'
            title='Softcover'
            description='Softcover paperback edition available through Amazon'
            isSelected={selectedFormat === 'softcopy'}
            onClick={() => handleFormatSelect('softcopy')}
          />
          <FormatSelectionCard
            id='digital'
            title='Digital / eBook'
            description='Instant access to PDF or eBook formats from multiple retailers'
            isSelected={selectedFormat === 'digital'}
            onClick={() => handleFormatSelect('digital')}
          />
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
              borderTop: '2px solid var(--fx-accent)',
              paddingTop: 32,
            }}
          >
            <h3
              style={{
                color: 'var(--fx-accent)',
                fontSize: 'var(--fx-h3-size)',
                marginBottom: 4,
                fontFamily: 'var(--fx-font)',
              }}
            >
              Step 2: Select Your Purchase Option
            </h3>

            {/* Hard Copy Options */}
            {selectedFormat === 'hardcopy' && (
              <div>
                <h4
                  style={{
                    color: 'var(--fx-accent)',
                    marginBottom: 20,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: 'var(--fx-font)',
                  }}
                >
                  Hardcover Editions
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 24,
                  }}
                >
                  {book.retailers
                    .filter((r) => r.formats.includes('hardcover'))
                    .map((retailer, index) => (
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
                            style={{
                              padding: 24,
                              borderRadius: 8,
                              backgroundColor: 'var(--fx-surface-card)',
                              border: '2px solid var(--fx-text-muted)',
                              cursor: 'pointer',
                              transition: 'border-color 0.2s ease, transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--fx-accent)';
                              e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--fx-text-muted)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <h4
                              style={{
                                color: 'var(--fx-accent)',
                                marginBottom: 8,
                                fontSize: 16,
                                fontWeight: 600,
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              {retailer.name} - Hardcover
                            </h4>
                            <p
                              style={{
                                color: 'var(--fx-text-heading)',
                                marginBottom: 16,
                                fontSize: 'var(--fx-body-size)',
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              $XX.XX (pricing disclosed at launch)
                            </p>
                            <span
                              style={{
                                color: 'var(--fx-accent)',
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              Purchase on {retailer.name} →
                            </span>
                          </div>
                        </a>
                      </FadeIn>
                    ))}
                </div>
              </div>
            )}

            {/* Soft Copy Options */}
            {selectedFormat === 'softcopy' && (
              <div>
                <h4
                  style={{
                    color: 'var(--fx-accent)',
                    marginBottom: 20,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: 'var(--fx-font)',
                  }}
                >
                  Softcover Editions
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 24,
                  }}
                >
                  {book.retailers
                    .filter((r) => r.formats.includes('softcover'))
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
                            style={{
                              padding: 24,
                              borderRadius: 8,
                              backgroundColor: 'var(--fx-surface-card)',
                              border: '2px solid var(--fx-text-muted)',
                              cursor: 'pointer',
                              transition: 'border-color 0.2s ease, transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--fx-accent)';
                              e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--fx-text-muted)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <h4
                              style={{
                                color: 'var(--fx-accent)',
                                marginBottom: 8,
                                fontSize: 16,
                                fontWeight: 600,
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              {retailer.name} - Softcover
                            </h4>
                            <p
                              style={{
                                color: 'var(--fx-text-heading)',
                                marginBottom: 16,
                                fontSize: 'var(--fx-body-size)',
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              $XX.XX (pricing disclosed at launch)
                            </p>
                            <span
                              style={{
                                color: 'var(--fx-accent)',
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              Purchase on {retailer.name} →
                            </span>
                          </div>
                        </a>
                      </FadeIn>
                    ))}
                </div>
              </div>
            )}

            {/* Digital / eBook Options */}
            {selectedFormat === 'digital' && (
              <div>
                <h4
                  style={{
                    color: 'var(--fx-accent)',
                    textTransform: 'none',
                    marginBottom: 20,
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: 'var(--fx-font)',
                  }}
                >
                  Digital & eBook Options
                </h4>

                {/* Direct Purchase from Fluxline.pro */}
                {book.directPurchaseAvailable && (
                  <div style={{ marginBottom: 32 }}>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 24,
                      }}
                    >
                      {/* eBook + Workbook Bundle */}
                      {book.includesWorkbook && (
                        <FadeIn delay={0.1} duration={0.2}>
                          <div
                            style={{
                              padding: 24,
                              borderRadius: 8,
                              position: 'relative',
                              backgroundColor: 'var(--fx-surface-card)',
                              border: '4px solid var(--fx-accent)',
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                padding: '4px 16px',
                                fontSize: 12,
                                fontWeight: 700,
                                backgroundColor: 'var(--fx-accent)',
                                color: 'var(--fx-accent-ink)',
                                borderBottomLeftRadius: 8,
                              }}
                            >
                              BEST VALUE
                            </div>
                            <h5
                              style={{
                                marginBottom: 8,
                                textTransform: 'none',
                                fontSize: 15,
                                fontWeight: 600,
                                fontFamily: 'var(--fx-font)',
                                color: 'var(--fx-text-heading)',
                              }}
                            >
                              eBook + Workbook Bundle
                            </h5>
                            <p
                              style={{
                                color: 'var(--fx-accent)',
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginBottom: 4,
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              $XX.XX (pricing disclosed at launch)
                            </p>
                            <p
                              style={{
                                color: 'var(--fx-text-body)',
                                fontWeight: 'bold',
                                marginBottom: 16,
                                fontSize: 14,
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              Best value - pricing disclosed at launch
                            </p>
                            <p
                              style={{
                                color: 'var(--fx-text-body)',
                                marginBottom: 16,
                                fontSize: 14,
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              Both PDFs with instant download. Watermarked with
                              your information.
                            </p>
                            <BuyPdfButton
                              productType='bundle'
                              label='Buy Bundle PDF'
                            />
                          </div>
                        </FadeIn>
                      )}
                      {/* eBook Only */}
                      <FadeIn delay={0.1} duration={0.2}>
                        <div
                          style={{
                            padding: 24,
                            borderRadius: 8,
                            backgroundColor: 'var(--fx-surface-card)',
                            border: '2px solid var(--fx-text-muted)',
                          }}
                        >
                          <h5
                            style={{
                              marginBottom: 8,
                              textTransform: 'none',
                              fontSize: 15,
                              fontWeight: 600,
                              fontFamily: 'var(--fx-font)',
                              color: 'var(--fx-text-heading)',
                            }}
                          >
                            eBook Only (PDF)
                          </h5>
                          <p
                            style={{
                              color: 'var(--fx-accent)',
                              fontSize: 24,
                              fontWeight: 'bold',
                              marginBottom: 16,
                              fontFamily: 'var(--fx-font)',
                            }}
                          >
                            $XX.XX (pricing disclosed at launch)
                          </p>
                          <p
                            style={{
                              color: 'var(--fx-text-body)',
                              marginBottom: 16,
                              fontSize: 14,
                              fontFamily: 'var(--fx-font)',
                            }}
                          >
                            Instant download. Watermarked PDF with your
                            information.
                          </p>
                          <BuyPdfButton
                            productType='book'
                            label='Buy eBook PDF'
                          />
                        </div>
                      </FadeIn>

                      {/* Workbook Only */}
                      {book.includesWorkbook && (
                        <FadeIn delay={0.1} duration={0.2}>
                          <div
                            style={{
                              padding: 24,
                              borderRadius: 8,
                              backgroundColor: 'var(--fx-surface-card)',
                              border: '2px solid var(--fx-text-muted)',
                            }}
                          >
                            <h5
                              style={{
                                marginBottom: 8,
                                fontSize: 15,
                                fontWeight: 600,
                                fontFamily: 'var(--fx-font)',
                                color: 'var(--fx-text-heading)',
                              }}
                            >
                              Workbook Only (PDF)
                            </h5>
                            <p
                              style={{
                                color: 'var(--fx-accent)',
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginBottom: 16,
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              $XX.XX (pricing disclosed at launch)
                            </p>
                            <p
                              style={{
                                color: 'var(--fx-text-body)',
                                marginBottom: 16,
                                fontSize: 14,
                                fontFamily: 'var(--fx-font)',
                              }}
                            >
                              Companion workbook with exercises and templates.
                            </p>
                            <BuyPdfButton
                              productType='workbook'
                              label='Buy Workbook PDF'
                            />
                          </div>
                        </FadeIn>
                      )}
                    </div>
                  </div>
                )}

                {/* External Retailers */}
                <div>
                  <h5
                    style={{
                      color: 'var(--fx-accent)',
                      marginBottom: 20,
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: 'var(--fx-font)',
                    }}
                  >
                    Or Purchase from These Other Retailers:
                  </h5>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: 24,
                    }}
                  >
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
                              style={{
                                padding: 24,
                                borderRadius: 8,
                                textAlign: 'center',
                                backgroundColor: 'var(--fx-surface-card)',
                                border: '2px solid var(--fx-text-muted)',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s ease, transform 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--fx-accent)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--fx-text-muted)';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              <h5
                                style={{
                                  color: 'var(--fx-accent)',
                                  marginBottom: 8,
                                  fontSize: 15,
                                  fontWeight: 600,
                                  fontFamily: 'var(--fx-font)',
                                }}
                              >
                                {retailer.name}
                              </h5>
                              <p
                                style={{
                                  color: 'var(--fx-text-heading)',
                                  marginBottom: 16,
                                  fontSize: 'var(--fx-body-size)',
                                  fontFamily: 'var(--fx-font)',
                                }}
                              >
                                {retailer.name === 'Amazon' && 'Kindle Edition'}
                                {retailer.name === 'Barnes & Noble' &&
                                  'Nook Edition'}
                                {retailer.name === 'Apple Books' &&
                                  'iBooks Edition'}
                              </p>
                              <span
                                style={{
                                  color: 'var(--fx-accent)',
                                  fontFamily: 'var(--fx-font)',
                                }}
                              >
                                View on {retailer.name} →
                              </span>
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
