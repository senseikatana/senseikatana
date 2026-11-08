import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type HeadConfig } from "vitepress";

import { defineSeoMetaConfig, useSeoMeta } from "./lib/seo.service.js";
import type { SiteConfig } from "./lib/site.config.js";

const SITE_ORIGIN = "https://senseikatana.com";
/** Every docs route lives under the language + section prefix. */
const DOCS_BASE = "/en/docs";
const DOCS_ORIGIN = `${SITE_ORIGIN}${DOCS_BASE}`;
const DOCS_OG_IMAGE = `${DOCS_ORIGIN}/images/social-card.jpg`;
const DOCS_KEYWORDS =
	"katanakit, typescript, hexagonal architecture, api, rest, graphql, safe results, zod, query client";

/** Docs site config consumed by the library's own SEO helpers (dogfooding). */
const docsSiteConfig: SiteConfig = defineSeoMetaConfig({
	site: DOCS_ORIGIN,
	title: "KatanaKit",
	description:
		"A sharp, framework-agnostic TypeScript service toolkit organized with hexagonal architecture.",
	lang: "en-US",
	author: "Sergio Jurado",
	ogImage: DOCS_OG_IMAGE,
	rss: { enabled: false, path: "/rss.xml", limit: 20 },
	seo: { noindex: false, canonical: true, openGraph: true, twitterCard: true, jsonLd: true },
});

/** Canonical URL for a page (`index.md` maps to the section root). */
function pageUrl(relativePath: string): string {
	const clean = relativePath
		.replace(/(^|\/)index\.md$/, "$1")
		.replace(/\.md$/, "")
		.replace(/\/$/, "");
	return clean ? `${DOCS_ORIGIN}/${clean}` : `${DOCS_ORIGIN}/`;
}

/**
 * Post-processes the built HTML so every `<meta>` (plus canonical links and the
 * anti-FOUC inline scripts) sits right after `<title>`, before stylesheet links
 * and the app script. VitePress renders its `head` entries after the assets and
 * only offers `transformHtml` to reorder the final document.
 */
function reorderHead(html: string): string {
	const head = /<head>([\s\S]*?)<\/head>/.exec(html);
	if (!head) return html;

	const moved: string[] = [];
	let inner = head[1];

	inner = inner.replace(/<meta\b[^>]*>/g, (tag) => {
		if (/\bcharset\s*=/i.test(tag)) return tag;
		moved.push(tag);
		return "";
	});
	inner = inner.replace(/<link\b[^>]*rel="canonical"[^>]*>/g, (tag) => {
		moved.push(tag);
		return "";
	});
	inner = inner.replace(
		/<script (?:id="check-(?:dark-mode|mac-os)"|type="application\/ld\+json")[\s\S]*?<\/script>/g,
		(tag) => {
			moved.push(tag);
			return "";
		},
	);
	// Drop the whitespace-only lines the extracted tags leave behind.
	inner = inner.replace(/\n[ \t]+(?=\n)/g, "");

	if (moved.length === 0) return html;

	const titleEnd = inner.indexOf("</title>");
	const at = titleEnd === -1 ? inner.indexOf(">") + 1 : titleEnd + "</title>".length;
	const ordered = `${inner.slice(0, at)}\n    ${moved.join("\n    ")}\n${inner
		.slice(at)
		.replace(/^\s*\n/, "")}`;

	return html.replace(head[0], () => `<head>${ordered}</head>`);
}

const ICONS = {
	docs: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
	guides:
		'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>',
	ui: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
	api: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
	changelog:
		'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>',
} as const;

const tab = (icon: keyof typeof ICONS, text: string) =>
	// `aria-hidden` on the icon: the tab's meaning is the label, and a bare
	// `<svg>` inside `v-html` is announced as an unlabeled graphic.
	`<span class="vp-section-tab"><span aria-hidden="true" class="vp-section-tab__icon">${ICONS[icon]}</span><span>${text}</span></span>`;

/**
 * The Docs tab's tree. `/start/` holds the narrative pages, `/tutorials/` and
 * `/explanation/` extend it, and the home page shows it as the root fallback —
 * one tree for the whole section, so navigating inside it never reshuffles the
 * sidebar.
 */
