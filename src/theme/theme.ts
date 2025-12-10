/**
 * FLUXLINE PRO THEME SYSTEM
 * ========================
 *
 * Philosophy: "Clarity meets transformation"
 * Style: "Minimalist precision with animated warmth"
 *
 * DESIGN PRINCIPLES:
 * ------------------
 * • Bold structure: Inter font family for headings provides clear hierarchy
 * • Unified voice: Inter for all text creates consistency and brand recognition
 * • Accent highlights: Roboto Mono for code emphasizes technical precision
 * • Engineered motion: cubic-bezier(0.4, 0, 0.2, 1) for fluid, intentional animations
 *
 * TEXT TRANSFORM PROGRESSION:
 * ---------------------------
 * H1-H2: UPPERCASE → Bold structure and commanding presence
 * H3-H4: Title Case → Balanced hierarchy and readability
 * H5: lowercase → Humble, approachable tone
 * H6: UPPERCASE → Accent highlights for growth cues
 *
 * COLOR PHILOSOPHY:
 * -----------------
 * • Dark Mode (Default): Deep black (#010101) base for focused, calm aesthetic
 * • Primary: Deep blues (#4A90E2, #2A5F8F) for structure and trust
 * • Secondary: Complementary blue variations for visual harmony
 * • Accent: Vibrant teal-green (#00D4AA, #00A896) for growth and interaction
 * • Neutrals: Carefully calibrated grays optimized for each mode
 *
 * RHYTHM & SPACING:
 * ------------------
 * • Base unit: 1rem for consistent rhythm
 * • Line height: 1.6 for optimal readability
 * • Generous spacing creates breathing room
 * • Modular elevation system for visual depth
 *
 * ACCESSIBILITY:
 * --------------
 * • High contrast ratios tested in both light and dark modes
 * • Color harmony: Tertiary & Accent hues positioned close on color wheel
 * • Multiple theme variants for visual accessibility needs
 * • Semantic color roles clearly defined for consistent usage
 *
 * USAGE:
 * ------
 * This theme system is designed to be modular and compatible with:
 * • Tailwind CSS utilities
 * • Styled Components
 * • FluentUI components
 * • CSS-in-JS solutions
 *
 * Default export prioritizes dark mode for the Fluxline Pro brand experience.
 *
 * @version 2.0.0 - Fluxline Pro Specifications
 * @author Fluxline Pro Design System
 */

import { createTheme, ITheme, ISpacing } from '@fluentui/react';

export interface IExtendedTheme extends ITheme {
  spacing: IExtendedSpacing;
  animations: typeof animations;
  borderRadius: typeof borderRadius;
  zIndices: typeof zIndices;
  shadows: typeof shadows;
  gradients: typeof baseGradients;
  breakpoints: typeof breakpoints;
  mediaQueries: typeof mediaQueries;
  typography: typeof typography;
  themeMode: ThemeMode;
}

export interface IExtendedSpacing extends ISpacing {
  none: string;
  xxs: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
  xxxxl: string;
  menuButton: string;
}

// Base font size for rem calculations (16px)
export const BASE_FONT_SIZE = 16;

// Breakpoints in pixels
export const breakpoints = {
  xs: 0, // mobile
  sm: 576, // small tablet
  md: 768, // tablet
  lg: 1024, // small desktop / iPad Pro
  xl: 1366, // large desktop
  xxl: 1920, // high-resolution desktop
};

// Media queries
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm - 1}px)`,
  sm: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
  md: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  lg: `(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
  xl: `(min-width: ${breakpoints.xl}px) and (max-width: ${breakpoints.xxl - 1}px)`,
  xxl: `(min-width: ${breakpoints.xxl}px)`,
};

/**
 * Fluxline Pro Spacing System - Generous Rhythm
 *
 * Base unit: 1rem for consistent rhythm throughout the design
 * Philosophy: Generous spacing creates breathing room and clarity
 */
export const spacing: IExtendedSpacing = {
  // Required ISpacing properties (FluentUI compatibility)
  s2: '0.125rem',
  s1: '0.25rem',
  m: '1rem', // Base rhythm unit
  l1: '1.25rem',
  l2: '2rem',

  // Fluxline Pro custom spacing system - 1rem base unit
  none: '0',
  xxs: '0.25rem',
  xs: '0.5rem',
  s: '0.75rem',
  l: '1.5rem',
  xl: '2rem',
  xxl: '2.5rem',
  xxxl: '3rem',
  xxxxl: '4rem',
  menuButton: '0.5rem 1rem 0 0',
};

// Z-index system
export const zIndices = {
  hide: -1,
  auto: 0,
  base: 1,
  above: 2,
  dropdown: 3,
  menu: 4,
  tooltip: 5,
  popover: 6,
  modal: 10,
  overlay: 11,
  toast: 16,
  max: 999,
};

// Border radius system
export const borderRadius = {
  none: '0',
  s: '0.25rem',
  m: '0.5rem',
  l: '1rem',
  xl: '2rem',

  container: {
    tiny: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    small: 'clamp(0.5rem, 1cqi, 0.5rem)',
    medium: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
    large: 'clamp(1rem, 2cqi, 1rem)',
    xlarge: 'clamp(1.5rem, 3cqi, 1.5rem)',
    xxlarge: 'clamp(2rem, 4cqi, 2rem)',
    huge: 'clamp(3rem, 6cqi, 3rem)',
    xhuge: 'clamp(4rem, 8cqi, 4rem)',

    // Use-case specific
    card: 'clamp(0.5rem, 1cqi, 0.5rem)',
    button: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    input: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    tooltip: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    tooltipArrow: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    hero: 'clamp(1.5rem, 3cqi, 1.5rem)',
    modal: 'clamp(2rem, 4cqi, 2rem)',
    toast: 'clamp(0.5rem, 1cqi, 0.5rem)',
    toastArrow: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    overlay: 'clamp(1rem, 2cqi, 1rem)',
    searchBox: 'clamp(0.5rem, 1cqi, 0.5rem)',
    searchBoxIcon: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
  },
};

