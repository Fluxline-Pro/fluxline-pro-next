# Fluxline Pro Theming System

## Overview

The Fluxline Pro theming system is built on **Fluent UI** and provides a comprehensive, type-safe approach to theming that works seamlessly across TypeScript and SCSS.

## Architecture

The theming system follows a clear hierarchy:

```
┌─────────────────────────────────────────────────────────┐
│ theme.ts                                                │
│ Single source of truth for all theme values            │
│ (Fluent UI IExtendedTheme)                             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│ ThemeProvider (contexts/ThemeProvider.tsx)              │
│ - Applies theme.ts values to DOM via CSS variables     │
│ - Wraps app with FluentUI ThemeProvider                │
│ - Handles theme switching                              │
└──────────────────┬──────────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         ↓                   ↓
┌─────────────────┐  ┌─────────────────────────┐
│ _theme.scss     │  │ useAppTheme() hook      │
│ CSS variables   │  │ TypeScript theme access │
└────────┬────────┘  └────────┬────────────────┘
         │                    │
         ↓                    ↓
┌─────────────────┐  ┌─────────────────────────┐
│ Component SCSS  │  │ Component TypeScript    │
│ Use CSS vars    │  │ Use theme via hook      │
└─────────────────┘  └─────────────────────────┘
```

## Core Files

### 1. `theme.ts`
The single source of truth for all theme values. Defines:
- Multiple theme modes (light, dark, high-contrast, colorblind variants, etc.)
- Fluent UI palette
- Extended properties (spacing, typography, animations, shadows, etc.)
- Theme types and interfaces
- Helper functions

**Example:**
```typescript
import { darkTheme, lightTheme } from './theme';
import { useAppTheme } from './hooks/useAppTheme';

// In a component
const { theme, themeMode } = useAppTheme();
console.log(theme.palette.themePrimary); // Access theme values
```

### 2. `_theme.scss`
Provides SCSS variables and mixins that map to theme.ts values. Defines:
- CSS custom properties for all theme values
- Light and dark theme variants via `:root` and `[data-theme='dark']`
- Responsive breakpoints
- Common SCSS mixins

**Example:**
```scss
@use '../theme/theme' as theme;

.my-component {
  color: var(--theme-semantic-bodyText);
  background: var(--theme-palette-neutralLighter);
  padding: var(--theme-spacing-m);
  border-radius: var(--theme-borderRadius-m);
  
  @include theme.theme-elevation-2;
  @include theme.theme-transition;
  
  &:hover {
    @include theme.theme-button-hover;
  }
}
```

### 3. `ThemeProvider`
React component that:
- Wraps the application with Fluent UI theming
- Applies theme to document as CSS variables
- Handles theme switching
- Sets `data-theme` attribute on `<html>`

**Usage:**
```tsx
// In layout.tsx or _app.tsx
import ThemeProvider from '../theme/contexts/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 4. `useAppTheme` Hook
Custom hook for accessing theme in React components:
```typescript
const { 
  theme,           // Current Fluent UI theme object
  themeMode,       // Current theme mode ('light', 'dark', etc.)
  setThemeMode,    // Function to change theme
  toggleTheme,     // Toggle between light/dark
  // ... other theme-related utilities
} = useAppTheme();
```

## Using the Theme System

### In TypeScript/TSX Components

For Fluent UI components, use the theme via the hook and apply styles using Fluent UI's styling system:

```tsx
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { PrimaryButton, IButtonStyles } from '@fluentui/react';

export const MyComponent = () => {
  const { theme } = useAppTheme();
  
  const buttonStyles: IButtonStyles = {
    root: {
      backgroundColor: theme.palette.themePrimary,
      padding: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      transition: theme.animations.transitions.button,
    },
    rootHovered: {
      backgroundColor: theme.palette.themeDarkAlt,
    },
  };
  
  return <PrimaryButton styles={buttonStyles}>Click Me</PrimaryButton>;
};
```

### In SCSS Files

Import the theme and use CSS custom properties:

```scss
@use '../theme/theme' as theme;

