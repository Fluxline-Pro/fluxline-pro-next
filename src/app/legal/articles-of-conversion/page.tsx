import { Metadata } from 'next';
import ArticlesOfConversionClient from './ArticlesOfConversionClient';

export const metadata: Metadata = {
  title: 'Articles of Conversion',
  description:
<<<<<<< HEAD
    'Legal documentation of Fluxline Resonance Group business entity conversion process and regulatory compliance.',
  keywords:
    'articles of conversion, legal entity, business conversion, regulatory compliance, corporate documents, Fluxline',
  openGraph: {
    title: 'Articles of Conversion - Fluxline Resonance Group',
    description:
      'Legal documentation of Fluxline Resonance Group business entity conversion process.',
    url: 'https://www.fluxline.pro/legal/articles-of-conversion',
    siteName: 'Fluxline Resonance Group',
=======
    'Legal documentation of Fluxline Professional Services business entity conversion process and regulatory compliance.',
  keywords:
    'articles of conversion, legal entity, business conversion, regulatory compliance, corporate documents, Fluxline',
  openGraph: {
    title: 'Articles of Conversion - Fluxline Professional Services',
    description:
      'Legal documentation of Fluxline Professional Services business entity conversion process.',
    url: 'https://www.fluxline.pro/legal/articles-of-conversion',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    type: 'website',
  },
  twitter: {
    card: 'summary',
<<<<<<< HEAD
    title: 'Articles of Conversion - Fluxline Resonance Group',
    description:
      'Legal documentation of Fluxline Resonance Group business entity conversion process.',
    creator: '@fluxlinepro',
=======
    title: 'Articles of Conversion - Fluxline Professional Services',
    description:
      'Legal documentation of Fluxline Professional Services business entity conversion process.',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
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
