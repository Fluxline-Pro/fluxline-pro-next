'use client';

import React, { useState } from 'react';
import { Card } from '../card/card';
import Link from 'next/link';
import { Modal } from '@/components/Modal';

/**
 * Data interface for CueCard content
 */
export interface CueCardData {
  /** Unique identifier for the cue card */
  id: string;
  /** Icon or symbol (emoji or text glyph) */
  icon?: string;
  /** Title or archetype name */
  title: string;
  /** Short mantra or invocation phrase */
  mantra: string;
  /** Action prompt - one clear step or ritual */
  action: string;
  /** Emotional overlay or mythic frame description */
  overlay: string;
  /** Optional link URL */
  link?: string;
  /** Optional link text (defaults to "Learn More") */
  linkText?: string;
  /** Optional tags for categorization */
  tags?: string[];
}

export interface CueCardProps {
  /** Cue card data */
  data: CueCardData;
  /** Additional CSS class name */
  className?: string;
  /** Click handler for the entire card */
  onClick?: () => void;
  /** Variant for different display contexts */
  variant?: 'default' | 'compact' | 'inline';
}

/**
 * CueCard component
 *
 * Displays modular "cue cards" that summarize key archetypes, mantras, and actions.
 * Designed to help visitors quickly understand offerings and engage with mythic curriculum.
 *
 * @example
 * ```tsx
 * <CueCard
 *   data={{
 *     id: "rebuilder",
 *     icon: "🏋️",
 *     title: "The Rebuilder",
 *     mantra: "I rise stronger through structure.",
 *     action: "Begin 4-week PT on-ramp",
 *     overlay: "This client honors repetition and mythic milestones.",
 *     link: "/services/personal-training"
 *   }}
 * />
 * ```
 */
