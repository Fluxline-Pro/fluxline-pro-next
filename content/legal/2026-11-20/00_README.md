# Legal Documents v2 (counsel-final), effective November 20, 2026

Internal. The source of truth for the legal pages that go live on preorder launch day. Never publish `COUNSEL_DECISIONS.md`.

| File | Live at |
| --- | --- |
| `01_Terms_of_Use_v2.md` | fluxline.pro/legal/terms/ |
| `02_RCF_Preorder_Terms_v2.md` | fluxline.pro/legal/preorder-terms/ |
| `03_Privacy_Policy_v2.md` | fluxline.pro/legal/privacy-policy/ |
| `04_Responsible_AI_Usage_v2.md` | fluxline.pro/legal/responsible-ai-usage/ |
| `05_Stewardship_Charter_v2.md` | fluxline.pro/legal/stewardship-charter/ (old /legal/stewardship-contract/ redirects) |
| `06_Legal_Index_v2.md` | fluxline.pro/legal/ (card copy in `src/app/legal/LegalPageClient.tsx`) |
| `08_Personal_Training_Waiver_v1.md` | fluxline.pro/legal/personal-training-waiver/ |
| `COUNSEL_DECISIONS.md` | Internal record of every counsel answer (Q1 to Q13), owner decision and open item |
| `pdf/` | Print copies, built with `yarn legal:pdf` |

## How the site uses these

`src/assets/legal/<name>.md` and `<name>.ts` carry the same text; the page renders the `.ts`. When a document changes: edit the master here, copy it to `src/assets/legal/<name>.md`, regenerate the `.ts` (`export const content = \`...\`;`, escaping backticks and `${`), update the date line in the page's client component, archive the old `.md` under `src/assets/legal/archive/<old effective date>/`, and rebuild the PDF.

## Conventions

No em dashes, exclamation points or emoji. "The Resonance Core Framework™" with the ™ until the registration certificate issues. No app names in the Terms before launch. Prices point to the live price. Only the release window (late February to mid-March 2027) is published, including as the delay-rule trigger. The internal release target is never published. 01 to 04 always ship together.
