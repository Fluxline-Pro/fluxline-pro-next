import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const GROUNDING_DEMOS_DIRECTORY = path.join(
  process.cwd(),
  'public',
  'blog',
  'resonant-identity',
  'demos'
);

interface GroundingDemoFrontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  isFeatured?: boolean;
  date: string;
  author?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  linkedChallengeUrl?: string;
  linkedChallengeLabel?: string;
}

export interface GroundingDemoPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  publishedDate: Date;
  author: string;
  linkedChallengeUrl?: string;
  linkedChallengeLabel?: string;
  seoMetadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export function getAllGroundingDemoSlugs(): string[] {
  try {
    if (!fs.existsSync(GROUNDING_DEMOS_DIRECTORY)) {
      return [];
    }

    return fs
      .readdirSync(GROUNDING_DEMOS_DIRECTORY)
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/i, ''));
  } catch (error) {
    console.error('Error reading grounding demo slugs:', error);
    return [];
  }
}

export function getGroundingDemoBySlug(slug: string): GroundingDemoPost | null {
  try {
    const markdownPath = path.join(GROUNDING_DEMOS_DIRECTORY, `${slug}.md`);

    if (!fs.existsSync(markdownPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as GroundingDemoFrontmatter;

    const publishedDate = new Date(frontmatter.date);
    if (isNaN(publishedDate.getTime())) {
      console.warn(`Invalid grounding demo date for ${slug}: ${frontmatter.date}`);
      return null;
    }

    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      content,
      category: frontmatter.category,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      isFeatured: frontmatter.isFeatured ?? false,
      publishedDate,
      author: frontmatter.author ?? 'The Resonant Identity',
      linkedChallengeUrl: frontmatter.linkedChallengeUrl,
      linkedChallengeLabel: frontmatter.linkedChallengeLabel,
      seoMetadata: {
        title: frontmatter.seoTitle ?? frontmatter.title,
        description: frontmatter.seoDescription ?? frontmatter.description,
        keywords: frontmatter.seoKeywords ?? frontmatter.tags ?? [],
      },
    };
  } catch (error) {
    console.error(`Error reading grounding demo ${slug}:`, error);
    return null;
  }
}

export function getAllGroundingDemos(): GroundingDemoPost[] {
  return getAllGroundingDemoSlugs()
    .map((slug) => getGroundingDemoBySlug(slug))
    .filter((post): post is GroundingDemoPost => post !== null)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

export function getRelatedGroundingDemos(
  currentDemo: GroundingDemoPost,
  limit = 3
): GroundingDemoPost[] {
  const normalizedTags = new Set(
    currentDemo.tags
      .filter((tag) => tag.toLowerCase() !== 'interactive demo')
      .map((tag) => tag.toLowerCase())
  );

  return getAllGroundingDemos()
    .filter((demo) => demo.slug !== currentDemo.slug)
    .map((demo) => {
      const overlap = demo.tags.filter((tag) => normalizedTags.has(tag.toLowerCase()));
      return { demo, overlapCount: overlap.length };
    })
    .filter(({ overlapCount }) => overlapCount > 0)
    .sort(
      (a, b) =>
        b.overlapCount - a.overlapCount ||
        b.demo.publishedDate.getTime() - a.demo.publishedDate.getTime()
    )
    .slice(0, limit)
    .map(({ demo }) => demo);
}
