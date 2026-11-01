---
title: Modal
description: Native dialog in the top layer, with a focus trap, a portal, and focus restoration.
---

# Modal <span class="vp-new-badge">new</span>

```ts
import { MAX_OPEN_DIALOGS, modal } from "@katanakit/ui";

modal.open({
	title: "Delete project?",
	message: "This cannot be undone.",
	footer: actions,
});
```

Built on the native `<dialog>` element, so it runs in the browser's top layer with
a real backdrop. On top of that the component adds the two things the native
behaviour leaves open: an explicit <kbd>Tab</kbd> cycle, and a guard that pulls
focus back when it escapes.

No JSX, no framework runtime — the same call works from Astro, Nuxt or a plain
script.

<ClientOnly>
  <div class="modal-demo-row">
    <button type="button" class="btn btn--primary" @click="openSimple">Open dialog</button>
    <button type="button" class="btn btn--danger" @click="openNested">Open two, nested</button>
    <button type="button" class="btn btn--secondary" @click="openForm">Open with a form</button>
  </div>
</ClientOnly>

## The portal decision

The component owns the portal: it appends to `document.body` and removes itself
on close. Leaving the portal to the consumer keeps the factory "pure" at the cost
of making every call site wire up the portal, the focus restoration and the
scroll lock — and getting that wiring wrong does not throw, it **fails as
inaccessible**. Focus lands nowhere and the keyboard user is stranded.

Pass `container` to send it somewhere else — a shadow root, or a subtree when you
need the dialog scoped:

```ts
const host = document.querySelector("#drawer-host");
modal.open({ title: "Rename", container: host });
```

## Focus

| Behaviour | What happens |
| --- | --- |
| On open | Focus moves to `initialFocus`, else the first focusable child, else the dialog |
| <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> | Cycles inside the dialog and wraps at both ends |
| Focus escapes | A `document`-level `focusin` guard pulls it back |
| On close | Focus returns to whatever was focused before `open()` |
| Nested dialogs | Closing the inner one restores focus to the outer dialog, not to the detached inner target |

That last row is the reason the restore logic checks the open-dialog stack before
the saved target: a nested dialog's opener often lives inside the dialog that is
itself closing, and focusing it would trap focus in a detached subtree.

`returnFocus: false` opts out, for flows that deliberately move focus elsewhere —
for example, navigating to a confirmation screen after the dialog closes.

::: tip The close button is a real control
It stays in the <kbd>Tab</kbd> order and keeps its accessible name. That matters
when `dismissOnEscape: false` disables both <kbd>Escape</kbd> and the backdrop:
the button is then the **only** way out, and a keyboard-only user would otherwise
be stranded. The dialog is always labelled by its heading, never by that button.
:::

## Scroll lock

Opening a dialog sets `body { overflow: hidden }`; closing restores whatever the
value was before. The counter is refcounted, so closing one dialog while another
is still open does not release the page — the failure mode would be a scrollable
page behind an open modal.

## Options

| Option             | Type                          | Default              | Notes                                                        |
| ------------------ | ----------------------------- | -------------------- | ------------------------------------------------------------ |
| `title`            | `string`                      | —                    | Rendered as `<h2>` and wired via `aria-labelledby`.          |
| `ariaLabel`        | `string`                      | `"Dialog"`           | Accessible name. Set it when there is no `title`.            |
| `message`          | `string`                      | —                    | Short body. Ignored when `content` is set.                   |
| `content`          | `string \| Node`              | —                    | Arbitrary body. Strings go through `textContent`, never HTML.|
| `footer`           | `string \| Node`              | —                    | Footer row. Same insertion rules as `content`.               |
| `size`             | `"sm" \| "md" \| "lg" \| "full"` | `"md"`             | Validated at runtime, not trusted.                           |
| `dismissible`      | `boolean`                     | `true`               | Renders the close button.                                    |
| `dismissOnEscape`  | `boolean`                     | `true`               | <kbd>Escape</kbd> and backdrop clicks.                       |
| `closeLabel`       | `string`                      | `"Close dialog"`     | Accessible name for the close button.                        |
| `container`        | `HTMLElement \| null`         | `document.body`      | Portal target. Must be in the document.                       |
| `initialFocus`     | `HTMLElement \| null`         | first focusable      | Where focus lands on open. Must be inside the dialog.        |
| `returnFocus`      | `boolean`                     | `true`               | Restore focus to the opener on close.                        |
| `onClose`          | `(id: string) => void`        | —                    | Called once the dialog leaves the DOM.                       |

