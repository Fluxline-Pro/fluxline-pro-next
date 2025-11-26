'use client';

/**
 * Scrolls Overview Page
 * Main listing page for all strategic insights and white papers
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout/Callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { Typography } from '@/theme/components/typography';
import { ScrollsGrid } from './components/ScrollsGrid';
import { getAllScrolls } from './scrollsData';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export default function ScrollsPage() {
  const scrolls = getAllScrolls();
  const { theme } = useAppTheme();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-16'>
        {/* Hero Section */}
        <Hero
          title='Explore the Scrolls'
          iconName='Documentation'
          description='Access our comprehensive collection of strategic insights and frameworks. Each scroll offers deep-dive guidance on transforming your business, craft, or personal practice with intentionality and resonance.'
        >
          <Callout
            variant='accent'
            title='Gates to Transformation'
            subtitle='Curricula for your evolution—frameworks designed for sustainable growth.'
          />
        </Hero>

        {/* Scrolls Grid Section */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Strategic Insights Library
          </Typography>
          <ScrollsGrid scrolls={scrolls} />
        </section>

        {/* Call to Action */}
        <Callout
          variant='subtle'
          title='Ready to Transform?'
          action={
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <FormButton
                text='Explore Our Services'
                variant='primary'
                size='large'
                icon='ChevronRight'
                iconPosition='right'
                onClick={() => (window.location.href = '/services')}
              />
              <FormButton
                text='Get In Touch'
                variant='outline'
                size='large'
                onClick={() => (window.location.href = '/contact')}
              />
            </div>
          }
        >
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            Explore the insights that resonate with your current phase and
            discover how our services can support your transformational journey.
          </Typography>
        </Callout>
      </div>
    </UnifiedPageWrapper>
  );
}
