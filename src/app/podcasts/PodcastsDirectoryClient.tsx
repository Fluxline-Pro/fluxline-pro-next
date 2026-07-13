'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxButton from '@/theme/components/dsm/FxButton';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import TheResonantIdentityLogo from '@/assets/images/TheResonantIdentity_Logo.png';
import Image from 'next/image';

/**
 * PodcastsDirectoryClient
 * Directory/index page showing all available podcasts
 * Currently displays The Resonant Identity as a large tile card
 */
export function PodcastsDirectoryClient() {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isMobile = isMounted ? isMobileHook : false;
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* Page Header */}
      <FxSectionHeading
        kicker='Content'
        title='Podcasts'
        lede='Long-form audio exploring identity, technology, and transformation.'
        as='h1'
      />

      {/* Section header */}
      <h3
        style={{
          color: 'var(--fx-accent)',
          textAlign: 'left',
          marginTop: 44,
          marginBottom: 20,
          fontSize: 'var(--fx-h3-size)',
          fontWeight: 700,
        }}
      >
        Current Show
      </h3>

      {/* Podcasts Grid - Currently one podcast */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: 20,
          maxWidth: '1200px',
        }}
      >
        {/* The Resonant Identity Card */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: 6,
            overflow: 'hidden',
            border: '2px solid var(--fx-accent)',
            transition: 'all 0.2s ease',
            transform: hovered ? 'translateY(-4px)' : 'none',
            boxShadow: hovered
              ? '0 8px 24px rgba(0,0,0,0.12)'
              : '0 2px 6px rgba(0,0,0,0.06)',
            backgroundColor: 'var(--fx-surface-card)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image */}
          <div
            style={{
              height: '300px',
              overflow: 'hidden',
              backgroundColor: 'var(--fx-border)',
              position: 'relative',
            }}
          >
            {/* Featured badge */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                padding: '4px 8px',
                backgroundColor: 'var(--fx-gold)',
                color: '#000',
                borderRadius: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                zIndex: 1,
                textTransform: 'uppercase',
              }}
            >
              Featured
            </div>
            <Image
              src={TheResonantIdentityLogo}
              alt='The Resonant Identity Logo'
              fill
              style={{ objectFit: 'contain', padding: 20 }}
              priority
            />
          </div>

          {/* Card Body */}
          <div
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              flex: 1,
            }}
          >
            {/* Title */}
            <h2
              style={{
                color: hovered
                  ? 'var(--fx-accent)'
                  : 'var(--fx-text-heading)',
                fontSize: '1.5rem',
                fontWeight: 600,
                transition: 'color 0.2s ease',
                margin: 0,
              }}
            >
              The Resonant Identity
            </h2>

            {/* Description */}
            <p
              style={{
                color: 'var(--fx-text-body)',
                fontSize: 'var(--fx-body-size)',
                lineHeight: 1.6,
                flex: 1,
                margin: 0,
              }}
            >
              A podcast blending identity architecture, self-improvement, and
              practical frameworks for navigating transitions with clarity and
              intention.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginTop: 12,
              }}
            >
              <FxButton
                variant='primary'
                size='lg'
                onClick={() => router.push('/podcasts/theresonantid')}
              >
                View Episodes
              </FxButton>
              <FxButton
                variant='outline'
                size='lg'
                onClick={() => router.push('/podcasts/theresonantid/about')}
              >
                About The Resonant Identity
              </FxButton>
            </div>
          </div>
        </div>
      </div>
    </FxContainer>
  );
}
