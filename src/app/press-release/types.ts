/**
 * Press Release Types
 * Type definitions for the press release system
 */

/**
 * Press Release Image for gallery/carousel
 */
export interface PressReleaseImage {
  url: string;
  alt: string;
  caption?: string;
}

/**
 * Press Release Interface
 * Matches the structure of markdown-based press releases
 */
export interface PressRelease {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  author: string;
  publishedDate: Date;
  lastUpdated?: Date;
  imageUrl?: string;
  imageAlt?: string;
  gallery?: PressReleaseImage[];
  category: string;
  tags: string[];
  glyphTag?: string;
  emotionalCue?: string;
  seoMetadata?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/**
 * SEO Metadata for press releases
 */
export interface PressReleaseSEO {
  title: string;
  description: string;
  keywords: string[];
}
