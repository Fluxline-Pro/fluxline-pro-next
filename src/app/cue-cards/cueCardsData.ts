/**
 * Cue Cards Data Configuration
 * Central repository for all cue card definitions
 *
 * Cue cards are modular summaries of key archetypes, mantras, and actions
 * designed to help visitors quickly understand Fluxline's offerings.
 */

import { CueCardItem, CueCardCategory } from './types';

/**
 * Category labels for consistent display
 */
export const categoryLabels: Record<CueCardCategory, string> = {
  'personal-training': 'Personal Training',
  wellness: 'Wellness',
  coaching: 'Coaching',
  development: 'Development',
  design: 'Design',
  consulting: 'Consulting',
  transformation: 'Transformation',
};

/**
 * Main cue cards data array
 * Each card represents an archetype with its associated mantra, action, and emotional overlay
 */
export const CUE_CARDS_DATA: CueCardItem[] = [
  {
    id: 'the-rebuilder',
    icon: '🏋️',
    title: 'The Rebuilder',
    mantra: 'I rise stronger through structure.',
    action: 'Begin 4-week PT on-ramp',
    overlay:
      'This client honors repetition and mythic milestones. Each session is a brick laid toward the temple of self.',
    category: 'personal-training',
    link: '/services/personal-training',
    linkText: 'Start Your Journey',
    tags: ['strength', 'discipline', 'foundation'],
    publishedDate: new Date('2025-01-15'),
    featured: true,
    seoMetadata: {
      title: 'The Rebuilder - Personal Training Archetype',
      description:
        'Discover the Rebuilder archetype: rising stronger through structured training and mythic milestones.',
      keywords: [
        'personal training',
        'strength building',
        'fitness archetype',
        'rebuilder',
      ],
    },
  },
  {
    id: 'the-alchemist',
    icon: '⚗️',
    title: 'The Alchemist',
    mantra: 'From chaos, I craft gold.',
    action: 'Schedule your transformation consultation',
    overlay:
      'The Alchemist sees potential in the raw and unrefined. Every challenge is an ingredient for transmutation.',
    category: 'transformation',
    link: '/contact',
    linkText: 'Begin Transformation',
    tags: ['change', 'potential', 'transmutation'],
    publishedDate: new Date('2025-01-14'),
    featured: true,
    seoMetadata: {
      title: 'The Alchemist - Transformation Archetype',
      description:
        'Meet the Alchemist archetype: crafting gold from chaos through transformative work.',
      keywords: [
        'transformation',
        'personal growth',
        'alchemist archetype',
        'coaching',
      ],
    },
  },
  {
    id: 'the-navigator',
    icon: '🧭',
    title: 'The Navigator',
    mantra: 'I chart my course through unknown waters.',
    action: 'Map your strategic vision',
    overlay:
      'The Navigator thrives in ambiguity, finding direction where others see only fog. Trust the internal compass.',
    category: 'consulting',
    link: '/services/consulting',
    linkText: 'Chart Your Course',
    tags: ['strategy', 'direction', 'clarity'],
    publishedDate: new Date('2025-01-13'),
    featured: true,
    seoMetadata: {
      title: 'The Navigator - Strategic Archetype',
      description:
        'Embody the Navigator archetype: charting strategic courses through business complexity.',
      keywords: [
        'business strategy',
        'consulting',
        'navigator archetype',
        'direction',
      ],
    },
  },
  {
    id: 'the-architect',
    icon: '🏛️',
    title: 'The Architect',
    mantra: 'I build what endures.',
    action: 'Design your digital foundation',
    overlay:
      'The Architect sees systems within systems. Every line of code is a beam supporting something greater.',
    category: 'development',
    link: '/services/development',
    linkText: 'Build With Us',
    tags: ['systems', 'structure', 'digital'],
    publishedDate: new Date('2025-01-12'),
    featured: false,
    seoMetadata: {
      title: 'The Architect - Development Archetype',
      description:
        'The Architect archetype: building enduring digital systems with strategic precision.',
      keywords: [
        'web development',
        'software architecture',
        'architect archetype',
        'systems design',
      ],
    },
  },
  {
    id: 'the-healer',
    icon: '💚',
    title: 'The Healer',
    mantra: 'Through rest, I restore.',
    action: 'Integrate a recovery ritual',
    overlay:
      'The Healer understands that growth happens in stillness. Restoration is not weakness—it is wisdom.',
    category: 'wellness',
    link: '/services/personal-training',
    linkText: 'Embrace Recovery',
    tags: ['recovery', 'restoration', 'balance'],
    publishedDate: new Date('2025-01-11'),
    featured: false,
    seoMetadata: {
      title: 'The Healer - Wellness Archetype',
      description:
        'The Healer archetype: finding strength through restoration and mindful recovery.',
      keywords: [
        'wellness',
        'recovery',
        'healer archetype',
        'restoration',
        'balance',
      ],
    },
  },
  {
    id: 'the-visionary',
    icon: '🔮',
    title: 'The Visionary',
    mantra: 'I see what could be.',
    action: 'Articulate your brand essence',
    overlay:
      'The Visionary perceives patterns invisible to others. Design becomes prophecy when rooted in truth.',
    category: 'design',
    link: '/services/design',
    linkText: 'Manifest Your Vision',
    tags: ['creativity', 'vision', 'brand'],
    publishedDate: new Date('2025-01-10'),
    featured: false,
    seoMetadata: {
      title: 'The Visionary - Design Archetype',
      description:
        'The Visionary archetype: transforming creative vision into tangible brand expression.',
      keywords: [
        'brand design',
        'visual identity',
        'visionary archetype',
        'creative',
      ],
    },
  },
  {
    id: 'the-mentor',
    icon: '📚',
    title: 'The Mentor',
    mantra: 'I light the path for others.',
    action: 'Share one insight today',
    overlay:
      'The Mentor carries wisdom earned through experience. Teaching is the highest form of learning.',
    category: 'coaching',
    link: '/services/coaching',
    linkText: 'Become a Guide',
    tags: ['wisdom', 'teaching', 'guidance'],
    publishedDate: new Date('2025-01-09'),
    featured: false,
    seoMetadata: {
      title: 'The Mentor - Coaching Archetype',
      description:
        'The Mentor archetype: guiding others through the wisdom of lived experience.',
      keywords: [
        'coaching',
        'mentorship',
        'mentor archetype',
        'guidance',
        'wisdom',
      ],
    },
  },
  {
    id: 'the-warrior',
    icon: '⚔️',
    title: 'The Warrior',
    mantra: 'I face what must be faced.',
    action: 'Identify your resistance',
    overlay:
      'The Warrior does not seek conflict but does not shrink from necessary battles. Courage is a daily practice.',
    category: 'personal-training',
    link: '/services/personal-training',
    linkText: 'Train Your Courage',
    tags: ['courage', 'discipline', 'strength'],
    publishedDate: new Date('2025-01-08'),
    featured: false,
    seoMetadata: {
      title: 'The Warrior - Training Archetype',
      description:
        'The Warrior archetype: cultivating courage and discipline through physical training.',
      keywords: [
        'warrior training',
        'courage',
        'warrior archetype',
        'discipline',
      ],
    },
  },
];

/**
 * Get all cue cards sorted by date (newest first)
 */
export function getAllCueCards(): CueCardItem[] {
  return [...CUE_CARDS_DATA].sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
}

/**
 * Get a single cue card by ID
 */
export function getCueCardById(id: string): CueCardItem | undefined {
  return CUE_CARDS_DATA.find((card) => card.id === id);
}

/**
 * Get featured cue cards
 */
export function getFeaturedCueCards(): CueCardItem[] {
  return CUE_CARDS_DATA.filter((card) => card.featured).sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
}

/**
 * Get cue cards by category
 */
export function getCueCardsByCategory(category: CueCardCategory): CueCardItem[] {
  return CUE_CARDS_DATA.filter((card) => card.category === category).sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
}

/**
 * Get all unique tags from cue cards
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  CUE_CARDS_DATA.forEach((card) => {
    card.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all categories that have cue cards
 */
export function getAllCategories(): CueCardCategory[] {
  const categories = new Set<CueCardCategory>();
  CUE_CARDS_DATA.forEach((card) => {
    categories.add(card.category);
  });
  return Array.from(categories);
}
