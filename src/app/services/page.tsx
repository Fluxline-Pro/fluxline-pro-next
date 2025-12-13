import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Strategic consulting, web development, design, personal training, coaching, and transformational frameworks. Modular by design, resonant by nature.',
  keywords:
    'services, consulting, web development, design, personal training, coaching, strategic planning, business transformation, digital services',
  openGraph: {
    title: 'Services - Fluxline',
    description:
      'Strategic consulting, web development, design, personal training, coaching, and transformational frameworks.',
    url: 'https://www.fluxline.pro/services',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - Fluxline',
    description:
      'Strategic consulting, web development, design, personal training, coaching, and transformational frameworks.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Services Page
 * Displays Fluxline services and offerings
 */
export default function ServicesPage() {
  return <ServicesPageClient />;
}
