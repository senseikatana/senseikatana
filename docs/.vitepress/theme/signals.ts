/**
 * Build-time signals written by `scripts/docs-prepare.mjs`:
 * `version` (package.json), `stars` (GitHub repo) and `newPages`
 * (docs touched in the last release window).
 *
 * The glob keeps the site buildable when the file is absent (fresh clone
 * before `docs:prepare`): everything degrades to "no data".
 */
export type ChangelogItem = { emoji: string; html: string };
export type ChangelogRelease = { version: string; date: string; items: ChangelogItem[] };
export type ChangelogEntry = {
	version: string;
	date: string;
	releases: ChangelogRelease[];
};

/** Version entries for the navbar releases flyout. */
export type ReleaseVersion = { version: string; date: string; anchor: string };
export type PreviousRelease = ReleaseVersion & { major: string; link: string };
export type ReleaseVersions = {
	latest: ReleaseVersion;
	recent: ReleaseVersion[];
	previous: PreviousRelease[];
};

export type SiteSignals = {
	version?: string;
	stars?: number | null;
	newPages?: string[];
	changelog?: ChangelogEntry | null;
	versions?: ReleaseVersions | null;
};

const modules = import.meta.glob<SiteSignals>("./signals.json", {
	eager: true,
	import: "default",
});

export function siteSignals(): SiteSignals {
	for (const value of Object.values(modules)) return value ?? {};
	return {};
}
