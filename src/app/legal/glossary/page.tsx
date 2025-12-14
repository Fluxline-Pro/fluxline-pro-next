import { Metadata } from 'next';
import GlossaryLandingClient from './GlossaryLandingClient';

export const metadata: Metadata = {
  title: 'Glossary of Terms',
  description:
    'Comprehensive glossary covering both mythic architecture terminology and technical/professional terms used by Fluxline Resonance Group.',
  keywords:
    'glossary, terminology, definitions, mythic terms, technical terms, business terms, Fluxline',
  openGraph: {
<<<<<<< HEAD
    title: 'Glossary of Terms - Fluxline Resonance Group',
    description:
      'Comprehensive glossary covering mythic architecture terminology and technical/professional terms.',
    url: 'https://www.fluxline.pro/legal/glossary',
    siteName: 'Fluxline Resonance Group',
=======
    title: 'Glossary of Terms - Fluxline Professional Services',
    description:
      'Comprehensive glossary covering mythic architecture terminology and technical/professional terms.',
    url: 'https://www.fluxline.pro/legal/glossary',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    type: 'website',
  },
  twitter: {
    card: 'summary',
<<<<<<< HEAD
    title: 'Glossary of Terms - Fluxline Resonance Group',
=======
    title: 'Glossary of Terms - Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    description:
      'Comprehensive glossary covering mythic architecture terminology and technical/professional terms.',
  },
  alternates: {
    canonical: '/legal/glossary',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GlossaryPage() {
  return <GlossaryLandingClient />;
}
