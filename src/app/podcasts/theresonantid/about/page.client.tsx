'use client';

import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Typography } from '@/theme/components/typography';
import { InteractiveCard } from '@/components/InteractiveCard';
import { FormButton } from '@/theme/components/form';
import { FadeUp } from '@/animations/fade-animations';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { FilteredContentList } from '../components';
import type { BlogPost } from '@/app/blog/types';

/**
 * The Resonant Identity — About/Philosophy Page Client Component
 * Handles all interactive UI and client-side state
 */
export function TheResonantIdentityAboutPageClient({
  triPosts,
}: {
  triPosts: BlogPost[];
}) {
  const { theme } = useAppTheme();
  const router = useRouter();

  return (
    <UnifiedPageWrapper
      layoutType='responsive-grid'
      tabletPortraitLayout='side-by-side'
    >
      <FadeUp>
        <Hero
          title='The Resonant Identity'
          subtitle='A living extension of the Resonance Core Framework where identity becomes practice and is formed through coherence.'
          backArrow
          backArrowPath='/podcasts/theresonantid'
        />
      </FadeUp>

      {/* What is TRI Section */}
      <FadeUp delay={0.1}>
        <section style={{ marginBottom: theme.spacing.xxl }}>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.l,
            }}
          >
            What is The Resonant Identity?
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.m,
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            The Resonant Identity (TRI) is a space for identity transformation,
            micro-lessons, and applied resonance. It extends the Resonance Core
            Framework into a living, accessible rhythm — helping you build an
            identity that feels aligned, coherent, and grounded in who
            you&apos;re becoming.
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            TRI is not about quick fixes or surface-level hacks. It&apos;s about
            cultivating a deeper relationship with yourself through resonance —
            learning to listen to the subtle cues of what feels right, and
            building an identity that reflects that resonance in daily life.
          </Typography>
        </section>
      </FadeUp>

      {/* How TRI Works Section */}
      <FadeUp delay={0.2}>
        <section
          style={{
            marginBottom: theme.spacing.xxl,
            padding: theme.spacing.xl,
            borderRadius: theme.borderRadius.container.medium,
            backgroundColor: theme.palette.neutralLighterAlt,
          }}
        >
          <Typography
            variant='h2'
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            How TRI Works
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l,
            }}
          >
            Explore the core pathways designed to help identity become a lived,
            repeatable practice.
          </Typography>

          <div
            className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
            style={{ gap: theme.spacing.l }}
          >
            <FadeUp delay={0.25}>
              <InteractiveCard
                id='micro-lessons'
                title='Micro-Lessons'
                description='Short, practical lessons that translate identity concepts into meaningful daily action.'
                icon='BookStar'
                iconPosition='center'
              />
            </FadeUp>
            <FadeUp delay={0.3}>
              <InteractiveCard
                id='applied-challenges'
                title='Applied Challenges'
                description='Guided challenge formats to build coherence through repetition and embodied reflection.'
                icon='FitPage'
                iconPosition='center'
              />
            </FadeUp>
            <FadeUp delay={0.35}>
              <InteractiveCard
                id='community-integration'
                title='Community Integration'
                description='The collaborative layer where members share reflections, practice resonance, and support one another through change.'
                icon='People'
                iconPosition='center'
              />
            </FadeUp>
          </div>
        </section>
      </FadeUp>

      {/* Latest TRI Content Section */}
      <FadeUp delay={0.4}>
        <section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: theme.spacing.l,
              flexWrap: 'wrap',
              gap: theme.spacing.m,
            }}
          >
            <div>
              <Typography
                variant='h2'
                style={{
                  color: theme.palette.neutralPrimary,
                  marginBottom: theme.spacing.s,
                }}
              >
                Latest TRI Content
              </Typography>
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                }}
              >
                Auto-populated from markdown metadata in the Resonant Identity
                content stream.
              </Typography>
            </div>
            <FormButton
              text='Open TRI Library'
              variant='primary'
              icon='Library'
              iconPosition='left'
              onClick={() => router.push('/podcasts/theresonantid/library')}
            />
          </div>

          <FilteredContentList posts={triPosts} limit={6} />
        </section>
      </FadeUp>
    </UnifiedPageWrapper>
  );
}
