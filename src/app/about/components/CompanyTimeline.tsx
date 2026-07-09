'use client';

/**
 * CompanyTimeline Component
 * Displays company history and milestones
 */

import React from 'react';
import { FluentIcon } from '@/theme/components/fluent-icon';

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
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 600,
      }}
    >
      {events.map((event, index) => (
        <div
          key={event.id}
          style={{
            display: 'flex',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
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
                backgroundColor: 'var(--fx-border)',
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
              backgroundColor: 'var(--fx-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            {event.icon ? (
              <FluentIcon
                iconName={event.icon}
                size='small'
                color='var(--fx-accent-ink)'
              />
            ) : (
              <p
                style={{
                  color: 'var(--fx-accent-ink)',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {index + 1}
              </p>
            )}
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: '0.5rem 0',
            }}
          >
            <p
              style={{
                color: 'var(--fx-accent)',
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '0.25rem',
                marginTop: 0,
              }}
            >
              {event.year}
            </p>

            <h3
              style={{
                color: 'var(--fx-accent)',
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                marginTop: 0,
              }}
            >
              {event.title}
            </h3>

            <p
              style={{
                color: 'var(--fx-text-body)',
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyTimeline;
