/**
 * Case Studies Mock Data
 * Comprehensive mock data for case study content
 * Structure ready for future API/state integration
 */

import { CaseStudy } from './types';

/**
 * Mock case studies data covering all service lines
 * Sorted by date (newest first)
 */
export const caseStudiesMockData: CaseStudy[] = [
  {
    id: 'enterprise-digital-transformation',
    title: 'Enterprise Digital Transformation',
    client: 'TechCorp Solutions',
    industry: 'Technology',
    description:
      'Complete digital transformation for a mid-sized enterprise, modernizing legacy systems and implementing cloud-native architecture.',
    challenge:
      'TechCorp Solutions was struggling with outdated legacy systems that hindered growth and innovation. Their monolithic architecture was difficult to maintain, slow to deploy, and expensive to scale. The company needed a comprehensive digital transformation strategy to remain competitive in a rapidly evolving market.',
    solution:
      'We designed and implemented a phased migration strategy to cloud-native microservices architecture. Our team conducted thorough system audits, created a modular architecture blueprint, and trained their development team on modern DevOps practices. The solution included automated CI/CD pipelines, containerization with Docker and Kubernetes, and implementation of Azure cloud services for scalability and reliability.',
    results:
      'The transformation resulted in a 70% reduction in deployment time, 50% decrease in infrastructure costs, and 3x improvement in system performance. The new architecture enabled the client to launch new features in weeks instead of months, significantly improving their competitive position. Team productivity increased by 60% due to improved tooling and automated workflows.',
    imageUrl: undefined,
    imageAlt: 'Enterprise Digital Transformation Case Study',
    services: ['consulting', 'development'],
    technologies: [
      'Azure',
      'Docker',
      'Kubernetes',
      'TypeScript',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Redis',
    ],
    metrics: [
      {
        label: 'Deployment Time',
        value: '-70%',
        description: 'Reduced from hours to minutes',
      },
      {
        label: 'Infrastructure Costs',
        value: '-50%',
        description: 'Annual savings of $250K',
      },
      {
        label: 'System Performance',
        value: '3x',
        description: 'Faster response times',
      },
      {
        label: 'Team Productivity',
        value: '+60%',
        description: 'More features delivered',
      },
    ],
    featured: true,
    publishedDate: new Date('2025-01-10'),
    projectDuration: '6 months',
    testimonial: {
      quote:
        'Fluxline transformed our entire technology stack and culture. Their systematic approach and deep technical expertise made what seemed impossible feel achievable. Our team is now empowered to innovate at a pace we never thought possible.',
      author: 'Sarah Chen',
      role: 'CTO, TechCorp Solutions',
    },
    seoMetadata: {
      title:
        'Enterprise Digital Transformation Case Study - TechCorp Solutions',
      description:
        'Learn how Fluxline helped TechCorp Solutions achieve 70% faster deployments and 50% cost reduction through cloud-native transformation.',
      keywords: [
        'digital transformation',
        'cloud migration',
        'microservices',
        'Azure',
        'DevOps',
        'enterprise architecture',
      ],
    },
  },
  {
    id: 'wellness-coaching-platform',
    title: 'Holistic Wellness Coaching Platform',
    client: 'Resonance Wellness Institute',
    industry: 'Health & Wellness',
    description:
      'Built a comprehensive wellness coaching platform integrating emotional intelligence, somatic practices, and personalized coaching programs.',
    challenge:
      'Resonance Wellness Institute wanted to scale their one-on-one coaching practice into a digital platform while maintaining the personal, transformative experience their clients valued. They needed a system that could handle personalized wellness plans, track emotional and physical progress, and facilitate coach-client relationships at scale without losing the human touch.',
    solution:
      'We designed and developed a holistic wellness platform featuring personalized dashboards, progress tracking, secure video conferencing, and AI-assisted wellness recommendations. The platform integrates emotional check-ins, somatic exercise libraries, meditation guides, and nutrition planning. We implemented a modular coaching framework that allows coaches to customize programs while maintaining best-practice structure.',
    results:
      'The platform enabled Resonance Wellness Institute to grow from 50 to 500+ active clients while maintaining high satisfaction scores. Client retention increased by 85%, and coaches reported 40% time savings through automated administrative tasks. The platform has facilitated over 10,000 coaching sessions and helped clients achieve measurable improvements in emotional well-being, physical health, and life satisfaction.',
    imageUrl: undefined,
    imageAlt: 'Wellness Coaching Platform Case Study',
    services: ['development', 'design', 'wellness'],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'GraphQL',
      'PostgreSQL',
      'WebRTC',
      'TensorFlow',
      'Azure',
    ],
    metrics: [
      {
        label: 'Client Growth',
        value: '10x',
        description: 'From 50 to 500+ active clients',
      },
      {
        label: 'Client Retention',
        value: '+85%',
        description: 'Year-over-year improvement',
      },
      {
        label: 'Coach Efficiency',
        value: '+40%',
        description: 'Time saved on admin tasks',
      },
      {
        label: 'Sessions Delivered',
        value: '10,000+',
        description: 'Successful coaching sessions',
      },
    ],
    featured: true,
    publishedDate: new Date('2024-12-15'),
    projectDuration: '8 months',
    testimonial: {
      quote:
        'Fluxline understood our vision of scaling personal transformation. They built a platform that feels deeply personal while serving hundreds of clients. Our coaches love the tools, and our clients are achieving breakthroughs faster than ever.',
      author: 'Dr. Michael Torres',
      role: 'Founder, Resonance Wellness Institute',
    },
    seoMetadata: {
      title:
        'Wellness Coaching Platform Case Study - Resonance Wellness Institute',
      description:
        'Discover how a holistic wellness platform helped scale coaching from 50 to 500+ clients with 85% retention increase.',
      keywords: [
        'wellness platform',
        'coaching software',
        'health tech',
        'emotional intelligence',
        'somatic practices',
        'digital health',
      ],
    },
  },
  {
    id: 'fintech-brand-identity',
    title: 'FinTech Brand Identity & Experience Design',
    client: 'Quantum Financial',
    industry: 'Financial Technology',
    description:
      'Created comprehensive brand identity and user experience design for an emerging fintech startup, establishing trust and differentiation in a competitive market.',
    challenge:
      'Quantum Financial, a new player in the crowded fintech space, needed to establish credibility and differentiate themselves from established competitors. Their existing brand lacked coherence, and their product interface was confusing to users. They needed a complete brand transformation that would resonate with both millennials and traditional investors while conveying security, innovation, and accessibility.',
    solution:
      'We developed a comprehensive brand identity system including logo, color palette, typography, and visual language that balances trust with innovation. Our team conducted extensive user research to redesign the entire product experience, creating intuitive interfaces for complex financial operations. We established a design system with reusable components, animation guidelines, and accessibility standards. The brand strategy included positioning, messaging frameworks, and guidelines for consistent communication across all touchpoints.',
    results:
      'The rebrand contributed to a 200% increase in user acquisition and 150% improvement in user engagement metrics. Customer trust scores improved by 90%, and the app achieved a 4.8/5 rating in app stores. The company successfully closed Series A funding, with investors citing the strong brand and user experience as key differentiators. The design system reduced design-to-development time by 60%.',
    imageUrl: undefined,
    imageAlt: 'FinTech Brand Identity Case Study',
    services: ['design', 'consulting'],
    technologies: [
      'Figma',
      'Adobe Creative Suite',
      'React',
      'Storybook',
      'Framer Motion',
      'Tailwind CSS',
    ],
    metrics: [
      {
        label: 'User Acquisition',
        value: '+200%',
        description: 'Quarterly growth rate',
      },
      {
        label: 'User Engagement',
        value: '+150%',
        description: 'Time spent in app',
      },
      {
        label: 'Trust Scores',
        value: '+90%',
        description: 'Customer confidence increase',
      },
      {
        label: 'App Rating',
        value: '4.8/5',
        description: 'Cross-platform average',
      },
    ],
    featured: true,
    publishedDate: new Date('2024-11-20'),
    projectDuration: '4 months',
    testimonial: {
      quote:
        'Fluxline gave us more than a beautiful brand—they gave us a strategic advantage. The design work directly contributed to our funding success and continues to drive user acquisition. They truly understand the intersection of design and business outcomes.',
      author: 'Jessica Kumar',
      role: 'CEO, Quantum Financial',
    },
    seoMetadata: {
      title: 'FinTech Brand Identity Case Study - Quantum Financial',
      description:
        'See how brand identity and UX design drove 200% user acquisition growth for a fintech startup.',
      keywords: [
        'brand identity',
        'fintech design',
        'UX design',
        'user experience',
        'design system',
        'brand strategy',
      ],
    },
  },
  {
    id: 'educational-platform-development',
    title: 'Interactive Educational Platform for K-12',
    client: 'EduBridge Learning Systems',
    industry: 'Education Technology',
    description:
      'Developed an engaging, accessible educational platform serving 50,000+ students with interactive learning modules and real-time progress tracking.',
    challenge:
      'EduBridge Learning Systems needed a modern platform to replace outdated learning management systems. Teachers struggled with limited engagement tools, students found the interface unintuitive, and administrators lacked visibility into learning outcomes. The platform needed to work seamlessly across devices, support diverse learning styles, and meet strict accessibility requirements for students with disabilities.',
    solution:
      'We built a comprehensive educational platform featuring interactive lesson modules, gamification elements, real-time collaboration tools, and adaptive learning paths. The system includes teacher dashboards for creating and managing content, student portals with personalized learning journeys, and administrator analytics for tracking outcomes. We implemented WCAG 2.1 AAA accessibility standards, including screen reader support, keyboard navigation, and customizable visual settings.',
    results:
      'The platform now serves 50,000+ students across 200+ schools with 95% user satisfaction. Student engagement increased by 75%, and teachers reported 50% time savings on administrative tasks. Test scores improved by an average of 30% for students using the platform regularly. The platform has won multiple educational technology awards and is expanding to international markets.',
    imageUrl: undefined,
    imageAlt: 'Educational Platform Case Study',
    services: ['development', 'education', 'design'],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'GraphQL',
      'PostgreSQL',
      'Redis',
      'WebSocket',
      'Azure',
    ],
    metrics: [
      {
        label: 'Students Served',
        value: '50,000+',
        description: 'Across 200+ schools',
      },
      {
        label: 'Student Engagement',
        value: '+75%',
        description: 'Time on platform increase',
      },
      {
        label: 'Teacher Time Saved',
        value: '50%',
        description: 'On administrative tasks',
      },
      {
        label: 'Test Score Improvement',
        value: '+30%',
        description: 'Average student improvement',
      },
    ],
    featured: false,
    publishedDate: new Date('2024-10-05'),
    projectDuration: '10 months',
    testimonial: {
      quote:
        'Fluxline created an educational platform that students actually want to use. The engagement we see is unprecedented, and the accessibility features ensure no student is left behind. This platform is transforming how we teach.',
      author: 'Robert Williams',
      role: 'Director of Technology, EduBridge Learning Systems',
    },
    seoMetadata: {
      title: 'Educational Platform Case Study - EduBridge Learning Systems',
      description:
        'Learn how an interactive K-12 platform increased student engagement by 75% and serves 50,000+ students.',
      keywords: [
        'educational technology',
        'e-learning platform',
        'K-12 education',
        'interactive learning',
        'accessibility',
        'edtech',
      ],
    },
  },
  {
    id: 'agile-transformation-consulting',
    title: 'Agile Transformation & Team Training',
    client: 'GlobalTech Manufacturing',
    industry: 'Manufacturing',
    description:
      'Led comprehensive Agile transformation for a traditional manufacturing company, training 300+ employees and restructuring development processes.',
    challenge:
      'GlobalTech Manufacturing, a century-old company, struggled to adapt to digital-first competitors. Their waterfall development process took 18+ months to deliver features, team morale was low, and they were losing market share. Leadership recognized the need for Agile transformation but faced resistance from middle management and uncertainty about how to implement change in a traditional corporate culture.',
    solution:
      'We designed and executed a comprehensive Agile transformation program spanning 12 months. Our approach included executive coaching, team training workshops, process redesign, and implementation of Agile ceremonies and tools. We established cross-functional product teams, trained Scrum Masters and Product Owners, and created a culture of continuous improvement. The program included hands-on coaching, retrospectives, and gradual rollout across departments.',
    results:
      'The transformation dramatically improved delivery speed and team satisfaction. Feature delivery time decreased from 18 months to 6 weeks, team engagement scores increased by 85%, and product quality improved with 60% fewer defects. The company successfully launched 15 new products in the first year post-transformation (compared to 2 in the previous year). Employee retention in technology roles improved by 40%.',
    imageUrl: undefined,
    imageAlt: 'Agile Transformation Case Study',
    services: ['consulting', 'training'],
    technologies: [
      'Jira',
      'Confluence',
      'Azure DevOps',
      'Slack',
      'Miro',
      'Microsoft Teams',
    ],
    metrics: [
      {
        label: 'Delivery Speed',
        value: '12x faster',
        description: 'From 18 months to 6 weeks',
      },
      {
        label: 'Team Engagement',
        value: '+85%',
        description: 'Employee satisfaction increase',
      },
      {
        label: 'Product Quality',
        value: '-60%',
        description: 'Defect reduction',
      },
      {
        label: 'Product Launches',
        value: '7.5x',
        description: '15 vs 2 new products/year',
      },
    ],
    featured: false,
    publishedDate: new Date('2024-09-10'),
    projectDuration: '12 months',
    testimonial: {
      quote:
        'Fluxline did not just teach us Agile—they transformed our culture. Our teams are energized, our velocity has skyrocketed, and we are competing effectively against digital-native companies. The investment in this transformation has already paid for itself multiple times over.',
      author: 'David Martinez',
      role: 'VP of Engineering, GlobalTech Manufacturing',
    },
    seoMetadata: {
      title: 'Agile Transformation Case Study - GlobalTech Manufacturing',
      description:
        'Discover how Agile transformation accelerated delivery 12x and increased team engagement by 85%.',
      keywords: [
        'agile transformation',
        'scrum training',
        'organizational change',
        'team training',
        'DevOps',
        'digital transformation',
      ],
    },
  },
  {
    id: 'ecommerce-platform-redesign',
    title: 'E-Commerce Platform Redesign & Optimization',
    client: 'Artisan Marketplace',
    industry: 'Retail & E-Commerce',
    description:
      'Redesigned and optimized e-commerce platform for artisan marketplace, improving conversion rates and creating delightful shopping experiences.',
    challenge:
      'Artisan Marketplace, a platform connecting independent craftspeople with buyers, had a functional but outdated website with poor mobile experience and low conversion rates. Cart abandonment was 82%, mobile traffic was growing but converting poorly, and sellers complained about difficult product management tools. The platform needed a complete redesign that honored the artisan brand while driving business results.',
    solution:
      'We conducted extensive user research with both buyers and sellers, identifying pain points and opportunities. Our team redesigned the entire platform with mobile-first approach, simplified checkout flow, improved search and filtering, and created a beautiful product showcase that let artisans tell their stories. We implemented performance optimizations, A/B testing framework, and personalization features. The seller portal was redesigned for easier inventory management and analytics.',
    results:
      'The redesign resulted in dramatic business improvements: conversion rates increased by 140%, cart abandonment decreased to 35%, and mobile revenue grew by 280%. Overall revenue increased by 165% in the six months following launch. Page load time improved by 75%, and seller satisfaction scores increased by 70%. The platform won a Webby Award for best e-commerce user experience.',
    imageUrl: undefined,
    imageAlt: 'E-Commerce Platform Case Study',
    services: ['design', 'development'],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Shopify',
      'Stripe',
      'Algolia',
      'Cloudinary',
      'Vercel',
    ],
    metrics: [
      {
        label: 'Conversion Rate',
        value: '+140%',
        description: 'More completed purchases',
      },
      {
        label: 'Cart Abandonment',
        value: '-47%',
        description: 'From 82% to 35%',
      },
      {
        label: 'Mobile Revenue',
        value: '+280%',
        description: 'Mobile optimization impact',
      },
      {
        label: 'Overall Revenue',
        value: '+165%',
        description: 'Six-month growth',
      },
    ],
    featured: false,
    publishedDate: new Date('2024-08-01'),
    projectDuration: '5 months',
    testimonial: {
      quote:
        'The new platform is stunning and it actually works. Our conversion rates speak for themselves. Fluxline balanced aesthetics with performance, creating an experience that serves both our artisans and buyers beautifully.',
      author: 'Emma Richardson',
      role: 'Founder, Artisan Marketplace',
    },
    seoMetadata: {
      title: 'E-Commerce Platform Case Study - Artisan Marketplace',
      description:
        'See how platform redesign increased conversion by 140% and mobile revenue by 280% for artisan marketplace.',
      keywords: [
        'e-commerce',
        'platform redesign',
        'conversion optimization',
        'mobile commerce',
        'UX design',
        'web performance',
      ],
    },
  },
];

/**
 * Get all case studies sorted by date (newest first)
 */
export const getCaseStudies = (): CaseStudy[] => {
  return [...caseStudiesMockData].sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
  );
};

/**
 * Get featured case studies (top 3)
 */
export const getFeaturedCaseStudies = (): CaseStudy[] => {
  return caseStudiesMockData
    .filter((study) => study.featured)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    .slice(0, 3);
};

/**
 * Get a single case study by ID
 */
export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudiesMockData.find((study) => study.id === id);
};

/**
 * Get case studies by service category
 */
export const getCaseStudiesByService = (
  service: string
): CaseStudy[] => {
  return caseStudiesMockData
    .filter((study) => study.services.includes(service as any))
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
};

/**
 * Get case studies by industry
 */
export const getCaseStudiesByIndustry = (industry: string): CaseStudy[] => {
  return caseStudiesMockData
    .filter((study) => study.industry === industry)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
};
