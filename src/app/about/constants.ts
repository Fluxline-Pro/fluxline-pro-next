/**
 * About Page Constants
 * Data for team members, statistics, timeline, and values
 */

import type { TeamMember } from './components/TeamMemberCard';
import type { Statistic } from './components/CompanyStatistics';
import type { TimelineEvent } from './components/CompanyTimeline';
import type { CompanyValue } from './components/ValueCard';
import type { InfoCardData } from './components/InfoCard';

/**
 * Info Cards - What We Do, What We Deliver, How We Do It
 */
export const INFO_CARDS: InfoCardData[] = [
  {
    id: 'what-we-do',
    title: 'What We Do',
    heading: 'Creative & Modular Thinker',
    content:
      'We architect transformative brands, systems, and digital experiences that scale with your vision—fusing creative storytelling with technical precision to build frameworks that evolve, not restrict.',
  },
  {
    id: 'what-we-deliver',
    title: 'What We Deliver',
    heading: 'Results With Resonance',
    content:
      'Every project delivers measurable outcomes and emotional impact. We create solutions that drive business growth while building authentic connections between you and your audience.',
  },
  {
    id: 'how-we-do-it',
    title: 'How We Do It',
    heading: 'Human-Centered Approach',
    content:
      'We prioritize empathy, collaboration, belonging, and intentional communication—designing every interaction around how people actually think, feel, and make decisions.',
  },
];

/**
 * Team Members
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'andrew-smith',
    name: 'Andrew Smith',
    role: 'Founder & Chief Architect',
    bio: 'Visionary technologist and systems thinker, architecting transformative digital experiences and coaching frameworks.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      email: 'andrew@fluxline.pro',
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
    value: '10+',
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