// Shadows - Cast from bottom-right (light source top-left)
export const shadows = {
  none: 'none',
  s: '1px 1px 3px rgba(0, 0, 0, 0.12)',
  m: '2px 2px 6px rgba(0, 0, 0, 0.15)',
  l: '4px 4px 12px rgba(0, 0, 0, 0.18)',
  xl: '8px 8px 24px rgba(0, 0, 0, 0.24)',

  // Use-case specific
  card: '2px 2px 6px rgba(0, 0, 0, 0.12)',
  button: '2px 2px 4px rgba(0, 0, 0, 0.15)',
  input: '1px 1px 3px rgba(0, 0, 0, 0.18)',
  tooltip: '2px 2px 8px rgba(0, 0, 0, 0.24)',
  hero: '8px 8px 32px rgba(0, 0, 0, 0.32)',
  modal: '16px 16px 64px rgba(0, 0, 0, 0.4)',
  toast: '4px 4px 16px rgba(0, 0, 0, 0.32)',
  menu: '2px 2px 12px rgba(0, 0, 0, 0.15)',
  cardImage: '4px 4px 8px rgba(0, 0, 0, 0.7)',
  glyph: '0 0 12px rgba(245, 200, 92, 0.5)', // Mythic Gold glow (centered)
  resonance: '0 0 24px rgba(58, 186, 180, 0.4)', // Fluxline Teal pulse (centered)
};

/**
 * Fluxline Pro Gradients - Engineered Visual Depth
 *
 * Dark mode optimized with '#010101' base for focused aesthetic
 * Light mode with clean, minimal gradients for clarity
 */
export const baseGradients = {
  dark: {
    solid: '#010101',
    background:
      'radial-gradient(ellipse at left, #2E2E3A 0%, #1A1A1A 40%, #010101 100%)',
    menu: 'linear-gradient(135deg, #1A1A1A 0%, #010101 100%)',
    radial:
      'radial-gradient(ellipse at left, #2E2E3A 0%, #1A1A1A 40%, #010101 100%)',
    vignette: 'radial-gradient(circle at center, transparent 0%, #010101 100%)',
    linear: 'linear-gradient(90deg, #2E2E3A 0%, #010101 100%)',
  },
  light: {
    solid: '#FFFFFF',
    background:
      'radial-gradient(ellipse at left, #E8EAF0 0%, #E5E5E5 40%, #DADADA 100%)',
    menu: 'linear-gradient(135deg, #E8EAF0 0%, #F0F0F0 100%)',
    radial:
      'radial-gradient(ellipse at left, #E8EAF0 0%, #E5E5E5 40%, #DADADA 100%)',
    vignette: 'radial-gradient(circle at center, transparent 0%, #E5E5E5 100%)',
    linear: 'linear-gradient(90deg, #E8EAF0 0%, #F0F0F0 100%)',
  },
  components: {
    card: {
      dark: 'linear-gradient(135deg, #2E2E3A 0%, #010101 100%)',
      light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
    },
    button: {
      dark: 'linear-gradient(90deg, #4A9B96 0%, #2E2E3A 100%)',
      light: 'linear-gradient(90deg, #F5C85C 0%, #FFFFFF 100%)',
    },
    modal: {
      dark: 'radial-gradient(circle at center, #2E2E3A 0%, #010101 100%)',
      light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
    },
  },
  symbolic: {
    fluxlineAscension:
      'linear-gradient(135deg, #274770 0%, #5A7CA0 50%, #F5C85C 100%)',
    mythicHorizon:
      'linear-gradient(90deg, #F5C85C 0%, #EAD68F 50%, #274770 100%)',
    glyphGateFade: 'linear-gradient(to bottom, #F5C85C 0%, #1F1F1F 100%)',
  },
};

/**
 * Typography Configuration - Fluxline Pro Brand System
 *
 * Philosophy: Bold structure, humble tone, and accent highlights for growth
 * Text Transform Progression: uppercase → title-case → lowercase → accent
 *
 * Fonts:
 * - Inter: Clean, modern sans-serif for all text (bold structure and humble tone)
 * - Roboto Mono: Technical precision for code (accent highlights)
 */

export const fontFamily = {
  text: '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  mono: '"Courier Prime", "Roboto Mono", "SF Mono", "Monaco", "Cascadia Code", Consolas, "Courier New", monospace',
};

export const fontSizes = {
  xs: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
  sm: 'clamp(0.5rem, 1cqi, 0.5rem)',
  md: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
  base: '1rem', // Base rhythm unit
  lg: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
  xl: 'clamp(1.5rem, 3cqi, 1.5rem)',
  xxl: 'clamp(2rem, 4cqi, 2rem)',
  xxxl: 'clamp(3rem, 6cqi, 3rem)',
  xxxxl: 'clamp(4rem, 8cqi, 4rem)',
  clamp: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
  clamp2: 'clamp(0.5rem, 1cqi, 0.5rem)',
  clamp3: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
  clamp4: '1rem', // Base unit
  clamp5: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
  clamp6: 'clamp(1.5rem, 3cqi, 1.5rem)',
  clamp7: 'clamp(2rem, 4cqi, 2rem)',
  clamp8: 'clamp(3rem, 6cqi, 3rem)',
};

