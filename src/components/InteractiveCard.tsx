'use client';

/**
 * InteractiveCard Component
 * A reusable card component with hover effects
 * Used for value cards, service cards, and other clickable/interactive content
 */

import React, { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
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
  /** Optional tooltip text to display on hover */
  tooltip?: string;
  /** Whether the card is in a selected state */
  isSelected?: boolean;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  href,
  iconPosition = 'center',
  showLearnMore = false,
  onClick,
  tooltip,
  isSelected = false,
}) => {
  const { theme } = useAppTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState({
    top: 0,
    left: 0,
    arrowOffset: 0, // How far from left edge the arrow should be
  });
  const infoIconRef = React.useRef<HTMLDivElement>(null);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const updateTooltipPosition = React.useCallback(() => {
    if (infoIconRef.current) {
      const rect = infoIconRef.current.getBoundingClientRect();
      const tooltipWidth =
        window.innerWidth < 500 ? window.innerWidth * 0.9 : 400;
      const viewportWidth = window.innerWidth;
      const padding = 16;

      // Icon center position (absolute, includes scroll)
      const iconCenterX = rect.left + window.scrollX + rect.width / 2;

      // Ideal tooltip left edge (centered under icon)
      let tooltipLeft = iconCenterX - tooltipWidth / 2;

      // Arrow offset from tooltip's left edge (starts at center)
      let arrowOffset = tooltipWidth / 2;

      // Adjust if tooltip would go off screen
      if (tooltipLeft < padding) {
        // Tooltip too far left, move it right
        arrowOffset = iconCenterX - padding; // Arrow moves left relative to tooltip
        tooltipLeft = padding;
      } else if (tooltipLeft + tooltipWidth > viewportWidth - padding) {
        // Tooltip too far right, move it left
        const adjustedLeft = viewportWidth - tooltipWidth - padding;
        arrowOffset = iconCenterX - adjustedLeft; // Arrow position relative to new left edge
        tooltipLeft = adjustedLeft;
      }

      setTooltipPosition({
        top: rect.bottom + window.scrollY + 8,
        left: tooltipLeft,
        arrowOffset,
      });
    }
  }, []);

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
    border: isSelected
      ? `2px solid ${theme.palette.themePrimary}`
      : `1px solid ${
          isHovered
            ? theme.palette.themePrimary
            : theme.palette.neutralTertiaryAlt
        }`,
    backgroundColor:
      theme.themeMode === 'high-contrast'
        ? theme.semanticColors.bodyBackground
        : isHovered || isSelected
          ? isDark
            ? theme.palette.neutralLighter
            : theme.palette.neutralLighterAlt
          : theme.palette.neutralLighterAlt,
    transition: 'all 0.3s ease',
    transform: isSelected
      ? 'translateY(0)'
      : isHovered
        ? 'translateY(-4px)'
        : 'translateY(0)',
    boxShadow: isSelected
      ? theme.shadows.xl
      : isHovered
        ? theme.shadows.l
        : theme.shadows.card,
    opacity: isHovered ? 1 : 0.9,
    cursor: isInteractive ? 'pointer' : 'default',
    textDecoration: 'none',
    overflow: 'visible',
    position: 'relative',
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
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {hasTitle && (
              <>
                <Typography
                  variant='h3'
                  style={{
                    color: theme.palette.themePrimary,
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: theme.typography.fontWeights.semiBold,
                    textAlign: 'center',
                    textTransform: 'none',
                  }}
                >
                  {title}
                </Typography>
                {tooltip && (
                  <>
                    <div
                      ref={infoIconRef}
                      style={{ position: 'relative', marginBottom: '0.5rem' }}
                      onMouseEnter={() => {
                        updateTooltipPosition();
                        setShowTooltip(true);
                      }}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <FluentIcon
                        iconName='Info'
                        size='small'
                        color={theme.palette.themePrimary}
                        style={{ cursor: 'help' }}
                      />
                    </div>
                    {isMounted &&
                      createPortal(
                        <AnimatePresence>
                          {showTooltip && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.2, ease: 'easeOut' }}
                              style={{
                                position: 'absolute',
                                top: tooltipPosition.top,
                                left: tooltipPosition.left,
                                padding: theme.spacing.m,
                                backgroundColor: isDark
                                  ? theme.palette.neutralLighter
                                  : theme.palette.white,
                                color: isDark
                                  ? theme.palette.white
                                  : theme.palette.neutralPrimary,
                                borderRadius:
                                  theme.borderRadius.container.medium,
                                boxShadow: theme.shadows.tooltip,
                                width: '90vw',
                                maxWidth: '400px',
                                zIndex: 50,
                                border: `2px solid ${theme.palette.themePrimary}`,
                                pointerEvents: 'none',
                              }}
                            >
                              <Typography
                                variant='bodySmall'
                                style={{
                                  color: isDark
                                    ? theme.palette.white
                                    : theme.palette.neutralPrimary,
                                  lineHeight:
                                    theme.typography.lineHeights.relaxed,
                                }}
                              >
                                {tooltip}
                              </Typography>
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: '100%',
                                  left: `${tooltipPosition.arrowOffset}px`,
                                  transform: 'translateX(-50%)',
                                  width: 0,
                                  height: 0,
                                  borderLeft: '8px solid transparent',
                                  borderRight: '8px solid transparent',
                                  borderBottom: `8px solid ${theme.palette.themePrimary}`,
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>,
                        document.body
                      )}
                  </>
                )}
              </>
            )}
          </div>
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
