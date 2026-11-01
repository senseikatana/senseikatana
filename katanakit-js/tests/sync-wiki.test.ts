import { describe, expect, it } from "vitest";

import { cleanPage, rewriteMarkdownLinks, wikiPageName } from "../scripts/sync-wiki.mjs";

const NO_PAGES = new Map<string, string>();

describe("sync-wiki", () => {
	it("maps Markdown source paths to stable Wiki page names", () => {
		expect(wikiPageName("docs/guides/getting-started.md")).toBe("Docs-Guides-Getting-started");
		expect(wikiPageName("docs/guides/services/index.md")).toBe("Docs-Guides-Services-index");
		expect(wikiPageName("docs/index.md")).toBe("Docs-index");
		expect(wikiPageName("README.md")).toBe("Home");
	});

	it("rewrites internal docs links while preserving external links and code", () => {
		const pages = new Map([
			["docs/guides/errors.md", "Docs-Guides-Errors"],
			["docs/tutorials/first-api-client.md", "Docs-Tutorials-First-api-client"],
		]);
		const markdown = [
			"[Errors](../guides/errors.md#safe-results)",
			"[Tutorial](https://docs.senseikatana.com/tutorials/first-api-client)",
			"[Reference](https://docs.senseikatana.com/api/)",
			"`[not a link](../guides/errors.md)`",
			"```md",
			"[also not a link](../guides/errors.md)",
			"```",
		].join("\n");

		expect(rewriteMarkdownLinks(markdown, "docs/tutorials/first-api-client.md", pages)).toBe(
			[
				"[Errors](Docs-Guides-Errors#safe-results)",
				"[Tutorial](Docs-Tutorials-First-api-client)",
				"[Reference](https://docs.senseikatana.com/api/)",
				"`[not a link](../guides/errors.md)`",
				"```md",
				"[also not a link](../guides/errors.md)",
				"```",
			].join("\n"),
		);
	});
});

describe("cleanPage", () => {
	it("renders the shared component contract as Markdown", () => {
		const wiki = cleanPage(
			"docs/ui-kit/components/toast.md",
			[
				"<ComponentContract",
				'\tname="Toast"',
				'\troot="toast"',
				'\tpure="toastClass"',
				'\tfactory="useToast"',
				"/>",
			].join("\n"),
			NO_PAGES,
		);

		expect(wiki).not.toContain("<ComponentContract");
		expect(wiki).toContain("## Contract");
		expect(wiki).toContain("| Pure class builder | `toastClass` | No — safe during SSR |");
		expect(wiki).toContain("| Element factory | `useToast` |");
		expect(wiki).toContain("<div class={toastClass({ /* … */ })}></div>");
		expect(wiki).toContain("document.body.append(useToast({ /* … */ }));");
		expect(wiki).toContain("The root class is `toast`, not `kk-toast`");
	});
});

describe("VitePress markup that the Wiki cannot render", () => {
	/** `cleanPage` terminates every page with a newline; these cases assert content only. */
	const clean = (body: string) => cleanPage("docs/x.md", body, NO_PAGES).trimEnd();

	it("rewrites containers as GitHub alerts, title included", () => {
		const wiki = clean("::: warning Status\n\nUse with care.\n\n:::");

		expect(wiki).toBe("> [!WARNING]\n> **Status**\n> Use with care.");
	});

	it("maps every supported container type to an alert", () => {
		expect(clean("::: tip\nTip.\n:::")).toContain("> [!TIP]");
		expect(clean("::: info\nInfo.\n:::")).toContain("> [!NOTE]");
		expect(clean("::: note\nNote.\n:::")).toContain("> [!NOTE]");
		expect(clean("::: danger\nDanger.\n:::")).toContain("> [!CAUTION]");
	});

	it("leaves an unknown container untouched instead of guessing", () => {
		expect(clean("::: mystery\nBody.\n:::")).toBe("::: mystery\nBody.\n:::");
	});

	it("unwraps code groups and keeps the tab label", () => {
		const wiki = clean(
			[
				"::: code-group",
				"",
				"```ts [Express]",
				"run();",
				"```",
				"",
				"```ts [Hono]",
				"go();",
				"```",
				"",
				":::",
			].join("\n"),
		);

		expect(wiki).not.toContain("code-group");
		expect(wiki).toContain("**Express**\n\n```ts\nrun();\n```");
		expect(wiki).toContain("**Hono**\n\n```ts\ngo();\n```");
	});

	it("strips inline markup the Wiki has no use for", () => {
		expect(clean("<ClientOnly>\n\nVisible body.\n\n</ClientOnly>")).toBe("Visible body.");
		expect(clean("<style scoped>\n.a { color: red; }\n</style>")).toBe("");
		expect(clean("kept\n\n</script>\n\nalso kept")).toBe("kept\n\nalso kept");
		expect(clean('fresh <span class="vp-new-badge">new</span> component')).toBe(
			"fresh **new** component",
		);
	});

	it("never rewrites inside a fenced code block", () => {
		const fence = [
			"```md",
			"<ClientOnly>",
			"::: warning Not an alert",
			'<ComponentContract pure="x" factory="y" />',
			"</ClientOnly>",
			"```",
		].join("\n");

		expect(clean(fence)).toBe(fence);
	});

	it("keeps a prose mention of a tag inside inline code", () => {
		expect(clean("carry the `<ComponentContract>` block")).toBe(
			"carry the `<ComponentContract>` block",
		);
	});
});
