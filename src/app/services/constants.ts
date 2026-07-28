/**
 * Services Constants
 * Data and configuration for the Services page
 */

export const FLUXLINE_TAGLINE =
  "We're not done yet—\nbut we're already extraordinary.";
export const FLUXLINE_SECONDARY_TAGLINE =
  'Modular by design. Resonant by nature.';

export const SERVICES_SUMMARY =
  'We help individuals and businesses build stronger bodies, clearer brands, and resilient systems. From web development and brand design to personal training, coaching, and strategic consulting—we bring technical expertise and emotional intelligence together so your inner and outer work fully match.';

export const CONSULTING_SUMMARY =
  "<strong>Strategic consulting and operational design to align your offers, systems, and day-to-day operations.</strong> Fluxline's Business Strategy & Systems Alignment offering guides founders and small teams through designing systems that scale, strategies that work, and operations that reflect their core values.<br /><br />Whether you're launching a new venture, optimizing your operations, or preparing to scale, we offer practical frameworks, tech integration support, and strategic planning that turns friction into flow. Every engagement is tailored to your growth phase and operational needs.";

export const DEVELOPMENT_SUMMARY =
  "<strong>Design and build your website or web app, from simple sites to full platforms.</strong> Fluxline creates custom web applications with intuitive interfaces and reliable infrastructure. Whether you're launching an MVP, scaling a full-stack platform, or building a custom app, our development process combines clear user experience with long-term maintainability.<br /><br />From frontend design to backend logic and cloud deployment, we guide founders and creatives through a build process that's transparent, empowering, and aligned with your goals. Your product is built to work well and evolve with you.";

export const DESIGN_SUMMARY =
  "<strong>Visual identity and user experience design so your brand feels cohesive and clear.</strong> Fluxline Design creates brand identities and digital experiences that look good and feel aligned with who you are. Every logo, layout, and interface is designed to reflect your story and connect with your audience. Whether you're launching, scaling, or building your legacy, we design with care, precision, and strategic thinking.";

export const PERSONAL_TRAINING_SUMMARY =
  "<strong>Physical training with emotional intelligence—build strength, reduce pain, and create a sustainable practice.</strong> At Fluxline, we specialize in personalized fitness coaching that adapts to your goals, body, and life. Whether you're returning to movement, working through chronic pain, or pushing your physical limits, we design your training path with care and precision. This is embodied identity work—training that aligns your physical practice with who you're becoming.<br /><br />Every program is tailored to your schedule, body type, and readiness. We work with all bodies, all backgrounds, and all starting points.";

export const EDUCATION_TRAINING_SUMMARY =
  "<strong>Workshops and coaching to help you lead, teach, and communicate with more clarity and embodiment.</strong> Fluxline's Coaching, Education & Leadership offerings guide founders, creatives, and organizations through experiential learning and leadership development. Whether you're leading a team, launching a program, or developing your voice, we offer practical frameworks, live workshops, and personalized coaching to help you build with purpose.<br /><br />Every session is designed to strengthen your leadership presence, clarify your message, and help you show up with confidence in every interaction.";

export const RESONANCE_CORE_SUMMARY =
  "<strong>A transformational system for decoding your cues, reframing your narratives, and authoring the identity you choose to live from.</strong> The Resonance Core Framework™ is a guided, structured process that helps you understand the patterns shaping your life — somatic, emotional, narrative, and identity based. Through archetypal mapping, reflective inquiry, and identity recalibration, you learn to align your inner world with the life, work, and relationships you're trying to build.<br /><br />This isn't generic coaching. This is <strong>identity work</strong>, <strong>narrative work</strong>, and <strong>embodiment work</strong> — woven into a single, coherent system.";

export const FRACTIONAL_LEADERSHIP_SUMMARY =
  "<strong>Embedded design and technology leadership for a season — senior direction without a full-time hire.</strong> You get the decision-making velocity of a CTO or design director, scoped to the work that actually needs it, without the overhead of a permanent executive.<br /><br />Whether you're navigating a critical growth phase, launching a new product, or rebuilding your technical or design foundation, Fluxline provides the senior perspective and hands-on direction to move fast with precision. Every engagement is scoped to your timeline, team, and the specific leadership gap you need to fill.";

