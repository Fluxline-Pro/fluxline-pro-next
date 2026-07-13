'use client';

import React from 'react';
import FxCard from '@/theme/components/dsm/FxCard';
import { SERVICE_CATEGORIES } from '../../constants';

export const RelatedServices: React.FC<{ currentServiceId: string }> = ({
  currentServiceId,
}) => {
  const relatedServices = SERVICE_CATEGORIES.filter(
    (s) => s.id !== currentServiceId && s.id !== 'education-training'
  ).slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fx-accent)',
          marginBottom: 0,
        }}
      >
        Related Services
      </div>

      <div
        className="fx-g3"
        style={{
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {relatedServices.map((service) => (
          <FxCard
            key={service.id}
            interactive
            href={service.path}
            style={{ padding: '24px 24px 20px' }}
          >
            <h4
              style={{
                fontSize: 'var(--fx-h3-size)',
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                marginBottom: 8,
                fontFamily: 'var(--fx-font)',
              }}
            >
              {service.title}
            </h4>
            <p
              style={{
                fontSize: 'var(--fx-body-size)',
                color: 'var(--fx-text-body)',
                lineHeight: 'var(--fx-body-leading)',
                marginBottom: 16,
              }}
            >
              {service.description}
            </p>
            <span
              style={{
                fontSize: 'var(--fx-cta-link-size)',
                color: 'var(--fx-accent)',
                fontWeight: 700,
                letterSpacing: 'var(--fx-cta-link-tracking)',
                textTransform: 'uppercase',
              }}
            >
              Learn More ›
            </span>
          </FxCard>
        ))}
      </div>
    </div>
  );
};
