# Fluxline Professional Services - Next.js Platform

> Modern, accessible, and performant web platform for Fluxline Resonance Group's professional services.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Overview

This is the official website for Fluxline Professional Services, built with Next.js 16.0.0 App Router and modern web technologies. The platform showcases our consulting, development, design, and wellness services with a focus on accessibility, performance, and user experience.

### Key Features

- ✅ **Modern Architecture**: Next.js 16 App Router with React 19
- ✅ **Static Site Generation**: Full SSG support for optimal performance
- ✅ **Accessibility First**: WCAG compliant with comprehensive accessibility features
- ✅ **Multi-Theme Support**: 8 theme modes including dark, high-contrast, and colorblind variants
- ✅ **Responsive Design**: Mobile-first design with adaptive layouts
- ✅ **Type Safety**: Full TypeScript implementation with strict mode
- ✅ **Component Library**: Reusable components with Storybook documentation
- ✅ **Animation System**: Framer Motion with reduced motion support
- ✅ **Azure Integration**: Deployment on Azure Static Web Apps

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development](#development)
- [Architecture](#architecture)
- [Theming](#theming)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Quick Start

### Prerequisites

- **Node.js**: >= 20.18.0 (see `.nvmrc`)
- **Yarn**: >= 1.22.18 (package manager)
- **Git**: For version control

### Installation

```bash
# Clone the repository
git clone https://github.com/Fluxline-Pro/fluxline-pro-next.git
cd fluxline-pro-next

# Install dependencies (use yarn exclusively)
yarn install

# Set up environment variables
cp .env.example .env.local

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Production build
yarn start            # Start production server
yarn type-check       # TypeScript type checking

# Testing
yarn test             # Run Jest tests
yarn test:watch       # Run tests in watch mode
yarn test:coverage    # Generate coverage report

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint issues

# Components
yarn generate:component ComponentName  # Generate new component
yarn storybook        # Start Storybook
yarn build-storybook  # Build Storybook

# Utilities
yarn clean            # Clean build artifacts
```

## 📁 Project Structure

```
fluxline-pro-next/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── case-studies/       # Case studies with dynamic routes
│   │   ├── contact/            # Contact page
│   │   ├── fluxline-ethos/     # Company ethos page
│   │   ├── legal/              # Legal documents
│   │   ├── press-release/      # Press releases
│   │   ├── services/           # Services and scrolls
│   │   └── testimonials/       # Client testimonials
│   ├── components/             # Reusable components
│   │   └── UnifiedPageWrapper.tsx  # Main layout wrapper
│   ├── theme/                  # Theme system
│   │   ├── components/         # Theme-aware components
│   │   ├── contexts/           # Theme providers
│   │   ├── hooks/              # Theme hooks
│   │   └── theme.ts            # Theme configuration
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Business logic libraries
│   ├── store/                  # State management (Zustand)
│   ├── animations/             # Framer Motion animations
│   └── utils/                  # Utility functions
├── public/                     # Static assets
│   ├── images/                 # Image assets
│   └── scrolls/                # Downloadable PDFs
├── azure/                      # Azure deployment configuration
├── .storybook/                 # Storybook configuration
├── scripts/                    # Build and utility scripts
└── docs/                       # Additional documentation
```

## 🏗️ Architecture

### Framework Stack

- **Next.js 16.0.0**: App Router for modern React development
- **React 19.2.0**: Latest React with concurrent features
- **TypeScript 5**: Full type safety with strict mode
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Declarative animations
- **Fluent UI**: Microsoft's design system for theming

### Key Architectural Decisions

1. **App Router First**: Uses Next.js 16 App Router conventions
2. **Server Components by Default**: Client components only when needed
3. **Static Site Generation**: Full SSG for optimal performance
4. **Unified Layout System**: Single `UnifiedPageWrapper` consolidates all layout types
5. **Theme-First Design**: Everything is theme-aware from the ground up
6. **Component-Driven**: Reusable components with clear interfaces

### Layout System

The application uses a unified layout system built around `UnifiedPageWrapper`:

- **Responsive Grid Layout**: Main layout with sticky images and scrollable content
- **Legal Document Layout**: Specialized layout for legal pages
- **Stacked Mobile Layout**: Clean mobile experience with images above content

## 🎨 Theming

The application supports 8 comprehensive theme modes:

### Theme Modes

- **Light**: Default light theme
- **Dark**: Dark mode with proper contrast
- **High Contrast**: Enhanced contrast for accessibility
- **Grayscale**: Monochrome experience
- **Grayscale Dark**: Dark monochrome
- **Protanopia**: Red-blind friendly
- **Deuteranopia**: Green-blind friendly
- **Tritanopia**: Blue-blind friendly

### Implementation

```typescript
// Theme access in components
import { useAppTheme } from '@/theme/hooks/useAppTheme';

const { theme, themeMode, setThemeMode } = useAppTheme();

// CSS custom properties available
:root {
  --theme-primary: /* theme color */;
  --theme-background: /* background color */;
  /* ... */
}
```

### Responsive Design

- **Mobile First**: Progressive enhancement from mobile
- **Breakpoint System**: Tailwind's responsive utilities
- **Adaptive Layouts**: Components adapt to screen size and content
- **Touch Support**: Full touch and gesture support on mobile

## 🧪 Testing

### Testing Stack

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Vitest**: Fast unit tests
- **Coverage Reports**: Generated with v8

### Running Tests

```bash
# Run all tests
yarn test

# Watch mode for development
yarn test:watch

# Generate coverage report
yarn test:coverage

# CI/CD testing
yarn test:ci
```

### Test Organization

- **Component Tests**: `*.test.tsx` alongside components
- **Hook Tests**: Custom hooks tested in isolation
- **Integration Tests**: Page-level functionality
- **Mock Data**: Comprehensive mock data for development

## 🚀 Deployment

### Azure Static Web Apps

The application is deployed on Azure Static Web Apps with three environments:

- **Development**: Auto-deploy from `develop` branch
- **Test**: Auto-deploy from `test` branch
- **Production**: Auto-deploy from `master` branch

### Build Process

```bash
# Build for production
yarn build

# Build for Azure (same as production)
yarn build:azure
```

### Environment Configuration

Environment variables are managed through:

- **Local Development**: `.env.local`
- **Azure Environments**: Azure App Settings
- **GitHub Actions**: Repository secrets

## 🛠️ Development Guidelines

### Code Style

- **ESLint**: Configured with Next.js recommendations
- **Prettier**: Consistent code formatting
- **TypeScript Strict**: Full type safety enforcement
- **Conventional Structure**: Follow Next.js App Router conventions

### Component Development

1. **Generate Component**: `yarn generate:component ComponentName`
2. **Write Tests**: Add comprehensive tests
3. **Document**: Create Storybook stories
4. **Type Safety**: Full TypeScript interfaces
5. **Accessibility**: ARIA labels and keyboard support

### Git Workflow

- **Main Branch**: `master` (production)
- **Development**: `develop` (staging)
- **Features**: `feature/*` branches
- **Fixes**: `fix/*` branches
- **Pull Requests**: Required for all changes

## 📚 Documentation

### Component Documentation

- **Storybook**: Interactive component documentation
- **TypeScript**: Inline JSDoc comments
- **README Files**: Feature-specific documentation

### API Documentation

- **Type Definitions**: Comprehensive interfaces
- **Mock Data**: Complete data schemas
- **Integration Guides**: Azure and third-party services

## 🤝 Contributing

### Development Process

1. **Fork & Clone**: Fork the repository and clone locally
2. **Branch**: Create feature branch from `develop`
3. **Develop**: Write code following guidelines
4. **Test**: Ensure all tests pass
5. **Document**: Update documentation as needed
6. **Pull Request**: Submit PR with clear description

### Code Review

- **Automated Checks**: ESLint, TypeScript, tests must pass
- **Manual Review**: Code review by maintainers
- **Documentation**: Ensure documentation is updated
- **Testing**: Verify functionality across devices/browsers

## 📞 Support

### Resources

- **Documentation**: `/docs` directory and inline comments
- **Storybook**: Component library at `localhost:6006`
- **Issues**: GitHub Issues for bug reports and feature requests

### Contact

- **Business**: [Fluxline Professional Services](https://fluxline.pro)
- **Technical**: Repository issues and discussions
- **Security**: Private contact for security issues

## 📄 License

This project is proprietary software owned by Fluxline Resonance Group, LLC. All rights reserved.

---

## 🏆 Acknowledgments

Built with modern web technologies and best practices. Special thanks to the open-source community for the excellent tools and libraries that make this project possible.

**Key Technologies**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Azure, GitHub Copilot AI assistance for development acceleration.
