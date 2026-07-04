'use client';

import React from 'react';
import FxCard from './FxCard';
import FxChip from './FxChip';

interface FxFeaturedCardProps {
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  href?: string;
  image?: string;
  style?: React.CSSProperties;
}

export default function FxFeaturedCard({
  title,
  excerpt,
  category,
  date,
  href,
  image,
  style,
}: FxFeaturedCardProps) {
  return (
    <FxCard
      variant="feature"
      interactive
      href={href}
      style={{ gridColumn: 'span 2', ...style }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        {image && (
          <img
            src={image}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--fx-radius-card-sm)',
            }}
          />
        )}
        <div>
          <FxChip kind="badge" tone="gold">
            Featured
          </FxChip>
          {category && (
            <FxChip kind="badge" tone="teal" style={{ marginLeft: 8 }}>
              {category}
            </FxChip>
          )}
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
              margin: '12px 0 8px',
              lineHeight: 1.3,
            }}
          >
            {title}
          </div>
          {excerpt && (
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--fx-text-body)',
                margin: 0,
              }}
            >
              {excerpt}
            </p>
          )}
          {date && (
            <div style={{ fontSize: 12.5, color: 'var(--fx-text-faint)', marginTop: 10 }}>
              {date}
            </div>
          )}
        </div>
      </div>
    </FxCard>
  );
}
