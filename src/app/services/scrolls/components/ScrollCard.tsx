/**
 * ScrollCard Component
 * Individual card for displaying scroll information with download functionality
 */

'use client';

import Link from 'next/link';
import { ScrollItem } from '../types';

interface ScrollCardProps {
  scroll: ScrollItem;
  variant?: 'compact' | 'detailed';
  className?: string;
}

export function ScrollCard({ scroll, variant = 'compact', className = '' }: ScrollCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    // Prevent navigation when clicking download
    e.preventDefault();
    e.stopPropagation();
    
    // Open PDF in new tab
    window.open(scroll.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const categoryLabels: Record<string, string> = {
    'business-strategy': 'Business Strategy',
    'development': 'Development',
    'design': 'Design',
    'wellness': 'Wellness',
    'education': 'Education',
    'coaching': 'Coaching',
  };

  return (
    <Link
      href={`/services/scrolls/${scroll.id}`}
      className={`flex flex-col gap-4 p-6 rounded-lg border transition-all hover:shadow-lg ${className}`}
      style={{
        borderColor: 'var(--neutralLight)',
        backgroundColor: 'var(--white)',
      }}
    >
      {/* Category Badge */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: 'var(--themeLighter)',
            color: 'var(--themePrimary)',
          }}
        >
          {categoryLabels[scroll.category] || scroll.category}
        </span>
        <span className="text-xs text-gray-500">{scroll.fileSize}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold leading-tight">{scroll.title}</h3>

      {/* Description */}
      <p className="text-sm flex-grow" style={{ color: 'var(--neutralSecondary)' }}>
        {scroll.description}
      </p>

      {/* Tags */}
      {variant === 'detailed' && scroll.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {scroll.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded"
              style={{
                backgroundColor: 'var(--neutralLighter)',
                color: 'var(--neutralPrimary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleDownload}
          className="flex-1 px-4 py-2 rounded-lg font-semibold transition-colors"
          style={{
            backgroundColor: 'var(--themePrimary)',
            color: 'var(--white)',
          }}
          aria-label={`Download ${scroll.title}`}
        >
          Download PDF
        </button>
      </div>
    </Link>
  );
}