export type ServiceCategoryType =
  | 'body-practice'
  | 'brand-digital'
  | 'depth-strategy';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string; // Plain text description for service cards
  summary: string; // HTML content for detail pages (not currently rendered)
  icon: string;
  path: string;
  category: ServiceCategoryType;
  faqs?: ServiceFAQ[]; // FAQ items for FAQPage schema and AI ingest
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'design',
    title: 'Brand & Experience Design',
    description: 'Visual identity expressed through simplified human-centered design and experience.',
    summary: DESIGN_SUMMARY,
    icon: 'Design',
    path: '/services/design',
    category: 'brand-digital',
    faqs: [
      {
        question: "What does Fluxline's brand and experience design service include?",
        answer:
          'Our Brand & Experience Design service covers visual identity, logo design, design systems, digital experience design, and cross-platform UI/UX. Every deliverable is aligned with your brand story and strategic goals.',
      },
      {
        question: "Who is Fluxline's brand design service best suited for?",
        answer:
          'Our design service is ideal for founders, creatives, and growing businesses who are launching, rebranding, or scaling and need a cohesive visual identity that connects emotionally with their audience.',
      },
      {
        question: 'Does Fluxline offer standalone logo design or only full brand packages?',
        answer:
          'We offer modular design engagements — from standalone logo creation to complete brand identity systems and digital experience design — so you can start where you are and grow from there.',
      },
      {
        question: 'How does Fluxline approach user experience design?',
        answer:
          'We combine user-centered design methodologies with strategic brand thinking to create interfaces that are intuitive, accessible, and emotionally resonant. Every design decision traces back to a clear user and business goal.',
      },
    ],
  },
  {
    id: 'development',
    title: 'Web Development & Digital Architecture',
    description: 'Custom web applications scaled with maximum precision and modularity.',
    summary: DEVELOPMENT_SUMMARY,
    icon: 'Code',
    path: '/services/development',
    category: 'brand-digital',
    faqs: [
      {
        question: 'What types of web development projects does Fluxline handle?',
        answer:
          'Fluxline builds custom web applications, full-stack platforms, MVPs, and cloud-deployed architectures. We work with Next.js, React, Azure, and modern tooling to deliver products that are maintainable and scalable.',
      },
      {
        question: 'Does Fluxline provide cloud architecture consulting?',
        answer:
          'Yes. Cloud architecture is a core competency at Fluxline. We design and implement cloud infrastructure on Azure, including CI/CD pipelines, serverless functions, static web apps, and storage solutions.',
      },
      {
        question: "What is Fluxline's web development process?",
        answer:
          'Our process is transparent and founder-friendly: discovery and requirements, architecture design, iterative development with regular check-ins, deployment, and post-launch support. Every build is documented for long-term maintainability.',
      },
      {
        question: 'Can Fluxline help migrate an existing site to a modern stack?',
        answer:
          'Yes. We regularly help founders and businesses migrate from legacy systems to modern stacks like Next.js and Azure. We prioritize minimizing downtime and preserving SEO equity during the transition.',
      },
    ],
  },
  {
    id: 'personal-training',
    title: 'Personal Training & Wellness',
    description: 'Embodied identity work through physical and emotional transformation.',
    summary: PERSONAL_TRAINING_SUMMARY,
    icon: 'Health',
    path: '/services/personal-training',
    category: 'body-practice',
    faqs: [
      {
        question: "What makes Fluxline's personal training different from a standard gym trainer?",
        answer:
          'Fluxline personal training integrates emotional intelligence and identity work into physical coaching. We design adaptive programs for all bodies and starting points, treating fitness as embodied identity work rather than just performance metrics.',
      },
      {
        question: 'Does Fluxline offer remote personal training sessions?',
        answer:
          'Yes. We offer flexible remote coaching options alongside in-person sessions, designed around your schedule, goals, and physical starting point.',
      },
      {
        question: "Can Fluxline's training programs accommodate chronic pain or physical limitations?",
        answer:
          'Absolutely. We specialize in adaptive training for clients managing chronic pain, returning from injury, or working with physical limitations. Every program is built around your body and its current needs.',
      },
      {
        question: 'How is a Fluxline training program structured?',
        answer:
          'Programs begin with a comprehensive assessment of your goals, movement patterns, and lifestyle. We then build a phased program with regular check-ins, adjustments, and mindset support to ensure sustainable progress.',
      },
    ],
  },
  {
    id: 'resonance-core',
    title: 'Resonance Core Framework™',
    description: 'Identity coherence, narrative reframing, and embodiment integration.',
    summary: RESONANCE_CORE_SUMMARY,
    icon: 'HeartFill',
    path: '/services/resonance-core',
    category: 'body-practice',
    faqs: [
      {
        question: 'What is the Resonance Core Framework™?',
        answer:
          'The Resonance Core Framework™ is a structured transformational system that helps you decode somatic, emotional, and narrative cues, reframe limiting patterns, and author the identity you choose to live from. It combines archetypal mapping, reflective inquiry, and identity recalibration.',
      },
      {
        question: 'Who is the Resonance Core Framework™ designed for?',
        answer:
          'It is designed for individuals — founders, creatives, and professionals — who feel misaligned between who they are and how they show up in work, relationships, or daily life, and want a structured, coherent process to close that gap.',
      },
      {
        question: 'How does the Resonance Core Framework™ differ from traditional coaching?',
        answer:
          'Unlike generic coaching, the Resonance Core Framework™ is a systematic identity architecture process. It addresses somatic cues, emotional patterns, and narrative structures simultaneously, producing deep and lasting identity coherence rather than surface-level behavior change.',
      },
      {
        question: 'How long does a Resonance Core engagement typically take?',
        answer:
          'Engagements are modular and vary by individual need. Core programs typically run 8–12 weeks, with options for extended support as you integrate your new identity into daily life and work.',
      },
    ],
  },
  {
    id: 'consulting',
    title: 'Business Strategy & Systems Alignment',
    description: 'Strategic consulting and operational design.',
    summary: CONSULTING_SUMMARY,
    icon: 'Lightbulb',
    path: '/services/consulting',
    category: 'depth-strategy',
    faqs: [
      {
        question: "What does Fluxline's business strategy and systems alignment service cover?",
        answer:
          'We offer strategic systems design, operational optimization, modular frameworks for scalable growth, tech integration, business soul alignment, change management, and leadership coaching — all tailored to your growth phase.',
      },
      {
        question: "What types of businesses does Fluxline's consulting service serve?",
        answer:
          'We primarily serve founders, small teams, and growing businesses across industries who need practical, values-aligned strategy and operational clarity — not generic business advice.',
      },
      {
        question: 'How does Fluxline approach strategic consulting engagements?',
        answer:
          'Every engagement begins with a discovery phase to understand your vision, current friction points, and operational reality. We then co-design a tailored strategy and implementation roadmap that is transparent, adaptable, and grounded in your core values.',
      },
      {
        question: 'Can Fluxline help with content ecosystem design and content strategy?',
        answer:
          "Yes. Content ecosystem design — structuring, tagging, publishing, and distributing content so it works as a coherent, searchable, AI-ingestible knowledge base — is one of Fluxline's core competencies.",
      },
    ],
  },
  {
    id: 'fractional-leadership',
    title: 'Fractional Leadership',
    description:
      'Embedded senior leadership for a season — CTO or design director direction without the full-time hire.',
    summary: FRACTIONAL_LEADERSHIP_SUMMARY,
    icon: 'Crown',
    path: '/services/fractional-leadership',
    category: 'depth-strategy',
    faqs: [
      {
        question: 'What does Fractional Leadership mean at Fluxline?',
        answer:
          "Fractional Leadership means you get access to senior-level CTO or design director expertise on a part-time, engagement-based basis. Fluxline embeds into your team for a defined season — providing strategic direction, technical or design oversight, and hands-on leadership without the cost or commitment of a full-time executive hire.",
      },
      {
        question: 'Who is Fractional Leadership designed for?',
        answer:
          'It is designed for small businesses, startups, and growing teams that need experienced leadership to navigate a critical phase — a product launch, a technical pivot, a design system overhaul, or a scaling challenge — but are not yet ready or able to hire a full-time executive.',
      },
      {
        question: 'What is the difference between Fractional CTO and Fractional Design Lead?',
        answer:
          'A Fractional CTO focuses on technical strategy, stack decisions, architecture, and engineering direction. A Fractional Design Lead focuses on design system vision, quality standards, critique processes, and cross-functional design leadership. Fluxline can provide either or both depending on your team composition and current gaps.',
      },
      {
        question: 'How long does a Fractional Leadership engagement typically last?',
        answer:
          'Engagements are scoped to your specific season of need. Typical arrangements range from one to six months, with options to extend. Every engagement is defined at the outset so expectations are aligned on scope, availability, and deliverables.',
      },
    ],
  },
  {
    id: 'education-training',
    title: 'Coaching, Education & Leadership',
    description: 'Workshops, coaching, and strategic embodiment.',
    summary: EDUCATION_TRAINING_SUMMARY,
    icon: 'Education',
    path: '/services/education',
    category: 'depth-strategy',
    faqs: [
      {
        question: "What does Fluxline's coaching and education service include?",
        answer:
          'Our Coaching, Education & Leadership service includes experiential learning workshops, leadership development coaching, emotional intelligence training, custom curriculum design, team dynamics facilitation, and ongoing community support.',
      },
      {
        question: 'Does Fluxline offer group workshops or only individual coaching?',
        answer:
          'We offer both. Individual coaching for founders and leaders, as well as group workshops for teams and organizations. Programs are custom-designed to fit your team size, goals, and industry context.',
      },
      {
        question: "What leadership outcomes can clients expect from Fluxline's coaching programs?",
        answer:
          'Clients develop stronger leadership presence, clearer communication, improved emotional regulation, greater confidence in decision-making, and the ability to inspire and align their teams around a shared vision.',
      },
      {
        question: 'Can Fluxline design custom training curricula for organizations?',
        answer:
          'Yes. We design and deliver custom educational programs for organizations that need tailored learning experiences — from onboarding frameworks to leadership development tracks aligned with company culture and values.',
      },
    ],
  },
];
