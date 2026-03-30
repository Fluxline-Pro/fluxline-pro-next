'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { Hero } from '@/theme/components/hero/Hero';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { FormButton, FormDateInput, FormSelect } from '@/theme/components/form';
import { Modal } from '@/components/Modal';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { PodcastEpisode } from './types';
import { FadeIn } from '@/animations/fade-animations';
import { SortOrder } from '@/components/ContentListingPage';

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
  const { theme } = useAppTheme();
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
        borderRadius: theme.effects.roundedCorner6,
        overflow: 'hidden',
        border: `1px solid ${hovered ? theme.palette.themePrimary : theme.palette.neutralLight}`,
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? theme.effects.elevation16
          : theme.effects.elevation4,
        backgroundColor: theme.palette.neutralLighterAlt,
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
            backgroundColor: theme.palette.neutralLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FluentIcon
            iconName='Microphone'
            size='xLarge'
            color={
              hovered
                ? theme.palette.themePrimary
                : theme.palette.neutralSecondary
            }
          />
        </div>
      )}

      {/* Card body */}
      <div
        style={{
          padding: theme.spacing.m,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.s2,
        }}
      >
        {/* Podcast name badge */}
        <Typography
          variant='p'
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: theme.palette.themePrimary,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {episode.podcast_name}
          {episode.episode_number !== undefined &&
            ` · Ep. ${episode.episode_number}`}
        </Typography>

        {/* Title */}
        <Typography
          variant='h3'
          style={{
            color: hovered
              ? theme.palette.themePrimary
              : theme.palette.neutralPrimary,
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'color 0.2s ease',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {episode.episode_title}
        </Typography>

        {/* Description */}
        {episode.description && (
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {episode.description}
          </Typography>
        )}

        {/* Date */}
        {publishDate && (
          <Typography
            variant='p'
            style={{ color: theme.palette.neutralTertiary, fontSize: '0.8rem' }}
          >
            {publishDate}
            {episode.duration ? ` · ${episode.duration}` : ''}
          </Typography>
        )}
      </div>
    </div>
  );
}

/**
 * SpreakerEmbed Component
 * Renders the Spreaker embedded player for the "A+ in FLUX Mythmaker Series" show.
 * The Spreaker widget script (loaded via layout.tsx) replaces this anchor tag with
 * an interactive iframe player on the client. The anchor text provides a fallback
 * link if the widget script is unavailable or the show cannot be loaded.
 */
function SpreakerEmbed() {
  const { theme } = useAppTheme();

  return (
    <div style={{ marginBottom: theme.spacing.xl }}>
      <Typography
        variant='h3'
        style={{
          color: theme.palette.neutralPrimary,
          marginBottom: theme.spacing.m,
          fontSize: '1.25rem',
          fontWeight: 600,
        }}
      >
        A+ in FLUX Mythmaker Series
      </Typography>
      {/* Spreaker player anchor — replaced by widget.js with an embedded player iframe.
          If the script fails to load or the show is unavailable, the anchor remains as a
          plain hyperlink ("This podcast is currently unavailable" is surfaced by Spreaker
          within the player; the link here serves as a direct fallback). */}
      <div
        style={{
          borderRadius: theme.effects.roundedCorner6,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <a
          className='spreaker-player'
          href='https://www.spreaker.com/podcast/a-in-flux-mythmaker-series--6933506'
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
          Listen to &quot;A+ in FLUX Mythmaker Series&quot; on Spreaker.
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
  const { theme } = useAppTheme();
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
          gap: theme.spacing.m,
        }}
      >
        {/* Episode header */}
        <Typography
          variant='p'
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: theme.palette.themePrimary,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {episode.podcast_name}
          {episode.episode_number !== undefined &&
            ` · Episode ${episode.episode_number}`}
        </Typography>

        <Typography
          variant='h2'
          style={{
            color: theme.palette.themePrimary,
            fontSize: '1.5rem',
            fontWeight: 700,
          }}
        >
          {episode.episode_title}
        </Typography>

        {/* Meta */}
        <div
          style={{ display: 'flex', gap: theme.spacing.m, flexWrap: 'wrap' }}
        >
          {publishDate && (
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '0.875rem',
              }}
            >
              {publishDate}
            </Typography>
          )}
          {episode.duration && (
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '0.875rem',
              }}
            >
              · {episode.duration}
            </Typography>
          )}
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '0.875rem',
            }}
          >
            · By {episode.author_name}
          </Typography>
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
                borderRadius: theme.effects.roundedCorner4,
                accentColor: theme.palette.themePrimary,
              }}
            >
              <source src={episode.audio_url} type='audio/mpeg' />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Description */}
        {episode.description && (
          <Typography
            variant='p'
            style={{ color: theme.palette.neutralPrimary, lineHeight: 1.7 }}
          >
            {episode.description}
          </Typography>
        )}

        {/* RSS link */}
        <Typography
          variant='p'
          style={{ color: theme.palette.neutralSecondary, fontSize: '0.85rem' }}
        >
          <a
            href={rssEndpoint}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            RSS Feed
          </a>{' '}
          · Subscribe on Apple Podcasts, Spotify, or Spreaker
        </Typography>
      </div>
    </Modal>
  );
}

