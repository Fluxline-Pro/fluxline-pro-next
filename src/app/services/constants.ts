/**
 * Services Constants
 * Data and configuration for the Services page
 */

export const FLUXLINE_TAGLINE = "We're not done yet—\nbut we're already extraordinary.";
export const FLUXLINE_SECONDARY_TAGLINE = 'Modular by design. Resonant by nature.';

export const SERVICES_SUMMARY =
  'Fluxline offers strategic, emotionally intelligent, and design-forward solutions for founders, creatives, and organizations seeking transformation. Every service is a curriculum gate—crafted to align your identity, systems, and mission with intentionality and resonance.';

export const CONSULTING_SUMMARY =
  "<strong>This is where clarity meets infrastructure.</strong> Fluxline's Business Strategy & Systems Alignment offering guides founders and small teams through the sacred work of designing systems that scale, strategies that resonate, and operations that reflect their deepest values.<br /><br />Every engagement is tailored to your archetype, growth phase, and operational rhythm—ensuring your systems serve not just your mission, but your legacy.<br /><br />Whether you're launching a new venture, optimizing your backend, or preparing to scale, we offer modular frameworks, tech integration, and strategic alignment rituals that turn friction into flow. This isn't just consulting—<strong>it's curriculum for your business soul.</strong>";

export const DEVELOPMENT_SUMMARY =
  "<strong>At Fluxline, we don't just build websites—we architect digital temples.</strong> Every line of code, every interface, every deployment pipeline is designed to serve your mission with modular clarity and emotional intelligence. Whether you're launching a lean MVP, scaling a full-stack platform, or immortalizing your brand through a custom app, our development rituals blend intuitive UX, resilient infrastructure, and long-term maintainability. <br /><br />From frontend flow to backend logic, cloud architecture to CI/CD pipelines, we guide founders and creatives through a build process that feels intentional, empowering, and aligned. Your product isn't just functional—<strong>it's a living system, built to evolve</strong>.";

export const DESIGN_SUMMARY =
  "Fluxline Design is where strategy meets symbolism. We architect visual identities and digital experiences that don't just look good—<strong>they feel aligned</strong>. Every logo, layout, and interface is a ritual of clarity, crafted to reflect your evolution and resonate with your audience. Whether you're launching, scaling, or immortalizing your legacy, we design with emotional intelligence, modular precision, and mythic depth.";

export const PERSONAL_TRAINING_SUMMARY =
  "<strong>Training is not just physical—it's emotional, symbolic, and sovereign.</strong> At Fluxline, we specialize in modular coaching systems that adapt to your goals, limitations, and breakthroughs. Whether you're returning to movement, navigating chronic pain, or refining your edge, we design your path with precision and care.<br /><br />Every offering is tailored to your body, schedule, and emotional readiness. We work with all bodies, all backgrounds, and all thresholds. This is not just fitness—<strong><em>it's felt transformation</em></strong>.";

export const EDUCATION_TRAINING_SUMMARY =
  "This isn't just training—<strong>it's transmission</strong>. Fluxline's Coaching, Education & Leadership offerings guide founders, creatives, and organizations through experiential learning, emotional intelligence, and strategic embodiment. Whether you're leading a team, launching a curriculum, or refining your influence, we offer modular frameworks, live workshops, and personalized coaching to help you build with purpose.<br/><br />Every session is designed to activate your leadership archetype, align your mission with emotional cadence, and cultivate sovereign presence in every interaction. This is education for those ready to lead with clarity, courage, and creative truth.";

export const RESONANCE_CORE_SUMMARY =
  "<strong>The Resonance Core Framework™ is not just coaching—it's a curriculum of becoming.</strong> Through archetypal mapping, emotional emergence, and symbolic ritual, we guide individuals through deep transformation. Whether you're navigating a threshold, reframing your story, or anchoring your legacy, this framework offers structured modules, personalized rituals, and breakthrough documentation to align your inner world with your outer mission. Every session is a scroll. Every insight, a gate. This is coaching for those ready to reclaim their light.";

export interface ServiceCategory {
  id: string;
  title: string;
  description: string; // Plain text description for service cards
  summary: string; // HTML content for detail pages (not currently rendered)
  icon: string;
  path: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'consulting',
    title: 'Business Strategy & Systems Alignment',
    description: 'Strategic consulting and operational design.',
    summary: CONSULTING_SUMMARY,
    icon: 'Lightbulb',
    path: '/services/consulting',
  },
  {
    id: 'development',
    title: 'Web Development & Digital Architecture',
    description: 'Custom applications and scalable platforms.',
    summary: DEVELOPMENT_SUMMARY,
    icon: 'Code',
    path: '/services/development',
  },
  {
    id: 'design',
    title: 'Brand & Experience Design',
    description: 'Visual identity and user experience design.',
    summary: DESIGN_SUMMARY,
    icon: 'Design',
    path: '/services/design',
  },
  {
    id: 'personal-training',
    title: 'Personal Training & Wellness',
    description: 'Physical training with emotional intelligence.',
    summary: PERSONAL_TRAINING_SUMMARY,
    icon: 'Health',
    path: '/services/personal-training',
  },
  {
    id: 'education-training',
    title: 'Coaching, Education & Leadership',
    description: 'Workshops, coaching, and strategic embodiment.',
    summary: EDUCATION_TRAINING_SUMMARY,
    icon: 'Education',
    path: '/services/education',
  },
  {
    id: 'resonance-core',
    title: 'Resonance Core Framework™',
    description: 'Deep transformation through archetypal mapping.',
    summary: RESONANCE_CORE_SUMMARY,
    icon: 'HeartFill',
    path: '/services/resonance-core',
  },
];
