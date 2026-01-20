'use client';

import React, { useState } from 'react';
import { useTheme } from '@fluentui/react';
import ReactMarkdown from 'react-markdown';
import { Book, BookFormat } from '../types';
import { InteractiveCard } from '@/components/InteractiveCard';
import Image from 'next/image';

interface BookDetailClientProps {
  book: Book;
}

type PurchaseStage = 'format' | 'details';
type SelectedFormat = 'hardcopy' | 'softcopy' | 'digital';

/**
 * Book Detail Client Component
 * Displays book details with multi-stage purchase flow
 */
export default function BookDetailClient({ book }: BookDetailClientProps) {
  const theme = useTheme();
  const [selectedFormat, setSelectedFormat] = useState<SelectedFormat | null>(
    null
  );
  const [selectedDigitalOption, setSelectedDigitalOption] = useState<
    string | null
  >(null);

  // Handle format selection
  const handleFormatSelect = (format: SelectedFormat) => {
    setSelectedFormat(format);
    setSelectedDigitalOption(null);
  };

  // Handle digital option selection
  const handleDigitalOptionSelect = (option: string) => {
    setSelectedDigitalOption(option);
  };

  // Reset selection
  const handleReset = () => {
    setSelectedFormat(null);
    setSelectedDigitalOption(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.palette.neutralLighterAlt,
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          backgroundColor: theme.palette.themePrimary,
          color: theme.palette.white,
          padding: '4rem 1rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{book.title}</h1>
          {book.subtitle && (
            <p className="text-xl md:text-2xl mb-4">{book.subtitle}</p>
          )}
          <p className="text-lg">
            By {book.author}
            {book.publisher && ` • ${book.publisher}`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 1rem',
        }}
      >
        {/* Book Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Cover Image */}
          <div>
            {book.coverImageUrl && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '2/3',
                  backgroundColor: theme.palette.neutralLight,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: theme.effects.elevation8,
                }}
              >
                <Image
                  src={book.coverImageUrl}
                  alt={book.coverImageAlt || book.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Book Details */}
            <div
              className="mt-6 p-4"
              style={{
                backgroundColor: theme.palette.white,
                borderRadius: '8px',
                boxShadow: theme.effects.elevation4,
              }}
            >
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: theme.palette.themePrimary }}
              >
                Book Details
              </h3>
              <div
                className="space-y-2 text-sm"
                style={{ color: theme.palette.neutralPrimary }}
              >
                {book.pageCount && <p>Pages: {book.pageCount}</p>}
                {book.language && <p>Language: {book.language}</p>}
                {book.dimensions && <p>Dimensions: {book.dimensions}</p>}
                {book.isbn && <p>ISBN: {book.isbn}</p>}
                <p>
                  Status:{' '}
                  <span
                    style={{
                      color:
                        book.status === 'available'
                          ? theme.palette.green
                          : theme.palette.themePrimary,
                      fontWeight: 600,
                    }}
                  >
                    {book.status === 'available'
                      ? 'Available Now'
                      : book.status === 'pre-order'
                        ? 'Pre-Order'
                        : 'Coming Soon'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: theme.palette.themePrimary }}
            >
              About This Book
            </h2>
            <div
              className="prose prose-lg max-w-none"
              style={{ color: theme.palette.neutralPrimary }}
            >
              <p className="text-lg mb-4">{book.description}</p>
            </div>
          </div>
        </div>

        {/* Purchase Options Section */}
        <div
          id="purchase"
          className="mb-12 p-8"
          style={{
            backgroundColor: theme.palette.white,
            borderRadius: '12px',
            boxShadow: theme.effects.elevation8,
          }}
        >
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{ color: theme.palette.themePrimary }}
          >
            Purchase Options
          </h2>

          {/* Stage 1: Format Selection */}
          {!selectedFormat && (
            <div>
              <p
                className="text-center mb-8 text-lg"
                style={{ color: theme.palette.neutralPrimary }}
              >
                Choose your preferred format:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <InteractiveCard
                  id="hardcopy"
                  title="Hard Copy"
                  description="Premium hardcover or softcover editions available through Amazon"
                  icon="BookmarkReport"
                  iconPosition="center"
                  onClick={() => handleFormatSelect('hardcopy')}
                />
                <InteractiveCard
                  id="softcopy"
                  title="Soft Copy"
                  description="Softcover paperback edition available through Amazon"
                  icon="BookSearch"
                  iconPosition="center"
                  onClick={() => handleFormatSelect('softcopy')}
                />
                <InteractiveCard
                  id="digital"
                  title="Digital / eBook"
                  description="Instant access to PDF or eBook formats from multiple retailers"
                  icon="BookAnswers"
                  iconPosition="center"
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
                className="mb-6 px-4 py-2 rounded"
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
                    className="text-2xl font-bold mb-4"
                    style={{ color: theme.palette.themePrimary }}
                  >
                    Hard Copy Editions
                  </h3>
                  <p className="mb-6" style={{ color: theme.palette.neutralPrimary }}>
                    Choose your preferred hardcover edition from Amazon:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {book.retailers
                      .filter((r) => r.formats.includes('hardcover'))
                      .map((retailer) => (
                        <a
                          key={retailer.name}
                          href={retailer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <div
                            className="p-6 rounded-lg transition-all"
                            style={{
                              backgroundColor: theme.palette.neutralLighter,
                              border: `2px solid ${theme.palette.neutralTertiary}`,
                              cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = theme.palette.themePrimary;
                              e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = theme.palette.neutralTertiary;
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <h4
                              className="text-xl font-bold mb-2"
                              style={{ color: theme.palette.themePrimary }}
                            >
                              {retailer.name} - Hardcover
                            </h4>
                            <p
                              className="mb-4"
                              style={{ color: theme.palette.neutralPrimary }}
                            >
                              {book.prices.find(
                                (p) => p.format === 'hardcover' && p.retailer === retailer.name
                              )?.price
                                ? `$${book.prices.find((p) => p.format === 'hardcover' && p.retailer === retailer.name)?.price}`
                                : 'View Price'}
                            </p>
                            <span style={{ color: theme.palette.themePrimary }}>
                              Purchase on {retailer.name} →
                            </span>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Soft Copy Options */}
              {selectedFormat === 'softcopy' && (
                <div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: theme.palette.themePrimary }}
                  >
                    Soft Copy Editions
                  </h3>
                  <p className="mb-6" style={{ color: theme.palette.neutralPrimary }}>
                    Choose your preferred softcover edition from Amazon:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {book.retailers
                      .filter((r) => r.formats.includes('softcover'))
                      .map((retailer) => (
                        <a
                          key={retailer.name}
                          href={retailer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <div
                            className="p-6 rounded-lg transition-all"
                            style={{
                              backgroundColor: theme.palette.neutralLighter,
                              border: `2px solid ${theme.palette.neutralTertiary}`,
                              cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = theme.palette.themePrimary;
                              e.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = theme.palette.neutralTertiary;
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <h4
                              className="text-xl font-bold mb-2"
                              style={{ color: theme.palette.themePrimary }}
                            >
                              {retailer.name} - Softcover
                            </h4>
                            <p
                              className="mb-4"
                              style={{ color: theme.palette.neutralPrimary }}
                            >
                              {book.prices.find(
                                (p) => p.format === 'softcover' && p.retailer === retailer.name
                              )?.price
                                ? `$${book.prices.find((p) => p.format === 'softcover' && p.retailer === retailer.name)?.price}`
                                : 'View Price'}
                            </p>
                            <span style={{ color: theme.palette.themePrimary }}>
                              Purchase on {retailer.name} →
                            </span>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Digital / eBook Options */}
              {selectedFormat === 'digital' && (
                <div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: theme.palette.themePrimary }}
                  >
                    Digital / eBook Editions
                  </h3>

                  {/* Direct Purchase from Fluxline.pro */}
                  {book.directPurchaseAvailable && (
                    <div className="mb-8">
                      <h4
                        className="text-xl font-bold mb-4"
                        style={{ color: theme.palette.themePrimary }}
                      >
                        Purchase Directly from Fluxline.pro
                      </h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* eBook Only */}
                        <div
                          className="p-6 rounded-lg"
                          style={{
                            backgroundColor: theme.palette.neutralLighter,
                            border: `2px solid ${theme.palette.neutralTertiary}`,
                          }}
                        >
                          <h5 className="text-lg font-bold mb-2">eBook Only (PDF)</h5>
                          <p
                            className="text-2xl font-bold mb-4"
                            style={{ color: theme.palette.themePrimary }}
                          >
                            ${book.directPurchasePrice}
                          </p>
                          <p className="text-sm mb-4" style={{ color: theme.palette.neutralSecondary }}>
                            Instant download. Watermarked PDF with your information.
                          </p>
                          <button
                            className="w-full py-3 px-4 rounded font-bold transition-all"
                            style={{
                              backgroundColor: theme.palette.themePrimary,
                              color: theme.palette.white,
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            onClick={() => alert('Shop integration coming soon')}
                          >
                            Add to Cart
                          </button>
                        </div>

                        {/* eBook + Workbook Bundle */}
                        {book.includesWorkbook && (
                          <div
                            className="p-6 rounded-lg relative"
                            style={{
                              backgroundColor: theme.palette.themeLighterAlt,
                              border: `2px solid ${theme.palette.themePrimary}`,
                            }}
                          >
                            <div
                              className="absolute top-0 right-0 px-3 py-1 text-xs font-bold"
                              style={{
                                backgroundColor: theme.palette.themePrimary,
                                color: theme.palette.white,
                                borderBottomLeftRadius: '8px',
                              }}
                            >
                              BEST VALUE
                            </div>
                            <h5 className="text-lg font-bold mb-2">
                              eBook + Workbook Bundle
                            </h5>
                            <p
                              className="text-2xl font-bold mb-1"
                              style={{ color: theme.palette.themePrimary }}
                            >
                              ${book.bundlePrice}
                            </p>
                            <p className="text-sm mb-4" style={{ color: theme.palette.neutralSecondary }}>
                              <s>${(book.directPurchasePrice || 0) + (book.workbookPrice || 0)}</s> Save $
                              {((book.directPurchasePrice || 0) + (book.workbookPrice || 0) - (book.bundlePrice || 0)).toFixed(2)}
                            </p>
                            <p className="text-sm mb-4" style={{ color: theme.palette.neutralSecondary }}>
                              Both PDFs with instant download. Watermarked with your information.
                            </p>
                            <button
                              className="w-full py-3 px-4 rounded font-bold transition-all"
                              style={{
                                backgroundColor: theme.palette.themePrimary,
                                color: theme.palette.white,
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onClick={() => alert('Shop integration coming soon')}
                            >
                              Add to Cart
                            </button>
                          </div>
                        )}

                        {/* Workbook Only */}
                        {book.includesWorkbook && (
                          <div
                            className="p-6 rounded-lg"
                            style={{
                              backgroundColor: theme.palette.neutralLighter,
                              border: `2px solid ${theme.palette.neutralTertiary}`,
                            }}
                          >
                            <h5 className="text-lg font-bold mb-2">Workbook Only (PDF)</h5>
                            <p
                              className="text-2xl font-bold mb-4"
                              style={{ color: theme.palette.themePrimary }}
                            >
                              ${book.workbookPrice}
                            </p>
                            <p className="text-sm mb-4" style={{ color: theme.palette.neutralSecondary }}>
                              Companion workbook with exercises and templates.
                            </p>
                            <button
                              className="w-full py-3 px-4 rounded font-bold transition-all"
                              style={{
                                backgroundColor: theme.palette.themePrimary,
                                color: theme.palette.white,
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onClick={() => alert('Shop integration coming soon')}
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
                      className="text-xl font-bold mb-4"
                      style={{ color: theme.palette.themePrimary }}
                    >
                      Or Purchase from Other Retailers
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      {book.retailers
                        .filter((r) => r.formats.includes('ebook'))
                        .map((retailer) => (
                          <a
                            key={retailer.name}
                            href={retailer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                          >
                            <div
                              className="p-6 rounded-lg text-center transition-all"
                              style={{
                                backgroundColor: theme.palette.neutralLighter,
                                border: `2px solid ${theme.palette.neutralTertiary}`,
                                cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = theme.palette.themePrimary;
                                e.currentTarget.style.transform = 'translateY(-4px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = theme.palette.neutralTertiary;
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              <h5
                                className="text-lg font-bold mb-2"
                                style={{ color: theme.palette.themePrimary }}
                              >
                                {retailer.name}
                              </h5>
                              <p className="mb-4" style={{ color: theme.palette.neutralPrimary }}>
                                {retailer.name === 'Amazon' && 'Kindle Edition'}
                                {retailer.name === 'Barnes & Noble' && 'Nook Edition'}
                                {retailer.name === 'Apple Books' && 'iBooks Edition'}
                              </p>
                              <span style={{ color: theme.palette.themePrimary }}>
                                View on {retailer.name} →
                              </span>
                            </div>
                          </a>
                        ))}
                    </div>
                  </div>

                  {/* Future: Audiobook (commented out) */}
                  {/* <div className="mt-8">
                    <h4 className="text-xl font-bold mb-4" style={{ color: theme.palette.themePrimary }}>
                      Audiobook Edition (Coming Soon)
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 opacity-50">
                      <div className="p-6 rounded-lg" style={{ backgroundColor: theme.palette.neutralLighter }}>
                        <h5 className="text-lg font-bold mb-2">Audible</h5>
                        <p>Available soon on Audible</p>
                      </div>
                      <div className="p-6 rounded-lg" style={{ backgroundColor: theme.palette.neutralLighter }}>
                        <h5 className="text-lg font-bold mb-2">Amazon Audiobook</h5>
                        <p>Available soon on Amazon</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Full Book Content */}
        <div
          className="prose prose-lg max-w-none mb-12 p-8"
          style={{
            backgroundColor: theme.palette.white,
            borderRadius: '12px',
            boxShadow: theme.effects.elevation8,
            color: theme.palette.neutralPrimary,
          }}
        >
          <ReactMarkdown>{book.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
