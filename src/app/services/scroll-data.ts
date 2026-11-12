/**
 * Scrolls Data Configuration
 * White paper (scroll) definitions linked from the service detail pages.
 * The PDFs live under /scrolls/pdfs/; there is no scroll listing/detail route.
 */

import { ScrollItem } from './scroll-types';

export const SCROLLS_DATA: ScrollItem[] = [
  {
    id: 'app-web-development',
    title: 'Web Development & Digital Architecture',
    description:
      'Deep dive into modern web development practices. Learn how we architect digital solutions with modular clarity and emotional intelligence.',
    category: 'development',
    pdfUrl: '/scrolls/pdfs/Fluxline-App-and-Web-Development.pdf',
    fileSize: '4.8 MB',
    tags: ['development', 'web', 'architecture', 'digital'],
    publishedDate: new Date('2025-01-15'),
    lastUpdated: new Date('2025-01-15'),
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
    publishedDate: new Date('2025-01-15'),
    lastUpdated: new Date('2025-01-15'),
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
    publishedDate: new Date('2025-01-15'),
    lastUpdated: new Date('2025-01-15'),
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
    id: 'resonance-core',
    title: 'Resonance Core Framework™',
    description:
      'Deep transformation curriculum. Explore archetypal mapping, emotional emergence, and symbolic ritual for personal evolution.',
    category: 'coaching',
    pdfUrl: '/scrolls/pdfs/Fluxline-Life-Coaching-Resonance-Core.pdf',
    fileSize: '4.8 MB',
    tags: ['coaching', 'transformation', 'framework', 'resonance'],
    publishedDate: new Date('2025-01-15'),
    lastUpdated: new Date('2025-01-15'),
    seoMetadata: {
      title: 'Resonance Core Framework™ - Fluxline Strategic Insights',
      description:
        'Deep dive into The Resonance Core Framework™ for personal transformation through archetypal mapping and emotional emergence.',
      keywords: [
        'life coaching',
        'resonance core',
        'transformation',
        'personal development',
        'archetypal mapping',
      ],
    },
  },
  {
    id: 'identity-in-motion-4-week-program',
    title: 'Identity in Motion: A 4-Week Unblocking Program',
    description:
      'A $99 guided, four-week application of The Resonance Core Framework™ for recurring health goals. Map internal roles and blocks, define an identity that supports consistency, and build sustainable habits through embodied practice.',
    category: 'coaching',
    pdfUrl: '/scrolls/pdfs/Fluxline_RCF_4Week_Unblocking_Program_v4.pdf',
    fileSize: '234 KB',
    tags: ['coaching', 'identity', 'wellness', 'habits', 'resonance'],
    publishedDate: new Date('2026-10-12'),
    lastUpdated: new Date('2026-10-12'),
    seoMetadata: {
      title:
        'Identity in Motion: 4-Week Unblocking Program - Fluxline Strategic Insights',
      description:
        'Explore the $99, four-week Resonance Core program for identifying internal blocks and building sustainable, identity-aligned health habits.',
      keywords: [
        'Identity in Motion',
        'four-week program',
        'Resonance Core Framework',
        'identity-based habits',
        'wellness',
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
    publishedDate: new Date('2025-01-15'),
    lastUpdated: new Date('2025-01-15'),
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
    id: 'business-it-consulting',
    title: 'Business Strategy & Systems Alignment',
    description:
      'Strategic consulting for founders and small teams. Learn how to design systems that scale, strategies that resonate, and operations that reflect your deepest values.',
    category: 'business-strategy',
    pdfUrl: '/scrolls/pdfs/Fluxline-Business-IT-Consulting.pdf',
    fileSize: '4.8 MB',
    tags: ['consulting', 'strategy', 'systems', 'operations'],
    publishedDate: new Date('2025-01-15'),
    lastUpdated: new Date('2025-01-15'),
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
];

// Helper function to get scroll by ID
export function getScrollById(id: string): ScrollItem | undefined {
  return SCROLLS_DATA.find((scroll) => scroll.id === id);
}
