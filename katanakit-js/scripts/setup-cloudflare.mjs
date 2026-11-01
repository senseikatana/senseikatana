#!/usr/bin/env node
/**
 * Cloudflare setup for katanakit-js.
 *
 * Verifies the API token, lists/creates the Pages projects, attaches the
 * custom domains and (optionally) pushes the CI secrets to GitHub.
 *
 * Usage:
 *   node scripts/setup-cloudflare.mjs                    # status (read-only)
 *   node scripts/setup-cloudflare.mjs --apply            # create projects + domains
 *   node scripts/setup-cloudflare.mjs --github-secrets   # push CI secrets with gh
 *   node scripts/setup-cloudflare.mjs --apply --github-secrets
 *
 * Reads CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID from the environment
 * (or .env). Requires a real API token; the `wrangler login` OAuth session is
 * never read or printed by this script.
 *
 * Token permissions: Account > Cloudflare Pages: Edit, Account > Account
 * Settings: Read, Zone > DNS: Edit (senseikatana.com). Add Workers R2 Storage:
 * Edit when R2 buckets are managed from here.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.cloudflare.com/client/v4";

const PROJECTS = [
	{ name: "katanakit-docs", domain: "docs.senseikatana.com", build: "bun run deploy" },
];

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const GITHUB_SECRETS = args.includes("--github-secrets");

const envFile = join(ROOT, ".env");
if (existsSync(envFile)) {
	try {
		process.loadEnvFile(envFile);
	} catch {
		// Ignore a malformed .env; variables may still come from the environment.
	}
}

const token = (process.env.CLOUDFLARE_API_TOKEN ?? "").trim();
const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID ?? "").trim();

function fail(message) {
	console.error(`✖ ${message}`);
	process.exit(1);
}

async function cf(path, init = {}) {
	const response = await fetch(`${API}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			...init.headers,
		},
	});
	const body = await response.json().catch(() => ({}));
	if (!response.ok || body.success === false) {
		const detail =
			body.errors?.map((error) => `${error.code} ${error.message}`).join("; ") ??
			`${response.status} ${response.statusText}`;
		throw new Error(`${init.method ?? "GET"} ${path} → ${detail}`);
	}
	return body.result;
}

async function ensureProject(project) {
	const projects = await cf(`/accounts/${accountId}/pages/projects`);
	const existing = projects.find((entry) => entry.name === project.name);
	if (!existing) {
		if (!APPLY) return { project: "missing", domain: "skipped" };
		await cf(`/accounts/${accountId}/pages/projects`, {
			method: "POST",
			body: JSON.stringify({ name: project.name, production_branch: "main" }),
		});
	}
	const domains = await cf(`/accounts/${accountId}/pages/projects/${project.name}/domains`);
	const hasDomain = domains.some((entry) => entry.name === project.domain);
	if (!hasDomain && APPLY) {
		await cf(`/accounts/${accountId}/pages/projects/${project.name}/domains`, {
			method: "POST",
			body: JSON.stringify({ name: project.domain }),
		});
	}
	return { project: existing ? "present" : "created", domain: hasDomain ? "present" : APPLY ? "created" : "missing" };
}

function setGitHubSecrets() {
	for (const [name, value] of [
		["CLOUDFLARE_API_TOKEN", token],
		["CLOUDFLARE_ACCOUNT_ID", accountId],
	]) {
		execFileSync("gh", ["secret", "set", name], { cwd: ROOT, input: value });
		console.log(`✔ GitHub secret set: ${name}`);
	}
}

if (!token) {
	fail(
		"CLOUDFLARE_API_TOKEN is not set. Create a scoped token (see the header of this script) " +
			"and put it in .env or export it before running.",
	);
}
if (!accountId) {
	fail("CLOUDFLARE_ACCOUNT_ID is not set. Copy it from the Cloudflare dashboard (Account Home).");
}

try {
	const verification = await cf("/user/tokens/verify");
	console.log(`✔ Token valid (status: ${verification.status})`);
} catch (error) {
	fail(`Token verification failed: ${error.message}`);
}

console.log(`\nPages projects (account ${accountId.slice(0, 6)}…):`);
for (const project of PROJECTS) {
	try {
		const result = await ensureProject(project);
		console.log(
			`  - ${project.name}: project ${result.project}, ${project.domain} ${result.domain}`,
		);
	} catch (error) {
		console.error(`  - ${project.name}: ${error.message}`);
		process.exitCode = 1;
	}
}

if (GITHUB_SECRETS) {
	if (!APPLY && process.exitCode) {
		console.error("\nSkipping GitHub secrets because the Cloudflare setup failed.");
	} else {
		console.log();
		setGitHubSecrets();
	}
}

console.log("\nNext steps:");
for (const project of PROJECTS) {
	console.log(`  - deploy ${project.name}: ${project.build}`);
}
if (!GITHUB_SECRETS) {
	console.log("  - CI secrets: node scripts/setup-cloudflare.mjs --github-secrets");
}
console.log("  - database: Cloudflare D1 (or INSForge as fallback); local ORM is Prisma.");
