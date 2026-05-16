import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ContentSection,
  FilteredContentList,
  HeroSimple,
  LargeTileGrid,
  SectionHeader,
  TRILayout,
} from '@/components';

export const metadata: Metadata = {
  title: 'About The Resonant Identity',
  description:
    'The Resonant Identity is a space for identity transformation, micro-lessons, and applied resonance — extending the Resonance Core Framework into a living, accessible practice.',
  keywords:
    'The Resonant Identity, TRI, identity transformation, resonance, micro-lessons, 7-day setup, identity practice, Resonance Core Framework, community, Facebook Group, Terence Waters, Fluxline',
  openGraph: {
    title: 'About The Resonant Identity — Fluxline',
    description:
      'A living extension of the Resonance Core Framework — where identity becomes practice. Explore micro-lessons, the 7-day setup, and the TRI community.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid/about',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/TheResonantIdentity_Logo.png',
        width: 2048,
        height: 2048,
        alt: 'The Resonant Identity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About The Resonant Identity — Fluxline',
    description:
      'A living extension of the Resonance Core Framework — where identity becomes practice.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts/theresonantid/about',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * The Resonant Identity — About/Philosophy Page
 * URL: /podcasts/theresonantid/about
 * Deep dive into the philosophy, frameworks, and community
 */
export default function TheResonantIdentityAboutPage() {
  return (
    <TRILayout>
      <HeroSimple
        title='The Resonant Identity'
        subtitle='A living extension of the Resonance Core Framework where identity becomes practice and is formed through coherence.'
        eyebrow='The Resonant Identity'
        backPath='/podcasts/theresonantid'
        backLabel='Back to Podcast Hub'
      />

      <ContentSection>
        <SectionHeader title='What is The Resonant Identity?' />
        <p className='text-base leading-relaxed text-neutral-600'>
          The Resonant Identity (TRI) is a space for identity transformation,
          micro-lessons, and applied resonance. It extends the Resonance Core
          Framework into a living, accessible rhythm — helping you build an
          identity that feels aligned, coherent, and grounded in who you&apos;re
          becoming.
        </p>
        <p className='mt-4 text-base leading-relaxed text-neutral-600'>
          TRI is not about quick fixes or surface-level hacks. It&apos;s about
          cultivating a deeper relationship with yourself through resonance —
          learning to listen to the subtle cues of what feels right, and
          building an identity that reflects that resonance in daily life.
        </p>
      </ContentSection>

      <ContentSection surface='muted'>
        <SectionHeader
          title='How TRI Works'
          subtitle='Explore the core pathways designed to help identity become a lived, repeatable practice.'
        />
        <LargeTileGrid>
          <article className='rounded-lg border p-5'>
            <h3 className='mb-2 text-lg font-semibold'>Micro-Lessons</h3>
            <p className='text-sm text-gray-600'>
              Short, practical lessons that translate identity concepts into
              meaningful daily action.
            </p>
          </article>
          <article className='rounded-lg border p-5'>
            <h3 className='mb-2 text-lg font-semibold'>Applied Challenges</h3>
            <p className='text-sm text-gray-600'>
              Guided challenge formats to build coherence through repetition and
              embodied reflection.
            </p>
          </article>
          <article className='rounded-lg border p-5'>
            <h3 className='mb-2 text-lg font-semibold'>Community Integration</h3>
            <p className='text-sm text-gray-600'>
              The collaborative layer where members share reflections, practice
              resonance, and support one another through change.
            </p>
          </article>
        </LargeTileGrid>
      </ContentSection>

      <ContentSection>
        <SectionHeader
          title='Latest TRI Content'
          subtitle='Auto-populated from markdown metadata in the Resonant Identity content stream.'
          cta={
            <Link
              href='/podcasts/theresonantid/library'
              className='inline-flex rounded-md border px-4 py-2 text-sm font-medium'
            >
              Open TRI Library
            </Link>
          }
        />
        <FilteredContentList category='Resonant Identity' limit={4} />
      </ContentSection>
    </TRILayout>
  );
}
