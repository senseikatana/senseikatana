#!/usr/bin/env node
/**
 * SenseiKatana docs task runner.
 * Wraps katanakit-js docs preparation and runs VitePress.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KATANAKIT_ROOT = join(ROOT, '..', 'katanakit-js');
const VITEPRESS_DIR = join(ROOT, 'docs', '.vitepress');
const DIST_DIR = join(VITEPRESS_DIR, 'dist');
const TEMP_DIR = join(VITEPRESS_DIR, '.temp');
const CACHE_DIR = join(VITEPRESS_DIR, 'cache');
const ROOT_VITEPRESS_DIR = join(ROOT, '.vitepress');

const CLOUDFLARE_PROJECT = 'katanakit-docs';
const CLOUDFLARE_BRANCH = 'main';
const DOCS_BASE = 'docs';

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
    mkdirSync(join(dstUi, 'components'), { recursive: true });
    copyFileSync(join(srcUi, 'styles.css'), join(dstUi, 'styles.css'));
    copyFileSync(join(srcUi, 'index.js'), join(dstUi, 'index.js'));
    for (const file of readdirSync(join(srcUi, 'components'))) {
      if (file.endsWith('.js')) {
        copyFileSync(join(srcUi, 'components', file), join(dstUi, 'components', file));
      }
    }
    console.log('docs: vendored packages/ui/dist (styles + js)');
  }

  // 4. Copy sync-tailwind-components output if needed
  const kitTailwindHtml = join(KATANAKIT_ROOT, 'packages', 'ui', 'tailwind', 'html');
  const dstTailwindHtml = join(ROOT, 'docs', 'ui-kit', 'reference');
  if (existsSync(kitTailwindHtml)) {
    remove(dstTailwindHtml);
    execFileSync('cp', ['-r', kitTailwindHtml, dstTailwindHtml], { stdio: 'inherit' });
    console.log('docs: copied tailwind html components');
  }
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

  // Sync from katanakit-js first (except for clean)
  if (mode !== 'dev') {
    syncFromKit();
  }

  switch (mode) {
    case 'dev': {
      run('bunx', ['vitepress', 'dev', 'docs']);
      break;
    }
    case 'build': {
      clean();
      syncFromKit();
      run('bunx', ['vitepress', 'build', 'docs']);
      break;
    }
    case 'preview': {
      clean();
      syncFromKit();
      run('bunx', ['vitepress', 'build', 'docs']);
      run('bunx', ['vitepress', 'preview', 'docs']);
      break;
    }
    case 'deploy':
    case 'gh': {
      clean();
      syncFromKit();
      run('bunx', ['vitepress', 'build', 'docs']);
      // Deploy to Cloudflare Pages
      const distPath = join(VITEPRESS_DIR, 'dist');
      const branch = mode === 'gh' ? 'gh-pages' : CLOUDFLARE_BRANCH;
      const project = mode === 'gh' ? '' : `--project-name ${CLOUDFLARE_PROJECT}`;
      run('bunx', ['wrangler@4.145.0', 'pages', 'deploy', distPath, project, '--branch', branch]);
      break;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
