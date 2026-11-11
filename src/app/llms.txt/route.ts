import { buildLlmsTxt } from '@/lib/llmsTxt';

// Required for Next.js static export (output: 'export'): rendered once at
// build time and written to out/llms.txt.
export const dynamic = 'force-static';

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
