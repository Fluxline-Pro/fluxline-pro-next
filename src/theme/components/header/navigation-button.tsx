'use client';

/**
 * NavigationButton Component
 * Reusable button component for header navigation with consistent styling and hover effects
 */

import React from 'react';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

interface NavigationButtonProps {
  onClick: () => void;
  iconName: string;
  color: string;
  ariaLabel: string;
  tooltipText: string;
  hoverScale?: number;
  className?: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  iconName,
  color,
  ariaLabel,
  tooltipText,
  hoverScale = 1.15,
  className,
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = React.useState(false);
  const { themeMode, theme } = useAppTheme();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={onClick}
        className={className}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: isMobile ? '0.75rem' : '1rem',
          display: 'flex',
          alignItems: 'center',
          transform: 'scale(1)',
          transition: 'background-color 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = `scale(${hoverScale})`;
          setIsHovered(true);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          setIsHovered(false);
        }}
        aria-label={ariaLabel}
      >
        <FluentIcon iconName={iconName} size='medium' color={color} />
      </button>

      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          top: '80%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'transparent',
          color:
            themeMode === 'dark'
              ? theme.palette.neutralLighterAlt
              : theme.palette.black,
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
          pointerEvents: 'none',
          zIndex: 1000,
          paddingTop: '0',
        }}
      >
        {tooltipText}
        {/* Tooltip arrow
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            color:
              themeMode === 'dark'
                ? theme.palette.neutralLighterAlt
                : theme.palette.black,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: '4px solid rgba(0, 0, 0, 0.9)',
          }}
        /> */}
      </div>
    </div>
  );
};

export default NavigationButton;
