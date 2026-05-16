# The Resonant Identity Taxonomy System

## Overview

The taxonomy mapping layer provides centralized tag management for all TRI (The Resonant Identity) content. This ensures consistency across filtering, categorization, and content-type detection.

**Key Architecture Decision:**

- **Content Types** - Hardcoded structural tags (Episode Companion, Identity Challenge, etc.)
- **Topics** - Dynamically extracted from blog post tags (any tag that isn't a content type)

## Core Files

### `src/app/podcasts/theresonantid/lib/taxonomy.ts`

The authoritative source for all TRI content categorization.

**Exports:**

- `TAG_GROUPS` - Object containing contentTypes (hardcoded) and topics (empty, use extractTopics())
- `normalizeTag()` - Normalizes tags for comparison (lowercase, trimmed)
- `getContentType()` - Maps tags to content delivery format (article/challenge/demo)
- `extractTopics()` - Filters out content type tags and returns topic tags

## Tag Groups

### Content Types (Hardcoded — Structural)

These are fixed architectural tags that define content delivery format:

- **Episode Companion** - Deep-dive articles paired with podcast episodes
- **Identity Challenge** - 7-day structured challenges for building resonance
- **Interactive Demo** - Interactive tools and exercises
- **Foundations** - Core concepts and framework explanations
- **Deep Dive** - In-depth explorations of specific topics

**⚠️ DO NOT make content types dynamic.** They are structural and part of the TRI architecture.

### Topics (Dynamic — Extracted from Content)

Topics are **NOT hardcoded**. They are dynamically extracted from blog post tags using `extractTopics()`.

**How it works:**

- Creator tags a post with `['Episode Companion', 'Truth', 'Identity Erosion']`
- Content type: `'Episode Companion'` (structural)
- Topics: `['Truth', 'Identity Erosion']` (dynamic)

**Examples of dynamic topics:**

- Truth, Distortion, Perception (Resonance Core Framework concepts)
- The Triad, Somatic Cues, Narrative Cues (Framework elements)
- Shadow Work, Cognitive Drift (new topics invented by creators)
- Any other tag that isn't a content type

**Why dynamic?**

- Topics evolve as the framework grows
- Creators can introduce new concepts without code changes
- No maintenance burden for topic taxonomy
- Topics reflect actual content, not predictions

## Usage

### Importing Taxonomy

```typescript
import {
  TAG_GROUPS,
  normalizeTag,
  getContentType,
  extractTopics,
} from '@/app/podcasts/theresonantid/lib/taxonomy';
```

### Extracting Dynamic Topics

```typescript
// ✅ CORRECT - Extract topics from post tags
const topics = extractTopics([
  'Episode Companion',
  'Truth',
  'Identity Erosion',
]);
// Returns: ['truth', 'identity erosion'] (normalized, content types removed)

// Get all unique topics from multiple posts
const allTopics = new Set<string>();
posts.forEach((post) => {
  const topics = extractTopics(post.tags);
  topics.forEach((topic) => allTopics.add(topic));
});
```

### Filtering by Content Type

```typescript
// ✅ CORRECT - Uses normalized tag comparison
const companionArticles = posts.filter((p) =>
  p.tags.some((tag) => normalizeTag(tag) === normalizeTag('Episode Companion'))
);

// ❌ WRONG - Hardcoded string comparison (case-sensitive, fragile)
const companionArticles = posts.filter((p) =>
  p.tags.includes('Episode Companion')
);
```

### Detecting Content Type

```typescript
const contentType = getContentType(post.tags);
// Returns: 'article' | 'challenge' | 'demo'
```

### Using Tag Groups for Filters (Dynamic Approach)

```typescript
// Extract all available tags dynamically from posts
const availableTags = React.useMemo(() => {
  const allTagsInPosts = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((t) => allTagsInPosts.add(t));
  });

  // Separate content types and topics
  const contentTypes = TAG_GROUPS.contentTypes.filter((ct) =>
    allTagsInPosts.has(ct)
  );

  // Extract topics (any tag that isn't a content type)
  const topicsSet = new Set<string>();
  posts.forEach((post) => {
    const topics = extractTopics(post.tags);
    topics.forEach((normalizedTopic) => {
      // Get original casing from post.tags
      const originalTag = post.tags.find(
        (t) => normalizeTag(t) === normalizedTopic
      );
      if (originalTag) topicsSet.add(originalTag);
    });
  });

  const topics = Array.from(topicsSet).sort();

  // Return content types first, then topics
  return [...contentTypes, ...topics];
}, [posts]);

const filters: FilterConfig[] = [
  {
    type: 'single',
    label: 'Filter by Tag',
    options: [
      { key: '', text: 'All Content' },
      ...allTags.map((tag) => ({ key: tag, text: tag })),
    ],
    value: selectedTag,
    onChange: setSelectedTag,
  },
];
```

## Integration Points

### TRILibraryClient (`/podcasts/theresonantid/library`)

**Uses:** `TAG_GROUPS` for filter options

**Purpose:** Tag-based filtering on the library page

### PodcastListingClient (`/podcasts/theresonantid`)

**Uses:** `normalizeTag()` for content type detection

**Purpose:** Separates posts into Companion Articles, Challenges, and Demos sections

### Future Pages

When creating new TRI content pages (e.g., `/articles`, `/challenges`, `/demos`):

1. Import `TAG_GROUPS` and `getContentType()` from taxonomy
2. Use `normalizeTag()` for all programmatic tag comparisons
3. Never hardcode tag strings outside of display/SEO contexts

## Benefits

✅ **Single source of truth** - Content types defined in one place  
✅ **Dynamic topics** - Topics automatically extracted from content tags  
✅ **Zero maintenance for topics** - Add new topics just by tagging posts  
✅ **Case-insensitive matching** - `normalizeTag()` handles variations  
✅ **Type safety** - TypeScript autocomplete for content types  
✅ **Content routing** - `getContentType()` enables smart routing/filtering  
✅ **Framework evolution** - New concepts appear automatically as content is created

## Best Practices

### DO

- Import from taxonomy for all programmatic tag usage
- Use `normalizeTag()` when comparing tags
- Keep taxonomy.ts as the single source of truth
- Use tag strings directly in SEO metadata and UI labels

### DON'T

- Hardcode tag strings in filtering logic
- Use case-sensitive `.includes()` checks
- Duplicate tag arrays across multiple files
- Modify tags without updating taxonomy.ts

## Example: Adding New Tags

### Adding a New Topic (Automatic — No Code Changes)

Topics are automatically extracted from blog post tags. Just tag your post!

1. **Create blog post with new topic:**

   ```yaml
   ---
   title: 'Understanding Shadow Work'
   category: 'Resonant Identity'
   tags:
     - 'Episode Companion'
     - 'Shadow Work' # ← New topic, automatically detected
     - 'Identity Coherence'
   ---
   ```

2. **That's it!** The topic automatically appears in:
   - Library page filters
   - Tag chips
   - Topic extraction logic

**No code changes required for topics.**

### Adding a New Content Type (Manual — Code Update Required)

Content types are structural and must be added to taxonomy.ts:

1. **Update taxonomy.ts:**

   ```typescript
   export const TAG_GROUPS = {
     contentTypes: [
       'Episode Companion',
       'Identity Challenge',
       'Interactive Demo',
       'Foundations',
       'Deep Dive',
       'Masterclass', // ← Add new content type here
     ],
     topics: [], // Always empty
   };
   ```

2. **Update getContentType() if needed:**

   ```typescript
   export function getContentType(
     tags: string[]
   ): 'article' | 'challenge' | 'demo' | 'masterclass' {
     const normalized = tags.map(normalizeTag);

     if (normalized.includes('episode companion')) return 'article';
     if (normalized.includes('identity challenge')) return 'challenge';
     if (normalized.includes('interactive demo')) return 'demo';
     if (normalized.includes('masterclass')) return 'masterclass'; // ← Add routing

     return 'article';
   }
   ```

3. **Test:** Create blog post with new content type, verify filtering works

## Troubleshooting

**Tags not matching?**  
→ Use `normalizeTag()` for comparison instead of `.includes()`

**Content type not being detected?**  
→ Verify the tag name matches exactly (after normalization) in `TAG_GROUPS.contentTypes`

**New topic not showing in filters?**  
→ Topics are auto-extracted. Just add the tag to a blog post and it will appear automatically.

**Content not appearing in sections?**  
→ Check that the content type tag is correctly spelled in the blog post frontmatter

**How do I remove a topic?**  
→ Topics are dynamic. If you remove a tag from all posts, it automatically disappears from filters.