.my-component {
  // Colors
  color: var(--theme-semantic-bodyText);
  background-color: var(--theme-palette-neutralLighter);
  border-color: var(--theme-palette-neutralQuaternary);
  
  // Spacing
  padding: var(--theme-spacing-m);
  margin: var(--theme-spacing-l) 0;
  
  // Typography
  font-family: var(--theme-fonts-family);
  font-size: var(--theme-fonts-medium-fontSize);
  
  // Visual effects
  border-radius: var(--theme-borderRadius-m);
  box-shadow: var(--theme-shadow-m);
  
  // Animation
  transition: all var(--theme-animation-duration-normal) var(--theme-animation-easing-primary);
  
  // Using mixins
  @include theme.theme-elevation-2;
  @include theme.theme-focus-border;
  
  &:hover {
    @include theme.theme-button-hover;
  }
  
  // Responsive
  @media (min-width: theme.$theme-breakpoint-md) {
    padding: var(--theme-spacing-l);
  }
}
```

## Available Theme Properties

### Palette Colors
- `--theme-palette-themePrimary` - Primary brand color
- `--theme-palette-themeSecondary` - Secondary brand color
- `--theme-palette-themeTertiary` - Tertiary brand color
- `--theme-palette-themeLight` - Light variant
- `--theme-palette-themeDark` - Dark variant
- `--theme-palette-themeDarker` - Darker variant
- `--theme-palette-themeLighter` - Lighter variant
- `--theme-palette-themeLighterAlt` - Lightest variant
- `--theme-palette-neutralPrimary` - Primary neutral (text)
- `--theme-palette-neutralSecondary` - Secondary neutral
- `--theme-palette-neutralTertiary` - Tertiary neutral
- `--theme-palette-neutralQuaternary` - Quaternary neutral
- `--theme-palette-neutralLight` - Light neutral
- `--theme-palette-neutralLighter` - Lighter neutral
- `--theme-palette-accent` - Accent color
- `--theme-palette-white` - White
- `--theme-palette-black` - Black

### Semantic Colors
- `--theme-semantic-bodyText` - Main text color
- `--theme-semantic-bodyBackground` - Main background color
- `--theme-semantic-link` - Link color
- `--theme-semantic-linkHovered` - Hovered link color
- `--theme-semantic-errorText` - Error text color
- `--theme-semantic-errorBackground` - Error background color
- `--theme-semantic-successText` - Success text color
- `--theme-semantic-successBackground` - Success background color
- `--theme-semantic-warningText` - Warning text color
- `--theme-semantic-warningBackground` - Warning background color
- `--theme-semantic-messageText` - Message text color

### Spacing
- `--theme-spacing-none` - 0
- `--theme-spacing-xxs` - 0.25rem
- `--theme-spacing-xs` - 0.5rem
- `--theme-spacing-s` - 0.75rem
- `--theme-spacing-m` - 1rem
- `--theme-spacing-l` - 1.5rem
- `--theme-spacing-xl` - 2rem
- `--theme-spacing-xxl` - 2.5rem
- `--theme-spacing-xxxl` - 3rem
- `--theme-spacing-xxxxl` - 4rem

### Typography
- `--theme-fonts-family` - Base font family
- `--theme-fonts-mono` - Monospace font family
- `--theme-fonts-tiny-fontSize`
- `--theme-fonts-xSmall-fontSize`
- `--theme-fonts-small-fontSize`
- `--theme-fonts-medium-fontSize`
- `--theme-fonts-mediumPlus-fontSize`
- `--theme-fonts-large-fontSize`
- `--theme-fonts-xLarge-fontSize`
- `--theme-fonts-xxLarge-fontSize`

### Effects
- `--theme-shadow-s` - Small shadow
- `--theme-shadow-m` - Medium shadow
- `--theme-shadow-l` - Large shadow
- `--theme-borderRadius-s` - Small border radius
- `--theme-borderRadius-m` - Medium border radius
- `--theme-borderRadius-l` - Large border radius

### Animation
- `--theme-animation-duration-fast` - 200ms
- `--theme-animation-duration-normal` - 300ms
- `--theme-animation-duration-slow` - 400ms
- `--theme-animation-easing-primary` - cubic-bezier(0.4, 0, 0.2, 1)

## SCSS Mixins

### `@include theme.theme-elevation-1`
Applies small elevation shadow

### `@include theme.theme-elevation-2`
Applies medium elevation shadow

### `@include theme.theme-elevation-3`
Applies large elevation shadow

### `@include theme.theme-focus-border`
Applies focus outline styles

### `@include theme.theme-button-hover`
Applies hover styles for buttons

### `@include theme.theme-transition`
Applies standard transition timing

## Theme Modes

The system supports multiple theme modes:
- `light` - Light mode (clean, minimal)
- `dark` - Dark mode (default, deep black background)
- `high-contrast` - High contrast mode for accessibility
- `protanopia` - Red-blind colorblind support
- `deuteranopia` - Green-blind colorblind support
- `tritanopia` - Blue-blind colorblind support
- `grayscale` - Grayscale mode
- `grayscale-dark` - Dark grayscale mode

### Switching Themes

```tsx
const { setThemeMode, toggleTheme } = useAppTheme();

