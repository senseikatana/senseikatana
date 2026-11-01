---
title: Explanation
description: Why KatanaKit is built the way it is — goals, trade-offs and the decision records behind the architecture.
---

# Explanation

These pages are for understanding, not for doing. They explain how and why the
library is built the way it is, so you can change it — or decide not to use
it — with the full picture.

- **[Why KatanaKit](/explanation/why-katanakit)** — the goals behind the
  toolkit, its design stance and the cases where it is the wrong tool.
- **[Architecture](/guides/architecture)** — the hexagonal layout, layer by
  layer, and the design patterns that hold it together.
- **[Service architecture](/explanation/service-architecture)** — why every
  service is a Singleton facade: the Singleton/Facade/Observer/Strategy/DI
  vocabulary, the `use*` vs `on*` naming rule, and how the core stays free of
  I/O.
- **[Decisions (ADRs)](/explanation/decisions/)** — the numbered records of
  decisions with consequences: what was chosen, and what it costs.

Task-oriented pages live in the [Guides](/guides/services/) section; exact
facts live in the generated [API Reference](/api/).
