'use client';

/**
 * Service Detail Loading State
 * Loading skeleton for service detail pages
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';

export default function ServiceDetailLoading() {
  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
          animation: 'pulse 2s infinite',
        }}
      >
        {/* Breadcrumb Skeleton */}
        <div
          style={{
            height: 16,
            width: 128,
            background: 'var(--fx-surface-inset)',
            borderRadius: 8,
          }}
        />

        {/* Hero Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                height: 64,
                width: 64,
                background: 'var(--fx-surface-inset)',
                borderRadius: 8,
              }}
            />
            <div
              style={{
                height: 48,
                width: '75%',
                background: 'var(--fx-surface-inset)',
                borderRadius: 8,
              }}
            />
          </div>
          <div
            style={{
              height: 24,
              width: '100%',
              background: 'var(--fx-surface-inset)',
              borderRadius: 8,
            }}
          />
          <div
            style={{
              height: 24,
              width: '83%',
              background: 'var(--fx-surface-inset)',
              borderRadius: 8,
            }}
          />
        </div>

        {/* Content Skeleton */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: 32,
            border: '1px solid var(--fx-border)',
            borderRadius: 12,
          }}
        >
          {[100, 100, 83, 100, 66].map((w, i) => (
            <div
              key={i}
              style={{
                height: 16,
                width: `${w}%`,
                background: 'var(--fx-surface-inset)',
                borderRadius: 8,
              }}
            />
          ))}
        </div>

        {/* Features Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              height: 32,
              width: 192,
              background: 'var(--fx-surface-inset)',
              borderRadius: 8,
            }}
          />
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: 80,
                  background: 'var(--fx-surface-inset)',
                  borderRadius: 8,
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div
          style={{
            height: 192,
            background: 'var(--fx-surface-inset)',
            borderRadius: 12,
          }}
        />

        {/* Related Services Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              height: 32,
              width: 192,
              background: 'var(--fx-surface-inset)',
              borderRadius: 8,
            }}
          />
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: 192,
                  background: 'var(--fx-surface-inset)',
                  borderRadius: 8,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
