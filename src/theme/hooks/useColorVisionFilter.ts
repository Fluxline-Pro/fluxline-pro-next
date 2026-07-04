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
  | 'deuteranopia'
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
    case 'deuteranopia':
      // Green colorblindness (M-cones absent — most common form):
      // Reds and greens both collapse toward dull olive-yellow; blues are preserved.
      // Positive hue-rotate pushes reds toward olive-orange; lower contrast avoids crushing darks.
      return 'sepia(48%) hue-rotate(22deg) saturate(38%) brightness(105%) contrast(92%)';
    case 'tritanopia':
      // Blue-yellow colorblindness: S-cones (blue) are absent, so blues look greenish and yellows look pinkish.
      // Reds shift toward orange-salmon; overall palette loses the blue-cool dimension and reads warmer.
      return 'sepia(32%) saturate(52%) hue-rotate(-12deg) brightness(108%) contrast(90%)';
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
      case 'grayscale-light':
      case 'grayscale-dark':
        // Enhanced grayscale with better contrast and brightness
        return `grayscale(100%) ${darkModeContrast} ${darkModeBrightness}`;
      case 'colorblind':
        // Colorblind-friendly filter: reduces saturation and shifts hues
        // to improve distinguishability across common CVD types.
        return `sepia(48%) hue-rotate(22deg) saturate(38%) brightness(105%) contrast(92%) ${darkModeBrightness}`;
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
