'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { Hero } from '@/theme/components/hero/Hero';
import { Modal } from '@/components/Modal';
import { FormButton } from '@/theme/components/form';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { YouTubeVideo, VideoType, VIDEO_TABS, formatDuration } from './types';
import { FadeIn } from '@/animations/fade-animations';

/**
 * VideoCard Component
 * Displays a YouTube video as a clickable large-tile card
 */
function VideoCard({
  video,
  onClick,
}: {
  video: YouTubeVideo;
  onClick: () => void;
}) {
  const { theme } = useAppTheme();
  const [hovered, setHovered] = React.useState(false);
  const duration = formatDuration(video.duration);

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
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 */ }}>
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: theme.palette.neutralLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FluentIcon
              iconName='Video'
              size='xLarge'
              color={theme.palette.neutralSecondary}
            />
          </div>
        )}
        {/* Play overlay */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FluentIcon
              iconName='Play'
              size='xLarge'
              color={theme.palette.white}
            />
          </div>
        )}
        {/* Duration badge */}
        {duration && (
          <div
            style={{
              position: 'absolute',
              bottom: '0.5rem',
              right: '0.5rem',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {duration}
          </div>
        )}
        {/* Source label */}
        <div
          style={{
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            backgroundColor: '#FF0000',
            color: '#fff',
            fontSize: '0.65rem',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          YouTube
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: theme.spacing.m }}>
        <Typography
          variant='h3'
          style={{
            color: hovered
              ? theme.palette.themePrimary
              : theme.palette.neutralPrimary,
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: theme.spacing.s2,
            transition: 'color 0.2s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </Typography>
      </div>
    </div>
  );
}

/**
 * VideoModal Component
 * Displays embedded YouTube player with video details
 */
function VideoModal({
  video,
  onDismiss,
}: {
  video: YouTubeVideo;
  onDismiss: () => void;
}) {
  const { theme } = useAppTheme();
  const embedUrl =
    video.type === 'playlist'
      ? `https://www.youtube.com/embed/videoseries?list=${video.id}`
      : `https://www.youtube.com/embed/${video.id}?autoplay=1`;
  const watchUrl =
    video.type === 'playlist'
      ? `https://www.youtube.com/playlist?list=${video.id}`
      : `https://www.youtube.com/watch?v=${video.id}`;

  const publishDate = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : undefined;

  return (
    <Modal
      isOpen={true}
      onDismiss={onDismiss}
      ariaLabel={video.title}
      maxWidth='900px'
      maxHeight='95vh'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.m,
        }}
      >
        {/* Embedded player */}
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            src={embedUrl}
            title={video.title}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: theme.effects.roundedCorner4,
            }}
          />
        </div>

        {/* Video details */}
        <Typography
          variant='h2'
          style={{
            color: theme.palette.themePrimary,
            fontSize: '1.5rem',
            fontWeight: 700,
          }}
        >
          {video.title}
        </Typography>

        {publishDate && (
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '0.9rem',
            }}
          >
            Published: {publishDate}
          </Typography>
        )}

        {video.description && (
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralPrimary,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.description}
          </Typography>
        )}

        {/* View on YouTube button */}
        <div>
          <a
            href={watchUrl}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: 'none' }}
          >
            <FormButton
              variant='primary'
              size='medium'
              icon='OpenInNewTab'
              iconPosition='right'
            >
              View on YouTube
            </FormButton>
          </a>
        </div>
      </div>
    </Modal>
  );
}

/**
 * VideoListingClient Component
 * Main client component for the /video page
 */
export function VideoListingClient() {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = React.useState<VideoType>('videos');
  const [videos, setVideos] = React.useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = React.useState<YouTubeVideo | null>(
    null
  );

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          getApiEndpoint(`/api/youtube?type=${activeTab}`)
        );
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        if (!cancelled) {
          setVideos(data.videos || []);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load videos at this time.');
          setVideos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  const gridColumns = isMobile ? 1 : 3;

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
          title='Videos'
          iconName='Video'
          description='Watch videos from the @aplusinflux YouTube channel — tutorials, live streams, playlists, and more.'
          backArrow={true}
          backArrowPath='/content'
        />

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.s1,
            marginTop: theme.spacing.l1,
            marginBottom: theme.spacing.l1,
            borderBottom: `2px solid ${theme.palette.neutralLight}`,
          }}
        >
          {VIDEO_TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.s2,
                  padding: `${theme.spacing.s1} ${theme.spacing.m}`,
                  border: 'none',
                  borderBottom: `3px solid ${isActive ? theme.palette.themePrimary : 'transparent'}`,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: isActive
                    ? theme.palette.themePrimary
                    : theme.palette.neutralSecondary,
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  marginBottom: '-2px',
                }}
              >
                <FluentIcon
                  iconName={tab.iconName}
                  size='small'
                  color={
                    isActive
                      ? theme.palette.themePrimary
                      : theme.palette.neutralSecondary
                  }
                />
                {tab.label}
              </button>
            );
          })}
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
              Loading videos…
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
        {!loading && !error && videos.length === 0 && (
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
              iconName='Video'
              size='xLarge'
              color={theme.palette.neutralSecondary}
            />
            <Typography
              variant='p'
              style={{ color: theme.palette.neutralSecondary }}
            >
              No {activeTab} found.
            </Typography>
          </div>
        )}

        {/* Video Grid */}
        {!loading && !error && videos.length > 0 && (
          <AnimatePresence mode='wait'>
            <div
              key={activeTab}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: theme.spacing.l1,
              }}
            >
              {videos.map((video, index) => (
                <FadeIn key={video.id} delay={index * 0.05} duration={0.3}>
                  <VideoCard
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                  />
                </FadeIn>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onDismiss={() => setSelectedVideo(null)}
        />
      )}
    </UnifiedPageWrapper>
  );
}
