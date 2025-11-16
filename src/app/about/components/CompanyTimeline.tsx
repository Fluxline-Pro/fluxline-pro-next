'use client';

/**
 * CompanyTimeline Component
 * Displays company history and milestones
 */

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
}

interface CompanyTimelineProps {
  events: TimelineEvent[];
}

export const CompanyTimeline: React.FC<CompanyTimelineProps> = ({ events }) => {
  const { theme } = useAppTheme();

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div
          key={event.id}
          style={{
            display: 'flex',
            gap: '1.5rem',
            position: 'relative',
          }}
        >
          {/* Timeline Line */}
          {index < events.length - 1 && (
            <div
              style={{
                position: 'absolute',
                left: '20px',
                top: '48px',
                bottom: '-24px',
                width: '2px',
                backgroundColor: theme.palette.neutralQuaternary,
              }}
            />
          )}

          {/* Icon/Marker */}
          <div
            style={{
              flexShrink: 0,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: theme.palette.themePrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {event.icon ? (
              <FluentIcon
                iconName={event.icon}
                size="small"
                color={theme.palette.white}
              />
            ) : (
              <Typography
                variant="p"
                style={{
                  color: theme.palette.white,
                  fontSize: '0.875rem',
                  fontWeight: theme.typography.fontWeights.bold,
                }}
              >
                {index + 1}
              </Typography>
            )}
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: '0.5rem 0',
            }}
          >
            <Typography
              variant="p"
              style={{
                color: theme.palette.themeTertiary,
                fontSize: '0.875rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.25rem',
              }}
            >
              {event.year}
            </Typography>

            <Typography
              variant="h3"
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.25rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.5rem',
              }}
            >
              {event.title}
            </Typography>

            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {event.description}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyTimeline;
