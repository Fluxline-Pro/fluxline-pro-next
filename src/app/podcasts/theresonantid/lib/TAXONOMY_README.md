# The Resonant Identity Taxonomy System

## Overview

The taxonomy mapping layer provides centralized tag management for all TRI (The Resonant Identity) content. This ensures consistency across filtering, categorization, and content-type detection.

## Core Files

### `src/app/podcasts/theresonantid/lib/taxonomy.ts`

The authoritative source for all TRI content categorization.

**Exports:**

- `TAG_GROUPS` - Object containing contentTypes and topics arrays
- `normalizeTag()` - Normalizes tags for comparison (lowercase, trimmed)
- `getContentType()` - Maps tags to content delivery format

## Tag Groups

### Content Types (How content is delivered)

- **Episode Companion** - Deep-dive articles paired with podcast episodes
- **Identity Challenge** - 7-day structured challenges for building resonance
- **Interactive Demo** - Interactive tools and exercises
- **Foundations** - Core concepts and framework explanations
- **Deep Dive** - In-depth explorations of specific topics

### Topics (What content is about)

- Truth
- Distortion
- Perception
- Interpretive Hygiene
- The Triad
- Resonance & Dissonance
- Identity Coherence
- Identity Erosion
- Agency
- Somatic Cues
- Narrative Cues
- Emotional Cues

## Usage

### Importing Taxonomy

```typescript
import {
  TAG_GROUPS,
  normalizeTag,
  getContentType,
} from '@/app/podcasts/theresonantid/lib/taxonomy';
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

### Using Tag Groups for Filters

```typescript
const allTags = [...TAG_GROUPS.contentTypes, ...TAG_GROUPS.topics];

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

✅ **Single source of truth** - All tags defined in one place  
✅ **Case-insensitive matching** - `normalizeTag()` handles variations  
✅ **Type safety** - TypeScript autocomplete for tag names  
✅ **Easy maintenance** - Add/edit tags in taxonomy.ts, changes propagate automatically  
✅ **Content routing** - `getContentType()` enables smart routing/filtering

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

## Example: Adding a New Tag

1. **Update taxonomy.ts:**

   ```typescript
   export const TAG_GROUPS = {
     contentTypes: [
       'Episode Companion',
       'Identity Challenge',
       'Interactive Demo',
       'Foundations',
       'Deep Dive',
       'New Content Type', // ← Add here
     ],
     // ...
   };
   ```

2. **No other code changes needed!**
   - Filter dropdowns automatically include the new tag
   - Tag chips automatically render
   - Content detection continues working

3. **Test:** Create blog post with new tag, verify it appears in filters

## Troubleshooting

**Tags not matching?**  
→ Use `normalizeTag()` for comparison instead of `.includes()`

**Content not appearing in sections?**  
→ Verify tag name matches exactly (after normalization) in taxonomy.ts

**New tag not showing in filters?**  
→ Check that posts actually exist with that tag (availableTags only shows tags that have content)
