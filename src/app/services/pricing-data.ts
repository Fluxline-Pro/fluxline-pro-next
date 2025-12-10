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
        monthlyRate: '$100/session',
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
        name: 'Online PT-Hypertrophy',
        idealFor:
          'Remote clients focused on physique, nutrition, and metabolic coaching',
        monthlyRate: 'Starting at $275/month',
        rateNote: '(Varies by term length)',
      },
      {
        id: 'hybrid-hypertrophy',
        name: 'Hybrid PT-Hypertrophy',
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
      'cancel-anytime-first-2-sessions': {
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
  design: {
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        idealFor:
          'A starting company getting started, initial branding package and logo',
        monthlyRate: '$800',
      },
      {
        id: 'signature',
        name: 'Signature',
        idealFor:
          'Redesign, needed styling and style guide, setup with custom artwork',
        monthlyRate: '$1,250',
      },
      {
        id: 'premium',
        name: 'Premium',
        idealFor: 'Full redesign, app, and website development',
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
        starter: false,
        signature: true,
        premium: true,
      },
      'custom-artwork': {
        starter: false,
        signature: true,
        premium: true,
      },
      'website-ui': {
        starter: false,
        signature: false,
        premium: true,
      },
      'app-ui': {
        starter: false,
        signature: false,
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
          'Landing page or 3-page brochure site entrepreneurs, small businesses',
        monthlyRate: '$1,750+',
        rateNote: 'Next.js or static HTML implementation',
      },
      {
        id: 'signature',
        name: 'Signature (Growth Phase)',
        idealFor:
          'Full website (5-8 pages) or MVP web app for growing businesses',
        monthlyRate: '$3,500+',
        rateNote: 'Includes CMS integration and basic backend',
      },
      {
        id: 'premium',
        name: 'Premium (Legacy Builders)',
        idealFor:
          'Full-stack web app or mobile app for established organizations',
        monthlyRate: '$6,500+',
        rateNote: 'Complete architecture with retainer support available',
      },
    ],
    features: [
      { name: 'Custom UI Design' },
      { name: 'Responsive Layout' },
      { name: 'SEO Optimization' },
      { name: 'Performance Optimization' },
      { name: 'Accessibility Best Practices' },
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
      'custom-ui-design': {
        starter: true,
        signature: true,
        premium: true,
      },
      'responsive-layout': {
        starter: true,
        signature: true,
        premium: true,
      },
      'seo-optimization': {
        starter: true,
        signature: true,
        premium: true,
      },
      'performance-optimization': {
        starter: true,
        signature: true,
        premium: true,
      },
      'accessibility-best-practices': {
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
        starter: false,
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
        starter: true,
        signature: true,
        premium: true,
      },
      'retainer-support': {
        starter: false,
        signature: false,
        premium: true,
      },
    },
  },
};
