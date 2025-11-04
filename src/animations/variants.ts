/**
 * Framer Motion animation variants
 * Reusable animation presets for consistent motion design
 */

import { Variants } from 'framer-motion';
import {
  animationDistances,
  animationDurations,
} from './config';

/**
 * Fade variants
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: animationDurations.normal / 1000,
      ease: 'easeOut',
    },
  },
  exit: { opacity: 0 },
};

/**
 * Fade up variants (fade in while sliding up)
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: animationDistances.medium,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDurations.medium / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -animationDistances.small,
  },
};

/**
 * Fade down variants (fade in while sliding down)
 */
export const fadeDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -animationDistances.medium,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDurations.medium / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: animationDistances.small,
  },
};

/**
 * Slide left variants
 */
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: animationDistances.medium,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationDurations.medium / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -animationDistances.medium,
  },
};

/**
 * Slide right variants
 */
export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -animationDistances.medium,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: animationDurations.medium / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: animationDistances.medium,
  },
};

/**
 * Scale variants (grow/shrink)
 */
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationDurations.normal / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};

/**
 * Staggered container variants
 * Use with staggerChildren to create sequential animations
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/**
 * Staggered item variants
 * Use as children of staggerContainerVariants
 */
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: animationDistances.medium,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDurations.medium / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -animationDistances.small,
  },
};

/**
 * Modal/Dialog variants
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animationDurations.fast / 1000,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: animationDurations.fast / 1000,
      ease: 'easeIn',
    },
  },
};

/**
 * Backdrop variants (for overlays)
 */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: animationDurations.fast / 1000,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: animationDurations.fast / 1000,
    },
  },
};

/**
 * Drawer variants (slide from side)
 */
export const drawerVariants = {
  left: {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeOut',
      },
    },
    exit: {
      x: '-100%',
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeIn',
      },
    },
  },
  right: {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeOut',
      },
    },
    exit: {
      x: '100%',
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeIn',
      },
    },
  },
  top: {
    hidden: { y: '-100%' },
    visible: {
      y: 0,
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeOut',
      },
    },
    exit: {
      y: '-100%',
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeIn',
      },
    },
  },
  bottom: {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeOut',
      },
    },
    exit: {
      y: '100%',
      transition: {
        duration: animationDurations.normal / 1000,
        ease: 'easeIn',
      },
    },
  },
} as const;
