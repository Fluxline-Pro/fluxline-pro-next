import React from 'react';
import { BlogListingClient } from './BlogListingClient';

// Import from blogLoader directly (server-side only)
const blogLoader = require('./lib/blogLoader');

/**
 * Blog Page - Server Component
 * Loads blog posts from file system and passes to client component
 */
export default function BlogPage() {
  // Load all posts, tags, and categories on server
  const allPosts = blogLoader.getAllBlogPosts();
  const allTags = blogLoader.getAllTags();
  const allCategories = blogLoader.getAllCategories();

  return (
    <BlogListingClient
      initialPosts={allPosts}
      allTags={allTags}
      allCategories={allCategories}
    />
  );
}
