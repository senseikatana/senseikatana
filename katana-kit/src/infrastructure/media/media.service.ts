import { useIsBrowser } from "@/infrastructure/dom/dom.service.js";

/**
 * Hydrates click-to-play facades rendered by `useBuildVideoEmbed`.
 * SSR-safe: no-op outside the browser, no side effects on import.
 * Call once per page (Astro/React/Vue/MDX `useEffect` or inline script).
 *
 * @param root - Scope element or document (defaults to `document`).
 * @returns Cleanup function removing the delegated listener.
 *
 * @example
 * ```ts
 * useEnhanceVideoFacades(); // click on [data-video-facade] swaps in the iframe
 * ```
 */
export function useEnhanceVideoFacades(root?: ParentNode): () => void {
	if (!useIsBrowser()) return () => undefined;
	const scope = root ?? document;

	const onClick = (event: Event): void => {
		const target = event.target as HTMLElement | null;
		const button = target?.closest?.("[data-video-facade]") as HTMLButtonElement | null;
		if (!button || !scope.contains(button)) return;
		const src = button.getAttribute("data-video-facade");
		if (!src) return;
		const label = button.getAttribute("aria-label") ?? "Embedded video";
		const iframe = document.createElement("iframe");
		iframe.src = src;
		iframe.title = label;
		iframe.loading = "lazy";
		iframe.referrerPolicy = "strict-origin-when-cross-origin";
		iframe.allow =
			"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
		iframe.allowFullscreen = true;
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.style.border = "0";
		button.replaceWith(iframe);
	};

	scope.addEventListener("click", onClick);
	return () => scope.removeEventListener("click", onClick);
}