export const typography = {
  fontFamilies: {
    // Fluxline Pro font stack - Inter for all text, Courier Prime for code
    base: fontFamily.text,
    mono: fontFamily.mono,
    heading: fontFamily.text,
    headingH3: fontFamily.text,
    headingLight: fontFamily.text,
    h1: fontFamily.text,
    h2: fontFamily.text,
    h3: fontFamily.text,
    h4: fontFamily.text,
    h5: fontFamily.text,
    h6: fontFamily.text,
    p: fontFamily.text,
  },
  // Font sizes with modular scale - base 1rem unit for rhythm
  fontSizes: {
    xs: fontSizes.xs,
    sm: fontSizes.sm,
    md: fontSizes.md,
    base: fontSizes.base, // Base rhythm unit
    lg: fontSizes.lg,
    xl: fontSizes.xl,
    xxl: fontSizes.xxl,
    xxxl: fontSizes.xxxl,
    xxxxl: fontSizes.xxxxl,
    clamp: fontSizes.clamp,
    clamp2: fontSizes.clamp2,
    clamp3: fontSizes.clamp3,
    clamp4: fontSizes.clamp4,
    clamp5: fontSizes.clamp5,
    clamp6: fontSizes.clamp6,
    clamp7: fontSizes.clamp7,
    clamp8: fontSizes.clamp8,
  },
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  fontWidths: {
    ultraCondensed: 25,
    extraCondensed: 50,
    condensed: 75,
    semiCondensed: 87.5,
    normal: 100,
    semiExpanded: 112.5,
    expanded: 125,
  },
  fontSlants: {
    normal: 0,
    italic: -10,
  },
  fontFeatures: {
    thin: { fontFeatureSettings: 'wght 200,wdth 100,slnt 0' },
    condensed: { fontFeatureSettings: 'wght 500,wdth 100,slnt 0' },
    expanded: { fontFeatureSettings: 'wght 500,wdth 125,slnt 0' },
    italic: { fontFeatureSettings: 'wght 500,wdth 100,slnt 10' },
  },
  // Font definitions with Fluxline Pro philosophy
  fonts: {
    tiny: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
      fontWeight: '500' as const, // Inter Medium
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      lineHeight: '1.6',
    },
    xSmall: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.75rem, 1cqi, 0.875rem)', // Mobile-first: 12px -> 14px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.5',
    },
    small: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.25cqi, 1rem)', // Mobile-first: 14px -> 16px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.6',
    },
    medium: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem', // Standard base: 16px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.6',
    },
    mediumPlus: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.125rem, 2cqi, 1.375rem)', // Mobile-first: 18px -> 22px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.6',
    },
    large: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5cqi, 1.75rem)', // Mobile-first: 20px -> 28px
      fontWeight: '700' as const, // Inter Bold
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.5',
    },
    xLarge: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.5rem, 3.5cqi, 2.25rem)', // Mobile-first: 24px -> 36px
      fontWeight: '700' as const,
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.4',
    },
    xxLarge: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(2rem, 5cqi, 3.5rem)', // Mobile-first: 32px -> 56px
      fontWeight: '700' as const,
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.3',
    },

    // Headings
    h1: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(2.5rem, 8cqi, 6rem)', // Mobile-first: 40px -> container query -> 96px max
      fontWeight: '800' as const,
      fontVariationSettings: '"wght" 800, "wdth" 200, "slnt" 0',
      letterSpacing: '0.02em', // Slightly tighter for large text
      textShadow: 'var(--text-shadow-textBig)',
      textTransform: 'capitalize' as const,
      lineHeight: '1.1', // Tighter for display headings
    },
    h2: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(2rem, 5cqi, 3.5rem)', // Mobile-first: 32px -> 56px
      fontWeight: '800' as const,
      fontVariationSettings: '"wght" 800, "wdth" 200, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'capitalize' as const,
      lineHeight: '2',
    },
    h3: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.5rem, 3.5cqi, 2.25rem)', // Mobile-first: 24px -> 36px
      fontWeight: '700' as const,
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'capitalize' as const,
      lineHeight: '1.3',
    },
    h4: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5cqi, 1.75rem)', // Mobile-first: 20px -> 28px
      fontWeight: '700' as const,
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'var(--text-shadow-h4)',
      textTransform: 'capitalize' as const,
      lineHeight: '1.4',
    },
    h5: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.125rem, 2cqi, 1.5rem)', // Mobile-first: 18px -> 24px
      fontWeight: '700' as const,
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'var(--text-shadow-h5)',
      textTransform: 'capitalize' as const,
      lineHeight: '1.4',
    },
    h6: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.5cqi, 1.1rem)', // Mobile-first: 16px -> 20px
      fontWeight: '700' as const,
      fontVariationSettings: '"wght" 700, "wdth" 400, "slnt" 0',
      letterSpacing: '0.2px', // Wider for uppercase
      textShadow: 'none',
      textTransform: 'uppercase' as const,
      lineHeight: '1.5',
    },

    // Body and utility text
    body: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1rem, 1.5cqi, 1.125rem)', // Mobile-first: 16px -> 18px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.6',
    },
    bodySmall: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.25cqi, 1rem)', // Mobile-first: 14px -> 16px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.6',
    },
    homeH3: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.75rem, 4.5cqi, 3rem)', // Mobile-first: 28px -> 48px
      fontWeight: '500' as const, // Inter Medium
      fontVariationSettings: '"wght" 500, "wdth" 125, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.4',
    },
    paragraph: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1rem, 1.5cqi, 1.125rem)', // Match body sizing
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.6',
    },

    label: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.25cqi, 1rem)', // Mobile-first: 14px -> 16px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.5',
    },
    quote: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.125rem, 2cqi, 1.5rem)', // Mobile-first: 18px -> 24px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.7', // More generous for quotes
    },
    pre: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(0.875rem, 1.25cqi, 1rem)', // Mobile-first: 14px -> 16px
      fontWeight: 'normal' as const,
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.7', // More generous for code readability
    },
    code: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(0.875rem, 1.25cqi, 1rem)', // Mobile-first: 14px -> 16px
      fontWeight: 'normal' as const,
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.7',
    },
    caption: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.75rem, 1cqi, 0.875rem)', // Mobile-first: 12px -> 14px
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.01em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.5',
    },
    mono: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(0.875rem, 1.25cqi, 1rem)', // Mobile-first: 14px -> 16px
      fontWeight: 'normal' as const,
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.7',
    },
    ritual: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(1rem, 2cqi, 1.25rem)', // Mobile-first: 16px -> 20px
      fontWeight: 'normal' as const,
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.02em',
      textShadow: 'none',
      textTransform: 'none' as const,
      lineHeight: '1.7',
    },
    glyphTag: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.5cqi, 1rem)',
      fontWeight: '700' as const,
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as const,
      lineHeight: '1.1',
    },
    emotionalCue: {
      fontFamily:
        '"inter-variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 2cqi, 1rem)',
      fontWeight: '500' as const,
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.25px',
      textTransform: 'capitalize' as const,
      lineHeight: '1.6',
    },
  },
  // Line heights for readable flow - 1.6 base
  lineHeights: {
    tight: 1.2,
    normal: 1.6, // Base readable flow
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0.1px',
    wide: '0.025em',
    wider: '2px',
    widest: '0.375rem',
  },
  textShadows: {
    h1: '2px 4px 4px rgba(0, 0, 0, 0.5)',
    h2: '1px 2px 3px rgba(0, 0, 0, 0.5)',
    h3: '1px 2px 2px rgba(0, 0, 0, 0.4)',
    h4: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    h5: '1px 1px 1px rgba(0, 0, 0, 0.2)',
    h6: '0px 1px 1px rgba(0, 0, 0, 0.1)',
    light: '0px 3px 6px rgba(0, 0, 0, 0.5)',
    dark: '0px 3px 6px rgba(243, 243, 243, 0.5)',
    textLight: '1px 2px 3px rgba(0, 0, 0, 0.5)',
    text: '1px 2px 3px rgba(0, 0, 0, 0.9)',
    textBig: '2px 4px 4px rgba(0, 0, 0, 0.5)',
    card: '0px 3px 3px 0px rgba(0, 0, 0, 0.5)',
    cardImage: '2px 2px rgba(0, 0, 0, 0.9)',
  },
};

