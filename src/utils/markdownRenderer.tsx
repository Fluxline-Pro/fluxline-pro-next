'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import { Typography } from '../theme/components/typography';
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { typography } from '../theme/theme';
import { useColorVisionFilter } from '@/theme';

/**
 * Content types supported by the markdown renderer
 */
export type ContentType = 'markdown' | 'mdx' | 'html' | 'text';

/**
 * Props for the UnifiedMarkdownRenderer component
 */
export interface UnifiedMarkdownRendererProps {
  content: string;
  contentType?: ContentType; // If not provided, auto-detects
  className?: string;
}

/**
 * Auto-detects content type from the string
 */
const detectContentType = (content: string): ContentType => {
  // Check for MDX imports/exports
  if (
    /^import\s+.*from\s+['"].*['"];?/m.test(content) ||
    /^export\s+/m.test(content)
  ) {
    return 'mdx';
  }

  // Check for HTML tags
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return 'html';
  }

  // Check for markdown syntax
  if (
    /^#{1,6}\s/m.test(content) || // Headers
    /\*\*.*\*\*/.test(content) || // Bold
    /\*.*\*/.test(content) || // Italic
    /\[.*\]\(.*\)/.test(content) || // Links
    /^[-*+]\s/m.test(content) || // Lists
    /^>\s/m.test(content) // Blockquotes
  ) {
    return 'markdown';
  }

  // Default to plain text
  return 'text';
};

/**
 * Converts Notion URLs and absolute references to relative site URLs
 */
