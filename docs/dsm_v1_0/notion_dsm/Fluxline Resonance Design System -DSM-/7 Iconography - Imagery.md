# 7. Iconography & Imagery

### **🧭 Tone & Purpose**

Icons are not mere visuals—they are semantic glyphs in the mythic interface. Each icon should reinforce clarity, emotional resonance, and modular intent.

- Signal **thresholds**, **actions**, and **states**
- Avoid decorative use—every icon must carry **semantic weight**
- Icons serve as **ritual markers** in the interface, guiding users through transformation and decision

### **🗂️ Collections & Themes**

Use a hybrid system of Fluent UI icons and custom glyphs to maintain consistency while honoring mythic symbolism:

- **Fluent Icons Used**:
    - `Globe`: Global resonance / worldview
    - `HeartPulse`: Somatic vitality / emotional ROI
    - `BranchFork`: Modular divergence / choice architecture
    - `Lightbulb`: Insight / curriculum activation
    - `ShieldCheckmark`: Ethical guardrails / confirmed protection
- **Custom Glyphs** (SVG overrides):
    - `Spiral`: Emergence, iteration, mythic unfolding
    - `Wave`: Emotional flow, resonance tracking
    - `Portal`: Thresholds, transformation, initiation
    - `Mirror`: Reflection, self-authorship, inner clarity
- **Style**: Line-based, minimal, sacred geometry—icons should feel intentional, not ornamental
- **Fluent UI** iconography is used for any icons outside the dichotomy and sphere, ensuring accessibility and system integrity

### **📐 Sizing & Scaling**

Icon size reflects interaction precision and emotional weight:

- **12px**: Informational glyphs (non-interactive)
- **16–24px**: Primary actions and navigation
- **32–48px**: Ritual zones, confirmations, mythic transitions
- Scale by powers of 4 for pixel-perfect fidelity (e.g. 48 → 96 → 192)

### **🎨 Color & Contrast**

Icons harmonize with the Fluxline color system:

- Default: Silver Thread (#C0C8D0) or Ritual White (#FFFFFF)
- Accent: Indigo Pulse (#3C4CFF) or Shift Signal (#00FFE0) for active states
- Avoid multicolor unless signaling file types or product launch icons
- Never recolor Microsoft product icons—preserve brand integrity
- **🧬 Naming & Semantics**
Icons are named for their **form**, not their **function**, preserving metaphorical clarity and supporting localization:
    - ✅ Use: `Shield`, `ArrowUp`, `DocumentHeart`
    - 🚫 Avoid: `Security`, `Upload`, `FavoriteFile`
    - Modifiers (e.g. `Shield + Check`) may be used in bottom-right overlays when clarity is preserved

### **📦 Implementation**

Use Fluent UI’s React icon library (`@fluentui/react-icons`) for scalable integration.

```tsx
import { GlobeRegular, HeartPulseFilled, BranchForkRegular } from '@fluentui/react-icons';
```

### **📚 Reference**

Explore the full Fluent iconography system on the [Fluent 2 Design System Iconography](https://fluent2.microsoft.design/iconography) site.