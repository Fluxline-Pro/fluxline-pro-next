'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxButton from '@/theme/components/dsm/FxButton';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { FormDateInput, FormSelect } from '@/theme/components/form';
import { Modal } from '@/components/Modal';
import { usePodcastPlayer } from '@/contexts/PodcastPlayerContext';
import {
  PlayPauseButton,
  PodcastScrubber,
} from '@/components/podcast/PodcastPlayerControls';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { PodcastEpisode, PODCAST_PLATFORMS } from './types';
import { FadeIn } from '@/animations/fade-animations';
import { SortOrder } from '@/components/ContentListingPage';
import SpreakerLogo from '@/assets/svgs/SpreakerLogo';
import SpotifyLogo from '@/assets/svgs/SpotifyLogo';
import ApplePodcastsLogo from '@/assets/svgs/ApplePodcastsLogo';
import IHeartRadioLogo from '@/assets/svgs/IHeartRadioLogo';
import AmazonMusicLogo from '@/assets/svgs/AmazonMusicLogo';
import DeezerLogo from '@/assets/svgs/DeezerLogo';
import PodchaserLogo from '@/assets/svgs/PodchaserLogo';
import RSSLogo from '@/assets/svgs/RSSLogo';
import TheResonantIdentityLogo from '@/assets/images/TheResonantIdentity_Logo.png';

const TRI_WEBSITE_URL = 'https://theresonantidentity.com';

/**
 * PodcastListingClient Props
 */
interface PodcastListingClientProps {}

interface PlatformIconLinkProps {
  href: string;
  label: string;
  Icon: React.ComponentType<{
    color?: string;
    style?: React.CSSProperties;
  }>;
  useBrandColors: boolean;
  brandColor?: string;
}

function PlatformIconLink({
  href,
  label,
  Icon,
  useBrandColors,
  brandColor,
}: PlatformIconLinkProps) {
  const [hovered, setHovered] = React.useState(false);

  const hasBrandColor = Boolean(brandColor) && useBrandColors;
  const iconColor = hasBrandColor
    ? '#FFFFFF'
    : brandColor || 'var(--fx-accent)';

  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: hasBrandColor ? brandColor : 'var(--fx-surface-card)',
        transition: 'all 0.2s ease',
        border: hasBrandColor ? 'none' : '2px solid var(--fx-border)',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <Icon color={iconColor} style={{ width: '28px', height: '28px' }} />
    </Link>
  );
}

/**
 * PodcastCard Component
 * Displays a podcast episode as a large-tile card
 */
