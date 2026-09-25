---
title: "Nine Phases, One Source of Truth: Rebuilding a Book Production Pipeline That Had Stopped Agreeing With Itself"
client: "Fluxline Resonance Group — internal IP"
industry: "Systems Design / AI Orchestration"
description: "A nine-stage AI publishing pipeline had grown into nine prompts that contradicted each other. We rebuilt it into a single system with explicit gates, one source of truth, and human approval where it matters — then released it publicly for other authors."
services:
  - consulting
  - development
technologies:
  - AI Workflow Architecture
  - Content Governance
  - Publishing Systems
  - Local LLM & RAG
  - n8n Automation
  - EPUB & Kindle Production
  - Prompt Engineering
publishedDate: "2026-09-22"
projectDuration: "Single working session"
featured: true
imageUrl: "/case-studies/posts/rcf-publishing-pipeline-alignment/images/rcf-publishing-case-study-workflow.png"
imageAlt: "RCF Book Production Pipeline — nine-phase workflow diagram showing gate conditions, deliverables, and source-of-truth hierarchy"
slug: "rcf-publishing-pipeline-alignment"
seoTitle: "Nine Phases, One Source of Truth: AI Book Production Pipeline Case Study — Fluxline"
seoDescription: "How Fluxline rebuilt a nine-stage AI publishing pipeline from nine contradicting prompts into a single system with explicit gates, one source of truth, and enforced human approval — then released it publicly on GitHub."
seoKeywords:
  - AI workflow architecture
  - publishing pipeline
  - content governance
  - local LLM
  - RAG design
  - n8n automation
  - EPUB production
  - Kindle publishing
  - prompt engineering
  - open source
  - systems design
  - fluxline
challenge: "A nine-stage AI publishing pipeline had grown from six prompt files to nine, absorbing marketing generation, a local RAG layer, and n8n automation along the way. Each phase was good work on its own — together, they had quietly stopped being a system. Three different addresses for the same folder. Two phases both numbered four. Triggers that nothing produced. A deleted phase whose QA gate remained. Four vocabularies for 'done.' The manuscript was 'locked, except where it wasn't' — and draft marketing copy had a path into the published book."
solution: "Rather than rewriting the prompts, we addressed the seams between them: one root and one naming rule for every path; a ranked source-of-truth hierarchy written into a single tie-breaker file; explicit entry and exit gates with named deliverables; signal files with designated authors and consumers; a single six-step status ladder with one phase permitted to award each level; and structural enforcement of human approval — proposals files the author must accept, status fields that compile steps actually read before including content."
results: "Nine aligned phase prompts, each with its position, entry gate, exit gate, and deliverables stated at the top. A master pipeline overview acting as tie-breaker for paths, gates, folders, and deliverables. A full changelog documenting every correction and the dependencies it clarified. Placeholder tokenization for public adoption. Public release on GitHub under GPL-3.0. A code review on the pull request surfaced five legitimate findings; fixing the fifth uncovered a sixth — a hashtable key-ordering bug in the find-and-replace script that would have silently mangled every path token."
metrics:
  - label: "Pipeline Phases Aligned"
    value: "9 of 9"
    description: "Every phase now has stated entry gate, exit gate, and deliverables"
  - label: "Contradictions Resolved"
    value: "7 seam failures"
    description: "Duplicate numbering, missing triggers, orphan QA gates, conflicting status vocabularies, draft content in compile"
  - label: "Human Approval Model"
    value: "Enforced"
    description: "Structural enforcement via status fields and proposals files — not just intent"
  - label: "Public Release"
    value: "GPL-3.0"
    description: "Nine phase prompts, master overview, and placeholder guide on GitHub"
testimonial:
  quote: "Everyone building with AI right now says a human is in the loop. The question is whether the loop is enforced or merely intended. An instruction that says 'I approve every piece' is intent. A compile step that reads a status field and refuses to include anything not marked approved is enforcement. Only one of them survives a tired Tuesday."
  author: "Terence Waters"
  role: "Founder, Fluxline.pro"
