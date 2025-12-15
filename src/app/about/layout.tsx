import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Fluxline: architects of transformative systems, brand experiences, and human-centered technology. Modular by design, resonant by nature.',
  openGraph: {
    title: 'About - Fluxline',
    description:
      'Architects of transformative systems, brand experiences, and human-centered technology.',
    url: 'https://www.fluxline.pro/about',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
