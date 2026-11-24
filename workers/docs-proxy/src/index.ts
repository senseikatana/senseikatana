/**
 * Docs redirect Worker — sends the retired `/docs/*` paths on the apex domains
 * to the docs' current home.
 *
 * The KatanaKit documentation used to be VitePress published to a `katanakit-docs`
 * Pages project and mounted under `/docs/` by this Worker. It is now a Starlight
 * site served at `samuraicoder.dev/katanakit/`, and `/docs/*` on the apex returns
 * 404 — the Pages project it proxied is gone (`katanakit-docs.pages.dev` is dead).
 *
 * So this Worker no longer proxies: it redirects. That keeps every published
 * link, npm README and indexed URL working, on every hostname in the route list,
 * without depending on a Pages project that no longer exists.
 *
 * Routing contract (per zone):
 *   `/docs`                 → 301 to the docs home
 *   `/docs/overview`        → 301 to the docs home (the old landing page)
 *   `/docs/<path>`          → 301 to `<docsHome>/<path>` (trailing slash added)
 *   `/en/docs*`             → same rules (legacy links from published READMEs)
 *
 * Everything else 404s; the route list in `wrangler.jsonc` only captures `/docs*`,
 * so the zone's other apps never reach this Worker.
 */
import docsSite from '../../../config/docs-site.json';

/** Where the docs live now. Verified: every path below resolves on this host. */
const DOCS_TARGET = 'https://samuraicoder.dev/katanakit';
const DOCS_BASE = docsSite.docsBase;

/** Paths that used to be the landing page and must not become sub-paths. */
const HOME_ALIASES = new Set(['', '/', '/overview', '/overview/', '/index.html']);

/** A path that names a file keeps its shape; a route gets a trailing slash (Starlight). */
function toRoute(path: string): string {
  if (/\.[a-z0-9]+$/i.test(path)) return path;
  return path.endsWith('/') ? path : `${path}/`;
}

function targetFor(pathname: string, search: string): string | null {
  // Legacy /en/docs* (old READMEs, shared links) behave like /docs*.
  const path = pathname.startsWith('/en/docs') ? pathname.slice('/en'.length) : pathname;

  if (path !== DOCS_BASE && !path.startsWith(`${DOCS_BASE}/`)) return null;

  const rest = path.slice(DOCS_BASE.length);
  if (HOME_ALIASES.has(rest)) return `${DOCS_TARGET}/${search}`;
  return `${DOCS_TARGET}${toRoute(rest)}${search}`;
}

export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    const target = targetFor(url.pathname, url.search);

    if (!target) return new Response('Not found', { status: 404 });
    return Response.redirect(target, 301);
  },
} satisfies ExportedHandler;
