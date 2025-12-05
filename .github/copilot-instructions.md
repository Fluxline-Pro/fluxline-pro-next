# GitHub Copilot Instructions

This file provides instructions for GitHub Copilot when working with this repository.

**Full documentation**: See [COPILOT_INSTRUCTIONS.md](../COPILOT_INSTRUCTIONS.md) in the repository root for complete development guidelines.

## Quick Reference

### Styling Priority

1. **Tailwind CSS** - Layout, spacing, utilities
2. **Fluent UI theme.ts** - Theme colors, typography, design tokens
3. **SCSS Modules** - Complex component-specific styling only

### Architecture

- Use Next.js App Router with Server Components by default
- Add `"use client"` only when required (state, effects, browser APIs)
- Place shared components in `components/`
- Keep hooks in `hooks/`
- Place utilities in `lib/`

### SEO

- Use Next.js `metadata` exports for SEO on page/layout files
- Do not add SEO metadata for markdown content itself (blog posts, portfolio, press releases, and case studies are wrapped in page/layout files)
- Page-level SEO is handled at the route level only

### Content Policy

- Do not modify existing copy or text content without explicit instructions
- Limit changes to structure, types, and implementation details
- Keep all tests passing when refactoring
