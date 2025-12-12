'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { shouldReduceMotion } = useReducedMotion();
  const { filter } = useColorVisionFilter(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      if (onVideoLoaded) {
        onVideoLoaded();
      }
    };

    const handleError = () => {
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
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onVideoLoaded]);

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

  // Show fallback image if video failed to load
  if (videoError) {
    return (
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
          alt="Fluxline Pro background"
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
          opacity: isVideoLoaded ? 1 : 0,
          transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
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
          preload="auto"
          poster={posterSrc}
          crossOrigin="anonymous"
        >
          <source src={videoSrc} type="video/mp4" />
          {captionsSrc && (
            <track
              kind="captions"
              src={captionsSrc}
              srcLang="en"
              label="English"
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
                  (e.currentTarget as HTMLElement).style.transform =
                    'scale(1)';
                }
              }}
              aria-label="Replay video"
            >
              ↻
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
            {isMuted ? '🔇' : '🔊'}
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
          opacity: isVideoLoaded ? 1 : 0,
          transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
        }}
      />
    </>
  );
};

export default VideoBackground;
