#!/usr/bin/env node
/**
 * Full-repo build with a hard gate.
 *
 * `bun run build:all` runs the phases in order and stops at the first failure,
 * so nothing builds unless the tree is clean and green:
 *
 *   1. clean   — rimraf every dist/, .output/ and node_modules/ in the repo
 *   2. install — `bun install` on the fresh tree
 *   3. verify  — formatting, lint and types (`bun run check`), then the tests
 *   4. build   — web (astro) and docs (vitepress), each output checked
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rimraf } from 'rimraf';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLEAN_NAMES = new Set(['dist', '.output', 'node_modules']);

/** Build output directories anywhere in the repo. A hit is never descended into. */
function cleanTargets(dir, out) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === '.git') continue;
    const full = join(dir, entry.name);
    if (CLEAN_NAMES.has(entry.name)) out.push(full);
    else cleanTargets(full, out);
  }
}

const run = (command, args) => execFileSync(command, args, { cwd: ROOT, stdio: 'inherit' });

function phase(name, fn) {
  console.log(`\n── ${name} ${'─'.repeat(Math.max(1, 56 - name.length))}`);
  try {
    fn();
  } catch (error) {
    console.error(`\nbuild-all: FAILED in "${name}" — nothing further was run.`);
    process.exit(1);
  }
  console.log(`── ${name}: ok`);
}

phase('clean', () => {
  const targets = [];
  cleanTargets(ROOT, targets);
  for (const target of targets) rimraf.sync(target);
  const shown = targets.map((target) => relative(ROOT, target)).join(', ');
  console.log(`clean: removed ${shown || '(nothing to remove)'}`);
});

phase('install', () => {
  run('bun', ['install']);
});

phase('verify', () => {
  run('bun', ['run', 'check']);
  run('bunx', ['vitest', 'run', '--passWithNoTests']);
});

phase('build: web (astro)', () => {
  run('bun', ['run', 'build']);
  if (!existsSync(join(ROOT, 'web', 'dist', 'index.html'))) {
    throw new Error('astro build produced no web/dist/index.html');
  }
});

phase('build: docs (vitepress)', () => {
  run('bun', ['run', 'docs:build']);
  if (!existsSync(join(ROOT, 'docs', '.vitepress', 'dist', 'docs', 'index.html'))) {
    throw new Error('docs build produced no docs/.vitepress/dist/docs/index.html');
  }
});

console.log('\nbuild-all: all phases green ✓');
console.log('  web:  web/dist/index.html');
console.log('  docs: docs/.vitepress/dist/docs/index.html');
