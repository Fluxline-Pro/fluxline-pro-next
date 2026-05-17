'use client';

import React from 'react';
import { Hero } from '@/theme/components/hero/Hero';
import { FadeUp } from '@/animations/fade-animations';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form/FormButton';
import type { PodcastEpisode } from '@/app/podcasts/types';

export interface HeroSimpleProps {
  title: string;
  subtitle?: string;
  description?: string;
  backArrow?: boolean;
  backArrowPath?: string;
  animationDelay?: number;
  /** Latest podcast episode for the featured callout */
  latestEpisode?: PodcastEpisode | null;
  /** Handler for when user clicks "Listen Now" */
  onPlayLatestEpisode?: () => void;
  /** Loading state for episodes */
  episodesLoading?: boolean;
}

/**
 * HeroSimple - Hero component wrapper for TRI pages
 * Provides consistent hero styling with optional back arrow navigation
 * and featured latest episode callout
 */
export function HeroSimple({
  title,
  subtitle,
  backArrow,
  description,
  backArrowPath,
  animationDelay = 0,
  latestEpisode,
  onPlayLatestEpisode,
  episodesLoading = false,
}: HeroSimpleProps) {
  return (
    <FadeUp delay={animationDelay}>
      <Hero
        title={title}
        subtitle={subtitle}
        backArrow={backArrow}
        backArrowPath={backArrowPath}
        description={description}
      >
        {/* Featured Latest Episode Callout */}
        {!episodesLoading && latestEpisode && onPlayLatestEpisode && (
          <div className='pt-8'>
            <Callout
              variant='accent'
              title='Listen to the Most Recent Episode'
              subtitle={latestEpisode.episode_title || 'Start listening now'}
              action={
                <FormButton
                  variant='secondary'
                  size='large'
                  icon='Play'
                  iconPosition='left'
                  onClick={onPlayLatestEpisode}
                  aria-label='Play most recent episode'
                >
                  Listen Now
                </FormButton>
              }
            />
          </div>
        )}
      </Hero>
    </FadeUp>
  );
}
