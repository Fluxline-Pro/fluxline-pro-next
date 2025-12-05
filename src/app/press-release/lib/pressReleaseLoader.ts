import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PressRelease } from '../types';

/**
 * Press Release Loader Utilities
 * Handles reading and parsing markdown press releases from the file system
 */

const PRESS_RELEASE_DIRECTORY = path.join(
  process.cwd(),
  'public',
  'press-release',
  'posts'
);

/**
 * Frontmatter interface matching the Markdown frontmatter structure
 */
interface PressReleaseFrontmatter {
  title: string;
  subtitle?: string;
  description: string;
  author: string;
  publishedDate: string;
  lastUpdated?: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  imageAlt?: string;
  gallery?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  glyphTag?: string;
  emotionalCue?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

/**
 * Get all press release IDs from the file system
 */
export function getAllPressReleaseIds(): string[] {
  try {
    if (!fs.existsSync(PRESS_RELEASE_DIRECTORY)) {
      console.warn(
        'Press release directory does not exist:',
        PRESS_RELEASE_DIRECTORY
      );
      return [];
    }

    const ids = fs.readdirSync(PRESS_RELEASE_DIRECTORY).filter((item) => {
      const itemPath = path.join(PRESS_RELEASE_DIRECTORY, item);
      return fs.statSync(itemPath).isDirectory();
    });

    return ids;
  } catch (error) {
    console.error('Error reading press release IDs:', error);
    return [];
  }
}

/**
 * Read a single press release by ID
 */
export function getPressReleaseById(id: string): PressRelease | null {
  try {
    const releaseDirectory = path.join(PRESS_RELEASE_DIRECTORY, id);
    const markdownPath = path.join(releaseDirectory, 'markdown', 'release.md');

    if (!fs.existsSync(markdownPath)) {
      console.warn(`Press release not found: ${markdownPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as PressReleaseFrontmatter;

    // Convert to PressRelease format
    const pressRelease: PressRelease = {
      id: id,
      title: frontmatter.title,
      subtitle: frontmatter.subtitle,
      description: frontmatter.description,
      content: content,
      author: frontmatter.author,
      publishedDate: new Date(frontmatter.publishedDate),
      lastUpdated: frontmatter.lastUpdated
        ? new Date(frontmatter.lastUpdated)
        : undefined,
      imageUrl: frontmatter.imageUrl,
      imageAlt: frontmatter.imageAlt,
      gallery: frontmatter.gallery?.map((img) => ({
        url: img.url,
        alt: img.alt,
        caption: img.caption,
      })),
      category: frontmatter.category,
      tags: frontmatter.tags,
      glyphTag: frontmatter.glyphTag,
      emotionalCue: frontmatter.emotionalCue,
      seoMetadata: {
        title: frontmatter.seoTitle,
        description: frontmatter.seoDescription,
        keywords: frontmatter.seoKeywords,
      },
    };

    return pressRelease;
  } catch (error) {
    console.error(`Error reading press release ${id}:`, error);
    return null;
  }
}

/**
 * Get all press releases sorted by date (newest first)
 */
export function getAllPressReleases(): PressRelease[] {
  const ids = getAllPressReleaseIds();
  const releases = ids
    .map((id) => getPressReleaseById(id))
    .filter((release): release is PressRelease => release !== null)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  return releases;
}

/**
 * Get all unique categories from all press releases
 */
export function getAllCategories(): string[] {
  const releases = getAllPressReleases();
  const categoriesSet = new Set<string>();

  releases.forEach((release) => {
    categoriesSet.add(release.category);
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Get all unique tags from all press releases
 */
export function getAllTags(): string[] {
  const releases = getAllPressReleases();
  const tagsSet = new Set<string>();

  releases.forEach((release) => {
    release.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get all unique years from all press releases
 */
export function getAllYears(): number[] {
  const releases = getAllPressReleases();
  const yearsSet = new Set<number>();

  releases.forEach((release) => {
    yearsSet.add(release.publishedDate.getFullYear());
  });

  return Array.from(yearsSet).sort((a, b) => b - a);
}

/**
 * Filter press releases by category
 */
export function getPressReleasesByCategory(category: string): PressRelease[] {
  const releases = getAllPressReleases();
  return releases.filter((release) => release.category === category);
}

/**
 * Filter press releases by year
 */
export function getPressReleasesByYear(year: number): PressRelease[] {
  const releases = getAllPressReleases();
  return releases.filter(
    (release) => release.publishedDate.getFullYear() === year
  );
}

/**
 * Filter press releases by tag
 */
export function getPressReleasesByTag(tag: string): PressRelease[] {
  const releases = getAllPressReleases();
  return releases.filter((release) => release.tags.includes(tag));
}

/**
 * Filter press releases with multiple criteria
 */
export interface PressReleaseFilterOptions {
  category?: string;
  tag?: string;
  year?: number;
}

export function getFilteredPressReleases(
  options: PressReleaseFilterOptions
): PressRelease[] {
  let releases = getAllPressReleases();

  if (options.category) {
    releases = releases.filter(
      (release) => release.category === options.category
    );
  }

  if (options.tag) {
    releases = releases.filter((release) =>
      release.tags.includes(options.tag!)
    );
  }

  if (options.year) {
    releases = releases.filter(
      (release) => release.publishedDate.getFullYear() === options.year
    );
  }

  return releases;
}
