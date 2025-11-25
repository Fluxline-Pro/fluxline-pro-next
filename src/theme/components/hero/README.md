# Hero Component

A reusable DSM-compliant hero section component for page headers.

## Features

- **Responsive Design**: Fluid typography with clamp() sizing
- **Theme-Aware**: Automatically adapts to current theme mode
- **Flexible Content**: Accepts any React children for content
- **Customizable**: Optional border, shadow, and custom styling
- **DSM-Compliant**: Uses theme spacing, colors, and typography

## Usage

### Basic Example

```tsx
import { Hero } from '@/theme/components/hero';
import { Typography } from '@/theme/components/typography';

<Hero title='About Fluxline'>
  <Typography variant='p'>Your content here...</Typography>
</Hero>;
```

### With Multiple Content Blocks

```tsx
<Hero title='Our Services'>
  <Typography variant='p'>First paragraph of content...</Typography>
  <Typography variant='p'>Second paragraph of content...</Typography>
  <Typography variant='p'>Third paragraph of content...</Typography>
</Hero>
```

### With Shadow

```tsx
<Hero title='Portfolio' showShadow>
  <Typography variant='p'>Content with dramatic elevation...</Typography>
</Hero>
```

### Without Border

```tsx
<Hero title='Contact' showBorder={false}>
  <Typography variant='p'>Borderless hero section...</Typography>
</Hero>
```

### With Custom Styling

```tsx
<Hero
  title='Custom Hero'
  style={{ marginBottom: '2rem' }}
  className='custom-hero-class'
>
  <Typography variant='p'>Custom styled content...</Typography>
</Hero>
```

## Props

| Prop         | Type                  | Default     | Description                        |
| ------------ | --------------------- | ----------- | ---------------------------------- |
| `title`      | `string`              | _required_  | Main heading text displayed as H1  |
| `children`   | `React.ReactNode`     | `undefined` | Content to display below the title |
| `className`  | `string`              | `''`        | Additional CSS classes             |
| `style`      | `React.CSSProperties` | `undefined` | Custom inline styles               |
| `showBorder` | `boolean`             | `true`      | Display border around hero section |
| `showShadow` | `boolean`             | `false`     | Apply hero shadow for elevation    |

## Styling

The Hero component uses:

- **Padding**: `theme.spacing.xxl` (top/bottom) and `theme.spacing.xxxl` (left/right)
- **Border**: `1px solid theme.palette.neutralTertiary` (when showBorder is true)
- **Background**: `theme.palette.neutralLight`
- **Border Radius**: `clamp(0.75rem, 1.5cqi, 0.75rem)` (responsive)
- **Title Color**: `theme.palette.themePrimary`
- **Title Size**: `clamp(2rem, 5vw, 3rem)` (responsive)
- **Shadow**: `theme.shadows.hero` (when showShadow is true)

## Accessibility

- Uses semantic H1 heading via Typography component
- Maintains proper heading hierarchy
- Theme-aware colors ensure WCAG contrast compliance
- Responsive sizing maintains readability across devices

## Integration with Other Components

Works seamlessly with:

- **Typography**: For text content styling
- **Callout**: Can include callouts within hero content
- **UnifiedPageWrapper**: Designed to work within page wrappers

## Examples

### About Page

```tsx
<Hero title='About Fluxline'>
  <Typography variant='p'>
    <strong>Fluxline</strong> architects transformative systems...
  </Typography>
  <Typography variant='p'>
    Whether you're an individual seeking personal growth...
  </Typography>
  <Callout variant='accent' title='Our Mission'>
    We're not done yet—but we're already extraordinary.
  </Callout>
</Hero>
```

### Services Page

```tsx
<Hero title='Our Services' showShadow>
  <Typography variant='p'>
    Comprehensive solutions for modern businesses...
  </Typography>
</Hero>
```

### Contact Page

```tsx
<Hero title='Get In Touch' showBorder={false}>
  <Typography variant='p'>
    Ready to start your transformation journey?
  </Typography>
</Hero>
```

## Design Philosophy

The Hero component embodies Fluxline's design principles:

- **Modular**: Self-contained, reusable across all pages
- **Resonant**: Adapts to theme modes for emotional consistency
- **Precise**: Uses DSM tokens for mathematical harmony
- **Flexible**: Accommodates diverse content needs

## Notes

- Always use within a page layout component (e.g., UnifiedPageWrapper)
- Title is required; hero without children is valid (title-only hero)
- Content spacing is automatically handled via `space-y-4` utility
- Responsive padding and typography ensure mobile-first design
