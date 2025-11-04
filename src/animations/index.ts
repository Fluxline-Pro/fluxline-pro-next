/**
 * Animation system exports
 * Centralized exports for all animation-related functionality
 */

// Configuration
export * from './config';

// Variants
export * from './variants';

// Animation components
export {
  FadeSlideIn,
  FadeUp,
  FadeIn,
  SlideLeft,
  default as FadeAnimations,
} from './fade-animations';
export type {
  FadeSlideInProps,
  FadeUpProps,
  FadeInProps,
} from './fade-animations';

export {
  StaggeredContainer,
  StaggeredGrid,
  default as Staggered,
} from './staggered-container';
export type {
  StaggeredContainerProps,
  StaggeredGridProps,
} from './staggered-container';

// Utilities
export * from './utils';
