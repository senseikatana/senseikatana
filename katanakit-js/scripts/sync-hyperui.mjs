// Syncs the full HyperUI example catalog (markmead/hyperui, MIT) into the
// UI Kit docs: docs/public/hyperui/** + index.html per folder.
//
// Usage:
//   node scripts/sync-hyperui.mjs [--src /path/to/hyperui-checkout]
//
// Without --src it makes a fresh shallow sparse clone of upstream main.
// The vendored *.html files are kept BYTE-IDENTICAL to upstream; only the
// generated index.html catalog pages are ours.
//
// Run from the repo root.
import { execSync } from "node:child_process";
import {
	cpSync,
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const DEST = join(root, "docs", "public", "hyperui");
const DOCS_PUBLIC = join(root, "docs", "public");
const MD_PATH = join(root, "docs", "ui-kit", "hyperui.md");
const UPSTREAM = "https://github.com/markmead/hyperui.git";

const CATEGORY_BLURBS = {
	application: "Admin UI — tables, forms, navigation and app chrome.",
	blog: "Tiny CSS snippets for blogs.",
	marketing: "Landing pages — heroes, CTAs, pricing, footers.",
	neobrutalism: "Bold borders, hard shadows, flat colors.",
	templates: "Full-page templates — dashboards, storefronts, inboxes.",
};

const titleCase = (s) =>
	s
		.split("-")
		.map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
		.join(" ");

function parseArgs() {
	const srcIdx = process.argv.indexOf("--src");
	return { src: srcIdx === -1 ? null : process.argv[srcIdx + 1] };
}

function sh(cmd, cwd) {
	return execSync(cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function ensureUpstream(srcOpt) {
	if (srcOpt) {
		const sha = sh("git rev-parse HEAD", srcOpt);
		return { dir: srcOpt, sha, tmp: false };
	}
	const tmp = mkdtempSync(join(tmpdir(), "hyperui-"));
	sh(`git clone --depth 1 --filter=blob:none --sparse ${UPSTREAM} repo`, tmp);
	const dir = join(tmp, "repo");
	sh("git sparse-checkout set public/examples public/component.css public/component.js", dir);
	sh("git checkout", dir);
	const sha = sh("git rev-parse HEAD", dir);
	return { dir, sha, tmp: true };
}

/** Self-contained catalog chrome. `hk-` classes only, so the Tailwind
 *  `@source` scan over docs/public/hyperui/** never picks these up. */
/**
 * Escapes text interpolated into the generated catalog HTML. File and
 * directory names come from the vendored upstream repository, and the output
 * is committed and served from the docs origin, so an unexpected `"` or `<`
 * must not be able to break out of the attribute or inject markup.
 */
function html(value) {
	return String(value).replace(
		/[&<>"']/g,
		(char) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
	);
}

function pageShell({ title, breadcrumb, body, upstreamPath }) {
	const upstreamUrl = `https://github.com/markmead/hyperui/tree/main/public/examples/${html(upstreamPath)}`;
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${html(title)} — HyperUI in KatanaKit UI Kit</title>
<style>
:root { color-scheme: light dark; }
body { font-family: ui-sans-serif, system-ui, sans-serif; margin: 0; padding: 2rem; background: #f8fafc; color: #0f172a; }
@media (prefers-color-scheme: dark) { body { background: #020617; color: #e2e8f0; } }
.hk-wrap { max-width: 72rem; margin: 0 auto; }
.hk-crumb { font-size: .8rem; opacity: .7; margin-bottom: .5rem; }
.hk-crumb a { color: inherit; }
h1 { font-size: 1.6rem; margin: 0 0 .25rem; }
.hk-sub { opacity: .75; margin: 0 0 1.5rem; }
.hk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); gap: 1rem; }
.hk-card { display: block; padding: 1rem 1.2rem; border: 1px solid #cbd5e1; border-radius: .75rem; text-decoration: none; color: inherit; background: #fff; }
@media (prefers-color-scheme: dark) { .hk-card { border-color: #334155; background: #0f172a; } }
.hk-card:hover { border-color: #6366f1; }
.hk-card strong { display: block; font-size: 1rem; }
.hk-card span { font-size: .8rem; opacity: .7; }
.hk-variant { margin: 0 0 2rem; border: 1px solid #cbd5e1; border-radius: .75rem; overflow: hidden; background: #fff; }
@media (prefers-color-scheme: dark) { .hk-variant { border-color: #334155; background: #0f172a; } }
.hk-variant header { display: flex; justify-content: space-between; align-items: center; padding: .6rem 1rem; font-size: .85rem; }
.hk-variant header a { color: #6366f1; }
.hk-variant iframe { display: block; width: 100%; border: 0; border-top: 1px solid #e2e8f0; background: #fff; }
.hk-foot { margin-top: 2.5rem; font-size: .8rem; opacity: .65; }
.hk-foot a { color: inherit; }
</style>
</head>
<body>
<div class="hk-wrap">
<nav class="hk-crumb">${html(breadcrumb)}</nav>
<h1>${html(title)}</h1>
<p class="hk-sub">HyperUI (MIT, by Mark Mead) vendored in KatanaKit UI Kit. <a href="${upstreamUrl}">Upstream source</a></p>
${body}
<p class="hk-foot">Rendered from <a href="${upstreamUrl}">${html(upstreamPath || "public/examples")}</a> · styled by <code>/component.css</code> when served from the docs site.</p>
</div>
</body>
</html>
`;
}

function variantFileLabel(file) {
	const m = file.match(/^(\d+)(-dark)?\.html$/);
	if (!m) return file;
	return `Variant ${m[1]}${m[2] ? " (dark)" : ""}`;
}

function main() {
	const { src } = parseArgs();
	const { dir, sha, tmp } = ensureUpstream(src);
	const examplesDir = join(dir, "public", "examples");
	const date = sh("git log -1 --format=%cs", dir);
	console.log(`upstream HEAD ${sha} (${date})`);

	// 1. Wipe + copy examples (byte-identical), LICENSE, site assets.
	rmSync(DEST, { recursive: true, force: true });
	mkdirSync(DEST, { recursive: true });
	cpSync(examplesDir, DEST, { recursive: true });
	cpSync(join(dir, "LICENSE"), join(DEST, "LICENSE"));
	for (const asset of ["component.css", "component.js"]) {
		cpSync(join(dir, "public", asset), join(DOCS_PUBLIC, asset));
	}

	const categories = readdirSync(DEST, { withFileTypes: true })
		.filter((e) => e.isDirectory() && e.name !== ".git")
		.map((e) => e.name)
		.sort();
	// Skip generated-file dirs on re-runs (none yet at this point, but be safe).
	const catalog = [];
	let total = 0;

	for (const cat of categories) {
		const catDir = join(DEST, cat);
		const components = readdirSync(catDir, { withFileTypes: true })
			.filter((e) => e.isDirectory())
			.map((e) => e.name)
			.sort();
		const catEntries = [];
		for (const comp of components) {
			const compDir = join(catDir, comp);
			const files = readdirSync(compDir)
				.filter((f) => f.endsWith(".html") && f !== "index.html")
				.sort((a, b) =>
					a.localeCompare(b, "en", { numeric: true }),
				);
			total += files.length;
			const tall = cat === "templates";
			const cards = files
				.map(
					(f) => `<section class="hk-variant">
<header><strong>${html(variantFileLabel(f))}</strong><span><a href="./${html(f)}">${html(f)}</a> · <a href="https://github.com/markmead/hyperui/blob/main/public/examples/${html(cat)}/${html(comp)}/${html(f)}">upstream</a></span></header>
<iframe src="./${html(f)}" height="${tall ? 720 : 340}" loading="lazy" sandbox="" title="${html(cat)}/${html(comp)}/${html(f)}"></iframe>
</section>`,
				)
				.join("\n");
			writeFileSync(
				join(compDir, "index.html"),
				pageShell({
					title: `${titleCase(comp)} — ${titleCase(cat)}`,
					breadcrumb: `<a href="/hyperui/">hyperui</a> / <a href="../">../${cat}</a> / ${comp}`,
					upstreamPath: `${cat}/${comp}`,
					body: cards,
				}),
			);
			catEntries.push({ comp, count: files.length });
		}
		const cards = catEntries
			.map(
				({ comp, count }) =>
					`<a class="hk-card" href="./${comp}/"><strong>${titleCase(comp)}</strong><span>${count} snippet${count === 1 ? "" : "s"}</span></a>`,
			)
			.join("\n");
		writeFileSync(
			join(catDir, "index.html"),
			pageShell({
				title: `${titleCase(cat)} — HyperUI`,
				breadcrumb: `<a href="/hyperui/">hyperui</a> / ${cat}`,
				upstreamPath: cat,
				body: `<div class="hk-grid">\n${cards}\n</div>`,
			}),
		);
		const catCount = catEntries.reduce((n, e) => n + e.count, 0);
		catalog.push({ cat, components: catEntries, count: catCount });
	}

	const rootCards = catalog
		.map(
			({ cat, components, count }) =>
				`<a class="hk-card" href="./${cat}/"><strong>${titleCase(cat)}</strong><span>${components.length} components · ${count} snippets — ${CATEGORY_BLURBS[cat] || ""}</span></a>`,
		)
		.join("\n");
	writeFileSync(
		join(DEST, "index.html"),
		pageShell({
			title: "HyperUI catalog",
			breadcrumb: `ui-kit / hyperui`,
			upstreamPath: ``,
			body: `<div class="hk-grid">\n${rootCards}\n</div>`,
		}),
	);

	writeFileSync(
		join(DEST, ".version.json"),
		JSON.stringify({ upstream: UPSTREAM, sha, date, files: total }, null, 2) + "\n",
	);
	console.log(`vendored ${total} snippets in ${catalog.reduce((n, c) => n + c.components.length, 0)} components`);

	// 2. Regenerate the catalog section of docs/ui-kit/hyperui.md
	const md = readFileSync(MD_PATH, "utf8");
	const start = "<!-- hyperui-catalog:start -->";
	const end = "<!-- hyperui-catalog:end -->";
	if (!md.includes(start) || !md.includes(end)) {
		throw new Error(`catalog markers missing in ${MD_PATH}`);
	}
	const lines = [
		`> Full catalog vendored from upstream \`${sha.slice(0, 7)}\` (${date}): **${total} snippets** across **${catalog.reduce((n, c) => n + c.components.length, 0)} components**. Every folder has its own \`index.html\`, so the kit is browsable standalone at \`/hyperui/\`.`,
		"",
	];
	for (const { cat, components, count } of catalog) {
		lines.push(`### ${titleCase(cat)} — ${components.length} components, ${count} snippets`, "");
		for (const { comp, count: cc } of components) {
			lines.push(
				`- [${titleCase(comp)}](/hyperui/${cat}/${comp}/) (${cc}) — [upstream](https://github.com/markmead/hyperui/tree/main/public/examples/${cat}/${comp})`,
			);
		}
		lines.push("");
	}
	const catalogMd = `${start}\n${lines.join("\n")}${end}`;
	const next = md.replace(
		new RegExp(`${start}[\\s\\S]*?${end}`),
		catalogMd,
	);
	writeFileSync(MD_PATH, next);
	console.log(`catalog section regenerated in docs/ui-kit/hyperui.md`);

	if (tmp) rmSync(tmp, { recursive: true, force: true });
}

main();
