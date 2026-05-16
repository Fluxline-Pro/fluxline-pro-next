'use client';

import { useRouter } from 'next/navigation';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { FadeUp } from '@/animations/fade-animations';
import type { BlogPost } from '@/app/blog/types';
import {
  TRILayout,
  HeroSimple,
  SectionHeader,
  ContentSection,
  CardGrid,
  FilteredContentList,
  type CardGridItem,
} from '../components';

/**
 * The Resonant Identity — About/Philosophy Page Client Component
 * Demonstrates the TRI scaffolding system with configurable sections
 */
export function TheResonantIdentityAboutPageClient({
  triPosts,
}: {
  triPosts: BlogPost[];
}) {
  const { theme } = useAppTheme();
  const router = useRouter();

  // Configuration: Hero Section
  const heroConfig = {
    title: 'The Resonant Identity',
    subtitle:
      'A living extension of the Resonance Core Framework where identity becomes practice and is formed through coherence.',
    backArrow: true,
    backArrowPath: '/podcasts/theresonantid',
  };

  // Configuration: How TRI Works Cards
  const triWorksCards: CardGridItem[] = [
    {
      id: 'micro-lessons',
      title: 'Micro-Lessons',
      description:
        'Short, practical lessons that translate identity concepts into meaningful daily action.',
      icon: 'Lightbulb',
      iconPosition: 'center',
    },
    {
      id: 'applied-challenges',
      title: 'Applied Challenges',
      description:
        'Guided challenge formats to build coherence through repetition and embodied reflection.',
      icon: 'FitPage',
      iconPosition: 'center',
    },
    {
      id: 'community-integration',
      title: 'Community Integration',
      description:
        "Collaborative layer where members share reflections and practice resonance to support one another's growth.",
      icon: 'People',
      iconPosition: 'center',
    },
  ];

  return (
    <TRILayout tabletPortraitLayout='side-by-side'>
      {/* Hero Section */}
      <HeroSimple {...heroConfig} animationDelay={0} />

      {/* What is TRI Section */}
      <FadeUp delay={0.1}>
        <ContentSection>
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
        </ContentSection>
      </FadeUp>

      {/* How TRI Works Section */}
      <FadeUp delay={0.2}>
        <ContentSection
          backgroundColor={theme.palette.neutralLighterAlt}
          padding={true}
          borderRadius={true}
        >
          <Typography
            variant='h3'
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.m,
              fontSize: '2.25rem',
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

          <CardGrid
            cards={triWorksCards}
            columns={3}
            animationDelay={0.25}
            animationStagger={0.05}
          />
        </ContentSection>
      </FadeUp>

      {/* Latest TRI Content Section */}
      <FadeUp delay={0.4}>
        <ContentSection>
          <SectionHeader
            title='Latest TRI Content'
            subtitle='Auto-populated from markdown metadata in the Resonant Identity content stream.'
            cta={{
              label: 'Open TRI Library',
              onClick: () => router.push('/podcasts/theresonantid/library'),
              icon: 'Library',
              iconPosition: 'left',
              variant: 'primary',
            }}
          />

          <FilteredContentList posts={triPosts} limit={6} />
        </ContentSection>
      </FadeUp>
    </TRILayout>
  );
}
