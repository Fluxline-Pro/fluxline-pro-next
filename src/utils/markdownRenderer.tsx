'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import { useColorVisionFilter } from '@/theme/hooks/useColorVisionFilter';

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
 * - Applies Fluxline Pro DSM typography tokens
 */
export const UnifiedMarkdownRenderer: React.FC<
  UnifiedMarkdownRendererProps
> = ({ content, contentType, className }) => {
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
        <h1
          {...props}
          className='markdown-h1'
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 600,
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            marginTop: '32px',
            marginBottom: '16px',
          }}
        >
          {children}
        </h1>
      ),
      h2: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <h2
          {...props}
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 600,
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            marginTop: '20px',
            marginBottom: '16px',
          }}
        >
          {children}
        </h2>
      ),
      h3: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <h3
          {...props}
          style={{
            fontSize: 'var(--fx-h3-size)',
            fontWeight: 'var(--fx-h3-weight)' as unknown as number,
            fontFamily: 'var(--fx-font)',
            letterSpacing: 'var(--fx-heading-tracking)',
            color: 'var(--fx-text-body)',
            marginTop: '20px',
            marginBottom: '8px',
          }}
        >
          {children}
        </h3>
      ),
      h4: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <h4
          {...props}
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            marginTop: '16px',
            marginBottom: '8px',
          }}
        >
          {children}
        </h4>
      ),
      h5: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <h5
          {...props}
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            marginTop: '16px',
            marginBottom: '4px',
          }}
        >
          {children}
        </h5>
      ),
      h6: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLHeadingElement> & {
        children?: React.ReactNode;
      }) => (
        <h6
          {...props}
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            marginTop: '16px',
            marginBottom: '4px',
          }}
        >
          {children}
        </h6>
      ),
      p: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLParagraphElement> & {
        children?: React.ReactNode;
      }) => (
        <p
          {...props}
          style={{
            fontSize: 'var(--fx-body-size)',
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            marginBottom: '16px',
            lineHeight: 'var(--fx-body-leading)',
          }}
        >
          {children}
        </p>
      ),
      blockquote: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLQuoteElement> & {
        children?: React.ReactNode;
      }) => (
        <blockquote
          {...props}
          style={{
            fontSize: 'var(--fx-body-size)',
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            borderLeft: '4px solid var(--fx-accent)',
            paddingLeft: '16px',
            marginLeft: 0,
            marginTop: '16px',
            marginBottom: '16px',
            fontStyle: 'italic',
          }}
        >
          {children}
        </blockquote>
      ),
      code: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLElement> & {
        children?: React.ReactNode;
      }) => (
        <code
          {...props}
          style={{
            backgroundColor: 'var(--fx-badge-bg)',
            color: 'var(--fx-accent)',
            padding: '0.2em 0.4em',
            borderRadius: 'var(--fx-radius-control)',
            fontFamily: 'var(--fx-font-mono)',
            fontSize: 'var(--fx-mono-size)',
          }}
        >
          {children}
        </code>
      ),
      pre: ({
        children,
        ...props
      }: React.HTMLAttributes<HTMLPreElement> & {
        children?: React.ReactNode;
      }) => (
        <pre
          {...props}
          style={{
            backgroundColor: 'var(--fx-badge-bg)',
            color: 'var(--fx-text-body)',
            padding: '16px',
            borderRadius: 'var(--fx-radius-card-sm)',
            overflow: 'auto',
            overflowX: 'auto',
            marginTop: '16px',
            marginBottom: '16px',
            fontFamily: 'var(--fx-font-mono)',
            fontSize: 'var(--fx-mono-size)',
            lineHeight: 'var(--fx-mono-leading)',
            maxWidth: '100%',
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
          }}
        >
          {children}
        </pre>
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
            color: 'var(--fx-text-body)',
            marginLeft: '20px',
            marginBottom: '16px',
            lineHeight: 'var(--fx-body-leading)',
            listStyleType: 'disc',
            paddingLeft: '16px',
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
            color: 'var(--fx-text-body)',
            marginLeft: '20px',
            marginBottom: '16px',
            lineHeight: 'var(--fx-body-leading)',
            listStyleType: 'decimal',
            paddingLeft: '16px',
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
            fontSize: 'var(--fx-body-size)',
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            marginBottom: '4px',
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
            color: 'var(--fx-accent)',
            textDecoration: 'underline',
            transition: 'color 0.15s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'var(--fx-text-heading)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--fx-accent)';
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
            borderTop: '1px solid var(--fx-border)',
            marginTop: '32px',
            marginBottom: '32px',
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
            marginTop: '16px',
            marginBottom: '16px',
            borderRadius: 'var(--fx-radius-card-sm)',
            filter: filter,
          }}
        />
      ),
    }),
    [filter]
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
            color: 'var(--fx-text-body)',
            fontSize: 'var(--fx-body-size)',
            fontFamily: 'var(--fx-font)',
            lineHeight: 'var(--fx-body-leading)',
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      );

    case 'text':
    default:
      return (
        <p
          className={className}
          style={{
            fontSize: 'var(--fx-body-size)',
            fontFamily: 'var(--fx-font)',
            color: 'var(--fx-text-body)',
            whiteSpace: 'pre-wrap',
            lineHeight: 'var(--fx-body-leading)',
          }}
        >
          {processedContent}
        </p>
      );
  }
};

export default UnifiedMarkdownRenderer;
