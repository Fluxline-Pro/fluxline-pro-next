/**
 * Service Pricing Data
 * Pricing information for services that offer tiered programs
 */

import { ServicePricing } from './types';

export const SERVICE_PRICING: ServicePricing = {
  'personal-training': {
    tiers: [
      {
        id: 'single-session',
        name: 'Single Session',
        idealFor:
          'Clients needing simplified instruction, unsure about performing exercises, not wanting to commit to a monthly cadence',
        monthlyRate: '$110/session',
      },
      {
        id: 'online-pt-only',
        name: 'Online PT Only',
        idealFor: 'Remote clients, creatives seeking flexible support',
        monthlyRate: 'Starting at $225/month',
        rateNote: '(Varies by term length)',
      },
      {
        id: 'hybrid-pt',
        name: 'Hybrid PT',
        idealFor: 'Local clients seeking in-person sessions + remote structure',
        monthlyRate: 'Starting at $350/month',
        rateNote: '(Varies by term length)',
      },
      {
        id: 'online-hypertrophy',
        name: 'Online Hypertrophy',
        idealFor:
          'Remote clients focused on physique, nutrition, and metabolic coaching',
        monthlyRate: 'Starting at $275/month',
        rateNote: '(Varies by term length)',
      },
      {
        id: 'hybrid-hypertrophy',
        name: 'Hybrid Hypertrophy',
        idealFor:
          'Full-spectrum transformation: movement, nutrition, emotional integration',
        monthlyRate: 'Starting at $450/month',
        rateNote: '(Varies by term length)',
      },
    ],
    features: [
      { name: 'Custom Training Plan' },
      { name: 'Biweekly Check-Ins' },
      { name: 'Discord Access' },
      { name: 'Milestone Reviews' },
      { name: 'Emotional Integration Coaching' },
      { name: 'PTDistinction Portal Access' },
      { name: 'First 2 Sessions Free' },
      { name: 'Cancel Anytime (First 2 Sessions)' },
      { name: 'In-Person Training Sessions' },
      { name: 'Hands-On Form Correction' },
      { name: 'On-Site Meditation & Breathwork' },
      { name: 'Real-Time Cueing & Adjustments' },
      { name: 'Local Access' },
    ],
    comparison: {
      'custom-training-plan': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'biweekly-check-ins': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'discord-access': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'milestone-reviews': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'emotional-integration-coaching': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'ptdistinction-portal-access': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'first-2-sessions-free': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'cancel-anytime': {
        'single-session': false,
        'online-pt-only': true,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'in-person-training-sessions': {
        'single-session': true,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': false,
        'hybrid-hypertrophy': true,
      },
      'hands-on-form-correction': {
        'single-session': true,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': false,
        'hybrid-hypertrophy': true,
      },
      'on-site-meditation-breathwork': {
        'single-session': true,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': false,
        'hybrid-hypertrophy': true,
      },
      'real-time-cueing-adjustments': {
        'single-session': true,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': false,
        'hybrid-hypertrophy': true,
      },
      'local-access': {
        'single-session': true,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': false,
        'hybrid-hypertrophy': true,
      },
    },
  },
};
