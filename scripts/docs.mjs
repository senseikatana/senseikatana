#!/usr/bin/env node
/**
 * SenseiKatana docs task runner.
 * Wraps katanakit-js docs preparation and runs VitePress.
 */
import { execFileSync } from 'node:child_process';
import {
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  copyFileSync,
  statSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, dirname, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KATANAKIT_ROOT = join(ROOT, '..', 'katanakit-js');
const VITEPRESS_DIR = join(ROOT, 'docs', '.vitepress');
const DIST_DIR = join(VITEPRESS_DIR, 'dist');
const TEMP_DIR = join(VITEPRESS_DIR, '.temp');
const CACHE_DIR = join(VITEPRESS_DIR, 'cache');
const ROOT_VITEPRESS_DIR = join(ROOT, '.vitepress');

/** Single source of truth for the docs URL scheme (see config/docs-site.json). */
const docsSite = JSON.parse(readFileSync(join(ROOT, 'config', 'docs-site.json'), 'utf8'));

const CLOUDFLARE_PROJECT = docsSite.docsPagesProject;
const CLOUDFLARE_BRANCH = 'main';
// Build nesting mirrors the public base path without its leading slash.
const DOCS_BASE = docsSite.docsBase.replace(/^\//, '');
const WRANGLER = 'wrangler@4.162.0';

const MODES = new Set(['dev', 'build', 'preview', 'deploy', 'gh', 'clean']);
const mode = (process.argv[2] ?? '').toLowerCase();

const run = (command, args, opts = {}) =>
  execFileSync(command, args, { cwd: ROOT, stdio: 'inherit', ...opts });

const runInKit = (command, args, opts = {}) =>
  execFileSync(command, args, { cwd: KATANAKIT_ROOT, stdio: 'inherit', ...opts });

const remove = (target) =>
  rmSync(target, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });

function clean() {
  remove(TEMP_DIR);
  remove(CACHE_DIR);
  remove(ROOT_VITEPRESS_DIR);
  console.log('docs: cleaned .vitepress/.temp, .vitepress/cache and ./ .vitepress');
}

/**
 * `wrangler pages deploy` fails when the Pages project does not exist yet.
 * Create it on first deploy; an existing project makes the create exit
 * non-zero, which is safe to ignore because the deploy below is the real
 * check.
 */
function ensurePagesProject() {
  try {
    run(
      'bunx',
      [
        WRANGLER,
        'pages',
        'project',
        'create',
        CLOUDFLARE_PROJECT,
        '--production-branch',
        CLOUDFLARE_BRANCH,
        '--force',
      ],
      { stdio: 'ignore' },
    );
    console.log(`docs: created Pages project ${CLOUDFLARE_PROJECT}`);
  } catch {
    console.log(`docs: Pages project ${CLOUDFLARE_PROJECT} already exists`);
  }
}

/** Copy generated katanakit-js docs to senseikatana/docs/ */
function syncFromKit() {
  if (!existsSync(KATANAKIT_ROOT)) {
    console.log('docs: katanakit-js not found at ../katanakit-js, skipping sync');
    return;
  }

  // 1. Run katanakit-js docs-prepare to generate api/, changelog.md, signals.json
  try {
    runInKit('node', ['scripts/docs-prepare.mjs']);
    console.log('docs: katanakit-js docs-prepare completed');
  } catch (e) {
    console.error('docs: katanakit-js docs-prepare failed:', e.message);
    process.exit(1);
  }

  // 2. Copy generated files
  const srcApi = join(KATANAKIT_ROOT, 'docs', 'api');
  const dstApi = join(ROOT, 'docs', 'api');
  if (existsSync(srcApi)) {
    remove(dstApi);
    execFileSync('cp', ['-r', srcApi, dstApi], { stdio: 'inherit' });
    console.log('docs: copied docs/api/');
  }

  const srcChangelog = join(KATANAKIT_ROOT, 'docs', 'changelog.md');
  const dstChangelog = join(ROOT, 'docs', 'changelog.md');
  if (existsSync(srcChangelog)) {
    copyFileSync(srcChangelog, dstChangelog);
    console.log('docs: copied docs/changelog.md');
  }

  const srcSignals = join(KATANAKIT_ROOT, 'docs', '.vitepress', 'theme', 'signals.json');
  const dstSignals = join(ROOT, 'docs', '.vitepress', 'theme', 'signals.json');
  if (existsSync(srcSignals)) {
    mkdirSync(dirname(dstSignals), { recursive: true });
    copyFileSync(srcSignals, dstSignals);
    console.log('docs: copied signals.json');
  }

  // 3. Vendor the UI kit package (styles + JS) the docs import, so the build
  // does not depend on a local packages/ui/dist checkout.
  const srcUi = join(KATANAKIT_ROOT, 'packages', 'ui', 'dist');
  const dstUi = join(ROOT, 'docs', '.vitepress', 'vendor', 'kit-ui');
  if (existsSync(srcUi)) {
    // Mirror every runtime module (top-level, components/, utils/…) so a new
    // subfolder in the kit build never breaks the docs bundle.
    const copyJs = (from, to) => {
      mkdirSync(to, { recursive: true });
      for (const entry of readdirSync(from, { withFileTypes: true })) {
        const src = join(from, entry.name);
        const dst = join(to, entry.name);
        if (entry.isDirectory()) copyJs(src, dst);
        else if (entry.name.endsWith('.js')) copyFileSync(src, dst);
      }
    };
    copyJs(srcUi, dstUi);
    copyFileSync(join(srcUi, 'styles.css'), join(dstUi, 'styles.css'));
    console.log('docs: vendored packages/ui/dist (styles + js)');
  }

  // 4. Publish the Tailwind snippets and regenerate the catalog
  const kitTailwind = join(KATANAKIT_ROOT, 'packages', 'ui', 'tailwind');
  if (existsSync(kitTailwind)) {
    run('node', ['scripts/sync-tailwind-components.mjs']);
  }
}

/**
 * Moves the built site under `dist/docs/` so a root-served Pages deployment
 * answers on `/docs/...` (the Worker proxy and the canonical URLs expect it).
 * `_redirects` and `_headers` stay at the deployment root.
 */
function mountUnderBase() {
  // An empty DOCS_BASE means a root-served deployment (own subdomain):
  // VitePress already writes the build at the deployment root.
  if (!DOCS_BASE) {
    console.log('docs: build served at the deployment root');
    return;
  }
  const mount = join(DIST_DIR, DOCS_BASE);
  const topSegment = DOCS_BASE.split('/')[0];
  remove(join(DIST_DIR, topSegment));
  mkdirSync(mount, { recursive: true });

  for (const entry of readdirSync(DIST_DIR)) {
    if (entry === topSegment || entry === '_redirects' || entry === '_headers') continue;
    renameSync(join(DIST_DIR, entry), join(mount, entry));
  }

  const notFound = join(mount, '404.html');
  if (existsSync(notFound)) copyFileSync(notFound, join(DIST_DIR, '404.html'));
  console.log(`docs: mounted the build at /${DOCS_BASE}/`);
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/**
 * Cloudflare Pages applies `dist/_redirects` before serving; the preview must
 * do the same or a legacy URL 404s locally while it 301s in production.
 * Only the literal `from`/`to`/`status` form used in this project is parsed.
 */
function loadRedirects() {
  const file = join(DIST_DIR, '_redirects');
  if (!existsSync(file)) return [];
  return readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/))
    .filter((parts) => parts.length >= 2 && /^\d{3}$/.test(parts[2] ?? '301'))
    .map(([from, to, status]) => ({ from, to, status: Number(status ?? 301) }));
}

