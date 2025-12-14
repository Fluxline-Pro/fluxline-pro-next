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
<<<<<<< HEAD
    title: 'Strategic Scrolls & White Papers - Fluxline',
    description:
      'Comprehensive collection of strategic insights and frameworks for sustainable business transformation.',
    url: 'https://www.fluxline.pro/services/scrolls',
    siteName: 'Fluxline',
=======
    title: 'Strategic Scrolls & White Papers - Fluxline Professional Services',
    description:
      'Comprehensive collection of strategic insights and frameworks for sustainable business transformation.',
    url: 'https://www.fluxline.pro/services/scrolls',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
<<<<<<< HEAD
    title: 'Strategic Scrolls & White Papers - Fluxline',
    description:
      'Comprehensive collection of strategic insights and frameworks for sustainable business transformation.',
    creator: '@fluxlinepro',
=======
    title: 'Strategic Scrolls & White Papers - Fluxline Professional Services',
    description:
      'Comprehensive collection of strategic insights and frameworks for sustainable business transformation.',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
  },
  alternates: {
    canonical: '/services/scrolls',
  },
};

export default function ScrollsLayout({ children }: { children: ReactNode }) {
  return <div className='scrolls-layout'>{children}</div>;
}
