import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types';

/**
 * Blog Loader Utilities
 * Handles reading and parsing markdown blog posts from the file system
 */

const BLOG_POSTS_DIRECTORY = path.join(
  process.cwd(),
  'public',
  'blog',
  'posts'
);

/**
 * Frontmatter interface matching the Markdown frontmatter structure
 */
interface BlogFrontmatter {
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  lastUpdated?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

/**
 * Get all blog post slugs from the file system
 */
export function getAllBlogPostSlugs(): string[] {
  try {
    if (!fs.existsSync(BLOG_POSTS_DIRECTORY)) {
      console.warn(
        'Blog posts directory does not exist:',
        BLOG_POSTS_DIRECTORY
      );
      return [];
    }

    const slugs = fs.readdirSync(BLOG_POSTS_DIRECTORY).filter((item) => {
      const itemPath = path.join(BLOG_POSTS_DIRECTORY, item);
      return fs.statSync(itemPath).isDirectory();
    });

    return slugs;
  } catch (error) {
    console.error('Error reading blog post slugs:', error);
    return [];
  }
}

/**
 * Read a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const postDirectory = path.join(BLOG_POSTS_DIRECTORY, slug);
    const markdownPath = path.join(postDirectory, 'markdown', 'post.md');

    if (!fs.existsSync(markdownPath)) {
      console.warn(`Blog post not found: ${markdownPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as BlogFrontmatter;

    // Convert to BlogPost format
    const blogPost: BlogPost = {
      id: slug,
      slug: slug,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      content: content,
      author: frontmatter.author,
      publishedDate: new Date(frontmatter.publishedDate),
      lastUpdated: frontmatter.lastUpdated
        ? new Date(frontmatter.lastUpdated)
        : undefined,
      imageUrl: frontmatter.imageUrl,
      imageAlt: frontmatter.imageAlt,
      tags: frontmatter.tags,
      category: frontmatter.category,
      featured: frontmatter.featured ?? false,
      seoMetadata: {
        title: frontmatter.seoTitle,
        description: frontmatter.seoDescription,
        keywords: frontmatter.seoKeywords,
      },
    };

    return blogPost;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogPostSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  return posts;
}

/**
 * Get all unique tags from all blog posts
 */
export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get all unique categories from all blog posts
 */
export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categoriesSet = new Set<string>();

  posts.forEach((post) => {
    categoriesSet.add(post.category);
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Filter blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Filter blog posts by category
 */
export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.category === category);
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.featured);
}

/**
 * Filter posts with multiple criteria
 */
export interface BlogFilterOptions {
  tag?: string;
  category?: string;
  featured?: boolean;
}

export function getFilteredBlogPosts(options: BlogFilterOptions): BlogPost[] {
  let posts = getAllBlogPosts();

  if (options.tag) {
    posts = posts.filter((post) => post.tags.includes(options.tag!));
  }

  if (options.category) {
    posts = posts.filter((post) => post.category === options.category);
  }

  if (options.featured !== undefined) {
    posts = posts.filter((post) => post.featured === options.featured);
  }

  return posts;
}
