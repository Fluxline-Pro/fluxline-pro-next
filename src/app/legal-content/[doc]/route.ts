import { content as preorderTerms } from '@/assets/legal/preorder-terms';
import { content as privacyPolicy } from '@/assets/legal/privacy-policy';
import { content as termsOfUse } from '@/assets/legal/terms-of-use';

/**
 * The text of the legal documents a store buyer agrees to at checkout, as
 * small static JSON files (`/legal-content/<doc>.json`), so
 * store.fluxline.pro can show the current, published version in a modal
 * instead of sending the buyer away mid-checkout. Built at export time from
 * the same `src/assets/legal` content the /legal pages render, so the two can
 * never differ. Public, read-only content: staticwebapp.config.json serves
 * these files with `Access-Control-Allow-Origin: *`.
 */

export const dynamic = 'force-static';
export const dynamicParams = false;

const DOCS: Record<string, { title: string; page: string; markdown: string }> = {
  'terms-of-use.json': { title: 'Terms of Use', page: '/legal/terms/', markdown: termsOfUse },
  'preorder-terms.json': { title: 'RCF Preorder Terms', page: '/legal/preorder-terms/', markdown: preorderTerms },
  'privacy-policy.json': { title: 'Privacy Policy', page: '/legal/privacy-policy/', markdown: privacyPolicy },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const entry = DOCS[doc];
  if (!entry) return new Response('Not found', { status: 404 });
  return Response.json(entry);
}
