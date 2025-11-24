import { Metadata } from 'next';
import ContentPageClient from './ContentPageClient';

export const metadata: Metadata = {
  title: 'Content | Fluxline Professional Services',
  description:
    'Explore our collection of blog posts, portfolio projects, and insights on technology, design, and business transformation.',
  openGraph: {
    title: 'Content | Fluxline Professional Services',
    description:
      'Explore our collection of blog posts, portfolio projects, and insights on technology, design, and business transformation.',
  },
};

/**
 * Content Hub Page
 * Server component that renders the content hub client component
 */
export default function ContentPage() {
  return <ContentPageClient />;
}
