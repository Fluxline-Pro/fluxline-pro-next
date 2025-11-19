/**
 * TypeScript type definitions for the Case Studies system
 */

export type ServiceCategory =
  | 'consulting'
  | 'development'
  | 'design'
  | 'training'
  | 'education'
  | 'wellness';

export interface CaseStudyMetric {
  label: string;
  value: string;
  description?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  imageUrl?: string;
  imageAlt?: string;
  services: ServiceCategory[];
  technologies: string[];
  metrics: CaseStudyMetric[];
  featured: boolean;
  publishedDate: Date;
  projectDuration?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface CaseStudyFilters {
  services?: ServiceCategory[];
  industries?: string[];
  featured?: boolean;
  sortBy?: 'date' | 'title' | 'client';
}