function PodcastCard({
  episode,
  onClick,
}: {
  episode: PodcastEpisode;
  onClick: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  const publishDate = episode.publish_date
    ? new Date(episode.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : undefined;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        borderRadius: 6,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.12)'
          : '0 2px 6px rgba(0,0,0,0.06)',
        backgroundColor: 'var(--fx-surface-card)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '220px',
      }}
    >
      {/* Thumbnail or placeholder */}
      {episode.imageUrl ? (
        <div style={{ height: '180px', overflow: 'hidden' }}>
          <img
            src={episode.imageUrl}
            alt={episode.episode_title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div
          style={{
            height: '120px',
            backgroundColor: 'var(--fx-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: hovered ? 'var(--fx-accent)' : 'var(--fx-text-body)',
            }}
            aria-hidden='true'
          >
            &#x1F3A4;
          </span>
        </div>
      )}

      {/* Card body */}
      <div
        style={{
          padding: 12,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {/* Podcast name badge */}
        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'var(--fx-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            margin: 0,
          }}
        >
          {episode.podcast_name}
          {episode.episode_number !== undefined &&
            ` · Ep. ${episode.episode_number}`}
        </p>

        {/* Title */}
        <h3
          style={{
            color: hovered ? 'var(--fx-accent)' : 'var(--fx-text-heading)',
            fontSize: '1.25rem',
            fontWeight: 600,
            transition: 'color 0.2s ease',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 12,
            marginTop: 0,
          }}
        >
          {decodeHtmlEntities(episode.episode_title)}
        </h3>

        {/* Description */}
        {episode.description && (
          <p
            style={{
              color: 'var(--fx-text-body)',
              fontSize: '0.875rem',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              margin: 0,
            }}
          >
            {decodeHtmlEntities(episode.description)}
          </p>
        )}

        {/* Date */}
        {publishDate && (
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: '0.8rem',
              margin: 0,
            }}
          >
            {publishDate}
            {episode.duration ? ` · ${episode.duration}` : ''}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * SpreakerEmbed Component
 * Renders the Spreaker embedded player for the "The Resonant Identity" show.
 */
function SpreakerEmbed() {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3
        style={{
          color: 'var(--fx-text-heading)',
          marginTop: 12,
          marginBottom: 12,
          fontSize: '1.25rem',
          fontWeight: 600,
        }}
      >
        The Resonant Identity
      </h3>
      <div
        style={{
          borderRadius: 6,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <a
          className='spreaker-player'
          href={PODCAST_PLATFORMS.spreaker}
          data-resource='show_id=6933506'
          data-width='100%'
          data-height='350px'
          data-theme='dark'
          data-playlist='show'
          data-playlist-continuous='true'
          data-hide-logo='false'
          data-hide-likes='false'
          data-hide-comments='false'
          data-hide-sharing='false'
          data-hide-download='true'
        >
          Listen to &quot;The Resonant Identity&quot; on Spreaker.
        </a>
      </div>
    </div>
  );
}

/**
 * PodcastDetailModal Component
 * Shows full episode detail with audio player
 */
/**
 * Decode HTML entities (e.g. &amp; -> &, &#39; -> ') in RSS-provided text.
 * Runs client-side; returns the input unchanged during SSR.
 */
function decodeHtmlEntities(input: string): string {
  if (typeof document === 'undefined') return input;
  const el = document.createElement('textarea');
  el.innerHTML = input;
  return el.value;
}

function PodcastDetailModal({
  episode,
  onDismiss,
}: {
  episode: PodcastEpisode;
  onDismiss: () => void;
}) {
  const rssEndpoint = getApiEndpoint('/api/podcasts/rss');
  const { load, setModalOpen } = usePodcastPlayer();

  // Hand the episode to the shared player and suppress the mini-player while
  // this modal is showing the same controls. On unmount the mini-player takes
  // over, mid-episode, without a reload.
  React.useEffect(() => {
    load(episode);
    setModalOpen(true);
    return () => setModalOpen(false);
  }, [episode, load, setModalOpen]);

  const publishDate = episode.publish_date
    ? new Date(episode.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : undefined;

  return (
    <Modal
      isOpen={true}
      onDismiss={onDismiss}
      ariaLabel={decodeHtmlEntities(episode.episode_title)}
      maxWidth='700px'
      maxHeight='90vh'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Episode header */}
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--fx-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            margin: 0,
          }}
        >
          {episode.podcast_name}
          {episode.episode_number !== undefined &&
            ` · Episode ${episode.episode_number}`}
        </p>

        <h2
          style={{
            color: 'var(--fx-accent)',
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: 0,
          }}
        >
          {decodeHtmlEntities(episode.episode_title)}
        </h2>

        {/* Meta */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {publishDate && (
            <p
              style={{
                color: 'var(--fx-text-body)',
                fontSize: '0.875rem',
                margin: 0,
              }}
            >
              {publishDate}
            </p>
          )}
          {episode.duration && (
            <p
              style={{
                color: 'var(--fx-text-body)',
                fontSize: '0.875rem',
                margin: 0,
              }}
            >
              · {episode.duration}
            </p>
          )}
          <p
            style={{
              color: 'var(--fx-text-body)',
              fontSize: '0.875rem',
              margin: 0,
            }}
          >
            · By {episode.author_name}
          </p>
        </div>

        {/* Audio player — drives the shared <audio> element so playback carries
            over to the mini-player when this modal closes. */}
        {episode.audio_url && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 14px',
              background: 'var(--fx-surface-alt)',
              border: '1px solid var(--fx-border)',
              borderRadius: 'var(--fx-radius-card)',
            }}
          >
            <PlayPauseButton size={48} />
            <PodcastScrubber />
          </div>
        )}

        {/* Description — RSS text is unformatted, so clamp to 5 lines */}
        {episode.description && (
          <p
            style={{
              color: 'var(--fx-text-heading)',
              lineHeight: 'var(--fx-body-leading)',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {decodeHtmlEntities(episode.description)}
          </p>
        )}

        {/* Subscribe links */}
        <p
          style={{
            color: 'var(--fx-text-body)',
            fontSize: '0.85rem',
            margin: 0,
          }}
        >
          Subscribe:{' '}
          <a
            href={PODCAST_PLATFORMS.spreaker}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            Spreaker
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.spotify}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            Spotify
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.applePodcasts}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            Apple Podcasts
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.iHeartRadio}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            iHeartRadio
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.amazonMusic}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            Amazon Music
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.deezer}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            Deezer
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.podchaser}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            Podchaser
          </a>
          {' · '}
          <a
            href={rssEndpoint}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'var(--fx-accent)' }}
          >
            RSS Feed
          </a>
        </p>
      </div>
    </Modal>
  );
}

