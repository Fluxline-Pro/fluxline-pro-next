/**
 * Animation configuration constants
 * Centralized animation timing and easing values for consistency
 */

/**
 * Animation durations in milliseconds
 */
export const animationDurations = {
  instant: 0,
  fast: 150,
  normal: 300,
  medium: 400,
  slow: 500,
  slower: 700,
  slowest: 1000,
} as const;

/**
 * CSS easing functions
 */
export const animationEasings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  // Custom easings
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Framer Motion easing functions
 */
export const motionEasings = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

/**
 * Animation distances for slide effects (in pixels)
 */
export const animationDistances = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
} as const;

/**
 * Stagger delays for sequential animations (in seconds)
 */
export const staggerDelays = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  slower: 0.2,
} as const;

/**
 * Spring configurations for Framer Motion
 */
export const springConfigs = {
  // Gentle spring for smooth transitions
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
  // Bouncy spring for playful animations
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
  },
  // Stiff spring for quick, responsive animations
  stiff: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
  // Slow spring for deliberate animations
  slow: {
    type: 'spring' as const,
    stiffness: 50,
    damping: 15,
  },
} as const;

/**
 * Default animation configuration
 */
export const defaultAnimation = {
  duration: animationDurations.normal / 1000, // Convert to seconds for Framer Motion
  ease: 'easeOut' as const,
} as const;
