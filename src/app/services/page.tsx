'use client';

/**
 * Services Page
 * Displays Fluxline services and offerings
 */

import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export default function ServicesPage() {
  const { theme } = useAppTheme();

  return (
    <PageWrapper>
      <div className="space-y-8">
        <Typography
          variant="h1"
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          Our Services
        </Typography>

        <Typography
          variant="p"
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '1.125rem',
            lineHeight: theme.typography.lineHeights.relaxed,
          }}
        >
          Fluxline offers strategic, emotionally intelligent, and design-forward solutions 
          for founders, creatives, and organizations seeking transformation. Every service 
          is a curriculum gate—crafted to align your identity, systems, and mission with 
          intentionality and resonance.
        </Typography>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Service cards will be added here */}
          <div
            className="p-6 rounded-lg border"
            style={{
              borderColor: theme.palette.neutralTertiaryAlt,
              backgroundColor: 'transparent',
            }}
          >
            <Typography
              variant="h3"
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              Consulting
            </Typography>
            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralSecondary,
              }}
            >
              Strategic business alignment and systems design.
            </Typography>
          </div>

          <div
            className="p-6 rounded-lg border"
            style={{
              borderColor: theme.palette.neutralTertiaryAlt,
              backgroundColor: 'transparent',
            }}
          >
            <Typography
              variant="h3"
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              Development
            </Typography>
            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralSecondary,
              }}
            >
              Custom web development and digital architecture.
            </Typography>
          </div>

          <div
            className="p-6 rounded-lg border"
            style={{
              borderColor: theme.palette.neutralTertiaryAlt,
              backgroundColor: 'transparent',
            }}
          >
            <Typography
              variant="h3"
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              Design
            </Typography>
            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralSecondary,
              }}
            >
              Brand identity and visual experience design.
            </Typography>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
