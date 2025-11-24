import React from 'react';
import { BlogListingClient } from './BlogListingClient';

import { getAllBlogPosts, getAllTags, getAllCategories } from './lib/blogLoader';

// Import from blogLoader directly (server-side only)
/**
 * Blog Page - Server Component
 * Loads blog posts from file system and passes to client component
 */
export default function BlogPage() {
  return (
    <BlogListingClient
      initialPosts={getAllBlogPosts()}
      allTags={getAllTags()}
      allCategories={getAllCategories()}
    />
  );
}
