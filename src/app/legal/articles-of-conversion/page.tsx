import { Metadata } from 'next';
import ArticlesOfConversionClient from './ArticlesOfConversionClient';

export const metadata: Metadata = {
  title: 'Articles of Conversion',
  description:
    'Legal documentation of Fluxline Resonance Group business entity conversion process and regulatory compliance.',
  keywords:
    'articles of conversion, legal entity, business conversion, regulatory compliance, corporate documents, Fluxline',
  openGraph: {
    title: 'Articles of Conversion - Fluxline Resonance Group',
    description:
      'Legal documentation of Fluxline Resonance Group business entity conversion process.',
    url: 'https://www.fluxline.pro/legal/articles-of-conversion',
    siteName: 'Fluxline Resonance Group',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Articles of Conversion - Fluxline Resonance Group',
    description:
      'Legal documentation of Fluxline Resonance Group business entity conversion process.',
    creator: '@fluxlinepro',
  },
  alternates: {
    canonical: '/legal/articles-of-conversion',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ArticlesOfConversionPage() {
  return <ArticlesOfConversionClient />;
}
