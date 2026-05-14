'use client';

/**
 * The Resonant Identity — About Page
 * Landing page for the TRI community hub at /podcasts/theresonantid
 * Written by Terence Waters.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import ResonanceCoreImage from '@/assets/images/LifeCoachingResonanceCore.jpg';
// External ecosystem link URLs
const TRI_LINKS = {
  instagram: 'https://www.instagram.com/theresonantid',
  twitter: 'https://x.com/theresonantid',
  tiktok: 'https://www.tiktok.com/@theresonantid',
  podcast: '/podcasts/theresonantid/', // setting as the main podcast page for now since it links to all platforms
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

function SocialIconLink({
href,
label,
external = true,
children,
}: {
href: string;
label: string;
external?: boolean;
children: React.ReactNode;
}) {
const { theme } = useAppTheme();
const [hovered, setHovered] = React.useState(false);

return (
  <Link
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    aria-label={label}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: hovered
        ? theme.palette.neutralLighterAlt
        : theme.palette.neutralLighter,
      border: `1px solid ${hovered ? theme.palette.themePrimary : 'transparent'}`,
      transition: 'all 0.2s ease',
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
        textTransform: 'unset',
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
  const router = useRouter();
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
            subtitle='A living extension of the Resonance Core Framework where identity becomes practice and is formed through coherence.'
            backArrow={true}
            backArrowPath='/podcasts/theresonantid'
          >
            {/* Social icons displayed beneath the hero subtitle */}
            <Typography
              variant='h5'
              style={{
                color: theme.palette.neutralSecondary,
                marginTop: theme.spacing.l,
                textTransform: 'unset',
              }}
            >
              Social Media:
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: theme.spacing.m,
                flexWrap: 'wrap',
              }}
            >
              <SocialIconLink
                href={TRI_LINKS.instagram}
                label='The Resonant Identity on Instagram'
              >
                <InstagramIcon style={{ width: '24px', height: '24px' }} />
              </SocialIconLink>
              <SocialIconLink
                href={TRI_LINKS.twitter}
                label='The Resonant Identity on X'
              >
                <TwitterLogo style={{ width: '24px', height: '24px' }} />
              </SocialIconLink>
              <SocialIconLink
                href={TRI_LINKS.tiktok}
                label='The Resonant Identity on TikTok'
              >
                <TiktokLogo style={{ width: '24px', height: '24px' }} />
              </SocialIconLink>
              <SocialIconLink
                href={TRI_LINKS.facebookGroup}
                label='The Resonant Identity Community Facebook Group'
              >
                <FacebookIcon style={{ width: '24px', height: '24px' }} />
              </SocialIconLink>
              <SocialIconLink
                href={TRI_LINKS.podcast}
                label='The Resonant Identity Podcast'
                external={false}
              >
                <FluentIcon
                  iconName='Microphone'
                  size='medium'
                  color={theme.palette.themePrimary}
                />
              </SocialIconLink>
            </div>
          </Hero>

          {/* Featured Podcast CTA */}
          <div className='pb-4'>
            <Callout
              variant='subtle'
              title='Listen to the Podcast'
              subtitle='Explore episodes blending identity architecture, self-improvement, and practical frameworks.'
              action={
                <FormButton
                  variant='secondary'
                  size='large'
                  icon='Microphone'
                  iconPosition='left'
                  onClick={() => router.push(TRI_LINKS.podcast)}
                  aria-label='Listen to The Resonant Identity Podcast'
                >
                  Browse Episodes
                </FormButton>
              }
            />
          </div>

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
                size='large'
                color={theme.palette.themePrimary}
                style={{ marginRight: '0.5rem' }}
              />
              <SectionHeading>What is The Resonant Identity?</SectionHeading>
            </div>

            <div>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  fontSize: '1.125rem',
                  lineHeight: theme.typography.lineHeights.relaxed,
                  paddingBottom: theme.spacing.m,
                }}
              >
                The Resonant Identity (TRI) is a space for identity
                transformation, micro-lessons, and applied resonance. It extends
                the Resonance Core Framework into a living, accessible rhythm —
                helping you build an identity that feels aligned, coherent, and
                grounded in who you&apos;re becoming.
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  fontSize: '1.125rem',
                  lineHeight: theme.typography.lineHeights.relaxed,
                  marginBottom: 0,
                }}
              >
                TRI is not about quick fixes or surface-level hacks. It&apos;s
                about cultivating a deeper relationship with yourself through
                resonance — learning to listen to the subtle cues of what feels
                right, and building an identity that reflects that resonance in
                daily life.
              </Typography>
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

          {/* ─── 4. The Resonance Core Framework™ Connection ─── */}
          <section className='space-y-6'>
            <SectionHeading>
              The Resonance Core Framework™ Connection
            </SectionHeading>

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
                    alt='Resonance Core Framework™'
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
                  title='Built on the Resonance Core Framework™'
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
                    Resonance Core Framework™ — a model for identity formation
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
              className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}`}
              style={{
                width: '100%',
                maxWidth: '100%',
                alignItems: 'center',
              }}
            >
              {/* Left: description - spans 2 columns */}
              <div className={isMobile ? '' : 'md:col-span-2'}>
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
                </Typography>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1.125rem',
                    lineHeight: theme.typography.lineHeights.relaxed,
                    marginTop: theme.spacing.m,
                  }}
                >
                  It&apos;s a space for resonance and congruence — a place to
                  practice becoming.
                </Typography>
              </div>

              {/* Right: CTA - spans 1 column */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
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

          {/* ─── 6 & 7. Ecosystem Links + Call to Action Grid ─── */}
          <div
            className={`grid gap-16 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}
            style={{
              width: '100%',
              maxWidth: '100%',
              alignItems: 'center',
            }}
          >
            {/* ─── 6. Call to Action ─── */}
            <section className='space-y-6'>
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

            {/* ─── 7. Ecosystem Links ─── */}
            <section className='space-y-6'>
              <SectionHeading>Find us on Social Media!</SectionHeading>

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

                {/* Podcast
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
                </EcosystemLink> */}

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
                    Facebook Group
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
                    Facebook Page
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
              </div>
            </section>
          </div>

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
