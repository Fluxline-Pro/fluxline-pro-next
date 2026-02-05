/**
 * Tag Utilities
 * Handles tag normalization, matching, and validation
 */

/**
 * Normalizes a tag for comparison by removing spaces and converting to lowercase
 * @param tag - The tag to normalize
 * @returns Normalized tag string
 *
 * @example
 * normalizeTag("Personal Growth") // "personalgrowth"
 * normalizeTag("PersonalGrowth") // "personalgrowth"
 * normalizeTag("personal-growth") // "personal-growth"
 */
export function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '');
}

/**
 * Checks if two tags match when normalized
 * @param tag1 - First tag
 * @param tag2 - Second tag
 * @returns True if tags match when normalized
 *
 * @example
 * tagsMatch("Personal Growth", "PersonalGrowth") // true
 * tagsMatch("Personal Growth", "personal growth") // true
 * tagsMatch("Personal Growth", "Different Tag") // false
 */
export function tagsMatch(tag1: string, tag2: string): boolean {
  return normalizeTag(tag1) === normalizeTag(tag2);
}

/**
 * Finds a tag from a list that matches the search tag (case and space insensitive)
 * @param searchTag - The tag to search for
 * @param tags - Array of tags to search in
 * @returns The matching tag from the array, or undefined if not found
 *
 * @example
 * findMatchingTag("personalgrowth", ["Personal Growth", "Tech"]) // "Personal Growth"
 * findMatchingTag("Personal Growth", ["PersonalGrowth", "Tech"]) // "PersonalGrowth"
 */
export function findMatchingTag(
  searchTag: string,
  tags: string[]
): string | undefined {
  const normalizedSearch = normalizeTag(searchTag);
  return tags.find((tag) => normalizeTag(tag) === normalizedSearch);
}

/**
 * Validates a tag array for potential duplicates (different formatting of same tag)
 * @param tags - Array of tags to validate
 * @returns Object with validation results
 *
 * @example
 * validateTags(["Personal Growth", "PersonalGrowth", "Tech"])
 * // { isValid: false, duplicates: [{ tag: "Personal Growth", matches: ["PersonalGrowth"] }] }
 */
export function validateTags(tags: string[]): {
  isValid: boolean;
  duplicates: Array<{ tag: string; matches: string[] }>;
} {
  const duplicates: Array<{ tag: string; matches: string[] }> = [];
  const seen = new Map<string, string>();

  for (const tag of tags) {
    const normalized = normalizeTag(tag);

    if (seen.has(normalized)) {
      const original = seen.get(normalized)!;
      // Find if we already have a duplicate entry for this normalized tag
      const existing = duplicates.find(
        (d) => normalizeTag(d.tag) === normalized
      );

      if (existing) {
        existing.matches.push(tag);
      } else {
        duplicates.push({
          tag: original,
          matches: [tag],
        });
      }
    } else {
      seen.set(normalized, tag);
    }
  }

  return {
    isValid: duplicates.length === 0,
    duplicates,
  };
}

/**
 * Suggests a consistent tag format
 * Enforces title case with spaces for readability
 *
 * @param tag - The tag to format
 * @returns Formatted tag
 *
 * @example
 * formatTag("personal growth") // "Personal Growth"
 * formatTag("PERSONAL-GROWTH") // "Personal Growth"
 * formatTag("personalGrowth") // "Personal Growth"
 * formatTag("XMLParser") // "XML Parser"
 * formatTag("HTTPSConnection") // "Https Connection"
 */
export function formatTag(tag: string): string {
  // Convert camelCase and handle acronyms to space-separated
  const withSpaces = tag
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Handle lowercase to uppercase (camelCase)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // Handle acronyms (XMLParser → XML Parser)
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Convert to title case
  return withSpaces
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
