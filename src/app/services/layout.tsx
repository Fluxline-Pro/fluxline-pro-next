import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Fluxline Professional Services',
  description:
    'Strategic consulting, web development, design, personal training, coaching, and transformational frameworks. Modular by design, resonant by nature.',
  keywords:
    'business consulting, web development, brand design, personal training, coaching, leadership development, transformation, strategic planning',
  openGraph: {
    title: 'Services - Fluxline Professional Services',
    description:
      'Strategic consulting, web development, design, personal training, coaching, and transformational frameworks.',
    url: 'https://www.fluxline.pro/services',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.fluxline.pro/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