/**
 * PodcastListingClient Component
 * Main client component for the /podcasts page
 */
export function PodcastListingClient() {
  const { theme } = useAppTheme();
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
        const res = await fetch(getApiEndpoint('/api/podcasts/episodes'));
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

      {/* Date Range – desktop only (hidden on mobile and tablet) */}
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
          <FormButton
            variant='secondary'
            size='small'
            icon='ClearFilter'
            iconPosition='left'
            onClick={handleClearAll}
            aria-label='Clear all filters'
          >
            Clear Filters
          </FormButton>
        </div>
      )}
    </>
  );

  const gridColumns = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding: isMobile ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
        }}
      >
        {/* Page Header */}
        <Hero
          title='Podcasts'
          iconName='Microphone'
          description='"A+ In FLUX Mythmaker" — audio episodes covering transformation, strategy, and personal development.'
          backArrow={true}
          backArrowPath='/content'
          filters={podcastFilters}
        />

        {/* Spreaker Embedded Player */}
        <SpreakerEmbed />

        {/* Platform Subscription Buttons */}
        <div
          style={{
            marginTop: theme.spacing.m,
            marginBottom: theme.spacing.l1,
            display: 'flex',
            gap: theme.spacing.m,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href='https://www.spreaker.com/podcast/a-in-flux-mythmaker-series--6933506'
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none' }}
          >
            <FormButton
              variant='primary'
              size='small'
              icon='Microphone'
              iconPosition='left'
            >
              Listen on Spreaker
            </FormButton>
          </a>
          <FormButton
            variant='secondary'
            size='small'
            disabled
            title='Apple Podcasts link coming soon'
          >
            Apple Podcasts
          </FormButton>
          <FormButton
            variant='secondary'
            size='small'
            disabled
            title='Spotify link coming soon'
          >
            Spotify
          </FormButton>
          <a
            href={rssEndpoint}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none' }}
          >
            <FormButton
              variant='secondary'
              size='small'
              icon='RSSFeed'
              iconPosition='left'
            >
              RSS Feed
            </FormButton>
          </a>
        </div>

        {/* Loading state */}
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
            }}
          >
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralSecondary }}
            >
              Loading episodes…
            </Typography>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              flexDirection: 'column',
              gap: theme.spacing.m,
            }}
          >
            <FluentIcon
              iconName='ErrorBadge'
              size='xLarge'
              color={theme.palette.neutralSecondary}
            />
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralSecondary }}
            >
              {error}
            </Typography>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && processedEpisodes.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              flexDirection: 'column',
              gap: theme.spacing.m,
            }}
          >
            <FluentIcon
              iconName='Microphone'
              size='xLarge'
              color={theme.palette.neutralSecondary}
            />
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralSecondary }}
            >
              {episodes.length > 0
                ? 'No episodes match your filters.'
                : 'No episodes available yet.'}
            </Typography>
          </div>
        )}

        {/* Episode Grid */}
        {!loading && !error && processedEpisodes.length > 0 && (
          <>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                marginBottom: theme.spacing.l1,
              }}
            >
              Showing {processedEpisodes.length}{' '}
              {processedEpisodes.length === 1 ? 'episode' : 'episodes'}
              {(startDate || endDate) &&
                processedEpisodes.length !== episodes.length &&
                ` · ${processedEpisodes.length} matching date range`}
            </Typography>
            <AnimatePresence mode='wait'>
              <div
                key='podcast-episodes'
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                  gap: theme.spacing.l1,
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
          </>
        )}
      </div>

      {/* Episode Detail Modal */}
      {selectedEpisode && (
        <PodcastDetailModal
          episode={selectedEpisode}
          onDismiss={() => setSelectedEpisode(null)}
        />
      )}
    </UnifiedPageWrapper>
  );
}
