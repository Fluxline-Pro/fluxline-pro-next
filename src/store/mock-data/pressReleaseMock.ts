/**
 * Press Release Mock Data
 * Mock data for press release content
 * Structure mirrors blog/portfolio data patterns
 */

export interface PressRelease {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  imageText?: string;
  date: Date;
  category?: string;
  glyphTag?: string; // Future MCP integration: emotional threshold marker
  emotionalCue?: string; // Future MCP integration: curriculum phase
  tags?: string[];
  content?: string;
  author?: string;
}

/**
 * Mock press releases in reverse chronological order (newest first)
 */
export const pressReleasesMockData: PressRelease[] = [
  {
    id: 'fluxline-pro-launch-2025',
    title: 'Fluxline Pro Platform Launches with Next.js 16',
    subtitle: 'Modern Business Transformation Platform Goes Live',
    description:
      'Fluxline Resonance Group announces the official launch of Fluxline Pro, a next-generation business transformation platform built on Next.js 16 and React 19, featuring advanced theming, accessibility, and responsive design.',
    imageUrl: undefined,
    imageAlt: 'Fluxline Pro Platform Launch',
    imageText: 'Platform Launch 2025',
    date: new Date('2025-01-15T00:00:00Z'),
    category: 'Product Launch',
    glyphTag: '🜂', // Ignition phase
    emotionalCue: 'Ignition',
    tags: ['launch', 'platform', 'technology'],
    author: 'Fluxline Resonance Group',
    content: `
Fluxline Resonance Group is proud to announce the official launch of Fluxline Pro, 
a cutting-edge business transformation platform designed to empower businesses in 
their digital transformation journey.

Built on the latest technology stack including Next.js 16 and React 19, Fluxline Pro 
delivers exceptional performance, accessibility, and user experience. The platform 
features advanced theming capabilities with support for dark mode, light mode, and 
high-contrast themes, ensuring accessibility for all users.

Key features include:
- Server-side rendering for optimal performance
- Responsive design across all devices
- Advanced accessibility features (WCAG 2.1 AA compliant)
- Seamless integration with Azure cloud services
- Modern component-based architecture

"This launch represents a significant milestone in our mission to deliver strategic 
precision for modern business transformation," said the Fluxline Resonance Group team.
    `,
  },
  {
    id: 'accessibility-certification-2025',
    title: 'Fluxline Pro Achieves WCAG 2.1 AA Accessibility Certification',
    subtitle: 'Commitment to Inclusive Digital Experiences',
    description:
      'The Fluxline Pro platform has been certified as WCAG 2.1 AA compliant, demonstrating our commitment to creating inclusive digital experiences for all users, regardless of ability.',
    imageUrl: undefined,
    imageAlt: 'Accessibility Certification',
    imageText: 'Accessibility Excellence',
    date: new Date('2025-01-20T00:00:00Z'),
    category: 'Achievement',
    glyphTag: '🜄', // Integration phase
    emotionalCue: 'Integration',
    tags: ['accessibility', 'certification', 'wcag'],
    author: 'Fluxline Resonance Group',
    content: `
Fluxline Resonance Group announces that the Fluxline Pro platform has achieved 
WCAG 2.1 AA accessibility certification, reinforcing our commitment to creating 
inclusive digital experiences.

The certification validates our implementation of:
- Keyboard navigation throughout the platform
- Screen reader compatibility
- Color contrast ratios meeting accessibility standards
- Responsive text scaling
- Focus management and ARIA labels

This achievement reflects our core belief that technology should be accessible to 
everyone, and we will continue to prioritize accessibility in all our products and 
services.
    `,
  },
  {
    id: 'azure-partnership-2025',
    title: 'Strategic Partnership with Microsoft Azure Announced',
    subtitle: 'Enhanced Cloud Infrastructure for Enterprise Clients',
    description:
      'Fluxline Pro announces strategic partnership with Microsoft Azure, enabling enhanced cloud infrastructure, improved scalability, and enterprise-grade security for our clients.',
    imageUrl: undefined,
    imageAlt: 'Azure Partnership',
    imageText: 'Azure Partnership',
    date: new Date('2025-11-20T00:00:00Z'),
    category: 'Partnership',
    glyphTag: '🜄', // Integration phase
    emotionalCue: 'Integration',
    tags: ['partnership', 'azure', 'cloud', 'enterprise'],
    author: 'Fluxline Resonance Group',
    content: `
Fluxline Resonance Group is excited to announce a strategic partnership with 
Microsoft Azure, bringing enterprise-grade cloud infrastructure to our clients.

This partnership enables:
- Scalable hosting with Azure Static Web Apps
- Enhanced security with Azure Active Directory integration
- Improved performance with Azure CDN
- Seamless deployment with Azure DevOps
- Advanced analytics with Azure Monitor

"This partnership aligns perfectly with our mission to deliver cutting-edge 
business transformation solutions," said the Fluxline team. "Azure's robust 
infrastructure allows us to serve our clients better and scale efficiently."
    `,
  },
  {
    id: 'design-system-release-2025',
    title: 'Fluxline Design System 1.0 Released',
    subtitle: 'Comprehensive Component Library for Modern Web Development',
    description:
      'Fluxline Pro releases version 1.0 of its comprehensive design system, featuring reusable components, theming capabilities, and extensive documentation for developers.',
    imageUrl: undefined,
    imageAlt: 'Design System Release',
    imageText: 'Design System v1.0',
    date: new Date('2025-10-05T00:00:00Z'),
    category: 'Product Release',
    glyphTag: '🜂', // Ignition phase
    emotionalCue: 'Breakthrough',
    tags: ['design-system', 'components', 'open-source'],
    author: 'Fluxline Resonance Group',
    content: `
Fluxline Resonance Group proudly releases version 1.0 of the Fluxline Design System, 
a comprehensive component library built for modern web development.

The design system includes:
- 50+ reusable React components
- Advanced theming with Fluent UI integration
- Tailwind CSS utility classes
- Responsive design patterns
- Extensive documentation and examples
- Storybook integration for component exploration

The design system is now available for developers to build consistent, accessible, 
and beautiful web applications. Full documentation is available on our platform.
    `,
  },
  {
    id: 'consulting-expansion-2025',
    title: 'Fluxline Pro Expands Consulting Services Globally',
    subtitle: 'Now Serving Clients Across North America, Europe, and Asia',
    description:
      'Fluxline Resonance Group announces global expansion of consulting services, now serving enterprise clients across three continents with strategic business transformation expertise.',
    imageUrl: undefined,
    imageAlt: 'Global Expansion',
    imageText: 'Global Services',
    date: new Date('2025-09-15T00:00:00Z'),
    category: 'Business Expansion',
    glyphTag: '🜄', // Integration phase
    emotionalCue: 'Visibility',
    tags: ['consulting', 'expansion', 'global'],
    author: 'Fluxline Resonance Group',
    content: `
Fluxline Resonance Group announces the expansion of its consulting services to 
serve clients globally across North America, Europe, and Asia.

Our consulting services now include:
- Digital transformation strategy
- Technology stack modernization
- Agile transformation and coaching
- Design thinking workshops
- Accessibility audits and remediation
- Performance optimization

With this expansion, we're positioned to help businesses worldwide navigate their 
digital transformation journey with strategic precision and cultural sensitivity.
    `,
  },
  {
    id: 'resonance-core-launch-2025',
    title: 'Resonance Core Life Coaching Program Launched',
    subtitle: 'Holistic Personal Development for Business Leaders',
    description:
      'Introducing Resonance Core, a comprehensive life coaching program designed for business leaders seeking personal transformation alongside professional growth.',
    imageUrl: undefined,
    imageAlt: 'Resonance Core Launch',
    imageText: 'Resonance Core',
    date: new Date('2025-08-01T00:00:00Z'),
    category: 'Service Launch',
    glyphTag: '🜂', // Ignition phase
    emotionalCue: 'Integration',
    tags: ['coaching', 'wellness', 'leadership'],
    author: 'Fluxline Resonance Group',
    content: `
Fluxline Resonance Group introduces Resonance Core, a holistic life coaching 
program designed specifically for business leaders and executives.

Resonance Core offers:
- One-on-one executive coaching
- Emotional intelligence development
- Work-life integration strategies
- Leadership presence cultivation
- Personal wellness planning
- Legacy building frameworks

"We believe that sustainable business transformation starts with personal 
transformation," explains the Fluxline team. "Resonance Core helps leaders 
align their personal values with their professional mission."
    `,
  },
];

/**
 * Get all press releases sorted by date (newest first)
 */
export const getPressReleases = (): PressRelease[] => {
  return [...pressReleasesMockData].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
};

/**
 * Get a single press release by ID
 */
export const getPressReleaseById = (id: string): PressRelease | undefined => {
  return pressReleasesMockData.find((pr) => pr.id === id);
};

/**
 * Get press releases by category
 */
export const getPressReleasesByCategory = (
  category: string
): PressRelease[] => {
  return pressReleasesMockData
    .filter((pr) => pr.category === category)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};

/**
 * Get press releases by year
 */
export const getPressReleasesByYear = (year: number): PressRelease[] => {
  return pressReleasesMockData
    .filter((pr) => pr.date.getFullYear() === year)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};
