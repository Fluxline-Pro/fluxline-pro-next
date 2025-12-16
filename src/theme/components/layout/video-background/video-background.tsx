'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FluentIcon } from '@/theme/components/fluent-icon/fluent-icon';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useColorVisionFilter } from '../../../hooks/useColorVisionFilter';
import type { IExtendedTheme, ThemeMode } from '../../../theme';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc: string;
  fallbackImageSrc: string;
  captionsSrc?: string;
  orientation:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'mobile-landscape'
    | 'tablet-portrait'
    | 'ultrawide'
    | 'large-portrait';
  backgroundPosition: string;
  gradient: string;
  shouldFlipHorizontally: boolean;
  onVideoLoaded?: () => void;
  themeMode: ThemeMode;
  theme: IExtendedTheme;
}

/**
 * VideoBackground Component
 *
 * Renders a background video with controls for muting/unmuting and replaying.
 * Falls back to a static image if video fails to load.
 * Supports closed captions and accessibility features.
 */
export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  posterSrc,
  fallbackImageSrc,
  captionsSrc,
  orientation,
  backgroundPosition,
  gradient,
  shouldFlipHorizontally,
  onVideoLoaded,
  themeMode,
  theme,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if video source is valid
  const hasValidVideoSrc = videoSrc && videoSrc.trim() !== '';

  // Initialize state based on video source validity
  const [isVideoLoaded, setIsVideoLoaded] = useState(() => !hasValidVideoSrc);
  const [videoError, setVideoError] = useState(() => !hasValidVideoSrc);
  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { shouldReduceMotion } = useReducedMotion();
  const { filter } = useColorVisionFilter(true);

  // Call onVideoLoaded callback when no valid video source
  useEffect(() => {
    if (!hasValidVideoSrc && onVideoLoaded) {
      onVideoLoaded();
    }
  }, [hasValidVideoSrc, onVideoLoaded]);

  useEffect(() => {
    // Only set up video loading logic if we have a valid video source
    if (!hasValidVideoSrc) {
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Set a timeout to fall back to image if video takes too long to load
    const loadTimeout = setTimeout(() => {
      if (!isVideoLoaded) {
        console.warn('Video load timeout - falling back to image');
        setVideoError(true);
        setIsVideoLoaded(true);
        if (onVideoLoaded) {
          onVideoLoaded();
        }
      }
    }, 10000); // 10 second timeout

    const handleLoadedData = () => {
      clearTimeout(loadTimeout);
      setIsVideoLoaded(true);
      setVideoError(false);
      if (onVideoLoaded) {
        onVideoLoaded();
      }
    };

    const handleError = () => {
      clearTimeout(loadTimeout);
      console.error('Video failed to load - using fallback image');
      setVideoError(true);
      setIsVideoLoaded(true);
      if (onVideoLoaded) {
        onVideoLoaded();
      }
    };

    const handleEnded = () => {
      setHasEnded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      clearTimeout(loadTimeout);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onVideoLoaded, hasValidVideoSrc, isVideoLoaded]);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
      setHasEnded(false);
    }
  };

  // Show fallback image if video failed to load or no valid video source
  if (videoError || !hasValidVideoSrc) {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            filter: filter,
          }}
        >
          <Image
            src={fallbackImageSrc}
            alt='Fluxline Pro background'
            fill
            priority
            quality={90}
            style={{
              objectFit: 'cover',
              objectPosition: backgroundPosition,
              transform: shouldFlipHorizontally ? 'scaleX(-1)' : undefined,
            }}
          />
        </div>
        {/* Gradient Overlay for fallback image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            background: gradient,
            pointerEvents: 'none',
          }}
        />
      </>
    );
  }

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: theme.palette.white,
    border: `1px solid ${theme.palette.themePrimary}`,
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: shouldReduceMotion
      ? 'none'
      : 'background-color 0.2s ease, transform 0.2s ease',
    zIndex: 10,
    fontSize: '20px',
  };

  const muteButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    bottom: '20px',
    right: '20px',
  };

  const replayButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    bottom: '20px',
    right: hasEnded ? '80px' : '20px',
    display: hasEnded ? 'flex' : 'none',
  };

  return (
    <>
      {/* Fallback Image Layer - Always rendered, hidden when video loads */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          filter: filter,
          opacity: isVideoLoaded && !videoError ? 0 : 1,
          transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
          zIndex: 1,
        }}
      >
        <Image
          src={fallbackImageSrc}
          alt='Fluxline Pro background'
          fill
          priority
          quality={90}
          style={{
            objectFit: 'cover',
            objectPosition: backgroundPosition,
            transform: shouldFlipHorizontally ? 'scaleX(-1)' : undefined,
          }}
        />
      </div>

      {/* Video Layer - Fades in when loaded */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          filter: filter,
          opacity: isVideoLoaded && !videoError ? 1 : 0,
          transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
          zIndex: 2,
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: backgroundPosition,
            transform: shouldFlipHorizontally ? 'scaleX(-1)' : undefined,
          }}
          autoPlay
          muted
          playsInline
          preload='auto'
          poster={posterSrc}
          crossOrigin='anonymous'
        >
          <source src={videoSrc} type='video/mp4' />
          {captionsSrc && (
            <track
              kind='captions'
              src={captionsSrc}
              srcLang='en'
              label='English'
              default
            />
          )}
          Your browser does not support the video tag.
        </video>

        {/* Video Controls */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            display: 'flex',
            gap: '12px',
            padding: '20px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            opacity: showControls || hasEnded ? 1 : 0,
            transition: shouldReduceMotion
              ? 'none'
              : 'opacity 0.3s ease-in-out',
            pointerEvents: showControls || hasEnded ? 'auto' : 'none',
          }}
        >
          {/* Replay Button */}
          {hasEnded && (
            <button
              onClick={handleReplay}
              style={replayButtonStyle}
              onMouseEnter={(e) => {
                if (!shouldReduceMotion) {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'rgba(0, 0, 0, 0.8)';
                  (e.currentTarget as HTMLElement).style.transform =
                    'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!shouldReduceMotion) {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    'rgba(0, 0, 0, 0.6)';
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }
              }}
              aria-label='Replay video'
            >
              <FluentIcon
                iconName='Play'
                size='small'
                color={theme.palette.white}
              />
              <span
                style={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                }}
              >
                Replay video
              </span>
            </button>
          )}

          {/* Mute/Unmute Button */}
          <button
            onClick={handleMuteToggle}
            style={muteButtonStyle}
            onMouseEnter={(e) => {
              if (!shouldReduceMotion) {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(0, 0, 0, 0.8)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!shouldReduceMotion) {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  'rgba(0, 0, 0, 0.6)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }
            }}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            <FluentIcon
              iconName={isMuted ? 'VolumeDisabled' : 'Volume2'}
              size='small'
              color={theme.palette.white}
            />
            <span
              style={{
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              {isMuted ? 'Unmute video' : 'Mute video'}
            </span>
          </button>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: gradient,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
    </>
  );
};

export default VideoBackground;
