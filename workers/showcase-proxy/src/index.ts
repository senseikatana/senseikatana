/**
 * Showcase redirect Worker — sends showcase.senseikatana.com to the workspace.
 *
 * History: this Worker was first a reverse proxy onto `senseikatana.com/projects`.
 * Projects moved to samuraicoder.dev, one page each at `/works/<slug>`, so that
 * path stopped existing and every request 404'd. It then became a redirector.
 *
 * It is deliberately a redirect and not a Pages custom domain: attaching the
 * subdomain to the site project served a full duplicate of the apex there, which
 * is what this hostname must never do. Redirect Rules would also work, but they
 * need Zone Rulesets permission; the Worker only needs Workers Scripts + Routes.
 *
 * Routing contract (on showcase.senseikatana.com):
 *   `/`          → samuraicoder.dev/works
 *   `/<slug>`    → samuraicoder.dev/works/<slug>
 *   `/<slug>/*`  → samuraicoder.dev/works/<slug>/*  (paths keep their shape)
 *
 * Query strings pass through unchanged.
 *
 * The hostname keeps a proxied record so Cloudflare terminates TLS; this Worker
 * answers before anything downstream is reached.
 */
const WORKSPACE = 'https://samuraicoder.dev/works';

export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    const suffix = url.pathname === '/' ? '' : url.pathname;
    return Response.redirect(`${WORKSPACE}${suffix}${url.search}`, 301);
  },
} satisfies ExportedHandler;
