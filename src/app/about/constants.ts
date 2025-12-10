/**
 * About Page Constants
 * Data for team members, statistics, timeline, and values
 */

import type { TeamMember } from './components/TeamMemberCard';
import type { Statistic } from './components/CompanyStatistics';
import type { TimelineEvent } from './components/CompanyTimeline';
import type { CompanyValue } from './components/CompanyValues';
import type { SocialLinksData } from './components/SocialLinks';

/**
 * Terence Waters' Social Links
 * Used across all content detail pages (Blog, Press Release, Case Studies)
 */
export const TERENCE_SOCIAL_LINKS: SocialLinksData = {
  linkedin: 'https://linkedin.com/in/terencewaters',
  instagram: 'https://instagram.com/aplusinflux',
  facebook: 'https://www.facebook.com/fluxline',
  threads: 'https://www.threads.net/@aplusinflux',
  github: 'https://github.com/aplusandminus',
  twitter: 'https://twitter.com/aplusinflux',
  tiktok: 'https://www.tiktok.com/@aplusinflux',
  email: 'mailto:terence@fluxline.pro',
};

export const FLUXLINE_SOCIAL_LINKS: SocialLinksData = {
  facebook: 'https://www.facebook.com/fluxline',
  instagram: 'https://instagram.com/fluxlineco',
  threads: 'https://www.threads.net/@fluxlineco',
  github: 'https://github.com/fluxline-pro',
  email: 'mailto:support@fluxline.pro',
};

/**
 * Team Members
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'terence-waters',
    name: 'Terence Waters',
    role: 'CEO, Founder & Chief Architect',
    bio: 'Visionary technologist and systems thinker, architecting transformative digital experiences and coaching frameworks.',
    photo: '/images/home/HomePageCover4kPortrait.jpeg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/terencewaters',
      instagram: 'https://instagram.com/aplusinflux',
      facebook: 'https://www.facebook.com/fluxline',
      github: 'https://github.com/aplusandminus',
      email: 'mailto:terence@fluxline.pro',
      twitter: 'https://twitter.com/aplusinflux',
      tiktok: 'https://www.tiktok.com/@aplusinflux',
    },
  },
  // Add more team members as needed
];

/**
 * Company Statistics
 */
export const COMPANY_STATISTICS: Statistic[] = [
  {
    id: 'projects',
    label: 'Projects Delivered',
    value: '50+',
    icon: 'Completed',
    description: 'Successful transformations',
  },
  {
    id: 'years',
    label: 'Years Experience',
    value: '20+',
    icon: 'DateTime',
    description: 'In digital innovation',
  },
  {
    id: 'team',
    label: 'Product Offerings',
    value: '6+',
    icon: 'ProductVariant',
    description: 'Emotionally resonant solutions',
  },
  {
    id: 'satisfaction',
    label: 'Client Satisfaction',
    value: '98%',
    icon: 'FavoriteStarFill',
    description: 'Consistently excellent',
  },
];

/**
 * Company Timeline
 */
export const COMPANY_TIMELINE: TimelineEvent[] = [
  {
    id: 'founded',
    year: 'June 2025',
    title: 'Fluxline Founded',
    description:
      'Born from a vision to blend emotional intelligence with technical excellence, creating transformative digital experiences.',
    icon: 'Lightbulb',
  },
  {
    id: 'services-expansion',
    year: 'July 2025',
    title: 'Services Expansion',
    description:
      'Expanded offerings to include coaching, wellness programs, and strategic consulting alongside web development.',
    icon: 'BranchMerge',
  },
  {
    id: 'resonance-framework',
    year: 'August 2025',
    title: 'Resonance Core Framework™',
    description:
      'Launched our signature coaching framework combining archetypal mapping, emotional intelligence, and transformational practices.',
    icon: 'HeartFill',
  },
  {
    id: 'digital-evolution',
    year: 'September 2025',
    title: 'Digital Architecture Evolution',
    description:
      'Advanced our technical capabilities with modern frameworks, Azure cloud infrastructure, and scalable design systems.',
    icon: 'Code',
  },
  {
    id: 'present',
    year: '2025 - Present',
    title: 'Modular Innovation',
    description:
      'Continuing to architect transformative systems that blend technology, design, and human-centered philosophy.',
    icon: 'Rocket',
  },
];

/**
 * Company Values
 */
export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence',
    description:
      'We honor the emotional landscape of transformation, recognizing that lasting change comes from within.',
    icon: 'HeartFill',
  },
  {
    id: 'modular-precision',
    title: 'Modular Precision',
    description:
      'Systems designed with clarity and flexibility, adaptable to your unique journey and evolution.',
    icon: 'Design',
  },
  {
    id: 'legacy-resonance',
    title: 'Legacy Resonance',
    description:
      'Building not just for today, but for the lasting impact you want to create in the world.',
    icon: 'Globe',
  },
  {
    id: 'creative-truth',
    title: 'Creative Truth',
    description:
      'Authentic expression and honest communication guide every interaction and deliverable.',
    icon: 'Lightbulb',
  },
  {
    id: 'somatic-discipline',
    title: 'Somatic Discipline',
    description:
      'Recognizing the wisdom of the body and integrating physical practices with strategic thinking.',
    icon: 'Health',
  },
  {
    id: 'strategic-innovation',
    title: 'Strategic Innovation',
    description:
      'Thoughtful experimentation balanced with proven methodologies for sustainable growth.',
    icon: 'Rocket',
  },
];
