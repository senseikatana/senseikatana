---
title: "ADR-0005: Docs as code — generated reference, four page kinds"
description: Docs live in the repo and change with the code; the API reference is generated with TypeDoc; pages follow the four Diátaxis kinds.
---

# ADR-0005: Docs as code — generated reference, four page kinds

**Status:** Accepted · **Date:** 2026-09-26 (released in v5.2.0)

## Context

The documentation site went through three systems in 2026 (Docusaurus, then
MkDocs Material, then VitePress in September alone). The fragile part was
never the renderer — it was truth maintenance. Hand-written API reference
drifts silently every time a signature changes, and stale documentation is
worse than none: readers trust it and walk confidently in the wrong
direction. The changelog had the same problem: two copies, two truths.

## Decision

Documentation lives in the repository and travels with the code:

- **Same pull request.** Every change asks one question — *which document is
  no longer true because of this?* — and updates it in the same diff the
  reviewer sees.
- **Generated where possible.** The API reference (783 pages) is rendered by
  TypeDoc from JSDoc/TSDoc comments in `src/`; the changelog page is generated
  from `CHANGELOG.md`; both are gitignored and never hand-edited. Writing
  good doc comments is now writing the public docs.
- **Four page kinds.** Pages follow [Diátaxis](https://diataxis.fr/):
  tutorials (learning), how-to guides (tasks), reference (facts) and
  explanation (why) — one kind per page, so a reader in a hurry never lands in
  a lecture and a learner never gets stranded in an option table.
- **The "why" is recorded.** Decisions with consequences get a numbered
  record under [Decisions](/explanation/decisions/) instead of a paragraph
  buried in prose.

## Consequences

**Better.** The reference cannot lie about signatures — it is regenerated from
source on every docs build. Changelog and API each have exactly one home, and
reviewers see code and docs together, which is when missing docs are noticed.

**Worse.** JSDoc quality is now a publishing concern, not a nicety. Three doc
system migrations in a single month show the churn cost of the hosting side.
And the generated tree is large enough that it shapes the site: the API
sidebar is compacted to anchors because VitePress inlines the sidebar into
every page.

## Links

- [Contributing contract](https://github.com/senseikatana/katanakit-js/blob/dev/CONTRIBUTING.md) — what counts as a decision and how docs ship with code.
- [Decisions index](/explanation/decisions/) — the records this practice produced.
