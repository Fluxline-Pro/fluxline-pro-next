import { MetadataRoute } from 'next';
import { getAllBlogPostSlugs } from './blog/lib/blogLoader';
import { getAllPortfolioSlugs } from './portfolio/lib/portfolioLoader';
import { getAllCaseStudySlugs } from './case-studies/lib/caseStudyLoader';
import { getAllPressReleaseIds } from './press-release/lib/pressReleaseLoader';
import { getAllBookSlugs } from './books/lib/bookLoader';
import { SERVICE_CATEGORIES } from './services/constants';
import { isProduction } from '@/lib/environment';

/**
 * AI-Visibility Sitemap
 *
 * Generates a sitemap with explicit priority weighting so AI crawlers
 * (GPTBot, CCBot, PerplexityBot, ClaudeBot) surface the most important
 * Fluxline pages when answering queries about consulting, design, or coaching.
 *
 * Priority guide:
 *   1.0 — Homepage, Service pages, Pricing, the Framework (core offering)
 *   0.9 — Contact (conversion)
 *   0.8 — Blog posts, Portfolio projects, Case studies (authority content)
 *   0.7 — Content hub, Press releases (resource content)
 *   0.6 — Books
 *
 * Only generated for production builds. Returns minimal output for dev/test
 * to avoid seeding AI systems with non-canonical content.
 */

// Required for Next.js static export (output: 'export')
export const dynamic = 'force-static';

const SITE_URL = process.env.SITE_URL || 'https://www.fluxline.pro';
const isProd = isProduction();

// Use a stable "last modified" date anchored to the build so every static
// page in the same build shares the same lastmod value.
const BUILD_DATE = new Date().toISOString();

function withTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProd) {
    // Return a minimal sitemap for non-prod builds so AI systems never
    // index staging/dev content.
    return [
      {
        url: SITE_URL,
        lastModified: BUILD_DATE,
        changeFrequency: 'never',
        priority: 0,
      },
    ];
  }

  // ── Static core pages ─────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      // Starting prices for every offering: a top question for buyers and AI answers.
      url: `${SITE_URL}/pricing`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/content`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/press-release`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/books`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      // The framework itself — what it is, how to work with it, and FAQ.
      url: `${SITE_URL}/resonance-core-framework`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];

  // ── Service detail pages (highest priority after homepage) ─────────────────
  const servicePages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map(
    (service) => ({
      url: `${SITE_URL}${service.path}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    })
  );

  // ── Blog posts ─────────────────────────────────────────────────────────────
  const blogSlugs = getAllBlogPostSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Portfolio projects ─────────────────────────────────────────────────────
  const portfolioSlugs = getAllPortfolioSlugs();
  const portfolioPages: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${SITE_URL}/portfolio/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Case studies ───────────────────────────────────────────────────────────
  const caseStudySlugs = getAllCaseStudySlugs();
  const caseStudyPages: MetadataRoute.Sitemap = caseStudySlugs.map((id) => ({
    url: `${SITE_URL}/case-studies/${id}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ── Press releases and books ───────────────────────────────────────────────
  const pressReleasePages: MetadataRoute.Sitemap = getAllPressReleaseIds().map(
    (id) => ({
      url: `${SITE_URL}/press-release/${id}`,
      lastModified: BUILD_DATE,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })
  );
  const bookPages: MetadataRoute.Sitemap = getAllBookSlugs().map((slug) => ({
    url: `${SITE_URL}/books/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // The export uses `trailingSlash: true`, so the canonical form of every
  // page ends in a slash. Listing that form avoids a redirect hop per URL.
  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...portfolioPages,
    ...caseStudyPages,
    ...pressReleasePages,
    ...bookPages,
  ].map((entry) => ({ ...entry, url: withTrailingSlash(entry.url) }));
}
