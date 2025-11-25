/**
 * Fluxline Ethos Content Module
 * Contains all content for the Fluxline Ethos page
 */

export interface EthosHeroContent {
  title: string;
  subtitle: string;
  description: string;
}

export interface EthosAboutContent {
  sectionTitle: string;
  paragraphs: string[];
}

export interface EthosServiceItem {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface EthosServicesContent {
  sectionTitle: string;
  services: EthosServiceItem[];
}

export interface EthosCTAContent {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

// Hero Section Content
export const ethosHero: EthosHeroContent = {
  title: 'Fluxline Ethos: Architecting Legacy Through Ritual, Resonance & Iteration',
  subtitle: 'A Multidimensional Transformation Framework',
  description:
    'At Fluxline, we architect systems that breathe, brands that feel, and legacies that last. Through curriculum gates of identity, mission, and resonance, we guide individuals and organizations in building sovereign, self-authored pathways to transformation.',
};

// About Fluxline Section Content
export const ethosAbout: EthosAboutContent = {
  sectionTitle: 'About Fluxline',
  paragraphs: [
    "Fluxline is more than a consultancy—it's a framework for becoming. We specialize in emotional rhythm, self-authored stewardship, and systems that honor the full arc of human transformation.",
    "Our approach is rooted in dashboards that track moments of truth, emotional shifts, and creative emergence. We believe transformation isn't just about metrics—it's about honoring emotional rhythm, creative truth, and legacy resonance.",
    'Every service is a curriculum gate. Every engagement is designed to align your identity, systems, and mission with intentionality and resonance. We architect multidimensional systems that fuse emotional intelligence, financial clarity, and somatic discipline.',
  ],
};

// Services Overview Section Content
export const ethosServices: EthosServicesContent = {
  sectionTitle: 'Our Core Services',
  services: [
    {
      id: 'resonance-core',
      title: 'Resonance Core Coaching',
      description:
        'Deep transformation through archetypal mapping, emotional emergence, and symbolic ritual. A curriculum of becoming for those ready to reclaim their light.',
      link: '/services/resonance-core',
    },
    {
      id: 'personal-training',
      title: 'Personal Training & Wellness',
      description:
        'Physical training with emotional intelligence. Movement as sovereignty, designed for all bodies, all thresholds, all breakthroughs.',
      link: '/services/personal-training',
    },
    {
      id: 'design',
      title: 'Brand Identity & Experience Design',
      description:
        'Visual identities and digital experiences crafted with emotional intelligence, modular precision, and mythic depth. Where strategy meets symbolism.',
      link: '/services/design',
    },
    {
      id: 'development',
      title: 'Web & Application Development',
      description:
        'We architect digital temples—every line of code designed to serve your mission with modular clarity and emotional intelligence. Living systems, built to evolve.',
      link: '/services/development',
    },
    {
      id: 'education-training',
      title: 'Education, Leadership & Consulting',
      description:
        'Experiential learning, emotional intelligence, and strategic embodiment. Coaching for those ready to lead with clarity, courage, and creative truth.',
      link: '/services/education',
    },
    {
      id: 'consulting',
      title: 'Business Strategy & Systems Alignment',
      description:
        'Where clarity meets infrastructure. Strategic consulting that guides you through designing systems that scale, strategies that resonate, and operations that reflect your deepest values.',
      link: '/services/consulting',
    },
  ],
};

// CTA Section Content
export const ethosCTA: EthosCTAContent = {
  title: 'Your Vision is Calling',
  description:
    'Each service is a curriculum gate, aligning identity, systems, and mission with intentional resonance. \n\nAre you ready to architect your legacy? Let’s begin the journey together.',
  buttonText: 'Start the Conversation',
  buttonLink: '/contact',
};
