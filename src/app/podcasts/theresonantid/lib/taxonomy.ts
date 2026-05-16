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
 * - contentTypes: How content is delivered (format/type)
 * - topics: What content is about (subject matter)
 */
export const TAG_GROUPS = {
  contentTypes: [
    'Episode Companion',
    'Identity Challenge',
    'Interactive Demo',
    'Foundations',
    'Deep Dive',
  ],

  topics: [
    'Truth',
    'Distortion',
    'Perception',
    'Interpretive Hygiene',
    'The Triad',
    'Resonance & Dissonance',
    'Identity Coherence',
    'Identity Erosion',
    'Agency',
    'Somatic Cues',
    'Narrative Cues',
    'Emotional Cues',
  ],
};

/**
 * Normalize tags for internal use
 * Converts tags to lowercase and trims whitespace for consistent comparison
 */
export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
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
