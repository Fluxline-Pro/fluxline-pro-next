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
  "<strong>Physical training with emotional intelligence—build strength, reduce pain, and create a sustainable practice.</strong> At Fluxline, we specialize in personalized fitness coaching that adapts to your goals, body, and life. Whether you're returning to movement, working through chronic pain, or pushing your physical limits, we design your training path with care and precision. This is embodied identity work—training that aligns your physical practice with who you're becoming.<br /><br />Every program is tailored to your schedule, body type, and readiness. We work with all bodies, all backgrounds, and all starting points. Train in person in Salt Lake City and along Utah's Wasatch Front, or remotely from wherever you are.";

export const RESONANCE_CORE_SUMMARY =
  '<strong>A transformational system for decoding your cues, reframing your narratives, and authoring the identity you choose to live from.</strong> <a href="/resonance-core-framework/">The Resonance Core Framework™</a> is a guided, structured process that helps you understand the patterns shaping your life — somatic, emotional, narrative, and identity based. Through archetypal mapping, reflective inquiry, and identity recalibration, you learn to align your inner world with the life, work, and relationships you\'re trying to build.<br /><br />This isn\'t generic coaching. This is <strong>identity work</strong>, <strong>narrative work</strong>, and <strong>embodiment work</strong> — woven into a single, coherent system.<br /><br /><strong>Identity in Motion</strong> is a $99, four-week guided program for people who keep getting stuck with their health goals. It uses the framework to map internal roles and blocks, define an identity that supports consistency, and build sustainable habits through embodied practice. <a href="/scrolls/pdfs/Fluxline_RCF_4Week_Unblocking_Program_v4.pdf" target="_blank" rel="noopener noreferrer">Download the Identity in Motion white paper (PDF)</a>.';

export type ServiceCategoryType =
  | 'foundation'
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
  /** Search title for the detail page, before the site suffix. Defaults to `title`. */
  seoTitle?: string;
  /** Meta description for the detail page (about 140 to 160 characters). Defaults to the summary. */
  seoDescription?: string;
  /** Alt text for the detail page's rail image. Defaults to `title`. */
  imageAlt?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'design',
    title: 'Brand & Experience Design',
    description:
      'Visual identity expressed through simplified human-centered design and experience.',
    summary: DESIGN_SUMMARY,
    icon: 'Design',
    path: '/services/design',
    seoTitle: 'Brand Identity & Experience Design',
    seoDescription:
      'Brand identity and experience design for founders, creatives, and growing businesses: logos, visual identity, design systems, and UX that tell your story.',
    imageAlt: 'Rainbow paint strokes running down a white canvas',
    category: 'brand-digital',
    faqs: [
      {
        question:
          "What does Fluxline's brand and experience design service include?",
        answer:
          'Our Brand & Experience Design service covers visual identity, logo design, design systems, digital experience design, and cross-platform UI/UX. Every deliverable is aligned with your brand story and strategic goals.',
      },
      {
        question: "Who is Fluxline's brand design service best suited for?",
        answer:
          'Our design service is ideal for founders, creatives, and growing businesses who are launching, rebranding, or scaling and need a cohesive visual identity that connects emotionally with their audience.',
      },
      {
        question:
          'Does Fluxline offer standalone logo design or only full brand packages?',
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
    description:
      'Custom web applications scaled with maximum precision and modularity.',
    summary: DEVELOPMENT_SUMMARY,
    icon: 'Code',
    path: '/services/development',
    seoTitle: 'Web Development & Cloud Architecture',
    seoDescription:
      'Custom websites, web apps, and Azure cloud architecture for founders and creatives, built with Next.js and React for clear UX and long-term maintainability.',
    imageAlt: 'Columns of binary code glowing on a dark teal screen',
    category: 'brand-digital',
    faqs: [
      {
        question:
          'What types of web development projects does Fluxline handle?',
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
        question:
          'Can Fluxline help migrate an existing site to a modern stack?',
        answer:
          'Yes. We regularly help founders and businesses migrate from legacy systems to modern stacks like Next.js and Azure. We prioritize minimizing downtime and preserving SEO equity during the transition.',
      },
    ],
  },
  {
    id: 'personal-training',
    title: 'Personal Training & Wellness',
    description:
      'Embodied identity work through physical and emotional transformation.',
    summary: PERSONAL_TRAINING_SUMMARY,
    icon: 'Health',
    path: '/services/personal-training',
    seoTitle: 'Personal Training in Salt Lake City',
    seoDescription:
      "Personal training in Salt Lake City and online: adaptive strength and movement programs for every body, with in-person sessions along Utah's Wasatch Front.",
    imageAlt:
      'A man in training shorts showing a strong, tattooed build against a dark wall',
    category: 'body-practice',
    faqs: [
      {
        question:
          "What makes Fluxline's personal training different from a standard gym trainer?",
        answer:
          'Fluxline personal training integrates emotional intelligence and identity work into physical coaching. We design adaptive programs for all bodies and starting points, treating fitness as embodied identity work rather than just performance metrics.',
      },
      {
        question: 'Does Fluxline offer remote personal training sessions?',
        answer:
          'Yes. We offer flexible remote coaching options alongside in-person sessions, designed around your schedule, goals, and physical starting point.',
      },
      {
        question:
          "Can Fluxline's training programs accommodate chronic pain or physical limitations?",
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
    description:
      'Identity coherence, narrative reframing, and embodiment integration.',
    summary: RESONANCE_CORE_SUMMARY,
    icon: 'HeartFill',
    path: '/services/resonance-core',
    seoTitle: 'Resonance Core Framework™ Coaching',
    seoDescription:
      'Identity coaching built on The Resonance Core Framework™, a practical system for making change that holds. For founders, leaders, and creatives.',
    imageAlt:
      'The Resonance Core Framework™ DRIVE compass logo on a rainbow swirl',
    category: 'foundation',
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
        question:
          'How does the Resonance Core Framework™ differ from traditional coaching?',
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
    seoDescription:
      'Business strategy and systems alignment consulting for founders and small teams: offers, operations, and tech integration designed around your core values.',
    imageAlt: 'A person in a shirt and tie holding up a tablet that reads HELP',
    category: 'depth-strategy',
    faqs: [
      {
        question:
          "What does Fluxline's business strategy and systems alignment service cover?",
        answer:
          'We offer strategic systems design, operational optimization, modular frameworks for scalable growth, tech integration, business soul alignment, change management, and leadership coaching — all tailored to your growth phase.',
      },
      {
        question:
          "What types of businesses does Fluxline's consulting service serve?",
        answer:
          'We primarily serve founders, small teams, and growing businesses across industries who need practical, values-aligned strategy and operational clarity — not generic business advice.',
      },
      {
        question:
          'How does Fluxline approach strategic consulting engagements?',
        answer:
          'Every engagement begins with a discovery phase to understand your vision, current friction points, and operational reality. We then co-design a tailored strategy and implementation roadmap that is transparent, adaptable, and grounded in your core values.',
      },
      {
        question:
          'Can Fluxline help with content ecosystem design and content strategy?',
        answer:
          "Yes. Content ecosystem design — structuring, tagging, publishing, and distributing content so it works as a coherent, searchable, AI-ingestible knowledge base — is one of Fluxline's core competencies.",
      },
    ],
  },
];
