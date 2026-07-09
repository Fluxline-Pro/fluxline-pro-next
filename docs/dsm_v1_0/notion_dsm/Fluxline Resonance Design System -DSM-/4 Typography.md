# 4. Typography

---

## ### Overview

| Style | Font Name | Usage | Notes |
| --- | --- | --- | --- |
| Display | Inter | Titles, headers | Unified with logo and body |
| Body | Inter | Paragraphs, UI text | Modular clarity |
| Accent | Courier Prime | Code snippets, rituals | Technical resonance |

---

## ### 🧬 Core Principles

- **Font units**: Use `em` for all text sizing to ensure container-based scaling
- **Container logic**: Use `cqi` (Container Query Inline size) for layout and spacing
- **Root sizing**: Base `rem` on `html { font-size: 16px; }` for consistency
- **Clamp strategy**: Apply `clamp()` to balance fluidity and control across breakpoints
- **Font feature settings**: Use `"lnum"` and `"pnum"` for lining and proportional numerals
- **Kerning logic**: Translate Illustrator kerning to CSS `letter-spacing` (e.g., `15` ≈ `0.5px`, `+50` ≈ `0.5px`)

---

## ### Text Styles

| Element | Font | Transform | Purpose/Feel |
| --- | --- | --- | --- |
| H1 | Inter SemiBold | `title-case` | Matches logo, sets tone, declarative |
| H2 | Inter Bold | `title-case` | Clean hierarchy, editorial clarity |
| H3 | Inter Bold | `title-case` | Guides scanning, modular emphasis |
| H4 | Inter Bold | `title-case` | Section anchors, subtle emphasis |
| H5 | Inter Bold | `lowercase` | Conversational, soft tone |
| H6 | Inter Bold | `uppercase` | Subtext cue, glyph tagging |
| Paragraph (p) | Inter Medium | `normal` | Natural flow, integration layer |
| Code/Mono | Courier Prime | `none` | Raw data, ritual prompts |

---

## ### 🔠 Font Sizing & Variation

| Type | Font | Size (Desktop) | Size (Mobile) | Weight | Usage |
| --- | --- | --- | --- | --- | --- |
| Display XL | Inter | 3em | 2rem | Bold | Hero headers, page titles |
| Display SM | Inter | 2em | 1.5rem | Medium | Section headers |
| Body | Inter | 1em | 0.875rem | Medium | Paragraphs, UI text |
| Caption | Inter | 0.75em | 0.75em | Medium | Labels, helper text |
| Ritual Text | Courier Prime | 0.875em | 0.875em | Regular | Code snippets, emotional cues |

---

## ### 🧱 Base Font Size

```jsx
export const BASE_FONT_SIZE = 16
```

---

## ### 🧊 Container-Based Font Sizing (em + clamp)

| Type | Font Stack | CSS Clamp Example | Notes |
| --- | --- | --- | --- |
| Display XL | `Inter` | `clamp(2.5em, 5cqi, 3.5em)` | Hero headers, curriculum gates |
| Display SM | `Inter` | `clamp(1.75em, 4cqi, 2.5em)` | Section headers, phase openers |
| Body | `Inter` | `clamp(1em, 3cqi, 1.25em)` | Paragraphs, walkthroughs |
| Caption | `Inter` | `clamp(0.75em, 2cqi, 1em)` | Labels, helper text |
| Ritual Text | `Courier Prime` | `clamp(0.875em, 2.5cqi, 1.125em)` | Code snippets, emotional prompts |

---

## ### 🧬 Subheadline Variants (CSS Snippets)

```css
/* Headline */
.headline {
  font-family: 'Inter', sans-serif;
  font-size: 30pt;
  font-weight: 600;
  letter-spacing: -0.5px;
  font-feature-settings: "lnum" 1, "pnum" 1;
}

/* Subheadline 1 */
.subheadline-1 {
  font-size: 18pt;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Subheadline 2 */
.subheadline-2 {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Subheadline 3 – ALL CAPS */
.subheadline-3 {
  font-size: 12pt;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Body Text */
.body-text {
  font-size: 12pt;
  font-weight: 500;
  line-height: 1.6;
}

/* Section Label */
.section-label {
  font-size: 10pt;
  font-weight: 600;
  letter-spacing: 0.25px;
  text-transform: uppercase;
  color: #555;
}

```

---

[4. Typography (OLD)](4%20Typography/4%20Typography%20(OLD)%20258f1f5df180809ca345fb14943467f0.md)