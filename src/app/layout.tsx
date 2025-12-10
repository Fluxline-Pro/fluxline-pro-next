import type { Metadata } from 'next';
import Script from 'next/script';

// Theme and layout components
import ThemeProvider from '../theme/contexts/ThemeProvider';
import { ThemeOverrideProvider } from '../theme/contexts/ThemeOverrideContext';
import { FontScaleProvider } from '../theme/providers';
import { Header } from '../theme/components/header';
import { SkipToContent } from '../theme/components/skip-to-content';
import { ReCaptchaProvider } from '../components/ReCaptchaProvider';

// Global styles
import './tailwind.css'; // ← Tailwind base/utilities first
import './globals.scss'; // ← Your custom styles override Tailwind

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fluxline.pro'),
  title: {
    default: 'Fluxline Professional Services',
    template: '%s | Fluxline.pro',
  },
  description:
    'Fluxline Professional Services - Business consulting, web development, design, and technical services',
  keywords:
    'Fluxline, consulting, web development, business strategy, design, technical services, professional services, personal training, coaching, LGBTQ+ inclusive, accessibility, diversity, equity',
  openGraph: {
    title: 'Fluxline Professional Services',
    description:
      'Modular consulting, design, web development, and emotional stewardship for visionary clients.',
    url: 'https://www.fluxline.pro/',
    siteName: 'Fluxline Professional Services',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Professional Services Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluxline Professional Services',
    description:
      'Modular consulting, design, web development, and emotional stewardship for visionary clients.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/',
  },
  other: {
    'theme-color': '#010101',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Typekit stylesheet for custom typography */}
        <link rel='stylesheet' href='https://use.typekit.net/qmh5dow.css' />
        {/* Font Awesome icons */}
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
        />
        {/* Preconnect to external font sources */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
      </head>
      <body className='antialiased' suppressHydrationWarning>
        {/* Structured data for SEO */}
        <Script
          id='organization-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Fluxline Professional Services',
              url: 'https://www.fluxline.pro',
              logo: 'https://www.fluxline.pro/images/FluxlineLogo.png',
              sameAs: [
                'https://www.instagram.com/fluxlineco',
                'https://www.linkedin.com/in/terencewaters',
              ],
            }),
          }}
        />
        <FontScaleProvider>
          <ThemeOverrideProvider>
            <ThemeProvider>
              <ReCaptchaProvider>
                <SkipToContent />
                <Header />
                {children}
              </ReCaptchaProvider>
            </ThemeProvider>
          </ThemeOverrideProvider>
        </FontScaleProvider>
      </body>
    </html>
  );
}
