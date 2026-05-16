/**
 * taxonomy.ts
 * Core taxonomy mapping layer for The Resonant Identity
 *
 * This module defines the authoritative tag groups and provides
 * normalization/detection functions for TRI content categorization.
 */

/**
 * TAG_GROUPS
 * Defines the two main tag taxonomies for TRI content:
 * - contentTypes: How content is delivered (format/type) — HARDCODED & STRUCTURAL
 * - topics: What content is about (subject matter) — DYNAMIC (extracted from tags)
 */
export const TAG_GROUPS = {
  /**
   * Content types are hardcoded structural tags that define delivery format.
   * These are part of the TRI architecture and should NOT be dynamic.
   */
  contentTypes: [
    'Episode Companion',
    'Identity Challenge',
    'Interactive Demo',
    'Foundations',
    'Deep Dive',
  ],

  /**
   * Topics are dynamic and extracted from actual blog post tags.
   * Any tag that isn't a content type becomes a topic.
   * Use extractTopics() to derive topics from a post's tags.
   */
  topics: [],
};

/**
 * Normalize tags for internal use
 * Converts tags to lowercase and trims whitespace for consistent comparison
 */
export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

/**
 * Extract dynamic topics from tags
 * Removes content-type tags and returns normalized topic tags.
 * Any tag that isn't a structural content type becomes a topic.
 *
 * @param tags - Array of tags from blog post frontmatter
 * @returns Array of topic tags (excluding content types)
 *
 * @example
 * extractTopics(['Episode Companion', 'Truth', 'Identity Erosion'])
 * // Returns: ['truth', 'identity erosion']
 *
 * extractTopics(['Interactive Demo', 'Shadow Work', 'Cognitive Drift'])
 * // Returns: ['shadow work', 'cognitive drift']
 */
export function extractTopics(tags: string[]): string[] {
  const normalized = tags.map(normalizeTag);
  const contentTypeTags = TAG_GROUPS.contentTypes.map(normalizeTag);

  return normalized.filter((tag) => !contentTypeTags.includes(tag));
}

/**
 * Detect content type based on tags
 * Maps blog post tags to content delivery format
 *
 * @param tags - Array of tags from blog post frontmatter
 * @returns Content type: "article" | "challenge" | "demo"
 */
export function getContentType(
  tags: string[]
): 'article' | 'challenge' | 'demo' {
  const normalized = tags.map(normalizeTag);

  if (normalized.includes('episode companion')) return 'article';
  if (normalized.includes('identity challenge')) return 'challenge';
  if (normalized.includes('interactive demo')) return 'demo';

  return 'article'; // default fallback
}
