#!/usr/bin/env node
/**
 * Generates release notes from Conventional Commits between the previous tag
 * and the given tag. Prints markdown by default; use --json for structured
 * output that the docs site can consume.
 *
 * Usage:
 *   node scripts/generate-release-notes.mjs v2.14.1
 *   node scripts/generate-release-notes.mjs v2.14.1 --json
 *   node scripts/generate-release-notes.mjs v2.14.1 --changelog   # prefer CHANGELOG section
 *   node scripts/generate-release-notes.mjs v2.14.1 --write       # write the section into CHANGELOG.md
 *   node scripts/generate-release-notes.mjs v2.14.1 --write --force  # rewrite an existing section
 *   node scripts/generate-release-notes.mjs --sync-versions       # refresh version refs in README/docs
 *   node scripts/generate-release-notes.mjs --refresh             # regenerate ALL sections with current format
 *   node scripts/generate-release-notes.mjs --all --json
 *
 * Every version section is a "What's news:" checklist: one '- [ ]' task per
 * commit (its full Conventional Commit subject) followed by the files it
 * touched, so nothing generated is left out of GitHub or the docs site.
 * `--write` also refreshes the version pinned in package.json and README/docs
 * prose, so the published docs always name the version that just shipped
 * (never downgrading a newer tag when backfilling).
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "senseikatana/katanakit-js";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const SECTIONS = [
	{ type: "feat", title: "🚀 Features" },
	{ type: "fix", title: "🔧 Fixes" },
	{ type: "perf", title: "⚡ Performance" },
	{ type: "refactor", title: "♻️ Refactors" },
	{ type: "docs", title: "📝 Documentation" },
	{ type: "test", title: "🧪 Tests" },
	{ type: "build", title: "📦 Build" },
	{ type: "ci", title: "🤖 CI" },
	{ type: "style", title: "💄 Styles" },
	{ type: "chore", title: "🧹 Chores" },
	{ type: "revert", title: "⏪ Reverts" },
];

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

function allTags() {
	return git("tag", "--sort=-v:refname")
		.split("\n")
		.map((tag) => tag.trim())
		.filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag));
}

function previousTag(tag) {
	const tags = allTags();
	const index = tags.indexOf(tag);
	return index === -1 ? undefined : tags[index + 1];
}

function parseCommit(subject) {
	const match = subject.match(/^(\w+)(?:\(([^)]+)\))?(!)?: (.+)$/);
	if (!match) return undefined;
	const [, type, scope, breaking, message] = match;
	return { type, scope, breaking: Boolean(breaking), message };
}

/** Files touched by a commit, listed so the changelog never hides a change. */
function changedFiles(sha) {
	return git("show", "--name-only", "--format=", "--no-renames", sha)
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
}

/**
 * One changelog bullet plus its touched files: a single file stays inline, a
 * longer list collapses into `<details>` so the entry stays readable on GitHub
 * and on the docs site without dropping any path.
 */
function renderItem(bullet, files) {
	if (!files?.length) return [bullet];
	if (files.length === 1) return [`${bullet} — \`${files[0]}\``];
	return [
		bullet,
		"  <details>",
		`  <summary>${files.length} files</summary>`,
		"",
		...files.map((path) => `  - \`${path}\``),
		"",
		"  </details>",
	];
}

/**
 * Collects a release from git. With `pending`, the tag does not exist yet
 * (`useGit` writes the changelog before creating it): the range ends at HEAD
 * and the newest existing tag is the base.
 */
function collect(tag, { pending = false } = {}) {
	const prev = pending ? allTags()[0] : previousTag(tag);
	const end = pending ? "HEAD" : tag;
	const range = prev ? `${prev}..${end}` : end;
	const date = git("log", "-1", "--format=%cs", end);

	const commits = git("log", "--no-merges", "--pretty=format:%H%x09%s", range)
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => {
			const [sha, subject] = line.split("\t");
			return { sha, subject };
		})
		// Release machinery, not a user-visible change: the version bump and the
		// changelog commit this script itself produces.
		.filter(({ subject }) => !/^chore(\([^)]*\))?: release v/.test(subject))
		.filter(({ subject }) => !/^docs\(changelog\):/.test(subject))
		// Commits that don't parse as Conventional Commits are kept as-is: the
		// changelog checklist must list EVERY change, never drop one.
		.map(({ sha, subject }) => ({ sha, subject, ...(parseCommit(subject) ?? {}) }))
		.map((commit) => ({ ...commit, files: changedFiles(commit.sha) }));

	const sections = SECTIONS.map((section) => ({
		title: section.title,
		items: commits
			.filter((commit) => commit.type === section.type)
			.map((commit) => ({
				scope: commit.scope,
				message: commit.message,
				breaking: commit.breaking,
				files: commit.files,
			})),
	})).filter((section) => section.items.length > 0);

	return {
		tag,
		version: tag.replace(/^v/, ""),
		date,
		previous: prev,
		sections,
		commits,
	};
}

