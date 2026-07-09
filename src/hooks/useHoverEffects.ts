import { useCallback } from 'react';

/**
 * Custom hook for reusable hover effects
 * Provides consistent hover styling across components using DSM CSS custom properties
 */

export interface HoverEffectsConfig {
  type: 'card' | 'link' | 'button';
  hoverBgColor?: string;
  defaultBgColor?: string;
  hoverBorderColor?: string;
  defaultBorderColor?: string;
  hoverTextColor?: string;
  defaultTextColor?: string;
  enableTransform?: boolean;
  transformValue?: string;
}

interface HoverColors {
  hoverBg: string;
  defaultBg: string;
  hoverBorder: string;
  defaultBorder: string;
  hoverText: string;
  defaultText: string;
}

export const useHoverEffects = (config: HoverEffectsConfig) => {
  const {
    type,
    hoverBgColor,
    defaultBgColor,
    hoverBorderColor,
    defaultBorderColor,
    hoverTextColor,
    defaultTextColor,
    enableTransform = true,
    transformValue = 'translateY(-2px)',
  } = config;

  // Default configurations based on type, using DSM CSS custom properties
  let hoverColors: HoverColors;

  if (type === 'card') {
    hoverColors = {
      hoverBg: hoverBgColor || 'var(--fx-hover-fill)',
      defaultBg: defaultBgColor || 'var(--fx-surface-card)',
      hoverBorder: hoverBorderColor || 'var(--fx-accent)',
      defaultBorder: defaultBorderColor || 'var(--fx-border)',
      hoverText: hoverTextColor || 'var(--fx-text-heading)',
      defaultText: defaultTextColor || 'var(--fx-text-heading)',
    };
  } else if (type === 'link') {
    hoverColors = {
      hoverBg: hoverBgColor || 'var(--fx-surface-card)',
      defaultBg: defaultBgColor || 'transparent',
      hoverBorder: hoverBorderColor || 'transparent',
      defaultBorder: defaultBorderColor || 'transparent',
      hoverText: hoverTextColor || 'var(--fx-accent)',
      defaultText: defaultTextColor || 'var(--fx-accent)',
    };
  } else {
    // button type
    hoverColors = {
      hoverBg: hoverBgColor || 'var(--fx-accent)',
      defaultBg: defaultBgColor || 'var(--fx-surface-card)',
      hoverBorder: hoverBorderColor || 'var(--fx-accent)',
      defaultBorder: defaultBorderColor || 'var(--fx-border)',
      hoverText: hoverTextColor || 'var(--fx-accent-ink)',
      defaultText: defaultTextColor || 'var(--fx-accent)',
    };
  }

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget;
      target.style.backgroundColor = hoverColors.hoverBg;
      target.style.color = hoverColors.hoverText;
      if (hoverColors.hoverBorder && target.style.borderColor !== undefined) {
        target.style.borderColor = hoverColors.hoverBorder;
      }
      if (enableTransform) {
        target.style.transform = transformValue;
      }
    },
    [
      hoverColors.hoverBg,
      hoverColors.hoverBorder,
      hoverColors.hoverText,
      enableTransform,
      transformValue,
    ]
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = e.currentTarget;
      target.style.backgroundColor = hoverColors.defaultBg;
      target.style.color = hoverColors.defaultText;
      if (hoverColors.defaultBorder && target.style.borderColor !== undefined) {
        target.style.borderColor = hoverColors.defaultBorder;
      }
      if (enableTransform) {
        target.style.transform = 'translateY(0)';
      }
    },
    [
      hoverColors.defaultBg,
      hoverColors.defaultBorder,
      hoverColors.defaultText,
      enableTransform,
    ]
  );

  return { onMouseEnter, onMouseLeave };
};

export default useHoverEffects;
