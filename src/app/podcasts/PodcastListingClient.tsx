'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import {
  UnifiedPageWrapper,
  UnifiedPageWrapperProps,
} from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { Hero } from '@/theme/components/hero/Hero';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { FormButton, FormDateInput, FormSelect } from '@/theme/components/form';
import { Modal } from '@/components/Modal';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { PodcastEpisode, PODCAST_PLATFORMS, TRIPost } from './types';
import { FadeIn } from '@/animations/fade-animations';
import { SortOrder } from '@/components/ContentListingPage';
import { Callout } from '@/theme/components/callout/Callout';
import SpreakerLogo from '@/assets/svgs/SpreakerLogo';
import SpotifyLogo from '@/assets/svgs/SpotifyLogo';
import ApplePodcastsLogo from '@/assets/svgs/ApplePodcastsLogo';
import IHeartRadioLogo from '@/assets/svgs/IHeartRadioLogo';
import AmazonMusicLogo from '@/assets/svgs/AmazonMusicLogo';
import DeezerLogo from '@/assets/svgs/DeezerLogo';
import PodchaserLogo from '@/assets/svgs/PodchaserLogo';
import RSSLogo from '@/assets/svgs/RSSLogo';
import { normalizeTag } from './theresonantid/lib/taxonomy';
import { SectionHeader } from './theresonantid/TRI/SectionHeader';

/**
 * PodcastListingClient Props
 */
interface PodcastListingClientProps {
  imageConfig?: UnifiedPageWrapperProps['imageConfig'];
  /**
   * Blog posts with category "Resonant Identity" — loaded server-side and
   * serialised so they can be passed safely to this client component.
   */
  triPosts?: TRIPost[];
}

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
  const { theme } = useAppTheme();
  const [hovered, setHovered] = React.useState(false);

  const hasBrandColor = Boolean(brandColor) && useBrandColors;
  const iconColor = hasBrandColor
    ? '#FFFFFF'
    : brandColor || theme.palette.themePrimary;

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
        backgroundColor: hasBrandColor
          ? brandColor
          : theme.palette.neutralLighter,
        transition: 'all 0.2s ease',
        border: hasBrandColor
          ? 'none'
          : `2px solid ${theme.palette.neutralLight}`,
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        boxShadow: hovered ? theme.effects.elevation8 : 'none',
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
            fontSize: '1.25rem',
            fontWeight: 600,
            transition: 'color 0.2s ease',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: theme.spacing.m,
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
 * Renders the Spreaker embedded player for the "The Resonant Identity" show.
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
          marginTop: theme.spacing.m,
          marginBottom: theme.spacing.m,
          fontSize: '1.25rem',
          fontWeight: 600,
        }}
      >
        The Resonant Identity
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

        {/* Subscribe links */}
        <Typography
          variant='p'
          style={{ color: theme.palette.neutralSecondary, fontSize: '0.85rem' }}
        >
          Subscribe:{' '}
          <a
            href={PODCAST_PLATFORMS.spreaker}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            Spreaker
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.spotify}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            Spotify
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.applePodcasts}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            Apple Podcasts
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.iHeartRadio}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            iHeartRadio
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.amazonMusic}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            Amazon Music
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.deezer}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            Deezer
          </a>
          {' · '}
          <a
            href={PODCAST_PLATFORMS.podchaser}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            Podchaser
          </a>
          {' · '}
          <a
            href={rssEndpoint}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            RSS Feed
          </a>
        </Typography>
      </div>
    </Modal>
  );
}

/**
 * PodcastListingClient Component
 * Main client component for the /podcasts page
 */
