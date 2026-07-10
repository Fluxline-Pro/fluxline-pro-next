'use client';

/**
 * InteractiveCard Component
 * A reusable card component with hover effects
 * Used for value cards, service cards, and other clickable/interactive content
 *
 * Migrated from Fluent UI to DSM CSS custom properties.
 */

import React, { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isHovered, setIsHovered] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [tooltipPosition, setTooltipPosition] = React.useState({
    top: 0,
    left: 0,
    arrowOffset: 0,
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

      const iconCenterX = rect.left + window.scrollX + rect.width / 2;
      let tooltipLeft = iconCenterX - tooltipWidth / 2;
      let arrowOffset = tooltipWidth / 2;

      if (tooltipLeft < padding) {
        arrowOffset = iconCenterX - padding;
        tooltipLeft = padding;
      } else if (tooltipLeft + tooltipWidth > viewportWidth - padding) {
        const adjustedLeft = viewportWidth - tooltipWidth - padding;
        arrowOffset = iconCenterX - adjustedLeft;
        tooltipLeft = adjustedLeft;
      }

      setTooltipPosition({
        top: rect.bottom + window.scrollY + 8,
        left: tooltipLeft,
        arrowOffset,
      });
    }
  }, []);

  const isInteractive = Boolean(href || onClick);
  const isCentered = iconPosition === 'center';
  const hasTitle = Boolean(title);

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: isCentered ? 'center' : 'stretch',
    padding: isCentered ? '2rem 1.5rem' : '1.25rem',
    borderRadius: 'var(--fx-radius-card)',
    border: isSelected
      ? '2px solid var(--fx-accent)'
      : `1px solid ${
          isHovered
            ? 'var(--fx-border-hover)'
            : 'var(--fx-border)'
        }`,
    backgroundColor: isHovered || isSelected
      ? 'var(--fx-surface-raised)'
      : 'var(--fx-surface-card)',
    transition: 'all 0.3s ease',
    transform: isSelected
      ? 'translateY(0)'
      : isHovered
        ? 'var(--fx-hover-lift)'
        : 'translateY(0)',
    boxShadow: isSelected
      ? '0 20px 40px rgba(0,0,0,0.25)'
      : isHovered
        ? '0 12px 28px rgba(0,0,0,0.18)'
        : '0 2px 8px rgba(0,0,0,0.08)',
    opacity: isHovered ? 1 : 0.9,
    cursor: isInteractive ? 'pointer' : 'default',
    textDecoration: 'none',
    overflow: 'visible',
    position: 'relative',
  };

  const renderContent = () => (
    <>
      {isCentered ? (
        <>
          {icon && (
            <span
              style={{
                marginBottom: '1rem',
                fontSize: '3rem',
                color: 'var(--fx-accent)',
                lineHeight: 1,
              }}
              role="img"
              aria-hidden="true"
            >
              {icon}
            </span>
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
                <h3
                  style={{
                    color: 'var(--fx-accent)',
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: 600,
                    fontFamily: 'var(--fx-font)',
                    textAlign: 'center',
                    textTransform: 'none',
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
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
                      <span
                        style={{
                          color: 'var(--fx-accent)',
                          cursor: 'help',
                          fontSize: '0.875rem',
                        }}
                        aria-label="More information"
                      >
                        &#x2139;&#xFE0E;
                      </span>
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
                                padding: '16px',
                                backgroundColor: 'var(--fx-surface-raised)',
                                color: 'var(--fx-text-heading)',
                                borderRadius: 'var(--fx-radius-card)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                width: '90vw',
                                maxWidth: '400px',
                                zIndex: 50,
                                border: '2px solid var(--fx-accent)',
                                pointerEvents: 'none',
                              }}
                            >
                              <p
                                style={{
                                  color: 'var(--fx-text-heading)',
                                  fontSize: 'var(--fx-body-sm-size)',
                                  fontFamily: 'var(--fx-font)',
                                  lineHeight: 'var(--fx-body-leading)',
                                  margin: 0,
                                }}
                              >
                                {tooltip}
                              </p>
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
                                  borderBottom: '8px solid var(--fx-accent)',
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
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: 'var(--fx-body-sm-size)',
              fontFamily: 'var(--fx-font)',
              lineHeight: 'var(--fx-body-leading)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {description}
          </p>
        </>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {icon && (
              <span
                style={{
                  flexShrink: 0,
                  marginTop: hasTitle ? 0 : '0.125rem',
                  fontSize: '1.25rem',
                  color: 'var(--fx-text-faint)',
                  lineHeight: 1,
                }}
                role="img"
                aria-hidden="true"
              >
                {icon}
              </span>
            )}
            {hasTitle ? (
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    color: 'var(--fx-accent)',
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    fontWeight: 600,
                    fontFamily: 'var(--fx-font)',
                    marginTop: 0,
                    marginBottom: '0.5rem',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: 'var(--fx-text-muted)',
                    fontSize: 'var(--fx-body-size)',
                    fontFamily: 'var(--fx-font)',
                    lineHeight: 'var(--fx-body-leading)',
                    margin: 0,
                  }}
                >
                  {description}
                </p>
              </div>
            ) : (
              <p
                style={{
                  color: 'var(--fx-text-muted)',
                  fontSize: 'var(--fx-body-size)',
                  fontFamily: 'var(--fx-font)',
                  lineHeight: 'var(--fx-body-leading)',
                  flex: 1,
                  margin: 0,
                }}
              >
                {description}
              </p>
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
          <span
            style={{
              color: 'var(--fx-accent)',
              fontSize: 'var(--fx-cta-link-size)',
              fontFamily: 'var(--fx-font)',
              fontWeight: 700,
              letterSpacing: 'var(--fx-cta-link-tracking)',
              textTransform: 'uppercase',
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.2s ease',
            }}
          >
            Learn more
          </span>
          <span
            style={{
              color: 'var(--fx-accent)',
              fontSize: 'var(--fx-cta-link-size)',
              opacity: isHovered ? 1 : 0.7,
              transition: 'all 0.2s ease',
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              display: 'inline-block',
            }}
            aria-hidden="true"
          >
            &#x203A;
          </span>
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
        onKeyDown: (e: React.KeyboardEvent) => {
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
