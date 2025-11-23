import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  PortfolioProject,
  PortfolioFrontmatter,
  PortfolioFilters,
} from './types';

const PORTFOLIO_DIRECTORY = path.join(
  process.cwd(),
  'content',
  'portfolio'
);

/**
 * Get all portfolio project slugs
 */
export function getAllPortfolioSlugs(): string[] {
  if (!fs.existsSync(PORTFOLIO_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(PORTFOLIO_DIRECTORY);
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''));
}

/**
 * Get a single portfolio project by slug
 */
export function getPortfolioBySlug(slug: string): PortfolioProject | null {
  try {
    const fullPath = path.join(PORTFOLIO_DIRECTORY, `${slug}.mdx`);
    
    // Try .mdx first, then .md
    let fileContents: string;
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else {
      const mdPath = path.join(PORTFOLIO_DIRECTORY, `${slug}.md`);
      if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, 'utf8');
      } else {
        return null;
      }
    }

    const { data, content } = matter(fileContents);
    const frontmatter = data as PortfolioFrontmatter;

    return {
      slug,
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
      content,
      seoMetadata: {
        title: frontmatter.seoTitle || frontmatter.title,
        description:
          frontmatter.seoDescription || frontmatter.shortDescription,
        keywords: frontmatter.seoKeywords || frontmatter.tags || [],
      },
    };
  } catch (error) {
    console.error(`Error loading portfolio project ${slug}:`, error);
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
    .filter((project): project is PortfolioProject => project !== null);

  // Sort by published date, newest first
  return projects.sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
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
 * Get all unique tags from all projects
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
 * Get all unique technologies from all projects
 */
export function getAllPortfolioTechnologies(): string[] {
  const projects = getAllPortfolioProjects();
  const techSet = new Set<string>();
  
  projects.forEach((project) => {
    project.technologies.forEach((tech) => techSet.add(tech));
  });
  
  return Array.from(techSet).sort();
}
