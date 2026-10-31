import type { Metadata } from 'next';
import HomeClient from './HomeClient';

const TITLE =
  'Fluxline Resonance Group | Consulting, Coaching & The Resonance Core Framework™';
const DESCRIPTION =
  'Fluxline Resonance Group offers consulting, coaching, and identity systems work through The Resonance Core Framework™ — helping founders, leaders, and creatives build congruence between who they are and what they build.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'Fluxline Resonance Group',
    'The Resonance Core Framework',
    'RCF',
    'identity alignment coaching',
    'leadership coaching',
    'coaching for founders and leaders',
    'decision-making framework',
    'Behavioral Gravity',
    'Identity Coherence',
    'Window of Choice',
    'DRIVE Model',
    'The Decision Integrity Index',
    'business strategy consulting',
    'brand and experience design',
    'web development and digital architecture',
    'content ecosystem design',
    'personal training and wellness',
    'Terence Waters',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.fluxline.pro/',
    siteName: 'Fluxline Resonance Group',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Resonance Group Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/FluxlineLogo.png'],
    creator: '@fluxlineco',
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeClient />;
}
