'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { ServiceCategory } from '../../constants';

/**
 * ServiceDetailContent Component
 * Main content section with HTML summary
 */
export const ServiceDetailContent: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          color: theme.palette.neutralPrimary,
          fontSize: '1.125rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
        dangerouslySetInnerHTML={{ __html: service.summary }}
      />
    </div>
  );
};
