'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxButton from '@/theme/components/dsm/FxButton';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { FormDateInput, FormSelect } from '@/theme/components/form';
import { Modal } from '@/components/Modal';
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
          {episode.episode_title}
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
            {episode.description}
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
function PodcastDetailModal({
  episode,
  onDismiss,
}: {
  episode: PodcastEpisode;
  onDismiss: () => void;
}) {
  const rssEndpoint = getApiEndpoint('/api/podcasts/rss');

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
      ariaLabel={episode.episode_title}
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
          {episode.episode_title}
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

        {/* Audio player */}
        {episode.audio_url && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <audio
              controls
              style={{
                width: '100%',
                borderRadius: 4,
                accentColor: 'var(--fx-accent)',
              }}
            >
              <source src={episode.audio_url} type='audio/mpeg' />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Description */}
        {episode.description && (
          <p
            style={{
              color: 'var(--fx-text-heading)',
              lineHeight: 'var(--fx-body-leading)',
              margin: 0,
            }}
          >
            {episode.description}
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
 * Main client component for the /podcasts page
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

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* Page Header */}
      <FxSectionHeading
        kicker='Podcast'
        title='The Resonant Identity'
        subhead='A living extension of The Resonance Core Framework where identity becomes practice and is formed through coherence.'
        lede='The Resonant Identity is a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.'
        as='h1'
      />

      {/* Platform Icons */}
      <div
        style={{
          marginTop: 20,
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

      {/* Featured Episode CTA */}
      {!loading && !error && processedEpisodes.length > 0 && (
        <div style={{ paddingTop: 32 }}>
          <FxCallout tone='gold' title='Listen to the Most Recent Episode'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span>
                {processedEpisodes[0]?.episode_title || 'Start listening now'}
              </span>
              <FxButton
                variant='outline'
                size='lg'
                onClick={() => setSelectedEpisode(processedEpisodes[0])}
              >
                Listen Now
              </FxButton>
            </div>
          </FxCallout>
        </div>
      )}

      {/* Callout to learn more about The Resonant Identity */}
      <div style={{ paddingTop: 64, paddingBottom: 16 }}>
        <FxCTABand
          title='About The Resonant Identity Podcast'
          body='Learn more about the philosophy, community, and mission behind The Resonant Identity (TRI).'
          primaryLabel='About The Resonant Identity'
          primaryHref='/podcasts'
        />
      </div>

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

      {/* Episode Grid */}
      {!loading && !error && processedEpisodes.length > 0 && (
        <div
          style={{
            paddingBottom: 32,
            marginTop: 32,
            borderTop: '1px solid var(--fx-text-heading)',
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

      {/* Spreaker Embedded Player */}
      {/* <SpreakerEmbed /> */}

      {/* Episode Detail Modal */}
      {selectedEpisode && (
        <PodcastDetailModal
          episode={selectedEpisode}
          onDismiss={() => setSelectedEpisode(null)}
        />
      )}
    </FxContainer>
  );
}
