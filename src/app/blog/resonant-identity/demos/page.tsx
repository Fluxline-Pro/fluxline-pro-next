import type { Metadata } from 'next';
import type { DemoPost } from '@/app/podcasts/types';
import { getAllGroundingDemos } from './lib/groundingDemosLoader';
import { GroundingDemosPageClient } from './GroundingDemosPageClient';

export const metadata: Metadata = {
  title: 'Grounding Practices & Somatic Demos | The Resonant Identity',
  description:
    'Your toolkit for nervous system regulation and interoceptive awareness, featuring guided grounding practices and TRI demos.',
  keywords:
    'grounding practices, somatic demos, interactive demos, resonant identity, box breathing, diaphragmatic breathing, sensory grounding, TRI',
  openGraph: {
    title: 'Grounding Practices & Somatic Demos — The Resonant Identity',
    description:
      'A calming toolkit of grounding and somatic practices from The Resonant Identity.',
    url: 'https://www.fluxline.pro/blog/resonant-identity/demos',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/TheResonantIdentity_Logo.png',
        width: 2048,
        height: 2048,
        alt: 'Grounding Practices & Somatic Demos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grounding Practices & Somatic Demos — The Resonant Identity',
    description:
      'A guided collection of grounding practices for regulation, safety, and identity work.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/blog/resonant-identity/demos',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GroundingDemosPage() {
  const posts: DemoPost[] = getAllGroundingDemos().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    tags: post.tags,
    publishedDate: post.publishedDate.toISOString(),
    featured: post.isFeatured,
  }));

  return <GroundingDemosPageClient posts={posts} />;
}
