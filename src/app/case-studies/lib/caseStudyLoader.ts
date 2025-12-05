import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CaseStudy, ServiceCategory } from '../types';

/**
 * Case Study Loader Utilities
 * Handles reading and parsing markdown case studies from the file system
 */

const CASE_STUDIES_DIRECTORY = path.join(
  process.cwd(),
  'public',
  'case-studies',
  'posts'
);

/**
 * Frontmatter interface matching the Markdown frontmatter structure
 */
export interface CaseStudyFrontmatter {
  title: string;
  client: string;
  industry: string;
  description: string;
  services: ServiceCategory[];
  technologies: string[];
  publishedDate: string;
  projectDuration?: string;
  featured: boolean;
  imageUrl?: string;
  imageAlt?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  metrics?: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

/**
 * Get all case study slugs from the file system
 */
export function getAllCaseStudySlugs(): string[] {
  try {
    if (!fs.existsSync(CASE_STUDIES_DIRECTORY)) {
      console.warn(
        'Case studies directory does not exist:',
        CASE_STUDIES_DIRECTORY
      );
      return [];
    }

    const slugs = fs.readdirSync(CASE_STUDIES_DIRECTORY).filter((item) => {
      const itemPath = path.join(CASE_STUDIES_DIRECTORY, item);
      return fs.statSync(itemPath).isDirectory();
    });

    return slugs;
  } catch (error) {
    console.error('Error reading case study slugs:', error);
    return [];
  }
}

/**
 * Read a single case study by slug/id
 */
export function getCaseStudyById(id: string): CaseStudy | null {
  try {
    const postDirectory = path.join(CASE_STUDIES_DIRECTORY, id);
    const markdownPath = path.join(postDirectory, 'markdown', 'post.md');

    if (!fs.existsSync(markdownPath)) {
      console.warn(`Case study not found: ${markdownPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as CaseStudyFrontmatter;

    // Extract challenge, solution, results from content
    // For now, we'll use the full content and let the component handle it
    const caseStudy: CaseStudy = {
      id: id,
      title: frontmatter.title,
      client: frontmatter.client,
      industry: frontmatter.industry,
      description: frontmatter.description,
      challenge: '', // Will be extracted from content
      solution: '', // Will be extracted from content
      results: '', // Will be extracted from content
      imageUrl: frontmatter.imageUrl,
      imageAlt: frontmatter.imageAlt,
      services: frontmatter.services,
      technologies: frontmatter.technologies,
      metrics: frontmatter.metrics || [],
      featured: frontmatter.featured,
      publishedDate: new Date(frontmatter.publishedDate),
      projectDuration: frontmatter.projectDuration,
      testimonial: frontmatter.testimonial,
      seoMetadata: {
        title: frontmatter.seoTitle,
        description: frontmatter.seoDescription,
        keywords: frontmatter.seoKeywords,
      },
      content: content, // Add full markdown content
    };

    return caseStudy;
  } catch (error) {
    console.error(`Error reading case study ${id}:`, error);
    return null;
  }
}

/**
 * Get all case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  const slugs = getAllCaseStudySlugs();
  const caseStudies = slugs
    .map((slug) => getCaseStudyById(slug))
    .filter((study): study is CaseStudy => study !== null)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  return caseStudies;
}

/**
 * Get featured case studies (top 3)
 */
export function getFeaturedCaseStudies(): CaseStudy[] {
  const caseStudies = getAllCaseStudies();
  return caseStudies
    .filter((study) => study.featured)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    .slice(0, 3);
}

/**
 * Get case studies by service category
 */
export function getCaseStudiesByService(service: string): CaseStudy[] {
  const caseStudies = getAllCaseStudies();
  return caseStudies.filter((study) =>
    study.services.includes(service as ServiceCategory)
  );
}

/**
 * Get case studies by industry
 */
export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  const caseStudies = getAllCaseStudies();
  return caseStudies.filter((study) => study.industry === industry);
}

/**
 * Get all unique services from all case studies
 */
export function getAllServices(): ServiceCategory[] {
  const caseStudies = getAllCaseStudies();
  const servicesSet = new Set<ServiceCategory>();

  caseStudies.forEach((study) => {
    study.services.forEach((service) => servicesSet.add(service));
  });

  return Array.from(servicesSet).sort();
}

/**
 * Get all unique industries from all case studies
 */
export function getAllIndustries(): string[] {
  const caseStudies = getAllCaseStudies();
  const industriesSet = new Set<string>();

  caseStudies.forEach((study) => {
    industriesSet.add(study.industry);
  });

  return Array.from(industriesSet).sort();
}

/**
 * Filter case studies with multiple criteria
 */
export interface CaseStudyFilterOptions {
  service?: string;
  industry?: string;
  featured?: boolean;
}

export function getFilteredCaseStudies(
  options: CaseStudyFilterOptions
): CaseStudy[] {
  let caseStudies = getAllCaseStudies();

  if (options.service) {
    caseStudies = caseStudies.filter((study) =>
      study.services.includes(options.service as ServiceCategory)
    );
  }

  if (options.industry) {
    caseStudies = caseStudies.filter(
      (study) => study.industry === options.industry
    );
  }

  if (options.featured !== undefined) {
    caseStudies = caseStudies.filter(
      (study) => study.featured === options.featured
    );
  }

  return caseStudies;
}
