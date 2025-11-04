# Animation System Documentation

This document provides comprehensive documentation for the animation system in the Fluxline Pro Next.js application.

## Table of Contents

- [Overview](#overview)
- [Animation Configuration](#animation-configuration)
- [Animation Variants](#animation-variants)
- [Animation Components](#animation-components)
- [Animation Utilities](#animation-utilities)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)

---

## Overview

The animation system is built on [Framer Motion](https://www.framer.com/motion/) and provides:

- **Consistent timing** and easing across the application
- **Reusable variants** for common animation patterns
- **Accessibility support** with reduced motion detection
- **SSR compatibility** with Next.js
- **Performance optimization** with CSS animations where possible

All animations respect the user's `prefers-reduced-motion` setting for accessibility.

---

## Animation Configuration

Located in `src/animations/config.ts`, the configuration provides centralized constants for all animations.

### Durations

```typescript
import { animationDurations } from '@/animations';

animationDurations.instant;   // 0ms
animationDurations.fast;       // 150ms
animationDurations.normal;     // 300ms
animationDurations.medium;     // 400ms
animationDurations.slow;       // 500ms
animationDurations.slower;     // 700ms
animationDurations.slowest;    // 1000ms
```

### Easings

```typescript
import { animationEasings } from '@/animations';

animationEasings.linear;       // 'linear'
animationEasings.easeIn;       // 'cubic-bezier(0.4, 0, 1, 1)'
animationEasings.easeOut;      // 'cubic-bezier(0, 0, 0.2, 1)'
animationEasings.easeInOut;    // 'cubic-bezier(0.4, 0, 0.2, 1)'
animationEasings.smooth;       // 'cubic-bezier(0.4, 0, 0.2, 1)'
animationEasings.bounce;       // 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
```

### Distances

```typescript
import { animationDistances } from '@/animations';

animationDistances.small;      // 8px
animationDistances.medium;     // 16px
animationDistances.large;      // 24px
animationDistances.xlarge;     // 32px
```

### Stagger Delays

```typescript
import { staggerDelays } from '@/animations';

staggerDelays.fast;            // 0.05s
staggerDelays.normal;          // 0.1s
staggerDelays.slow;            // 0.15s
staggerDelays.slower;          // 0.2s
```

### Spring Configurations

```typescript
import { springConfigs } from '@/animations';

springConfigs.gentle;          // Smooth, gentle spring
springConfigs.bouncy;          // Playful, bouncy spring
springConfigs.stiff;           // Quick, responsive spring
springConfigs.slow;            // Deliberate, slow spring
```

---

## Animation Variants

Located in `src/animations/variants.ts`, variants provide reusable animation patterns for Framer Motion.

### Fade Variants

```tsx
import { fadeVariants } from '@/animations';
import { motion } from 'framer-motion';

<motion.div variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
  Content
</motion.div>
```

### Fade Up Variants

```tsx
import { fadeUpVariants } from '@/animations';

<motion.div variants={fadeUpVariants} initial="hidden" animate="visible">
  Content fades in while sliding up
</motion.div>
```

### Slide Variants

```tsx
import { slideLeftVariants, slideRightVariants } from '@/animations';

// Slides in from right
<motion.div variants={slideLeftVariants} initial="hidden" animate="visible">
  Content
</motion.div>

// Slides in from left
<motion.div variants={slideRightVariants} initial="hidden" animate="visible">
  Content
</motion.div>
```

### Scale Variants

```tsx
import { scaleVariants } from '@/animations';

<motion.div variants={scaleVariants} initial="hidden" animate="visible">
  Content grows in
</motion.div>
```

### Staggered Container & Items

```tsx
import { staggerContainerVariants, staggerItemVariants } from '@/animations';

<motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
  <motion.div variants={staggerItemVariants}>Item 1</motion.div>
  <motion.div variants={staggerItemVariants}>Item 2</motion.div>
  <motion.div variants={staggerItemVariants}>Item 3</motion.div>
</motion.div>
```

### Modal Variants

```tsx
import { modalVariants, backdropVariants } from '@/animations';

<motion.div variants={backdropVariants} initial="hidden" animate="visible">
  <motion.div variants={modalVariants} initial="hidden" animate="visible">
    Modal content
  </motion.div>
</motion.div>
```

### Drawer Variants

```tsx
import { drawerVariants } from '@/animations';

// Drawer from left
<motion.div variants={drawerVariants.left} initial="hidden" animate="visible">
  Drawer content
</motion.div>

// Drawer from right
<motion.div variants={drawerVariants.right} initial="hidden" animate="visible">
  Drawer content
</motion.div>

// Drawer from top
<motion.div variants={drawerVariants.top} initial="hidden" animate="visible">
  Drawer content
</motion.div>

// Drawer from bottom
<motion.div variants={drawerVariants.bottom} initial="hidden" animate="visible">
  Drawer content
</motion.div>
```

---

## Animation Components

Pre-built animation components with reduced motion support.

### FadeSlideIn

Fades in while sliding from a direction.

```tsx
import { FadeSlideIn } from '@/animations';

<FadeSlideIn direction="right" distance={16} duration={0.4} delay={0}>
  Content slides in from the right
</FadeSlideIn>

<FadeSlideIn direction="bottom" distance={20} duration={0.5}>
  Content slides up from the bottom
</FadeSlideIn>
```

**Props:**
- `direction?: 'right' | 'bottom' | 'left' | 'top'` - Slide direction (default: 'right')
- `distance?: number` - Slide distance in pixels (default: 16)
- `duration?: number` - Animation duration in seconds (default: 0.4)
- `delay?: number` - Delay before animation starts (default: 0)
- `className?: string` - Additional CSS class

### FadeUp

Fades in while sliding up.

```tsx
import { FadeUp } from '@/animations';

<FadeUp distance={20} duration={0.5} delay={0.1}>
  Content fades up
</FadeUp>
```

**Props:**
- `distance?: number` - Slide distance in pixels (default: 20)
- `duration?: number` - Animation duration in seconds (default: 0.5)
- `delay?: number` - Delay before animation starts (default: 0)
- `className?: string` - Additional CSS class

### FadeIn

Simple fade in animation.

```tsx
import { FadeIn } from '@/animations';

<FadeIn duration={0.3} delay={0}>
  Content fades in
</FadeIn>
```

**Props:**
- `duration?: number` - Animation duration in seconds (default: 0.3)
- `delay?: number` - Delay before animation starts (default: 0)
- `className?: string` - Additional CSS class

### SlideLeft

Slides in from the right.

```tsx
import { SlideLeft } from '@/animations';

<SlideLeft>
  Content slides left
</SlideLeft>
```

### StaggeredContainer

Staggers animation of children elements.

```tsx
import { StaggeredContainer } from '@/animations';

<StaggeredContainer stagger={0.1} initialDelay={0}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggeredContainer>
```

**Props:**
- `stagger?: number` - Delay between each child animation (default: 0.1s)
- `initialDelay?: number` - Initial delay before first child (default: 0)
- `className?: string` - Additional CSS class
- `style?: React.CSSProperties` - Inline styles

### StaggeredGrid

Grid layout with staggered animation.

```tsx
import { StaggeredGrid } from '@/animations';

<StaggeredGrid columns={3} gap="1rem" stagger={0.1}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</StaggeredGrid>
```

**Props:**
- `columns?: number` - Number of grid columns (default: 3)
- `gap?: string` - Gap between items (default: '1rem')
- `stagger?: number` - Delay between each child animation (default: 0.1s)
- `initialDelay?: number` - Initial delay before first child (default: 0)
- `className?: string` - Additional CSS class
- `style?: React.CSSProperties` - Inline styles

---

## Animation Utilities

Located in `src/animations/utils.ts`, utilities provide helper functions for animations.

### Reduced Motion Detection

```typescript
import { prefersReducedMotion } from '@/animations';

if (prefersReducedMotion()) {
  // Skip or simplify animations
}
```

### Duration Helpers

```typescript
import { getAnimationDuration, getAnimationDelay } from '@/animations';

const duration = getAnimationDuration(300); // Returns 0 if reduced motion
const delay = getAnimationDelay(100);       // Returns 0 if reduced motion
```

### Stagger Calculation

```typescript
import { calculateStaggerDelays } from '@/animations';

const delays = calculateStaggerDelays(5, 100, 200);
// Returns [200, 300, 400, 500, 600] (or [0, 0, 0, 0, 0] if reduced motion)
```

### Conversion Helpers

```typescript
import { msToSeconds, secondsToMs } from '@/animations';

const seconds = msToSeconds(300);    // 0.3
const milliseconds = secondsToMs(0.5); // 500
```

### Math Helpers

```typescript
import { clamp, lerp, mapRange } from '@/animations';

clamp(150, 0, 100);                  // 100
lerp(0, 100, 0.5);                   // 50
mapRange(50, 0, 100, 0, 1);          // 0.5
```

### Scroll Progress

```typescript
import { getScrollProgress, getElementViewportProgress } from '@/animations';

const progress = getScrollProgress(element);         // 0 to 1
const viewportProgress = getElementViewportProgress(element); // 0 to 1
```

### Viewport Detection

```typescript
import { isInViewport } from '@/animations';

if (isInViewport(element, 0)) {
  // Element is in viewport
}
```

### Easing Functions

```typescript
import { easingFunctions } from '@/animations';

const eased = easingFunctions.easeInOut(0.5); // Apply easing to 0.5
```

---

## Best Practices

### 1. Respect Reduced Motion

Always respect user preferences for reduced motion:

```tsx
import { useReducedMotion } from '@/theme/hooks';

function AnimatedComponent() {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: 'easeOut'
      }}
    >
      Content
    </motion.div>
  );
}
```

Or use the built-in animation components which handle this automatically:

```tsx
<FadeUp>Content</FadeUp> {/* Automatically respects reduced motion */}
```

### 2. Use Consistent Timing

Use the centralized configuration for consistent timing:

```tsx
import { animationDurations } from '@/animations';

<motion.div
  transition={{
    duration: animationDurations.normal / 1000, // Convert to seconds
    ease: 'easeOut'
  }}
/>
```

### 3. Optimize Performance

- Use `transform` and `opacity` for best performance (GPU accelerated)
- Avoid animating `height`, `width`, or other layout properties
- Use `will-change` sparingly and only when needed
- Consider using CSS animations for simple effects

```tsx
// ✅ Good - GPU accelerated
<motion.div animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} />

// ❌ Avoid - Causes layout reflow
<motion.div animate={{ height: 100, width: 200 }} />
```

### 4. Progressive Enhancement

Animations should enhance, not block functionality:

```tsx
// Content is visible even if animation doesn't load
<FadeIn>
  <button>Click me</button>
</FadeIn>
```

### 5. Mobile Optimization

Reduce animation complexity and distance on mobile:

```tsx
import { useIsMobile } from '@/theme/hooks';

function ResponsiveAnimation() {
  const isMobile = useIsMobile();

  return (
    <FadeSlideIn
      distance={isMobile ? 10 : 16}
      duration={isMobile ? 0.3 : 0.4}
    >
      Content
    </FadeSlideIn>
  );
}
```

This is handled automatically in `FadeSlideIn` component.

### 6. Stagger Carefully

Don't stagger too many items or it will feel slow:

```tsx
// ✅ Good - 3-5 items with 0.1s stagger
<StaggeredContainer stagger={0.1}>
  {items.slice(0, 5).map(item => <Card key={item.id} />)}
</StaggeredContainer>

// ❌ Avoid - 20 items with 0.2s stagger = 4s total
<StaggeredContainer stagger={0.2}>
  {items.map(item => <Card key={item.id} />)}
</StaggeredContainer>
```

### 7. Exit Animations

Always provide exit animations for better UX:

```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

---

## Accessibility

### Reduced Motion

The animation system automatically respects `prefers-reduced-motion`:

- All animation components check the user's preference
- Animations are disabled or simplified when reduced motion is preferred
- Use `useReducedMotion()` hook for custom animations

### Focus Management

Ensure animations don't interfere with focus:

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  onAnimationComplete={() => {
    // Focus the first input after animation
    firstInputRef.current?.focus();
  }}
>
  <form>...</form>
</motion.div>
```

### Screen Readers

Animations should not affect screen reader announcements:

```tsx
// Content is announced immediately, animation is visual only
<FadeIn>
  <div role="alert" aria-live="polite">
    Success message
  </div>
</FadeIn>
```

---

## Migration Notes

This animation system was migrated from the React app with these changes:

1. **Framer Motion** remains the core animation library
2. **Configuration** centralized in `config.ts`
3. **Variants** organized in `variants.ts`
4. **Components** adapted for Next.js with SSR compatibility
5. **Utilities** expanded with scroll and viewport helpers
6. **Reduced motion** integrated throughout

### Breaking Changes from React App

- Animation configuration moved to `@/animations/config`
- Animation components require `'use client'` directive
- Variants use string easings ('easeOut') instead of CSS strings

---

## Examples

### Page Transition

```tsx
'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants } from '@/animations';

export default function Page() {
  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1>Page Content</h1>
    </motion.div>
  );
}
```

### Scroll Animation

```tsx
'use client';

import { useIntersectionObserver } from '@/hooks';
import { motion } from 'framer-motion';

export function ScrollSection() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      Content animates when scrolled into view
    </motion.section>
  );
}
```

### Card Grid

```tsx
'use client';

import { StaggeredGrid } from '@/animations';
import { Card } from '@/theme/components';

export function CardGrid({ items }) {
  return (
    <StaggeredGrid columns={3} gap="2rem" stagger={0.1}>
      {items.map(item => (
        <Card key={item.id}>{item.title}</Card>
      ))}
    </StaggeredGrid>
  );
}
```

---

Last updated: November 3, 2025