const docsSidebar = [
	{
		text: "Introduction",
		collapsed: true,
		items: [
			{ text: "Getting Started", link: "/start/getting-started" },
			{ text: "Tutorial: Your First API Client", link: "/tutorials/first-api-client" },
			{ text: "Error Handling", link: "/start/errors" },
			{ text: "Roadmap", link: "/start/roadmap" },
		],
	},
	{
		text: "Explanation",
		collapsed: true,
		items: [
			{ text: "Overview", link: "/explanation/" },
			{ text: "Why KatanaKit", link: "/explanation/why-katanakit" },
			{ text: "Architecture", link: "/start/architecture" },
			{ text: "Service Architecture", link: "/explanation/service-architecture" },
			{ text: "Decisions (ADRs)", link: "/explanation/decisions/" },
		],
	},
	{
		// Copy-paste starting points. External gists rather than docs pages:
		// each is a file set you drop into a project, not prose to read.
		text: "Boilerplates",
		collapsed: true,
		items: [
			{
				text: "Nuxt 4",
				link: "https://gist.github.com/senseikatana/0833bd560e547bdebf752b291a65ca8e",
			},
			{
				text: "Astro 7",
				link: "https://gist.github.com/senseikatana/7b6595e7b51fe39fc7459442de9ba196",
			},
			{
				text: "React 19 + Vite 8",
				link: "https://gist.github.com/senseikatana/8d4a152a98c6f99b3c2745b0787fb393",
			},
			{
				text: "VS Code Snippets",
				link: "https://gist.github.com/senseikatana/2dea6c57e380e0c617a9b8662f9a163e",
			},
			{
				text: "Standalone source extracts",
				collapsed: true,
				items: [
					{
						text: "DOM",
						link: "https://gist.github.com/senseikatana/011bc24c3fcc95f6c3338265294abbe7",
					},
					{
						text: "Dates",
						link: "https://gist.github.com/senseikatana/77bd2ebb10233aab44dc84093dfccfe5",
					},
					{
						text: "API Manager",
						link: "https://gist.github.com/senseikatana/7e76dcb54999fd9c4823c59998ff4e57",
					},
					{
						text: "Reactive Core",
						link: "https://gist.github.com/senseikatana/e06a918763c314932f96ff42513431e9",
					},
					{
						text: "Safe Result",
						link: "https://gist.github.com/senseikatana/402c590c99287bb80667420c0d96e0d5",
					},
					{
						text: "Query Adapters",
						link: "https://gist.github.com/senseikatana/b2bc514e42533c218820cf86c879aa5d",
					},
				],
			},
		],
	},
];

/**
 * Rewrites relative `href` targets to absolute, base-prefixed URLs.
 *
 * TypeDoc links between symbols as `./classes/X`. A relative href resolves
 * against the *served* URL, and `/en/docs/api` has no trailing slash, so the
 * browser would look one directory too high (`/en/docs/classes/X` → 404).
 * Resolving every relative href against the page's own directory removes the
 * whole class of bug — including for anyone opening a clean URL by hand.
 */
function absolutizeHrefs(html: string, id: string): string {
	// `id` is the absolute path of the emitted file (…/dist/api/index.html),
	// so the page directory is what follows the last `/dist/` segment.
	const marker = id.lastIndexOf("/dist/");
	const rel = marker === -1 ? id : id.slice(marker + "/dist/".length);
	const dir = rel.replace(/[^/]*$/, "");
	const from = `https://docs.local${DOCS_BASE}/${dir}`;
	return html.replace(/(\shref=")(?![\w+.-]+:|\/|#)([^"]+)"/g, (match, pre, href) => {
		try {
			return `${pre}${new URL(href, from).pathname}"`;
		} catch {
			return match;
		}
	});
}

