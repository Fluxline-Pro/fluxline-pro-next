/**
 * Taxonomy Slug Utilities
 *
 * Converts human-readable taxonomy terms (tags, categories, technologies) into
 * URL-safe slugs used as route parameters for all taxonomy pages.
 *
 * Slugs are lowercase ASCII with hyphens only, so they are byte-identical
 * whether encoded or not. This removes the encode/decode symmetry dependency
 * between the browser, the Azure edge, and the file system that previously
 * required unencoded display names in generateStaticParams().
 *
 * Display names stay in content frontmatter and are resolved from a slug at
 * build/render time. Slugs are derived, never stored.
 */

/**
 * Converts a human-readable taxonomy name into a URL-safe slug.
 * Deterministic and dependency-free.
 *
 * @example
 * slugify('Personal Growth')  // 'personal-growth'
 * slugify('C# / .NET')        // 'c-net'
 * slugify('Résumé Tips')      // 'resume-tips'
 * slugify('UI/UX')            // 'ui-ux'
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD') // split accented chars into base + diacritic
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // any run of non-alphanumerics -> single hyphen
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

/**
 * Builds a slug -> displayName map from a list of display names.
 *
 * Throws at build time on collision so static generation never silently merges
 * two distinct taxonomy terms into one route. A collision is a content bug;
 * surfacing it at build time is the correct behavior for SSG.
 *
 * @throws if a term produces an empty slug, or if two distinct terms collide.
 */
export function buildSlugMap(displayNames: string[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const name of displayNames) {
    const slug = slugify(name);

    if (!slug) {
      throw new Error(
        `slugify produced an empty slug for taxonomy term "${name}". Rename the term.`
      );
    }

    const existing = map.get(slug);
    if (existing && existing !== name) {
      throw new Error(
        `Slug collision: "${existing}" and "${name}" both map to "${slug}". ` +
          `Rename one of these taxonomy terms in content frontmatter.`
      );
    }

    map.set(slug, name);
  }

  return map;
}

/**
 * Resolves a slug back to its display name, or undefined when no term matches.
 * Pass the full set of display names for the taxonomy family being resolved.
 */
export function resolveSlug(
  slug: string,
  displayNames: string[]
): string | undefined {
  return buildSlugMap(displayNames).get(slug);
}
