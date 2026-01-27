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
  icon: string;
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
  title:
    'Fluxline Ethos: Building Systems That Work, Brands That Connect, Practices That Last',
  subtitle: 'A Framework for Transformation',
  description:
    'At Fluxline, we help you build systems that integrate emotional intelligence, technical precision, and strategic clarity. Through coaching, brand design, web development, and consulting, we guide individuals and organizations to create pathways that honor authenticity, purpose, and long-term vision.',
};

// About Fluxline Section Content
export const ethosAbout: EthosAboutContent = {
  sectionTitle: 'About Fluxline',
  paragraphs: [
    "Fluxline is a consultancy built around the belief that transformation isn't just about metrics—it's about honoring your values, creative truth, and long-term vision. We specialize in helping individuals and businesses integrate emotional intelligence with practical systems.",
    "Our approach focuses on clarity, resonance, and sustainable growth. Whether you're building a brand, developing a website, training your body, or designing business systems, we help you align your inner work with your outer work.",
    'We work with founders, creatives, and small teams to build stronger bodies, clearer brands, and resilient systems—so that your identity, offerings, and operations actually match who you are and where you're going.',
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
        'Deep transformation through identity work, emotional intelligence, and reflective practice. A structured process for those ready to align their inner world with the life they're building.',
      icon: 'HeartFill',
      link: '/services/resonance-core',
    },
    {
      id: 'personal-training',
      title: 'Personal Training & Wellness',
      description:
        'Physical training designed with care and emotional intelligence. Movement practices for all bodies, all backgrounds, and all goals—built to honor where you are and where you're going.',
      icon: 'Health',
      link: '/services/personal-training',
    },
    {
      id: 'design',
      title: 'Brand Identity & Experience Design',
      description:
        'Visual identities and digital experiences that look good and feel aligned. Design that reflects your story, connects with your audience, and supports your long-term vision.',
      icon: 'Design',
      link: '/services/design',
    },
    {
      id: 'development',
      title: 'Web & Application Development',
      description:
        'Custom websites and applications built with clarity and care. From simple sites to full platforms, we create digital systems designed to work well and evolve with you.',
      icon: 'Code',
      link: '/services/development',
    },
    {
      id: 'education-training',
      title: 'Education, Leadership & Consulting',
      description:
        'Coaching and workshops to help you lead, teach, and communicate with clarity and confidence. Practical frameworks for founders, creatives, and teams ready to show up with purpose.',
      icon: 'Education',
      link: '/services/education',
    },
    {
      id: 'consulting',
      title: 'Business Strategy & Systems Alignment',
      description:
        'Strategic consulting to help you design systems that scale, strategies that work, and operations that reflect your values. Clarity meets infrastructure.',
      icon: 'Lightbulb',
      link: '/services/consulting',
    },
  ],
};

// CTA Section Content
export const ethosCTA: EthosCTAContent = {
  title: 'Your Vision is Calling',
  description: "Each service is designed to align your identity, systems, and mission with clarity and purpose. \n\nReady to start building? Let's begin the conversation.",
  description: "Each service is designed to align your identity, systems, and mission with clarity and purpose. \n\nReady to start building? Let's begin the conversation.",
  buttonText: 'Start the Conversation',
  buttonLink: '/contact',
};
