import React from 'react';
import { BlogListingClientWrapper } from './BlogListingClientWrapper';
import {
  getAllBlogPosts,
  getAllTags,
  getAllCategories,
} from './lib/blogLoader';

/**
 * Blog Page - Server Component
 * Loads blog posts from file system and passes to client wrapper
 */
export default function BlogPage() {
  return (
    <BlogListingClientWrapper
      initialPosts={getAllBlogPosts()}
      allTags={getAllTags()}
      allCategories={getAllCategories()}
    />
  );
}
