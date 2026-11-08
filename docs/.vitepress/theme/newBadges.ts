import { siteSignals } from "./signals";

const BADGE_CLASS = "vp-new-badge";

/** Paths VitePress can put in the sidebar, normalised for comparison. */
function normalize(pathname: string): string {
	const [path] = pathname.split(/[?#]/);
	let value = path.replace(/\.html?$/, "").replace(/\.md$/, "");
	if (value.endsWith("/index")) value = value.slice(0, -"/index".length);
	if (value.length > 1 && value.endsWith("/")) value = value.slice(0, -1);
	return value || "/";
}

export function newPagePaths(): Set<string> {
	return new Set((siteSignals().newPages ?? []).map(normalize));
}

/**
 * Appends the daisyUI-style `new` pill to sidebar entries whose page changed
 * inside the release window. DOM-side because VitePress renders `text` as plain
 * text — there is no slot for per-item markup.
 */
export function decorateNewPages(paths: Set<string>): void {
	if (!paths.size || typeof document === "undefined") return;

	for (const anchor of document.querySelectorAll<HTMLAnchorElement>(".VPSidebar a[href]")) {
		const href = anchor.getAttribute("href");
		if (!href || !href.startsWith("/") || !paths.has(normalize(href))) continue;
		if (anchor.querySelector(`.${BADGE_CLASS}`)) continue;

		const badge = document.createElement("span");
		badge.className = BADGE_CLASS;
		badge.textContent = "new";
		anchor.append(badge);
	}
}
