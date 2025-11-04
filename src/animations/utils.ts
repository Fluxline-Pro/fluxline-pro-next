/**
 * Animation utilities and helper functions
 */

/**
 * Check if the user prefers reduced motion (system-wide setting)
 * This is a synchronous check, use the useReducedMotion hook for React components
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on reduced motion preference
 * Returns 0 if user prefers reduced motion, otherwise returns the specified duration
 */
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Get animation delay based on reduced motion preference
 * Returns 0 if user prefers reduced motion, otherwise returns the specified delay
 */
export function getAnimationDelay(delay: number): number {
  return prefersReducedMotion() ? 0 : delay;
}

/**
 * Calculate staggered delays for multiple items
 * @param itemCount - Number of items to stagger
 * @param staggerDelay - Delay between each item in milliseconds
 * @param initialDelay - Initial delay before first item in milliseconds
 * @returns Array of delays for each item
 */
export function calculateStaggerDelays(
  itemCount: number,
  staggerDelay: number = 100,
  initialDelay: number = 0
): number[] {
  if (prefersReducedMotion()) {
    return Array(itemCount).fill(0);
  }

  return Array.from({ length: itemCount }, (_, index) => {
    return initialDelay + index * staggerDelay;
  });
}

/**
 * Convert milliseconds to seconds (for Framer Motion)
 */
export function msToSeconds(ms: number): number {
  return ms / 1000;
}

/**
 * Convert seconds to milliseconds
 */
export function secondsToMs(seconds: number): number {
  return seconds * 1000;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculate scroll progress (0 to 1) within an element
 */
export function getScrollProgress(element: HTMLElement): number {
  const { scrollTop, scrollHeight, clientHeight } = element;
  const scrollableHeight = scrollHeight - clientHeight;

  if (scrollableHeight === 0) return 0;

  return clamp(scrollTop / scrollableHeight, 0, 1);
}

/**
 * Calculate element's position relative to viewport (0 to 1)
 * 0 = element just entering viewport from bottom
 * 1 = element exiting viewport from top
 */
export function getElementViewportProgress(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Element position relative to viewport
  const elementTop = rect.top;
  const elementHeight = rect.height;

  // Calculate progress
  const totalDistance = viewportHeight + elementHeight;
  const currentDistance = viewportHeight - elementTop;

  return clamp(currentDistance / totalDistance, 0, 1);
}

/**
 * Check if element is in viewport
 */
export function isInViewport(
  element: HTMLElement,
  threshold: number = 0
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView =
    rect.top <= windowHeight - threshold && rect.bottom >= threshold;
  const horInView =
    rect.left <= windowWidth - threshold && rect.right >= threshold;

  return vertInView && horInView;
}

/**
 * Easing functions for manual animations
 */
export const easingFunctions = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};
