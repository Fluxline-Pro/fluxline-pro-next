/**
 * Individual Scroll Detail Page
 * Dynamic route for displaying detailed information about a specific scroll
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllScrolls, getScrollById, categoryLabels } from '../scrollsData';

// Generate static params for all scrolls
export async function generateStaticParams() {
  const scrolls = getAllScrolls();
  return scrolls.map((scroll) => ({
    scroll: scroll.id,
  }));
}

// Generate metadata for each scroll
export async function generateMetadata({
  params,
}: {
  params: Promise<{ scroll: string }>;
}): Promise<Metadata> {
  const { scroll: scrollId } = await params;
  const scroll = getScrollById(scrollId);

  if (!scroll) {
    return {
      title: 'Scroll Not Found | Fluxline',
    };
  }

  return {
    title: scroll.seoMetadata.title,
    description: scroll.seoMetadata.description,
    keywords: scroll.seoMetadata.keywords,
    openGraph: {
      title: scroll.seoMetadata.title,
      description: scroll.seoMetadata.description,
      type: 'article',
      publishedTime: scroll.publishedDate.toISOString(),
      modifiedTime: scroll.lastUpdated.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: scroll.seoMetadata.title,
      description: scroll.seoMetadata.description,
    },
  };
}

export default async function ScrollDetailPage({
  params,
}: {
  params: Promise<{ scroll: string }>;
}) {
  const { scroll: scrollId } = await params;
  const scroll = getScrollById(scrollId);

  if (!scroll) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className='flex flex-col gap-8 px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto'>
      {/* Breadcrumbs */}
      <nav className='flex items-center gap-2 text-sm' aria-label='Breadcrumb'>
        <Link
          href='/services'
          className='hover:underline'
          style={{ color: 'var(--themePrimary)' }}
        >
          Services
        </Link>
        <span style={{ color: 'var(--neutralSecondary)' }}>/</span>
        <Link
          href='/services/scrolls'
          className='hover:underline'
          style={{ color: 'var(--themePrimary)' }}
        >
          Scrolls
        </Link>
        <span style={{ color: 'var(--neutralSecondary)' }}>/</span>
        <span style={{ color: 'var(--neutralSecondary)' }}>{scroll.title}</span>
      </nav>

      {/* Header */}
      <header className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <span
            className='text-sm font-semibold px-3 py-1 rounded-full'
            style={{
              backgroundColor: 'var(--themeLighter)',
              color: 'var(--themePrimary)',
            }}
          >
            {categoryLabels[scroll.category] || scroll.category}
          </span>
          <span
            className='text-sm'
            style={{ color: 'var(--neutralSecondary)' }}
          >
            {scroll.fileSize}
          </span>
        </div>
        <h1 className='text-4xl font-bold md:text-5xl'>{scroll.title}</h1>
        <p className='text-lg' style={{ color: 'var(--neutralSecondary)' }}>
          {scroll.description}
        </p>
      </header>

      {/* Metadata */}
      <div
        className='flex flex-wrap gap-6 text-sm'
        style={{ color: 'var(--neutralSecondary)' }}
      >
        <div>
          <strong>Published:</strong> {formatDate(scroll.publishedDate)}
        </div>
        <div>
          <strong>Last Updated:</strong> {formatDate(scroll.lastUpdated)}
        </div>
      </div>

      {/* Tags */}
      {scroll.tags.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {scroll.tags.map((tag) => (
            <span
              key={tag}
              className='text-sm px-3 py-1 rounded'
              style={{
                backgroundColor: 'var(--neutralLighter)',
                color: 'var(--neutralPrimary)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Download Section */}
      <div
        className='p-6 rounded-lg border'
        style={{ borderColor: 'var(--neutralLight)' }}
      >
        <h2 className='text-xl font-bold mb-4'>Download This Scroll</h2>
        <p className='mb-6' style={{ color: 'var(--neutralSecondary)' }}>
          Access the complete strategic insights document in PDF format. Each
          scroll provides in-depth guidance and frameworks for transformation.
        </p>
        <a
          href={scroll.pdfUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors'
          style={{
            backgroundColor: 'var(--themePrimary)',
            color: 'var(--white)',
          }}
        >
          Download PDF ({scroll.fileSize})
        </a>
      </div>

      {/* Related Scrolls */}
      <section className='mt-8'>
        <h2 className='text-2xl font-bold mb-6'>Explore More Scrolls</h2>
        <div className='flex flex-wrap gap-4'>
          <Link
            href='/services/scrolls'
            className='inline-flex items-center px-6 py-3 rounded-lg font-semibold border transition-colors'
            style={{
              borderColor: 'var(--neutralLight)',
              color: 'var(--themePrimary)',
            }}
          >
            View All Scrolls
          </Link>
          <Link
            href='/services'
            className='inline-flex items-center px-6 py-3 rounded-lg font-semibold border transition-colors'
            style={{
              borderColor: 'var(--neutralLight)',
              color: 'var(--themePrimary)',
            }}
          >
            Explore Services
          </Link>
        </div>
      </section>
    </div>
  );
}
