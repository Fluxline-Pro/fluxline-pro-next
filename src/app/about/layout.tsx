import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Fluxline Professional Services',
  description:
    'Learn about Fluxline: architects of transformative systems, brand experiences, and human-centered technology. Modular by design, resonant by nature.',
  keywords:
    'about Fluxline, mission, vision, values, emotional intelligence, strategic consulting, transformation, modular systems',
  openGraph: {
    title: 'About - Fluxline Professional Services',
    description:
      'Architects of transformative systems, brand experiences, and human-centered technology.',
    url: 'https://www.fluxline.pro/about',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fluxline.pro/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
