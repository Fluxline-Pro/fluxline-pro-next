'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { FluentIcon } from '@/theme/components/fluent-icon';

interface ContentCategory {
  title: string;
  description: string;
  path: string;
  iconName: string;
  color: string;
  comingSoon?: boolean;
}

/**
 * Content Hub Page Client Component
 * Displays categories of content available on the site
 * Inspired by terencewaters.com/my-content layout
 */
export default function ContentPageClient() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  const contentCategories: ContentCategory[] = [
    {
      title: 'Blog',
      description:
        'Insights, best practices, and thoughts on technology, design, and business transformation.',
      path: '/blog',
      iconName: 'TextDocumentShared',
      color: theme.palette.themePrimary,
    },
    {
      title: 'Portfolio',
      description:
        'Explore our portfolio of innovative projects spanning web applications, mobile apps, and enterprise software.',
      path: '/portfolio',
      iconName: 'FolderQuery',
      color: theme.palette.teal,
    },
    {
      title: 'Media',
      description:
        'Videos, podcasts, and multimedia content showcasing our expertise and insights.',
      path: '/media',
      iconName: 'Video',
      color: theme.palette.magenta,
      comingSoon: true,
    },
    {
      title: 'GitHub',
      description:
        'Open source projects, code samples, and technical resources from our development team.',
      path: '/github',
      iconName: 'BranchMerge',
      color: theme.palette.purple,
      comingSoon: true,
    },
  ];

  const handleCardClick = (path: string, comingSoon?: boolean) => {
    if (!comingSoon) {
      router.push(path);
    }
  };

  const isMobile =
    orientation === 'portrait' || orientation === 'tablet-portrait';

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding: isMobile ? theme.spacing.m : theme.spacing.xl,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: theme.spacing.l2, textAlign: 'center' }}>
          <Typography
            variant='h1'
            style={{
              fontWeight: 700,
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
              fontSize: isMobile ? '2rem' : '2.5rem',
            }}
          >
            My Content
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l1,
              fontSize: '1.1rem',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Explore our collection of articles, projects, and insights. Discover
            the work we&apos;ve done and the ideas we&apos;re sharing with the
            community.
          </Typography>
        </div>

        {/* Content Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : orientation === 'ultrawide'
                ? 'repeat(4, 1fr)'
                : orientation === 'landscape' ||
                    orientation === 'large-portrait'
                  ? 'repeat(2, 1fr)'
                  : '1fr',
            gap: theme.spacing.l1,
            marginBottom: theme.spacing.xxl,
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
                  padding: theme.spacing.l1,
                  backgroundColor: isHovered
                    ? theme.palette.neutralLighter
                    : theme.palette.white,
                  border: `2px solid ${isHovered ? category.color : theme.palette.neutralLight}`,
                  borderRadius: theme.effects.roundedCorner6,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  transform:
                    isHovered && !isDisabled ? 'translateY(-4px)' : 'none',
                  boxShadow:
                    isHovered && !isDisabled
                      ? theme.effects.elevation16
                      : theme.effects.elevation4,
                  opacity: isDisabled ? 0.6 : 1,
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Coming Soon Badge */}
                {category.comingSoon && (
                  <div
                    style={{
                      position: 'absolute',
                      top: theme.spacing.m,
                      right: theme.spacing.m,
                      padding: `${theme.spacing.s2} ${theme.spacing.s1}`,
                      backgroundColor: theme.palette.themePrimary,
                      color: theme.palette.white,
                      borderRadius: theme.effects.roundedCorner4,
                      fontSize: '0.75rem',
                      fontWeight: theme.typography.fontWeights.semiBold,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Coming Soon
                  </div>
                )}

                {/* Icon */}
                <div
                  style={{
                    marginBottom: theme.spacing.m,
                  }}
                >
                  <FluentIcon
                    iconName={category.iconName}
                    size='xLarge'
                    color={
                      isHovered
                        ? category.color
                        : theme.palette.neutralSecondary
                    }
                    style={{
                      transition: 'color 0.3s ease',
                    }}
                  />
                </div>

                {/* Title */}
                <Typography
                  variant='h2'
                  style={{
                    color: isHovered
                      ? category.color
                      : theme.palette.neutralPrimary,
                    marginBottom: theme.spacing.s1,
                    fontSize: '1.75rem',
                    fontWeight: theme.typography.fontWeights.semiBold,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {category.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {category.description}
                </Typography>

                {/* Arrow Icon */}
                {!category.comingSoon && (
                  <div
                    style={{
                      marginTop: theme.spacing.m,
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.s2,
                      color: category.color,
                      fontWeight: theme.typography.fontWeights.semiBold,
                    }}
                  >
                    <span>Explore</span>
                    <FluentIcon
                      iconName='ChevronRight'
                      size='medium'
                      color={category.color}
                      style={{
                        transform: isHovered ? 'translateX(4px)' : 'none',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div
          style={{
            marginTop: theme.spacing.xxl,
            padding: theme.spacing.xl,
            backgroundColor: theme.palette.neutralLighterAlt,
            borderRadius: theme.effects.roundedCorner6,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
            }}
          >
            Stay Updated
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.l,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Subscribe to our newsletter to get the latest updates on new blog
            posts, projects, and insights delivered to your inbox.
          </Typography>
          <FormButton
            onClick={() => router.push('/contact')}
            
          >
            Get in Touch
          </FormButton>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
