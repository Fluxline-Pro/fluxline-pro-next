/**
 * Scrolls Layout
 * Layout wrapper for scrolls section with SEO metadata
 */

import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Strategic Scrolls & White Papers',
  description:
    'Access comprehensive strategic insights, frameworks, and white papers. Transform your business with intentional frameworks for sustainable growth.',
  keywords:
    'strategic insights, white papers, business frameworks, transformation guides, strategic planning, Fluxline scrolls',
  openGraph: {
    title: 'Strategic Scrolls & White Papers - Fluxline',
    description:
      'Comprehensive collection of strategic insights and frameworks for sustainable business transformation.',
    url: 'https://www.fluxline.pro/services/scrolls',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strategic Scrolls & White Papers - Fluxline',
    description:
      'Comprehensive collection of strategic insights and frameworks for sustainable business transformation.',
  },
  alternates: {
    canonical: '/services/scrolls',
  },
};

export default function ScrollsLayout({ children }: { children: ReactNode }) {
  return <div className='scrolls-layout'>{children}</div>;
}
