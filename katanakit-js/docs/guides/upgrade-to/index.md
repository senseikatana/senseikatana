---
title: Upgrade Guides
description: Per-major migration guides for KatanaKit — what broke, what was deprecated, and the exact change to make in your code.
---

# Upgrade Guides

KatanaKit follows semantic versioning, and every major ships its own
migration guide. Each one answers the same three questions in the same order:

1. **What broke** — the changes that stop your code compiling or change its
   behaviour.
2. **What is deprecated** — announced here before it breaks, so you can move
   ahead of the next major.
3. **What changed** — additions and internal reworks that need no action.

| From | To | Guide |
| ------------------ | -------------------------- | ------------------------------ |
| 5.2.x (and 5.x) | **v6** — current major | [Upgrade to v6](./v6) |
| 4.x | v5 | [Upgrade to v5](./v5) |
| 3.x | v4 | [Upgrade to v4](./v4) |
| 2.x | v3 | [Upgrade to v3](./v3) |
| 1.x | v2 | [Upgrade to v2](./v2) |

::: tip Patch and minor releases never break
Within a major, upgrades are `npm install katanakit-js@^6`. Breaking changes
only ever land in a `.0.0` release; the rest of the story lives in the
[changelog](/changelog).
:::

## Not sure where you are?

```bash
npm ls katanakit-js
```

Then follow the guide for the next major after your version and keep going —
the guides are written to be applied in order, and each one assumes the state
left behind by the previous one.
