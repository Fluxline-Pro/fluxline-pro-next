'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { PodcastEpisode } from '@/app/podcasts/types';

interface EpisodeModalProps {
  episode: PodcastEpisode;
  onDismiss: () => void;
}

/**
 * EpisodeModal
 *
 * Lightweight inline modal for playing a podcast episode on TRI sub-pages
 * (About, Library, etc.). Shared so every TRI page gets identical behaviour
 * without duplicating markup.
 */
export function EpisodeModal({ episode, onDismiss }: EpisodeModalProps) {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: theme.spacing.m,
      }}
      onClick={onDismiss}
    >
      <div
        style={{
          backgroundColor: theme.palette.white,
          borderRadius: theme.borderRadius.container.medium,
          padding: theme.spacing.xl,
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: theme.spacing.l,
          }}
        >
          <Typography
            variant='h3'
            style={{ color: theme.palette.neutralPrimary }}
          >
            {episode.episode_title}
          </Typography>
          <button
            onClick={onDismiss}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: theme.palette.neutralSecondary,
              padding: '0 8px',
            }}
            aria-label='Close modal'
          >
            ×
          </button>
        </div>

        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            marginBottom: theme.spacing.l,
          }}
        >
          {episode.description}
        </Typography>

        <audio
          controls
          style={{ width: '100%', marginTop: theme.spacing.m }}
          src={episode.audio_url}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
