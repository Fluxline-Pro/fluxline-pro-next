# Fluxline Pro - Next.js Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) for the Fluxline Resonance Group's web platform.

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
- Use Tailwind CSS for styling with Fluent UI components
- Follow ESLint configuration
- Generate components using `yarn generate:component ComponentName`
- Write tests for all new components
- Document components with Storybook stories
- Use SCSS modules for component-specific styling

## Component Development Workflow

1. **Generate Component**: `yarn generate:component MyComponent`
2. **Generate SCSS Types**: `yarn scss-types` (or use watch mode)
3. **Develop Component**: Edit the generated `.tsx` file
4. **Style Component**: Edit the `.module.scss` file with theme variables
5. **Write Tests**: Update the `.test.tsx` file with comprehensive tests
6. **Create Stories**: Update the `.stories.tsx` file for documentation
7. **Run Tests**: `yarn test my-component`
8. **View in Storybook**: `yarn storybook`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - feedback and contributions welcome!

## Deployment

### Azure Static Web Apps

This project is configured for deployment on Azure Static Web Apps:

1. Build output is optimized for static hosting
2. API routes can be handled by Next.js API routes
3. Follow Azure SWA deployment guidelines

### Vercel (Alternative)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built with strategic precision for modern business transformation.**