function renderMarkdown(release) {
	const lines = [`## ${release.version} (${release.date})`, ""];

	for (const section of release.sections) {
		lines.push(`### ${section.title}`, "");
		for (const item of section.items) {
			const scope = item.scope ? `**${item.scope}:** ` : "";
			const breaking = item.breaking ? "**BREAKING** " : "";
			lines.push(...renderItem(`- ${breaking}${scope}${item.message}`, item.files));
		}
		lines.push("");
	}

	if (release.previous) {
		lines.push(
			`**Full Changelog**: https://github.com/${REPO}/compare/${release.previous}...${release.tag}`,
		);
	}

	return `${lines.join("\n").trimEnd()}\n`;
}

/**
 * Extracts the newest non-empty section from CHANGELOG.md. Used when tags
 * already captured the commits (e.g. manual GitHub releases without an npm
 * publish), so commit diffing yields nothing. CHANGELOG.md lists released
 * versions only, so the newest section *is* the release being described.
 */
function changelogBody() {
	const lines = readFileSync(join(ROOT, "CHANGELOG.md"), "utf8").split("\n");
	const sections = [];
	let current;

	for (const line of lines) {
		if (/^## \[/.test(line)) {
			if (current) sections.push(current);
			current = { heading: line, lines: [] };
		} else if (current) {
			current.lines.push(line);
		}
	}
	if (current) sections.push(current);

	const hasBody = (section) => section.lines.join("").trim().length > 0;
	const preferred = sections.find(hasBody);

	return preferred ? `${preferred.lines.join("\n").trim()}\n` : undefined;
}

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const all = args.includes("--all");
const preferChangelog = args.includes("--changelog");
const write = args.includes("--write");
const force = args.includes("--force");
const syncVersions = args.includes("--sync-versions");
const refresh = args.includes("--refresh");
const tag = args.find((arg) => !arg.startsWith("--"));
// The tag reaches `git log` as a revision, so only the release shape the rest
// of the script assumes is accepted; otherwise `--all`-style arguments would
// be parsed as git options.
if (tag && !/^v\d+\.\d+\.\d+$/.test(tag)) {
	console.error(`Invalid tag "${tag}": expected v<major>.<minor>.<patch>`);
	process.exit(1);
}

/** Numeric semver compare (X.Y.Z only); > 0 when `a` is newer than `b`. */
function compareSemver(a, b) {
	const pa = a.split(".").map(Number);
	const pb = b.split(".").map(Number);
	for (let i = 0; i < 3; i++) {
		if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) - (pb[i] ?? 0);
	}
	return 0;
}

/** Files whose prose pins a version number; refreshed so docs never go stale. */
const VERSIONED_DOCS = [
	"README.md",
	"docs/guides/getting-started.md",
	"docs/guides/roadmap.md",
	"docs/guides/filesystem.md",
];

function syncVersionRefs(version) {
	// package.json first: it is the version npm publishes, so a tag created
	// outside this script (`useGit release create`) must be mirrored back.
	// (repos without package.json only sync the docs below)
	const manifest = join(ROOT, "package.json");
	if (existsSync(manifest)) {
		const manifestBefore = readFileSync(manifest, "utf8");
		const manifestAfter = manifestBefore.replace(
			/("version":\s*)"\d+\.\d+\.\d+"/,
			`$1"${version}"`,
		);
		if (manifestAfter !== manifestBefore) {
			writeFileSync(manifest, manifestAfter);
			console.log(`Version refs: package.json → ${version}`);
		}
	}

	const patterns = [
		[/(katanakit-js@)\d+\.\d+\.\d+/g, `$1${version}`],
		[/(@)\d+\.\d+\.\d+(\/\+esm)/g, `$1${version}$2`],
		[/(as of )\d+\.\d+\.\d+/g, `$1${version}`],
		[/(katanakit-)\d+\.\d+\.\d+(\.tgz)/g, `$1${version}$2`],
	];

	for (const file of VERSIONED_DOCS) {
		const path = join(ROOT, file);
		if (!existsSync(path)) continue;
		const before = readFileSync(path, "utf8");
		const after = patterns.reduce((text, [re, rep]) => text.replace(re, rep), before);
		if (after !== before) {
			writeFileSync(path, after);
			console.log(`Version refs: ${file} → ${version}`);
		}
	}
}

/**
 * Inserts `## [X.Y.Z] - date` at the top of CHANGELOG.md, built from the
 * commits between the previous tag and this one (`[Unreleased]`, if any, is
 * dropped by `useGit` before this runs, so the version section lands on top).
 *
 * The section is a "What's news:" checklist: one '- [ ]' task per commit with
 * its full subject and the files it touched — a complete record on GitHub and
 * on the docs site. With `force`, an existing section is regenerated in place,
 * which is how stale or hand-fixed sections get refreshed from git history.
 */
