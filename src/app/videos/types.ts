/**
 * Video Section Types
 */

export type VideoType = 'videos' | 'live' | 'playlists';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelHandle?: string;
  duration?: string;
  viewCount?: string;
  type: 'video' | 'live' | 'playlist';
}

export interface VideoTabConfig {
  key: VideoType;
  label: string;
  iconName: string;
}

export const VIDEO_TABS: VideoTabConfig[] = [
  { key: 'videos', label: 'Videos', iconName: 'Video' },
  { key: 'live', label: 'Live', iconName: 'StreamingOff' },
  { key: 'playlists', label: 'Playlists', iconName: 'BulletedList' },
];

/**
 * Parse ISO 8601 duration (e.g. PT1H2M3S) into a readable string
 */
export function formatDuration(iso?: string): string | undefined {
  if (!iso) return undefined;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return undefined;
  const h = parseInt(match[1] || '0', 10);
  const m = parseInt(match[2] || '0', 10);
  const s = parseInt(match[3] || '0', 10);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}
