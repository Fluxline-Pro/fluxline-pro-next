/**
 * TypeScript type definitions for the Scrolls (White Papers) system
 */

export type ScrollCategory =
  | 'business-strategy'
  | 'development'
  | 'design'
  | 'wellness'
  | 'education'
  | 'coaching';

export interface ScrollItem {
  id: string;
  title: string;
  description: string;
  category: ScrollCategory;
  pdfUrl: string;
  thumbnailUrl?: string;
  fileSize: string;
  downloadCount?: number;
  tags: string[];
  publishedDate: Date;
  lastUpdated: Date;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}
