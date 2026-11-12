/**
 * TypeScript type definitions for the Cue Cards system
 * Cue cards summarize key archetypes, mantras, and actions for Fluxline's mythic curriculum.
 */

/**
 * Categories for cue cards - aligned with Fluxline services and offerings
 */
export type CueCardCategory =
  | 'personal-training'
  | 'wellness'
  | 'coaching'
  | 'development'
  | 'design'
  | 'consulting'
  | 'transformation';

/**
 * Interface for cue card data
 * Represents an individual cue card with archetype, mantra, and action components
 */
export interface CueCardItem {
  /** Unique identifier for the cue card */
  id: string;
  /** Icon or symbol (emoji or text glyph) */
  icon?: string;
  /** Title or archetype name */
  title: string;
  /** Short mantra or invocation phrase */
  mantra: string;
  /** Action prompt - one clear step or ritual */
  action: string;
  /** Emotional overlay or mythic frame description */
  overlay: string;
  /** Category for filtering and organization */
  category: CueCardCategory;
  /** Optional link URL */
  link?: string;
  /** Optional link text (defaults to "Learn More") */
  linkText?: string;
  /** Optional tags for additional filtering */
  tags?: string[];
  /** Publication date */
  publishedDate: Date;
  /** Whether the card is featured */
  featured?: boolean;
  /** SEO metadata for the cue card */
  seoMetadata?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/**
 * Filters for cue card listing
 */
export interface CueCardFilters {
  category?: CueCardCategory[];
  tags?: string[];
  featured?: boolean;
}
