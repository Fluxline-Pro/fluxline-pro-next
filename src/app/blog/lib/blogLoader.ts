import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types';
import { validateTags } from '@/utils/tag-utils';

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
 * Fields marked optional have fallback defaults in the loader
 */
interface BlogFrontmatter {
  title: string;
  excerpt?: string; // Falls back to description
  description?: string;
  author?: string; // Falls back to 'Fluxline Resonance Group'
  publishedDate?: string; // Falls back to date or current date
  date?: string;
  lastUpdated?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  isFeatured?: boolean;
  imageUrl?: string;
  imageAlt?: string;
  featuredImage?: string; // Simple image filename for featured image
  gallery?:
    | string[]
    | Array<{
        url: string;
        alt: string;
        caption?: string;
      }>; // Support both string array and object array
  seoTitle?: string; // Falls back to title
  seoDescription?: string; // Falls back to excerpt or description
  seoKeywords?: string[]; // Falls back to tags
  generatedWithAI?: boolean;
}

/**
 * Resolve the markdown file path for a blog post slug
 * All blog posts follow the standard structure:
 * /public/blog/posts/[slug]/markdown/post.md
 */
function resolveBlogMarkdownPath(slug: string): {
  markdownPath: string;
  imageBasePath: string;
} | null {
  const markdownPath = path.join(
    BLOG_POSTS_DIRECTORY,
    slug,
    'markdown',
    'post.md'
  );

  if (fs.existsSync(markdownPath)) {
    return {
      markdownPath,
      imageBasePath: `/blog/posts/${slug}/images`,
    };
  }

  return null;
}

function blogPostHasMarkdown(slug: string): boolean {
  return resolveBlogMarkdownPath(slug) !== null;
}

/**
 * Get all blog post slugs from the file system.
 * All blog posts follow the standard directory structure.
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

    return fs.readdirSync(BLOG_POSTS_DIRECTORY).filter((item) => {
      const itemPath = path.join(BLOG_POSTS_DIRECTORY, item);
      return fs.statSync(itemPath).isDirectory() && blogPostHasMarkdown(item);
    });
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
    const resolvedPaths = resolveBlogMarkdownPath(slug);
    if (!resolvedPaths) {
      console.warn(`Blog post not found for slug: ${slug}`);
      return null;
    }

    const { markdownPath, imageBasePath } = resolvedPaths;
    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as BlogFrontmatter;

    // Parse dates with validation
    const publishedDateSource = frontmatter.publishedDate ?? frontmatter.date;
    const publishedDate = publishedDateSource
      ? new Date(publishedDateSource)
      : new Date();

    // Validate the date is not invalid
    if (isNaN(publishedDate.getTime())) {
      console.warn(
        `Invalid publishedDate for ${slug}: ${frontmatter.publishedDate}`
      );
      return null;
    }

    const lastUpdated = frontmatter.lastUpdated
      ? new Date(frontmatter.lastUpdated)
      : undefined;

    // Validate lastUpdated if present
    if (lastUpdated && isNaN(lastUpdated.getTime())) {
      console.warn(
        `Invalid lastUpdated for ${slug}: ${frontmatter.lastUpdated}`
      );
    }

    // Convert to BlogPost format
    const blogPost: BlogPost = {
      id: slug,
      slug: slug,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt ?? frontmatter.description ?? '',
      content: content,
      author: frontmatter.author ?? 'Fluxline Resonance Group',
      publishedDate,
      lastUpdated:
        lastUpdated && !isNaN(lastUpdated.getTime()) ? lastUpdated : undefined,
      imageUrl: frontmatter.imageUrl,
      imageAlt: frontmatter.imageAlt,
      gallery: frontmatter.gallery
        ? Array.isArray(frontmatter.gallery)
          ? typeof frontmatter.gallery[0] === 'string'
            ? // Convert string array to object array
              (frontmatter.gallery as string[]).map((img) => ({
                url: `${imageBasePath}/${img}`,
                alt: img
                  .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
                  .replace(/[_-]/g, ' '),
                caption: undefined,
              }))
            : // Already object array - ensure URLs have full path
              (
                frontmatter.gallery as Array<{
                  url: string;
                  alt: string;
                  caption?: string;
                }>
              ).map((img) => ({
                url: img.url.startsWith('/')
                  ? img.url
                  : `${imageBasePath}/${img.url}`,
                alt: img.alt,
                caption: img.caption,
              }))
          : []
        : undefined,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      category: frontmatter.category,
      featured: frontmatter.featured ?? frontmatter.isFeatured ?? false,
      generatedWithAI: frontmatter.generatedWithAI ?? false,
      seoMetadata: {
        title: frontmatter.seoTitle ?? frontmatter.title,
        description:
          frontmatter.seoDescription ??
          frontmatter.excerpt ??
          frontmatter.description ??
          '',
        keywords: frontmatter.seoKeywords ?? frontmatter.tags ?? [],
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
 * Validates for potential duplicate tags (e.g., "Personal Growth" vs "PersonalGrowth")
 */
export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        if (tag && typeof tag === 'string' && tag.trim().length > 0) {
          tagsSet.add(tag);
        }
      });
    }
  });

  const allTags = Array.from(tagsSet).sort();

  // Validate tags for potential duplicates (development warning only)
  if (process.env.NODE_ENV !== 'production') {
    const validation = validateTags(allTags);
    if (!validation.isValid) {
      console.warn(
        '⚠️  Potential duplicate tags detected (different formatting):',
        validation.duplicates
          .map(
            (d) =>
              `"${d.tag}" matches: [${d.matches.map((m) => `"${m}"`).join(', ')}]`
          )
          .join('\n  ')
      );
      console.warn(
        '💡 Tip: Use consistent tag formatting. Recommended: Title Case with spaces (e.g., "Personal Growth")'
      );
    }
  }

  return allTags;
}

/**
 * Get all unique categories from all blog posts
 */
export function getAllCategories(): string[] {
  const posts = getAllBlogPosts();
  const categoriesSet = new Set<string>();

  posts.forEach((post) => {
    if (
      post.category &&
      typeof post.category === 'string' &&
      post.category.trim().length > 0
    ) {
      categoriesSet.add(post.category);
    }
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