export function PodcastListingClient({
  imageConfig,
  triPosts = [],
}: PodcastListingClientProps = {}) {
  const router = useRouter();
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

  // Derive TRI content sections from the pre-loaded Resonant Identity posts
  // Uses taxonomy mapping to detect content types
  const triCompanionArticles = triPosts.filter((p) =>
    p.tags.some(
      (tag) => normalizeTag(tag) === normalizeTag('Episode Companion')
    )
  );
  const triChallenges = triPosts.filter((p) =>
    p.tags.some(
      (tag) => normalizeTag(tag) === normalizeTag('Identity Challenge')
    )
  );
  const triDemos = triPosts.filter((p) =>
    p.tags.some((tag) => normalizeTag(tag) === normalizeTag('Interactive Demo'))
  );

  // For this initial launch, we'll surface the Spreaker embed for "The Resonant Identity" show and hide the episode listing and filters until we have more episodes and search functionality built out. Once we have a larger catalog of episodes, we can prominently feature the listing with the embed as a highlighted player within the page.
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
  const dateRangeResultsSuffix =
    (startDate || endDate) && processedEpisodes.length !== episodes.length
      ? ` ${processedEpisodes.length} matching date range`
      : '';

  // Brand colors only in light/dark mode; accessible modes use default secondary styling
  const useBrandColors =
    theme.themeMode === 'light' || theme.themeMode === 'dark';

  return (
    <UnifiedPageWrapper layoutType='responsive-grid' imageConfig={imageConfig}>
      <div
        style={{
          padding: isMobile ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
        }}
      >
        {/* Page Header */}
        <Hero
          title='The Resonant Identity'
          iconName='Microphone'
          description='The Resonant Identity is a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention. It is a living extension of The Resonance Core Framework where identity becomes practice and is formed through coherence.'
          backArrow={true}
          backArrowPath='/podcasts'
          // filters={podcastFilters} - will add later once more episodes are available and search is built out
        >
          <div className='flex flex-row justify-between items-center gap-2 flex-wrap'>
            <div
              style={{
                marginTop: theme.spacing.m,
                display: 'flex',
                gap: theme.spacing.m,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {/* Platform Subscription Icons */}
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
          </div>
          {/* Featured Episode CTA */}
          {!loading && !error && processedEpisodes.length > 0 && (
            <div className='pt-8'>
              <Callout
                variant='accent'
                title='Listen to the Most Recent Episode'
                subtitle={
                  processedEpisodes[0]?.episode_title || 'Start listening now'
                }
                action={
                  <FormButton
                    variant='secondary'
                    size='large'
                    icon='Play'
                    iconPosition='left'
                    onClick={() => setSelectedEpisode(processedEpisodes[0])}
                    aria-label='Play most recent episode'
                  >
                    Listen Now
                  </FormButton>
                }
              />
            </div>
          )}
        </Hero>

        {/* Callout to learn more about The Resonant Identity */}
        <div className='pt-16 pb-4'>
          <Callout
            variant='neutral'
            title='About The Resonant Identity Podcast'
            subtitle='Learn more about the philosophy, community, and mission behind The Resonant Identity (TRI).'
            action={
              <FormButton
                variant='primary'
                size='large'
                icon='ChevronRight'
                iconPosition='right'
                onClick={() => router.push('/podcasts/theresonantid/about')}
                aria-label='About The Resonant Identity Podcast'
              >
                About The Resonant Identity
              </FormButton>
            }
          />
        </div>

        {/* Loading state */}
        {loading && (
          <div
            className='pt-8 pb-8'
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
            className='pt-8 pb-8'
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
            className='pt-8 pb-8'
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
          <div
            className='pb-8 mt-8'
            style={{ borderTop: `1px solid ${theme.palette.neutralPrimary}` }}
          >
            <SectionHeader
              title={`All Episodes: Showing ${processedEpisodes.length}${dateRangeResultsSuffix}`}
              style={{ marginBottom: theme.spacing.l1 }}
            />
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
          </div>
        )}
      </div>

      {/* ─── TRI Content Sections ─── */}
      {/* These sections auto-populate from blog posts categorised as "Resonant Identity" */}
      {(triCompanionArticles.length > 0 ||
        triChallenges.length > 0 ||
        triDemos.length > 0) && (
        <div
          style={{
            padding: isMobile ? theme.spacing.m : theme.spacing.l1,
            width: '100%',
            borderTop: `1px solid ${theme.palette.neutralPrimary}`,
          }}
        >
          <SectionHeader
            title='Explore TRI Resources'
            iconName='Library'
            subtitle='Dive deeper into the Resonant Identity philosophy with companion articles, identity challenges, and interactive demos that complement the podcast episodes.'
            style={{
              marginTop: theme.spacing.m,
              marginBottom: theme.spacing.l,
              paddingLeft: isMobile ? theme.spacing.s : theme.spacing.l,
              paddingRight: isMobile ? theme.spacing.s : theme.spacing.l,
            }}
          />
          <div
            style={{
              marginBottom: theme.spacing.xxxxl,
              paddingLeft: isMobile ? theme.spacing.s : theme.spacing.l,
              paddingRight: isMobile ? theme.spacing.s : theme.spacing.l,
            }}
          >
            <FormButton
              variant='primary'
              icon='Library'
              iconPosition='left'
              fullWidth={isMobile}
              onClick={() => router.push('/podcasts/theresonantid/library')}
              aria-label='Explore The Full Library'
            >
              Explore The Full Library
            </FormButton>
          </div>
          <div className='space-y-8'>
            {/* ─── A. 7-Day Challenges ─── */}
            {triChallenges.length > 0 && (
              <TRISection
                iconName='CalendarDay'
                title='7-Day Challenges'
                description='Structured 7-day challenges that help you build your personal resonance baseline through daily identity-focused exercises.'
                posts={triChallenges.slice(0, 3)}
                viewAllLabel='View All Challenges'
                viewAllHref='/podcasts/theresonantid/challenges'
                isMobile={isMobile}
                theme={theme}
                router={router}
              />
            )}

            {/* ─── B. Interactive Demos ─── */}
            {triDemos.length > 0 && (
              <TRISection
                iconName='LightningBolt'
                title='Interactive Demos'
                description='Hands-on tools and self-assessments that let you directly experience The Resonance Core Framework concepts in action.'
                posts={triDemos.slice(0, 3)}
                viewAllLabel='Explore All Demos'
                viewAllHref='/podcasts/theresonantid/demos'
                isMobile={isMobile}
                theme={theme}
                router={router}
              />
            )}

            {/* ─── C. Companion Articles ─── */}
            {triCompanionArticles.length > 0 && (
              <TRISection
                iconName='TextDocumentShared'
                title='Companion Articles'
                description='Deep-dive articles paired with TRI episodes — designed to help you apply the frameworks from each episode to your own identity work.'
                posts={triCompanionArticles.slice(0, 3)}
                viewAllLabel='View All Articles'
                viewAllHref='/podcasts/theresonantid/articles'
                isMobile={isMobile}
                theme={theme}
                router={router}
              />
            )}
          </div>
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
    </UnifiedPageWrapper>
  );
}

// ─── TRI Section Helper ───────────────────────────────────────────────────────

interface TRISectionProps {
  iconName: string;
  title: string;
  description: string;
  posts: TRIPost[];
  viewAllLabel: string;
  viewAllHref: string;
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
  router: ReturnType<typeof useRouter>;
}

/**
 * TRISection
 * Renders a lightweight content section for one TRI content type
 * (Companion Articles, 7-Day Challenges, or Interactive Demos).
 */
function TRISection({
  iconName,
  title,
  description,
  posts,
  viewAllLabel,
  viewAllHref,
  isMobile,
  theme,
  router,
}: TRISectionProps) {
  const gridColumns = isMobile ? 1 : Math.min(posts.length, 3);

  return (
    <section
      className={`space-y-8 rounded-lg pt-8 pb-8 mb-6 ${isMobile ? 'pl-4 pr-6' : 'pl-8 pr-8'}`}
      style={{
        backgroundColor: theme.palette.neutralQuaternaryAlt,
        borderTop: `1px solid ${theme.palette.neutralPrimary}`,
        marginTop: theme.spacing.m,
        marginBottom: theme.spacing.xxxl,
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.s1,
          marginBottom: theme.spacing.m,
        }}
      >
        <FluentIcon
          iconName={iconName}
          size='large'
          color={theme.palette.themePrimary}
          style={{ marginRight: theme.spacing.s }}
        />
        <Typography
          variant='h3'
          style={{
            color: theme.palette.themePrimary,
            fontSize: '1.75rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            textTransform: 'unset',
            marginBottom: `${theme.spacing.s1}`,
          }}
        >
          {title}
        </Typography>
      </div>

      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '0.9375rem',
          lineHeight: 1.6,
          marginTop: 0,
          maxWidth: '600px',
        }}
      >
        {description}
      </Typography>

      {/* Post cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: theme.spacing.l1,
        }}
      >
        {posts.map((post) => (
          <TRIPostCard key={post.slug} post={post} theme={theme} />
        ))}
      </div>

      {/* View All button */}
      <FormButton
        variant='secondary'
        size='medium'
        icon='ChevronRight'
        iconPosition='right'
        onClick={() => router.push(viewAllHref)}
        aria-label={viewAllLabel}
      >
        {viewAllLabel}
      </FormButton>
    </section>
  );
}

// ─── TRI Post Card ────────────────────────────────────────────────────────────

interface TRIPostCardProps {
  post: TRIPost;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}

/**
 * TRIPostCard
 * A lightweight card linking to a Resonant Identity blog post.
 */
function TRIPostCard({ post, theme }: TRIPostCardProps) {
  const [hovered, setHovered] = React.useState(false);
  // Encode the slug to prevent any path-injection issues
  const safeHref = `/blog/${encodeURIComponent(post.slug)}`;

  return (
    <Link
      href={safeHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.s2,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${hovered ? theme.palette.themeSecondary : theme.palette.themePrimary}`,
        backgroundColor: hovered
          ? theme.palette.neutralLighterAlt
          : theme.palette.neutralLighter,
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? theme.effects.elevation4 : 'none',
      }}
      aria-label={`Read: ${post.title}`}
    >
      {/* Tag chips */}
      <div
        style={{
          display: 'flex',
          gap: theme.spacing.s,
          marginBottom: theme.spacing.s,
          flexWrap: 'wrap',
        }}
      >
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: theme.palette.themeSecondary,
              backgroundColor: theme.palette.neutralLighter,
              padding: `2px ${theme.spacing.s} 2px 0`,
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <Typography
        variant='h3'
        style={{
          color: hovered
            ? theme.palette.themeSecondary
            : theme.palette.themePrimary,
          fontSize: '1.25rem',
          fontWeight: theme.typography.fontWeights.semiBold,
          transition: 'color 0.2s ease',
          textTransform: 'unset',
          margin: `0 0 ${theme.spacing.s1} 0`,
        }}
      >
        {post.title}
      </Typography>

      {/* Excerpt */}
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
          margin: 0,
        }}
      >
        {post.excerpt}
      </Typography>

      {/* Read more indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: 'auto',
          paddingTop: theme.spacing.s2,
        }}
      >
        <Typography
          variant='label'
          style={{
            color: theme.palette.themeSecondary,
            fontSize: '0.875rem',
            margin: `${theme.spacing.s1} 0`,
            fontWeight: 600,
          }}
        >
          Read article
        </Typography>
        <FluentIcon
          iconName='ChevronRight'
          size='small'
          color={theme.palette.themeSecondary}
          style={{
            transition: 'transform 0.2s ease',
            transform: hovered ? 'translateX(4px)' : 'none',
          }}
        />
      </div>
    </Link>
  );
}