export const CueCard: React.FC<CueCardProps> = ({
  data,
  className,
  onClick,
  variant = 'default',
}) => {
  const { icon, title, mantra, action, overlay, link, linkText, tags } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    root: {
      width: '100%',
      maxWidth:
        variant === 'compact'
          ? '320px'
          : variant === 'inline'
            ? '280px'
            : '400px',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    iconContainer: {
      fontSize: variant === 'compact' ? '2rem' : '2.5rem',
      marginBottom: '4px',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: 'var(--fx-accent)',
      margin: 0,
      lineHeight: 1.2,
    },
    divider: {
      width: '100%',
      height: '1px',
      backgroundColor: 'var(--fx-border)',
      margin: '4px 0',
    },
    label: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      color: 'var(--fx-text-muted)',
      marginBottom: '4px',
    },
    mantra: {
      fontSize: '1.125rem',
      fontStyle: 'italic',
      color: 'var(--fx-text-heading)',
      margin: 0,
    },
    action: {
      fontSize: '1rem',
      fontWeight: 600,
      color: 'var(--fx-text-heading)',
      margin: 0,
    },
    overlay: {
      fontSize: '0.9375rem',
      fontStyle: 'italic',
      color: 'var(--fx-text-muted)',
      margin: 0,
    },
    footer: {
      marginTop: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap' as const,
      gap: '8px',
    },
    link: {
      fontSize: '0.875rem',
      marginTop: '8px',
      color: 'var(--fx-accent)',
      textDecoration: 'underline',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '4px',
    },
    tag: {
      fontSize: '0.75rem',
      backgroundColor: 'var(--fx-border)',
      color: 'var(--fx-text-muted)',
      padding: '2px 4px',
      borderRadius: '4px',
    },
  };

  const cardPadding = variant === 'compact' ? 'small' : 'medium';

  return (
    <>
      <div style={styles.root} className={className}>
        <Card
          elevation={2}
          padding={cardPadding}
          hoverable
          onClick={handleCardClick}
        >
          <div style={styles.cardContent}>
            <div className='flex items-center'>
              {/* Icon / Symbol */}
              {icon && (
                <div style={styles.iconContainer} aria-hidden='true'>
                  {icon}
                </div>
              )}

              {/* Title / Archetype */}
              <h2 style={styles.title}>{title}</h2>
            </div>
            <div style={styles.divider} />

            {/* Mantra / Invocation */}
            <div>
              <p style={styles.label}>Mantra</p>
              <p style={styles.mantra}>&ldquo;{mantra}&rdquo;</p>
            </div>

            <div style={styles.divider} />

            {/* Action Prompt */}
            <div>
              <p style={styles.label}>Action</p>
              <p style={styles.action}>{action}</p>
            </div>

            <div style={styles.divider} />

            {/* Emotional Overlay / Description */}
            <div>
              <p style={styles.label}>Overlay</p>
              <p style={styles.overlay}>&ldquo;{overlay}&rdquo;</p>
            </div>

            {/* Optional Footer */}
            {(link || (tags && tags.length > 0)) && (
              <div style={styles.footer}>
                {tags && tags.length > 0 && (
                  <div style={styles.tags}>
                    {tags.map((tag) => (
                      <span key={tag} style={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {link && (
              <Link href={link} style={styles.link}>
                {linkText || 'Learn More'}
              </Link>
            )}
          </div>
        </Card>
      </div>

      {/* Full-screen Modal */}
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        ariaLabel={`${title} details`}
        maxWidth='900px'
      >
        <div className='p-xl'>
          {/* Modal Header */}
          <div className='text-center mb-xxl'>
            {icon && (
              <div
                style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                }}
                aria-hidden='true'
              >
                {icon}
              </div>
            )}
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--fx-accent)',
                margin: 0,
                marginBottom: '16px',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Modal Content */}
          <div className='flex flex-col gap-xxl'>
            {/* Mantra Section */}
            <section>
              <h2
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: 'var(--fx-accent)',
                  marginBottom: '16px',
                }}
              >
                Mantra
              </h2>
              <blockquote
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: 'var(--fx-text-heading)',
                  margin: 0,
                  padding: '16px 20px',
                  borderLeft: '4px solid var(--fx-accent)',
                }}
              >
                &ldquo;{mantra}&rdquo;
              </blockquote>
            </section>

            <hr
              style={{
                border: 'none',
                borderTop: '2px solid var(--fx-border)',
                margin: 0,
              }}
            />

            {/* Action Section */}
            <section>
              <h2
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: 'var(--fx-accent)',
                  marginBottom: '16px',
                }}
              >
                Action
              </h2>
              <p
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--fx-text-heading)',
                  margin: 0,
                }}
              >
                {action}
              </p>
            </section>

            <hr
              style={{
                border: 'none',
                borderTop: '2px solid var(--fx-border)',
                margin: 0,
              }}
            />

            {/* Overlay Section */}
            <section>
              <h2
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.08em',
                  color: 'var(--fx-accent)',
                  marginBottom: '16px',
                }}
              >
                Overlay
              </h2>
              <p
                style={{
                  fontSize: '0.9375rem',
                  fontStyle: 'italic',
                  color: 'var(--fx-text-muted)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                &ldquo;{overlay}&rdquo;
              </p>
            </section>

            {/* Tags and Link */}
            {(tags || link) && (
              <>
                <hr
                  style={{
                    border: 'none',
                    borderTop: '2px solid var(--fx-border)',
                    margin: 0,
                  }}
                />
                <div className='flex items-center justify-between flex-wrap gap-4'>
                  {tags && tags.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.875rem',
                            backgroundColor: 'var(--fx-border)',
                            color: 'var(--fx-text-muted)',
                            padding: '4px 8px',
                            borderRadius: '8px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {link && (
                    <Link
                      href={link}
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--fx-accent)',
                        textDecoration: 'underline',
                      }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      {linkText || 'Learn More'} →
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

CueCard.displayName = 'CueCard';

export default CueCard;
