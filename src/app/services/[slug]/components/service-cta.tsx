'use client';

import React from 'react';
import Link from 'next/link';

/**
 * ServiceCTA Component
 * Call to action section
 */
export const ServiceCTA: React.FC = () => {
  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: 'var(--fx-radius-card)',
        border: '2px solid var(--fx-text-soft)',
        backgroundColor: 'transparent',
        textAlign: 'center',
      }}
    >
      <h3
        style={{
          color: 'var(--fx-accent)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        Ready to Begin?
      </h3>
      <p
        style={{
          color: 'var(--fx-text-muted)',
          fontSize: '1.125rem',
          lineHeight: 1.65,
          marginBottom: '1.5rem',
        }}
      >
        Let&apos;s design the systems, strategies, and rituals that align your
        vision with reality.
      </p>
      <Link
        href='/contact'
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          borderRadius: 'var(--fx-radius-card)',
          backgroundColor: 'var(--fx-accent)',
          color: 'var(--fx-text-bright)',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
      >
        Get in Touch
      </Link>
    </div>
  );
};
