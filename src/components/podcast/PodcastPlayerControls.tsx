'use client';

/**
 * Podcast Player Controls
 * Play/pause button and seek scrubber shared by the episode detail modal and
 * the persistent mini-player. Both drive the single <audio> element owned by
 * PodcastPlayerContext.
 *
 * Styled with DSM CSS custom properties (var(--fx-*) tokens).
 */

import React from 'react';
import {
  usePodcastPlayer,
  useAudioProgress,
} from '@/contexts/PodcastPlayerContext';

/** Format a duration in seconds as m:ss, or h:mm:ss past an hour. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const total = Math.floor(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const paddedSecs = String(secs).padStart(2, '0');
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${paddedSecs}`;
  }
  return `${minutes}:${paddedSecs}`;
}

export interface PlayPauseButtonProps {
  /** Diameter of the button in px (default: 44). */
  size?: number;
}

export function PlayPauseButton({ size = 44 }: PlayPauseButtonProps) {
  const { isPlaying, toggle, episode } = usePodcastPlayer();
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      type='button'
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
      aria-pressed={isPlaying}
      disabled={!episode}
      style={{
        flex: '0 0 auto',
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'none',
        background: 'var(--fx-accent)',
        color: 'var(--fx-accent-ink)',
        cursor: episode ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'filter var(--fx-color-duration), transform 0.2s ease',
        filter: hovered ? 'brightness(1.08)' : 'none',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
      }}
    >
      {/* Inline glyphs keep the bar dependency-free; the button is labelled above. */}
      <svg
        viewBox='0 0 24 24'
        width={size * 0.5}
        height={size * 0.5}
        fill='currentColor'
        aria-hidden='true'
        focusable='false'
      >
        {isPlaying ? (
          <path d='M6 5h4v14H6zM14 5h4v14h-4z' />
        ) : (
          <path d='M8 5v14l11-7z' />
        )}
      </svg>
    </button>
  );
}

export interface PodcastScrubberProps {
  /** Render the elapsed/remaining timestamps beside the track (default: true). */
  showTimes?: boolean;
}

export function PodcastScrubber({ showTimes = true }: PodcastScrubberProps) {
  const { currentTime, duration, seek } = useAudioProgress();

  const timeStyle: React.CSSProperties = {
    flex: '0 0 auto',
    fontSize: 12,
    color: 'var(--fx-text-muted)',
    fontVariantNumeric: 'tabular-nums',
    minWidth: 42,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
      }}
    >
      {showTimes && <span style={timeStyle}>{formatTime(currentTime)}</span>}
      <input
        type='range'
        min={0}
        max={duration || 0}
        value={Math.min(currentTime, duration || 0)}
        step={1}
        disabled={!duration}
        onChange={(e) => seek(Number(e.target.value))}
        aria-label='Seek within episode'
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        style={{
          flex: 1,
          minWidth: 0,
          height: 4,
          accentColor: 'var(--fx-accent)',
          cursor: duration ? 'pointer' : 'default',
        }}
      />
      {showTimes && (
        <span style={{ ...timeStyle, textAlign: 'right' }}>
          {formatTime(duration)}
        </span>
      )}
    </div>
  );
}
