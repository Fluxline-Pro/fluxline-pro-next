/**
 * Services Constants
 * Data and configuration for the Services page
 */

export const FLUXLINE_TAGLINE =
  "We're not done yet—\nbut we're already extraordinary.";
export const FLUXLINE_SECONDARY_TAGLINE =
  'Modular by design. Resonant by nature.';

export const SERVICES_SUMMARY =
  'Fluxline helps founders, creatives, and small teams build stronger bodies, clearer brands, and resilient systems. Work with us on personal training, web development, brand design, coaching, and strategic consulting—so your inner work and outer work actually match.';

export const CONSULTING_SUMMARY =
  "<strong>Strategic consulting and operational design to align your offers, systems, and day-to-day operations.</strong> Fluxline's Business Strategy & Systems Alignment offering guides founders and small teams through designing systems that scale, strategies that work, and operations that reflect their core values.<br /><br />Whether you're launching a new venture, optimizing your operations, or preparing to scale, we offer practical frameworks, tech integration support, and strategic planning that turns friction into flow. Every engagement is tailored to your growth phase and operational needs.";

export const DEVELOPMENT_SUMMARY =
  "<strong>Design and build your website or web app, from simple sites to full platforms.</strong> Fluxline creates custom web applications with intuitive interfaces and reliable infrastructure. Whether you're launching an MVP, scaling a full-stack platform, or building a custom app, our development process combines clear user experience with long-term maintainability.<br /><br />From frontend design to backend logic and cloud deployment, we guide founders and creatives through a build process that's transparent, empowering, and aligned with your goals. Your product is built to work well and evolve with you.";

export const DESIGN_SUMMARY =
  "<strong>Visual identity and user experience design so your brand feels cohesive and clear.</strong> Fluxline Design creates brand identities and digital experiences that look good and feel aligned with who you are. Every logo, layout, and interface is designed to reflect your story and connect with your audience. Whether you're launching, scaling, or building your legacy, we design with care, precision, and strategic thinking.";

export const PERSONAL_TRAINING_SUMMARY =
  "<strong>Physical training with emotional intelligence—build strength, reduce pain, and create a sustainable practice.</strong> At Fluxline, we specialize in personalized fitness coaching that adapts to your goals, body, and life. Whether you're returning to movement, working through chronic pain, or pushing your physical limits, we design your training path with care and precision.<br /><br />Every program is tailored to your schedule, body type, and readiness. We work with all bodies, all backgrounds, and all starting points.";

export const EDUCATION_TRAINING_SUMMARY =
  "<strong>Workshops and coaching to help you lead, teach, and communicate with more clarity and embodiment.</strong> Fluxline's Coaching, Education & Leadership offerings guide founders, creatives, and organizations through experiential learning and leadership development. Whether you're leading a team, launching a program, or developing your voice, we offer practical frameworks, live workshops, and personalized coaching to help you build with purpose.<br /><br />Every session is designed to strengthen your leadership presence, clarify your message, and help you show up with confidence in every interaction.";

export const RESONANCE_CORE_SUMMARY =
  "<strong>A guided, structured process to clarify your core story, archetypes, and message for your life or business.</strong> The Resonance Core Framework™ uses archetypal mapping and guided reflection to help you understand your patterns, clarify your story, and align your inner world with your outer work. Whether you're navigating a major life transition, reframing your narrative, or building your legacy, this framework offers structured modules and personalized guidance.<br /><br />Every session is documented. Every insight builds on the last. This is coaching for those ready to do deep work.";

export type ServiceCategoryType =
  | 'body-practice'
  | 'brand-digital'
  | 'depth-strategy';

export interface ServiceCategory {
  id: string;
  title: string;
  description: string; // Plain text description for service cards
  summary: string; // HTML content for detail pages (not currently rendered)
  icon: string;
  path: string;
  category: ServiceCategoryType;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'personal-training',
    title: 'Personal Training & Wellness',
    description: 'Physical training with emotional intelligence.',
    summary: PERSONAL_TRAINING_SUMMARY,
    icon: 'Health',
    path: '/services/personal-training',
    category: 'body-practice',
  },
  {
    id: 'development',
    title: 'Web Development & Digital Architecture',
    description: 'Custom applications and scalable platforms.',
    summary: DEVELOPMENT_SUMMARY,
    icon: 'Code',
    path: '/services/development',
    category: 'brand-digital',
  },
  {
    id: 'design',
    title: 'Brand & Experience Design',
    description: 'Visual identity and user experience design.',
    summary: DESIGN_SUMMARY,
    icon: 'Design',
    path: '/services/design',
    category: 'brand-digital',
  },
  {
    id: 'resonance-core',
    title: 'Resonance Core Framework™',
    description: 'Deep transformation through archetypal mapping.',
    summary: RESONANCE_CORE_SUMMARY,
    icon: 'HeartFill',
    path: '/services/resonance-core',
    category: 'depth-strategy',
  },
  {
    id: 'education-training',
    title: 'Coaching, Education & Leadership',
    description: 'Workshops, coaching, and strategic embodiment.',
    summary: EDUCATION_TRAINING_SUMMARY,
    icon: 'Education',
    path: '/services/education',
    category: 'depth-strategy',
  },
  {
    id: 'consulting',
    title: 'Business Strategy & Systems Alignment',
    description: 'Strategic consulting and operational design.',
    summary: CONSULTING_SUMMARY,
    icon: 'Lightbulb',
    path: '/services/consulting',
    category: 'depth-strategy',
  },
];
