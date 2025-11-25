# Callout Component

DSM-compliant callout component with strategic use of mythic gold accent.

## Variants

### Accent (Mythic Gold)
Use for important quotes, mission statements, or key brand messaging that deserves the full mythic gold treatment.

```tsx
<Callout
  variant='accent'
  title="We're not done yet—but we're already extraordinary."
  subtitle='Modular by design. Resonant by nature.'
/>
```

**Visual Characteristics:**
- 4px top border in mythic gold (`theme.semanticColors.messageText`)
- Title in mythic gold
- Italic subtitle text
- Subtle background with border shadow
- Strong visual presence

### Subtle (Primary Blue)
Use for important information that needs attention but shouldn't compete with accent callouts. Good for CTAs, announcements, or featured content.

```tsx
<Callout
  variant='subtle'
  title='Hear From Our Clients'
  action={<Link href='/testimonials'>Read Client Stories</Link>}
>
  <Typography variant='p'>
    Don't just take our word for it. See how we've helped businesses transform.
  </Typography>
</Callout>
```

**Visual Characteristics:**
- 3px top border in primary blue (`theme.palette.themePrimary`)
- Title in primary blue
- Regular border and background
- Card shadow elevation
- Balanced visual presence

### Neutral (Theme Colors)
Use for general information, tips, or content that needs visual separation without strong emphasis.

```tsx
<Callout
  variant='neutral'
  title='Getting Started'
  icon={<InfoIcon />}
>
  <Typography variant='p'>
    Follow these steps to begin your journey.
  </Typography>
</Callout>
```

**Visual Characteristics:**
- Standard border in neutral color
- Title in default text color
- No special accent colors
- Minimal visual presence

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'accent' \| 'subtle' \| 'neutral'` | `'subtle'` | Visual intensity variant |
| `title` | `string` | Required | Main heading text |
| `subtitle` | `string` | Optional | Supporting text below title |
| `children` | `React.ReactNode` | Optional | Body content |
| `action` | `React.ReactNode` | Optional | Action element (button, link, etc.) |
| `icon` | `React.ReactNode` | Optional | Custom icon or decorative element |
| `className` | `string` | Optional | Additional CSS class |

## Design Guidelines

### When to Use Accent Variant
- ✅ Brand mission statements
- ✅ Key quotes or testimonials
- ✅ Unique value propositions
- ❌ Multiple times on same page (limit to 1-2)
- ❌ Generic informational content

### When to Use Subtle Variant
- ✅ Call-to-action sections
- ✅ Featured content
- ✅ Important announcements
- ✅ Section highlights
- ✅ Multiple instances per page

### When to Use Neutral Variant
- ✅ Tips and best practices
- ✅ Additional information
- ✅ General notes
- ✅ Supporting content

## Examples

### Quote Callout
```tsx
<Callout
  variant='accent'
  title="Transform with precision and resonance"
  subtitle="Our approach blends data with intuition"
/>
```

### CTA Callout with Action
```tsx
<Callout
  variant='subtle'
  title='Ready to Get Started?'
  action={
    <FormButton variant='primary' onClick={handleClick}>
      Schedule Consultation
    </FormButton>
  }
>
  <Typography variant='p'>
    Let's discuss how we can help transform your business.
  </Typography>
</Callout>
```

### Info Callout with Icon
```tsx
<Callout
  variant='neutral'
  title='Pro Tip'
  icon={<LightbulbIcon />}
>
  <Typography variant='p'>
    Use our design system components for consistent styling.
  </Typography>
</Callout>
```

## Accessibility

- All callouts use semantic heading structure
- Color is not the only differentiator (border styles also differ)
- Typography component ensures proper font hierarchy
- Supports keyboard navigation through action elements

## Implementation Notes

- The component automatically applies theme styles via `useAppTheme`
- Spacing is consistent with DSM spacing scale
- Border radius uses container-specific values
- Typography variants ensure proper font application
