---
title: Testing
description: The two test suites that cover the UI kit, what each one can prove, and how to run them.
---

# Testing

The kit runs two suites against different runtimes, because a component has two
halves and neither runtime covers both on its own.

| Suite | Command | Runtime | Proves |
| --- | --- | --- | --- |
| Unit | `bun run check` | jsdom | State, timers, DOM wiring, ARIA attributes, the `SSR` guards |
| Browser | `bun run test:e2e` | Chromium | The cascade, real animations, `animationend` timing, `prefers-reduced-motion` |
| Both | `bun run test:all` | | |

Coverage for the kit's components is measured by `bunx vitest run --coverage`
(see [CONTRIBUTING.md](https://github.com/senseikatana/katanakit-js/blob/dev/CONTRIBUTING.md#test-coverage)).
It does not gate `check` or `build`.

`bun run build` runs the unit suite as its gate. The browser suite is separate
because it needs a browser binary — run it before a release, not on every save.

## Why both are needed

jsdom has no animation engine, so `animationend` never fires there. The toast's
exit path therefore falls back to its `TOAST_EXIT_FALLBACK_MS` timer in every
unit test, which means **the real exit animation is unreachable from jsdom**.

That is not hypothetical. The exit path shipped with an unfiltered
`animationend` listener. Because `animationend` bubbles and the countdown bar
animates for exactly the dismiss duration, the bar's event won the race and
removed the toast with no animation at all. All 23 unit tests passed. The bug
was invisible until a browser was involved.

`tests/e2e/toast.browser.test.ts` asserts the exit structurally: it observes the
animation events the browser actually delivers and requires
`katana-toast-out` to be among them. Removal driven by the fallback timer cannot
produce that event, so the two paths are distinguishable without asserting on
wall-clock timings, which would be flaky.

## What the browser suite covers

- Component CSS is applied from the compiled stylesheet, with unprefixed classes.
- Component rules really are inside `@layer katana`.
- Unlayered rules beat the kit regardless of import order — the guarantee that
  makes the daisyUI coexistence deterministic.
- The exit animation runs and is what removes the node.
- The progress bar's own `animationend` does **not** remove the toast.
- Hover and focus freeze the countdown, and leaving resumes it.
- `prefers-reduced-motion: reduce` removes without waiting for the fallback.
- Live-region roles, the five-toast cap, close-button pruning, and `clear()`
  leaving no orphaned nodes.

## Fixture

`tests/e2e/fixture/index.html` is a static page that loads
`packages/ui/dist/styles.css` and `dist/index.js` and exposes `window.toast`.
`scripts/serve-fixture.mjs` serves it over http on port `4178` and rebuilds the UI
package first, so the assertions always run against the compiled output rather
than the SCSS source.

It has to be http rather than `file://`: both `@layer` resolution and animation
timing depend on the browser parsing the real stylesheet.

## Browsers

Playwright resolves Chromium from its local cache. Point it elsewhere with
`PLAYWRIGHT_CHROMIUM_PATH`:

```bash
PLAYWRIGHT_CHROMIUM_PATH=/usr/bin/chromium bun run test:e2e
```

## Adding a component

A new component should land with both halves:

1. A unit suite covering state, timers and ARIA — `packages/ui/tests/<name>.test.ts`.
2. Browser assertions for whatever it does that jsdom structurally cannot:
   animation, cascade layer, focus order, or anything timing-dependent.
3. A docs page carrying the `<ComponentContract>` block, so the contract stays
   stated in exactly one place.