export const getFontVariationSettings = (
  weight: number = 400,
  width: number = 125,
  slant: number = 0
) => {
  return {
    fontVariationSettings: `'wght' ${weight}, 'wdth' ${width}, 'slnt' ${slant}`,
  };
};

// Font widths
export const fontWidths = {
  ultraCondensed: 25,
  extraCondensed: 50,
  condensed: 75,
  semiCondensed: 87.5,
  normal: 100,
  semiExpanded: 112.5,
  expanded: 125,
};

/**
 * Animation System - Fluxline Pro Motion Philosophy
 *
 * Engineered fluidity with calm, focused aesthetic
 * Primary motion curve: cubic-bezier(0.4, 0, 0.2, 1) for engineered warmth
 */
export const animations = {
  // Easing functions - Fluxline Pro motion curve as primary
  easing: {
    linear: 'linear',
    easeInOut: 'ease',
    easeOut: 'ease-in',
    easeIn: 'ease-out',
    sharp: 'ease-in-out',

    // Fluxline Pro primary motion curve - engineered fluidity
    primary: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)', // Use Fluxline curve as smooth
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Durations
  durations: {
    instant: '0ms',
    faster: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '700ms',
  },

  // Timing functions - Fluxline Pro engineered motion
  timingFunctions: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Primary Fluxline curve
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    primary: 'cubic-bezier(0.4, 0, 0.2, 1)', // Fluxline primary
  },

  // Common animations with Fluxline motion curve
  transitions: {
    fade: {
      enter: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    slide: {
      enter: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    scale: {
      enter: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    rotate: {
      enter: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // custom component transitions with Fluxline curve
    button: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    card: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    modal: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
    toast: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    tooltip: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Keyframe animations
  keyframes: {
    spin: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }',
    pulse:
      '@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }',
    bounce:
      '@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }',
    fadeIn: '@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }',
    fadeOut: '@keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }',
    slideUp:
      '@keyframes slideUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }',
    slideDown:
      '@keyframes slideDown { 0% { transform: translateY(0); } 100% { transform: translateY(100%); } }',
    slideLeft:
      '@keyframes slideLeft { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }',
    slideRight:
      '@keyframes slideRight { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }',
    slideIn:
      '@keyframes slideIn { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }',
    slideOut:
      '@keyframes slideOut { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }',
    slideInUp:
      '@keyframes slideInUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }',
  },
};

// Helper function to use spacing in styles
export const useSpacing = (size: keyof typeof spacing) => spacing[size];

// Utility function for responsive values
export const responsiveValue = (
  theme: IExtendedTheme,
  values: {
    xs?: keyof typeof spacing;
    sm?: keyof typeof spacing;
    md?: keyof typeof spacing;
    lg?: keyof typeof spacing;
    xl?: keyof typeof spacing;
    xxl?: keyof typeof spacing;
  }
) => {
  const styles: Record<string, string> = {};

  if (values.xs) styles.xs = theme.spacing[values.xs];
  if (values.sm) styles.sm = theme.spacing[values.sm];
  if (values.md) styles.md = theme.spacing[values.md];
  if (values.lg) styles.lg = theme.spacing[values.lg];
  if (values.xl) styles.xl = theme.spacing[values.xl];
  if (values.xxl) styles.xxl = theme.spacing[values.xxl];

  return styles;
};

// Helper function to create typography styles with variants
export const getTypographyStyle = (
  scale: keyof typeof typography.fonts,
  variant: keyof typeof typography.fonts,
  options?: {
    features?: Array<keyof typeof typography.fontFeatures>;
    width?: keyof typeof typography.fontWidths;
    weight?: keyof typeof typography.fontWeights;
    responsive?: ResponsiveTypographyProps;
  }
) => {
  const baseStyle = typography.fonts[scale];
  const selectedFeatures =
    options?.features
      ?.map((feature) => typography.fontFeatures[feature].fontFeatureSettings)
      .join(', ') || '';

  return {
    ...baseStyle,
    ...(options?.width && {
      fontStretch: typography.fontWidths[options.width],
      fontVariationSettings: getFontVariationSettings(
        typography.fontWeights[options.weight ?? 'regular'],
        typography.fontWidths[options.width ?? 'normal'],
        0
      ),
    }),
    ...(options?.weight && {
      fontWeight: typography.fontWeights[options.weight],
    }),
    ...(selectedFeatures && { fontFeatureSettings: selectedFeatures }),
    ...(options?.responsive && getResponsiveTypography(options.responsive)),
  };
};

// Helper function to merge FluentUI theme with our extended properties
const createExtendedTheme = (
  fluentTheme: ReturnType<typeof createTheme>,
  extendedProps: Omit<IExtendedTheme, keyof ReturnType<typeof createTheme>>
): IExtendedTheme => {
  return {
    ...fluentTheme,
    ...extendedProps,
    spacing: spacing as IExtendedSpacing,
  };
};

// Base Theme with shared properties
const baseExtendedProps = {
  spacing: spacing as IExtendedSpacing,
  zIndices,
  shadows,
  gradients: baseGradients,
  borderRadius: borderRadius,
  breakpoints,
  mediaQueries,
  typography,
  animations,
  getTypographyStyle,
  responsiveValue,
} as const;

/**
 * Fluxline Pro Light Theme
 *
 * Philosophy: Mythic clarity meets emotional resonance
 * Style: Clean precision with luminous breath
 *
 * Color Roles:
 * - Primary: Slate blue for structure, sovereignty, and trust
 * - Secondary: Fluxline teal for flow, balance, and intuitive clarity
 * - Accent: Mythic gold for illumination, growth, and curriculum ignition
 * - Neutral: Calibrated grays for hierarchy, silence, and sacred whitespace
 */
export const lightTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      // Fluxline Pro Light Primary Palette – Mythic clarity
      themePrimary: '#274770', // Deep slate blue – anchors brand
      themeSecondary: '#2E7A75', // Darker Fluxline teal – flow and clarity (darker shade for light mode)
      themeTertiary: '#7B9BB8', // UI layering
      themeLight: '#F8FAFC', // Clean and airy
      themeDark: '#2E2E3A', // Resonance Core – grounding
      themeDarker: '#1F1F1F', // Deep charcoal
      themeLighter: '#FFFFFF', // Ritual White
      themeLighterAlt: '#F5F5F5', // Breath whitespace

      // Neutral Palette – Optimized for light mode readability
      neutralPrimary: '#2E2E2E', // Primary text
      neutralSecondary: '#4A4A4A', // Secondary text
      neutralTertiary: '#707070', // Tertiary text
      neutralTertiaryAlt: '#8F8F8F',
      neutralQuaternary: '#E0E0E0',
      neutralQuaternaryAlt: '#F0F0F0',
      neutralLighter: '#F8F8F8',
      neutralLighterAlt: '#FAFAFA',
      neutralDark: '#000000',
      neutralLight: '#FFFFFF',

      // Fluxline Accent – Emotional resonance
      accent: '#4A9B96', // Fluxline Teal – flow, clarity
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      // Body and Background – Clean light aesthetic
      bodyText: '#2E2E2E',
      bodyBackground:
        'radial-gradient(ellipse at left, #F8FAFC 0%, #F5F5F5 40%, #F0F0F0 100%)',

      // State Colors – Emotional clarity
      errorText: '#B0303C', // Refined red
      errorBackground: '#FFEBEE',
      successText: '#107C10', // Microsoft green
      successBackground: '#E0F2F1',
      messageText: '#B8860B', // Mythic Gold – illumination
      warningText: '#B8860B', // Deep gold
      warningBackground: '#FFF8E1',

      // Interactive Elements
      link: '#274770', // Primary blue
      linkHovered: '#1F1F1F', // Resonance Core
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'light' as ThemeMode,
  }
);

/**
 * Fluxline Pro Dark Theme – Default Mode
 *
 * Philosophy: Mythic clarity meets emotional depth
 * Style: Minimalist precision with symbolic warmth
 * Background: Deep black (#010101) for focused transmission
 *
 * Color Roles:
 * - Primary: Slate blue for structure, sovereignty, and trust
 * - Secondary: Fluxline teal for flow, balance, and intuitive clarity
 * - Accent: Mythic gold for illumination, growth, and curriculum ignition
 * - Neutral: Calibrated grays for hierarchy, silence, and sacred contrast
 */
export const darkTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      // Fluxline Pro Dark Primary Palette – Resonance Core
      themePrimary: '#AFCAFC', // Slate blue – sovereign structure
      themeSecondary: '#5FC4BE', // Brighter Fluxline teal – intuitive clarity (more vibrant)
      themeTertiary: '#5A7CA0', // UI layering
      themeLight: '#F8FAFC', // Light overlay for contrast
      themeDark: '#1F1F1F', // Resonance Core
      themeDarker: '#010101', // Deep black base
      themeLighter: '#2E2E3A', // Soft slate
      themeLighterAlt: '#3A3A4A', // UI hover zones

      // Neutral Palette – Optimized for dark mode vibrancy
      neutralPrimary: '#FFFFFF',
      neutralSecondary: '#E1E1E1',
      neutralTertiary: '#B8B8B8',
      neutralTertiaryAlt: '#8F8F8F',
      neutralQuaternary: '#404040',
      neutralQuaternaryAlt: '#2E2E2E',
      neutralLighter: '#3A3A4A',
      neutralLighterAlt: '#2E2E3A',
      neutralDark: '#1A1A1A',
      neutralLight: '#262626',

      // Fluxline Accent – Emotional resonance
      accent: '#F5C85C', // Mythic gold – illumination and growth
      black: '#010101',
      white: '#FFFFFF',
    },
    semanticColors: {
      // Body and Background – Fluxline Pro dark aesthetic
      bodyText: '#FFFFFF',
      bodyBackground:
        'radial-gradient(ellipse at left, #2E2E3A 0%, #1A1A1A 40%, #010101 100%)',

      // State Colors – Emotional clarity
      errorText: '#B0303C', // Somatic rose – soft red
      errorBackground: '#2D1617',
      successText: '#4A9B96', // Fluxline teal
      successBackground: '#1A2D2A',
      successIcon: '#4A9B96',
      messageText: '#F5C85C', // Mythic gold
      warningText: '#F5C85C',
      warningBackground: '#2D2A17',

      // Interactive Elements
      link: '#274770',
      linkHovered: '#5A7CA0',
    },
    isInverted: true,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'dark' as ThemeMode,
  }
);

