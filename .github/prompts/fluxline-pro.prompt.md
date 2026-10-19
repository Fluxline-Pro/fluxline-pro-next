---
mode: agent
description: Fluxline.pro voice and congruence pass (copy and links only). Applies the owner's decisions, holds the open items, opens a PR to develop.
---

# fluxline.pro: voice and congruence pass

Repos: `Fluxline-Pro/fluxline-pro-next` (code) and `Fluxline-Pro/fluxline-pro-cms` (Sanity content). Find where each string lives (component, MDX, Sanity fixture, or CMS content). If a string lives only in the live CMS and not in the repo, **do not guess**: list it under "Questions for the owner" with the exact current text and the replacement.

First read [rcf-voice-core.md](../rcf-voice-core.md). Its rules, decisions, glosses and PR standards apply to everything below.

Goal: a first-time visitor understands what Fluxline does, who it is for, and what to do next, and the three sites say the same thing.

## Apply

**A1. Home stats block**
- "20+ Years Experience" stays 20+. Change the label to "Years in Design, Development, Architecture & Product Management". If it does not fit the card, **stop and flag**; do not abbreviate.
- "6+ Product Offerings" becomes "5 Offerings".
- Do **not** touch "50+ Projects Delivered" or "10+ Industries Served" (Hold).

**A2. Offering count and Fractional Leadership**
- Home: "Six modular offerings across three domains" becomes "Five modular offerings". Drop "across three domains".
- `/services/`: remove the Fractional Leadership card, and its group heading and intro ("Strategy & Leadership … fractional leadership …") if the group is now empty.
- Remove Fractional Leadership from any nav, footer, card, `llms.txt`, JSON-LD and sitemap label.
- Leave `/services/fractional-leadership/` (the route file) in place. List it as a Hold.

**A3. Book date.** Replace "Late Fall 2026" with the targeted-Q1-2027 wording on: home (framework summary and the "Coming Late Fall 2026" book card), `/books/` (hero badge, H2 "The book & workbook arrive Late Fall 2026", intro line, meta description), `/resonance-core-framework`, and all metadata. Suggested H2: "The book and workbook are targeted for Q1 2027". Leave "Coming Soon" badges and pre-order wording; add no date to them.

**A4. Framework page terms (`/resonance-core-framework`)**
- Rename the two loops (core decision 6) and use the glosses in the core file's table. Remove "(book name: …)" notes.
- Change the DRIVE stage label EXPANSION to EMBODIMENT (also in image alt text and any metadata). Keep the existing stage subheads.
- Expand DRIVE at first use. Replace "DRIVE System" with "DRIVE Model" where it names the six-stage model.
- Behavioral Gravity: rewrite **both** places (Core Concepts and the FAQ "What is Behavioral Gravity?") to the **identical** approved gloss. Check the home page, `/books`, meta descriptions and `llms.txt` for any older gloss and align them.
- DAS gloss: expand SSI, EROI and the Shadow Index (SI) once, or drop them from the gloss. Do not reproduce a formula.
- Name the DII as "Decision Integrity Index (DII)" at first use, then DII.

**A5. Claims**
- FAQ question "Is the RCF research-backed?" becomes "What is the RCF built from?" Answer: "It draws on psychology, systems thinking, and practice. It is a decision and identity framework, not therapy."
- H3 "Tested before it was written down" becomes "How it was developed". Do not edit its body; list the body under "Questions for the owner" if it makes a testing claim.
- Strategic Innovation gloss (home and framework page): replace "proven methodologies" with "disciplined, repeatable practice". Full line: "Thoughtful experimentation balanced with disciplined, repeatable practice for sustainable growth."
- Do **not** touch "Universal human truths" (Hold).

**A6. Marks.** ™ on first use per page, title, H1, OG and Twitter text. Fix body-text uses that read "Resonance Core Framework" without ™ at first use. No ® anywhere.

**A7. Cross-sell and links**
- Footer nav currently reads "The RCF Ecosystem" with two links. Keep the nav label (Hold) and make its items the **shared block** in core Section 7. Do not create a new component.
- Footer author link "Terence Waters — Author & Architect" now points to `https://terencewaters.com/about/`. Keep the visible text.
- "Explore the Podcast" (home) now points to `https://theresonantidentity.com/start-here/`.
- Beside the book mention in the framework summary, add the link "Be notified at launch →" to `https://fluxline.pro/resonance-core-framework/#notify` (the RCF page's newsletter sign-up, owner 2026-10-19). In `/books/`, the "Want to know when it lands?" section gets the same link.
- On `/contact`, add to the TRI Newsletter description: "Book launch updates included." Keep "No spam, ever."

## Hold (change nothing, list every occurrence in the PR)

1. "50+ Projects Delivered," "10+ Industries Served" (unverified; keep, source or soften).
2. Home hero graphic "4.72 Average Composite DII Score" (measured or illustrative?).
3. RCF grouping: "Strategy & Leadership" on home vs "Body & Practice" on `/services/`.
4. Cropped logo caption in the hero graphic ("TRUCTURE THE SHIFT"). Visual bug; report only.
5. Creative Truth listed as both a Core Concept and a Core Value with two definitions.
6. "Book a Free Consultation" on the framework page vs "Book a Consultation" elsewhere.
7. Footer label "The RCF Ecosystem" vs the locked "Fluxline Ecosystem."
8. Any "1 to 5" mention of the DII scale.
9. "Universal human truths" (What It's Built On).
10. The `/services/fractional-leadership/` route: redirect, keep or delete?
11. Glossary page mismatches with core Section 4 (e.g. it may still say "Expansion" or an older Behavioral Gravity meaning). Report only.

## Acceptance

- Every changed page glosses each framework term once at first use.
- No locked term renamed, re-cased or removed. No new claim, statistic or em dash.
- Metadata, JSON-LD and `llms.txt` match the visible copy.
- PR follows core Section 8 and lists Applied, Held, Left alone and Questions.
