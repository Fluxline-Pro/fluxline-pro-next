import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PortfolioProject, PortfolioFrontmatter } from '../types';

/**
 * Portfolio Loader Utilities
 * Handles reading and parsing markdown portfolio projects from the file system
 * Mirrors the blog loader pattern for consistency
 */

const PORTFOLIO_DIRECTORY = path.join(
  process.cwd(),
  'public',
  'portfolio',
  'posts'
);

/**
 * Get all portfolio project slugs from the file system
 */
export function getAllPortfolioSlugs(): string[] {
  try {
    if (!fs.existsSync(PORTFOLIO_DIRECTORY)) {
      console.warn('Portfolio directory does not exist:', PORTFOLIO_DIRECTORY);
      return [];
    }

    const slugs = fs.readdirSync(PORTFOLIO_DIRECTORY).filter((item) => {
      const itemPath = path.join(PORTFOLIO_DIRECTORY, item);
      return fs.statSync(itemPath).isDirectory();
    });

    return slugs;
  } catch (error) {
    console.error('Error reading portfolio slugs:', error);
    return [];
  }
}

/**
 * Read a single portfolio project by slug
 */
export function getPortfolioBySlug(slug: string): PortfolioProject | null {
  try {
    const projectDirectory = path.join(PORTFOLIO_DIRECTORY, slug);
    const markdownPath = path.join(projectDirectory, 'markdown', 'post.md');

    if (!fs.existsSync(markdownPath)) {
      console.warn(`Portfolio project not found: ${markdownPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as PortfolioFrontmatter;

    // Convert to PortfolioProject format
    const project: PortfolioProject = {
      slug: slug,
      title: frontmatter.title,
      shortDescription: frontmatter.shortDescription,
      longDescription: frontmatter.longDescription,
      role: frontmatter.role,
      client: frontmatter.client,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      technologies: frontmatter.technologies || [],
      featuredImage: {
        url: frontmatter.featuredImage.url,
        alt: frontmatter.featuredImage.alt,
      },
      gallery: frontmatter.gallery?.map((img) => ({
        url: img.url,
        alt: img.alt,
        caption: img.caption,
      })),
      publishedDate: new Date(frontmatter.publishedDate),
      projectDate: frontmatter.projectDate,
      featured: frontmatter.featured || false,
      githubUrl: frontmatter.githubUrl,
      liveUrl: frontmatter.liveUrl,
      content: content,
      seoMetadata: {
        title: frontmatter.seoTitle || frontmatter.title,
        description: frontmatter.seoDescription || frontmatter.shortDescription,
        keywords: frontmatter.seoKeywords || frontmatter.tags || [],
      },
    };

    return project;
  } catch (error) {
    console.error(`Error reading portfolio project ${slug}:`, error);
    return null;
  }
}

/**
 * Get all portfolio projects
 */
export function getAllPortfolioProjects(): PortfolioProject[] {
  const slugs = getAllPortfolioSlugs();
  const projects = slugs
    .map((slug) => getPortfolioBySlug(slug))
    .filter((project): project is PortfolioProject => project !== null)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  return projects;
}

/**
 * Get all unique tags from all portfolio projects
 */
export function getAllPortfolioTags(): string[] {
  const projects = getAllPortfolioProjects();
  const tagsSet = new Set<string>();

  projects.forEach((project) => {
    project.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get all unique technologies from all portfolio projects
 */
export function getAllPortfolioTechnologies(): string[] {
  const projects = getAllPortfolioProjects();
  const techSet = new Set<string>();

  projects.forEach((project) => {
    project.technologies.forEach((tech) => techSet.add(tech));
  });

  return Array.from(techSet).sort();
}

/**
 * Get all unique categories from all portfolio projects
 */
export function getAllPortfolioCategories(): string[] {
  const projects = getAllPortfolioProjects();
  const categoriesSet = new Set<string>();

  projects.forEach((project) => {
    categoriesSet.add(project.category);
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Filter portfolio projects by tag
 */
export function getPortfolioByTag(tag: string): PortfolioProject[] {
  const projects = getAllPortfolioProjects();
  return projects.filter((project) => project.tags.includes(tag));
}

/**
 * Filter portfolio projects by technology
 */
export function getPortfolioByTechnology(
  technology: string
): PortfolioProject[] {
  const projects = getAllPortfolioProjects();
  return projects.filter((project) =>
    project.technologies.includes(technology)
  );
}

/**
 * Filter portfolio projects by category
 */
export function getPortfolioByCategory(category: string): PortfolioProject[] {
  const projects = getAllPortfolioProjects();
  return projects.filter((project) => project.category === category);
}

/**
 * Get featured portfolio projects
 */
export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  const projects = getAllPortfolioProjects();
  return projects.filter((project) => project.featured);
}

/**
 * Filter projects with multiple criteria
 */
export interface PortfolioFilterOptions {
  tag?: string;
  technology?: string;
  category?: string;
  featured?: boolean;
}

export function getFilteredPortfolioProjects(
  options: PortfolioFilterOptions
): PortfolioProject[] {
  let projects = getAllPortfolioProjects();

  if (options.tag) {
    projects = projects.filter((project) =>
      project.tags.includes(options.tag!)
    );
  }

  if (options.technology) {
    projects = projects.filter((project) =>
      project.technologies.includes(options.technology!)
    );
  }

  if (options.category) {
    projects = projects.filter(
      (project) => project.category === options.category
    );
  }

  if (options.featured !== undefined) {
    projects = projects.filter(
      (project) => project.featured === options.featured
    );
  }

  return projects;
}