// High Contrast Theme
/**
 * Fluxline Pro High Contrast Theme
 *
 * Philosophy: Maximum legibility with zero ambiguity
 * Style: Stark contrast with simplified structure
 * Background: Deep charcoal (#121212) for focused clarity
 *
 * Color Roles:
 * - Primary: Bright blue for interaction and visibility
 * - Secondary: Pure white and light gray for contrast
 * - Accent: High-contrast blue for emphasis and links
 * - Neutral: Simplified grayscale for hierarchy and accessibility
 */
export const highContrastTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#3399FF',
      themeSecondary: '#FFFFFF',
      themeTertiary: '#999999',
      themeLight: '#FFFFFF',
      themeDark: '#000000',
      themeDarker: '#000000',
      themeLighter: '#FFFFFF',
      themeLighterAlt: '#FFFFFF',
      neutralPrimary: '#FFFFFF',
      neutralSecondary: '#CCCCCC',
      neutralTertiary: '#999999',
      neutralTertiaryAlt: '#666666',
      neutralQuaternary: '#444444',
      neutralQuaternaryAlt: '#333333',
      neutralDark: '#000000',
      neutralLight: '#222222',
      neutralLighter: '#1A1A1A',
      neutralLighterAlt: '#121212',
      accent: '#3399FF',
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#FFFFFF',
      bodyBackground: '#000000',
      errorText: '#FF0000',
      errorBackground: '#330000',
      successText: '#00FF00',
      successBackground: '#003300',
      successIcon: '#00FF00',
      messageText: '#FFFF00',
      warningText: '#FFFF00',
      warningBackground: '#333300',
      link: '#3399FF',
      linkHovered: '#66B3FF',
    },
    isInverted: true,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'high-contrast' as ThemeMode,
    gradients: {
      // Pure black backgrounds for maximum contrast
      dark: {
        solid: '#000000',
        background: '#000000',
        menu: '#000000',
        radial: '#000000',
        vignette: '#000000',
        linear: '#000000',
      },
      light: {
        solid: '#000000',
        background: '#000000',
        menu: '#000000',
        radial: '#000000',
        vignette: '#000000',
        linear: '#000000',
      },
      symbolic: {
        fluxlineAscension: '#000000',
        glyphGateFade: '#000000',
        mythicHorizon: '#000000',
      },
      components: {
        card: {
          dark: '#000000',
          light: '#000000',
        },
        button: {
          dark: '#000000',
          light: '#000000',
        },
        modal: {
          dark: '#000000',
          light: '#000000',
        },
      },
    },
  }
);

