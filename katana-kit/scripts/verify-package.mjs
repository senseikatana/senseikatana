/**
 * Verifies that the build produced every artifact the package promises and that
 * `npm pack` actually ships them.
 *
 * The tarball is the real public surface: a file that exists in `dist/` but is
 * excluded by `files`/`.npmignore` is still missing for consumers — which is
 * exactly how `dist/prisma/schema.d.ts` vanished once and broke the `/prisma`
 * types (TS2307) for anyone with `skipLibCheck: false`.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

/** Entry points and artifacts the package must contain after `build:lib`. */
const required = [
	"dist/index.js",
	"dist/index.d.ts",
	"dist/styles.css",
	"dist/adapters/cli/bin.js",
	"dist/prisma/index.js",
	"dist/prisma/index.d.ts",
	"dist/prisma/assistant.store.js",
	"dist/prisma/assistant.store.d.ts",
	"dist/prisma/use-prisma.js",
	"dist/prisma/use-prisma.d.ts",
	"dist/prisma/schema.json",
	"dist/prisma/schema.d.ts",
	"dist/prisma/schema.prisma",
];

const missingOnDisk = required.filter((file) => !existsSync(join(root, file)));
if (missingOnDisk.length > 0) {
	console.error(
		`verify-package: missing build artifacts:\n${missingOnDisk.map((file) => `  - ${file}`).join("\n")}`,
	);
	process.exit(1);
}

// `--ignore-scripts` keeps `prepare` (husky) from running during the check.
// `execFileSync` cannot launch `npm.cmd` on Windows without a shell; the repo
// explicitly supports Windows checkouts (see `scripts/clean.mjs`).
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
let packJson;
try {
	packJson = execFileSync(npmCommand, ["pack", "--dry-run", "--ignore-scripts", "--json"], {
		cwd: root,
		encoding: "utf8",
		shell: process.platform === "win32",
	});
} catch (error) {
	console.error(
		"verify-package: could not run `npm pack`. Is npm on PATH?\n" +
			`  ${error instanceof Error ? `${error.code ?? ""} ${error.message}`.trim() : String(error)}`,
	);
	process.exit(1);
}

// npm 12 keys the JSON by package name; older versions return an array.
const packed = JSON.parse(packJson);
const packResult = Array.isArray(packed) ? packed[0] : Object.values(packed)[0];
if (!packResult?.files) {
	console.error("verify-package: could not parse `npm pack --json` output.");
	process.exit(1);
}
const tarballFiles = new Set(packResult.files.map((entry) => entry.path));

/** The subset that must be in the tarball, not just on disk. */
const requiredInTarball = [
	"dist/index.js",
	"dist/index.d.ts",
	"dist/styles.css",
	"dist/adapters/cli/bin.js",
	"dist/prisma/assistant.store.js",
	"dist/prisma/assistant.store.d.ts",
	"dist/prisma/schema.d.ts",
	"dist/prisma/schema.prisma",
	"dist/prisma/schema.json",
	"dist/prisma/use-prisma.d.ts",
];

const missingInTarball = requiredInTarball.filter((file) => !tarballFiles.has(file));
if (missingInTarball.length > 0) {
	console.error(
		`verify-package: files missing from the npm tarball:\n${missingInTarball.map((file) => `  - ${file}`).join("\n")}`,
	);
	process.exit(1);
}

console.log(
	`verify-package: ${requiredInTarball.length} published artifacts present (${packResult.files.length} files in the tarball).`,
);
