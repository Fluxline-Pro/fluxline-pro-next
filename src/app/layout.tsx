import type { Metadata } from 'next';
import Script from 'next/script';

// Theme and layout components
import ThemeProvider from '../theme/contexts/ThemeProvider';
import { ThemeOverrideProvider } from '../theme/contexts/ThemeOverrideContext';
import { FontScaleProvider } from '../theme/providers';
import { Header } from '../theme/components/header';
import { SkipToContent } from '../theme/components/skip-to-content';
import { GlobalFooter } from '../theme/components/layout/global-footer';
import { IosDetector } from '../components/IosDetector';

// Global styles
import './tailwind.css'; // ← Tailwind base/utilities first
import './globals.scss'; // ← Your custom styles override Tailwind

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fluxline.pro'),
  title: {
    default: 'Fluxline Resonance Group',
    template: '%s | Fluxline.pro',
  },
  description:
    'Fluxline Resonance Group - Business consulting, web development, design, and technical services. Modular by design, resonant by nature.',
  keywords:
    'Fluxline, consulting, web development, business strategy, design, technical services, professional services, personal training, coaching, LGBTQ+ inclusive, accessibility, diversity, equity, AI-driven solutions, digital transformation',
  authors: [{ name: 'Fluxline Resonance Group' }],
  creator: 'Fluxline Resonance Group',
  publisher: 'Fluxline Resonance Group',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Fluxline Resonance Group',
    description:
      'Modular consulting, design, web development, and emotional stewardship for visionary clients.',
    url: 'https://www.fluxline.pro/',
    siteName: 'Fluxline Resonance Group',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Resonance Group Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluxline Resonance Group',
    description:
      'Modular consulting, design, web development, and emotional stewardship for visionary clients.',
    images: ['/images/FluxlineLogo.png'],
    creator: '@fluxlineco',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    // Add verification meta tags here when available
    // google: 'verification_token',
    // bing: 'verification_token',
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
        {/* Viewport meta tag with viewport-fit=cover for iOS safe area support */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, viewport-fit=cover'
        />
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
        {/* Organization structured data for SEO */}
        <Script
          id='organization-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Fluxline Resonance Group',
              alternateName: 'Fluxline Resonance Group',
              url: 'https://www.fluxline.pro',
              logo: 'https://www.fluxline.pro/images/FluxlineLogo.png',
              description:
                'Professional services firm specializing in business consulting, web development, design, personal training, and coaching.',
              foundingDate: '2020',
              sameAs: [
                'https://www.instagram.com/fluxlineco',
                'https://www.linkedin.com/in/terencewaters',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                url: 'https://www.fluxline.pro/contact',
              },
              areaServed: {
                '@type': 'Place',
                name: 'Worldwide',
              },
              knowsAbout: [
                'Business Consulting',
                'Web Development',
                'Brand Design',
                'Personal Training',
                'Coaching',
                'Digital Transformation',
                'Strategic Planning',
              ],
            }),
          }}
        />
        {/* Website structured data */}
        <Script
          id='website-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Fluxline Resonance Group',
              url: 'https://www.fluxline.pro',
              description:
                'Modular consulting, design, web development, and emotional stewardship for visionary clients.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://www.fluxline.pro/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* Professional Service structured data */}
        <Script
          id='professional-service-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Fluxline Resonance Group',
              image: 'https://www.fluxline.pro/images/FluxlineLogo.png',
              '@id': 'https://www.fluxline.pro',
              url: 'https://www.fluxline.pro',
              telephone: '',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                ],
                opens: '09:00',
                closes: '17:00',
              },
              sameAs: [
                'https://www.instagram.com/fluxlineco',
                'https://www.linkedin.com/in/terencewaters',
              ],
            }),
          }}
        />
        <IosDetector />
        <FontScaleProvider>
          <ThemeOverrideProvider>
            <ThemeProvider>
              <SkipToContent />
              <Header />
              {children}
              <GlobalFooter />
            </ThemeProvider>
          </ThemeOverrideProvider>
        </FontScaleProvider>
      </body>
    </html>
  );
}
