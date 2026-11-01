---
title: PhotoSwipe
description: Lightbox adapter with DOM-selector options — works from Astro, React, Vue or a plain script.
---

# PhotoSwipe

[`PhotoSwipe`](https://photoswipe.com) is a vanilla-JS lightbox (pinch, swipe, zoom,
accessible). It ships its own TypeScript types — no need to generate them — and
this adapter wraps it with **DOM-selector options**, so the same call works in any
library or with no library at all.

## Install

```bash
bun add photoswipe
```

`photoswipe` is an **optional peer dependency**: it is only loaded when you call
the adapter, and only bundles into pages that use it.

## DOM contract

Each gallery is a container whose slides are links to the full image:

```html
<div data-pswp>
  <a href="/photos/large-1.jpg" data-pswp-width="1600" data-pswp-height="1067">
    <img src="/photos/thumb-1.jpg" alt="Sunset" />
  </a>
  <!-- more slides… -->
</div>
```

| Attribute              | Purpose                              |
| ---------------------- | ------------------------------------ |
| `data-pswp`            | Gallery container (the selector)     |
| `data-pswp-width/height` | Size of the full image, for zooming |
| `href`                 | Full-size image URL                  |

## Options locate everything by selector

```ts
import "photoswipe/photoswipe.css";
import { usePhotoSwipe } from "katanakit-js/adapters/photoswipe";

const result = await usePhotoSwipe({
	gallery: "[data-pswp]", // any CSS selector, one or many galleries
	children: "a", // clickable slides inside each gallery
	root: "#widget", // optional: resolve `gallery` inside this element
	lightbox: { bgOpacity: 0.9 }, // passed straight to PhotoSwipeLightbox
});

if (!result.ok) console.warn(result.error.message);
```

- **`gallery`** — CSS selector for one or more containers (default `[data-pswp]`).
- **`children`** — CSS selector for the slides (default `a`).
- **`root`** — element, selector or `null` (document) used to resolve `gallery`,
  so a gallery inside a dialog/widget can be bound without global selectors.
- **`lightbox`** — every PhotoSwipe option (`bgOpacity`, `showHideAnimationType`, …).

Calls **never throw**: everything returns a Safe Result `{ data, error, ok }`.

## In Astro

Put the script at the end of the `.astro` file — it runs on the client, after the
markup exists:

```astro
---
// src/pages/gallery.astro
---

<div data-pswp>
  <a href="/photos/large-1.jpg" data-pswp-width="1600" data-pswp-height="1067">
    <img src="/photos/thumb-1.jpg" alt="Sunset" />
  </a>
</div>

<script>
  import "photoswipe/photoswipe.css";
  import { usePhotoSwipe } from "katanakit-js/adapters/photoswipe";

  const result = await usePhotoSwipe();
  if (!result.ok) console.warn(result.error.message);

  // With Astro view transitions, rebind after every swap:
  document.addEventListener("astro:page-load", () => void usePhotoSwipe());
</script>
```

Re-calling `usePhotoSwipe()` is **idempotent**: elements that already have a
listener are skipped, so late-rendered galleries (SPA mounts, view transitions,
infinite scroll) get bound without opening twice.

## Opening a slide programmatically

```ts
import { usePhotoSwipe, usePhotoSwipeOpen } from "katanakit-js/adapters/photoswipe";

await usePhotoSwipe({ gallery: "#hero" });

// From the DOM: open the 3rd slide of the first gallery
await usePhotoSwipeOpen(2);

// Without DOM markup: pure data (virtual lists, slideshows)
await usePhotoSwipeOpen(0, [
	{ src: "/a.jpg", width: 1600, height: 1067, alt: "A" },
	{ src: "/b.jpg", width: 1600, height: 1067, alt: "B" },
]);
```

## SSR and teardown

| Function                    | Behaviour                                                     |
| --------------------------- | ------------------------------------------------------------- |
| `usePhotoSwipeSupported()`  | `false` during SSR/prerender — nothing touches `document`      |
| `usePhotoSwipe(options)`    | Safe Result; errors instead of throwing on SSR or no match    |
| `usePhotoSwipeOpen(i, data)`| Opens a slide, binding the lightbox on demand                 |
| `usePhotoSwipeDestroy()`    | Closes and unbinds — for SPA route teardown                   |

```ts
if (usePhotoSwipeSupported()) {
	await usePhotoSwipe();
}
```
