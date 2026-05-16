/**
 * Podcast Section Types
 * Matches Azure Table Storage fields for podcast metadata
 */

/**
 * Serializable blog post snapshot used for TRI content sections.
 * Dates are ISO strings so the data can be safely passed from Server → Client components.
 */
export interface TRIPost {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  imageAlt?: string;
  tags: string[];
  publishedDate: string; // ISO date string
}

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

export const PODCAST_NAME = 'The Resonant Identity';
export const PODCAST_AUTHOR = 'Fluxline';
export const RSS_ENDPOINT = '/api/podcasts/rss';
export const SPREAKER_RSS_URL =
  'https://www.spreaker.com/show/6933506/episodes/feed';
export const PODCAST_PLATFORMS = {
  spreaker: 'https://www.spreaker.com/podcast/the-resonant-identity--6933506',
  applePodcasts:
    'https://podcasts.apple.com/us/podcast/the-resonant-identity/id1891152754',
  spotify: 'https://open.spotify.com/show/0kmCO10TwluoHUYdD3v4Qe',
  iHeartRadio: 'https://iheart.com/podcast/329383182',
  amazonMusic:
    'https://music.amazon.com/podcasts/b4d2ead1-4aaa-4189-b4bd-bd41141030a7',
  deezer: 'https://www.deezer.com/show/1002848441',
  podchaser: 'https://www.podchaser.com/podcasts/the-resonant-identity-6436183',
} as const;
