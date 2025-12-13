import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Strategic consulting, web development, design, personal training, coaching, and transformational frameworks. Modular by design, resonant by nature.',
  openGraph: {
    title: 'Services - Fluxline',
    description:
      'Strategic consulting, web development, design, personal training, coaching, and transformational frameworks.',
    url: 'https://www.fluxline.pro/services',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
