import { MetadataRoute } from 'next';
import { isProduction } from '@/lib/environment';

/**
 * Dynamic robots.txt generation
 *
 * - Production (NEXT_PUBLIC_ENVIRONMENT=prod or unset): allows all crawlers
 *   including AI bots (GPTBot, CCBot, PerplexityBot, ClaudeBot, etc.)
 * - Dev / Test: disallows all crawlers to prevent non-prod content
 *   from being indexed or cited by AI systems.
 */

// Required for Next.js static export (output: 'export')
export const dynamic = 'force-static';

const SITE_URL = process.env.SITE_URL || 'https://www.fluxline.pro';
const isProd = isProduction();

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
        disallow: ['/api/'],
      },
      // Explicitly allow major AI crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