/**
 * Fluxline Pro Protanopia Theme
 *
 * Philosophy: Inclusive clarity for red-blind vision
 * Style: Cool tones with teal and blue emphasis
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: Teal and green for success and balance
 * - Accent: Soft blue for interaction and emphasis
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Protanopia Theme
export const protanopiaTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#0078D4',
      themeSecondary: '#2B88D8',
      themeTertiary: '#71AFE5',
      themeLight: '#C7E0F4',
      themeDark: '#005A9E',
      themeDarker: '#004578',
      themeLighter: '#DEECF9',
      themeLighterAlt: '#EFF6FC',
      neutralPrimary: '#333333',
      neutralSecondary: '#666666',
      neutralTertiary: '#a6a6a6',
      neutralTertiaryAlt: '#c8c8c8',
      neutralQuaternary: '#0E8C77', // Dark teal for error states
      neutralQuaternaryAlt: '#1B5E20', // Dark green for success states
      neutralLighter: '#EFF6FC',
      neutralLighterAlt: '#F8FBFE',
      neutralDark: '#004578',
      neutralLight: '#f3f2f1',
      accent: '#A5C0E1',
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#333333',
      bodyBackground:
        'radial-gradient(ellipse at left, #F8FAFC 0%, #F5F5F5 40%, #F0F0F0 100%)',
      errorText: '#0C8ECB', // Dark teal for error states
      errorBackground: '#C0D5DF', // Light teal background
      errorIcon: '#0C8ECB', // Dark teal for error states
      successText: '#1B5E20', // Dark green for success states
      successBackground: '#E8F5E9', // Light green background
      messageText: '#C05621', // Soft orange for warnings
      warningText: '#C05621', // Soft orange for warnings
      warningBackground: '#FFF4CE',
      link: '#0078D4',
      linkHovered: '#004578',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #0078D4 0%, #005A9E 50%, #FFB900 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #FFB900 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #FFB900 0%, #0078D4 50%, #005A9E 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #0078D4 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #FFB900 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'protanopia' as ThemeMode,
  }
);

/**
 * Fluxline Pro Deuteranopia Theme
 *
 * Philosophy: Inclusive clarity for green-blind vision
 * Style: Muted blues and yellows for emotional accessibility
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: Muted yellow for emphasis and alerts
 * - Accent: Soft blue for interaction and success
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Deuteranopia Theme
export const deuteranopiaTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#0063B1',
      themeSecondary: '#4894FE',
      themeTertiary: '#FFB900',
      themeLight: '#C7E0F4',
      themeDark: '#004578',
      themeDarker: '#002850',
      themeLighter: '#DEECF9',
      themeLighterAlt: '#EFF6FC',
      neutralPrimary: '#333333',
      neutralSecondary: '#666666',
      neutralTertiary: '#a6a6a6',
      neutralTertiaryAlt: '#c8c8c8',
      neutralQuaternary: '#E6B800', // Muted yellow
      neutralQuaternaryAlt: '#4894FE',
      neutralLighter: '#EFF6FC',
      neutralLighterAlt: '#F8FBFE',
      neutralDark: '#004578',
      neutralLight: '#f3f2f1',
      accent: '#4894FE',
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#333333',
      bodyBackground:
        'radial-gradient(ellipse at left, #F8FAFC 0%, #F5F5F5 40%, #F0F0F0 100%)',
      errorText: '#B21623', // darker error text for visibility
      errorBackground: '#CEA9A9', // darker error background
      successText: '#3874C7', // soft, darker blue for success
      successBackground: '#EFF6FC',
      messageText: '#C05621', // Darker orange for warnings
      warningText: '#C05621', // Darker orange for warnings
      warningBackground: '#F3B89A',
      link: '#0063B1',
      linkHovered: '#004578',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #0063B1 0%, #4894FE 50%, #E6B800 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #E6B800 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #E6B800 0%, #0063B1 50%, #4894FE 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #0063B1 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #E6B800 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'deuteranopia' as ThemeMode,
  }
);

/**
 * Fluxline Pro Tritanopia Theme
 *
 * Philosophy: Inclusive clarity for blue-blind vision
 * Style: Warm tones with orange and green emphasis
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Warm red for structure and alerts
 * - Secondary: Orange for emphasis and interaction
 * - Accent: Green for success and balance
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Tritanopia Theme
export const tritanopiaTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#D13438',
      themeSecondary: '#FF8C00',
      themeTertiary: '#107C10',
      themeLight: '#E8A3A3',
      themeDark: '#A4262C',
      themeDarker: '#761721',
      themeLighter: '#FDE7E7',
      themeLighterAlt: '#FEF4F4',
      neutralPrimary: '#333333',
      neutralSecondary: '#666666',
      neutralTertiary: '#a6a6a6',
      neutralTertiaryAlt: '#c8c8c8',
      neutralQuaternary: '#FF8C00', // Orange for error states
      neutralQuaternaryAlt: '#107C10', // Green for success states
      neutralLighter: '#FDE7E7',
      neutralLighterAlt: '#FEF4F4',
      neutralDark: '#A4262C',
      neutralLight: '#f3f2f1',
      accent: '#107C10',
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#333333',
      bodyBackground:
        'radial-gradient(ellipse at left, #F8FAFC 0%, #F5F5F5 40%, #F0F0F0 100%)',
      errorText: '#FF8C00', // Orange for error states
      errorBackground: '#FFF3E0', // Light orange background
      successText: '#107C10', // Green for success states
      successBackground: '#E8F5E9', // Light green background
      messageText: '#FF8C00',
      warningText: '#FF8C00',
      warningBackground: '#FFF4CE',
      link: '#D13438',
      linkHovered: '#A4262C',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #D13438 0%, #FF8C00 50%, #107C10 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #FF8C00 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #FF8C00 0%, #D13438 50%, #107C10 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #D13438 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #FF8C00 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'tritanopia' as ThemeMode,
  }
);

// Grayscale Light Theme
export const grayscaleTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#404040', // Primary interactive elements
      themeSecondary: '#666666', // Secondary interactive elements
      themeTertiary: '#808080', // Tertiary elements
      themeLight: '#E0E0E0', // Light backgrounds
      themeDark: '#333333', // Dark text and borders
      themeDarker: '#1A1A1A', // Darkest elements
      themeLighter: '#F0F0F0', // Lighter backgrounds
      themeLighterAlt: '#F8F8F8', // Lightest backgrounds
      neutralPrimary: '#000000', // Primary text
      neutralSecondary: '#666666', // Secondary text
      neutralTertiary: '#A6A6A6', // Disabled text
      neutralTertiaryAlt: '#C8C8C8', // Borders
      neutralQuaternary: '#D9D9D9', // Light borders
      neutralQuaternaryAlt: '#E6E6E6', // Light backgrounds
      neutralLighter: '#F8F8F8', // Lighter backgrounds
      neutralLighterAlt: '#FAFAFA', // Lightest backgrounds
      neutralDark: '#1A1A1A', // Dark text
      neutralLight: '#FFFFFF', // Light text
      accent: '#666666', // Accent elements
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#000000',
      bodyBackground:
        'radial-gradient(ellipse at left, #F8FAFC 0%, #F5F5F5 40%, #F0F0F0 100%)',
      errorText: '#888888', // Dark red in grayscale
      errorBackground: '#999999',
      successText: '#1A1A1A', // Dark gray for success
      successBackground: '#E6E6E6',
      messageText: '#4D4D4D', // Mid gray for messages
      warningText: '#4D4D4D',
      warningBackground: '#F2F2F2',
      link: '#404040',
      linkHovered: '#1A1A1A',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #404040 0%, #666666 50%, #808080 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #666666 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #666666 0%, #404040 50%, #808080 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #404040 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #666666 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'grayscale' as ThemeMode,
  }
);

/**
 * Fluxline Pro Protanopia Theme
 *
 * Philosophy: Inclusive clarity for red-blind vision
 * Style: Cool tones with teal and blue emphasis
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: 
 Teal and green for success and balance
 * - Accent: Soft blue for interaction and emphasis
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Grayscale Dark Theme
export const grayscaleDarkTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#bfbfbf', // Lighter gray for primary interactive elements
      themeSecondary: '#a6a6a6', // Lighter gray for secondary
      themeTertiary: '#808080', // Mid gray for tertiary
      themeLight: '#1a1a1a', // Dark backgrounds
      themeDark: '#e0e0e0', // Light text and borders
      themeDarker: '#f0f0f0', // Lightest elements
      themeLighter: '#333333', // Darker backgrounds
      themeLighterAlt: '#000000', // Black
      neutralPrimary: '#ffffff', // Primary text (white)
      neutralSecondary: '#bfbfbf', // Secondary text (light gray)
      neutralTertiary: '#666666', // Disabled text (mid gray)
      neutralTertiaryAlt: '#404040', // Borders (darker gray)
      neutralQuaternary: '#262626', // Very dark borders
      neutralQuaternaryAlt: '#1a1a1a', // Very dark backgrounds
      neutralLighter: '#333333', // Lighter dark backgrounds
      neutralLighterAlt: '#000000', // Lightest dark backgrounds
      neutralDark: '#010101', // Dark text
      neutralLight: '#000000', // Black
      accent: '#666666', // Accent elements (light gray)
      black: '#000000', // White
      white: '#ffffff', // Black
    },
    semanticColors: {
      bodyText: '#ffffff',
      bodyBackground: '#1F1F1F',
      errorText: '#bbbbbb', // Light gray for error
      errorBackground: '#222222',
      successText: '#f0f0f0', // Light gray for success
      successBackground: '#262626',
      messageText: '#bfbfbf', // Light gray for messages
      warningText: '#bfbfbf',
      warningBackground: '#222222',
      link: '#bfbfbf',
      linkHovered: '#f0f0f0',
    },
    isInverted: true,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'grayscale-dark' as ThemeMode,
    gradients: {
      light: {
        solid: '#1F1F1F',
        background: '#1F1F1F',
        menu: '#1F1F1F',
        radial: '#1F1F1F',
        vignette: '#1F1F1F',
        linear: '#1F1F1F',
      },
      dark: {
        solid: '#1F1F1F',
        background:
          '#1F1F1F radial-gradient(circle at 20% 50%, #2A2A2A 0%, #2E2E2E 30%, #1C1C1C 70%, #171717 100%)',
        menu: '#1F1F1F radial-gradient(circle at 80% 50%, #252525 0%, #2A2A2A 30%, #242424 70%, #1A1A1A 100%)',
        radial:
          '#1F1F1F radial-gradient(circle at center, #2A2A2A 0%, #242424 30%, #1F1F1F 70%, #1A1A1A 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #1A1A1A 100%)',
        linear:
          'linear-gradient(90deg, #1F1F1F 0%, #242424 50%, #1F1F1F 100%) no-repeat center',
      },
      symbolic: {
        fluxlineAscension: '#1F1F1F',
        glyphGateFade: '#1F1F1F',
        mythicHorizon: '#1F1F1F',
      },
      components: {
        card: {
          light: '#1F1F1F',
          dark: '#1F1F1F',
        },
        button: {
          light: '#1F1F1F',
          dark: '#1F1F1F',
        },
        modal: {
          light: '#1F1F1F',
          dark: '#1F1F1F',
        },
      },
    },
  }
);

// Theme validation type
export type ThemeValidation = {
  isValid: boolean;
  missingProperties: string[];
  invalidProperties: string[];
};

// Theme validation function
export const validateTheme = (theme: IExtendedTheme): ThemeValidation => {
  const requiredProperties = [
    'palette',
    'semanticColors',
    'spacing',
    'typography',
    'animations',
    'shadows',
    'gradients',
    'breakpoints',
    'mediaQueries',
  ];

  const missingProperties = requiredProperties.filter(
    (prop) => !(prop in theme)
  );

  const invalidProperties = requiredProperties.filter(
    (prop) => prop in theme && !theme[prop as keyof IExtendedTheme]
  );

  return {
    isValid: missingProperties.length === 0 && invalidProperties.length === 0,
    missingProperties,
    invalidProperties,
  };
};

// Theme switching utility
export const switchTheme = (
  currentTheme: IExtendedTheme,
  newTheme: IExtendedTheme
): IExtendedTheme => {
  const validation = validateTheme(newTheme);
  if (!validation.isValid) {
    console.warn('Invalid theme:', validation);
    return currentTheme;
  }
  return newTheme;
};

export const containerStyles = {
  containerType: 'inline-size',
  containerName: 'font-container',
} as const;

// Additional semantic color mappings for UI components
export const componentColors = {
  button: {
    primary: {
      background: 'var(--primary)',
      text: 'var(--neutral-primary)',
      hover: 'var(--neutral-light)',
      active: 'var(--neutral-lighter)',
    },
    secondary: {
      background: 'var(--secondary)',
      text: 'var(--neutral-primary)',
      hover: 'var(--neutral-light)',
      active: 'var(--neutral-lighter)',
    },
  },
  input: {
    background: 'var(--neutral-light)',
    text: 'var(--neutral-primary)',
    border: 'var(--neutral-tertiary)',
    focus: 'var(--primary)',
    placeholder: 'var(--neutral-tertiary)',
  },
  card: {
    background: 'var(--neutral-light)',
    border: 'var(--neutral-tertiary)',
    shadow: 'var(--shadow)',
  },
  modal: {
    background: 'var(--neutral-light)',
    overlay: 'var(--neutral-dark)',
    border: 'var(--neutral-tertiary)',
  },
  toast: {
    success: {
      background: 'var(--success)',
      text: 'var(--neutral-primary)',
    },
    error: {
      background: 'var(--error)',
      text: 'var(--neutral-primary)',
    },
    warning: {
      background: 'var(--warning)',
      text: 'var(--neutral-primary)',
    },
  },
};

// Example usage in styles
// export const getResponsiveStyles = (theme: IExtendedTheme, styles: any) => {
//   root: {
//     padding: responsiveValue(theme, {
//       padding: theme.spacing.m
//     }),
//   },
// };

// Theme types
export type ThemeMode =
  | 'light'
  | 'dark'
  | 'high-contrast'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'grayscale'
  | 'grayscale-dark';

export type ReadingDirection = 'ltr' | 'rtl';
export type LayoutPreference = 'right-handed' | 'left-handed';

export type ThemeContextType = {
  theme: IExtendedTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setAccessibilityTheme: (mode: ThemeMode) => void;
  // New reading direction and layout preferences
  readingDirection: ReadingDirection;
  layoutPreference: LayoutPreference;
  setReadingDirection: (direction: ReadingDirection) => void;
  setLayoutPreference: (preference: LayoutPreference) => void;
  toggleReadingDirection: () => void;
  toggleLayoutPreference: () => void;
};

// Theme mapping
export const themeMap: Record<ThemeMode, IExtendedTheme> = {
  light: lightTheme,
  dark: darkTheme,
  'high-contrast': highContrastTheme,
  protanopia: protanopiaTheme,
  deuteranopia: deuteranopiaTheme,
  tritanopia: tritanopiaTheme,
  grayscale: grayscaleTheme,
  'grayscale-dark': grayscaleDarkTheme,
};

// Theme persistence key
export const THEME_STORAGE_KEY = 'app-theme-mode';

/**
 * Fluxline Pro Theme Utilities
 *
 * Default theme mode is 'dark' to prioritize the focused aesthetic
 * with deep black (#010101) background for calm, engineered experience
 */
