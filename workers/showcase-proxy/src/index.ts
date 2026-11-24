/**
 * Showcase Worker — serves the works grid on showcase.senseikatana.com.
 *
 * The portfolio lives in the `samuraicoder` Pages project as `/works/…`, built
 * with the Astro site's own design. This Worker puts that grid on the showcase
 * subdomain without moving the built output or copying the design: it proxies
 * the request and keeps the address bar on showcase.senseikatana.com.
 *
 * Why a proxy and not a custom domain: attaching the hostname to the Pages
 * project would expose the whole site (docs included) on the subdomain. The
 * showcase is only the works section, so the Worker decides what is reachable.
 *
 * Routing contract (on showcase.senseikatana.com):
 *   `/`            → the works grid          (upstream `/works/`)
 *   `/<slug>`      → one project             (upstream `/works/<slug>`)
 *   `/works/…`     → passed through unchanged, so links emitted by the grid
 *                    keep working with the domain unchanged
 *   `/ _astro/…`   → assets, unchanged
 *
 * Query strings pass through. Everything outside the works grid (the docs at
 * `/start/…`, `/api/…`) is not proxied: it answers 404 here, because the
 * documentation belongs to samuraicoder.dev.
 */
const ORIGIN = 'https://samuraicoder.pages.dev';

/** Upstream path for an incoming showcase path, or null when it is not ours. */
function upstreamPath(pathname: string): string | null {
  if (pathname === '/' || pathname === '/works' || pathname === '/works/') return '/works/';
  // Routes the grid emits (the works section) and its assets resolve as-is.
  if (pathname.startsWith('/works/') || pathname.startsWith('/_astro/')) return pathname;
  // Root-level files (favicon, robots, og image, _redirects targets).
  if (/\.[a-z0-9]+$/i.test(pathname)) return pathname;
  return null;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = upstreamPath(url.pathname);

    if (path === null) {
      return new Response('Not found', { status: 404 });
    }

    const upstream = await fetch(`${ORIGIN}${path}${url.search}`, {
      method: request.method,
      headers: request.headers,
      redirect: 'follow',
    });

    // The upstream markup is served, not rewritten; drop only the headers that
    // would pin the response to the pages.dev hostname.
    const headers = new Headers(upstream.headers);
    headers.delete('content-security-policy');
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  },
} satisfies ExportedHandler;
