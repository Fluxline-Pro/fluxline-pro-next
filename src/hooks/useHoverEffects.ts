import { useCallback } from 'react';
import { useAppTheme } from '../theme/hooks/useAppTheme';

/**
 * Custom hook for reusable hover effects
 * Provides consistent hover styling across components
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
  const { theme } = useAppTheme();

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

  // Default configurations based on type
  let hoverColors: HoverColors;

  if (type === 'card') {
    hoverColors = {
      hoverBg: hoverBgColor || theme.palette.neutralLighter,
      defaultBg: defaultBgColor || theme.palette.neutralLighterAlt,
      hoverBorder: hoverBorderColor || theme.palette.themePrimary,
      defaultBorder: defaultBorderColor || theme.palette.neutralQuaternary,
      hoverText: hoverTextColor || theme.palette.neutralPrimary,
      defaultText: defaultTextColor || theme.palette.neutralPrimary,
    };
  } else if (type === 'link') {
    hoverColors = {
      hoverBg: hoverBgColor || theme.palette.neutralLighterAlt,
      defaultBg: defaultBgColor || 'transparent',
      hoverBorder: hoverBorderColor || 'transparent',
      defaultBorder: defaultBorderColor || 'transparent',
      hoverText: hoverTextColor || theme.palette.themePrimary,
      defaultText: defaultTextColor || theme.palette.themePrimary,
    };
  } else {
    // button type
    hoverColors = {
      hoverBg: hoverBgColor || theme.palette.themePrimary,
      defaultBg: defaultBgColor || theme.palette.themeSecondary,
      hoverBorder: hoverBorderColor || theme.palette.themePrimary,
      defaultBorder: defaultBorderColor || theme.palette.themeSecondary,
      hoverText: hoverTextColor || theme.palette.white,
      defaultText: defaultTextColor || theme.palette.themePrimary,
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
