'use client';

/**
 * PodcastMiniPlayer
 * Persistent bottom bar that keeps the current episode playing while the user
 * browses the rest of the site. Mounted once at the root, above the
 * pathname-keyed page transition, so navigation never unmounts it.
 *
 * Appears once an episode has started playing and the detail modal has closed.
 *
 * Styled with DSM CSS custom properties (var(--fx-*) tokens).
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePodcastPlayer } from '@/contexts/PodcastPlayerContext';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import {
  PlayPauseButton,
  PodcastScrubber,
} from './PodcastPlayerControls';

/** Sits above FxNav (1000) but below the consent banner (1099) and modals (9999). */
const MINI_PLAYER_Z_INDEX = 1090;

/** Decode HTML entities (e.g. &amp; -> &) in RSS-provided text. */
function decodeHtmlEntities(input: string): string {
  if (typeof document === 'undefined') return input;
  const el = document.createElement('textarea');
  el.innerHTML = input;
  return el.value;
}

export function PodcastMiniPlayer() {
  const { episode, hasStarted, isModalOpen, close } = usePodcastPlayer();
  const { shouldReduceMotion } = useReducedMotion();
  const isMobile = useIsMobile();
  const [closeHovered, setCloseHovered] = React.useState(false);

  const visible = Boolean(episode) && hasStarted && !isModalOpen;

  // Keep the fixed bar from covering the end of the page (footer links, etc.).
  React.useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.paddingBottom;
    document.body.style.paddingBottom = isMobile ? '132px' : '88px';
    return () => {
      document.body.style.paddingBottom = previous;
    };
  }, [visible, isMobile]);

  const title = episode ? decodeHtmlEntities(episode.episode_title) : '';

  return (
    <AnimatePresence>
      {visible && episode && (
        <motion.div
          // AnimatePresence tracks presence by key; without one the exit
          // animation never runs and the bar is left in the DOM after closing.
          key='podcast-mini-player'
          role='region'
          aria-label='Podcast mini player'
          initial={{ y: shouldReduceMotion ? 0 : '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: shouldReduceMotion ? 0 : '100%', opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.28,
            ease: [0.4, 0.0, 0.2, 1.0],
          }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: MINI_PLAYER_Z_INDEX,
            background: 'var(--fx-bg-deep)',
            borderTop: '1px solid var(--fx-border)',
            boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
            paddingTop: 10,
            paddingLeft: 'max(12px, env(safe-area-inset-left))',
            paddingRight: 'max(12px, env(safe-area-inset-right))',
            paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
          }}
        >
          <div
            style={{
              maxWidth: 1220,
              margin: '0 auto',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? 6 : 16,
            }}
          >
            {/* Artwork + episode identity + (mobile) transport */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                minWidth: 0,
                flex: isMobile ? '0 0 auto' : '1 1 auto',
              }}
            >
              {episode.imageUrl && (
                <img
                  src={episode.imageUrl}
                  alt=''
                  aria-hidden='true'
                  style={{
                    flex: '0 0 auto',
                    width: 44,
                    height: 44,
                    borderRadius: 6,
                    objectFit: 'cover',
                  }}
                />
              )}

              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'var(--fx-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {episode.podcast_name}
                  {episode.episode_number !== undefined &&
                    ` · Ep. ${episode.episode_number}`}
                </div>
                <div
                  title={title}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--fx-text-heading)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </div>
              </div>

              {isMobile && (
                <>
                  <PlayPauseButton size={40} />
                  <CloseButton
                    onClose={close}
                    hovered={closeHovered}
                    setHovered={setCloseHovered}
                  />
                </>
              )}
            </div>

            {/* Scrubber — full width beneath the identity row on mobile */}
            <div
              style={{
                flex: isMobile ? '0 0 auto' : '1 1 46%',
                minWidth: 0,
              }}
            >
              <PodcastScrubber />
            </div>

            {!isMobile && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flex: '0 0 auto',
                }}
              >
                <PlayPauseButton size={44} />
                <CloseButton
                  onClose={close}
                  hovered={closeHovered}
                  setHovered={setCloseHovered}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CloseButton({
  onClose,
  hovered,
  setHovered,
}: {
  onClose: () => void;
  hovered: boolean;
  setHovered: (value: boolean) => void;
}) {
  return (
    <button
      type='button'
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label='Stop playback and close the mini player'
      style={{
        flex: '0 0 auto',
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid var(--fx-border)',
        background: hovered ? 'var(--fx-surface-card)' : 'transparent',
        color: 'var(--fx-text-bright)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 700,
        lineHeight: 1,
        padding: 0,
        transition: 'background var(--fx-color-duration)',
      }}
    >
      {'✕'}
    </button>
  );
}

export default PodcastMiniPlayer;
