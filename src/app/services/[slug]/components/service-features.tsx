'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { ServiceCategory } from '../../constants';

/**
 * ServiceFeatures Component
 * Key features and benefits section
 */
export const ServiceFeatures: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  const { theme } = useAppTheme();

  // Define features based on service type
  const getFeatures = (serviceId: string): string[] => {
    const featuresMap: Record<string, string[]> = {
      consulting: [
        'Strategic systems design and operational optimization',
        'Modular frameworks for scalable growth',
        'Tech integration and infrastructure planning',
        'Business soul alignment and values-driven strategy',
      ],
      development: [
        'Custom web applications and digital platforms',
        'Intuitive UX and resilient infrastructure',
        'CI/CD pipelines and cloud architecture',
        'Full-stack development with long-term maintainability',
      ],
      design: [
        'Visual identity and brand architecture',
        'Digital experience design',
        'Modular design systems',
        'Symbolic and emotionally resonant design',
      ],
      'personal-training': [
        'Personalized fitness and wellness coaching',
        'Adaptive training systems for all bodies',
        'Movement patterns and chronic pain management',
        'Emotional intelligence in physical transformation',
        'Mindset support and behavioral change strategies',
        'Flexible scheduling and remote coaching options',
      ],
      'education-training': [
        'Experiential learning and leadership workshops',
        'Emotional intelligence development',
        'Strategic embodiment coaching',
        'Team leadership and influence cultivation',
      ],
      'resonance-core': [
        'Archetypal mapping and identity exploration',
        'Emotional emergence and breakthrough documentation',
        'Symbolic rituals and transformational practices',
        'Legacy building and mission alignment',
      ],
    };

    return featuresMap[serviceId] || [];
  };

  const features = getFeatures(service.id);

  if (features.length === 0) return null;

  return (
    <div className='space-y-4'>
      <Typography
        variant='h2'
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: theme.typography.fontWeights.semiBold,
        }}
      >
        What We Offer
      </Typography>

      <div className='grid gap-4 md:grid-cols-2'>
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              borderRadius: theme.borderRadius.container.small,
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
            }}
          >
            <FluentIcon
              iconName='CheckMark'
              size='medium'
              color={theme.palette.themeTertiary}
            />
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {feature}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
