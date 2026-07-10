'use client';

import React from 'react';
import type { ServiceCategory } from '../../constants';

/**
 * ServiceDetailContent Component
 * Main content section with HTML summary
 */
export const ServiceDetailContent: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: 'var(--fx-radius-card)',
        border: '1px solid var(--fx-border)',
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          color: 'var(--fx-text-heading)',
          fontSize: '1.125rem',
          lineHeight: 1.65,
        }}
        dangerouslySetInnerHTML={{ __html: service.summary }}
      />
    </div>
  );
};
