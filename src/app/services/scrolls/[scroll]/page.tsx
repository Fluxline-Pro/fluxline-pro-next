/**
 * Individual Scroll Detail Page
 * Dynamic route for displaying detailed information about a specific scroll
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllScrolls, getScrollById, categoryLabels } from '../scrollsData';
import { FadeUp } from '@/animations/fade-animations';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 32,
        paddingBottom: 32,
        maxWidth: 896,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {/* Breadcrumbs */}
      <FadeUp>
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}
          aria-label='Breadcrumb'
        >
          <Link
            href='/services'
            style={{ color: 'var(--fx-accent)', textDecoration: 'none' }}
          >
            Services
          </Link>
          <span style={{ color: 'var(--fx-text-muted)' }}>/</span>
          <Link
            href='/services/scrolls'
            style={{ color: 'var(--fx-accent)', textDecoration: 'none' }}
          >
            Scrolls
          </Link>
          <span style={{ color: 'var(--fx-text-muted)' }}>/</span>
          <span style={{ color: 'var(--fx-text-muted)' }}>
            {scroll.title}
          </span>
        </nav>
      </FadeUp>

      {/* Header */}
      <FadeUp delay={0.1}>
        <header
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 4,
                paddingBottom: 4,
                borderRadius: 999,
                backgroundColor: 'color-mix(in srgb, var(--fx-accent) 15%, transparent)',
                color: 'var(--fx-accent)',
              }}
            >
              {categoryLabels[scroll.category] || scroll.category}
            </span>
            <span
              style={{ fontSize: 14, color: 'var(--fx-text-muted)' }}
            >
              {scroll.fileSize}
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
            }}
          >
            {scroll.title}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--fx-text-body)' }}>
            {scroll.description}
          </p>
        </header>
      </FadeUp>

      {/* Metadata */}
      <FadeUp delay={0.2}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            fontSize: 14,
            color: 'var(--fx-text-muted)',
          }}
        >
          <div>
            <strong>Published:</strong> {formatDate(scroll.publishedDate)}
          </div>
          <div>
            <strong>Last Updated:</strong> {formatDate(scroll.lastUpdated)}
          </div>
        </div>
      </FadeUp>

      {/* Tags */}
      {scroll.tags.length > 0 && (
        <FadeUp delay={0.3}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {scroll.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 14,
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 4,
                  paddingBottom: 4,
                  borderRadius: 8,
                  backgroundColor: 'var(--fx-surface-inset)',
                  color: 'var(--fx-text-heading)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </FadeUp>
      )}

      {/* Download Section */}
      <FadeUp delay={0.4}>
        <div
          style={{
            padding: 24,
            borderRadius: 12,
            border: '1px solid var(--fx-border)',
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 16,
              color: 'var(--fx-text-heading)',
            }}
          >
            Download This Scroll
          </h2>
          <p
            style={{ marginBottom: 24, color: 'var(--fx-text-body)' }}
          >
            Access the complete strategic insights document in PDF format. Each
            scroll provides in-depth guidance and frameworks for transformation.
          </p>
          <a
            href={scroll.pdfUrl}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 12,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'filter 0.2s',
              backgroundColor: 'var(--fx-accent)',
              color: 'var(--fx-accent-ink)',
            }}
          >
            Download PDF ({scroll.fileSize})
          </a>
        </div>
      </FadeUp>

      {/* Related Scrolls */}
      <FadeUp delay={0.5}>
        <section style={{ marginTop: 32 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 24,
              color: 'var(--fx-text-heading)',
            }}
          >
            Explore More Scrolls
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link
              href='/services/scrolls'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 12,
                fontWeight: 600,
                border: '1px solid var(--fx-border)',
                textDecoration: 'none',
                transition: 'filter 0.2s',
                color: 'var(--fx-accent)',
              }}
            >
              View All Scrolls
            </Link>
            <Link
              href='/services'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 12,
                fontWeight: 600,
                border: '1px solid var(--fx-border)',
                textDecoration: 'none',
                transition: 'filter 0.2s',
                color: 'var(--fx-accent)',
              }}
            >
              Explore Services
            </Link>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}
