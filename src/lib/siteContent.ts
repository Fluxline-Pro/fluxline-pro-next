import type { SocialLinksData } from '@/components/SocialLinks';

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const TERENCE_SOCIAL_LINKS: SocialLinksData = {
  linkedin: 'https://linkedin.com/in/terencewaters',
  instagram: 'https://instagram.com/aplusinflux',
  facebook: 'https://www.facebook.com/fluxline',
  threads: 'https://www.threads.net/@aplusinflux',
  github: 'https://github.com/aplusandminus',
  twitter: 'https://twitter.com/aplusinflux',
  tiktok: 'https://www.tiktok.com/@aplusinflux',
  email: 'terence@fluxline.pro',
};

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: 'embodied-awareness',
    title: 'Embodied Awareness',
    description:
      'Integrating mind, body, and spirit for holistic transformation and authentic connection.',
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
    id: 'somatic-discipline',
    title: 'Somatic Discipline',
    description:
      'Recognizing the wisdom of the body and integrating physical practices with strategic thinking.',
    icon: 'Health',
  },
  {
    id: 'creative-truth',
    title: 'Creative Truth',
    description:
      'Authentic expression and honest communication guide every interaction and deliverable.',
    icon: 'Lightbulb',
  },
  {
    id: 'strategic-innovation',
    title: 'Strategic Innovation',
    description:
      'Thoughtful experimentation balanced with proven methodologies for sustainable growth.',
    icon: 'BranchFork2',
  },
];