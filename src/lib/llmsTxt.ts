/**
 * Builds /llms.txt: the plain-text summary AI crawlers and assistants read to
 * answer "what is Fluxline, what does it offer, and what does it cost".
 *
 * Generated from the same constants the pages render (`fluxlineStory.ts`,
 * `resonanceCore.ts`, the service catalog), so it cannot drift from the site.
 * Served by `src/app/llms.txt/route.ts` as a static file.
 */

import { SERVICE_CATEGORIES } from '@/app/services/constants';
import {
  AUDIENCES,
  BOOK_PREORDER,
  ELEVATOR_PITCH,
  FLUXLINE_MISSION_LINE,
  FOUNDER_LINE,
  HOW_IT_WORKS,
  PRICING_FAQ,
  SERVICE_STORIES,
} from '@/lib/fluxlineStory';
import {
  RCF_CONCEPTS,
  RCF_FAQ,
  RCF_FRAMEWORK_PATH,
  RCF_ONE_LINER,
  RCF_PREVIEW_PDF,
  RCF_RELEASE_WINDOW,
  RCF_RINGS,
  TRI_FRAMEWORK_URL,
  TRI_SITE_URL,
  TRI_START_HERE_URL,
  TW_FRAMEWORK_URL,
  TW_SITE_URL,
  rcfFaqAnswerText,
} from '@/lib/resonanceCore';
import { COMPANY_VALUES } from '@/lib/siteContent';

const SITE = 'https://www.fluxline.pro';
const RCF_URL = `${SITE}${RCF_FRAMEWORK_PATH}/`;

function link(label: string, url: string, note?: string): string {
  return note ? `- [${label}](${url}): ${note}` : `- [${label}](${url})`;
}

export function buildLlmsTxt(): string {
  const services = SERVICE_STORIES.flatMap((story) => {
    const service = SERVICE_CATEGORIES.find((s) => s.id === story.id);
    if (!service) return [];
    return [
      link(
        service.title,
        `${SITE}${service.path}/`,
        `${story.outcome} ${story.rcfTie} Price: ${story.priceLines.join('; ')}.`
      ),
    ];
  });

  const questions: [string, string][] = [
    ...RCF_FAQ.map((f): [string, string] => [f.question, rcfFaqAnswerText(f)]),
    ...PRICING_FAQ.map((f): [string, string] => [f.question, f.answer]),
  ];

  const sections: string[] = [
    '# Fluxline Resonance Group',
    `> ${ELEVATOR_PITCH[0]} Fluxline Resonance Group, LLC is a founder-led practice in Salt Lake City, Utah, working in person and online. Its method is The Resonance Core Framework™ (RCF), created by founder Terence Waters.`,
    ELEVATOR_PITCH.slice(1).join('\n\n'),
    `${FLUXLINE_MISSION_LINE} ${FOUNDER_LINE} The RCF is a decision and identity framework, not therapy. Structure the Shift. Modular by design. Resonant by nature.`,

    '## How Fluxline works',
    HOW_IT_WORKS.map((step, i) => `${i + 1}. ${step.title}: ${step.body}`).join(
      '\n'
    ),

    '## Who Fluxline helps',
    AUDIENCES.map((a) => `- ${a.title}: ${a.body}`).join('\n'),

    '## Core pages',
    [
      link(
        'Home',
        `${SITE}/`,
        'What Fluxline is, who it helps, and how it works'
      ),
      link(
        'Pricing',
        `${SITE}/pricing/`,
        'Starting prices for every service and the book pre-order'
      ),
      link('Services', `${SITE}/services/`, 'The five offerings'),
      link(
        'The Resonance Core Framework™',
        RCF_URL,
        'The canonical reference for the framework: what it is, its three parts, its tools, the six core values, and FAQ'
      ),
      link(
        'Books',
        `${SITE}/books/`,
        'The Resonance Core Framework™ book, workbook, and audiobook'
      ),
      link(
        'Pre-order the book (Fluxline Store)',
        BOOK_PREORDER.url,
        `Digital editions, targeted for ${RCF_RELEASE_WINDOW}. ${BOOK_PREORDER.priceLabel}`
      ),
      link(
        'RCF Preview (PDF)',
        `${SITE}${RCF_PREVIEW_PDF}`,
        "The book's introduction, free to read"
      ),
      link('Contact', `${SITE}/contact/`, 'Book a free consultation'),
    ].join('\n'),

    '## Services and starting prices',
    'Every engagement starts with a free consultation.',
    services.join('\n'),

    '## The Resonance Core Framework™',
    `${RCF_ONE_LINER} Resonance is alignment between your identity, values, feelings, and actions. The framework has three parts:`,
    RCF_RINGS.map((ring) => `- ${ring.part}, ${ring.title}: ${ring.body}`).join(
      '\n'
    ),

    '## Key terms',
    'Definitions as used on the framework page. Each links to its anchor there.',
    RCF_CONCEPTS.map((c) => link(c.name, `${RCF_URL}#${c.id}`, c.summary)).join(
      '\n'
    ),

    '## Six core values',
    'The Decision Integrity Index (The DII) checks each decision against these six values.',
    COMPANY_VALUES.map((v) => `- ${v.title}: ${v.description}`).join('\n'),

    '## Questions this site answers',
    questions.map(([question, answer]) => `- ${question} ${answer}`).join('\n'),

    '## Optional',
    [
      link(
        'Blog',
        `${SITE}/blog/`,
        'Articles on identity, decisions, design, and systems'
      ),
      link(
        'Case studies',
        `${SITE}/case-studies/`,
        'How Fluxline applies the framework to real work'
      ),
      link(
        'Portfolio',
        `${SITE}/portfolio/`,
        'Web, brand, and software projects'
      ),
      link('Press releases', `${SITE}/press-release/`),
      link(
        'Glossary',
        `${SITE}/legal/glossary/`,
        "Fluxline's mythic and technical terminology"
      ),
      link('Pre-order terms', `${SITE}${BOOK_PREORDER.termsPath}/`),
    ].join('\n'),

    '## Fluxline Ecosystem',
    [
      link(
        'The Resonant Identity Podcast',
        `${TRI_SITE_URL}/`,
        'Where the Framework is spoken, weekly'
      ),
      link(
        'Start here (podcast)',
        TRI_START_HERE_URL,
        'Where new listeners begin'
      ),
      link(
        'The framework on the podcast',
        TRI_FRAMEWORK_URL,
        'Each RCF concept with the episodes that explore it'
      ),
      link('Fluxline Store', BOOK_PREORDER.url, 'Where the book is sold'),
      link(
        'Terence Waters',
        `${TW_SITE_URL}/`,
        'Founder of Fluxline and author of The Resonance Core Framework™'
      ),
      link(
        'The RCF on TerenceWaters.com',
        TW_FRAMEWORK_URL,
        "The author's summary of the framework"
      ),
    ].join('\n'),
  ];

  return `${sections.join('\n\n')}\n`;
}