/** Expands `:splat` in the destination, Cloudflare-style, and keeps absolute
 *  same-site targets local so the preview never bounces out to production. */
function applyRedirect(pathname, rules) {
  const localize = (target) =>
    target.startsWith('https://senseikatana.com/')
      ? target.slice('https://senseikatana.com'.length)
      : target;
  for (const rule of rules) {
    if (rule.from.includes('*')) {
      const [prefix, suffix = ''] = rule.from.split('*');
      if (!pathname.startsWith(prefix) || !pathname.endsWith(suffix)) continue;
      const splat = pathname.slice(prefix.length, pathname.length - suffix.length);
      return localize(rule.to.replace(':splat', splat));
    }
    if (pathname === rule.from) return localize(rule.to);
    if (pathname === `${rule.from}/`) return localize(rule.to);
  }
  return null;
}

/** Resolves a URL pathname to a file inside DIST_DIR, or null. */
function resolveFile(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(urlPath.split('?')[0] ?? '/');
  } catch {
    return null;
  }
  const target = resolve(DIST_DIR, `.${normalize(pathname)}`);
  if (target !== DIST_DIR && !target.startsWith(`${DIST_DIR}${sep}`)) return null;

  const candidates = [];
  if (pathname.endsWith('/')) candidates.push(join(target, 'index.html'));
  else {
    candidates.push(target);
    if (!extname(target)) candidates.push(`${target}.html`, join(target, 'index.html'));
  }
  return candidates.find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

