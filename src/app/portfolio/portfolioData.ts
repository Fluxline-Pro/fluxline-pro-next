/**
 * Portfolio Data Interface
 * Provides unified interface for portfolio projects from file system
 * Automatically loads markdown projects from public/portfolio/posts/[slug]/markdown/post.md
 * Mirrors the blog data pattern for consistency
 */

import { PortfolioProject, PortfolioFilters } from './types';

// Conditional import of file system loader (only on server)
let fileSystemLoader: typeof import('./lib/portfolioLoader') | null = null;
if (typeof window === 'undefined') {
  try {
    fileSystemLoader = require('./lib/portfolioLoader');
  } catch (error) {
    console.warn('Could not load file system portfolio loader:', error);
  }
}

/**
 * Empty array - all portfolio projects now loaded from file system
 * This maintains backward compatibility but no longer contains any mock data
 */
const portfolioProjectsLegacy: PortfolioProject[] = [];

/**
 * Check if we're in a build/server environment where we can access the file system
 */
const canUseFileSystem =
  typeof window === 'undefined' && fileSystemLoader !== null;

/**
 * Get all portfolio projects (from file system)
 */
export function getAllPortfolioProjects(): PortfolioProject[] {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const projects = fileSystemLoader.getAllPortfolioProjects();
      return projects.length > 0 ? projects : portfolioProjectsLegacy;
    } catch (error) {
      console.warn('Error loading portfolio projects from file system:', error);
      return portfolioProjectsLegacy;
    }
  }
  return portfolioProjectsLegacy;
}

/**
 * Get a single portfolio project by slug
 */
export function getPortfolioBySlug(slug: string): PortfolioProject | null {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const project = fileSystemLoader.getPortfolioBySlug(slug);
      return (
        project ?? portfolioProjectsLegacy.find((p) => p.slug === slug) ?? null
      );
    } catch (error) {
      console.warn(
        `Error loading portfolio project ${slug} from file system:`,
        error
      );
      return portfolioProjectsLegacy.find((p) => p.slug === slug) ?? null;
    }
  }
  return portfolioProjectsLegacy.find((p) => p.slug === slug) ?? null;
}

/**
 * Get all unique tags from all projects
 */
export function getAllPortfolioTags(): string[] {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const tags = fileSystemLoader.getAllPortfolioTags();
      if (tags.length > 0) return tags;
    } catch (error) {
      console.warn('Error getting portfolio tags from file system:', error);
    }
  }

  const tags = new Set<string>();
  portfolioProjectsLegacy.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all unique technologies from all projects
 */
export function getAllPortfolioTechnologies(): string[] {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const technologies = fileSystemLoader.getAllPortfolioTechnologies();
      if (technologies.length > 0) return technologies;
    } catch (error) {
      console.warn(
        'Error getting portfolio technologies from file system:',
        error
      );
    }
  }

  const techSet = new Set<string>();
  portfolioProjectsLegacy.forEach((project) => {
    project.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

/**
 * Get all unique categories from all projects
 */
export function getAllPortfolioCategories(): string[] {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const categories = fileSystemLoader.getAllPortfolioCategories();
      if (categories.length > 0) return categories;
    } catch (error) {
      console.warn(
        'Error getting portfolio categories from file system:',
        error
      );
    }
  }

  const categoriesSet = new Set<string>();
  portfolioProjectsLegacy.forEach((project) => {
    categoriesSet.add(project.category);
  });
  return Array.from(categoriesSet).sort();
}

/**
 * Get featured portfolio projects
 */
export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  return getAllPortfolioProjects().filter((project) => project.featured);
}

/**
 * Filter portfolio projects
 */
export function filterPortfolioProjects(
  filters: PortfolioFilters
): PortfolioProject[] {
  let projects = getAllPortfolioProjects();

  if (filters.categories && filters.categories.length > 0) {
    const categories = filters.categories;
    projects = projects.filter((project) =>
      categories.includes(project.category)
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    const tags = filters.tags;
    projects = projects.filter((project) =>
      project.tags.some((tag) => tags.includes(tag))
    );
  }

  if (filters.technologies && filters.technologies.length > 0) {
    const technologies = filters.technologies;
    projects = projects.filter((project) =>
      project.technologies.some((tech) => technologies.includes(tech))
    );
  }

  if (filters.featured !== undefined) {
    projects = projects.filter(
      (project) => project.featured === filters.featured
    );
  }

  // Sort
  if (filters.sortBy === 'title') {
    projects.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default: sort by date (newest first)
    projects.sort(
      (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
    );
  }

  return projects;
}

/**
 * Legacy function names for backward compatibility
 */
export function getAllPortfolioSlugs(): string[] {
  return getAllPortfolioProjects().map((p) => p.slug);
}
