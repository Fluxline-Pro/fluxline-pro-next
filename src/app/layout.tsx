import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

// Providers wrapper
import { Providers } from './providers';

// Global styles
import './tailwind.css'; // ← Tailwind base/utilities and Typekit content first
import './globals.scss'; // ← Your custom styles override Tailwind

// Environment-aware robots: only allow indexing in production
const _env = process.env.NEXT_PUBLIC_ENVIRONMENT?.toLowerCase();
const _isProd = _env !== 'dev' && _env !== 'development' && _env !== 'test';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fluxline.pro'),
  title: {
    default: 'Fluxline Resonance Group',
    template: '%s | Fluxline.pro',
  },
  description:
    'Fluxline Resonance Group — systems-design and consulting practice specializing in cloud architecture, content ecosystem design, UX, brand identity, and strategic consulting. Modular by design, resonant by nature.',
  keywords:
    'Fluxline, Fluxline Resonance Group, consulting, cloud architecture, content ecosystem design, web development, business strategy, design, technical services, professional services, personal training, coaching, LGBTQ+ inclusive, accessibility, diversity, equity, AI-driven solutions, digital transformation, systems design, UX design, brand identity',
  authors: [
    { name: 'Fluxline Resonance Group', url: 'https://www.fluxline.pro' },
    { name: 'Terence Waters', url: 'https://www.terencewaters.com' },
  ],
  creator: 'Fluxline Resonance Group',
  publisher: 'Fluxline Resonance Group',
  robots: _isProd
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
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
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7691902367885014'
          crossOrigin='anonymous'
        ></script>
      </head>
      <body className='antialiased' suppressHydrationWarning>
        {/* Organization structured data for SEO and AI ingest */}
        <Script
          id='organization-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.fluxline.pro/#organization',
              name: 'Fluxline Resonance Group',
              alternateName: ['Fluxline', 'Fluxline Pro'],
              url: 'https://www.fluxline.pro',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.fluxline.pro/images/FluxlineLogo.png',
                width: 512,
                height: 512,
              },
              description:
                'Fluxline Resonance Group is a systems-design and consulting practice combining cloud architecture, content ecosystem design, UX and taxonomy design, brand identity engineering, and strategic consulting. We integrate technical, creative, and conceptual systems into one coherent offering.',
              foundingDate: '2020',
              founder: {
                '@type': 'Person',
                '@id': 'https://www.terencewaters.com/#person',
                name: 'Terence Waters',
                url: 'https://www.terencewaters.com',
                sameAs: [
                  'https://www.linkedin.com/in/terencewaters',
                  'https://www.instagram.com/fluxlineco',
                ],
              },
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
                'Cloud Architecture',
                'Content Ecosystem Design',
                'Systems Design',
                'UX Design',
                'Taxonomy Design',
                'Brand Identity Engineering',
                'Strategic Consulting',
                'Business Strategy',
                'Web Development',
                'Brand Design',
                'Personal Training',
                'Coaching',
                'Digital Transformation',
                'Operational Alignment',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Fluxline Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Business Strategy & Systems Alignment',
                      url: 'https://www.fluxline.pro/services/consulting',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Web Development & Digital Architecture',
                      url: 'https://www.fluxline.pro/services/development',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Brand & Experience Design',
                      url: 'https://www.fluxline.pro/services/design',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Personal Training & Wellness',
                      url: 'https://www.fluxline.pro/services/personal-training',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Coaching, Education & Leadership',
                      url: 'https://www.fluxline.pro/services/education',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Resonance Core Framework™',
                      url: 'https://www.fluxline.pro/services/resonance-core',
                    },
                  },
                ],
              },
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
              '@id': 'https://www.fluxline.pro/#website',
              name: 'Fluxline Resonance Group',
              url: 'https://www.fluxline.pro',
              description:
                'Modular consulting, design, web development, and emotional stewardship for visionary clients.',
              publisher: {
                '@id': 'https://www.fluxline.pro/#organization',
              },
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
        {/* Founder / Person structured data — cross-links to TerenceWaters.com */}
        <Script
          id='person-schema'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://www.terencewaters.com/#person',
              name: 'Terence Waters',
              url: 'https://www.terencewaters.com',
              jobTitle: 'Founder & Principal Consultant',
              worksFor: {
                '@id': 'https://www.fluxline.pro/#organization',
              },
              sameAs: [
                'https://www.linkedin.com/in/terencewaters',
                'https://www.instagram.com/fluxlineco',
              ],
              knowsAbout: [
                'Cloud Architecture',
                'Content Ecosystem Design',
                'Systems Design',
                'Brand Identity Engineering',
                'Strategic Consulting',
                'Business Strategy',
                'Web Development',
                'Coaching',
              ],
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
              '@id': 'https://www.fluxline.pro/#professional-service',
              name: 'Fluxline Resonance Group',
              image: 'https://www.fluxline.pro/images/FluxlineLogo.png',
              url: 'https://www.fluxline.pro',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
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
              description:
                'Cloud architecture consulting, content ecosystem design, web development, brand identity engineering, and strategic consulting for founders and growing businesses.',
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
