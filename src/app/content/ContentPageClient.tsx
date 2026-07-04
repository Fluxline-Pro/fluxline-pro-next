'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';
import FxCTABand from '@/theme/components/dsm/FxCTABand';

interface ContentCategory {
  title: string;
  description: string;
  path: string;
  isHighlighted?: boolean;
  comingSoon?: boolean;
}

/**
 * Content Hub Page Client Component
 * Displays categories of content available on the site
 */
export default function ContentPageClient() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  const contentCategories: ContentCategory[] = [
    {
      title: 'Podcasts',
      description:
        'The Resonant Identity — a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
      path: '/podcasts',
      isHighlighted: true,
    },
    {
      title: 'Blog',
      description:
        'Insights, best practices, and thoughts on technology, design, and business transformation.',
      path: '/blog',
    },
    {
      title: 'Portfolio',
      description:
        'Explore our portfolio of innovative projects spanning web applications, mobile apps, and enterprise software.',
      path: '/portfolio',
    },
    {
      title: 'GitHub',
      description:
        'Open source projects, code samples, and technical resources from our development team.',
      path: '/github',
    },
    {
      title: 'Videos',
      description:
        'Watch videos from the YouTube channel @TerenceWaters, including tutorials, live streams, and playlists.',
      path: '/videos',
    },
    // TODO: move Books to the top once launched, and add a "New!" badge to it -TW
    {
      title: 'Books',
      description:
        'Explore our collection of books on transformation, business strategy, and personal development. Purchase directly or through major retailers.',
      path: '/books',
      comingSoon: true,
    },
  ];

  const handleCardClick = (path: string, comingSoon?: boolean) => {
    if (!comingSoon) {
      router.push(path);
    }
  };

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Page Header */}
        <FxSectionHeading
          title="Content Hub"
          subhead="Where Ideas Meet Execution"
          lede="Explore our collection of articles, projects, and insights. Discover the work we've done and the ideas we're sharing with the community."
          as="h1"
        />

        {/* Content Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24,
            marginBottom: 44,
            marginTop: 44,
            paddingTop: 4,
          }}
        >
          {contentCategories.map((category) => {
            const isHovered = hoveredCard === category.title;
            const isDisabled = category.comingSoon;

            return (
              <div
                key={category.title}
                onClick={() =>
                  handleCardClick(category.path, category.comingSoon)
                }
                onMouseEnter={() => setHoveredCard(category.title)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  padding: 24,
                  backgroundColor:
                    isHovered || category.isHighlighted
                      ? 'var(--fx-surface-card)'
                      : 'var(--fx-bg)',
                  border: `2px solid ${isHovered || category.isHighlighted ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
                  borderRadius: 12,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  transform:
                    isHovered && !isDisabled ? 'translateY(-4px)' : 'none',
                  boxShadow:
                    isHovered && !isDisabled
                      ? '0 8px 24px rgba(0,0,0,0.15)'
                      : '0 2px 8px rgba(0,0,0,0.06)',
                  opacity: isDisabled ? 0.6 : 1,
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Highlight New Badge */}
                {category.isHighlighted && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      padding: '4px 8px',
                      backgroundColor: 'var(--fx-gold)',
                      color: '#000',
                      borderRadius: 4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    New!
                  </div>
                )}
                {/* Coming Soon Badge */}
                {category.comingSoon && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      padding: '4px 8px',
                      backgroundColor: 'var(--fx-accent)',
                      color: '#000',
                      borderRadius: 4,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Coming Soon!
                  </div>
                )}

                {/* Title */}
                <h2
                  style={{
                    color: isHovered
                      ? 'var(--fx-accent)'
                      : 'var(--fx-text-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    transition: 'color 0.3s ease',
                    margin: '0 0 12px 0',
                  }}
                >
                  {category.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    color: 'var(--fx-text-body)',
                    fontSize: 'var(--fx-body-size)',
                    lineHeight: 1.6,
                    flex: 1,
                    margin: 0,
                  }}
                >
                  {category.description}
                </p>

                {/* Arrow */}
                {!category.comingSoon && (
                  <div
                    style={{
                      marginTop: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: 'var(--fx-accent)',
                      fontWeight: 600,
                    }}
                  >
                    <span>Explore</span>
                    <span
                      style={{
                        display: 'inline-block',
                        transform: isHovered ? 'translateX(4px)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      &rarr;
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <FxCTABand
          title="Stay Updated"
          body="Subscribe to our newsletter to get the latest updates on new blog posts, projects, and insights delivered to your inbox."
          primaryLabel="Get in Touch"
          primaryHref="/contact"
        />
      </div>
    </FxContainer>
  );
}
