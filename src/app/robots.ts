import { MetadataRoute } from 'next';
import { isProduction } from '@/lib/environment';

/**
 * Dynamic robots.txt generation
 *
 * - Production (NEXT_PUBLIC_ENVIRONMENT=prod or unset): allows all crawlers,
 *   and names the major search and AI crawlers in one explicit allow group
 *   (OpenAI, Anthropic, Perplexity, Google, Microsoft, Apple, Amazon, Meta,
 *   DuckDuckGo, Mistral, Common Crawl).
 *   A crawler that matches a named group ignores the `*` group, so the named
 *   group repeats the same `disallow` list. `/_next/` and `/static/` stay
 *   crawlable so search engines can fetch the CSS and JS they need to render.
 * - Dev / Test: disallows all crawlers to prevent non-prod content
 *   from being indexed or cited by AI systems.
 */

// Required for Next.js static export (output: 'export')
export const dynamic = 'force-static';

const SITE_URL = process.env.SITE_URL || 'https://www.fluxline.pro';
const isProd = isProduction();

/** Paths no crawler should fetch. Shared by every allow group. */
const DISALLOWED_PATHS = ['/api/'];

/** Search and AI crawlers named explicitly in the production allow group. */
const ALLOWED_CRAWLERS = [
  // OpenAI
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google
  'Googlebot',
  'Google-Extended',
  // Microsoft
  'Bingbot',
  // Apple
  'Applebot',
  'Applebot-Extended',
  // Amazon
  'Amazonbot',
  // Meta
  'Meta-ExternalAgent',
  // DuckDuckGo
  'DuckDuckBot',
  'DuckAssistBot',
  // Mistral
  'MistralAI-User',
  // Common Crawl
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    // Block all crawlers on dev and test environments
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      // Explicitly allow major search and AI crawlers
      {
        userAgent: ALLOWED_CRAWLERS,
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
