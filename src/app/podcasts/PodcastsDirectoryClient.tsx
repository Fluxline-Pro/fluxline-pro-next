'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Hero } from '@/theme/components/hero/Hero';
import { FormButton } from '@/theme/components/form';
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
  const { theme } = useAppTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isMobile = isMounted ? isMobileHook : false;
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

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
          description='Long-form audio exploring identity, technology, and transformation.'
          backArrow={true}
          backArrowPath='/content'
        />

        {/* Section header */}
        <Typography
          variant='h3'
          style={{
            color: theme.palette.themePrimary,
            textAlign: 'left',
            marginTop: theme.spacing.xxxl,
            marginBottom: theme.spacing.l,
          }}
        >
          Current Show
        </Typography>

        {/* Podcasts Grid - Currently one podcast */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: theme.spacing.l,
            maxWidth: '1200px',
          }}
        >
          {/* The Resonant Identity Card */}
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              borderRadius: theme.effects.roundedCorner6,
              overflow: 'hidden',
              border: `2px solid ${theme.palette.themePrimary}`,
              transition: 'all 0.2s ease',
              transform: hovered ? 'translateY(-4px)' : 'none',
              boxShadow: hovered
                ? theme.effects.elevation16
                : theme.effects.elevation4,
              backgroundColor: theme.palette.neutralLighterAlt,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Image */}
            <div
              style={{
                height: '300px',
                overflow: 'hidden',
                backgroundColor: theme.palette.neutralLighter,
                position: 'relative',
              }}
            >
              {/* Featured badge */}
              <div
                style={{
                  position: 'absolute',
                  top: theme.spacing.m,
                  right: theme.spacing.m,
                  padding: `${theme.spacing.s2} ${theme.spacing.s1}`,
                  backgroundColor: theme.palette.themeSecondary,
                  color: theme.palette.black,
                  borderRadius: theme.effects.roundedCorner4,
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
                style={{ objectFit: 'contain', padding: theme.spacing.l }}
                priority
              />
            </div>

            {/* Card Body */}
            <div
              style={{
                padding: theme.spacing.l,
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.m,
                flex: 1,
              }}
            >
              {/* Title */}
              <Typography
                variant='h2'
                style={{
                  color: hovered
                    ? theme.palette.themePrimary
                    : theme.palette.neutralPrimary,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease',
                }}
              >
                The Resonant Identity
              </Typography>

              {/* Description */}
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                A podcast blending identity architecture, self-improvement, and
                practical frameworks for navigating transitions with clarity and
                intention.
              </Typography>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing.m,
                  flexWrap: 'wrap',
                  marginTop: theme.spacing.m,
                }}
              >
                <FormButton
                  variant='primary'
                  size='large'
                  icon='PlayResume'
                  iconPosition='left'
                  onClick={() => router.push('/podcasts/theresonantid')}
                >
                  View Episodes
                </FormButton>
                <FormButton
                  variant='secondary'
                  size='large'
                  icon='Info'
                  iconPosition='left'
                  aria-label='Learn About The Resonant Identity Podcast'
                  onClick={() => router.push('/podcasts/theresonantid/about')}
                >
                  About The Resonant Identity
                </FormButton>
              </div>
            </div>
          </div>
        </div>

        {/* Empty state message for future podcasts */}
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.spacing.xxl,
            padding: theme.spacing.xl,
            textAlign: 'center',
            color: theme.palette.neutralTertiary,
            borderTop: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
          }}
        >
          <FluentIcon
            iconName='Microphone'
            size='xLarge'
            color={theme.palette.neutralTertiary}
          />
          <Typography
            variant='p'
            style={{
              marginTop: theme.spacing.m,
              color: theme.palette.neutralSecondary,
            }}
          >
            More podcasts coming soon.
          </Typography>
        </div> */}
      </div>
    </UnifiedPageWrapper>
  );
}