repo: "https://github.com/Fluxline-Pro/fluxline-rcf-book-pipeline"
---

# Nine Phases, One Source of Truth

## Rebuilding a book production pipeline that had stopped agreeing with itself

A book that ships in six formats is not one project. It is twenty copies of the same content, each drifting away from the others at its own speed.

The manuscript. The workbook. The slide deck. The reference guides. The narration script. The eBook HTML. The print layout. The Kindle file. The vector store. The marketing copy. Every one of them descended from the same chapter, and every one of them a chance for a definition to shift, a figure to get renumbered, a claim to appear that the book never actually made.

The Resonance Core Framework pipeline was built to stop that drift. Over three iterations it grew from six prompt files to nine, absorbing marketing generation, a local RAG layer, and n8n automation along the way. Each phase, on its own, was good work.

Together, they had quietly stopped being a system.

---

## The problem: nine right answers to nine different questions

The failures were not in any single phase. They were in the seams — the places where one phase handed off to the next and the two had different ideas about what had just been handed over.

**Three different addresses for the same folder.** One phase wrote to a cloud-sync path, another to a local drive, a third to a knowledge-base root that existed nowhere. Each was correct when written. None agreed.

**Two phases both numbered four.** One built the Kindle file. The other was a placeholder stub that had never been filled in. Downstream phases referencing "PHASE 4" were referencing a coin flip.

**Triggers that nothing produced.** The automation phase waited on two signal files — `DESIGN_READY.md` and `GOVERNANCE_READY.md` — before running. No phase anywhere created either one. The automation had been waiting for a starting gun that was never going to fire.

**A phase that had been deleted, and the hole it left.** An earlier version produced the book-level HTML masters and EPUB packages. A later version dropped that phase but kept the QA phase that reviewed its output. The result: a quality gate inspecting files that no longer had an author.

**Four vocabularies for "done."** One phase certified a chapter *Design Ready*. Another used *Publication Ready*. A third had *Review Required*. None mapped to the others, so "is this chapter finished?" had four answers depending on which file you asked.

And two that mattered more than the rest, because they could reach a reader:

**The manuscript was locked, except where it wasn't.** The creation phase instructed the assistant to "make suggested wording edits in the chapter." The governance phase declared the manuscript untouchable and never to be edited. Both were in force at once.

**Draft marketing copy had a path into the published book.** The Kindle compile pulled a "Further Exploration" section from the marketing seeds — material explicitly generated as unapproved drafts, carrying `status: draft` in its own frontmatter. Nothing in the compile step checked that field.

---

## The approach: make the seams the design

We did not rewrite the prompts. The prompts were good — precise, voice-aware, specific about what they wanted. The problem was never the phases. It was everything between them.

So the work was structural.

**One root, one chapter path, one naming rule.** Every path in every phase now resolves from a single book root. Chapter content lives in one place, under one convention, and governance flags anything that drifts from it — which is how naming problems get caught by a machine instead of by a person six chapters later.

**A ranked source of truth.** Manuscript beats normalized glossary beats learning metadata beats every derived artifact. Written down, in one file, so a conflict has an answer instead of an argument. When a designed layout and the manuscript disagree about a sentence, nobody has to decide in the moment — the hierarchy already decided.

**Gates, not vibes.** Every phase now has an entry condition it checks, an exit condition it must satisfy, and a named deliverable set. A phase cannot begin because the previous one *felt* finished. It begins because a signal file exists, written by the phase that owns it.

**Triggers with an author.** `GOVERNANCE_READY.md`, `DESIGN_READY.md`, `RAG_READY.md` — each is now produced by a specific phase, consumed by a specific phase, with an `INCOMPLETE` counterpart listing blockers and a rule against leaving a stale signal behind. The automation that had been waiting for a starting gun now has one.

