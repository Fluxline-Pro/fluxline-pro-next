/**
 * Blog Data Interface
 * Provides unified interface for blog posts from file system or mock data
 * Automatically loads markdown posts from public/blog/posts/[slug]/markdown/post.md
 */

import { BlogPost } from './types';

// Conditional import of file system loader (only on server)
let fileSystemLoader: typeof import('./lib/blogLoader') | null = null;
if (typeof window === 'undefined') {
  try {
    fileSystemLoader = require('./lib/blogLoader');
  } catch (error) {
    console.warn('Could not load file system blog loader:', error);
  }
}

/**
 * Empty array - all blog posts now loaded from file system
 * This maintains backward compatibility but no longer contains any mock data
 */
const blogPostsMockDataLegacy: BlogPost[] = [];

/**
 * Check if we're in a build/server environment where we can access the file system
 */
const canUseFileSystem =
  typeof window === 'undefined' && fileSystemLoader !== null;

/**
 * Get all blog posts (from file system or fallback to mock data)
 * Exported as blogPostsMockData for backward compatibility
 */
export const blogPostsMockData: BlogPost[] =
  canUseFileSystem && fileSystemLoader
    ? (() => {
        try {
          const posts = fileSystemLoader.getAllBlogPosts();
          return posts.length > 0 ? posts : blogPostsMockDataLegacy;
        } catch (error) {
          console.warn(
            'Error loading blog posts from file system, using mock data:',
            error
          );
          return blogPostsMockDataLegacy;
        }
      })()
    : blogPostsMockDataLegacy;

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const post = fileSystemLoader.getBlogPostBySlug(slug);
      return post ?? blogPostsMockDataLegacy.find((p) => p.slug === slug);
    } catch (error) {
      console.warn(`Error loading blog post ${slug} from file system:`, error);
      return blogPostsMockDataLegacy.find((p) => p.slug === slug);
    }
  }
  return blogPostsMockDataLegacy.find((p) => p.slug === slug);
}

/**
 * Get all blog posts
 */
export function getBlogPosts(filters?: {
  tag?: string;
  category?: string;
}): BlogPost[] {
  let posts = [...blogPostsMockData];

  if (filters?.tag) {
    const tag = filters.tag;
    posts = posts.filter((post) => post.tags.includes(tag));
  }

  if (filters?.category) {
    posts = posts.filter((post) => post.category === filters.category);
  }

  return posts.sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
}

/**
 * Get unique tags from all posts
 */
export function getAllTags(): string[] {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const tags = fileSystemLoader.getAllTags();
      if (tags.length > 0) return tags;
    } catch (error) {
      console.warn('Error getting tags from file system:', error);
    }
  }

  const tags = new Set<string>();
  blogPostsMockData.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get unique categories from all posts
 */
export function getAllCategories(): string[] {
  if (canUseFileSystem && fileSystemLoader) {
    try {
      const categories = fileSystemLoader.getAllCategories();
      if (categories.length > 0) return categories;
    } catch (error) {
      console.warn('Error getting categories from file system:', error);
    }
  }

  const categories = new Set<string>();
  blogPostsMockData.forEach((post) => {
    categories.add(post.category);
  });
  return Array.from(categories).sort();
}
