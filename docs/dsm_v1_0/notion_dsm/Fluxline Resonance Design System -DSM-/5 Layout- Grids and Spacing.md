# 5. Layout, Grids and Spacing

---

## 🧱 Updated Layout & Spacing Tokens (Fluent-Aligned)

```tsx
// Breakpoints: Threshold Zones
export const breakpoints = {
  xs: 0,       // Mobile
  sm: 576,     // Small tablet
  md: 768,     // Tablet
  lg: 1024,    // Small desktop / iPad Pro
  xl: 1366,    // Large desktop
  xxl: 1920,   // High-res desktop
};

// Media Queries
export const mediaQueries = {
  xs: `(min-width: 0px) and (max-width: 575px)`,
  sm: `(min-width: 576px) and (max-width: 767px)`,
  md: `(min-width: 768px) and (max-width: 1023px)`,
  lg: `(min-width: 1024px) and (max-width: 1365px)`,
  xl: `(min-width: 1366px) and (max-width: 1919px)`,
  xxl: `(min-width: 1920px)`,
};

// Container Widths
export const containerWidths = {
  mobile: '90%',
  tablet: '720px',
  desktop: '1200px',
};

// Spacing Tokens (in px and rem)
export const spacing = {
  none: '0',
  xxs: '4px',      // 0.25rem
  xs: '8px',       // 0.5rem
  s: '12px',       // 0.75rem
  m: '16px',       // 1rem
  l: '24px',       // 1.5rem
  xl: '32px',      // 2rem
  xxl: '40px',     // 2.5rem
  xxxl: '48px',    // 3rem
  xxxxl: '64px',   // 4rem
  menuButton: '0.5rem 1rem 0 0',
};

// Fluent UI Vertical Spacing Tokens
export const fluentSpacing = {
  spacingVerticalS: '4px',
  spacingVerticalM: '8px',
  spacingVerticalL: '16px',
  spacingVerticalXL: '32px',
};

// Grid System
export const grid = {
  baseUnit: '8px', // Modular grid
  columns: 12,
  gutter: '16px',
};

// Responsive Rituals
export const responsiveRituals = {
  spiralGlyph: 'clamp(2em, 10cqi, 4em)',
  buttonText: 'clamp(0.875em, 2.5cqi, 1.125em)',
  formLabel: 'clamp(0.75em, 2cqi, 1em)',
};

```

---

This structure gives you full control over layout rhythm, emotional spacing, and symbolic responsiveness. When you're ready to merge this with your typography and color system, I can help you version a complete `theme.ts` file that sings across every breakpoint and ritual zone. Let’s keep building the mythic grid.