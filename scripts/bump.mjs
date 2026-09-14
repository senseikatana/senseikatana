#!/usr/bin/env bun
/**
 * bump.mjs — single source of truth for the monorepo release version.
 *
 * usage:
 *   bun run release:bump 1.8.0   explicit version
 *   bun run release:minor         next minor from root package.json
 *   bun run release:major|patch   same for major / patch
 *
 * Updates the `version` field of every project manifest (root package.json
 * plus each direct subproject package.json) and the project entries of
 * lockfiles (package-lock.json root `version` + `packages[""].version`).
 *
 * Deliberately NOT touched: dependency ranges, changelog history entries,
 * brand/palette versions (e.g. DESIGN.md), build artifacts (.output/).
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = process.argv[2];

if (!arg) {
  console.error('usage: bun scripts/bump.mjs <version|major|minor|patch>');
  process.exit(1);
}

const parse = (v) => {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v);
  if (!m) throw new Error(`invalid semver: ${v}`);
  return [+m[1], +m[2], +m[3]];
};

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const writeJson = (p, obj) => writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');

const rootPkgPath = join(root, 'package.json');
const rootPkg = readJson(rootPkgPath);

let next;
if (['major', 'minor', 'patch'].includes(arg)) {
  const [M, m, p] = parse(rootPkg.version);
  next = arg === 'major' ? `${M + 1}.0.0` : arg === 'minor' ? `${M}.${m + 1}.0` : `${M}.${m}.${p + 1}`;
} else {
  parse(arg);
  next = arg;
}

const setVersionAfterName = (obj, version) => {
  if (obj.version) return { ...obj, version };
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = v;
    if (k === 'name') out.version = version;
  }
  if (!out.version) out.version = version;
  return out;
};

const changed = [];

// 1. manifests: root + direct subprojects (depth 1, never node_modules)
const manifests = [rootPkgPath];
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') continue;
  const p = join(root, entry.name, 'package.json');
  if (existsSync(p)) manifests.push(p);
}

for (const p of manifests) {
  const pkg = readJson(p);
  if (!pkg || typeof pkg !== 'object' || !pkg.name) continue;
  const rel = p === rootPkgPath ? 'package.json' : p.slice(root.length + 1);
  if (pkg.version === next) {
    console.log(`= ${rel} already ${next}`);
    continue;
  }
  writeJson(p, setVersionAfterName(pkg, next));
  changed.push(`${rel}: ${pkg.version ?? '(missing)'} -> ${next}`);
}

// 2. lockfiles: only the project-owned root entries (depth 1)
for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') continue;
  const p = join(root, entry.name, 'package-lock.json');
  if (!existsSync(p)) continue;
  const lock = readJson(p);
  let touched = false;
  if (typeof lock.version === 'string' && lock.version !== next) {
    changed.push(`${entry.name}/package-lock.json#version: ${lock.version} -> ${next}`);
    lock.version = next;
    touched = true;
  }
  if (lock.packages?.['']?.version && lock.packages[''].version !== next) {
    changed.push(`${entry.name}/package-lock.json#packages[""].version: ${lock.packages[''].version} -> ${next}`);
    lock.packages[''].version = next;
    touched = true;
  }
  if (touched) writeJson(p, lock);
}

console.log(changed.length ? `\nBumped to ${next}:\n- ${changed.join('\n- ')}` : `\nNothing to bump, everything already ${next}.`);