/**
 * Serves `docs/.vitepress/dist` the way Cloudflare Pages does: at the domain
 * root, with the docs mounted under `/${DOCS_BASE}/`.
 *
 * `vitepress preview` mounts the output at VitePress' `base`, which would look
 * for `dist/docs/docs/…` now that the build is nested for Pages. This server
 * reads the same tree Pages sees, resolves clean URLs (`/x` → `x.html`) and
 * falls back to the generated 404 page.
 *
 * The port comes from `DOCS_PORT` (default 4173); set `DOCS_HOST=0.0.0.0` to
 * expose it on the network.
 */
function servePagesShape() {
  const redirects = loadRedirects();
  const port = Number(process.env.DOCS_PORT ?? 4173);
  const host = process.env.DOCS_HOST ?? '127.0.0.1';

  const server = createServer((request, response) => {
    // Mirrors `_redirects` exactly as Pages applies it, so legacy URLs behave
    // the same locally (301) as they do in production.
    const redirect = applyRedirect((request.url ?? '/').split('?')[0], redirects);
    if (redirect) {
      response.writeHead(301, { location: redirect });
      response.end();
      return;
    }
    const file = resolveFile(request.url ?? '/');
    if (!file) {
      const notFound = join(DIST_DIR, '404.html');
      response.writeHead(404, { 'content-type': TYPES['.html'] });
      if (existsSync(notFound)) createReadStream(notFound).pipe(response);
      else response.end('Not found');
      return;
    }
    response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(response);
  });

  server.listen(port, host, () => {
    const mount = DOCS_BASE ? `/${DOCS_BASE}/` : '/';
    console.log(`docs: preview at http://localhost:${port}${mount}`);
  });

  const stop = () => server.close(() => process.exit(0));
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

function acquire() {
  mkdirSync(join(ROOT, '.cache'), { recursive: true });
  // Lock logic here if needed (similar to original)
}

function release() {
  // Release lock
}

async function main() {
  if (mode === 'clean') {
    clean();
    return;
  }

  if (!MODES.has(mode)) {
    console.error(`Usage: node scripts/docs.mjs <${[...MODES].join('|')}>`);
    process.exit(1);
  }

  // Sync from katanakit-js first (clean returned above)
  syncFromKit();

  switch (mode) {
    case 'dev': {
      run('bunx', ['vitepress', 'dev', 'docs']);
      break;
    }
    case 'build': {
      clean();
      run('bunx', ['vitepress', 'build', 'docs']);
      mountUnderBase();
      break;
    }
    case 'preview': {
      clean();
      run('bunx', ['vitepress', 'build', 'docs']);
      mountUnderBase();
      servePagesShape();
      break;
    }
    case 'deploy':
    case 'gh': {
      clean();
      run('bunx', ['vitepress', 'build', 'docs']);
      mountUnderBase();

      if (!existsSync(join(DIST_DIR, DOCS_BASE, 'index.html'))) {
        console.error(`docs: no build to deploy — expected ${DOCS_BASE}/index.html`);
        process.exit(1);
      }

      const branch = mode === 'gh' ? 'gh-pages' : CLOUDFLARE_BRANCH;
      if (mode === 'deploy') ensurePagesProject();
      const args = [WRANGLER, 'pages', 'deploy', DIST_DIR, '--branch', branch];
      if (mode !== 'gh') args.push('--project-name', CLOUDFLARE_PROJECT);
      run('bunx', args);

      // The proxy Worker owns the public docs URLs (base path, home alias and
      // legacy redirects), so it ships with the docs: the URL contract is one
      // unit and both deployments always land together.
      if (mode === 'deploy') {
        run('bunx', [
          WRANGLER,
          'deploy',
          '-c',
          join(ROOT, 'workers', 'docs-proxy', 'wrangler.jsonc'),
        ]);
      }
      break;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
