# Fluxline Document PDF Builder

Renders Markdown documents into Letter-size PDFs in the Fluxline print design (navy top bar, gold kicker, navy headings, bordered tables, gold and navy footer band, Fluxline lockup). It was built for legal review copies and works for any Markdown document.

## Use

```bash
yarn legal:pdf src/assets/legal --out legal-pdf-out
yarn legal:pdf content/legal/2026-11-20/01_Terms_of_Use_v2.md --status "Review copy, not yet published"
yarn legal:pdf notes.md --kicker "Fluxline · Program" --out ~/Desktop
```

| Option | What it does |
| --- | --- |
| `<file.md \| folder>` | One or more Markdown files, or folders of them. |
| `--out <dir>` | Where PDFs are written. Default `legal-pdf-out/`. |
| `--kicker <text>` | The gold label above the title. Known legal documents get one from their file name; anything else gets "Fluxline". |
| `--status <text>` | Added to the footer, for example `Review copy, not yet published`. Omit for final copies. |

## Document format

- The first `# ` heading is the title.
- The lines right after it that start with a bold field (`**Effective date:** November 20, 2026`, `**Version 2.0**`) become the header block. The footer shows the Version and Effective lines.
- A `---` after the header is dropped. Everything else renders as GitHub-flavored Markdown with single line breaks kept, so signature fields and contact blocks stay one per line.

## Files

| File | Purpose |
| --- | --- |
| `build.js` | The builder (Node, CommonJS). Uses `marked` and `playwright` from the repo's dev dependencies. |
| `template.css` | All design tokens and print styles. Change colors and type here. |
| `fluxline-logo-lockup.png` | Horizontal Fluxline lockup with tagline (light mode). Replace with a newer export of the same name to update every PDF. |

Fonts: Liberation Sans, with an Arial fallback. Chromium comes from Playwright (`npx playwright install chromium` on a new machine). To use an existing Chrome or Chromium binary instead, set `CHROMIUM_PATH`, for example `CHROMIUM_PATH=/opt/pw-browsers/chromium yarn legal:pdf ...`.
