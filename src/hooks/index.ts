/**
 * Custom React hooks for the Fluxline Pro Next.js application.
 *
 * These hooks provide reusable functionality for common patterns like
 * state management, browser APIs, animations, and user interactions.
 */

// Utility hooks
export { useDebounce } from './useDebounce';
export { useThrottle } from './useThrottle';
export { useToggle } from './useToggle';
export { usePrevious } from './usePrevious';

// Browser API hooks
export { useClickOutside } from './useClickOutside';
export { useKeyPress } from './useKeyPress';
export { useScrollPosition } from './useScrollPosition';
export { useLocalStorage } from './useLocalStorage';
export { useSessionStorage } from './useSessionStorage';

// Interaction hooks
export { useHoverState, useMultiHoverState } from './useHoverState';
export { useHoverEffects } from './useHoverEffects';
export type { HoverEffectsConfig } from './useHoverEffects';

// Animation hooks
export { useIntersectionObserver } from './useIntersectionObserver';
export type { UseIntersectionObserverOptions } from './useIntersectionObserver';

// API hooks
export { usePressReleaseApi } from './usePressReleaseApi';