// Set specific theme
setThemeMode('dark');

// Toggle between light and dark
toggleTheme();
```

## Best Practices

### 1. Always Use Theme Variables
❌ **Don't:**
```scss
.button {
  background-color: #0078d4;
  padding: 16px;
}
```

✅ **Do:**
```scss
.button {
  background-color: var(--theme-palette-themePrimary);
  padding: var(--theme-spacing-m);
}
```

### 2. Use Fluent UI Styling for Components
❌ **Don't:**
```tsx
<PrimaryButton style={{ backgroundColor: '#0078d4' }}>
  Click Me
</PrimaryButton>
```

✅ **Do:**
```tsx
const { theme } = useAppTheme();
const styles: IButtonStyles = {
  root: { backgroundColor: theme.palette.themePrimary }
};
<PrimaryButton styles={styles}>Click Me</PrimaryButton>
```

### 3. Minimize Custom SCSS
Keep component `.module.scss` files minimal. Most styling should be done via:
- Fluent UI's `styles` prop (for Fluent components)
- `mergeStyleSets` (for custom components)
- Theme CSS variables (when SCSS is needed)

### 4. Use TypeScript Types
```typescript
import { IExtendedTheme, ThemeMode } from './theme';

const myFunction = (theme: IExtendedTheme, mode: ThemeMode) => {
  // TypeScript will enforce correct usage
};
```

### 5. Responsive Design
```scss
@use '../theme/theme' as theme;

.component {
  padding: var(--theme-spacing-s);
  
  @media (min-width: theme.$theme-breakpoint-md) {
    padding: var(--theme-spacing-m);
  }
  
  @media (min-width: theme.$theme-breakpoint-lg) {
    padding: var(--theme-spacing-l);
  }
}
```

## Troubleshooting

### Theme not applying
- Ensure `ThemeProvider` wraps your app
- Check that `data-theme` attribute is set on `<html>` element
- Verify CSS variables are being set in browser dev tools

### Colors not changing
- Ensure you're using CSS variables, not hardcoded colors
- Check that `applyThemeToDocument` is being called
- Verify the theme mode is being set correctly

### TypeScript errors
- Import types from `./theme`: `IExtendedTheme`, `ThemeMode`, etc.
- Use `useAppTheme()` hook to access theme in components
- Ensure component styles use Fluent UI's type system

## Migration Guide

### Converting CSS to SCSS
1. Rename `.css` to `.scss`
2. Replace hardcoded values with CSS variables
3. Add `@use` import if using mixins
4. Update import in TypeScript file

### Converting Inline Styles to Theme
```tsx
// Before
<div style={{ color: '#333', padding: '16px' }}>

// After
const { theme } = useAppTheme();
const styles = mergeStyleSets({
  root: {
    color: theme.palette.neutralPrimary,
    padding: theme.spacing.m,
  }
});
<div className={styles.root}>
```

## Resources

- [Fluent UI Documentation](https://developer.microsoft.com/en-us/fluentui)
- [Fluent UI Theming Guide](https://developer.microsoft.com/en-us/fluentui#/controls/web/references#theming)
- [SASS Documentation](https://sass-lang.com/documentation)
