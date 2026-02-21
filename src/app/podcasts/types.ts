/**
 * Podcast Section Types
 * Matches Azure Table Storage fields for podcast metadata
 */

export interface PodcastEpisode {
  id: string;
  slug: string;
  podcast_name: string;
  episode_title: string;
  author_name: string;
  description: string;
  publish_date: string;
  duration: string; // e.g. "PT32M45S" or "32:45"
  audio_url: string;
  audio_size_bytes?: number; // File size in bytes for RSS enclosure
  episode_number?: number;
  tags?: string[];
  imageUrl?: string;
}

export const PODCAST_NAME = 'A+ In FLUX Mythmaker';
export const PODCAST_AUTHOR = 'Fluxline';
export const RSS_ENDPOINT = '/api/podcasts/rss';