A `role="dialog"` with neither `aria-labelledby` nor `aria-label` is announced as
nothing when it opens, so a dialog with no `title` falls back to `ariaLabel`.

## Limits

**At most `MAX_OPEN_DIALOGS` dialogs are open at once.** Opening a sixth
evicts the oldest. Without a cap, a loop that opens one dialog per record grows
the top layer without bound, and every dialog would add itself to the
focus-trap work.

**`container` must already be attached.** A detached target throws rather than
mounting an invisible dialog and leaving the page scroll-locked:

```ts
modal.open({ container: host.shadowRoot }); // host not in the document yet — throws
```

**`initialFocus` must be inside the dialog.** The focus guard pulls focus back
from anywhere else, so pointing it at an outside element has no lasting effect.

**`container` must belong to the current document.** A node from another document is
refused rather than half-supported: `focusin` does not cross a document
boundary either, so the focus guard would never fire.

**`content` and `footer` nodes are moved, not copied.** Passing the same `Node` to a
second `open()` rips it out of the first dialog.

## Store API

| Method             | Returns        | Notes                                        |
| ------------------ | -------------- | -------------------------------------------- |
| `open(options?)`   | `ModalHandle`  | Opens a dialog.                              |
| `close(id?)`       | `void`         | One by id, or every open dialog when omitted. |
| `closeAll()`       | `void`         | Every open dialog.                           |

`ModalHandle` is `{ id, dialog, close() }` — `dialog` is the `<dialog>` element,
for content the options could not express. `modal` and `useModalStore()` hand
back the same singleton; `ModalService.getInstance()` is the DI escape hatch.

```ts
const handle = modal.open({ title: "Loading" });

// later
handle.close();
```

## Content is never parsed as HTML

`content` and `footer` accept a `string`, and a string is always inserted with
`textContent`. Markup in a server response or a user field renders as visible
text, not as elements:

```ts
modal.open({ message: await res.text() }); // safe
```

For real markup, pass a `Node` you built yourself:

```ts
const form = document.createElement("form");
form.innerHTML = "<input name='email' required>"; // your markup, your rules
modal.open({ title: "Sign up", content: form });
```

## SSR

`modal.*` throws only when a method is called, never on import — so the facade is
safe to pull into a module that also runs on the server. `modalClass()` and
`modalContainerClass()` are pure and need no DOM.

<ComponentContract
	name="Modal"
	root="modal"
	pure="modalClass"
	factory="modal.open"
/>

<style scoped>
.modal-demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: var(--spacing-3);
	margin: var(--spacing-4) 0;
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";

import { modal } from "@katanakit/ui";

onMounted(() => {
	// The facade resolves on call, so importing it during SSR is safe and
	// nothing here touches the DOM until a handler fires.
	const open = (options?: Record<string, unknown>) => modal.open(options);

	(window as unknown as { openSimple: () => void }).openSimple = () =>
		open({
			title: "Delete project?",
			message: "This removes the project and every deployment it has. It cannot be undone.",
			size: "md",
		});

	(window as unknown as { openNested: () => void }).openNested = () => {
		open({ title: "Outer dialog", message: "Now open the inner one." });
		open({ title: "Inner dialog", message: "Closing this returns focus to the outer one." });
	};

	(window as unknown as { openForm: () => void }).openForm = () => {
		const form = document.createElement("div");

		const field = document.createElement("input");
		field.type = "email";
		field.placeholder = "you@example.com";
		field.className = "input";
		form.append(field);

		const actions = document.createElement("div");
		actions.className = "modal__footer";

		const cancel = document.createElement("button");
		cancel.type = "button";
		cancel.className = "btn btn--ghost";
		cancel.textContent = "Cancel";
		cancel.addEventListener("click", () => modal.closeAll());

		const save = document.createElement("button");
		save.type = "button";
		save.className = "btn btn--primary";
		save.textContent = "Save";
		save.addEventListener("click", () => modal.closeAll());

		actions.append(cancel, save);
		open({ title: "Change email", content: form, footer: actions, initialFocus: field });
	};
});
</script>