'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { UnifiedPageWrapper } from './UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form';
import { Callout } from '@/theme/components/callout';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { IconButton } from '@fluentui/react';
import {
  SocialLinks,
  type SocialLinksData,
} from '@/app/about/components/SocialLinks';
import { ImageCarouselModal, type CarouselImage } from './ImageCarouselModal';

/**
 * Unified configuration interface for content detail pages
 * Supports blog posts, portfolio projects, press releases, and case studies
 */
export interface UnifiedContentDetailConfig {
  // Core content
  title: string;
  content: string; // Markdown or HTML
  contentType: 'markdown' | 'html';

  // Metadata
  excerpt?: string;
  metadata?: Array<{
    label: string;
    value: string | React.ReactNode;
  }>;

  // Author info (for blog posts, press releases, etc.)
  authorInfo?: {
    name: string;
    publishDate?: string;
    lastUpdated?: string;
    socialLinks?: SocialLinksData;
  };

  // Navigation
  backLink: {
    url: string;
    label: string;
  };

  // Badges (tags, categories, technologies, etc.)
  badges?: Array<{
    label: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    onClick?: () => void;
  }>;

  // Optional image for left pane (blog posts, portfolio)
  imageConfig?: {
    source: string;
    alt: string;
    title?: string;
    showTitle?: boolean;
    // Gallery support - array of images for carousel
    // If not provided, single image will be clickable for fullscreen view
    gallery?: CarouselImage[];
  };

  // Additional sections (for case studies, portfolio projects)
  sections?: Array<{
    title: string;
    content: string | React.ReactNode;
  }>;

  // Show gallery as a dedicated section (uses imageConfig.gallery)
  showGallerySection?: boolean;

  // Control where sections are rendered (default: 'after')
  sectionsPosition?: 'before' | 'after';

  // Call to action
  cta?: {
    title: string;
    description: string;
    buttons: Array<{
      label: string;
      onClick: () => void;
      variant: 'primary' | 'secondary';
    }>;
  };

  // External links (for portfolio projects)
  externalLinks?: Array<{
    label: string;
    url: string;
    variant: 'github' | 'live' | 'custom';
  }>;
}

interface UnifiedContentDetailProps {
  config: UnifiedContentDetailConfig;
}

/**
 * Unified Content Detail Component
 * Single component for rendering blog posts, portfolio projects, press releases, and case studies
 * Uses BlogPostDetailClient's proven JSX styling
 */
