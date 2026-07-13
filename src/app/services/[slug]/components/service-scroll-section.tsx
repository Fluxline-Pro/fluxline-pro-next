'use client';

import React from 'react';
import Link from 'next/link';
import FxButton from '@/theme/components/dsm/FxButton';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import type { ScrollItem } from '@/app/services/scrolls/types';

interface ServiceScrollSectionProps {
  scroll: ScrollItem;
}

/**
 * ServiceScrollSection Component
 * Displays the related white paper/scroll for a service
 */
export const ServiceScrollSection: React.FC<ServiceScrollSectionProps> = ({
  scroll,
}) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isMobile = isMounted ? isMobileHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(scroll.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <h2
        style={{
          color: 'var(--fx-accent)',
          fontSize: '2rem',
          fontWeight: 700,
        }}
      >
        Strategic Insights
      </h2>

      <div
        style={{
          border: '1px solid var(--fx-border)',
          borderRadius: 12,
          backgroundColor: 'var(--fx-surface-inset)',
          padding: isMobile ? 24 : 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
          }}
        >
          <span
            style={{
              color: 'var(--fx-accent)',
              fontSize: '1.75rem',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            &#128220;
          </span>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: 'var(--fx-accent)',
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {scroll.title}
            </h3>
            <p
              style={{
                color: 'var(--fx-text-body)',
                fontSize: isMobile ? '0.875rem' : '1rem',
                lineHeight: 1.7,
              }}
            >
              {scroll.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        {scroll.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {scroll.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: 8,
                  backgroundColor: 'color-mix(in srgb, var(--fx-accent) 10%, transparent)',
                  color: 'var(--fx-accent)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* File Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--fx-text-muted)',
            fontSize: '0.875rem',
          }}
        >
          <span>PDF</span>
          <span>{scroll.fileSize}</span>
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 16,
            marginTop: 8,
          }}
        >
          <FxButton
            variant='primary'
            size='lg'
            onClick={handleDownload as unknown as React.MouseEventHandler<HTMLButtonElement>}
          >
            Download White Paper
          </FxButton>
          <Link href={`/services/scrolls/${scroll.id}`} style={{ textDecoration: 'none' }}>
            <FxButton variant='outline' size='lg'>
              Learn More
            </FxButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
