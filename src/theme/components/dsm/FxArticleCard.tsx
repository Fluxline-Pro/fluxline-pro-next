'use client';

import React from 'react';
import FxCard from './FxCard';
import FxChip from './FxChip';

interface FxArticleCardProps {
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  href?: string;
  image?: string;
  style?: React.CSSProperties;
}

export default function FxArticleCard({
  title,
  excerpt,
  category,
  date,
  href,
  image,
  style,
}: FxArticleCardProps) {
  return (
    <FxCard interactive href={href} style={style}>
      {image && (
        <img
          src={image}
          alt=""
          style={{
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover',
            borderRadius: 'var(--fx-radius-card-sm)',
            marginBottom: 14,
          }}
        />
      )}
      {category && (
        <FxChip kind="badge" tone="teal">
          {category}
        </FxChip>
      )}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--fx-text-heading)',
          margin: '8px 0 6px',
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
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as any,
            overflow: 'hidden',
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
    </FxCard>
  );
}
