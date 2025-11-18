/**
 * Scrolls Data Configuration
 * Central repository for all scroll (white paper) definitions
 */

import { ScrollItem, ScrollCategory } from './types';

// Category labels mapping for consistent display across components
export const categoryLabels: Record<string, string> = {
  'business-strategy': 'Business Strategy',
  development: 'Development',
  design: 'Design',
  wellness: 'Wellness',
  education: 'Education',
  coaching: 'Coaching',
};

export const SCROLLS_DATA: ScrollItem[] = [
  {
    id: 'business-it-consulting',
    title: 'Business Strategy & Systems Alignment',
    description:
      'Strategic consulting for founders and small teams. Learn how to design systems that scale, strategies that resonate, and operations that reflect your deepest values.',
    category: 'business-strategy',
    pdfUrl: '/scrolls/pdfs/Fluxline-Business-IT-Consulting.pdf',
    fileSize: '4.8 MB',
    tags: ['consulting', 'strategy', 'systems', 'operations'],
    publishedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    seoMetadata: {
      title:
        'Business Strategy & Systems Alignment - Fluxline Strategic Insights',
      description:
        'Comprehensive guide to business strategy and systems alignment for founders and organizations seeking transformation.',
      keywords: [
        'business strategy',
        'systems alignment',
        'consulting',
        'operations',
        'strategic planning',
      ],
    },
  },
  {
    id: 'app-web-development',
    title: 'Web Development & Digital Architecture',
    description:
      'Deep dive into modern web development practices. Learn how we architect digital solutions with modular clarity and emotional intelligence.',
    category: 'development',
    pdfUrl: '/scrolls/pdfs/Fluxline-App-and-Web-Development.pdf',
    fileSize: '4.8 MB',
    tags: ['development', 'web', 'architecture', 'digital'],
    publishedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    seoMetadata: {
      title:
        'Web Development & Digital Architecture - Fluxline Strategic Insights',
      description:
        'Explore modern web development practices and digital architecture patterns for scalable, maintainable applications.',
      keywords: [
        'web development',
        'digital architecture',
        'frontend',
        'backend',
        'full-stack',
      ],
    },
  },
  {
    id: 'graphic-design',
    title: 'Brand & Experience Design',
    description:
      'Visual identity and design principles. Discover how we create brands that resonate through strategic design and symbolic depth.',
    category: 'design',
    pdfUrl: '/scrolls/pdfs/Fluxline-Graphic-Design.pdf',
    fileSize: '4.8 MB',
    tags: ['design', 'branding', 'visual identity', 'UX'],
    publishedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    seoMetadata: {
      title: 'Brand & Experience Design - Fluxline Strategic Insights',
      description:
        'Learn about visual identity creation and experience design principles that create lasting brand resonance.',
      keywords: [
        'graphic design',
        'brand design',
        'visual identity',
        'user experience',
        'UX design',
      ],
    },
  },
  {
    id: 'personal-training',
    title: 'Personal Training & Wellness',
    description:
      'Holistic approach to physical training. Learn modular coaching systems that adapt to your goals, limitations, and breakthroughs.',
    category: 'wellness',
    pdfUrl: '/scrolls/pdfs/Fluxline-Personal-Training.pdf',
    fileSize: '4.8 MB',
    tags: ['wellness', 'training', 'coaching', 'fitness'],
    publishedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    seoMetadata: {
      title: 'Personal Training & Wellness - Fluxline Strategic Insights',
      description:
        'Comprehensive guide to personal training with emotional intelligence and modular coaching systems.',
      keywords: [
        'personal training',
        'wellness',
        'fitness coaching',
        'physical training',
        'health',
      ],
    },
  },
  {
    id: 'education-mentoring',
    title: 'Coaching, Education & Leadership',
    description:
      'Transformative education and coaching. Discover frameworks for experiential learning, emotional intelligence, and strategic embodiment.',
    category: 'education',
    pdfUrl: '/scrolls/pdfs/Fluxline-Education-Mentoring.pdf',
    fileSize: '4.8 MB',
    tags: ['education', 'coaching', 'leadership', 'mentoring'],
    publishedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    seoMetadata: {
      title: 'Coaching, Education & Leadership - Fluxline Strategic Insights',
      description:
        'Guide to transformative education, coaching methodologies, and leadership development for sustainable growth.',
      keywords: [
        'coaching',
        'education',
        'leadership',
        'mentoring',
        'professional development',
      ],
    },
  },
  {
    id: 'resonance-core',
    title: 'Resonance Core Framework™',
    description:
      'Deep transformation curriculum. Explore archetypal mapping, emotional emergence, and symbolic ritual for personal evolution.',
    category: 'coaching',
    pdfUrl: '/scrolls/pdfs/Fluxline-Life-Coaching-Resonance-Core.pdf',
    fileSize: '4.8 MB',
    tags: ['coaching', 'transformation', 'framework', 'resonance'],
    publishedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    seoMetadata: {
      title: 'Resonance Core Framework™ - Fluxline Strategic Insights',
      description:
        'Deep dive into the Resonance Core Framework for personal transformation through archetypal mapping and emotional emergence.',
      keywords: [
        'life coaching',
        'resonance core',
        'transformation',
        'personal development',
        'archetypal mapping',
      ],
    },
  },
];

// Helper function to get all scrolls
export function getAllScrolls(): ScrollItem[] {
  return SCROLLS_DATA;
}

// Helper function to get scroll by ID
export function getScrollById(id: string): ScrollItem | undefined {
  return SCROLLS_DATA.find((scroll) => scroll.id === id);
}

// Helper function to get scrolls by category
export function getScrollsByCategory(category: ScrollCategory): ScrollItem[] {
  return SCROLLS_DATA.filter((scroll) => scroll.category === category);
}

// Helper function to get all unique tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  SCROLLS_DATA.forEach((scroll) => {
    scroll.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// Helper function to get all categories
export function getAllCategories(): ScrollCategory[] {
  const categories = new Set<ScrollCategory>();
  SCROLLS_DATA.forEach((scroll) => {
    categories.add(scroll.category);
  });
  return Array.from(categories);
}
