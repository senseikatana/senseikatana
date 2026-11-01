import type { DataSource, PhotoSwipeOptions, SlideData } from "photoswipe";
import type PhotoSwipeLightbox from "photoswipe/lightbox";

import type { SafeResult } from "@/types/index.js";

/** Error carried by every PhotoSwipe call — never thrown. */
export interface PhotoSwipeError {
	message: string;
	details?: unknown;
}

export type PhotoSwipeResult<T> = SafeResult<T, PhotoSwipeError>;

/**
 * DOM-first configuration: every element is located by CSS selector, so the
 * adapter works from any framework — Astro, React, Vue or a plain `<script>`.
 */
export interface PhotoSwipeGalleryOptions {
	/**
	 * CSS selector resolving one or more gallery containers.
	 *
	 * @defaultValue `"[data-pswp]"`
	 */
	gallery?: string;
	/**
	 * CSS selector for the clickable slides inside each gallery.
	 *
	 * @defaultValue `"a"`
	 */
	children?: string;
	/**
	 * Scope used to resolve `gallery` — an element, a selector or `null` for
	 * `document`. Lets you bind a gallery rendered inside a widget/dialog.
	 */
	root?: ParentNode | string | null;
	/** Passed straight to `PhotoSwipeLightbox` (`bgOpacity`, `showHideAnimationType`, …). */
	lightbox?: PhotoSwipeOptions;
}

const DEFAULT_GALLERY = "[data-pswp]";
const DEFAULT_CHILDREN = "a";

/** Cached lightbox — one per page, rebound whenever the DOM gains galleries. */
let lightbox: PhotoSwipeLightbox | null = null;
/** Options the instance was last bound with, so a refresh keeps the selectors. */
let lastOptions: PhotoSwipeGalleryOptions = {};

function failure(message: string, details?: unknown): PhotoSwipeResult<never> {
	return { data: null, error: { message, details }, ok: false };
}

function resolveRoot(root: PhotoSwipeGalleryOptions["root"]): ParentNode {
	if (!root) return document;
	if (typeof root === "string") return document.querySelector<HTMLElement>(root) ?? document;
	return root;
}

function describeRoot(root: ParentNode): string {
	if (root === document) return "document";
	const element = root as Element;
	return element.tagName
		? `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}`
		: "unknown";
}

async function loadLightboxClass(): Promise<typeof PhotoSwipeLightbox | null> {
	try {
		const module = await import("photoswipe/lightbox");
		return module.default;
	} catch {
		return null;
	}
}

/**
 * Binds PhotoSwipe to every gallery matching the DOM selectors.
 *
 * Call it once the markup exists; call it again (same or new options) whenever
 * the DOM gains galleries — rebinding is idempotent, already-bound elements are
 * left untouched. The lightbox module is imported lazily, so nothing touches
 * `document` during SSR/prerender.
 *
 * @param options - CSS selectors and PhotoSwipe lightbox options
 * @returns Safe result with the live `PhotoSwipeLightbox`, never throws
 *
 * @example Astro — `.astro` file, at the end of the component
 * ```astro
 * <div data-pswp>
 *   <a href="/large-1.jpg" data-pswp-width="1600" data-pswp-height="1067">
 *     <img src="/thumb-1.jpg" alt="Sunset" />
 *   </a>
 * </div>
 *
 * <script>
 *   import "photoswipe/photoswipe.css";
 *   import { usePhotoSwipe } from "katanakit-js/adapters/photoswipe";
 *
 *   const result = await usePhotoSwipe({ gallery: "[data-pswp]", children: "a" });
 *   if (!result.ok) console.warn(result.error.message);
 * </script>
 * ```
 */
export async function usePhotoSwipe(
	options: PhotoSwipeGalleryOptions = {},
): Promise<PhotoSwipeResult<PhotoSwipeLightbox>> {
	if (typeof document === "undefined") {
		return failure("[PhotoSwipe] browser only — there is no `document` in this environment.");
	}

	lastOptions = options;
	const gallerySelector = options.gallery ?? DEFAULT_GALLERY;
	const children = options.children ?? DEFAULT_CHILDREN;
	const root = resolveRoot(options.root);
	const galleries = Array.from(root.querySelectorAll<HTMLElement>(gallerySelector));

	if (galleries.length === 0) {
		return failure(`[PhotoSwipe] no gallery matched "${gallerySelector}".`, {
			root: describeRoot(root),
			gallery: gallerySelector,
		});
	}

	const Lightbox = await loadLightboxClass();
	if (!Lightbox) {
		return failure(
			"[PhotoSwipe] cannot load `photoswipe/lightbox` — install it with `bun add photoswipe`.",
		);
	}

	if (!lightbox) {
		lightbox = new Lightbox({
			...options.lightbox,
			gallery: galleries,
			children,
			pswpModule: () => import("photoswipe"),
		});
		lightbox.init();
		return { data: lightbox, error: null, ok: true };
	}

	// Re-resolve the selector and re-bind: `init()` only adds listeners to
	// elements that do not have one yet, so repeated calls are safe.
	lightbox.options.gallery = galleries;
	lightbox.options.children = children;
	lightbox.init();
	return { data: lightbox, error: null, ok: true };
}

/**
 * Opens the gallery at `index`, optionally from a data array instead of DOM
 * markup (useful for virtual lists or a slideshow without thumbnails).
 *
 * @param index - Zero-based slide index
 * @param dataSource - Optional slide data (`src`, `width`, `height`, `alt`)
 * @returns Safe result with `true` when the lightbox opened
 *
 * @example
 * ```ts
 * await usePhotoSwipe({ gallery: "#hero" });
 * await usePhotoSwipeOpen(2, [
 *   { src: "/a.jpg", width: 1600, height: 1067, alt: "A" },
 * ]);
 * ```
 */
export async function usePhotoSwipeOpen(
	index = 0,
	dataSource?: DataSource,
): Promise<PhotoSwipeResult<boolean>> {
	if (!lightbox) {
		const bound = await usePhotoSwipe(lastOptions);
		if (!bound.ok) return failure(bound.error.message, bound.error.details);
	}
	if (!lightbox?.loadAndOpen(index, dataSource)) {
		return failure(`[PhotoSwipe] could not open slide ${index}.`, { index });
	}
	return { data: true, error: null, ok: true };
}

/**
 * Destroys the cached lightbox (closes it and unbinds its listeners) so a
 * single-page app can drop a gallery without a full reload.
 *
 * @returns Safe result with `true` when something was destroyed
 */
export function usePhotoSwipeDestroy(): PhotoSwipeResult<boolean> {
	if (!lightbox) return failure("[PhotoSwipe] no lightbox to destroy.");
	lightbox.destroy();
	lightbox = null;
	lastOptions = {};
	return { data: true, error: null, ok: true };
}

/**
 * Whether {@link usePhotoSwipe} can run — `false` during SSR/prerender.
 *
 * @example
 * ```ts
 * if (usePhotoSwipeSupported()) await usePhotoSwipe();
 * ```
 */
export function usePhotoSwipeSupported(): boolean {
	return typeof document !== "undefined";
}

/** Slide shape accepted by {@link usePhotoSwipeOpen} — re-exported for callers. */
export type PhotoSwipeSlide = SlideData;
