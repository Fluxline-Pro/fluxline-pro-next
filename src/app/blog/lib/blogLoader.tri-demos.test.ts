import { getAllBlogPostSlugs, getBlogPostBySlug } from './blogLoader';

describe('blogLoader TRI grounding demos integration', () => {
  it('includes TRI grounding demo slugs from /public/blog/resonant-identity/demos', () => {
    const slugs = getAllBlogPostSlugs();

    expect(slugs).toContain('box-breathing-4-4-4-4');
    expect(slugs).toContain('diaphragmatic-breathing');
    expect(slugs).toContain('sensory-grounding-3-2-1');
  });

  it('loads TRI grounding demo markdown with frontmatter fallbacks', () => {
    const post = getBlogPostBySlug('box-breathing-4-4-4-4');

    expect(post).not.toBeNull();
    expect(post?.title).toBe('Box Breathing (4–4–4–4)');
    expect(post?.category).toBe('Resonant Identity');
    expect(post?.excerpt).toBe(
      'A guided breathing practice to regulate the nervous system and restore grounded focus.'
    );
    expect(post?.tags).toContain('Interactive Demo');
    expect(post?.seoMetadata.title).toContain('Box Breathing');
  });
});
