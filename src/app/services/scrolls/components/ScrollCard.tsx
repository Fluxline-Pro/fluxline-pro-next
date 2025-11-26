/**
 * ScrollCard Component
 * Individual card for displaying scroll information with download functionality
 */

'use client';

import React from 'react';
import { ScrollItem } from '../types';
import { categoryLabels } from '../scrollsData';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { ScrollDetailModal } from './ScrollDetailModal';

interface ScrollCardProps {
  scroll: ScrollItem;
  variant?: 'compact' | 'detailed';
  className?: string;
}

export function ScrollCard({
  scroll,
  variant = 'compact',
  className = '',
}: ScrollCardProps) {
  const { theme } = useAppTheme();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

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
        className={`flex flex-col gap-4 p-6 rounded-lg border transition-all hover:shadow-lg cursor-pointer ${className}`}
        style={{
          borderColor: theme.palette.neutralLight,
          backgroundColor: isDark
            ? theme.palette.neutralLighter
            : theme.palette.white,
        }}
      >
        {/* Category Badge */}
        <div className='flex items-center gap-2'>
          <span
            className='text-xs font-semibold px-3 py-1 rounded-full'
            style={{
              backgroundColor: theme.palette.themeLighter,
              color: theme.palette.themePrimary,
            }}
          >
            {categoryLabels[scroll.category] || scroll.category}
          </span>
          <span
            className='text-xs'
            style={{ color: theme.palette.neutralTertiary }}
          >
            {scroll.fileSize}
          </span>
        </div>

        {/* Title */}
        <h3
          className='text-xl font-bold leading-tight'
          style={{ color: theme.palette.neutralPrimary }}
        >
          {scroll.title}
        </h3>

        {/* Description */}
        <p
          className='text-sm flex-grow'
          style={{ color: theme.palette.neutralSecondary }}
        >
          {scroll.description}
        </p>

        {/* Tags */}
        {variant === 'detailed' && scroll.tags.length > 0 && (
          <div className='flex flex-wrap gap-2'>
            {scroll.tags.map((tag) => (
              <span
                key={tag}
                className='text-xs px-2 py-1 rounded'
                style={{
                  backgroundColor: theme.palette.neutralLighter,
                  color: theme.palette.neutralPrimary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className='flex gap-3 pt-4'>
          <button
            onClick={handleDownload}
            className='flex-1 px-4 py-2 rounded-lg font-semibold transition-colors'
            style={{
              backgroundColor: isDark
                ? theme.palette.themeSecondary
                : theme.palette.themePrimary,
              color: theme.palette.white,
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
