'use client';

import React from 'react';
import { InteractiveCard } from '@/components/InteractiveCard';
import { SERVICE_CATEGORIES } from '../../constants';

/**
 * RelatedServices Component
 * Shows related services
 */
export const RelatedServices: React.FC<{ currentServiceId: string }> = ({
  currentServiceId,
}) => {
  // Get 3 related services (excluding current)
  const relatedServices = SERVICE_CATEGORIES.filter(
    (s) => s.id !== currentServiceId
  ).slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2
        style={{
          color: 'var(--fx-accent)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 600,
        }}
      >
        Related Services
      </h2>

      <div
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          paddingTop: 8,
        }}
      >
        {relatedServices.map((service) => (
          <InteractiveCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={service.path}
            iconPosition='center'
            showLearnMore={true}
          />
        ))}
      </div>
    </div>
  );
};