const convertNotionUrls = (content: string): string => {
  // Replace Notion URLs with relative paths
  let converted = content.replace(
    /https?:\/\/(?:www\.)?notion\.so\/fluxline(?:-pro)?\/([a-zA-Z0-9-]+)/gi,
    '/$1'
  );

  // Replace other absolute URLs that point to the current site
  converted = converted.replace(
    /https?:\/\/(?:www\.)?fluxline\.pro\/([^)\s"']+)/gi,
    '/$1'
  );

  return converted;
};

/**
 * Unified Markdown Renderer Component
 *
 * Automatically detects and renders content types: Markdown, MDX, HTML, or text
 * - Uses ReactMarkdown for Markdown/MDX
 * - Sanitizes and renders HTML securely
 * - Converts Notion URLs to relative site URLs
 * - Applies Fluxline Pro theme typography
 */
export const UnifiedMarkdownRenderer: React.FC<
  UnifiedMarkdownRendererProps
> = ({ content, contentType, className }) => {
  const { theme } = useAppTheme();
  const { filter } = useColorVisionFilter();

  // Auto-detect content type if not provided
  const detectedType = useMemo(
    () => contentType || detectContentType(content),
    [content, contentType]
  );

  // Convert Notion URLs to relative paths
  const processedContent = useMemo(() => convertNotionUrls(content), [content]);

  // Define custom components for ReactMarkdown
  const markdownComponents = useMemo(
    () => ({
      h1: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='h1'
          {...props}
          className='markdown-h1'
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: typography.fontWeights.semiBold,
            color: theme.semanticColors.bodyText,
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.m,
          }}
        >
          {children}
        </Typography>
      ),
      h2: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='h2'
          {...props}
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: typography.fontWeights.semiBold,
            color: theme.semanticColors.bodyText,
            marginTop: theme.spacing.l,
            marginBottom: theme.spacing.m,
          }}
        >
          {children}
        </Typography>
      ),
      h3: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='h3'
          {...props}
          style={{
            ...typography.fonts.h3,
            color: theme.semanticColors.bodyText,
            marginTop: theme.spacing.l,
            marginBottom: theme.spacing.s,
          }}
        >
          {children}
        </Typography>
      ),
      h4: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='h4'
          {...props}
          style={{
            ...typography.fonts.h4,
            color: theme.semanticColors.bodyText,
            marginTop: theme.spacing.m,
            marginBottom: theme.spacing.s,
          }}
        >
          {children}
        </Typography>
      ),
      h5: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='h5'
          {...props}
          style={{
            ...typography.fonts.h5,
            color: theme.semanticColors.bodyText,
            marginTop: theme.spacing.m,
            marginBottom: theme.spacing.xs,
          }}
        >
          {children}
        </Typography>
      ),
      h6: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='h6'
          {...props}
          style={{
            ...typography.fonts.h6,
            color: theme.semanticColors.bodyText,
            marginTop: theme.spacing.m,
            marginBottom: theme.spacing.xs,
          }}
        >
          {children}
        </Typography>
      ),
      p: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLParagraphElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='p'
          {...props}
          style={{
            ...typography.fonts.body,
            color: theme.semanticColors.bodyText,
            marginBottom: theme.spacing.m,
            lineHeight: typography.lineHeights.normal,
          }}
        >
          {children}
        </Typography>
      ),
      blockquote: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLQuoteElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='blockquote'
          {...props}
          style={{
            ...typography.fonts.quote,
            color: theme.semanticColors.bodyText,
            borderLeft: `4px solid ${theme.palette.accent}`,
            paddingLeft: theme.spacing.m,
            marginLeft: 0,
            marginTop: theme.spacing.m,
            marginBottom: theme.spacing.m,
            fontStyle: 'italic',
          }}
        >
          {children}
        </Typography>
      ),
      code: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='code'
          {...props}
          style={{
            ...typography.fonts.code,
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.themePrimary,
            padding: '0.2em 0.4em',
            borderRadius: theme.borderRadius.s,
            fontFamily: typography.fontFamilies.mono,
          }}
        >
          {children}
        </Typography>
      ),
      pre: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLPreElement> & {
        children?: React.ReactNode;
      }) => (
        <Typography
          variant='pre'
          {...props}
          style={{
            ...typography.fonts.pre,
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.semanticColors.bodyText,
            padding: theme.spacing.m,
            borderRadius: theme.borderRadius.m,
            overflow: 'auto',
            marginTop: theme.spacing.m,
            marginBottom: theme.spacing.m,
            fontFamily: typography.fontFamilies.mono,
          }}
        >
          {children}
        </Typography>
      ),
      ul: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLUListElement> & {
        children?: React.ReactNode;
      }) => (
        <ul
          {...props}
          style={{
            color: theme.semanticColors.bodyText,
            marginLeft: theme.spacing.l,
            marginBottom: theme.spacing.m,
            lineHeight: typography.lineHeights.normal,
            listStyleType: 'disc',
            paddingLeft: theme.spacing.m,
          }}
        >
          {children}
        </ul>
      ),
      ol: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLOListElement> & {
        children?: React.ReactNode;
      }) => (
        <ol
          {...props}
          style={{
            color: theme.semanticColors.bodyText,
            marginLeft: theme.spacing.l,
            marginBottom: theme.spacing.m,
            lineHeight: typography.lineHeights.normal,
            listStyleType: 'decimal',
            paddingLeft: theme.spacing.m,
          }}
        >
          {children}
        </ol>
      ),
      li: ({
        children,
        ...props
      }: React.LiHTMLAttributes<HTMLLIElement> & {
        children?: React.ReactNode;
      }) => (
        <li
          {...props}
          style={{
            ...typography.fonts.body,
            color: theme.semanticColors.bodyText,
            marginBottom: theme.spacing.xs,
          }}
        >
          {children}
        </li>
      ),
      a: ({
        href,
        children,
        ...props
      }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        children?: React.ReactNode;
      }) => (
        <a
          href={href}
          {...props}
          style={{
            color: theme.semanticColors.link,
            textDecoration: 'underline',
            transition: theme.animations.transitions.button,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = theme.semanticColors.linkHovered;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = theme.semanticColors.link;
          }}
        >
          {children}
        </a>
      ),
      hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
        <hr
          {...props}
          style={{
            border: 'none',
            borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.xl,
          }}
        />
      ),
      /* ![Alt Text](image-url.jpg "Optional Title") */
      img: ({
        src,
        alt,
        title,
        ...props
      }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img
          src={src}
          alt={alt || ''}
          title={title}
          {...props}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            marginTop: theme.spacing.m,
            marginBottom: theme.spacing.m,
            borderRadius: theme.borderRadius.m,
            filter: filter,
          }}
        />
      ),
    }),
    [theme, filter]
  );

  // Render based on detected content type
  switch (detectedType) {
    case 'markdown':
    case 'mdx':
      return (
        <div className={`markdown-content ${className || ''}`}>
          <ReactMarkdown components={markdownComponents}>
            {processedContent}
          </ReactMarkdown>
          <style jsx>{`
            :global(.markdown-content .markdown-h1:first-child) {
              display: none;
            }
          `}</style>
        </div>
      );

    case 'html':
      // Sanitize HTML before rendering
      const sanitizedHtml = DOMPurify.sanitize(processedContent, {
        ALLOWED_TAGS: [
          'p',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'strong',
          'em',
          'u',
          'a',
          'ul',
          'ol',
          'li',
          'blockquote',
          'code',
          'pre',
          'br',
          'hr',
          'div',
          'span',
        ],
        ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class', 'style'],
      });

      return (
        <div
          className={className}
          style={{
            color: theme.semanticColors.bodyText,
            ...typography.fonts.body,
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      );

    case 'text':
    default:
      return (
        <Typography
          variant='p'
          className={className}
          style={{
            ...typography.fonts.body,
            color: theme.semanticColors.bodyText,
            whiteSpace: 'pre-wrap',
            lineHeight: typography.lineHeights.normal,
          }}
        >
          {processedContent}
        </Typography>
      );
  }
};

export default UnifiedMarkdownRenderer;
