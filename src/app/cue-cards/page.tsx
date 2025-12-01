'use client';

/**
 * Cue Cards Archive Page
 * Hidden archive page accessible via LinkTree or direct link
 * Contains modular "cue cards" summarizing key archetypes, mantras, and actions
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout/Callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { Typography } from '@/theme/components/typography';
import { CueCardsGrid } from './components/CueCardsGrid';
import { getAllCueCards, getFeaturedCueCards } from './cueCardsData';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export default function CueCardsPage() {
  const allCards = getAllCueCards();
  const featuredCards = getFeaturedCueCards();
  const { theme } = useAppTheme();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-16'>
        {/* Hero Section */}
        <Hero
          title='The Archetypes'
          iconName='Lightbulb'
          description='Explore the mythic curriculum through these cue cards. Each archetype represents a pathway of transformation—a mantra to anchor your energy, an action to embody, and an emotional frame to guide your journey.'
        >
          <Callout
            variant='accent'
            title='Portals to Transformation'
            subtitle='Modular wisdom for your evolution—each card a stepping stone on the path.'
          />
        </Hero>

        {/* Featured Archetypes Section */}
        {featuredCards.length > 0 && (
          <section className='space-y-8'>
            <Typography
              variant='h2'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '2rem',
                fontWeight: theme.typography.fontWeights.bold,
              }}
            >
              Featured Archetypes
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
                marginBottom: theme.spacing.l,
              }}
            >
              Begin your exploration with these foundational archetypes—each one
              a doorway into deeper work.
            </Typography>
            <CueCardsGrid cards={featuredCards} />
          </section>
        )}

        {/* All Archetypes Section */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Complete Archive
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
              marginBottom: theme.spacing.l,
            }}
          >
            The full collection of archetypes—find the one that speaks to your
            current phase.
          </Typography>
          <CueCardsGrid cards={allCards} />
        </section>

        {/* Call to Action */}
        <Callout
          variant='subtle'
          title='Ready to Embody Your Archetype?'
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
                text='Begin Your Journey'
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
            Each archetype is a map, not a territory. Let Fluxline guide you in
            translating these mythic frames into practical transformation.
          </Typography>
        </Callout>
      </div>
    </UnifiedPageWrapper>
  );
}
