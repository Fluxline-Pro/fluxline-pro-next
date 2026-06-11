/**
 * Converts a human-readable taxonomy name into a URL-safe slug.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Builds a slug -> display name map from a list of display names.
 * Throws when distinct display names map to the same slug.
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
        `Slug collision: "${existing}" and "${name}" both map to "${slug}". Rename one of these taxonomy terms in content frontmatter.`
      );
    }

    map.set(slug, name);
  }

  return map;
}

/**
 * Resolves a taxonomy slug back to its display name.
 */
export function resolveSlug(
  slug: string,
  displayNames: string[]
): string | undefined {
  return buildSlugMap(displayNames).get(slug);
}
