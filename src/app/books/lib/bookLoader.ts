import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Book, BookFormat, BookStatus } from '../types';

/**
 * Book Loader Utilities
 * Handles reading and parsing markdown book content from the file system
 */

const BOOKS_DIRECTORY = path.join(process.cwd(), 'public', 'books', 'posts');

/**
 * Frontmatter interface matching the Markdown frontmatter structure
 */
interface BookFrontmatter {
  title: string;
  subtitle?: string;
  author: string;
  publisher?: string;
  publishedDate: string;
  isbn?: string;
  description: string;
  excerpt: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  gallery?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  category: string;
  tags: string[];
  featured?: boolean;
  status: BookStatus;
  formats: BookFormat[];
  prices: Array<{
    format: BookFormat;
    price: number;
    currency: string;
    retailer?: string;
    url?: string;
  }>;
  retailers: Array<{
    name: string;
    url: string;
    formats: BookFormat[];
    icon?: string;
  }>;
  directPurchaseAvailable: boolean;
  directPurchasePrice?: number;
  includesWorkbook?: boolean;
  workbookPrice?: number;
  bundlePrice?: number;
  pageCount?: number;
  language?: string;
  dimensions?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

/**
 * Get all book slugs from the file system
 */
export function getAllBookSlugs(): string[] {
  try {
    if (!fs.existsSync(BOOKS_DIRECTORY)) {
      console.warn('Books directory does not exist:', BOOKS_DIRECTORY);
      return [];
    }

    const slugs = fs.readdirSync(BOOKS_DIRECTORY).filter((item) => {
      const itemPath = path.join(BOOKS_DIRECTORY, item);
      return fs.statSync(itemPath).isDirectory();
    });

    return slugs;
  } catch (error) {
    console.error('Error reading book slugs:', error);
    return [];
  }
}

/**
 * Read a single book by slug
 */
export function getBookBySlug(slug: string): Book | null {
  try {
    const bookDirectory = path.join(BOOKS_DIRECTORY, slug);
    const markdownPath = path.join(bookDirectory, 'markdown', 'book.md');

    if (!fs.existsSync(markdownPath)) {
      console.warn(`Book not found: ${markdownPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as BookFrontmatter;

    // Convert to Book format
    const book: Book = {
      id: slug,
      slug: slug,
      title: frontmatter.title,
      subtitle: frontmatter.subtitle,
      author: frontmatter.author,
      publisher: frontmatter.publisher,
      publishedDate: new Date(frontmatter.publishedDate),
      isbn: frontmatter.isbn,
      description: frontmatter.description,
      excerpt: frontmatter.excerpt,
      content: content,
      coverImageUrl: frontmatter.coverImageUrl,
      coverImageAlt: frontmatter.coverImageAlt,
      gallery: frontmatter.gallery?.map((img) => ({
        url: img.url,
        alt: img.alt,
        caption: img.caption,
      })),
      category: frontmatter.category,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      featured: frontmatter.featured ?? false,
      status: frontmatter.status,
      formats: frontmatter.formats,
      prices: frontmatter.prices,
      retailers: frontmatter.retailers,
      directPurchaseAvailable: frontmatter.directPurchaseAvailable,
      directPurchasePrice: frontmatter.directPurchasePrice,
      includesWorkbook: frontmatter.includesWorkbook,
      workbookPrice: frontmatter.workbookPrice,
      bundlePrice: frontmatter.bundlePrice,
      pageCount: frontmatter.pageCount,
      language: frontmatter.language,
      dimensions: frontmatter.dimensions,
      seoMetadata: {
        title: frontmatter.seoTitle,
        description: frontmatter.seoDescription,
        keywords: frontmatter.seoKeywords,
      },
    };

    return book;
  } catch (error) {
    console.error(`Error reading book ${slug}:`, error);
    return null;
  }
}

/**
 * Get all books
 */
export function getAllBooks(): Book[] {
  const slugs = getAllBookSlugs();
  const books = slugs
    .map((slug) => getBookBySlug(slug))
    .filter((book): book is Book => book !== null)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());

  return books;
}

/**
 * Get all unique categories from all books
 */
export function getAllCategories(): string[] {
  const books = getAllBooks();
  const categoriesSet = new Set<string>();

  books.forEach((book) => {
    categoriesSet.add(book.category);
  });

  return Array.from(categoriesSet).sort();
}

/**
 * Get all unique tags from all books
 */
export function getAllTags(): string[] {
  const books = getAllBooks();
  const tagsSet = new Set<string>();

  books.forEach((book) => {
    book.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get featured books
 */
export function getFeaturedBooks(): Book[] {
  const books = getAllBooks();
  return books.filter((book) => book.featured);
}

/**
 * Filter books by category
 */
export function getBooksByCategory(category: string): Book[] {
  const books = getAllBooks();
  return books.filter((book) => book.category === category);
}

/**
 * Filter books by status
 */
export function getBooksByStatus(status: BookStatus): Book[] {
  const books = getAllBooks();
  return books.filter((book) => book.status === status);
}
