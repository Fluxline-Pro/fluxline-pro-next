'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { format } from 'date-fns';
import type { BlogPost } from '../types';
import { IconButton } from '@fluentui/react';

interface BlogPostDetailClientProps {
  post: BlogPost;
}

/**
 * Blog Post Detail Client Component
 * Renders individual blog post with markdown content
 *
 * Features:
 * - Markdown rendering with syntax highlighting
 * - Theme-aware styling
 * - Navigation back to blog list
 * - Tag and category display
 * - Responsive layout
 */
export function BlogPostDetailClient({ post }: BlogPostDetailClientProps) {
  const router = useRouter();
  const { theme } = useAppTheme();

  const handleBack = React.useCallback(() => {
    router.push('/blog');
  }, [router]);

  const handleTagClick = React.useCallback(
    (tag: string) => {
      router.push(`/blog/tag/${encodeURIComponent(tag)}`);
    },
    [router]
  );

  const handleCategoryClick = React.useCallback(() => {
    router.push(`/blog/category/${encodeURIComponent(post.category)}`);
  }, [router, post.category]);

  return (
    <UnifiedPageWrapper
      layoutType='responsive-grid'
      imageConfig={{
        source: post.imageUrl || '',
        alt: post.imageAlt || post.title,
        title: post.title,
        showTitle: false,
      }}
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
                title='Back to Blog'
                ariaLabel='Back to Blog'
                onClick={handleBack}
                styles={{
                  root: {
                    color: theme.palette.themePrimary,
                  },
                  rootHovered: {
                    color: theme.palette.themeDark,
                    transform: 'translateX(-4px)',
                    transition: 'transform 0.2s ease-in-out',
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
              {post.title}
            </Typography>
          </div>
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
            <Typography variant='p'>
              By {post.author} • {format(post.publishedDate, 'MMMM d, yyyy')}
            </Typography>
            {post.lastUpdated && (
              <Typography variant='span' style={{ fontSize: '0.875rem' }}>
                Updated: {format(post.lastUpdated, 'MMMM d, yyyy')}
              </Typography>
            )}
          </div>

          {/* Category Badge */}
          <div style={{ marginBottom: theme.spacing.m }}>
            <button
              onClick={handleCategoryClick}
              style={{
                padding: `${theme.spacing.s1} ${theme.spacing.m}`,
                backgroundColor: theme.palette.themeLighter,
                color: theme.palette.themePrimary,
                border: `1px solid ${theme.palette.themePrimary}`,
                borderRadius: theme.effects.roundedCorner2,
                cursor: 'pointer',
                fontSize: theme.fonts.medium.fontSize,
                fontWeight: 600,
              }}
            >
              {post.category}
            </button>
          </div>

          {/* Tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacing.s1,
            }}
          >
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                style={{
                  padding: `${theme.spacing.s1} ${theme.spacing.m}`,
                  backgroundColor: theme.palette.neutralLighter,
                  color: theme.palette.neutralPrimary,
                  border: 'none',
                  borderRadius: theme.effects.roundedCorner2,
                  cursor: 'pointer',
                  fontSize: theme.fonts.small.fontSize,
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </header>

        {/* Excerpt */}
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
          {post.excerpt}
        </Typography>

        {/* Main Content with Markdown */}
        <div
          style={{
            color: theme.palette.neutralPrimary,
            lineHeight: 1.7,
          }}
          className='blog-post-content'
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
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
              h2: ({ children }) => (
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
              h3: ({ children }) => (
                <Typography
                  variant='h3'
                  style={{
                    fontWeight: 600,
                    marginTop: theme.spacing.l1,
                    marginBottom: theme.spacing.m,
                    color: theme.palette.neutralPrimary,
                    fontSize: '1.25rem',
                  }}
                >
                  {children}
                </Typography>
              ),
              p: ({ children }) => (
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
              ul: ({ children }) => (
                <ul
                  style={{
                    marginBottom: theme.spacing.m,
                    paddingLeft: theme.spacing.l1,
                  }}
                >
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol
                  style={{
                    marginBottom: theme.spacing.m,
                    paddingLeft: theme.spacing.l1,
                  }}
                >
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li
                  style={{
                    marginBottom: theme.spacing.s1,
                  }}
                >
                  <Typography variant='p'>{children}</Typography>
                </li>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                return (
                  <code
                    style={{
                      backgroundColor: theme.palette.neutralLighter,
                      color: theme.palette.themePrimary,
                      padding: isInline
                        ? `2px ${theme.spacing.s1}`
                        : theme.spacing.m,
                      borderRadius: theme.effects.roundedCorner2,
                      fontSize: isInline
                        ? '0.9em'
                        : theme.fonts.medium.fontSize,
                      display: isInline ? 'inline' : 'block',
                      overflowX: isInline ? 'visible' : 'auto',
                      fontFamily: 'monospace',
                    }}
                  >
                    {children}
                  </code>
                );
              },
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: `4px solid ${theme.palette.themePrimary}`,
                    paddingLeft: theme.spacing.l1,
                    marginLeft: 0,
                    marginBottom: theme.spacing.m,
                    fontStyle: 'italic',
                    color: theme.palette.neutralSecondary,
                  }}
                >
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
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
              img: ({ src, alt }) => (
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
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Footer Navigation */}
      <div
        style={{
          marginTop: theme.spacing.l2,
          paddingTop: theme.spacing.l1,
          borderTop: `1px solid ${theme.palette.neutralLight}`,
        }}
      >
        <button
          onClick={handleBack}
          style={{
            padding: `${theme.spacing.m} ${theme.spacing.l1}`,
            backgroundColor: theme.palette.themeSecondary,
            color: theme.palette.white,
            border: 'none',
            borderRadius: theme.effects.roundedCorner2,
            cursor: 'pointer',
            fontSize: theme.fonts.medium.fontSize,
            fontWeight: 600,
          }}
        >
          ← Back to Blog Entries
        </button>
      </div>
    </UnifiedPageWrapper>
  );
}
