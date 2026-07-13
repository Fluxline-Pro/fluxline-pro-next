/**
 * ScrollDetailModal Component
 * Full-screen modal for displaying detailed scroll information
 */

'use client';

import React from 'react';
import { ScrollItem } from '../types';
import { categoryLabels } from '../scrollsData';
import { Modal } from '@/components/Modal';
import FxButton from '@/theme/components/dsm/FxButton';

interface ScrollDetailModalProps {
  scroll: ScrollItem;
  isOpen: boolean;
  onClose: () => void;
}

export function ScrollDetailModal({
  scroll,
  isOpen,
  onClose,
}: ScrollDetailModalProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const handleDownload = () => {
    window.open(scroll.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onClose}
      showCloseButton={false}
      style={{
        maxWidth: '900px',
        width: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          padding: 32,
          backgroundColor: 'var(--fx-surface-card)',
        }}
      >
        {/* Header with close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 20,
          }}
        >
          <div style={{ flex: 1 }}>
            {/* Category Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '4px 16px',
                  borderRadius: '999px',
                  backgroundColor: 'color-mix(in srgb, var(--fx-accent) 15%, transparent)',
                  color: 'var(--fx-accent)',
                }}
              >
                {categoryLabels[scroll.category] || scroll.category}
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--fx-text-faint)',
                }}
              >
                {scroll.fileSize}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                color: 'var(--fx-text-heading)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {scroll.title}
            </h1>

            {/* Description */}
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: '1.125rem',
                lineHeight: 1.65,
                marginBottom: 8,
              }}
            >
              {scroll.description}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: 'color-mix(in srgb, var(--fx-text-body) 10%, transparent)',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
              transform: 'scale(1)',
              color: 'var(--fx-text-body)',
              fontSize: '1.25rem',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--fx-text-body) 20%, transparent)';
              e.currentTarget.style.transform = 'scale(1.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--fx-text-body) 10%, transparent)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label='Close modal'
          >
            &#10005;
          </button>
        </div>

        {/* Metadata */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            fontSize: '0.875rem',
            color: 'var(--fx-text-muted)',
          }}
        >
          <div>
            <strong>Published:</strong> {formatDate(scroll.publishedDate)}
          </div>
          <div>
            <strong>Last Updated:</strong> {formatDate(scroll.lastUpdated)}
          </div>
        </div>

        {/* Tags */}
        {scroll.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {scroll.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.875rem',
                  padding: '4px 16px 4px 0',
                  borderRadius: 4,
                  backgroundColor: 'color-mix(in srgb, var(--fx-accent) 5%, transparent)',
                  color: 'var(--fx-text-heading)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: 'var(--fx-border)',
            marginBottom: 32,
          }}
        />

        {/* Download Section */}
        <div
          style={{
            padding: 20,
            borderRadius: 'var(--fx-radius-card)',
            border: '1px solid var(--fx-border)',
            backgroundColor: 'var(--fx-surface-card)',
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              color: 'var(--fx-accent)',
              fontSize: '1.5rem',
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Download This Scroll
          </h3>
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: '1rem',
              lineHeight: 1.65,
              marginBottom: 20,
            }}
          >
            Access the complete strategic insights document in PDF format. Each
            scroll provides in-depth guidance and frameworks for transformation.
          </p>
          <FxButton
            variant='primary'
            size='lg'
            onClick={handleDownload}
          >
            Download PDF ({scroll.fileSize})
          </FxButton>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <FxButton
            variant='outline'
            size='md'
            onClick={() => {
              window.location.href = '/services/scrolls';
            }}
          >
            View All Scrolls
          </FxButton>
          <FxButton
            variant='outline'
            size='md'
            onClick={() => {
              window.location.href = '/services';
            }}
          >
            Explore Services
          </FxButton>
        </div>
      </div>
    </Modal>
  );
}
