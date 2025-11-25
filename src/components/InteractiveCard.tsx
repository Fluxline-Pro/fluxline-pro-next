'use client';

/**
 * InteractiveCard Component
 * A reusable card component with hover effects
 * Used for value cards, service cards, and other clickable/interactive content
 */

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface InteractiveCardProps {
  /** Unique identifier */
  id: string;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Fluent UI icon name */
  icon?: string;
  /** Optional link href - if provided, card becomes clickable */
  href?: string;
  /** Whether to show icon at top center (default) or left aligned with text */
  iconPosition?: 'center' | 'left';
  /** Custom onClick handler (ignored if href is provided) */
  onClick?: () => void;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  href,
  iconPosition = 'center',
  onClick,
}) => {
  const { theme } = useAppTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: iconPosition === 'center' ? 'column' : 'row',
    alignItems: iconPosition === 'center' ? 'center' : 'flex-start',
    textAlign: iconPosition === 'center' ? 'center' : 'left',
    gap: iconPosition === 'left' ? '1rem' : '0',
    padding: '2rem 1.5rem',
    borderRadius: theme.borderRadius.container.medium,
    border: `1px solid ${
      isHovered ? theme.palette.themePrimary : theme.palette.neutralTertiaryAlt
    }`,
    backgroundColor: isHovered
      ? theme.themeMode === 'dark' ||
        theme.themeMode === 'high-contrast' ||
        theme.themeMode === 'grayscale-dark'
        ? theme.palette.themeDarker
        : theme.palette.neutralLighter
      : 'transparent',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: isHovered ? theme.shadows.m : 'none',
    cursor: href || onClick ? 'pointer' : 'default',
    textDecoration: 'none',
  };

  const content = (
    <>
      {icon && (
        <FluentIcon
          iconName={icon}
          size='xLarge'
          color={theme.palette.themePrimary}
          style={{
            marginBottom: iconPosition === 'center' ? '1rem' : '0',
            flexShrink: 0,
          }}
        />
      )}

      <div style={{ flex: 1 }}>
        <Typography
          variant='h3'
          style={{
            color: theme.palette.themePrimary,
            fontSize: '1.25rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            marginBottom: '0.75rem',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '0.875rem',
            lineHeight: theme.typography.lineHeights.relaxed,
          }}
        >
          {description}
        </Typography>
      </div>
    </>
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // If href is provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        style={cardStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </Link>
    );
  }

  // Otherwise render as div with optional onClick
  return (
    <div
      style={cardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...(onClick && {
        role: 'button',
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        },
      })}
    >
      {content}
    </div>
  );
};

export default InteractiveCard;
