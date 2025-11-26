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
  /** Show "Learn more" link with chevron at bottom of card */
  showLearnMore?: boolean;
  /** Custom onClick handler (ignored if href is provided) */
  onClick?: () => void;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  href,
  iconPosition = 'center',
  showLearnMore = false,
  onClick,
}) => {
  const { theme } = useAppTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  const isInteractive = Boolean(href || onClick);
  const isCentered = iconPosition === 'center';
  const hasTitle = Boolean(title);

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: isCentered ? 'center' : 'stretch',
    padding: isCentered ? '2rem 1.5rem' : '1rem',
    borderRadius: theme.borderRadius.container.medium,
    border: `1px solid ${
      isHovered ? theme.palette.themePrimary : theme.palette.neutralTertiaryAlt
    }`,
    backgroundColor: isHovered
      ? isDark
        ? theme.palette.neutralLighter
        : theme.palette.neutralLighterAlt
      : 'transparent',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: isHovered ? theme.shadows.l : theme.shadows.card,
    opacity: isHovered ? 1 : 0.9,
    cursor: isInteractive ? 'pointer' : 'default',
    textDecoration: 'none',
  };

  const renderContent = () => (
    <>
      {isCentered ? (
        // Center layout: icon on top, title and description centered
        <>
          {icon && (
            <FluentIcon
              iconName={icon}
              size='xLarge'
              color={theme.palette.themePrimary}
              style={{ marginBottom: '1rem', fontSize: '3rem' }}
            />
          )}
          {hasTitle && (
            <Typography
              variant='h3'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.25rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.5rem',
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>
          )}
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '0.875rem',
              lineHeight: theme.typography.lineHeights.relaxed,
              textAlign: 'center',
            }}
          >
            {description}
          </Typography>
        </>
      ) : (
        // Left layout: icon and text in a row (for features/offers)
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {icon && (
              <FluentIcon
                iconName={icon}
                size='medium'
                color={theme.palette.themeTertiary}
                style={{ flexShrink: 0, marginTop: hasTitle ? 0 : '0.125rem' }}
              />
            )}
            {hasTitle ? (
              <div style={{ flex: 1 }}>
                <Typography
                  variant='h3'
                  style={{
                    color: theme.palette.themePrimary,
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: theme.typography.fontWeights.semiBold,
                    marginBottom: '0.5rem',
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1rem',
                    lineHeight: theme.typography.lineHeights.relaxed,
                  }}
                >
                  {description}
                </Typography>
              </div>
            ) : (
              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  fontSize: '1rem',
                  lineHeight: theme.typography.lineHeights.relaxed,
                  flex: 1,
                }}
              >
                {description}
              </Typography>
            )}
          </div>
        </>
      )}

      {showLearnMore && (
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Typography
            variant='h6'
            style={{
              color: theme.palette.themeSecondary,
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.2s ease',
            }}
          >
            Learn more
          </Typography>
          <FluentIcon
            iconName='ChevronRight'
            size='small'
            color={theme.palette.themeSecondary}
            style={{
              opacity: isHovered ? 1 : 0.7,
              transition: 'all 0.2s ease',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            }}
          />
        </div>
      )}
    </>
  );

  const commonProps = {
    style: cardStyles,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {renderContent()}
      </Link>
    );
  }

  return (
    <div
      {...commonProps}
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
      {renderContent()}
    </div>
  );
};

export default InteractiveCard;
