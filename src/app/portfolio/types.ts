/**
 * TypeScript type definitions for the Portfolio system
 */

export type TechnologyCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'mobile'
  | 'devops'
  | 'design'
  | 'ai-ml'
  | 'other';

export type ProjectCategory =
  | 'web-application'
  | 'mobile-app'
  | 'enterprise-software'
  | 'e-commerce'
  | 'education'
  | 'healthcare'
  | 'fintech'
  | 'saas'
  | 'portfolio-site'
  | 'other';

export interface PortfolioImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  role: string;
  client?: string;
  category: ProjectCategory;
  tags: string[];
  technologies: string[];
  featuredImage: PortfolioImage;
  gallery?: PortfolioImage[];
  publishedDate: Date;
  projectDate?: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  content: string; // MDX content
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface PortfolioFilters {
  categories?: ProjectCategory[];
  tags?: string[];
  technologies?: string[];
  featured?: boolean;
  sortBy?: 'date' | 'title';
}

export interface PortfolioFrontmatter {
  title: string;
  shortDescription: string;
  longDescription?: string;
  role: string;
  client?: string;
  category: ProjectCategory;
  tags: string[];
  technologies: string[];
  featuredImage: {
    url: string;
    alt: string;
  };
  gallery?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  publishedDate: string;
  projectDate?: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