export const getInitialThemeMode = (): ThemeMode => {
  return 'dark'; // Fluxline Pro defaults to dark mode

  // Optional: Uncomment to respect user system preferences
  // if (typeof window === 'undefined') return 'dark';

  // // Check localStorage for saved preference
  // const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
  // if (savedTheme && themeMap[savedTheme]) return savedTheme;

  // // Check system preference - defaults to dark if no preference
  // if (
  //   window.matchMedia &&
  //   window.matchMedia('(prefers-color-scheme: light)').matches
  // ) {
  //   return 'light';
  // }

  // return 'dark'; // Fluxline Pro dark mode default
};

export const applyThemeToDocument = (themeMode: ThemeMode) => {
  const root = document.documentElement;
  const theme = themeMap[themeMode];

  // Set the data-theme attribute for CSS selector matching
  root.setAttribute('data-theme', themeMode);

  // Add transition properties to root element
  root.style.setProperty(
    'transition',
    'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out'
  );

  // Apply CSS variables with proper naming convention matching _theme.scss
  Object.entries(theme.palette).forEach(([key, value]) => {
    root.style.setProperty(`--theme-palette-${key}`, value);
  });

  // Apply semantic colors with proper naming convention
  Object.entries(theme.semanticColors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-semantic-${key}`, value);
  });

  // Apply spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--theme-spacing-${key}`, value);
    }
  });

  // Apply animation variables
  root.style.setProperty(
    '--theme-animation-duration-fast',
    theme.animations.durations.fast
  );
  root.style.setProperty(
    '--theme-animation-duration-normal',
    theme.animations.durations.normal
  );
  root.style.setProperty(
    '--theme-animation-duration-slow',
    theme.animations.durations.slow
  );
  root.style.setProperty(
    '--theme-animation-easing-primary',
    theme.animations.easing.primary
  );

  // Apply shadow variables
  root.style.setProperty('--theme-shadow-s', theme.shadows.s);
  root.style.setProperty('--theme-shadow-m', theme.shadows.m);
  root.style.setProperty('--theme-shadow-l', theme.shadows.l);

  // Apply border radius variables
  root.style.setProperty('--theme-borderRadius-s', theme.borderRadius.s);
  root.style.setProperty('--theme-borderRadius-m', theme.borderRadius.m);
  root.style.setProperty('--theme-borderRadius-l', theme.borderRadius.l);

  // Store theme preference
  localStorage.setItem(THEME_STORAGE_KEY, themeMode);
};

