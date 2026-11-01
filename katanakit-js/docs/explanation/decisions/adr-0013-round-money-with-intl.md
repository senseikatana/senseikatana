---
title: "ADR-0013: Money is rounded with Intl.NumberFormat, not Math.round"
description: converted is rounded to exactly 2 decimals with Intl's symmetric half-expand rule; Math.round's asymmetry on negatives is unacceptable for money.
---

# ADR-0013: Money is rounded with `Intl.NumberFormat`, not `Math.round`

**Status:** Accepted · **Date:** 2026-10-19

## Context

A conversion like `amount * rate` produces something like `88.865515`. The kit
decided `converted` is money and must carry exactly 2 decimals. The obvious
implementation is `Math.round(value * 100) / 100` — one line, no dependencies.

The problem is the rule `Math.round` actually implements: it rounds **half
towards `+∞`**, not half away from zero. `Math.round(-1.005 * 100) / 100` is
`-1`, not `-1.01`; `Math.round(1.005 * 100) / 100` is `1.01`. The same decimal
magnitude rounds in opposite directions depending on the sign of the amount —
a refund and its charge would not cancel out. Float representation
(`1.005 * 100` is `100.49999…`) compounds the confusion with cases that look
like rounding bugs but are binary representation.

Money code that is asymmetric under negation is a defect even if nobody
notices on day one.

## Decision

`converted` is rounded to exactly 2 decimals through `Intl.NumberFormat`
(`minimumFractionDigits` = `maximumFractionDigits` = `2`, no grouping),
formatted and parsed back to a number. `Intl` implements the **symmetric
half-expand** rule: `-1.005` and `1.005` round to `-1.01` and `1.01`. The rate
itself is never rounded — it keeps the full precision the source reported.

## Consequences

**Better.** Rounding is symmetric, decimal-first and locale-independent where
it matters (the `en-US` pattern used for the round trip uses `.` as the
separator). It matches what invoicing and accounting software do, so totals
reconcile when a charge and its refund are computed independently. The same
machinery is already in the dependency graph (`Intl` is built in), so the cost
is one small private helper.

**Worse.** The round trip `format → parse` is heavier than an arithmetic
expression, and the precision is fixed at 2 decimals — currencies with 0 or 3
decimal places in *accounting* use (JPY, BHD) are rounded to 2 like everything
else. Callers who need a different precision must compute from `rate`
themselves. And half-expand is still an approximation of exact decimal
arithmetic; for ledger-grade settlement, compute in integer minor units.

**Also.** `Math.round` remains correct for counts and indexes. The rule is
about money: amounts that a human will read as a price go through `Intl`.
