// Concatenates the vendored framework build (scss/main.scss -> dist/base.css)
// with the UI components build output into a single self-contained styles.css.
//
// Order matters: framework base (reset, tokens, utilities) first,
// then dark theme tokens + .kk-* components.
//
// Run from packages/ui: node scripts/concat-css.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgDir = join(here, "..");

const baseCssPath = join(pkgDir, "dist", "base.css");
const componentsCssPath = join(pkgDir, "dist", "components.css");
const outPath = join(pkgDir, "dist", "styles.css");

const base = readFileSync(baseCssPath, "utf8").trim();
const components = readFileSync(componentsCssPath, "utf8").trim();

writeFileSync(outPath, `${base}\n${components}\n`);
console.log(
	`concat-css: ${baseCssPath} (${base.length} chars) + components (${components.length} chars) -> ${outPath}`,
);
