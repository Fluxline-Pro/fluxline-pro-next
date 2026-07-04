'use client';

import { useRouter } from 'next/navigation';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxButton from '@/theme/components/dsm/FxButton';
import { FadeUp } from '@/animations/fade-animations';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import type { TRIPost } from '../../types';
import {
  TRILayout,
  HeroSimple,
  SectionHeader,
  ContentSection,
  CardGrid,
  FilteredContentList,
  EpisodeModal,
  useTRILatestEpisode,
  type CardGridItem,
} from '../TRI';
import { Divider } from '../TRI/Divider';

/**
 * The Resonant Identity -- About/Philosophy Page Client Component
 * Demonstrates the TRI scaffolding system with configurable sections
 */
export function TheResonantIdentityAboutPageClient({
  triPosts,
}: {
  triPosts: TRIPost[];
}) {
  const router = useRouter();
  const isMobileHook = useIsMobile();
  const isMobile = isMobileHook;

  const {
    latestEpisode,
    episodesLoading,
    selectedEpisode,
    setSelectedEpisode,
  } = useTRILatestEpisode();

  // Configuration: Hero Section
  const heroConfig = {
    title: 'The Resonant Identity',
    subtitle:
      'A living extension of The Resonance Core Framework where identity becomes practice and is formed through coherence.',
    description:
      "Explore micro-lessons, applied challenges, and a supportive community to help you build an identity that feels aligned and grounded in who you're becoming.",
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
    <>
      <TRILayout tabletPortraitLayout='side-by-side'>
        {/* Hero Section */}
        <HeroSimple
          {...heroConfig}
          isMobile={isMobile}
          animationDelay={0}
          latestEpisode={latestEpisode}
          onPlayLatestEpisode={() =>
            latestEpisode && setSelectedEpisode(latestEpisode)
          }
          episodesLoading={episodesLoading}
        />

        {/* What is TRI Section */}
        <FadeUp delay={0.1}>
          <Divider top />
          <ContentSection>
            <SectionHeader
              isMobile={isMobile}
              title='What is The Resonant Identity?'
              style={{ marginBottom: '0.625rem' }}
            />
            <p
              style={{
                color: 'var(--fx-text-body)',
                marginBottom: 12,
                lineHeight: 'var(--fx-body-leading)',
                fontSize: 'var(--fx-body-size)',
              }}
            >
              The Resonant Identity (TRI) is a space for identity
              transformation, micro-lessons, and applied resonance. It extends
              The Resonance Core Framework into a living, accessible rhythm --
              helping you build an identity that feels aligned, coherent, and
              grounded in who you&apos;re becoming.
            </p>
            <p
              style={{
                color: 'var(--fx-text-body)',
                lineHeight: 'var(--fx-body-leading)',
                fontSize: 'var(--fx-body-size)',
              }}
            >
              TRI is not about quick fixes or surface-level hacks. It&apos;s
              about cultivating a deeper relationship with yourself through
              resonance -- learning to listen to the subtle cues of what feels
              right, and building an identity that reflects that resonance in
              daily life.
            </p>
          </ContentSection>
          <Divider bottom />
        </FadeUp>

        {/* How TRI Works Section */}
        <FadeUp delay={0.2}>
          <ContentSection
            backgroundColor='var(--fx-surface-card)'
            padding
            borderRadius
            isWithinCta
            isMobile={isMobile}
          >
            <SectionHeader
              title='How TRI Works'
              subtitle='Explore the core pathways designed to help identity become a lived, repeatable practice.'
              isMobile={isMobile}
              isWithinCta
              style={{ marginBottom: 12, marginTop: 0 }}
            />

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
          <Divider top />
          <ContentSection>
            <SectionHeader
              isMobile={isMobile}
              title='Latest TRI Content'
              subtitle='Auto-populated from markdown metadata in the Resonant Identity content stream.'
              cta={{
                label: 'Explore the Full Library',
                onClick: () => router.push('/podcasts/theresonantid/library'),
                icon: 'Library',
                iconPosition: 'left',
                variant: 'primary',
              }}
            />
            <div style={{ marginTop: 32 }} />
            <FilteredContentList posts={triPosts} limit={6} />
          </ContentSection>
        </FadeUp>
      </TRILayout>

      {selectedEpisode && (
        <EpisodeModal
          episode={selectedEpisode}
          onDismiss={() => setSelectedEpisode(null)}
        />
      )}
    </>
  );
}
