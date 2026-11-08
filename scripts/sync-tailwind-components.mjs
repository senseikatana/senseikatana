#!/usr/bin/env node
/**
 * Prepares the Tailwind component catalog for the docs site:
 *
 * 1. Copies the framework-agnostic HTML tree into `docs/public/tailwind-components/`
 *    so the showcase can fetch each snippet over HTTP (no bundling of 592 files).
 * 2. Generates `docs/ui-kit/tailwind-components/catalog.md` from the two source
 *    trees, verifying that HTML and React TSX stay one-to-one.
 *
 * Run from the repo root. `scripts/docs.mjs` calls this before VitePress runs;
 * run it standalone with `node scripts/sync-tailwind-components.mjs`.
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// UI-kit content, not library source: this tree sits outside `packages/ui/src`
// so neither `tsc` nor the published `files` list sees it.
const SRC = join(ROOT, 'packages', 'ui', 'tailwind');
const HTML_DIR = join(SRC, 'html');
const REACT_DIR = join(SRC, 'react');
const PUBLIC_DIR = join(ROOT, 'docs', 'public', 'tailwind-components');
const CATALOG = join(ROOT, 'docs', 'ui-kit', 'tailwind-components', 'catalog.md');
const GITHUB = 'https://github.com/senseikatana/katanakit-js/tree/dev/packages/ui/tailwind';

/**
 * Feature-Based Architecture: business capabilities first, then a `shared/`
 * layer for the primitives every feature builds with. Order here is the order
 * used by the catalog page.
 */
const FAMILIES = [
  {
    id: 'shared',
    title: 'Shared UI',
    description:
      'Cross-feature building blocks: primitives, forms, feedback, navigation, data display, layout and app shells.',
  },
  { id: 'auth', title: 'Auth', description: 'Sign-in and authentication entry points.' },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Home screens and the app chrome around them.',
  },
  { id: 'workspace', title: 'Workspace', description: 'File managers, directories and inboxes.' },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Account, profile and workspace settings screens.',
  },
  {
    id: 'products',
    title: 'Products',
    description:
      'Catalog, category and product-detail surfaces: lists, overviews, filters and reviews.',
  },
  { id: 'cart', title: 'Cart', description: 'Shopping carts, mini-carts and cart pages.' },
  {
    id: 'checkout',
    title: 'Checkout',
    description: 'Checkout forms and the checkout page flow.',
  },
  {
    id: 'orders',
    title: 'Orders',
    description: 'Order summaries, order history and order-detail pages.',
  },
  {
    id: 'storefront',
    title: 'Storefront',
    description: 'Store navigation, promos, incentives and storefront pages.',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Landing pages, heroes, features, pricing, testimonials, banners and footers.',
  },
];

const ACRONYMS = new Set(['cta', 'faq', 'ui', 'seo', 'api', '404', 'id', 'sku']);

function titleCase(segment) {
  return segment
    .split('-')
    .map((word) =>
      ACRONYMS.has(word) ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1),
    )
    .join(' ');
}

/** Relative paths (without extension) under a tree, sorted. */
function stems(dir) {
  const out = [];
  const walk = (current) => {
    for (const entry of readdirSync(current).sort()) {
      const full = join(current, entry);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(relative(dir, full).replace(/\.[^.]+$/, ''));
    }
  };
  walk(dir);
  return out;
}

if (!existsSync(HTML_DIR) || !existsSync(REACT_DIR)) {
  console.error('tailwind: packages/ui/tailwind/{html,react} is missing — nothing to sync.');
  process.exit(1);
}

const html = stems(HTML_DIR);
const react = stems(REACT_DIR);
const onlyHtml = html.filter((stem) => !react.includes(stem));
const onlyReact = react.filter((stem) => !html.includes(stem));

if (onlyHtml.length || onlyReact.length) {
  console.error(
    [
      'tailwind: the HTML and React trees are out of sync.',
      ...onlyHtml.slice(0, 10).map((stem) => `  html only:  ${stem}`),
      ...onlyReact.slice(0, 10).map((stem) => `  react only: ${stem}`),
    ].join('\n'),
  );
  process.exit(1);
}

/* ── 1. Publish the HTML snippets for the live previews ─────────────────── */

rmSync(PUBLIC_DIR, { recursive: true, force: true });
cpSync(HTML_DIR, PUBLIC_DIR, { recursive: true });
console.log(`tailwind: copied ${html.length} HTML snippets to docs/public/tailwind-components/`);

/* ── 2. Generate the catalog page ───────────────────────────────────────── */

const byCategory = new Map();
for (const stem of html) {
  const parts = stem.split('/');
  const family = parts[0];
  const category = parts.slice(1, -1).join('/');
  const bucket = byCategory.get(family) ?? new Map();
  const count = bucket.get(category) ?? 0;
  bucket.set(category, count + 1);
  byCategory.set(family, bucket);
}

const lines = [
  '---',
  'title: Catalog',
  `description: Every Tailwind component in the kit — ${html.length} snippets across HTML and React TSX.`,
  '---',
  '',
  '# Catalog',
  '',
  `${html.length} components across **${byCategory.size} feature groups** and **${[
    ...byCategory.values(),
  ].reduce((total, categories) => total + categories.size, 0)} categories**.`,
  '',
  'The tree follows **Feature-Based Architecture**: each top-level folder is a',
  'product capability, and `shared/` holds the cross-feature primitives every',
  'feature builds with. Every component exists twice, with the same relative path:',
  '',
  '- `packages/ui/tailwind/html/**` — framework-agnostic markup for Vue, Astro and plain HTML.',
  '- `packages/ui/tailwind/react/**` — React TSX version of the same component.',
  '',
  'This page is generated by `scripts/sync-tailwind-components.mjs`; edit the source, not the table.',
  '',
];

for (const family of FAMILIES) {
  const categories = byCategory.get(family.id);
  if (!categories) continue;
  const total = [...categories.values()].reduce((sum, count) => sum + count, 0);
  lines.push(
    `## ${family.title} — ${total} components`,
    '',
    family.description,
    '',
    '| Category | Components | Source |',
    '| --- | ---: | --- |',
  );
  for (const [category, count] of [...categories.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    const name = category.split('/').map(titleCase).join(' / ');
    lines.push(
      `| ${name} | ${count} | [HTML](${GITHUB}/html/${family.id}/${category}) · [React](${GITHUB}/react/${family.id}/${category}) |`,
    );
  }
  lines.push('');
}

mkdirSync(dirname(CATALOG), { recursive: true });
writeFileSync(CATALOG, `${lines.join('\n')}\n`);
console.log(`tailwind: wrote ${relative(ROOT, CATALOG)}`);
