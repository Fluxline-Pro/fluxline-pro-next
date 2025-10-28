# Fluxline Pro - Next.js Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) for the Fluxline Resonance Group's web platform.

## Recent Updates

### Theme System Migration ✅

The complete theme system has been successfully migrated from the React app to Next.js:

- **Complete theme configuration** (1888 lines) including colors, typography, animations, and design tokens
- **Zustand state management** for user preferences with SSR compatibility
- **Fluent UI v8 integration** with custom Fluxline Pro theme
- **Next.js App Router compatible** ThemeProvider with proper hydration handling
- **Theme hooks** (useAppTheme, useMediaQuery, useThemeColor, useReducedMotion)
- **Core components** (Button, Card) with Fluent UI integration
- **Dark mode support** (default), light mode, and high-contrast themes
- **Responsive breakpoints** and media query utilities

## Getting Started

This project uses **yarn** as the package manager. First, install dependencies and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Available Scripts

### Development
- `yarn dev` - Start the development server
- `yarn build` - Create an optimized production build
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint to check code quality

### Testing
- `yarn test` - Run Jest tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

### Component Development
- `yarn generate:component ComponentName` - Generate new component with all files
- `yarn scss-types` - Generate TypeScript definitions for SCSS modules
- `yarn scss-types:watch` - Watch and generate SCSS types automatically

### Storybook
- `yarn storybook` - Start Storybook development server
- `yarn build-storybook` - Build static Storybook for deployment

## Technology Stack

### Core Framework
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - Frontend library with concurrent features
- **TypeScript 5+** - Type safety and developer experience

### Styling & UI
- **Tailwind CSS 4+** - Utility-first CSS framework
- **Sass 1.93.2+** - CSS preprocessing with SCSS modules
- **Fluent UI** - Microsoft design system components
- **CSS Modules** - Component-scoped styling

### Development & Testing
- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing utilities
- **Storybook** - Component development and documentation
- **Vitest** - Fast unit testing with Playwright integration
- **ESLint** - Code linting and quality

## Project Structure

```
├── app/                           # Next.js App Router directory
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page component
│   └── api/                      # API routes
├── src/                          # Source code
│   └── theme/                    # Theme system
│       ├── components/           # Generated components
│       │   ├── index.ts         # Component exports
│       │   └── [component]/     # Individual components
│       │       ├── index.ts     # Component barrel export
│       │       ├── [name].tsx   # React component
│       │       ├── [name].module.scss # Styles
│       │       ├── [name].test.tsx    # Jest tests
│       │       └── [name].stories.tsx # Storybook stories
│       ├── _theme.scss           # Theme variables and mixins
│       └── index.scss            # Main theme import
├── scripts/                      # Build and development scripts
│   └── generate-component.js     # Component generator
├── .storybook/                   # Storybook configuration
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Development Guidelines

- Use **yarn** exclusively for package management
- Follow Next.js App Router conventions
- Maintain TypeScript strict typing
- **Styling Hierarchy (in order of priority)**:
  1. **Fluent UI theming properties and objects** - Handle theme-aware colors, design tokens, and component customization
  2. **Tailwind CSS classes** - Use for layout, spacing, responsive design, and consistent utilities (replace old JSX and Layout components where appropriate)
  3. **SCSS component-based styling** - Use when Tailwind utilities are insufficient for complex component-specific styles
  4. **Global SCSS** - Use sparingly and preferably left alone; document reasoning when additions are necessary
- Ensure that light/dark mode changes and theming are handled by Fluent UI JSX styling, NOT Tailwind, as the two can conflict
- Follow ESLint configuration
- Generate components using `yarn generate:component ComponentName`
- Write tests for all new components
- Document components with Storybook stories

## Component Development Workflow

1. **Generate Component**: `yarn generate:component MyComponent`
2. **Generate SCSS Types**: `yarn scss-types` (or use watch mode)
3. **Develop Component**: Edit the generated `.tsx` file
4. **Style Component**: Edit the `.module.scss` file with theme variables
5. **Write Tests**: Update the `.test.tsx` file with comprehensive tests
6. **Create Stories**: Update the `.stories.tsx` file for documentation
7. **Run Tests**: `yarn test my-component`
8. **View in Storybook**: `yarn storybook`

## Theme System

### Overview

The Fluxline Pro theme system provides a comprehensive design system with:

- **Multiple theme modes**: Dark (default), Light, High Contrast, Grayscale
- **Fluent UI integration**: All components use Fluent UI theming for consistency
- **Responsive design**: Built-in breakpoint system for mobile, tablet, and desktop
- **Custom animations**: Smooth transitions with Fluxline Pro motion curve
- **Accessibility**: WCAG 2.1 AA compliant with proper contrast ratios

### Using the Theme

```tsx
'use client';

import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Button } from '@/theme/components/button';
import { Card } from '@/theme/components/card';

export default function MyComponent() {
  const { theme, themeMode, toggleTheme } = useAppTheme();

  return (
    <div style={{ backgroundColor: theme.palette.neutralLighter }}>
      <h1 style={{ color: theme.palette.themePrimary }}>
        Current theme: {themeMode}
      </h1>
      
      <Button variant="primary" onClick={toggleTheme}>
        Toggle Theme
      </Button>
      
      <Card elevation={2} padding="medium">
        <p>Card content with theme styling</p>
      </Card>
    </div>
  );
}
```

### Available Hooks

- **`useAppTheme()`** - Access theme object and theme switching functions
- **`useMediaQuery()`** - Responsive breakpoint detection
- **`useThemeColor()`** - Get theme-aware colors
- **`useReducedMotion()`** - Detect motion preferences

### Theme Configuration

The theme system is configured in `src/theme/theme.ts` and includes:

- Color palettes for all theme modes
- Typography system with Inter font family
- Spacing and layout utilities
- Animation and transition configs
- Shadow and elevation system
- Border radius utilities

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - feedback and contributions welcome!

## Deployment

### Azure Static Web Apps

This project is configured for deployment on Azure Static Web Apps with branch-specific environments:

- **Development**: `develop` branch → `az-fluxline-next-dev`
- **Testing**: `test` branch → `az-fluxline-next-test`
- **Production**: `master` branch → `az-fluxline-next-prod`

1. Build output is optimized for static hosting
2. API routes can be handled by Next.js API routes
3. Follow Azure SWA deployment guidelines
4. Managed Identity authentication for enhanced security

### Vercel (Alternative)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built with strategic precision for modern business transformation.**
