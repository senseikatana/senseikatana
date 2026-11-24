/**
 * Showcase redirect Worker — sends showcase.senseikatana.com to the workspace.
 *
 * History: this Worker used to reverse-proxy the subdomain onto
 * `senseikatana.com/projects`, so `showcase` was a window into the projects
 * section of the main Astro build. Projects then moved to samuraicoder.dev,
 * one page each at `/works/<slug>`, and `/projects` stopped existing here. The
 * proxy kept returning 404 for every request.
 *
 * It is now a redirector instead of a proxy: no fetch, no dependency on this
 * repo's build, and the destination is the page that actually serves the
 * content.
 *
 * Routing contract (on showcase.senseikatana.com):
 *   `/`          → samuraicoder.dev/works
 *   `/<slug>`    → samuraicoder.dev/works/<slug>
 *   `/<slug>/*`  → samuraicoder.dev/works/<slug>/*  (paths keep their shape)
 *
 * Query strings pass through unchanged.
 *
 * The subdomain's TLS certificate is currently invalid
 * (ERR_CERT_COMMON_NAME_INVALID), so requests fail before reaching this Worker.
 * The code is correct for when that is fixed; if the subdomain is not wanted,
 * deleting the route and the DNS record is the cheaper fix.
 */
const WORKSPACE = 'https://samuraicoder.dev/works';

export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    const suffix = url.pathname === '/' ? '' : url.pathname;
    return Response.redirect(`${WORKSPACE}${suffix}${url.search}`, 301);
  },
} satisfies ExportedHandler;
