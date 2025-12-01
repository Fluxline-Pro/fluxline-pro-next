'use client';

import React, { useState } from 'react';
import { mergeStyleSets } from '@fluentui/react';
import { useAppTheme } from '../../hooks/useAppTheme';
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
  const { theme } = useAppTheme();
  const { icon, title, mantra, action, overlay, link, linkText, tags } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const classNames = mergeStyleSets({
    root: [
      {
        width: '100%',
        maxWidth:
          variant === 'compact'
            ? '320px'
            : variant === 'inline'
              ? '280px'
              : '400px',
      },
      className,
    ],
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.m,
    },
    iconContainer: {
      fontSize: variant === 'compact' ? '2rem' : '2.5rem',
      marginBottom: theme.spacing.xs,
    },
    title: {
      ...theme.typography.fonts.xxLarge,
      color: theme.palette.themePrimary,
      margin: 0,
      lineHeight: 1.2,
    },
    divider: {
      width: '100%',
      height: '1px',
      backgroundColor: theme.palette.neutralLight,
      margin: `${theme.spacing.xs} 0`,
    },
    label: {
      ...theme.typography.fonts.glyphTag,
      color: theme.palette.neutralSecondary,
      marginBottom: theme.spacing.xs,
    },
    mantra: {
      ...theme.typography.fonts.quote,
      fontStyle: 'italic',
      color: theme.palette.neutralPrimary,
      margin: 0,
    },
    action: {
      ...theme.typography.fonts.mediumPlus,
      fontWeight: theme.typography.fontWeights.semiBold,
      color: theme.palette.neutralPrimary,
      margin: 0,
    },
    overlay: {
      ...theme.typography.fonts.emotionalCue,
      color: theme.palette.neutralSecondary,
      margin: 0,
    },
    footer: {
      marginTop: theme.spacing.s,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap' as const,
      gap: theme.spacing.s,
    },
    link: {
      ...theme.typography.fonts.medium,
      marginTop: theme.spacing.s,
      color: theme.palette.themePrimary,
      textDecoration: 'underline',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      ':hover': {
        color: theme.palette.themeDark,
      },
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: theme.spacing.xs,
    },
    tag: {
      ...theme.typography.fonts.caption,
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.neutralSecondary,
      padding: `2px ${theme.spacing.xs}`,
      borderRadius: theme.borderRadius.s,
    },
  });

  const cardPadding = variant === 'compact' ? 'small' : 'medium';

  return (
    <>
      <div className={classNames.root}>
        <Card
          elevation={2}
          padding={cardPadding}
          hoverable
          onClick={handleCardClick}
        >
          <div className={classNames.cardContent}>
            <div className='flex items-center'>
              {/* Icon / Symbol */}
              {icon && (
                <div className={classNames.iconContainer} aria-hidden='true'>
                  {icon}
                </div>
              )}

              {/* Title / Archetype */}
              <h2 className={classNames.title}>{title}</h2>
            </div>
            <div className={classNames.divider} />

            {/* Mantra / Invocation */}
            <div>
              <p className={classNames.label}>Mantra</p>
              <p className={classNames.mantra}>&ldquo;{mantra}&rdquo;</p>
            </div>

            <div className={classNames.divider} />

            {/* Action Prompt */}
            <div>
              <p className={classNames.label}>Action</p>
              <p className={classNames.action}>{action}</p>
            </div>

            <div className={classNames.divider} />

            {/* Emotional Overlay / Description */}
            <div>
              <p className={classNames.label}>Overlay</p>
              <p className={classNames.overlay}>&ldquo;{overlay}&rdquo;</p>
            </div>

            {/* Optional Footer */}
            {(link || (tags && tags.length > 0)) && (
              <div className={classNames.footer}>
                {tags && tags.length > 0 && (
                  <div className={classNames.tags}>
                    {tags.map((tag) => (
                      <span key={tag} className={classNames.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {link && (
              <Link href={link} className={classNames.link}>
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
                  marginBottom: theme.spacing.l,
                }}
                aria-hidden='true'
              >
                {icon}
              </div>
            )}
            <h1
              style={{
                ...theme.typography.fonts.xxLarge,
                color: theme.palette.themePrimary,
                margin: 0,
                marginBottom: theme.spacing.m,
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
                  ...theme.typography.fonts.glyphTag,
                  color: theme.palette.themePrimary,
                  marginBottom: theme.spacing.m,
                }}
              >
                Mantra
              </h2>
              <blockquote
                style={{
                  ...theme.typography.fonts.xLarge,
                  fontStyle: 'italic',
                  color: theme.palette.neutralPrimary,
                  margin: 0,
                  padding: `${theme.spacing.m} ${theme.spacing.l}`,
                  borderLeft: `4px solid ${theme.palette.themePrimary}`,
                }}
              >
                &ldquo;{mantra}&rdquo;
              </blockquote>
            </section>

            <hr
              style={{
                border: 'none',
                borderTop: `2px solid ${theme.palette.neutralLight}`,
                margin: 0,
              }}
            />

            {/* Action Section */}
            <section>
              <h2
                style={{
                  ...theme.typography.fonts.glyphTag,
                  color: theme.palette.themePrimary,
                  marginBottom: theme.spacing.m,
                }}
              >
                Action
              </h2>
              <p
                style={{
                  ...theme.typography.fonts.large,
                  fontWeight: theme.typography.fontWeights.semiBold,
                  color: theme.palette.neutralPrimary,
                  margin: 0,
                }}
              >
                {action}
              </p>
            </section>

            <hr
              style={{
                border: 'none',
                borderTop: `2px solid ${theme.palette.neutralLight}`,
                margin: 0,
              }}
            />

            {/* Overlay Section */}
            <section>
              <h2
                style={{
                  ...theme.typography.fonts.glyphTag,
                  color: theme.palette.themePrimary,
                  marginBottom: theme.spacing.m,
                }}
              >
                Overlay
              </h2>
              <p
                style={{
                  ...theme.typography.fonts.emotionalCue,
                  color: theme.palette.neutralSecondary,
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
                    borderTop: `2px solid ${theme.palette.neutralLight}`,
                    margin: 0,
                  }}
                />
                <div className='flex items-center justify-between flex-wrap gap-4'>
                  {tags && tags.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: theme.spacing.s,
                      }}
                    >
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            ...theme.typography.fonts.medium,
                            backgroundColor: theme.palette.neutralLight,
                            color: theme.palette.neutralSecondary,
                            padding: `${theme.spacing.xs} ${theme.spacing.s}`,
                            borderRadius: theme.borderRadius.m,
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
                        ...theme.typography.fonts.large,
                        color: theme.palette.themePrimary,
                        textDecoration: 'underline',
                        fontWeight: theme.typography.fontWeights.semiBold,
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
