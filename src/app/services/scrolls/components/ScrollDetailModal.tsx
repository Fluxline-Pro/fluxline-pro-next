/**
 * ScrollDetailModal Component
 * Full-screen modal for displaying detailed scroll information
 */

'use client';

import React from 'react';
import { ScrollItem } from '../types';
import { categoryLabels } from '../scrollsData';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Modal } from '@/components/Modal';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
import { FluentIcon } from '@/theme/components/fluent-icon';

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
  const { theme } = useAppTheme();
  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

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
          padding: theme.spacing.xl,
          backgroundColor: isDark
            ? theme.palette.neutralLighter
            : theme.palette.white,
        }}
      >
        {/* Header with close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: theme.spacing.l,
          }}
        >
          <div style={{ flex: 1 }}>
            {/* Category Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.s1,
                marginBottom: theme.spacing.m,
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  padding: `${theme.spacing.s} ${theme.spacing.m}`,
                  borderRadius: '999px',
                  backgroundColor: theme.palette.themeLighter,
                  color: theme.palette.themePrimary,
                }}
              >
                {categoryLabels[scroll.category] || scroll.category}
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: theme.palette.neutralTertiary,
                }}
              >
                {scroll.fileSize}
              </span>
            </div>

            {/* Title */}
            <Typography
              variant='h1'
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: theme.typography.fontWeights.bold,
                marginBottom: theme.spacing.m,
              }}
            >
              {scroll.title}
            </Typography>

            {/* Description */}
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
                marginBottom: theme.spacing.s1,
              }}
            >
              {scroll.description}
            </Typography>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: theme.spacing.s,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.palette.neutralLighter;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label='Close modal'
          >
            <FluentIcon
              iconName='Cancel'
              size='large'
              color={theme.palette.neutralPrimary}
            />
          </button>
        </div>

        {/* Metadata */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing.l,
            fontSize: '0.875rem',
            color: theme.palette.neutralSecondary,
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
              gap: theme.spacing.s,
            }}
          >
            {scroll.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.875rem',
                  padding: `${theme.spacing.s} ${theme.spacing.m} ${theme.spacing.s} 0`,
                  borderRadius: theme.borderRadius.s,
                  backgroundColor: theme.palette.themeLighterAlt,
                  color: theme.palette.neutralPrimary,
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
            backgroundColor: theme.palette.neutralQuaternary,
            marginBottom: theme.spacing.xl,
          }}
        />

        {/* Download Section */}
        <div
          style={{
            padding: theme.spacing.l,
            borderRadius: theme.borderRadius.m,
            border: `1px solid ${theme.palette.neutralLight}`,
            backgroundColor: isDark
              ? theme.palette.neutralLight
              : theme.palette.neutralLighterAlt,
            marginBottom: theme.spacing.xl,
          }}
        >
          <Typography
            variant='h3'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '1.5rem',
              fontWeight: theme.typography.fontWeights.semiBold,
              marginBottom: theme.spacing.m,
            }}
          >
            Download This Scroll
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1rem',
              lineHeight: theme.typography.lineHeights.relaxed,
              marginBottom: theme.spacing.l,
            }}
          >
            Access the complete strategic insights document in PDF format. Each
            scroll provides in-depth guidance and frameworks for transformation.
          </Typography>
          <FormButton
            text={`Download PDF (${scroll.fileSize})`}
            variant='primary'
            size='large'
            icon='Download'
            iconPosition='left'
            onClick={handleDownload}
          />
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.m,
            flexWrap: 'wrap',
          }}
        >
          <FormButton
            text='View All Scrolls'
            variant='outline'
            size='medium'
            onClick={() => {
              window.location.href = '/services/scrolls';
            }}
          />
          <FormButton
            text='Explore Services'
            variant='outline'
            size='medium'
            onClick={() => {
              window.location.href = '/services';
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
