'use client';

import { ThemeMode } from '../theme';
import { useAppTheme } from './useAppTheme';

interface ColorVisionFilter {
  filter: string;
}

export const useColorVisionFilter = (
  skipDarkModeFilter?: boolean
): ColorVisionFilter => {
  const { themeMode, theme } = useAppTheme();

  const getFilter = (mode: ThemeMode): string => {
    const darkModeBrightness =
      theme.themeMode === 'dark'
        ? 'brightness(90%)'
        : theme.themeMode === 'grayscale-dark'
          ? 'brightness(100%)'
          : 'brightness(105%)';
    const darkModeContrast =
      theme.themeMode === 'grayscale-dark'
        ? 'contrast(105%)'
        : 'contrast(100%)';

    switch (mode) {
      case 'grayscale':
      case 'grayscale-dark':
        // Enhanced grayscale with better contrast and brightness
        return `grayscale(100%) ${darkModeContrast} ${darkModeBrightness}`;
      case 'protanopia':
        // Red-colorblindness simulation:
        // Reds appear darker and shift towards brown/yellow tones
        // Reds and greens become more similar (yellowy-brown range)
        return `saturate(70%) contrast(90%) hue-rotate(-15deg) sepia(20%) ${darkModeBrightness}`;
      case 'deuteranopia':
        // Green-colorblindness simulation (most common):
        // Greens shift towards yellows and browns
        // Reds and greens become indistinguishable (both appear yellowish)
        // More aggressive desaturation to remove green perception
        return `saturate(40%) contrast(95%) hue-rotate(180deg) sepia(15%) ${darkModeBrightness}`;
      case 'tritanopia':
        // Blue-yellow colorblindness simulation:
        // Blues appear greenish, yellows appear pinkish
        // Blue-yellow axis is confused
        return `saturate(90%) contrast(100%) hue-rotate(90deg) sepia(5%) ${darkModeBrightness}`;
      default:
        // Skip dark mode filter if explicitly requested (e.g., for Fluxline dark logo)
        if (skipDarkModeFilter && theme.isInverted) {
          return 'none';
        }
        return theme.isInverted ? 'brightness(85%)' : 'none';
    }
  };

  return {
    filter: getFilter(themeMode),
  };
};
