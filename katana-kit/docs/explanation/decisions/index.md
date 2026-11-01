---
title: Decision records (ADR)
description: Numbered records of the decisions that are hard to reverse — context, decision and consequences.
---

# Decision records (ADR)

A short numbered record per decision that is hard to reverse: a dependency, a
public contract, a piece of the architecture. Each record states the context,
the decision and its consequences — good and bad — so that whoever meets the
code later (a teammate, your future self, an AI agent) can tell a deliberate
choice from an oversight **before** changing it.

## Format

- **Status** — `Accepted`, or `Superseded by ADR-XXXX`.
- **Date** — when the decision shipped (its release).
- **Context** — the forces that led to the decision.
- **Decision** — what was decided, stated in the present tense.
- **Consequences** — what gets better, and what gets worse.

Approved records are never rewritten. If the team changes its mind, a new
record is written and the old one is marked *superseded by* it — like a new
log entry that does not cross out the previous one. Nothing here is an
implementation detail: the [Architecture](/guides/architecture) page and the
[API Reference](/api/) cover those.

## Records

| # | Decision | Status | Date |
| --- | --- | --- | --- |
| [ADR-0001](/explanation/decisions/adr-0001-safe-results) | Safe Results instead of exceptions | Accepted | 2026-09-26 |
| [ADR-0002](/explanation/decisions/adr-0002-singleton-facades) | Singleton facades exposed as `use*` functions | Accepted | 2026-10-04 |
| [ADR-0003](/explanation/decisions/adr-0003-adapter-subpath-exports) | Framework adapters only on subpath exports | Accepted | 2026-09-20 |
| [ADR-0004](/explanation/decisions/adr-0004-hexagonal-core) | Hexagonal layout with a pure core | Accepted | 2026-09-03 |
| [ADR-0005](/explanation/decisions/adr-0005-docs-as-code) | Docs as code: generated reference, four page kinds | Accepted | 2026-09-26 |
| [ADR-0006](/explanation/decisions/adr-0006-retire-telegram-whatsapp-adapters) | Retire the Telegram and WhatsApp adapters | Accepted (amends ADR-0003) | 2026-10-18 |
| [ADR-0007](/explanation/decisions/adr-0007-wordpress-roles-declared-not-created) | WordPress roles are declared in the app, not created over REST | Accepted | 2026-10-18 |
| [ADR-0008](/explanation/decisions/adr-0008-access-is-three-orthogonal-axes) | Access is three orthogonal axes, not one role ladder | Accepted | 2026-10-18 |
| [ADR-0009](/explanation/decisions/adr-0009-alias-imports-in-src) | The `@/` alias is used in `src/`, rewritten by `tsc-alias` | Accepted | 2026-10-18 |
| [ADR-0010](/explanation/decisions/adr-0010-use-prefix-on-callbacks) | The `use*` prefix is kept; `on*` is reserved for Observer callbacks | Accepted | 2026-10-19 |
| [ADR-0011](/explanation/decisions/adr-0011-no-static-business-methods) | No static business methods — Singleton plus DI instead | Accepted | 2026-10-19 |
| [ADR-0012](/explanation/decisions/adr-0012-currency-adapter-in-infrastructure) | The currency rate adapter lives in `src/infrastructure/` | Accepted | 2026-10-19 |
| [ADR-0013](/explanation/decisions/adr-0013-round-money-with-intl) | Money is rounded with `Intl.NumberFormat`, not `Math.round` | Accepted | 2026-10-19 |
| [ADR-0014](/explanation/decisions/adr-0014-frankfurter-ecb-rates) | Frankfurter/ECB reference rates behind the provider port | Accepted | 2026-10-19 |
| [ADR-0015](/explanation/decisions/adr-0015-cross-rates-through-a-pivot) | Cross-rates divide through a pivot currency | Accepted | 2026-10-19 |
| [ADR-0016](/explanation/decisions/adr-0016-universal-runtime-apis-in-core) | Universal runtime APIs in the core | Accepted (amends ADR-0004) | 2026-10-25 |

## Adding a record

Copy the shape of an existing record, number it sequentially and open it in the
same pull request as the change it describes. The
[contributing contract](https://github.com/senseikatana/katanakit-js/blob/dev/CONTRIBUTING.md)
lists what counts as a decision: a new runtime dependency, a public contract
change, an architecture move.