**One ladder for status.** `Draft → Review Ready → Design Ready → Production Ready → Publishing Ready → Published`, with exactly one phase permitted to award each level, and only the author able to award the last.

**Kindle moved to where it actually belongs.** The old order implied a Kindle edition during design *and* a Kindle compile later — two sources, no rule for choosing. Kindle content is built from finished eBook structure, exported figure images, and final pull quotes, so the whole Kindle job now sits after all of those exist and have passed QA. The phase before it gained a Kindle Readiness gate that fails loudly if a figure is still a placeholder.

**Human approval made structural rather than aspirational.** The manuscript is never silently edited — suggested wording goes to a proposals file the author accepts or rejects, and the version increments before governance runs. Marketing automation writes drafts into a dedicated folder and cannot publish, schedule, or overwrite finished work. Draft-status content cannot enter a published file. Figure placeholders are a gate failure rather than a silent pass.

That last group is the part worth dwelling on. Everyone building with AI right now says a human is in the loop. The question is whether the loop is *enforced* or merely *intended*. An instruction that says "I approve every piece" is intent. A compile step that reads a `status` field and refuses to include anything not marked approved is enforcement. Only one of them survives a tired Tuesday.

---

## What shipped

- **Nine aligned phase prompts**, each with its position, entry gate, exit gate, and deliverables stated at the top
- **A master pipeline overview** that acts as the tie-breaker for paths, gates, folders, and deliverables — the document that wins when any two files disagree
- **A full changelog** documenting every correction, the assumptions behind it, and the dependencies it clarified
- **Placeholder tokenization**, so the pipeline could be released for other authors to adopt without carrying one book's folder structure
- **Public release** on GitHub, GPL-3.0

The work was done conversationally, in a single working session, against the live folder structure — reading the real chapter output to see what the phases actually produced rather than what they claimed to produce. That distinction found several of the problems. A phase that says it writes to `/Kindle/` and a folder that contains something else is a five-second discovery on disk and an invisible one on paper.

---

## The part we did not expect

The release picked up an automated code review on the pull request. Five findings, all legitimate: a table using shorthand trigger names, a scope claim that had quietly gone stale, a regex-looking file extension, an undefined version token, and a PowerShell snippet that would mangle its own output encoding.

Fixing the fifth one surfaced a sixth that the review had missed. The find-and-replace script used a standard hashtable, whose key order is not guaranteed — meaning `<BOOK>` could be substituted before `<BOOK_ROOT>` and leave every path in the repository reading `MYBOOK_ROOT>`. Silent, plausible-looking, and wrong in a way that would only show up once an author had already replaced everything.

That is the whole discipline in one example. Automated review is good at the thing it was pointed at. It is not good at the consequence two steps downstream. The review found a symptom; the fix found the actual bug; neither found the other.

---

## Why this matters beyond one book

Most AI workflow problems are not prompt problems. Prompts are the part people iterate on, so prompts are usually fine.

The failures live in the handoffs: the assumption one stage makes about what the previous one produced, the file nobody writes but everybody waits for, the approval step that exists as a sentence rather than as a check. These compound quietly. Each individual stage keeps passing its own review, while the system as a whole drifts toward output that nobody would have approved if they had seen it assembled.

Pipelines need what any other system needs — one source of truth, explicit contracts at every boundary, and enforcement where the stakes are real.

---

## Capabilities demonstrated

Multi-stage AI workflow architecture · Content governance and validation design · Source-of-truth hierarchy modeling · Local LLM and RAG ingestion design · Publishing production systems (EPUB, Kindle, print, audiobook) · Automation orchestration with n8n · Human-in-the-loop approval design · Technical documentation and open-source release

---

**The pipeline is public.** Nine phase prompts, a master overview, and a placeholder guide for adapting it to your own book: [github.com/Fluxline-Pro/fluxline-rcf-book-pipeline](https://github.com/Fluxline-Pro/fluxline-rcf-book-pipeline)

*Have a workflow that has stopped agreeing with itself? [Let's talk.](/contact)*
