'use client';

import React from 'react';
import { getApiEndpoint } from '@/lib/getApiUrl';
import type { PodcastEpisode } from '@/app/podcasts/types';

/**
 * useTRILatestEpisode
 *
 * Shared hook for TRI podcast pages that want to surface the latest episode
 * in a hero callout. Fetches from the rss-proxy endpoint and returns the
 * first episode plus modal state so the caller can wire up play/dismiss.
 *
 * Usage:
 *   const { latestEpisode, episodesLoading, selectedEpisode, setSelectedEpisode } =
 *     useTRILatestEpisode();
 */
export function useTRILatestEpisode() {
  const [episodes, setEpisodes] = React.useState<PodcastEpisode[]>([]);
  const [episodesLoading, setEpisodesLoading] = React.useState(true);
  const [selectedEpisode, setSelectedEpisode] =
    React.useState<PodcastEpisode | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchEpisodes() {
      try {
        const res = await fetch(getApiEndpoint('/api/podcasts/rss-proxy'));
        if (!res.ok) {
          throw new Error(`Failed to fetch episodes: ${res.statusText}`);
        }
        const data = await res.json();
        if (!cancelled) setEpisodes(data.episodes || []);
      } catch (err) {
        console.error('Error fetching podcast episodes:', err);
      } finally {
        if (!cancelled) setEpisodesLoading(false);
      }
    }

    fetchEpisodes();
    return () => {
      cancelled = true;
    };
  }, []);

  const latestEpisode = episodes.length > 0 ? episodes[0] : null;

  return { latestEpisode, episodesLoading, selectedEpisode, setSelectedEpisode };
}
