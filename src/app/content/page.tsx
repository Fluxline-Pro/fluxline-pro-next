import { Metadata } from 'next';
import ContentPageClient from './ContentPageClient';

export const metadata: Metadata = {
  title: 'Content',
  description:
    'Explore our collection of blog posts, portfolio projects, and insights on technology, design, and business transformation.',
  openGraph: {
    title: 'Content',
    description:
      'Explore our collection of blog posts, portfolio projects, and insights on technology, design, and business transformation.',
    url: 'https://www.fluxline.pro/content',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/content',
  },
};

/**
 * Content Hub Page
 * Server component that renders the content hub client component
 */
export default function ContentPage() {
  return <ContentPageClient />;
}
