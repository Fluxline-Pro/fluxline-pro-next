'use client';

import React from 'react';
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
        padding: 16,
      }}
      onClick={onDismiss}
    >
      <div
        style={{
          backgroundColor: 'var(--fx-text-bright)',
          borderRadius: 'var(--fx-radius-card)',
          padding: 32,
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
            marginBottom: 20,
          }}
        >
          <h3
            style={{
              fontSize: 'var(--fx-h3-size)',
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
            }}
          >
            {episode.episode_title}
          </h3>
          <button
            onClick={onDismiss}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'var(--fx-text-muted)',
              padding: '0 8px',
            }}
            aria-label='Close modal'
          >
            ×
          </button>
        </div>

        <p
          style={{
            color: 'var(--fx-text-muted)',
            marginBottom: 20,
          }}
        >
          {episode.description}
        </p>

        <audio
          controls
          style={{ width: '100%', marginTop: 16 }}
          src={episode.audio_url}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
