/**
 * Service Pricing Data
 * Pricing information for services that offer tiered programs
 */

import { on } from 'stream';
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
      { name: 'In-Person Training Sessions' },
      { name: 'Hands-On Form Correction' },
      { name: 'On-Site Meditation & Breathwork' },
      { name: 'Real-Time Cueing & Adjustments' },
      { name: 'Local Access in Wasatch Front Utah' },
      { name: 'Nutrition Coaching' },
      { name: 'Recipes & Meal Plans' },
      { name: 'Physique Optimization Strategy' },
      { name: 'Cycle Tracking / Fasting Protocols' },
      { name: 'Metabolic Phase Mapping' },
      { name: 'Muscle-building Specific Programming' },
      { name: 'Progressive Overload Tracking' },
      { name: 'Supplemental Recovery Rituals' },
      { name: 'Hormonal Phase Integration' },
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
      'local-access-in-wasatch-front-utah': {
        'single-session': true,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': false,
        'hybrid-hypertrophy': true,
      },
      'nutrition-coaching': {
        'single-session': false,
        'online-pt-only': 'Basic only; advanced coaching available',
        'hybrid-pt': 'Basic only; advanced coaching available',
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'recipes-meal-plans': {
        'single-session': false,
        'online-pt-only': 'Basic through Discord Server',
        'hybrid-pt': 'Basic through Discord Server',
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'physique-optimization-strategy': {
        'single-session': false,
        'online-pt-only': 'Basic movement fixes for body sculpting offered',
        'hybrid-pt': 'Basic movement fixes for body sculpting offered',
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'cycle-tracking-fasting-protocols': {
        'single-session': false,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'metabolic-phase-mapping': {
        'single-session': false,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'muscle-building-specific-programming': {
        'single-session': false,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'progressive-overload-tracking': {
        'single-session': false,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'supplemental-recovery-rituals': {
        'single-session': false,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
      'hormonal-phase-integration': {
        'single-session': false,
        'online-pt-only': false,
        'hybrid-pt': true,
        'online-hypertrophy': true,
        'hybrid-hypertrophy': true,
      },
    },
  },
  design: {
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        idealFor:
          'A starting company needing initial branding and logo design',
        monthlyRate: '$800',
      },
      {
        id: 'signature',
        name: 'Signature',
        idealFor:
          'Redesign, needed styling and style guide, setup with custom artwork',
        monthlyRate: '$1,450',
      },
      {
        id: 'premium',
        name: 'Premium',
        idealFor: 'Full brand redesign, app, and website design package',
        monthlyRate: '$2,700',
      },
    ],
    features: [
      { name: 'Logo Design' },
      { name: 'Pitch Deck' },
      { name: 'Milestone Check-ins' },
      { name: 'File Delivery' },
      { name: 'Brand Discovery Worksheet' },
      { name: 'Brand Style Guide' },
      { name: 'Custom Artwork' },
      { name: 'Website UI' },
      { name: 'App UI' },
    ],
    comparison: {
      'logo-design': {
        starter: true,
        signature: true,
        premium: true,
      },
      'pitch-deck': {
        starter: true,
        signature: true,
        premium: true,
      },
      'milestone-check-ins': {
        starter: true,
        signature: true,
        premium: true,
      },
      'file-delivery': {
        starter: true,
        signature: true,
        premium: true,
      },
      'brand-discovery-worksheet': {
        starter: true,
        signature: true,
        premium: true,
      },
      'brand-style-guide': {
        starter: 'available as add-on',
        signature: true,
        premium: true,
      },
      'custom-artwork': {
        starter: 'available as add-on',
        signature: true,
        premium: true,
      },
      'website-ui': {
        starter: 'available as add-on',
        signature: 'available as add-on',
        premium: true,
      },
      'app-ui': {
        starter: 'available as add-on',
        signature: 'available as add-on',
        premium: true,
      },
    },
  },
  development: {
    tiers: [
      {
        id: 'starter',
        name: 'Starter (Lean Launches)',
        idealFor:
          'Simple websites or landing pages for entrepreneurs and small businesses',
        monthlyRate: '$1,750+',
        rateNote: 'Basic website setup with up to 3 pages',
      },
      {
        id: 'signature',
        name: 'Signature (Growth Phase)',
        idealFor:
          'Full website (5-8 pages) or basic web app for growing businesses',
        monthlyRate: '$3,500+',
        rateNote: 'Includes content management and basic backend features',
      },
      {
        id: 'premium',
        name: 'Premium (Legacy Builders)',
        idealFor:
          'Custom web application or mobile app for established organizations',
        monthlyRate: '$6,500+',
        rateNote: 'Complete custom solution with ongoing support available',
      },
    ],
    features: [
      { name: 'Custom Website Design' },
      { name: 'Mobile-Friendly Layout' },
      { name: 'Search Engine Optimization' },
      { name: 'Fast Page Loading' },
      { name: 'Accessible Design' },
      { name: 'Hosting Setup' },
      { name: 'Email Integration' },
      { name: 'CMS Integration' },
      { name: 'Backend Development' },
      { name: 'Mobile Optimization' },
      { name: 'CI/CD Pipeline' },
      { name: 'Cloud Infrastructure' },
      { name: 'Docker & Containerization' },
      { name: 'Admin Dashboard / Portal' },
      { name: 'Revision Rounds' },
      { name: 'Retainer Support' },
    ],
    comparison: {
      'custom-website-design': {
        starter: true,
        signature: true,
        premium: true,
      },
      'mobile-friendly-layout': {
        starter: true,
        signature: true,
        premium: true,
      },
      'search-engine-optimization': {
        starter: true,
        signature: true,
        premium: true,
      },
      'fast-page-loading': {
        starter: true,
        signature: true,
        premium: true,
      },
      'accessible-design': {
        starter: true,
        signature: true,
        premium: true,
      },
      'hosting-setup': {
        starter: true,
        signature: true,
        premium: true,
      },
      'email-integration': {
        starter: true,
        signature: true,
        premium: true,
      },
      'cms-integration': {
        starter: false,
        signature: true,
        premium: true,
      },
      'backend-development': {
        starter: false,
        signature: true,
        premium: true,
      },
      'mobile-optimization': {
        starter: 'available as add-on',
        signature: true,
        premium: true,
      },
      'ci-cd-pipeline': {
        starter: false,
        signature: true,
        premium: true,
      },
      'cloud-infrastructure': {
        starter: false,
        signature: false,
        premium: true,
      },
      'docker-containerization': {
        starter: false,
        signature: false,
        premium: true,
      },
      'admin-dashboard-portal': {
        starter: false,
        signature: false,
        premium: true,
      },
      'revision-rounds': {
        starter: '1',
        signature: '2',
        premium: '3+',
      },
      'retainer-support': {
        starter: false,
        signature: false,
        premium: true,
      },
    },
  },
};