function writeChangelog(release, { force = false } = {}) {
	const file = join(ROOT, "CHANGELOG.md");
	const content = readFileSync(file, "utf8");
	const heading = new RegExp(`^## \\[${release.version.replace(/\./g, "\\.")}\\][^\\n]*$`, "m");
	const existing = heading.exec(content);
	if (existing && !force) {
		console.log(`Changelog: [${release.version}] already present — skipped`);
		return;
	}

	const lines = [`## [${release.version}] - ${release.date}`, "", "What's news:", ""];
	for (const commit of release.commits) {
		lines.push(`- [ ] ${commit.subject}`);
		for (const path of commit.files) {
			if (path === "CHANGELOG.md") continue;
			lines.push(`  - \`${path}\``);
		}
	}
	if (release.commits.length === 0) {
		lines.push("- [ ] Tooling, documentation and test updates.");
	}
	const section = `${lines.join("\n").trimEnd()}\n\n`;

	if (existing) {
		const start = existing.index;
		const rest = content.slice(start + existing[0].length);
		const nextHeading = /^## \[/m.exec(rest);
		const end = nextHeading ? start + existing[0].length + nextHeading.index : content.length;
		const updated = content.slice(0, start) + section + content.slice(end).replace(/^\n+/, "");
		writeFileSync(file, updated);
		console.log(`Changelog: rewrote [${release.version}]`);
		return;
	}

	// Insertar antes de la primera sección MÁS VIEJA (mantiene el orden
	// descendente aunque se rellene una versión antigua con --refresh); si
	// todas las secciones son más nuevas, va al final; si no hay ninguna, arriba.
	let anchor = -1;
	const headings = /^## \[([0-9]+\.[0-9]+\.[0-9]+)\][^\n]*$/gm;
	let m;
	while ((m = headings.exec(content))) {
		if (compareSemver(m[1], release.version) < 0) {
			anchor = m.index;
			break;
		}
	}
	let updated;
	if (anchor !== -1) {
		updated = content.slice(0, anchor) + section + content.slice(anchor);
	} else {
		const at = content.search(/^## \[/m);
		updated =
			at === -1
				? `${content.trimEnd()}\n\n${section}`
				: `${content.trimEnd()}\n${section}`;
	}

	writeFileSync(file, updated);
	console.log(`Changelog: wrote [${release.version}]`);
}

if (syncVersions) {
	// Runs on every `bun run build`, so README/docs can never pin a stale
	// version. Idempotent: unchanged files are not rewritten.
	const tags = allTags();
	if (tags.length === 0) {
		console.error("sync-versions: no v*.*.* tag found");
		process.exit(1);
	}
	syncVersionRefs(tags[0].replace(/^v/, ""));
} else if (refresh) {
	// Regenera TODAS las secciones con el formato actual (checklist +
	// archivos), de la más vieja a la más nueva para que las que falten se
	// inserten en el orden correcto. Secciones sin commits se dejan como están.
	const tags = [...allTags()].reverse();
	let count = 0;
	for (const t of tags) {
		const rel = collect(t);
		if (rel.commits.length === 0) continue;
		writeChangelog(rel, { force: true });
		count++;
	}
	console.log(`Changelog: refreshed ${count} sections`);
	const newest = allTags()[0]?.replace(/^v/, "");
	if (newest) syncVersionRefs(newest);
} else if (all) {
	const releases = allTags().map(collect);
	process.stdout.write(`${JSON.stringify(releases, null, 2)}\n`);
} else if (write) {
	if (!tag) {
		console.error("Usage: node scripts/generate-release-notes.mjs <tag> --write");
		process.exit(1);
	}
	let tagged = true;
	try {
		execFileSync("git", ["rev-parse", "-q", "--verify", `refs/tags/${tag}`], { cwd: ROOT });
	} catch {
		// The tag may not exist yet: `useGit` writes the changelog first so the
		// tag itself includes the entry. Collect from HEAD instead of skipping.
		tagged = false;
		console.warn(`write: tag ${tag} not found — collecting commits from HEAD`);
	}
	const release = collect(tag, { pending: !tagged });
	writeChangelog(release, { force });
	// Sync to max(release, newest tag): backfilling an older tag must not
	// downgrade the docs, and a release created before its own tag exists
	// (`useGit push` writes the changelog first) must still bump to it.
	const newest = allTags()[0]?.replace(/^v/, "");
	const syncTarget =
		newest && compareSemver(newest, release.version) > 0 ? newest : release.version;
	syncVersionRefs(syncTarget);
} else if (tag) {
	if (preferChangelog) {
		const body = changelogBody();
		if (body) {
			process.stdout.write(body);
			process.exit(0);
		}
	}
	const release = collect(tag);
	process.stdout.write(asJson ? `${JSON.stringify(release, null, 2)}\n` : renderMarkdown(release));
} else {
	console.error(
		"Usage: node scripts/generate-release-notes.mjs <tag> [--json] [--changelog] [--write [--force]] | --sync-versions | --refresh | --all [--json]",
	);
	process.exit(1);
}
