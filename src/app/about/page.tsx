'use client';

/**
 * About Page
 * Information about Fluxline and the company mission
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { AboutHero } from './components/AboutHero';
import { TeamMemberCard } from './components/TeamMemberCard';
import { CompanyStatistics } from './components/CompanyStatistics';
import { CompanyTimeline } from './components/CompanyTimeline';
import { ValueCard } from './components/ValueCard';
import { InfoCard } from './components/InfoCard';
import {
  TEAM_MEMBERS,
  COMPANY_STATISTICS,
  COMPANY_TIMELINE,
  COMPANY_VALUES,
  INFO_CARDS,
} from './constants';

export default function AboutPage() {
  const { theme } = useAppTheme();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-16'>
        {/* Hero Section */}
        <AboutHero />

        {/* Overview Section */}
        <div className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: theme.typography.fontWeights.bold,
              textAlign: 'center',
            }}
          >
            OVERVIEW
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralPrimary,
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              lineHeight: theme.typography.lineHeights.relaxed,
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Fluxline offers strategic, emotionally intelligent, and design-forward solutions for founders, creatives, and organizations seeking transformation. Every service is a curriculum gate—crafted to align your identity, systems, and mission with intentionality and resonance.
          </Typography>
          <div className='grid gap-6 md:grid-cols-3 mt-12'>
            {INFO_CARDS.map((card) => (
              <InfoCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* Company Statistics */}
        <div className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: theme.typography.fontWeights.bold,
              textAlign: 'center',
            }}
          >
            OUR IMPACT
          </Typography>
          <CompanyStatistics statistics={COMPANY_STATISTICS} />
        </div>

        {/* Mission Section */}
        <div className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: theme.typography.fontWeights.bold,
              textAlign: 'center',
            }}
          >
            OUR MISSION
          </Typography>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralPrimary,
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              lineHeight: theme.typography.lineHeights.relaxed,
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            We seek to architect multidimensional systems that fuse{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>emotional intelligence</em>, <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>financial clarity</em>, and{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>somatic discipline</em>—empowering individuals and brands to
            live with <strong>modular precision</strong> and{' '}
            <strong>legacy-driven resonance</strong>.
          </Typography>
          
          <div
            style={{
              padding: '2rem',
              borderLeft: `4px solid ${theme.palette.themeTertiary}`,
              backgroundColor: 'transparent',
              maxWidth: '600px',
              margin: '2rem auto 0',
            }}
          >
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.25rem',
                fontStyle: 'italic',
                lineHeight: theme.typography.lineHeights.relaxed,
                textAlign: 'center',
              }}
            >
              We&apos;re not done yet— but we&apos;re already extraordinary.
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                fontStyle: 'italic',
                lineHeight: theme.typography.lineHeights.relaxed,
                marginTop: '0.5rem',
                textAlign: 'center',
              }}
            >
              Modular by design. Resonant by nature.
            </Typography>
          </div>
        </div>

        {/* Company Values */}
        <div className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: theme.typography.fontWeights.bold,
              textAlign: 'center',
            }}
          >
            OUR VALUES
          </Typography>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {COMPANY_VALUES.map((value) => (
              <ValueCard key={value.id} value={value} />
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: theme.typography.fontWeights.bold,
              textAlign: 'center',
            }}
          >
            OUR JOURNEY
          </Typography>
          <CompanyTimeline events={COMPANY_TIMELINE} />
        </div>

        {/* Team Section */}
        <div className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: theme.typography.fontWeights.bold,
              textAlign: 'center',
            }}
          >
            OUR TEAM
          </Typography>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
