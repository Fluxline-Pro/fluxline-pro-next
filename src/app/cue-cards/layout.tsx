import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cue Cards',
  description:
    'Reference cards and quick guides for Fluxline methodologies and frameworks.',
  openGraph: {
    title: 'Cue Cards - Fluxline Professional Services',
    description:
      'Reference cards and quick guides for Fluxline methodologies and frameworks.',
    url: 'https://www.fluxline.pro/cue-cards',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  alternates: {
    canonical: '/cue-cards',
  },
};

export default function CueCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
