import { Metadata } from 'next';
import ResponsibleAIUsageClientPage from './ResponsibleAIUsageClientPage';

export const metadata: Metadata = {
  title: 'Responsible AI Usage',
  description:
    'Fluxline Resonance Group\'s policy on responsible, transparent AI usage. Learn how we use AI tools, our commitment to human review, and our ethical standards.',
  keywords:
    'responsible AI, AI transparency, AI policy, artificial intelligence, AI ethics, AI disclosure, Fluxline',
  openGraph: {
    title: 'Responsible AI Usage - Fluxline',
    description:
      'Learn how Fluxline uses AI responsibly and transparently across our content, consulting, and creative work.',
    url: 'https://www.fluxline.pro/legal/responsible-ai-usage',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Responsible AI Usage - Fluxline',
    description:
      'Learn how Fluxline uses AI responsibly and transparently across our content, consulting, and creative work.',
    creator: '@fluxlinepro',
  },
  alternates: {
    canonical: '/legal/responsible-ai-usage',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResponsibleAIUsagePage() {
  return <ResponsibleAIUsageClientPage />;
}
