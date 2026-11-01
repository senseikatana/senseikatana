---
title: Toast
description: Transient notifications with a live-region stack, pause-on-hover countdown and a programmatic manager.
---

# Toast <span class="vp-new-badge">new</span>

```ts
import { toast } from "@katanakit/ui";

toast.success("Profile saved.");
toast.error("Upload failed.", { duration: 0 });
```

The `toast` export is a lazy facade over a per-page singleton: importing it during
SSR is safe, and `document` is only touched when a method actually runs.

`toastClass()` and `toastContainerClass()` return plain class strings for SSR
markup, `useToast()` builds a single detached element when you own the lifecycle
yourself, and `useToastStore()` is the same store as `toast` under the `use*`
accessor convention.

No JSX, no framework runtime — the store talks to `document.body` directly, so the
same code works from Astro, Nuxt, plain Node scripts or a static page.

::: tip Names
The call shape follows [react-toastify](https://fkhadra.github.io/react-toastify/),
but the option names are ours. `duration: 0` reads as "pin it open"; react-toastify's
`autoClose: false` reads like a boolean.
:::

## Variants

Five types. `error` escalates its own live region to `role="alert"`; everything else
is a polite `role="status"`. `loading` is indeterminate and stays pinned until you
dismiss or update it.

<ClientOnly>
  <div ref="variants" class="toast-demo"></div>
</ClientOnly>

```ts
import { toast } from "@katanakit/ui";

toast.info("Sync started.");
toast.success("Profile saved.");
toast.warning("Quota at 90%.");
toast.error("Upload failed.");
toast.loading("Uploading 3 files…");
```

## The loading → success pattern

`update()` swaps the content in place and keeps the id, position and stacking order,
so a progress toast never jumps around the screen.

<ClientOnly>
  <div class="toast-demo"><button type="button" class="btn btn--primary" @click="runUpload">Run the upload demo</button></div>
</ClientOnly>

```ts
const handle = toast.loading("Uploading 3 files…");

// later — the stack keeps the same slot
handle.update({ type: "success", message: "3 files uploaded." });
```

## Duration

Default is 5000 ms. `error` gets 8000 ms so it is not missed, and `loading` gets `0`
— pinned open. Pass `duration: 0` to pin any type.

| Type       | Default | Rationale                                     |
| ---------- | ------- | --------------------------------------------- |
| `info`     | 5000 ms | Reads at a glance.                            |
| `success`  | 5000 ms | Confirmation does not need extra time.        |
| `warning`  | 5000 ms |                                           |
| `error`    | 8000 ms | Should not vanish before it is read.          |
| `loading`  | pinned  | Only you know when the work finished.         |

## Pause on hover and focus

The countdown freezes on `mouseenter` and on `focusin`, and the progress bar freezes
with it via `animation-play-state` — the bar and the JS timer never desync. Keyboard
users get the same courtesy as mouse users.

<ClientOnly>
  <div class="toast-demo"><button type="button" class="btn btn--secondary" @click="runPause">Hover the toast</button></div>
</ClientOnly>

## Positions

Six anchors: `top-right` (default), `top-center`, `top-left`, `bottom-right`,
`bottom-center`, `bottom-left`. Each position gets its own stack, created lazily.

<ClientOnly>
  <div class="toast-demo toast-demo--wrap">
    <button type="button" class="btn btn--ghost" @click="runPositions">Show all six</button>
  </div>
</ClientOnly>

```ts
toast.info("Top right", { position: "top-right" });
toast.info("Bottom center", { position: "bottom-center" });
```

## Options

| Option        | Type                                              | Default  | Notes                                                     |
| ------------- | ------------------------------------------------- | -------- | --------------------------------------------------------- |
| `type`        | `"info" \| "success" \| "warning" \| "error" \| "loading"` | `"info"` | Colors and ARIA role.                                      |
| `title`       | `string`                                          | —        | Bold heading line.                                         |
| `message`     | `string`                                          | —        | Body text.                                                 |
| `size`        | `"sm" \| "md" \| "lg"`                            | `"md"`   |                                                           |
| `position`    | six-anchor union                                  | `"top-right"` | Stack to mount into.                                 |
| `duration`    | `number` (ms)                                     | per type | `0` pins the toast open.                                  |
| `dismissible` | `boolean`                                         | `true`   | Renders the close button.                                 |
| `closeLabel`  | `string`                                          | `"Dismiss notification"` | Accessible name for that button.              |
| `onClose`     | `(id: string) => void`                            | —        | Called once the toast leaves the DOM.                     |

<ComponentContract
	name="Toast"
	root="toast"
	pure="toastClass"
	factory="useToast"
/>

## Store API

| Method                  | Returns        | Notes                                                   |
| ----------------------- | -------------- | ------------------------------------------------------- |
| `show(options?)`        | `ToastHandle`  | Full control over every option.                         |
| `info(message, opts?)`  | `ToastHandle`  | Sugar for `show({ type: "info", message })`.             |
| `success(message, …)`   | `ToastHandle`  |                                                           |
| `warning(message, …)`   | `ToastHandle`  |                                                           |
| `error(message, …)`     | `ToastHandle`  | Assertive role.                                          |
| `loading(message, …)`   | `ToastHandle`  | Pinned open.                                             |
| `dismiss(id?)`          | `void`         | One by id, or every toast when omitted.                  |
| `clear()`               | `void`         | Every toast across all positions.                        |

`ToastHandle` is `{ id, update(partial), dismiss() }`. `toast` and `useToastStore()`
hand back the same singleton object, so you can pass the notifier around without
wiring a local `const`:

```ts
import { useToastStore } from "@katanakit/ui";

function notifyUser(notifier = useToastStore()) {
	notifier.success("Done.");
}
```

For call sites that cannot import a factory at all — a DI container, a framework
plugin wiring — `ToastService.getInstance()` returns the identical store:

```ts
ToastService.getInstance().success("Done.");
```

## Pure helpers

| Helper                 | Returns                        | Use for                                   |
| ---------------------- | ------------------------------ | ----------------------------------------- |
| `toastClass(options)`  | `string`                       | `class={toastClass({ type: "success" })}` |
| `toastContainerClass()`| `string`                       | The stack wrapper in a template.          |

Both are pure and SSR-safe: no DOM, no state, just stable strings.

## Accessibility

- The stack is `role="region"` + `aria-live="polite"` + `aria-label="Notifications"`.
- Each toast is `role="status"`, escalating to `role="alert"` for `error`.
- Status icons are inline SVG marked `aria-hidden="true"` — the message carries the
  meaning, so the glyph is decorative.
- The countdown bar is `aria-hidden="true"`; it is a timing cue, not content.
- `prefers-reduced-motion: reduce` removes every animation and the slide-in transform.

::: info SSR
`toast.*`, `useToast()` and `useToastContainer()` need a DOM and throw with a
pointer to the fix — but only when called, never on import. On the server use
`toastClass()` and `toastContainerClass()`, which are pure.
:::

```astro
---
// Astro: markup from the pure surface, behaviour from a client script
import { toastClass, toastContainerClass } from "@katanakit/ui";
---

<div class={toastContainerClass({ position: "top-right" })} role="region" aria-label="Notifications">
  <div class={toastClass({ type: "success" })} role="status">
    <div class="toast__content"><p class="toast__message">Deployed.</p></div>
  </div>
</div>

<script>
  import { toast } from "@katanakit/ui";
  toast.success("Deployed.");
</script>
```

<style scoped>
.toast-demo {
	display: flex;
	gap: var(--spacing-3);
	align-items: flex-start;
	margin: var(--spacing-4) 0;
}

.toast-demo--wrap {
	flex-wrap: wrap;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { toast, useToast } from "@katanakit/ui";

// Importing is SSR-safe — only *calling* these needs a DOM. VitePress evaluates
// this block during SSR, so every call is inside `onMounted` or a click handler,
// never at module scope.
const variants = ref<HTMLElement>();

onMounted(() => {
	const host = variants.value;
	if (!host) return;

	// `useToast()` builds one element with no viewport pinning and no timer —
	// the right tool for a static inline demo.
	for (const [type, text] of [
		["info", "Sync started."],
		["success", "Profile saved."],
		["warning", "Quota at 90%."],
		["error", "Upload failed."],
	] as const) {
		host.append(useToast({ type, message: text }));
	}
});

function runUpload() {
	const handle = toast.loading("Uploading 3 files…", { position: "bottom-right" });
	window.setTimeout(() => handle.update({ type: "success", message: "3 files uploaded." }), 2500);
}

function runPause() {
	toast.success("Hover me — the countdown pauses.", { duration: 6000 });
}

function runPositions() {
	const spots = [
		["top-right", "Top right"],
		["top-center", "Top center"],
		["top-left", "Top left"],
		["bottom-right", "Bottom right"],
		["bottom-center", "Bottom center"],
		["bottom-left", "Bottom left"],
	] as const;

	for (const [position, label] of spots) {
		toast.info(label, { position, duration: 4000 });
	}
}
</script>