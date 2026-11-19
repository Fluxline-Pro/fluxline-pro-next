/**
 * Book a Conversation: the dialog's words (#408), ported from
 * terencewaters.com and written in Fluxline's "we" voice. Every opener reads
 * its label and fallback link from BOOK_A_CONVERSATION.
 */

import { TIDYCAL_BASE_URL } from '@/components/ConsultationStepper/constants';

/** The TidyCal page: the no-JavaScript fallback. */
export const TIDYCAL_URL = TIDYCAL_BASE_URL;

/** Where "send us a message instead" goes when booking fails. */
export const MESSAGE_FALLBACK_HREF = '/contact/#note';

export interface BookingLink {
  label: string;
  href: string;
}

export const BOOK_A_CONVERSATION: BookingLink = {
  label: 'Book a Conversation',
  // Openers open the full-screen dialog; without JavaScript the link goes
  // to /book/, which offers TidyCal directly.
  href: '/book/',
};

/**
 * The booking flow's own words (its "chrome"). The services, questions,
 * options, meeting lengths and consent text come from
 * ConsultationStepper/constants.ts.
 */
export const BOOKING_FLOW = {
  nameShort: 'Please enter your full name (at least 2 characters).',
  stepLabels: {
    1: 'Services',
    2: 'Your Needs',
    3: 'Contact & Schedule',
  },
  progress: 'Step {n} of 3',
  stepsLabel: 'Booking steps',
  step1: {
    title: 'What do you need to discuss?',
    text: "Pick one or more. Not sure? Choose “I don't know / Help me choose” and we'll work it out on the call.",
    next: 'Next: tell us more',
    error: 'Please select at least one option to continue.',
  },
  step2: {
    title: 'Want to tell us more?',
    text: 'Answer what you can. It helps us make the most of our time together.',
    helpMeChoose:
      "No problem. We'll work out what fits on the call. Just add your details in the next step.",
    required: 'This field is required.',
    next: 'Next: Contact & Schedule',
  },
  step3: {
    title: 'Where can we reach you?',
    text: 'Add your details, then choose “Schedule a time” to pick a slot right here on the page.',
    submit: 'Schedule a time',
    submitting: 'Opening calendar…',
  },
  back: 'Back',
  errors: {
    generic:
      'Something went wrong on our end, and your answers are still here. Try again, or send us a message instead.',
    messageLink: 'Send us a message',
    validation:
      "Something in the form didn't go through. Check your details and try again.",
    tidyCalLink: 'Or pick a time on TidyCal',
  },
  schedule: {
    title: "Pick a time. We'll see your note before we talk.",
    placeholder:
      'The calendar comes from TidyCal. It loads when you ask for it, so nothing from TidyCal runs on this page until then.',
    load: 'Load the calendar',
    newTab: 'Open in New Tab',
    frameTitle: 'TidyCal booking calendar',
    done: "I've Scheduled My Time",
  },
  success: {
    title: "You're booked.",
    text: "We're looking forward to it. Check your inbox for the details.",
  },
  noScript:
    'The booking steps need JavaScript. You can book straight on TidyCal instead.',
  noScriptLink: 'Book on TidyCal',
} as const;

/** Form errors shared with the contact form on terencewaters.com. */
export const FORM_ERRORS = {
  rateLimited:
    "That's a lot of tries in a short time. Give it a few minutes, then try again.",
  network: "We couldn't reach the server. Check your connection and try again.",
} as const;
