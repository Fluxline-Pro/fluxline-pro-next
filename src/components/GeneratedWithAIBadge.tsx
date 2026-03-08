'use client';

import React, { useState } from 'react';
import { mergeStyles } from '@fluentui/react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { GeneratedWithAISvg } from '@/assets/svgs/GeneratedWithAISvg';

/**
 * GeneratedWithAIBadge Component
 * Displays a "Generated with AI" badge with a sparkle icon and tooltip.
 * Uses Fluent UI theme tokens and Tailwind utilities.
 */
export const GeneratedWithAIBadge: React.FC = () => {
  const { theme, themeMode } = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);

  const isDark =
    themeMode === 'dark' ||
    themeMode === 'grayscale-dark' ||
    themeMode === 'high-contrast';

  const badgeClass = mergeStyles({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: `${theme.spacing.s1} ${theme.spacing.xs}`,
    backgroundColor: isDark
      ? theme.palette.themeDarker
      : theme.palette.themeLighterAlt,
    border: `1px solid ${isDark ? theme.palette.themePrimary : theme.palette.themeLight}`,
    borderRadius: theme.effects.roundedCorner4,
    color: theme.palette.themePrimary,
    fontSize: '0.75rem',
    fontFamily: theme.fonts.small.fontFamily,
    fontWeight: 600,
    letterSpacing: '0.01em',
    cursor: 'default',
    userSelect: 'none',
    transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
    boxShadow: isHovered ? theme.effects.elevation4 : theme.effects.elevation0,
    opacity: isHovered ? 1 : 0.9,
    whiteSpace: 'nowrap',
  });

  const iconStyle: React.CSSProperties = {
    width: '14px',
    height: '14px',
    flexShrink: 0,
    color: theme.palette.themePrimary,
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: isDark
      ? theme.palette.neutralDark
      : theme.palette.neutralPrimary,
    color: isDark ? theme.palette.white : theme.palette.white,
    padding: '6px 10px',
    borderRadius: theme.effects.roundedCorner4,
    fontSize: '0.75rem',
    fontFamily: (theme.fonts.small.fontFamily as string) || 'inherit',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: 1000,
    opacity: isHovered ? 1 : 0,
    visibility: isHovered ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease',
    boxShadow: theme.effects.elevation8,
  };

  const tooltipArrowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: `5px solid ${isDark ? theme.palette.neutralDark : theme.palette.neutralPrimary}`,
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        className={badgeClass}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role='img'
        aria-label='This content was generated with AI assistance'
      >
        <GeneratedWithAISvg style={iconStyle} />
        <span>Generated with AI</span>
      </div>

      {/* Tooltip */}
      <div style={tooltipStyle} aria-hidden='true'>
        This content was created with AI assistance.
        <div style={tooltipArrowStyle} />
      </div>
    </div>
  );
};

export default GeneratedWithAIBadge;