export type ResponsiveTypographyProps = {
  xs?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  sm?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  md?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  lg?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  xl?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  xxl?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
};

export const getResponsiveTypography = ({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}: ResponsiveTypographyProps) => {
  const styles: Record<string, { fontSize: string }> = {};

  if (xs) {
    styles['@media (min-width: 0)'] = {
      fontSize: typography.fontSizes[xs],
    };
  }
  if (sm) {
    styles['@media (min-width: 576px)'] = {
      fontSize: typography.fontSizes[sm],
    };
  }
  if (md) {
    styles['@media (min-width: 768px)'] = {
      fontSize: typography.fontSizes[md],
    };
  }
  if (lg) {
    styles['@media (min-width: 1024px)'] = {
      fontSize: typography.fontSizes[lg],
    };
  }
  if (xl) {
    styles['@media (min-width: 1366px)'] = {
      fontSize: typography.fontSizes[xl],
    };
  }
  if (xxl) {
    styles['@media (min-width: 1920px)'] = {
      fontSize: typography.fontSizes[xxl],
    };
  }

  return styles;
};

/**
 * DEFAULT EXPORT - Fluxline Pro Dark Theme
 * ========================================
 *
 * Exports dark theme as default to prioritize the Fluxline Pro
 * focused aesthetic with deep black (#010101) background.
 *
 * This ensures all components using the default theme export
 * will render with the intended dark mode experience.
 */
export default darkTheme;
