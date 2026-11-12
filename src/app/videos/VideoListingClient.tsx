'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxButton from '@/theme/components/dsm/FxButton';
import { Modal } from '@/components/Modal';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { YouTubeVideo, VideoType, VIDEO_TABS, formatDuration } from './types';
import { FadeIn } from '@/animations/fade-animations';

function getChannelLabel(channelHandle?: string): string {
  if (!channelHandle) return 'YouTube';
  if (channelHandle === 'TheResonantIdentity') return 'TRI';
  if (channelHandle.toLowerCase() === 'fluxlinepro') return 'Fluxline';
  return channelHandle;
}

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
  const [hovered, setHovered] = React.useState(false);
  const duration = formatDuration(video.duration);
  const channelLabel = getChannelLabel(video.channelHandle);

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
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.15)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        backgroundColor: 'var(--fx-surface-card)',
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
              backgroundColor: 'var(--fx-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--fx-text-muted)',
              fontSize: '2rem',
            }}
          >
            &#9654;
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
              color: '#fff',
              fontSize: '3rem',
            }}
          >
            &#9654;
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
          {channelLabel}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: 12 }}>
        <h3
          style={{
            color: hovered ? 'var(--fx-accent)' : 'var(--fx-text-heading)',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: 4,
            marginTop: 0,
            transition: 'color 0.2s ease',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </h3>
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
          gap: 12,
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
              borderRadius: 8,
            }}
          />
        </div>

        {/* Video details */}
        <h2
          style={{
            color: 'var(--fx-accent)',
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: 0,
          }}
        >
          {video.title}
        </h2>

        {publishDate && (
          <p
            style={{
              color: 'var(--fx-text-body)',
              fontSize: '0.9rem',
              margin: 0,
            }}
          >
            Published: {publishDate}
          </p>
        )}

        {video.description && (
          <p
            style={{
              color: 'var(--fx-text-heading)',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              margin: 0,
            }}
          >
            {video.description}
          </p>
        )}

        {/* View on YouTube button */}
        <div>
          <FxButton variant='primary' href={watchUrl}>
            View on YouTube
          </FxButton>
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

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <div
        style={{
          width: '100%',
        }}
      >
        {/* Page Header */}
        <FxSectionHeading
          title='Videos'
          subhead='Watch videos from the @TheResonantIdentity, @TerenceRWaters, and @fluxlinepro YouTube channels — tutorials, live streams, playlists, and more.'
          as='h1'
        />

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginTop: 24,
            marginBottom: 24,
            borderBottom: '2px solid var(--fx-border)',
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
                  gap: 4,
                  padding: '8px 12px',
                  border: 'none',
                  borderBottom: `3px solid ${isActive ? 'var(--fx-accent)' : 'transparent'}`,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: isActive ? 'var(--fx-accent)' : 'var(--fx-text-body)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  marginBottom: '-2px',
                }}
              >
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
            <p style={{ color: 'var(--fx-text-body)', margin: 0 }}>
              Loading videos...
            </p>
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
              gap: 12,
            }}
          >
            <p style={{ color: 'var(--fx-text-body)', margin: 0 }}>{error}</p>
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
              gap: 12,
            }}
          >
            <p style={{ color: 'var(--fx-text-body)', margin: 0 }}>
              No {activeTab} found.
            </p>
          </div>
        )}

        {/* Video Grid */}
        {!loading && !error && videos.length > 0 && (
          <AnimatePresence mode='wait'>
            <div
              key={activeTab}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 24,
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
    </FxContainer>
  );
}