/**
 * PodcastListingClient Component
 * Main client component for the /podcasts page.
 * Owns the full page: hero (with platform links + newest-episode CTA),
 * the combined "About The Resonant Identity" section, "Listen Everywhere",
 * the episode grid, and the TRI newsletter sign-up.
 */
export function PodcastListingClient(_props: PodcastListingClientProps = {}) {
  const router = useRouter();
  const rssEndpoint = getApiEndpoint('/api/podcasts/rss');
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isTabletHook = useIsTablet();
  const isMobile = isMounted ? isMobileHook : false;
  const isTablet = isMounted ? isTabletHook : false;
  const [episodes, setEpisodes] = React.useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedEpisode, setSelectedEpisode] =
    React.useState<PodcastEpisode | null>(null);

  // Sort and date range state
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('newest');
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(getApiEndpoint('/api/podcasts/rss-proxy'));
        if (!res.ok) throw new Error('Failed to fetch episodes');
        const data = await res.json();
        if (!cancelled) {
          setEpisodes(data.episodes || []);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load episodes at this time.');
          setEpisodes([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Apply sort and date range to episodes
  const processedEpisodes = React.useMemo(() => {
    let result = [...episodes];

    // Date range filter
    if (startDate) {
      const start = new Date(startDate);
      result = result.filter((ep) => {
        if (!ep.publish_date) return true;
        return new Date(ep.publish_date) >= start;
      });
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter((ep) => {
        if (!ep.publish_date) return true;
        return new Date(ep.publish_date) <= end;
      });
    }

    // Sort
    switch (sortOrder) {
      case 'newest':
        return result.sort((a, b) => {
          const da = a.publish_date ? new Date(a.publish_date).getTime() : 0;
          const db = b.publish_date ? new Date(b.publish_date).getTime() : 0;
          return db - da;
        });
      case 'oldest':
        return result.sort((a, b) => {
          const da = a.publish_date ? new Date(a.publish_date).getTime() : 0;
          const db = b.publish_date ? new Date(b.publish_date).getTime() : 0;
          return da - db;
        });
      case 'a-z':
        return result.sort((a, b) =>
          a.episode_title.localeCompare(b.episode_title)
        );
      case 'z-a':
        return result.sort((a, b) =>
          b.episode_title.localeCompare(a.episode_title)
        );
      default:
        return result;
    }
  }, [episodes, sortOrder, startDate, endDate]);

  const sortOptions = [
    { key: 'newest', text: 'Newest First' },
    { key: 'oldest', text: 'Oldest First' },
    { key: 'a-z', text: 'A – Z' },
    { key: 'z-a', text: 'Z – A' },
  ];

  const hasActiveFilters =
    sortOrder !== 'newest' || startDate !== '' || endDate !== '';

  const handleClearAll = () => {
    setSortOrder('newest');
    setStartDate('');
    setEndDate('');
  };

  // Brand colors: always use brand colors in DSM (no accessible mode distinction needed)
  const useBrandColors = true;

  const podcastFilters = (
    <>
      {/* Sort Order */}
      <div style={{ minWidth: '160px', flex: '1 1 160px' }}>
        <FormSelect
          label='Sort By'
          options={sortOptions}
          value={sortOrder}
          onChange={(value) => setSortOrder(value as SortOrder)}
        />
      </div>

      {/* Date Range -- desktop only */}
      {!(isMobile || isTablet) && (
        <>
          <div style={{ minWidth: '150px', flex: '1 1 150px' }}>
            <FormDateInput
              label='Date From'
              value={startDate}
              max={endDate || undefined}
              onChange={setStartDate}
              aria-label='Filter from date'
            />
          </div>
          <div style={{ minWidth: '150px', flex: '1 1 150px' }}>
            <FormDateInput
              label='Date To'
              value={endDate}
              min={startDate || undefined}
              onChange={setEndDate}
              aria-label='Filter to date'
            />
          </div>
        </>
      )}

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <div
          style={{ display: 'flex', alignItems: 'flex-end', flex: '0 0 auto' }}
        >
          <FxButton variant='outline' size='sm' onClick={handleClearAll}>
            Clear Filters
          </FxButton>
        </div>
      )}
    </>
  );

  const gridColumns = isMobile ? 1 : isTablet ? 2 : 3;
  const dateRangeResultsSuffix =
    (startDate || endDate) && processedEpisodes.length !== episodes.length
      ? ` ${processedEpisodes.length} matching date range`
      : '';

  const hasEpisodes = !loading && !error && processedEpisodes.length > 0;
  const newestEpisode = hasEpisodes ? processedEpisodes[0] : undefined;
  const heroStacked = isMobile;

  // Shared style for the solid accent CTA anchors (external links)
  const accentAnchorStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
    borderRadius: 'var(--fx-radius-control)',
    fontFamily: 'var(--fx-font)',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: 15.5,
    padding: '14px 30px',
    background: 'var(--fx-accent)',
    color: 'var(--fx-accent-ink)',
    border: 'none',
    transition:
      'filter var(--fx-color-duration), background var(--fx-color-duration), color var(--fx-color-duration), border-color var(--fx-color-duration)',
  };

  const heroCardStyle: React.CSSProperties = {
    background: 'rgba(5,7,11,.72)',
    border: '1px solid var(--fx-border)',
    borderRadius: 16,
    padding: '44px 46px',
    backdropFilter: 'blur(4px)',
  };

  const eyebrowStyle: React.CSSProperties = {
    fontSize: 'var(--fx-eyebrow-size)',
    letterSpacing: 'var(--fx-eyebrow-tracking)',
    textTransform: 'uppercase',
    color: 'var(--fx-text-soft)',
    marginBottom: 14,
  };

  const newestEpisodeDate = newestEpisode?.publish_date
    ? new Date(newestEpisode.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : undefined;

  const platformLinks = (
    <div
      style={{
        marginTop: 24,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <PlatformIconLink
        href={PODCAST_PLATFORMS.spreaker}
        label='Listen on Spreaker'
        Icon={SpreakerLogo}
        brandColor='#EE722E'
        useBrandColors={useBrandColors}
      />
      <PlatformIconLink
        href={PODCAST_PLATFORMS.spotify}
        label='Listen on Spotify'
        Icon={SpotifyLogo}
        brandColor='#1DB954'
        useBrandColors={useBrandColors}
      />
      <PlatformIconLink
        href={PODCAST_PLATFORMS.applePodcasts}
        label='Listen on Apple Podcasts'
        Icon={ApplePodcastsLogo}
        brandColor='#B150E2'
        useBrandColors={useBrandColors}
      />
      <PlatformIconLink
        href={PODCAST_PLATFORMS.iHeartRadio}
        label='Listen on iHeartRadio'
        Icon={IHeartRadioLogo}
        brandColor='#C6002B'
        useBrandColors={useBrandColors}
      />
      <PlatformIconLink
        href={PODCAST_PLATFORMS.amazonMusic}
        label='Listen on Amazon Music'
        Icon={AmazonMusicLogo}
        brandColor='#00A8E1'
        useBrandColors={useBrandColors}
      />
      <PlatformIconLink
        href={PODCAST_PLATFORMS.deezer}
        label='Listen on Deezer'
        Icon={DeezerLogo}
        brandColor='#A238FF'
        useBrandColors={useBrandColors}
      />
      <PlatformIconLink
        href={PODCAST_PLATFORMS.podchaser}
        label='Listen on Podchaser'
        Icon={PodchaserLogo}
        brandColor='#2EBFA5'
        useBrandColors={useBrandColors}
      />
      <PlatformIconLink
        href={rssEndpoint}
        label='Subscribe via RSS Feed'
        Icon={RSSLogo}
        useBrandColors={useBrandColors}
      />
    </div>
  );

  // Named platform cards for the "Listen Everywhere" section
  const listenEverywhereCards: Array<{
    name: string;
    action: string;
    href: string;
    brandColor: string;
    Icon: React.ComponentType<{ color?: string; style?: React.CSSProperties }>;
  }> = [
    {
      name: 'Spotify',
      action: 'Listen on Spotify →',
      href: PODCAST_PLATFORMS.spotify,
      brandColor: '#1DB954',
      Icon: SpotifyLogo,
    },
    {
      name: 'Apple Podcasts',
      action: 'Listen on Apple Podcasts →',
      href: PODCAST_PLATFORMS.applePodcasts,
      brandColor: '#B150E2',
      Icon: ApplePodcastsLogo,
    },
    {
      name: 'Spreaker',
      action: 'Listen on Spreaker →',
      href: PODCAST_PLATFORMS.spreaker,
      brandColor: '#EE722E',
      Icon: SpreakerLogo,
    },
    {
      name: 'iHeartRadio',
      action: 'Listen on iHeartRadio →',
      href: PODCAST_PLATFORMS.iHeartRadio,
      brandColor: '#C6002B',
      Icon: IHeartRadioLogo,
    },
    {
      name: 'Amazon Music',
      action: 'Listen on Amazon Music →',
      href: PODCAST_PLATFORMS.amazonMusic,
      brandColor: '#00A8E1',
      Icon: AmazonMusicLogo,
    },
    {
      name: 'RSS Feed',
      action: 'Subscribe via RSS →',
      href: rssEndpoint,
      brandColor: '#EE802F',
      Icon: RSSLogo,
    },
  ];

  return (
    <>
      {/* ===== Hero ===== */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'url("/images/TheResonantIdentityAudiogram.png") center/cover no-repeat',
          borderBottom: '1px solid var(--fx-border-subtle)',
          padding: '120px 32px 80px',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg,rgba(5,7,11,.6),rgba(14,21,35,.25))',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: 1220,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: heroStacked ? '1fr' : '1.5fr 1fr',
              gap: 20,
              alignItems: 'stretch',
            }}
          >
            {/* Left: primary hero card */}
            <div style={heroCardStyle}>
              <div style={eyebrowStyle}>The Resonant Identity</div>
              <h1
                style={{
                  fontSize: 'var(--fx-display-size)',
                  fontWeight: 800,
                  letterSpacing: 'var(--fx-display-tracking)',
                  color: 'var(--fx-text-heading-display)',
                  margin: '0 0 22px',
                  lineHeight: 1,
                }}
              >
                PODCAST
              </h1>
              <div
                style={{
                  height: 2,
                  background:
                    'linear-gradient(90deg,var(--fx-line),var(--fx-accent),transparent)',
                  marginBottom: 26,
                }}
              />
              <div
                style={{ fontSize: 17.5, lineHeight: 1.65, margin: '0 0 28px' }}
              >
                Identity architecture, self-improvement, and practical
                frameworks for navigating transitions with clarity and
                intention.
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a
                  href={TRI_WEBSITE_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={accentAnchorStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'none';
                  }}
                >
                  Visit TheResonantIdentity.com →
                </a>
              </div>
              {/* Colored platform buttons (moved into the hero) */}
              {platformLinks}
            </div>

            {/* Right: newest-episode card */}
            <div
              style={{
                ...heroCardStyle,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 14,
              }}
            >
              {/* Blurred TRI avatar backdrop */}
              <img
                src={TheResonantIdentityLogo.src}
                alt=''
                aria-hidden='true'
                style={{
                  position: 'absolute',
                  right: '-14%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '80%',
                  maxWidth: 360,
                  aspectRatio: '1 / 1',
                  objectFit: 'contain',
                  filter: 'blur(16px)',
                  opacity: 0.3,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div style={{ ...eyebrowStyle, marginBottom: 0 }}>
                  Newest Episode
                </div>
              {newestEpisode ? (
                <>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'var(--fx-text-heading-display)',
                      lineHeight: 1.3,
                    }}
                  >
                    {newestEpisode.episode_title}
                  </div>
                  {newestEpisodeDate && (
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--fx-text-muted)',
                      }}
                    >
                      {newestEpisodeDate}
                      {newestEpisode.duration
                        ? ` · ${newestEpisode.duration}`
                        : ''}
                    </div>
                  )}
                  <FxButton
                    size='lg'
                    onClick={() => setSelectedEpisode(newestEpisode)}
                    style={{ alignSelf: 'flex-start', marginTop: 8 }}
                  >
                    Listen to the Newest Episode
                  </FxButton>
                </>
              ) : (
                <>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--fx-text-heading-display)',
                      lineHeight: 1.35,
                    }}
                  >
                    Catch the latest episode of The Resonant Identity.
                  </div>
                  <a
                    href={PODCAST_PLATFORMS.spreaker}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                      ...accentAnchorStyle,
                      alignSelf: 'flex-start',
                      marginTop: 8,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'brightness(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'none';
                    }}
                  >
                    Listen to the Newest Episode →
                  </a>
                </>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Main content ===== */}
      <FxContainer style={{ padding: '72px 32px 88px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {/* Combined: About / Explore The Resonant Identity */}
          <section>
            <div style={eyebrowStyle}>The Resonant Identity</div>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 12px',
                letterSpacing: '-.01em',
              }}
            >
              About The Resonant Identity
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: 'var(--fx-text-heading)',
                margin: '0 0 18px',
                maxWidth: '72ch',
              }}
            >
              A living extension of The Resonance Core Framework where identity
              becomes practice and is formed through coherence.
            </p>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--fx-text-body)',
                margin: '0 0 24px',
                maxWidth: '72ch',
              }}
            >
              The Resonant Identity is a podcast blending identity architecture,
              self-improvement, and practical frameworks for navigating
              transitions with clarity and intention. It has evolved into a
              dedicated platform with expanded content, community, and
              resources — visit the main website to explore the full ecosystem,
              philosophy, and mission behind TRI.
            </p>
            <a
              href={TRI_WEBSITE_URL}
              target='_blank'
              rel='noopener noreferrer'
              style={accentAnchorStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'none';
              }}
            >
              Go to TheResonantIdentity.com →
            </a>
          </section>

          {/* Episodes section — dark gradient panel to set it apart */}
          <section
            style={{
              background:
                'linear-gradient(160deg, var(--fx-surface-alt), var(--fx-bg-deep))',
              border: '1px solid var(--fx-border-subtle)',
              borderRadius: 16,
              padding: '20px 32px 40px',
            }}
          >
          {/* Loading state */}
          {loading && (
            <div
              style={{
                paddingTop: 32,
                paddingBottom: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
              }}
            >
              <p style={{ color: 'var(--fx-text-body)' }}>Loading episodes...</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div
              style={{
                paddingTop: 32,
                paddingBottom: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <p style={{ color: 'var(--fx-text-body)' }}>{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && processedEpisodes.length === 0 && (
            <div
              style={{
                paddingTop: 32,
                paddingBottom: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <p style={{ color: 'var(--fx-text-body)' }}>
                {episodes.length > 0
                  ? 'No episodes match your filters.'
                  : 'No episodes available yet.'}
              </p>
            </div>
          )}

          {/* All Episodes grid */}
          {hasEpisodes && (
            <div
              style={{
                paddingTop: 8,
                paddingBottom: 8,
              }}
            >
              <FxSectionHeading
                title={`All Episodes: Showing ${processedEpisodes.length}${dateRangeResultsSuffix}`}
                style={{ marginBottom: 20 }}
              />
              <AnimatePresence mode='wait'>
                <div
                  key='podcast-episodes'
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                    gap: 20,
                  }}
                >
                  {processedEpisodes.map((episode, index) => (
                    <FadeIn key={episode.id} delay={index * 0.05} duration={0.3}>
                      <PodcastCard
                        episode={episode}
                        onClick={() => setSelectedEpisode(episode)}
                      />
                    </FadeIn>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          )}
          </section>

          {/* Listen Everywhere */}
          <section>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 20px',
                letterSpacing: '-.01em',
              }}
            >
              Listen Everywhere
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--fx-text-body)',
                margin: '0 0 24px',
                maxWidth: '72ch',
              }}
            >
              The Resonant Identity is available on all major podcast platforms.
              Subscribe to get new episodes delivered automatically.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 16,
              }}
            >
              {listenEverywhereCards.map((card) => (
                <a
                  key={card.name}
                  href={card.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    background: `linear-gradient(160deg, ${card.brandColor}26, ${card.brandColor}0d)`,
                    border: `1px solid ${card.brandColor}`,
                    borderRadius: 'var(--fx-radius-card)',
                    padding: '20px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    transition:
                      'background var(--fx-color-duration), border-color var(--fx-color-duration), transform var(--fx-color-duration), box-shadow var(--fx-color-duration)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(160deg, ${card.brandColor}4d, ${card.brandColor}1a)`;
                    e.currentTarget.style.transform = 'var(--fx-hover-lift)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${card.brandColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(160deg, ${card.brandColor}26, ${card.brandColor}0d)`;
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: card.brandColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 14,
                    }}
                  >
                    <card.Icon
                      color='#FFFFFF'
                      style={{ width: 26, height: 26 }}
                    />
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: 'var(--fx-text-heading)',
                      marginBottom: 8,
                    }}
                  >
                    {card.name}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: 'var(--fx-text-muted)',
                    }}
                  >
                    {card.action}
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* TRI Newsletter sign-up CTA */}
          <section
            style={{
              background: 'var(--fx-gradient-feature)',
              border: '1px solid var(--fx-border-strong)',
              borderRadius: 16,
              padding: '32px 36px',
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'var(--fx-text-bright)',
                  marginBottom: 8,
                }}
              >
                The Resonant Identity Newsletter
              </div>
              <div
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  maxWidth: '60ch',
                }}
              >
                New episodes and insights on identity architecture and the
                Resonance Core Framework™, delivered to your inbox. No spam,
                ever.
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flex: '1 1 320px',
                minWidth: 260,
              }}
            >
              <input
                type='email'
                placeholder='your@email.com'
                aria-label='Email address for The Resonant Identity newsletter'
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'var(--fx-surface-input)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 8,
                  padding: '12px 14px',
                  fontSize: 14,
                  color: 'var(--fx-text-bright)',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type='button'
                style={{
                  background: 'var(--fx-accent)',
                  color: 'var(--fx-accent-ink)',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '12px 22px',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                }}
              >
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </FxContainer>

      {/* Episode Detail Modal */}
      {selectedEpisode && (
        <PodcastDetailModal
          episode={selectedEpisode}
          onDismiss={() => setSelectedEpisode(null)}
        />
      )}
    </>
  );
}
