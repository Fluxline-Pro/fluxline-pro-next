'use client';

import React from 'react';
import { FluentIcon } from '@/theme/components/fluent-icon';
import type { ServiceCategory } from '../../constants';

/**
 * ServiceDetailHero Component
 * Hero section for service detail page
 */
export const ServiceDetailHero: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <FluentIcon
          iconName={service.icon}
          size='xLarge'
          color='var(--fx-accent)'
        />
        <h1
          style={{
            color: 'var(--fx-accent)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
          }}
        >
          {service.title}
        </h1>
      </div>

      <p
        style={{
          color: 'var(--fx-text-body)',
          fontSize: '1.25rem',
          lineHeight: 1.7,
        }}
      >
        {service.description}
      </p>
    </div>
  );
};
