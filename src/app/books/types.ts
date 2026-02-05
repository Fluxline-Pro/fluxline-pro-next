/**
 * TypeScript type definitions for the Books system
 */

export type BookFormat = 'hardcover' | 'softcover' | 'ebook' | 'audiobook';
export type BookStatus = 'available' | 'coming-soon' | 'pre-order';

export interface BookImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface BookPrice {
  format: BookFormat;
  price: number;
  currency: string;
  retailer?: string;
  url?: string;
}

export interface BookRetailer {
  name: string;
  url: string;
  formats: BookFormat[];
  icon?: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher?: string;
  publishedDate: Date;
  isbn?: string;
  description: string;
  excerpt: string;
  content: string; // Full markdown content
  coverImageUrl?: string;
  coverImageAlt?: string;
  gallery?: BookImage[];
  category: string;
  tags: string[];
  featured?: boolean;
  status: BookStatus;
  
  // Purchase options
  formats: BookFormat[];
  prices: BookPrice[];
  retailers: BookRetailer[];
  
  // Direct purchase (PDF from Fluxline.pro)
  directPurchaseAvailable: boolean;
  directPurchasePrice?: number;
  includesWorkbook?: boolean;
  workbookPrice?: number;
  bundlePrice?: number;
  
  // Additional metadata
  pageCount?: number;
  language?: string;
  dimensions?: string;
  
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BookFilters {
  category?: string;
  tags?: string[];
  formats?: BookFormat[];
  status?: BookStatus;
  featured?: boolean;
  sortBy?: 'date' | 'title' | 'author';
}
