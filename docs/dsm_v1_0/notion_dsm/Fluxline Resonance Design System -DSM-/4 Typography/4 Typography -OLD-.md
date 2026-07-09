# 4. Typography (OLD)

### Overview

| Style | Font Name | Usage | Notes |
| --- | --- | --- | --- |
| Display | Playfair Display | Titles, headers | Mythic elegance |
| Body | Inter | Paragraphs, UI text | Modular clarity |
| Accent | Courier Prime | Code snippets, rituals | Technical resonance |

### 🧬 Core Principles

- **Font units**: Use `em` for all text sizing to ensure container-based scaling
- **Container logic**: Use `cqi` (Container Query Inline size) for layout and spacing
- **Root sizing**: Base `rem` on `html { font-size: 16px; }` for consistency
- **Clamp strategy**: Apply `clamp()` to balance fluidity and control across breakpoints

### Text Styles

| Element | Font | Transform | Purpose/Feel |
| --- | --- | --- | --- |
| H1 | Playfair Display | `title-case` | Matches logo, sets tone, bold & declarative |
| H2 | Inter | `title-case` | Clean hierarchy, readable, editorial balance |
| H3 | Inter | `title-case` | Reinforces clarity, guides scanning |
| H4 | Inter | `title-case` | Supports modular sections, subtle emphasis |
| H5–H6 | Work Sans | H5: `lowercase`H6: `uppercase` | Softens tone, conversational/subtext cues |
| Paragraph (p) | Inter | `normal` | Natural flow, no forced stylization |
| Code/Mono | Roboto Mono | `none` | Pure data, unstyled for authenticity |

### 🔠 **Font Sizing & Variation**

| Type | Font | Size (Desktop) | Size (Mobile) | Weight | Usage |
| --- | --- | --- | --- | --- | --- |
| Display XL | Playfair | 3em | 2rem | Bold | Hero headers, page titles |
| Display SM | Playfair | 2em | 1.5rem | Medium | Section headers |
| Body | Inter | 1em | 0.875rem | Regular | Paragraphs, UI text |
| Caption | Inter | 0.75em | 0.75em | Medium | Labels, helper text |
| Ritual Text | Courier Prime | 0.875em | 0.875em | Regular | Code snippets, prompts |

### 🧱 Base Font Size

```jsx
export const BASE_FONT_SIZE = 16
```

### 🧊 Container-based Font Sizing (em and clamp() CSS)

| Type | Font Stack | CSS Clamp Example | Notes |
| --- | --- | --- | --- |
| Display XL | `Playfair Display` | `clamp(2.5em, 5cqi, 3.5em)` | Hero headers, mythic titles |
| Display SM | `Playfair Display` | `clamp(1.75em, 4cqi, 2.5em)` | Section headers, ritual zones |
| Body | `Inter` | `clamp(1em, 3cqi, 1.25em)` | Paragraphs, UI text |
| Caption | `Inter` | `clamp(0.75em, 2cqi, 1em)` | Labels, helper text |
| Ritual Text | `Courier Prime` | `clamp(0.875em, 2.5cqi, 1.125em)` | Code snippets, emotional prompts |