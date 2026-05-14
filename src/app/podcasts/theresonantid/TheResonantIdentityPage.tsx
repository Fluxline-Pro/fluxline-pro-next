'use client';

/**
 * The Resonant Identity — About Page
 * Landing page for the TRI community hub at /podcasts/theresonantid
 * Written by Terence Waters.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { Hero } from '@/theme/components/hero';
import { InteractiveCard } from '@/components/InteractiveCard';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { InstagramIcon } from '@/assets/svgs/InstagramLogo';
import { FacebookIcon } from '@/assets/svgs/FacebookLogo';
import { TwitterLogo } from '@/assets/svgs/TwitterLogo';
import { TiktokLogo } from '@/assets/svgs/TiktokLogo';
import { PODCAST_PLATFORMS } from '../types';
import ResonanceCoreImage from '@/assets/images/LifeCoachingResonanceCore.jpg';

// External ecosystem link URLs
const TRI_LINKS = {
  instagram: 'https://www.instagram.com/theresonantid',
  twitter: 'https://x.com/theresonantid',
  tiktok: 'https://www.tiktok.com/@theresonantid',
  podcast: PODCAST_PLATFORMS.spreaker,
  facebookGroup: 'https://www.facebook.com/groups/theresonantid',
  facebookPage: 'https://www.facebook.com/theresonantid',
  sevenDaySetup: 'https://www.facebook.com/groups/theresonantid',
} as const;

// "How It Works" card data
const HOW_IT_WORKS = [
  {
    id: 'micro-lessons',
    title: 'Micro-Lessons',
    description:
      'Short, actionable teachings designed to shift identity through resonance rather than force.',
    icon: 'LightningBolt',
  },
  {
    id: 'seven-day-setup',
    title: '7-Day Setup',
    description:
      'A guided onboarding sequence that helps you establish your personal resonance baseline.',
    icon: 'CalendarDay',
  },
  {
    id: 'ongoing-practice',
    title: 'Ongoing Practice',
    description:
      'Weekly prompts, reflections, and identity-building exercises that keep you aligned.',
    icon: 'Refresh',
  },
];

/**
 * EcosystemLink
 * A single icon-button link in the Ecosystem section.
 */
function EcosystemLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const { theme } = useAppTheme();
  const [hovered, setHovered] = React.useState(false);

  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing.s2,
        padding: `${theme.spacing.m} ${theme.spacing.s1}`,
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${hovered ? theme.palette.themePrimary : theme.palette.neutralQuaternaryAlt}`,
        backgroundColor: hovered
          ? theme.palette.neutralLighterAlt
          : 'transparent',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        minWidth: '80px',
        flex: '0 0 auto',
      }}
    >
      {children}
    </Link>
  );
}

// Shared section divider — defined outside render to satisfy react-hooks/static-components
function Divider() {
  const { theme } = useAppTheme();
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
        margin: `${theme.spacing.xxl} 0`,
      }}
    />
  );
}

// Shared section heading — defined outside render
function SectionHeading({ children }: { children: React.ReactNode }) {
  const { theme } = useAppTheme();
  return (
    <Typography
      variant='h2'
      style={{
        color: theme.palette.themePrimary,
        fontSize: '2rem',
        fontWeight: theme.typography.fontWeights.bold,
        marginBottom: theme.spacing.l,
      }}
    >
      {children}
    </Typography>
  );
}

/**
 * TheResonantIdentityPage
 * Full client-side landing page component for /podcasts/theresonantid.
 */
export function TheResonantIdentityPage() {
  const { theme } = useAppTheme();
  const isMobileHook = useIsMobile();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobile = isMounted ? isMobileHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const iconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: theme.palette.neutralLighter,
  };

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding: isMobile ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
        }}
      >
        <div className='space-y-8 lg:space-y-16'>
          {/* ─── 1. Hero Section ─── */}
          <Hero
            title='The Resonant Identity'
            subtitle='A living extension of the Resonance Core Framework — where identity becomes practice.'
            backArrow={true}
            backArrowPath='/podcasts'
          >
            {/* Social icons displayed beneath the hero subtitle */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: theme.spacing.m,
                marginTop: theme.spacing.l,
                flexWrap: 'wrap',
              }}
            >
              <Link
                href={TRI_LINKS.instagram}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='The Resonant Identity on Instagram'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.neutralLighter,
                  transition: 'all 0.2s ease',
                }}
              >
                <InstagramIcon style={{ width: '24px', height: '24px' }} />
              </Link>
              <Link
                href={TRI_LINKS.twitter}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='The Resonant Identity on X'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.neutralLighter,
                  transition: 'all 0.2s ease',
                }}
              >
                <TwitterLogo style={{ width: '24px', height: '24px' }} />
              </Link>
              <Link
                href={TRI_LINKS.tiktok}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='The Resonant Identity on TikTok'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.neutralLighter,
                  transition: 'all 0.2s ease',
                }}
              >
                <TiktokLogo style={{ width: '24px', height: '24px' }} />
              </Link>
              <Link
                href={TRI_LINKS.facebookGroup}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='The Resonant Identity Community Facebook Group'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.neutralLighter,
                  transition: 'all 0.2s ease',
                }}
              >
                <FacebookIcon style={{ width: '24px', height: '24px' }} />
              </Link>
              <Link
                href={TRI_LINKS.podcast}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='The Resonant Identity Podcast'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: theme.palette.neutralLighter,
                  transition: 'all 0.2s ease',
                }}
              >
                <FluentIcon
                  iconName='Microphone'
                  size='medium'
                  color={theme.palette.themePrimary}
                />
              </Link>
            </div>
          </Hero>

          {/* ─── 2. What TRI Is ─── */}
          <section className='space-y-6'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.s1,
                marginBottom: theme.spacing.m,
              }}
            >
              <FluentIcon
                iconName='ContactInfo'
                size='medium'
                color={theme.palette.themePrimary}
              />
              <SectionHeading>What The Resonant Identity Is</SectionHeading>
            </div>

            <div
              className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}
              style={{
                width: '100%',
                maxWidth: '100%',
              }}
            >
              <div>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1.125rem',
                    lineHeight: theme.typography.lineHeights.relaxed,
                  }}
                >
                  The Resonant Identity is a space for identity transformation,
                  micro-lessons, and applied resonance. It extends the Resonance
                  Core Framework into a living, accessible rhythm — helping you
                  build an identity that feels aligned, coherent, and grounded
                  in who you&apos;re becoming.
                </Typography>
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── 3. How It Works ─── */}
          <section className='space-y-8'>
            <SectionHeading>How It Works</SectionHeading>

            <div
              className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}`}
            >
              {HOW_IT_WORKS.map((card) => (
                <InteractiveCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  iconPosition='center'
                />
              ))}
            </div>
          </section>

          <Divider />

          {/* ─── 4. Connection to the RCF ─── */}
          <section className='space-y-6'>
            <SectionHeading>Connection to the RCF</SectionHeading>

            <div
              className={`flex gap-8 ${isMobile ? 'flex-col' : 'flex-row items-center'}`}
              style={{
                width: '100%',
                maxWidth: '100%',
              }}
            >
              {/* Left: Image */}
              {!isMobile && (
                <div style={{ flexShrink: 0, width: '280px' }}>
                  <Image
                    src={ResonanceCoreImage}
                    alt='Resonance Core Framework'
                    width={280}
                    height={373}
                    style={{
                      borderRadius: theme.borderRadius.container.medium,
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}

              {/* Right: Content */}
              <div
                style={{
                  flex: 1,
                  borderRadius: theme.borderRadius.container.medium,
                  backgroundColor: theme.palette.neutralLighterAlt,
                  padding: `${theme.spacing.xl} ${theme.spacing.l}`,
                }}
              >
                <Callout
                  variant='accent'
                  title='Built on the Resonance Core Framework'
                >
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.neutralSecondary,
                      fontSize: '1.125rem',
                      lineHeight: theme.typography.lineHeights.relaxed,
                    }}
                  >
                    The Resonant Identity is built on the foundations of the
                    Resonance Core Framework — a model for identity formation
                    rooted in coherence, clarity, and intentional
                    self-construction. TRI is the practical, community-based
                    expression of that framework.
                  </Typography>
                </Callout>
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── 5. Community Layer ─── */}
          <section className='space-y-6'>
            <SectionHeading>Community Layer</SectionHeading>

            <div
              className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}
              style={{
                width: '100%',
                maxWidth: '100%',
                alignItems: 'center',
              }}
            >
              {/* Left: description */}
              <div>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1.125rem',
                    lineHeight: theme.typography.lineHeights.relaxed,
                  }}
                >
                  The Facebook Group is the collaborative heart of TRI.
                  It&apos;s where members share reflections, integrate the
                  micro-lessons, and support each other through identity shifts.
                  It&apos;s a space for resonance, not performance — a place to
                  practice becoming.
                </Typography>
              </div>

              {/* Right: CTA */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: isMobile ? 'flex-start' : 'flex-end',
                }}
              >
                <FormButton
                  variant='primary'
                  size='large'
                  icon='Group'
                  iconPosition='left'
                  href={TRI_LINKS.facebookGroup}
                  target='_blank'
                >
                  Join the Community
                </FormButton>
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── 6. Ecosystem Links ─── */}
          <section className='space-y-6'>
            <SectionHeading>Find Us in the Ecosystem</SectionHeading>

            {/* Horizontally scrollable row on mobile */}
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.m,
                flexWrap: isMobile ? 'nowrap' : 'wrap',
                overflowX: isMobile ? 'auto' : 'visible',
                paddingBottom: isMobile ? theme.spacing.s1 : 0,
              }}
            >
              {/* Instagram */}
              <EcosystemLink
                href={TRI_LINKS.instagram}
                label='The Resonant Identity on Instagram (@theresonantid)'
              >
                <div style={iconButtonStyle}>
                  <InstagramIcon style={{ width: '24px', height: '24px' }} />
                </div>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Instagram
                </Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralTertiary,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  @theresonantid
                </Typography>
              </EcosystemLink>

              {/* X / Twitter */}
              <EcosystemLink
                href={TRI_LINKS.twitter}
                label='The Resonant Identity on X (@theresonantid)'
              >
                <div style={iconButtonStyle}>
                  <TwitterLogo style={{ width: '24px', height: '24px' }} />
                </div>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  X
                </Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralTertiary,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  @theresonantid
                </Typography>
              </EcosystemLink>

              {/* Podcast */}
              <EcosystemLink
                href={TRI_LINKS.podcast}
                label='The Resonant Identity Podcast on Spreaker'
              >
                <div style={iconButtonStyle}>
                  <FluentIcon
                    iconName='Microphone'
                    size='medium'
                    color={theme.palette.themePrimary}
                  />
                </div>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Podcast
                </Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralTertiary,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  The Resonant Identity
                </Typography>
              </EcosystemLink>

              {/* Facebook Group */}
              <EcosystemLink
                href={TRI_LINKS.facebookGroup}
                label='The Resonant Identity Community Facebook Group'
              >
                <div style={iconButtonStyle}>
                  <FacebookIcon style={{ width: '24px', height: '24px' }} />
                </div>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  FB Group
                </Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralTertiary,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  TRI Community
                </Typography>
              </EcosystemLink>

              {/* Facebook Page */}
              <EcosystemLink
                href={TRI_LINKS.facebookPage}
                label='The Resonant Identity Facebook Page'
              >
                <div style={iconButtonStyle}>
                  <FacebookIcon style={{ width: '24px', height: '24px' }} />
                </div>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  FB Page
                </Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralTertiary,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  The Resonant Identity
                </Typography>
              </EcosystemLink>

              {/* TikTok */}
              <EcosystemLink
                href={TRI_LINKS.tiktok}
                label='The Resonant Identity on TikTok (@theresonantid)'
              >
                <div style={iconButtonStyle}>
                  <TiktokLogo style={{ width: '24px', height: '24px' }} />
                </div>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.75rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  TikTok
                </Typography>
                <Typography
                  variant='caption'
                  style={{
                    color: theme.palette.neutralTertiary,
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  @theresonantid
                </Typography>
              </EcosystemLink>
            </div>
          </section>

          <Divider />

          {/* ─── 7. Call to Action ─── */}
          <section>
            <Callout
              variant='accent'
              title='Begin Your 7-Day Setup'
              subtitle='Start building an identity that resonates.'
              action={
                <FormButton
                  variant='primary'
                  size='large'
                  icon='ChevronRight'
                  iconPosition='right'
                  href={TRI_LINKS.sevenDaySetup}
                  target='_blank'
                >
                  Begin Your 7-Day Setup
                </FormButton>
              }
            />
          </section>

          {/* ─── Author Attribution ─── */}
          <div
            style={{
              paddingTop: theme.spacing.l,
              borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.s1,
            }}
          >
            <FluentIcon
              iconName='Contact'
              size='small'
              color={theme.palette.neutralTertiary}
            />
            <Typography
              variant='caption'
              style={{
                color: theme.palette.neutralTertiary,
                fontSize: '0.8rem',
              }}
            >
              Written by Terence Waters
            </Typography>
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}

export default TheResonantIdentityPage;
