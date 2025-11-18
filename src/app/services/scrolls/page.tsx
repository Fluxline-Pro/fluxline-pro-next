/**
 * Scrolls Overview Page
 * Main listing page for all strategic insights and white papers
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { ScrollsGrid } from './components/ScrollsGrid';
import { getAllScrolls } from './scrollsData';

export const metadata: Metadata = {
  title: 'Explore the Scrolls | Fluxline Strategic Insights',
  description:
    'Access our comprehensive collection of strategic insights, white papers, and frameworks covering business strategy, development, design, wellness, education, and transformation.',
  openGraph: {
    title: 'Explore the Scrolls | Fluxline Strategic Insights',
    description:
      'Access our comprehensive collection of strategic insights and white papers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore the Scrolls | Fluxline Strategic Insights',
    description:
      'Access our comprehensive collection of strategic insights and white papers.',
  },
};

export default function ScrollsPage() {
  const scrolls = getAllScrolls();

  return (
    <div className='flex flex-col gap-8 px-4 py-8 md:px-8 md:py-12'>
      {/* Header Section */}
      <header className='flex flex-col gap-4'>
        <h1 className='text-4xl font-bold md:text-5xl'>Explore the Scrolls</h1>
        <p className='text-lg md:text-xl max-w-3xl'>
          Access our comprehensive collection of strategic insights and
          frameworks. Each scroll offers deep-dive guidance on transforming your
          business, craft, or personal practice with intentionality and
          resonance.
        </p>
      </header>

      {/* Scrolls Grid */}
      <ScrollsGrid scrolls={scrolls} />

      {/* Call to Action */}
      <section className='mt-8 p-6 md:p-8 rounded-lg border'>
        <h2 className='text-2xl font-bold mb-4'>Ready to Transform?</h2>
        <p className='mb-6 max-w-2xl'>
          These scrolls are gates—curricula for your evolution. Explore the
          insights that resonate with your current phase and discover frameworks
          designed for sustainable transformation.
        </p>
        <div className='flex flex-wrap gap-4'>
          <Link
            href='/services'
            className='inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors'
            style={{
              backgroundColor: 'var(--themePrimary)',
              color: 'var(--white)',
            }}
          >
            Explore Our Services
          </Link>
          <Link
            href='/contact'
            className='inline-flex items-center px-6 py-3 rounded-lg font-semibold border transition-colors'
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
