/**
 * TypeScript type definitions for the Blog system
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: Date;
  lastUpdated?: Date;
  imageUrl?: string;
  imageAlt?: string;
  tags: string[];
  category: string;
  featured?: boolean;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BlogFilters {
  tags?: string[];
  category?: string;
  featured?: boolean;
  sortBy?: 'date' | 'title';
}
