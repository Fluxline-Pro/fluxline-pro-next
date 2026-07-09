'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxRailLayout from '@/theme/components/dsm/FxRailLayout';
import FxButton from '@/theme/components/dsm/FxButton';
import FxChip from '@/theme/components/dsm/FxChip';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import {
  SocialLinks,
  type SocialLinksData,
} from '@/app/about/components/SocialLinks';
import { ImageCarouselModal, type CarouselImage } from './ImageCarouselModal';
import { Modal } from './Modal';
import { GeneratedWithAIBadge } from './GeneratedWithAIBadge';

export interface UnifiedContentDetailConfig {
  title: string;
  content: string;
  contentType: 'markdown' | 'html';
  excerpt?: string;
  metadata?: Array<{
    label: string;
    value: string | React.ReactNode;
  }>;
  authorInfo?: {
    name: string;
    publishDate?: string;
    lastUpdated?: string;
    socialLinks?: SocialLinksData;
  };
  backLink: {
    url: string;
    label: string;
  };
  badges?: Array<{
    label: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    onClick?: () => void;
  }>;
  imageConfig?: {
    source: string;
    alt: string;
    title?: string;
    showTitle?: boolean;
    gallery?: CarouselImage[];
  };
  sections?: Array<{
    title: string;
    content: string | React.ReactNode;
  }>;
  showGallerySection?: boolean;
  sectionsPosition?: 'before' | 'after';
  cta?: {
    title: string;
    description: string;
    buttons: Array<{
      label: string;
      onClick: () => void;
      variant: 'primary' | 'secondary';
    }>;
  };
  externalLinks?: Array<{
    label: string;
    url: string;
    variant: 'github' | 'live' | 'custom';
  }>;
  generatedWithAI?: boolean;
  customModalContent?: React.ReactNode;
}

interface UnifiedContentDetailProps {
  config: UnifiedContentDetailConfig;
}

