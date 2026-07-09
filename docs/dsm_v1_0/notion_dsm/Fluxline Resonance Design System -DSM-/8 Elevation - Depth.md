# 8. Elevation & Depth

| Elevation Level | Use Case | Emotional Layer |
| --- | --- | --- |
| `elevation4` | Input fields, subtle containers | Grounding |
| `elevation16` | Cards, modals | Invitation |
| `elevation64` | Hover states, active rituals | Activation, threshold crossing |
| `elevation128` | Hero overlays, onboarding flows | Mythic spotlight |

Pair elevation with **shadow color overlays** using `rgba(0,0,0,0.1)` to `rgba(0,0,0,0.3)` depending on depth.

### 🧊 Z-Index (Elevation) Rituals

| Layer | Value | Usage Context |
| --- | --- | --- |
| `hide` | -1 | Hidden elements, ritual void |
| `auto` | 0 | Default stacking |
| `base` | 1 | Core UI elements |
| `above` | 2 | Floating cards, active states |
| `dropdown` | 3 | Menus, select lists |
| `menu` | 4 | Navigation overlays |
| `tooltip` | 5 | Hover info, emotional cues |
| `popover` | 6 | Contextual rituals |
| `modal` | 10 | Deep focus rituals |
| `overlay` | 11 | Dimmed backgrounds, threshold layers |
| `toast` | 16 | Feedback rituals, success/error states |
| `max` | 999 | Mythic spotlight, onboarding glyphs |

These z-index values form the **Stacking Constellation**—each layer a plane of interaction and resonance.