export function UnifiedContentDetail({ config }: UnifiedContentDetailProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselInitialIndex, setCarouselInitialIndex] = useState(0);

  const handleImageClick = React.useCallback(() => {
    if (config.imageConfig) {
      // Support both gallery and single image click-to-enlarge
      setCarouselInitialIndex(0);
      setIsCarouselOpen(true);
    }
  }, [config.imageConfig]);

  const handleCarouselClose = React.useCallback(() => {
    setIsCarouselOpen(false);
  }, []);

  const handleBack = React.useCallback(() => {
    router.push(config.backLink.url);
  }, [router, config.backLink.url]);

  // Markdown components with blog-style hierarchy
  const markdownComponents: Partial<any> = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <Typography
        variant='h1'
        style={{
          fontWeight: 700,
          marginTop: theme.spacing.l2,
          marginBottom: theme.spacing.l1,
          color: theme.palette.themePrimary,
          fontSize: '2rem',
        }}
      >
        {children}
      </Typography>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <Typography
        variant='h2'
        style={{
          fontWeight: 600,
          marginTop: theme.spacing.l2,
          marginBottom: theme.spacing.m,
          color: theme.palette.themePrimary,
          fontSize: '1.5rem',
        }}
      >
        {children}
      </Typography>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <Typography
        variant='h3'
        style={{
          fontWeight: 600,
          marginTop: theme.spacing.l1,
          marginBottom: theme.spacing.m,
          color: theme.palette.themePrimary,
          fontSize: '1.25rem',
        }}
      >
        {children}
      </Typography>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <Typography
        variant='p'
        style={{
          marginBottom: theme.spacing.m,
          lineHeight: 1.7,
        }}
      >
        {children}
      </Typography>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul
        style={{
          marginBottom: theme.spacing.m,
          paddingLeft: theme.spacing.l1,
          listStyleType: 'disc',
          listStylePosition: 'outside',
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol
        style={{
          marginBottom: theme.spacing.m,
          paddingLeft: theme.spacing.l1,
          listStyleType: 'decimal',
          listStylePosition: 'outside',
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li
        style={{
          marginBottom: theme.spacing.s1,
          display: 'list-item',
        }}
      >
        <Typography variant='p'>{children}</Typography>
      </li>
    ),
    code: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => {
      const isInline = !className;
      return (
        <code
          style={{
            backgroundColor: theme.palette.neutralLighter,
            color: theme.palette.themePrimary,
            padding: isInline ? `2px ${theme.spacing.s1}` : theme.spacing.m,
            borderRadius: theme.effects.roundedCorner2,
            fontSize: isInline ? '0.9em' : theme.fonts.medium.fontSize,
            display: isInline ? 'inline' : 'block',
            overflowX: isInline ? 'visible' : 'auto',
            fontFamily: 'monospace',
          }}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }: { children?: React.ReactNode }) => (
      <pre
        style={{
          backgroundColor: theme.palette.neutralLighter,
          padding: theme.spacing.m,
          borderRadius: theme.effects.roundedCorner4,
          overflow: 'auto',
          marginBottom: theme.spacing.m,
        }}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        style={{
          borderLeft: `4px solid ${theme.palette.themePrimary}`,
          paddingLeft: theme.spacing.l1,
          marginLeft: 0,
          marginBottom: theme.spacing.m,
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: theme.palette.neutralSecondary,
          maxWidth: '600px',
        }}
      >
        {children}
      </blockquote>
    ),
    a: ({
      href,
      children,
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      children?: React.ReactNode;
    }) => (
      <a
        href={href}
        style={{
          color: theme.palette.themePrimary,
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = 'none';
        }}
      >
        {children}
      </a>
    ),
    img: ({
      src,
      alt,
    }: React.ImgHTMLAttributes<HTMLImageElement> & {
      src?: string;
      alt?: string;
    }) => (
      <img
        src={src}
        alt={alt || ''}
        style={{
          maxWidth: '100%',
          maxHeight: '400px',
          width: 'auto',
          height: 'auto',
          marginBottom: theme.spacing.m,
          borderRadius: theme.effects.roundedCorner4,
          objectFit: 'contain',
        }}
      />
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
      <div
        style={{
          overflowX: 'auto',
          marginBottom: theme.spacing.m,
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: `1px solid ${theme.palette.neutralLight}`,
          }}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead
        style={{
          backgroundColor: theme.palette.neutralLighter,
        }}
      >
        {children}
      </thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
      <tr
        style={{
          borderBottom: `1px solid ${theme.palette.neutralLight}`,
        }}
      >
        {children}
      </tr>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th
        style={{
          padding: theme.spacing.s2,
          textAlign: 'left',
          fontWeight: 600,
          color: theme.palette.themePrimary,
          borderRight: `1px solid ${theme.palette.neutralLight}`,
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td
        style={{
          padding: theme.spacing.s2,
          borderRight: `1px solid ${theme.palette.neutralLight}`,
        }}
      >
        {children}
      </td>
    ),
  };

  // Prepare image config with carousel functionality
  // Create gallery array from single image if no gallery exists
  const imageGallery = React.useMemo(() => {
    if (!config.imageConfig) return undefined;

    // Use existing gallery or create single-item gallery
    if (config.imageConfig.gallery) {
      return config.imageConfig.gallery;
    }

    // Create single-item gallery from main image
    return [
      {
        url: config.imageConfig.source,
        alt: config.imageConfig.alt,
        caption: config.imageConfig.title,
      },
    ];
  }, [config.imageConfig]);

  const imageConfigWithCarousel = config.imageConfig
    ? {
        ...config.imageConfig,
        onClick: handleImageClick,
        enableHoverEffect: true,
      }
    : undefined;

  return (
    <>
      <UnifiedPageWrapper
        layoutType='responsive-grid'
        imageConfig={imageConfigWithCarousel}
      >
        {/* Back Button */}
        <div style={{ marginBottom: theme.spacing.l1 }}></div>

        {/* Article Header */}
        <article>
          <header style={{ marginBottom: theme.spacing.l2 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'left',
                marginBottom: theme.spacing.l2,
              }}
            >
              <div
                style={{
                  paddingLeft: theme.spacing.s1,
                  marginRight: theme.spacing.l,
                }}
              >
                <IconButton
                  iconProps={{ iconName: 'Back' }}
                  title={config.backLink.label}
                  ariaLabel={config.backLink.label}
                  onClick={handleBack}
                  styles={{
                    root: {
                      color: theme.palette.themePrimary,
                      backgroundColor: 'transparent',
                    },
                    rootHovered: {
                      color: theme.palette.themeDark,
                      backgroundColor: 'transparent',
                      transform: 'translateX(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                    rootPressed: {
                      backgroundColor: 'transparent',
                    },
                    icon: {
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    },
                  }}
                />
              </div>
              <Typography
                variant='h1'
                style={{
                  fontWeight: 700,
                  color: theme.palette.themePrimary,
                  marginBottom: theme.spacing.m,
                  fontSize: '2.5rem',
                }}
              >
                {config.title}
              </Typography>
            </div>

            {/* Author Info */}
            {config.authorInfo && (
              <div
                style={{
                  marginBottom: theme.spacing.l1,
                  paddingBottom: theme.spacing.m,
                }}
              >
                <Typography
                  variant='p'
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: theme.palette.neutralPrimary,
                    marginBottom: theme.spacing.s,
                  }}
                >
                  {config.authorInfo.name}
                </Typography>

                {config.authorInfo.name === 'Terence Waters' &&
                  config.authorInfo.socialLinks && (
                    <div
                      style={{
                        marginTop: theme.spacing.s2,
                        marginBottom: theme.spacing.s2,
                      }}
                    >
                      <SocialLinks
                        socialLinks={config.authorInfo.socialLinks}
                        name={config.authorInfo.name}
                        size='small'
                      />
                    </div>
                  )}

                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.95rem',
                    marginTop: theme.spacing.s1,
                  }}
                >
                  Published: {config.authorInfo.publishDate}
                  {config.authorInfo.lastUpdated && (
                    <>
                      {' • '}
                      Last Updated: {config.authorInfo.lastUpdated}
                    </>
                  )}
                </Typography>
              </div>
            )}

            {/* Metadata (for other content types) */}
            {!config.authorInfo &&
              config.metadata &&
              config.metadata.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.spacing.m,
                    alignItems: 'center',
                    marginBottom: theme.spacing.l1,
                    color: theme.palette.neutralSecondary,
                  }}
                >
                  {config.metadata.map((meta, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span>•</span>}
                      <Typography variant='p'>
                        {meta.label ? `${meta.label}: ` : ''}
                        {meta.value}
                      </Typography>
                    </React.Fragment>
                  ))}
                </div>
              )}

            {/* Badges */}
            {config.badges && config.badges.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: theme.spacing.s1,
                  marginBottom: theme.spacing.m,
                }}
              >
                {config.badges.map((badge, index) => (
                  <FormButton
                    key={index}
                    variant={
                      badge.variant === 'primary' ? 'primary' : 'tertiary'
                    }
                    onClick={badge.onClick}
                    size='small'
                  >
                    {badge.label}
                  </FormButton>
                ))}
              </div>
            )}
          </header>

          {/* Excerpt */}
          {config.excerpt && (
            <Typography
              variant='p'
              style={{
                fontStyle: 'italic',
                color: theme.palette.neutralSecondary,
                marginBottom: theme.spacing.l2,
                paddingLeft: theme.spacing.l1,
                borderLeft: `4px solid ${theme.palette.themePrimary}`,
                fontSize: '1.125rem',
              }}
            >
              {config.excerpt}
            </Typography>
          )}

          {/* External Links (for portfolio projects) */}
          {config.externalLinks && config.externalLinks.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.m,
                marginBottom: theme.spacing.l2,
                flexWrap: 'wrap',
              }}
            >
              {config.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    padding: `${theme.spacing.s1} ${theme.spacing.l}`,
                    backgroundColor:
                      link.variant === 'live'
                        ? theme.palette.themePrimary
                        : theme.palette.neutralLighter,
                    color:
                      link.variant === 'live'
                        ? theme.palette.white
                        : theme.palette.neutralPrimary,
                    textDecoration: 'none',
                    borderRadius: theme.effects.roundedCorner4,
                    fontSize: theme.fonts.medium.fontSize,
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (link.variant === 'live') {
                      e.currentTarget.style.backgroundColor =
                        theme.palette.themeDark;
                    } else {
                      e.currentTarget.style.backgroundColor =
                        theme.palette.neutralLight;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (link.variant === 'live') {
                      e.currentTarget.style.backgroundColor =
                        theme.palette.themePrimary;
                    } else {
                      e.currentTarget.style.backgroundColor =
                        theme.palette.neutralLighter;
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Gallery Section - Before Content */}
          {config.showGallerySection &&
            config.sectionsPosition === 'before' &&
            config.imageConfig?.gallery && (
              <div style={{ marginBottom: theme.spacing.xl }}>
                <Typography
                  variant='h2'
                  style={{
                    fontWeight: 600,
                    marginBottom: theme.spacing.m,
                    color: theme.palette.themePrimary,
                    fontSize: '1.5rem',
                  }}
                >
                  Project Gallery
                </Typography>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: theme.spacing.l,
                    maxWidth: '1100px',
                  }}
                >
                  {config.imageConfig.gallery.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                      }}
                      onClick={() => {
                        setCarouselInitialIndex(index);
                        setIsCarouselOpen(true);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: theme.effects.roundedCorner4,
                          marginBottom: image.caption ? theme.spacing.s1 : 0,
                        }}
                      />
                      {image.caption && (
                        <Typography
                          variant='p'
                          style={{
                            color: theme.palette.neutralSecondary,
                            fontSize: theme.fonts.small.fontSize,
                            fontStyle: 'italic',
                          }}
                        >
                          {image.caption}
                        </Typography>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Additional Sections - Before Content */}
          {config.sections &&
            config.sectionsPosition === 'before' &&
            config.sections.map((section, index) => (
              <div key={index} style={{ marginBottom: theme.spacing.xl }}>
                <Typography
                  variant='h2'
                  style={{
                    fontWeight: 600,
                    marginBottom: theme.spacing.m,
                    color: theme.palette.themePrimary,
                    fontSize: '1.5rem',
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant='p'
                  style={{ marginBottom: theme.spacing.m }}
                >
                  A selection of images showcasing various aspects of the
                  project.
                </Typography>
                {typeof section.content === 'string' ? (
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.neutralSecondary,
                      fontSize: '1.125rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {section.content}
                  </Typography>
                ) : (
                  section.content
                )}
              </div>
            ))}

          {/* Main Content */}
          <div
            style={{
              color: theme.palette.neutralPrimary,
              lineHeight: 1.7,
            }}
            className='unified-content-detail'
          >
            {/* H1 headings are removed in _theme.scss to avoid duplication with title */}
            {config.contentType === 'markdown' ? (
              <ReactMarkdown
                components={markdownComponents}
                remarkPlugins={[remarkGfm]}
              >
                {config.content}
              </ReactMarkdown>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: config.content }} />
            )}
          </div>

          {/* Additional Sections */}
          {config.sections &&
            (!config.sectionsPosition || config.sectionsPosition === 'after') &&
            config.sections.map((section, index) => (
              <div key={index} style={{ marginTop: theme.spacing.xl }}>
                <Typography
                  variant='h2'
                  style={{
                    fontWeight: 600,
                    marginBottom: theme.spacing.m,
                    color: theme.palette.themePrimary,
                    fontSize: '1.5rem',
                  }}
                >
                  {section.title}
                </Typography>
                {typeof section.content === 'string' ? (
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.neutralSecondary,
                      fontSize: '1.125rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {section.content}
                  </Typography>
                ) : (
                  section.content
                )}
              </div>
            ))}
        </article>

        {/* Call to Action */}
        {config.cta && (
          <div style={{ marginTop: theme.spacing.xxl }}>
            <Callout
              variant='subtle'
              title={config.cta.title}
              subtitle={config.cta.description}
              action={
                <div
                  style={{
                    display: 'flex',
                    gap: theme.spacing.m,
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}
                >
                  {config.cta.buttons.map((button, index) => (
                    <FormButton
                      key={index}
                      variant={
                        button.variant === 'primary' ? 'primary' : 'secondary'
                      }
                      onClick={button.onClick}
                      size='large'
                    >
                      {button.label}
                    </FormButton>
                  ))}
                </div>
              }
            />
          </div>
        )}

        {/* Footer Navigation */}
        <div
          style={{
            marginTop: theme.spacing.l2,
            paddingTop: theme.spacing.l1,
            borderTop: `1px solid ${theme.palette.neutralLight}`,
          }}
        >
          <FormButton variant='secondary' onClick={handleBack} size='large'>
            ← {config.backLink.label}
          </FormButton>
        </div>
      </UnifiedPageWrapper>

      {/* Image Carousel Modal */}
      {imageGallery && (
        <ImageCarouselModal
          isOpen={isCarouselOpen}
          onDismiss={handleCarouselClose}
          images={imageGallery}
          initialIndex={carouselInitialIndex}
        />
      )}
    </>
  );
}
