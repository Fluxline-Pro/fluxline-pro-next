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
          'Simple websites or landing pages for entrepreneurs and small businesses',
        monthlyRate: '$1,750+',
        rateNote: 'Basic website setup with up to 3 pages',
      },
      {
        id: 'signature',
        name: 'Signature (Growth Phase)',
        idealFor: 'Full website (5-8 pages) or basic web app for growing businesses',
        monthlyRate: '$3,500+',
        rateNote: 'Includes content management and basic backend features',
      },
      {
        id: 'premium',
        name: 'Premium (Legacy Builders)',
        idealFor: 'Custom web application or mobile app for established organizations',
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
      { name: 'Hosting Setup & Support' },
      { name: 'Email Setup & Integration' },
      { name: 'Content Management System' },
      { name: 'Database & Server Setup' },
      { name: 'Mobile App Design' },
      { name: 'Automated Deployment' },
      { name: 'Cloud Hosting Setup' },
      { name: 'Deployment Tools' },
      { name: 'Admin Dashboard' },
      { name: 'Design Revision Rounds' },
      { name: 'Ongoing Support Available' },
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
      'hosting-setup-support': {
        starter: true,
        signature: true,
        premium: true,
      },
      'email-setup-integration': {
        starter: true,
        signature: true,
        premium: true,
      },
      'content-management-system': {
        starter: false,
        signature: true,
        premium: true,
      },
      'database-server-setup': {
        starter: false,
        signature: true,
        premium: true,
      },
      'mobile-app-design': {
        starter: false,
        signature: true,
        premium: true,
      },
      'automated-deployment': {
        starter: false,
        signature: true,
        premium: true,
      },
      'cloud-hosting-setup': {
        starter: false,
        signature: false,
        premium: true,
      },
      'deployment-tools': {
        starter: false,
        signature: false,
        premium: true,
      },
      'admin-dashboard': {
        starter: false,
        signature: false,
        premium: true,
      },
      'design-revision-rounds': {
        starter: true,
        signature: true,
        premium: true,
      },
      'ongoing-support-available': {
        starter: false,
        signature: false,
        premium: true,
      },
    },
  },
};
