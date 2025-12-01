'use client';

import React from 'react';
import { mergeStyleSets } from '@fluentui/react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Card } from '../card/card';
import Link from 'next/link';

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

  const classNames = mergeStyleSets({
    root: [
      {
        width: '100%',
        maxWidth: variant === 'compact' ? '320px' : variant === 'inline' ? '280px' : '400px',
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
      fontSize:
        variant === 'compact'
          ? theme.fonts.large.fontSize
          : theme.fonts.xLarge.fontSize,
      fontWeight: theme.fonts.xLarge.fontWeight as number,
      fontFamily: theme.fonts.xLarge.fontFamily,
      color: theme.palette.themePrimary,
      margin: 0,
      lineHeight: 1.2,
    },
    divider: {
      width: '100%',
      height: '1px',
      backgroundColor: theme.palette.neutralLight,
      margin: `${theme.spacing.s} 0`,
    },
    label: {
      fontSize: theme.fonts.small.fontSize,
      fontWeight: 600,
      color: theme.palette.neutralSecondary,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginBottom: theme.spacing.xs,
    },
    mantra: {
      fontSize: theme.fonts.medium.fontSize,
      fontFamily: theme.fonts.medium.fontFamily,
      fontStyle: 'italic',
      color: theme.palette.neutralPrimary,
      margin: 0,
      lineHeight: 1.5,
    },
    action: {
      fontSize: theme.fonts.medium.fontSize,
      fontFamily: theme.fonts.medium.fontFamily,
      fontWeight: 600,
      color: theme.palette.neutralPrimary,
      margin: 0,
      lineHeight: 1.5,
    },
    overlay: {
      fontSize: theme.fonts.medium.fontSize,
      fontFamily: theme.fonts.medium.fontFamily,
      color: theme.palette.neutralSecondary,
      margin: 0,
      lineHeight: 1.6,
    },
    footer: {
      marginTop: theme.spacing.s,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: theme.spacing.s,
    },
    link: {
      color: theme.palette.themePrimary,
      textDecoration: 'underline',
      fontSize: theme.fonts.medium.fontSize,
      fontFamily: theme.fonts.medium.fontFamily,
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      ':hover': {
        color: theme.palette.themeDark,
      },
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: theme.spacing.xs,
    },
    tag: {
      fontSize: theme.fonts.small.fontSize,
      fontFamily: theme.fonts.small.fontFamily,
      backgroundColor: theme.palette.neutralLight,
      color: theme.palette.neutralSecondary,
      padding: `2px ${theme.spacing.xs}`,
      borderRadius: theme.borderRadius.s,
    },
  });

  const cardPadding = variant === 'compact' ? 'small' : 'medium';

  return (
    <div className={classNames.root}>
      <Card
        elevation={2}
        padding={cardPadding}
        hoverable={!!onClick || !!link}
        onClick={onClick}
      >
        <div className={classNames.cardContent}>
          {/* Icon / Symbol */}
          {icon && (
            <div className={classNames.iconContainer} aria-hidden='true'>
              {icon}
            </div>
          )}

          {/* Title / Archetype */}
          <h2 className={classNames.title}>{title}</h2>

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
              {link && (
                <Link href={link} className={classNames.link}>
                  {linkText || 'Learn More'}
                </Link>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

CueCard.displayName = 'CueCard';

export default CueCard;