export default defineConfig({
	title: "KatanaKit",
	// `docs/public/` is copied verbatim, but VitePress also *scans* it for
	// pages: the reference material under `public/snippets` carries .md files
	// that are not valid Vue SFCs and would fail the build.
	srcExclude: ["public/snippets/**"],
	description:
		"A sharp, framework-agnostic TypeScript service toolkit organized with hexagonal architecture.",
	base: `${DOCS_BASE}/`,
	cleanUrls: true,
	// Move the per-page hash map/site data (~100 KB inlined on every page) to a
	// shared chunk: smaller pages to deploy, one extra cached request.
	metaChunk: true,
	lastUpdated: true,
	// VitePress writes page paths without `base`, so the prefix is applied here
	// to every sitemap entry (`/` included).
	sitemap: {
		hostname: SITE_ORIGIN,
		transformItems: (items) =>
			items.map((item) => ({
				...item,
				url: `${DOCS_BASE}/${item.url.replace(/^\/+/, "")}`,
			})),
	},
	// Only tags the SEO helper cannot generate live here; the rest is per-page
	// (transformHead) and reordered to the top of <head> (transformHtml).
	head: [["meta", { name: "theme-color", content: "#0a0a0a" }]],
	transformHead({ pageData, title }) {
		const { tags } = useSeoMeta({
			title,
			description: pageData.description || docsSiteConfig.description,
			keywords: DOCS_KEYWORDS,
			viewport: "width=device-width, initial-scale=1.0",
			canonical: pageUrl(pageData.relativePath),
			ogUrl: pageUrl(pageData.relativePath),
			ogType: "website",
			ogImageAlt: "KatanaKit — a sharp TypeScript service toolkit",
		});

		const head: HeadConfig[] = [];
		for (const node of tags) {
			// VitePress already owns <title>; everything else is injected here.
			if (node.tag === "title") continue;
			head.push([node.tag, node.attrs ?? {}, node.text ?? ""]);
		}

		return head;
	},
	transformHtml(code, id) {
		if (!id.endsWith(".html")) return code;
		return reorderHead(absolutizeHrefs(code, id));
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@katanakit/ui/styles.css": fileURLToPath(
					new URL("./vendor/kit-ui/styles.css", import.meta.url),
				),
				"@katanakit/ui": fileURLToPath(new URL("./vendor/kit-ui/index.js", import.meta.url)),
			},
		},
		build: {
			// The chunk over the 2 MB default is the SSR bundle: one module that
			// renders all ~880 pages (the TypeDoc reference is most of it), and
			// it never reaches the browser. The largest *client* chunk is the
			// local-search index at ~830 KB, which is lazy-loaded on demand.
			// Splitting the SSR bundle would not make the site faster, so the
			// limit only exists to keep the build output honest.
			chunkSizeWarningLimit: 4096,
		},
	},
	themeConfig: {
		// Pill tabs — each owns one path prefix and swaps the whole sidebar
		// (Mintlify/Rocket-style segmented navigation). Docs owns /start/,
		// /tutorials/ and /explanation/; Guides owns the rest of /guides/.
		nav: [
			{
				text: tab("docs", "Docs"),
				link: "/start/getting-started",
				activeMatch: "^/(start/|tutorials/|explanation/|$)",
			},
			{
				text: tab("guides", "Guides"),
				link: "/guides/services/",
				activeMatch: "^/guides/",
			},
			{ text: tab("ui", "UI Kit"), link: "/ui-kit/", activeMatch: "^/ui-kit/" },
			{ text: tab("api", "API Reference"), link: "/api/", activeMatch: "^/api/" },
			{ text: tab("changelog", "Changelog"), link: "/changelog", activeMatch: "^/changelog" },
		],
		// Sidebar keyed by section: only the current section's tree renders.
		sidebar: {
			"/ui-kit/": [
				{
					text: "UI Kit",
					collapsed: true,
					items: [
						{ text: "Overview", link: "/ui-kit/" },
						{
							text: "Components",
							collapsed: true,
							items: [
								{ text: "Button", link: "/ui-kit/components/button" },
								{ text: "Input", link: "/ui-kit/components/input" },
								{ text: "Card", link: "/ui-kit/components/card" },
								{ text: "Badge", link: "/ui-kit/components/badge" },
								{ text: "Alert", link: "/ui-kit/components/alert" },
								{ text: "Tabs", link: "/ui-kit/components/tabs" },
								{ text: "Select", link: "/ui-kit/components/select" },
								{ text: "Modal", link: "/ui-kit/components/modal" },
								{ text: "Toast", link: "/ui-kit/components/toast" },
							],
						},
						{
							text: "Tailwind Components",
							collapsed: true,
							items: [
								{ text: "Overview", link: "/ui-kit/tailwind-components/" },
								{ text: "Shared UI", link: "/ui-kit/tailwind-components/shared" },
								{ text: "Features", link: "/ui-kit/tailwind-components/features" },
								{ text: "Catalog", link: "/ui-kit/tailwind-components/catalog" },
							],
						},
						{ text: "Testing", link: "/ui-kit/testing" },
						{ text: "Architecture", link: "/ui-kit/architecture" },
						{ text: "Inventory", link: "/ui-kit/inventory" },
						{ text: "LLM Files", link: "/ui-kit/llm-files" },
						{ text: "HyperUI", link: "/ui-kit/hyperui" },
						{ text: "Roadmap", link: "/ui-kit/roadmap" },
					],
				},
				{
					text: "SCSS Framework",
					collapsed: true,
					items: [
						{ text: "Overview", link: "/ui-kit/css/" },
						{ text: "Getting Started", link: "/ui-kit/css/getting-started" },
						{ text: "Tailwind & Presets", link: "/ui-kit/css/integrations/tailwind" },
						{
							text: "Foundations",
							collapsed: true,
							items: [
								{ text: "Design Tokens", link: "/ui-kit/css/core/tokens" },
								{ text: "Colors", link: "/ui-kit/css/core/colors" },
								{ text: "Breakpoints", link: "/ui-kit/css/core/breakpoints" },
								{ text: "Dark Mode", link: "/ui-kit/css/core/dark-mode" },
								{ text: "@apply", link: "/ui-kit/css/core/apply" },
							],
						},
						{
							text: "Mixins",
							collapsed: true,
							items: [
								{ text: "Grid", link: "/ui-kit/css/mixins/grid" },
								{ text: "Flexbox", link: "/ui-kit/css/mixins/flex" },
							],
						},
						{
							text: "Utilities",
							collapsed: true,
							items: [
								{ text: "Padding", link: "/ui-kit/css/utilities/padding" },
								{ text: "Margin", link: "/ui-kit/css/utilities/margin" },
								{ text: "Gap", link: "/ui-kit/css/utilities/gap" },
								{ text: "Display", link: "/ui-kit/css/utilities/display" },
								{ text: "Typography", link: "/ui-kit/css/utilities/typography" },
								{ text: "Effects", link: "/ui-kit/css/utilities/effects" },
								{ text: "Aspect Ratio", link: "/ui-kit/css/utilities/aspect-ratio" },
								{ text: "Object Fit & Position", link: "/ui-kit/css/utilities/object" },
								{ text: "Cursor", link: "/ui-kit/css/utilities/cursor" },
								{ text: "Visibility", link: "/ui-kit/css/utilities/visibility" },
								{ text: "Text Transform", link: "/ui-kit/css/utilities/text-transform" },
								{ text: "Text Decoration & Overflow", link: "/ui-kit/css/utilities/text-decoration" },
								{ text: "Line Height & Letter Spacing", link: "/ui-kit/css/utilities/line-height" },
								{ text: "Font Family", link: "/ui-kit/css/utilities/font-family" },
								{ text: "List Style", link: "/ui-kit/css/utilities/list-style" },
								{ text: "Interactivity", link: "/ui-kit/css/utilities/interactivity" },
								{ text: "Border Style", link: "/ui-kit/css/utilities/border-style" },
								{ text: "Float, Clear, Isolation & Box Sizing", link: "/ui-kit/css/utilities/float" },
								{ text: "Tables", link: "/ui-kit/css/utilities/tables" },
								{ text: "Grid Classes", link: "/ui-kit/css/utilities/grid-classes" },
								{ text: "Flex Classes", link: "/ui-kit/css/utilities/flex-classes" },
								{ text: "Container", link: "/ui-kit/css/utilities/container" },
								{ text: "Position Values", link: "/ui-kit/css/utilities/position-values" },
								{ text: "Overflow Direction", link: "/ui-kit/css/utilities/overflow-direction" },
								{ text: "Extended Colors", link: "/ui-kit/css/utilities/colors-extended" },
							],
						},
						{
							text: "Reference",
							collapsed: true,
							items: [
								{ text: "Functions", link: "/ui-kit/css/reference/functions" },
								{ text: "API Reference", link: "/ui-kit/css/reference/api-reference" },
								{ text: "Architecture", link: "/ui-kit/css/reference/architecture" },
							],
						},
					],
				},
			],
			"/api/": [
				{
					// VitePress server-renders the sidebar into **every** page, so the
					// API section stays compact (index anchors) instead of the full
					// TypeDoc tree (783 links ≈ 270 KB per page, 223 MB of the build).
					// The API index still lists every symbol with its description,
					// cross-links are intact and local search indexes all API pages.
					text: "API Reference",
					collapsed: true,
					items: [
						{ text: "Overview", link: "/api/" },
						{ text: "Classes", link: "/api/#classes" },
						{ text: "Interfaces", link: "/api/#interfaces" },
						{ text: "Type Aliases", link: "/api/#type-aliases" },
						{ text: "Variables", link: "/api/#variables" },
						{ text: "Functions", link: "/api/#functions" },
					],
				},
			],
			"/guides/": [
				{
					text: "Core Services",
					collapsed: true,
					items: [
						{ text: "Overview", link: "/guides/services/" },
						{ text: "HTTP Client", link: "/guides/services/http-client" },
					{ text: "External APIs", link: "/guides/services/external-apis" },
						{ text: "Logger", link: "/guides/services/logger" },
						{ text: "Storage", link: "/guides/services/storage" },
					{ text: "Forms", link: "/guides/services/forms" },
						{ text: "DOM", link: "/guides/services/dom" },
						{ text: "Reactive", link: "/guides/services/reactive" },
						{ text: "Formatter", link: "/guides/services/formatter" },
						{ text: "Converter", link: "/guides/services/converter" },
						{ text: "Currency Conversion", link: "/guides/currency" },
						{ text: "Error Helpers", link: "/guides/services/error-helpers" },
						{ text: "Generator", link: "/guides/services/generator" },
						{ text: "Dates", link: "/guides/services/dates" },
						{ text: "Arrays", link: "/guides/services/arrays" },
						{ text: "Geometry", link: "/guides/services/geometry" },
						{ text: "Timing", link: "/guides/services/timing" },
						{ text: "Viewport", link: "/guides/services/viewport" },
						{ text: "Observer", link: "/guides/services/observer" },
						{ text: "Worker", link: "/guides/services/worker" },
						{ text: "katanakitAI", link: "/guides/services/katanakit-ai" },
					],
				},
				{
					text: "Platform Services",
					collapsed: true,
					items: [
						{ text: "Theme", link: "/guides/services/theme" },
						{ text: "Astro Adapter", link: "/guides/services/astro-adapter" },
						{ text: "RSS", link: "/guides/services/rss" },
						{ text: "SEO", link: "/guides/services/seo" },
					],
				},
				{
					text: "Integrations",
					collapsed: true,
					items: [
						{ text: "Nuxt Adapter", link: "/guides/services/nuxt-adapter" },
						{ text: "Vue Adapter", link: "/guides/services/vue-adapter" },
						{ text: "Express Server", link: "/guides/services/express-server" },
						{ text: "NestJS Adapter", link: "/guides/nestjs" },
						{ text: "Hono Adapter", link: "/guides/hono" },
					],
				},
				{
					text: "Data & Messaging",
					collapsed: true,
					items: [
						{ text: "Notion", link: "/guides/notion" },
						{ text: "WordPress", link: "/guides/wordpress" },
						{ text: "WordPress Roles", link: "/guides/wordpress-roles" },
						{ text: "InsForge", link: "/guides/insforge" },
						{ text: "Drizzle", link: "/guides/drizzle" },
						{ text: "Assistant (Kitt)", link: "/guides/assistant" },
					],
				},
				{
					text: "HTTP & REST",
					collapsed: true,
					items: [
						{ text: "Query Client", link: "/guides/query-client" },
						{ text: "Framework Adapters", link: "/guides/framework-adapters" },
						{ text: "Better Auth", link: "/guides/better-auth" },
						{ text: "Access Control", link: "/guides/access-control" },
					],
				},
				{
					text: "Runtime & Filesystem",
					collapsed: true,
					items: [
						{ text: "Filesystem", link: "/guides/filesystem" },
						{ text: "Bun Adapter", link: "/guides/bun-adapter" },
						{ text: "Faker", link: "/guides/faker" },
					],
				},
				{
					text: "Browser & DOM",
					collapsed: true,
					items: [
						{ text: "Watch", link: "/guides/watch" },
						{ text: "PhotoSwipe", link: "/guides/photoswipe" },
					],
				},
				{
					text: "Upgrades",
					collapsed: true,
					items: [
						{ text: "Overview", link: "/guides/upgrade-to/" },
						{ text: "Upgrade to v6", link: "/guides/upgrade-to/v6" },
						{ text: "Upgrade to v5", link: "/guides/upgrade-to/v5" },
						{ text: "Upgrade to v4", link: "/guides/upgrade-to/v4" },
						{ text: "Upgrade to v3", link: "/guides/upgrade-to/v3" },
						{ text: "Upgrade to v2", link: "/guides/upgrade-to/v2" },
					],
				},
			],
			"/start/": docsSidebar,
			"/tutorials/": docsSidebar,
			"/explanation/": docsSidebar,
			"/changelog": [
				{
					text: "What's New",
					collapsed: true,
					items: [{ text: "Changelog", link: "/changelog" }],
				},
			],
			// Everything else (home, root pages) gets the docs tree.
			"/": docsSidebar,
		},
		search: { provider: "local" },
		socialLinks: [{ icon: "github", link: "https://github.com/senseikatana/katanakit-js" }],
		editLink: {
			pattern: "https://github.com/senseikatana/katanakit-js/edit/dev/docs/:path",
			text: "Edit this page on GitHub",
		},
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © Sergio Jurado",
		},
	},
});
