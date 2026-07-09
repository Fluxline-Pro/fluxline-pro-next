/**
 * ScrollCard Component
 * Individual card for displaying scroll information with download functionality
 */

'use client';

import React from 'react';
import { ScrollItem } from '../types';
import { categoryLabels } from '../scrollsData';
import { ScrollDetailModal } from './ScrollDetailModal';

interface ScrollCardProps {
  scroll: ScrollItem;
  variant?: 'compact' | 'detailed';
}

export function ScrollCard({ scroll, variant = 'compact' }: ScrollCardProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    // Prevent card click when clicking download
    e.stopPropagation();

    // Open PDF in new tab
    window.open(scroll.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: 24,
          borderRadius: 12,
          border: '1px solid var(--fx-border)',
          backgroundColor: 'var(--fx-surface-card)',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s, transform 0.2s',
        }}
      >
        {/* Category Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 4,
              paddingBottom: 4,
              borderRadius: 999,
              backgroundColor: 'color-mix(in srgb, var(--fx-accent) 15%, transparent)',
              color: 'var(--fx-accent)',
            }}
          >
            {categoryLabels[scroll.category] || scroll.category}
          </span>
          <span style={{ fontSize: 12, color: 'var(--fx-text-muted)' }}>
            {scroll.fileSize}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.25,
            color: 'var(--fx-text-heading)',
          }}
        >
          {scroll.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            flexGrow: 1,
            color: 'var(--fx-text-body)',
          }}
        >
          {scroll.description}
        </p>

        {/* Tags */}
        {variant === 'detailed' && scroll.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {scroll.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 4,
                  paddingBottom: 4,
                  borderRadius: 8,
                  backgroundColor: 'var(--fx-surface-inset)',
                  color: 'var(--fx-text-heading)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, paddingTop: 16 }}>
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'filter 0.2s',
              backgroundColor: 'var(--fx-accent)',
              color: 'var(--fx-accent-ink)',
            }}
            aria-label={`Download ${scroll.title}`}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <ScrollDetailModal
        scroll={scroll}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
