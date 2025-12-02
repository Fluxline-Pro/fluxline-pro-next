import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fluxline Ethos',
  description:
    'Explore the Fluxline philosophy: architecting systems that breathe, brands that feel, and legacies that last through curriculum gates of identity, mission, and resonance.',
  openGraph: {
    title:
      'Fluxline Ethos: Architecting Legacy Through Ritual, Resonance & Iteration',
    description:
      'At Fluxline, we architect systems that breathe, brands that feel, and legacies that last. Explore our multidimensional transformation framework.',
    url: 'https://www.fluxline.pro/fluxline-ethos',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Fluxline Ethos: Architecting Legacy Through Ritual, Resonance & Iteration',
    description:
      'At Fluxline, we architect systems that breathe, brands that feel, and legacies that last.',
  },
  alternates: {
    canonical: '/fluxline-ethos',
  },
};

export default function FluxlineEthosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