export function UnifiedContentDetail({ config }: UnifiedContentDetailProps) {
  const router = useRouter();
  const { themeMode } = useAppTheme();
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselInitialIndex, setCarouselInitialIndex] = useState(0);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark =
    themeMode === 'dark' ||
    themeMode === 'high-contrast' ||
    themeMode === 'grayscale-dark';

  const handleImageClick = React.useCallback(() => {
    if (config.imageConfig) {
      setCarouselInitialIndex(0);
      setIsCarouselOpen(true);
    }
  }, [config.imageConfig]);

  const handleBack = React.useCallback(() => {
    router.push(config.backLink.url);
  }, [router, config.backLink.url]);

  const imageGallery = React.useMemo(() => {
    if (!config.imageConfig) return undefined;
    if (config.imageConfig.gallery) return config.imageConfig.gallery;
    return [
      {
        url: config.imageConfig.source,
        alt: config.imageConfig.alt,
        caption: config.imageConfig.title,
      },
    ];
  }, [config.imageConfig]);

  const markdownComponents: Partial<any> = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1
        style={{
          fontSize: 'var(--fx-article-h1)',
          fontWeight: 800,
          color: 'var(--fx-text-heading)',
          letterSpacing: 'var(--fx-heading-tracking)',
          margin: '2em 0 0.75em',
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        style={{
          fontSize: 'var(--fx-article-h2)',
          fontWeight: 700,
          color: 'var(--fx-text-heading)',
          letterSpacing: 'var(--fx-heading-tracking)',
          margin: '1.75em 0 0.5em',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        style={{
          fontSize: 'var(--fx-article-h3)',
          fontWeight: 700,
          color: 'var(--fx-text-heading)',
          margin: '1.5em 0 0.5em',
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p
        style={{
          fontSize: 'var(--fx-body-size)',
          lineHeight: 'var(--fx-body-leading)',
          color: 'var(--fx-text-body)',
          margin: '0 0 1em',
        }}
      >
        {children}
      </p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul
        style={{
          margin: '0 0 1em',
          paddingLeft: 24,
          listStyleType: 'disc',
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol
        style={{
          margin: '0 0 1em',
          paddingLeft: 24,
          listStyleType: 'decimal',
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li
        style={{
          marginBottom: 4,
          fontSize: 'var(--fx-body-size)',
          lineHeight: 'var(--fx-body-leading)',
          color: 'var(--fx-text-body)',
        }}
      >
        {children}
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
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';

      if (isInline) {
        return (
          <code
            style={{
              background: 'var(--fx-surface-inset)',
              color: 'var(--fx-teal)',
              padding: '2px 6px',
              borderRadius: 4,
              fontSize: '0.9em',
              fontFamily: 'var(--fx-font-mono)',
            }}
          >
            {children}
          </code>
        );
      }

      const codeString = String(children).replace(/\n$/, '');
      return (
        <SyntaxHighlighter
          language={language}
          style={isDark ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            padding: 16,
            borderRadius: 8,
            fontSize: 'var(--fx-mono-size)',
            fontFamily: 'var(--fx-font-mono)',
            backgroundColor: isDark
              ? 'var(--fx-surface-inset)'
              : 'var(--fx-surface-card)',
          }}
          codeTagProps={{
            style: { fontFamily: 'var(--fx-font-mono)' },
          }}
          wrapLongLines={false}
        >
          {codeString}
        </SyntaxHighlighter>
      );
    },
    pre: ({ children }: { children?: React.ReactNode }) => (
      <div style={{ margin: '0 0 1em', overflowX: 'auto' }}>{children}</div>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        style={{
          borderLeft: '3px solid var(--fx-gold)',
          background: 'var(--fx-gold-bg)',
          padding: '16px 20px',
          margin: '0 0 1em',
          borderRadius: '0 8px 8px 0',
          fontStyle: 'italic',
          color: 'var(--fx-text-body)',
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
          color: 'var(--fx-teal)',
          textDecoration: 'none',
          transition: 'color var(--fx-color-duration)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--fx-text-bright)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--fx-teal)';
        }}
      >
        {children}
      </a>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <img
        src={src}
        alt={alt || ''}
        style={{
          maxWidth: '100%',
          height: 'auto',
          margin: '0 0 1em',
          borderRadius: 8,
          objectFit: 'contain',
        }}
      />
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
      <div style={{ overflowX: 'auto', margin: '0 0 1em' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid var(--fx-border)',
          }}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead style={{ background: 'var(--fx-surface-inset)' }}>{children}</thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
      <tr style={{ borderBottom: '1px solid var(--fx-border)' }}>{children}</tr>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th
        style={{
          padding: '8px 12px',
          textAlign: 'left',
          fontWeight: 700,
          color: 'var(--fx-text-heading)',
          borderRight: '1px solid var(--fx-border)',
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td
        style={{
          padding: '8px 12px',
          borderRight: '1px solid var(--fx-border)',
          color: 'var(--fx-text-body)',
        }}
      >
        {children}
      </td>
    ),
  };

  const railContent = config.imageConfig ? (
    <div
      style={{
        background: 'var(--fx-surface-inset)',
        border: '1px solid var(--fx-border)',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: config.imageConfig.gallery ? 'pointer' : undefined,
      }}
      onClick={config.imageConfig.gallery ? handleImageClick : undefined}
    >
      <img
        src={config.imageConfig.source}
        alt={config.imageConfig.alt}
        style={{
          display: 'block',
          width: '100%',
          aspectRatio: '1/1',
          objectFit: 'cover',
          background: '#000',
        }}
      />
      {config.imageConfig.showTitle !== false && config.imageConfig.title && (
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid var(--fx-border)',
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--fx-text-bright)',
            }}
          >
            {config.imageConfig.title}
          </div>
        </div>
      )}
    </div>
  ) : null;

  const renderSections = (position: 'before' | 'after') => {
    if (!config.sections || config.sectionsPosition !== position) return null;
    return config.sections.map((section, index) => (
      <div key={index} style={{ marginTop: position === 'after' ? 32 : 0, marginBottom: position === 'before' ? 32 : 0 }}>
        <h2
          style={{
            fontSize: 'var(--fx-article-h2)',
            fontWeight: 700,
            color: 'var(--fx-text-heading)',
            margin: '0 0 12px',
          }}
        >
          {section.title}
        </h2>
        {typeof section.content === 'string' ? (
          <p
            style={{
              fontSize: 'var(--fx-body-size)',
              lineHeight: 'var(--fx-body-leading)',
              color: 'var(--fx-text-body)',
            }}
          >
            {section.content}
          </p>
        ) : (
          section.content
        )}
      </div>
    ));
  };

  const gallerySection =
    config.showGallerySection &&
    config.sectionsPosition === 'before' &&
    config.imageConfig?.gallery ? (
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontSize: 'var(--fx-article-h2)',
            fontWeight: 700,
            color: 'var(--fx-text-heading)',
            margin: '0 0 16px',
          }}
        >
          Project Gallery
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {config.imageConfig.gallery.map((image, index) => (
            <div
              key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setCarouselInitialIndex(index);
                setIsCarouselOpen(true);
              }}
            >
              <img
                src={image.url}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              {image.caption && (
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--fx-text-faint)',
                    fontStyle: 'italic',
                    marginTop: 4,
                  }}
                >
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const articleContent = (
    <article>
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 'var(--fx-h1-size)',
            fontWeight: 800,
            color: 'var(--fx-text-heading)',
            letterSpacing: 'var(--fx-heading-tracking)',
            margin: '0 0 16px',
          }}
        >
          {config.title}
        </h1>

        {config.authorInfo && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: 'var(--fx-text-bright)',
              }}
            >
              {config.authorInfo.name}
            </div>
            {config.authorInfo.socialLinks && (
              <div style={{ marginTop: 6, marginBottom: 6 }}>
                <SocialLinks
                  socialLinks={config.authorInfo.socialLinks}
                  name={config.authorInfo.name}
                  size="small"
                />
              </div>
            )}
            <div
              style={{
                fontSize: 'var(--fx-meta-size)',
                color: 'var(--fx-text-faint)',
                marginTop: 4,
              }}
            >
              Published: {config.authorInfo.publishDate}
              {config.authorInfo.lastUpdated && (
                <> &middot; Last Updated: {config.authorInfo.lastUpdated}</>
              )}
            </div>
          </div>
        )}

        {!config.authorInfo &&
          config.metadata &&
          config.metadata.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'center',
                marginBottom: 16,
                fontSize: 'var(--fx-meta-size)',
                color: 'var(--fx-text-faint)',
              }}
            >
              {config.metadata.map((meta, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>&middot;</span>}
                  <span>
                    {meta.label ? `${meta.label}: ` : ''}
                    {meta.value}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}

        {config.badges && config.badges.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 16,
            }}
          >
            {config.badges.map((badge, index) => (
              <FxChip
                key={index}
                kind="badge"
                tone={badge.variant === 'primary' ? 'teal' : undefined}
                onClick={badge.onClick}
              >
                {badge.label}
              </FxChip>
            ))}
          </div>
        )}

        {config.generatedWithAI && (
          <div style={{ marginBottom: 16 }}>
            <GeneratedWithAIBadge />
          </div>
        )}
      </header>

      {config.excerpt && (
        <blockquote
          style={{
            borderLeft: '3px solid var(--fx-teal)',
            padding: '12px 20px',
            margin: '0 0 24px',
            fontStyle: 'italic',
            fontSize: 17,
            color: 'var(--fx-text-muted)',
            lineHeight: 1.6,
          }}
        >
          {config.excerpt}
        </blockquote>
      )}

      {config.externalLinks && config.externalLinks.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          {config.externalLinks.map((link, index) => (
            <FxButton
              key={index}
              variant={link.variant === 'live' ? 'primary' : 'outline'}
              size="sm"
              href={link.url}
            >
              {link.label}
            </FxButton>
          ))}
        </div>
      )}

      {gallerySection}
      {renderSections('before')}

      <div style={{ color: 'var(--fx-text-body)', lineHeight: 1.7 }}>
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

      {renderSections('after')}
    </article>
  );

  return (
    <>
      <FxContainer as="section" style={{ padding: '48px 32px 88px' }}>
        {railContent ? (
          <FxRailLayout rail={railContent}>{articleContent}</FxRailLayout>
        ) : (
          <div style={{ maxWidth: 800 }}>{articleContent}</div>
        )}

        {config.cta && (
          <div style={{ marginTop: 48 }}>
            <FxCTABand
              title={config.cta.title}
              body={config.cta.description}
              primaryLabel={config.cta.buttons[0]?.label}
              primaryHref="/contact"
            />
          </div>
        )}

        <div
          style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: '1px solid var(--fx-border-subtle)',
          }}
        >
          <FxButton variant="outline" onClick={handleBack}>
            ← {config.backLink.label}
          </FxButton>
        </div>
      </FxContainer>

      {config.customModalContent ? (
        <Modal
          isOpen={isCarouselOpen}
          onDismiss={() => setIsCarouselOpen(false)}
          ariaLabel="Interactive Demo"
          maxWidth="640px"
        >
          {config.customModalContent}
        </Modal>
      ) : (
        imageGallery && (
          <ImageCarouselModal
            isOpen={isCarouselOpen}
            onDismiss={() => setIsCarouselOpen(false)}
            images={imageGallery}
            initialIndex={carouselInitialIndex}
          />
        )
      )}
    </>
  );
}
