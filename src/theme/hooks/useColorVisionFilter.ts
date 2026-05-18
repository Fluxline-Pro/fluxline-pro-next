'use client';

import { ThemeMode } from '../theme';
import { useAppTheme } from './useAppTheme';

interface ColorVisionFilter {
  filter: string;
}

/**
 * Supported explicit filter modes for standalone image filtering (e.g. demos).
 * These are independent of the global theme mode.
 */
export type ImageFilterMode =
  | 'normal'
  | 'protanopia'
  | 'tritanopia'
  | 'grayscale'
  | 'lowlight';

/**
 * Returns the raw CSS filter string for a given ImageFilterMode.
 * Use this in components that need on-demand filter switching (e.g. RedAppleFilterDemo).
 * This is a pure function — no hooks required.
 */
export function getImageFilterCss(mode: ImageFilterMode): string {
  switch (mode) {
    case 'protanopia':
      // Push reds much farther toward a dim ochre/brown profile for a clearer visual contrast
      return 'sepia(88%) hue-rotate(-42deg) saturate(32%) brightness(68%) contrast(108%)';
    case 'tritanopia':
      // Blue-yellow colorblindness: preserve reds more closely while pushing greens/blues toward a compressed teal-gray range
      return 'sepia(8%) hue-rotate(42deg) saturate(70%) brightness(104%) contrast(94%)';
    case 'grayscale':
      // Full desaturation
      return 'grayscale(100%) contrast(100%)';
    case 'lowlight':
      // Simulate poor/dim lighting conditions
      return 'brightness(28%) contrast(110%) saturate(70%)';
    case 'normal':
    default:
      return 'none';
  }
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
        return `sepia(88%) hue-rotate(-42deg) saturate(32%) brightness(68%) contrast(108%) ${darkModeBrightness}`;
      case 'deuteranopia':
        // Green-colorblindness simulation (most common):
        // Greens shift towards yellows and browns
        // Reds and greens become indistinguishable (both appear yellowish)
        // More aggressive desaturation to remove green perception
        return `saturate(40%) contrast(95%) hue-rotate(180deg) sepia(15%) ${darkModeBrightness}`;
      case 'tritanopia':
        // Blue-yellow colorblindness simulation:
        // Blues and greens compress together while yellows lose reliability
        // Reds remain present, but secondary colour cues become less trustworthy
        return `sepia(8%) hue-rotate(42deg) saturate(70%) brightness(104%) contrast(94%) ${darkModeBrightness}`;
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
