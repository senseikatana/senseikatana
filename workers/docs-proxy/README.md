# Docs proxy Worker

Mounts the `katanakit-docs` Pages project under `/docs/` on apex domains
that already serve other applications. The Pages project cannot share a
hostname with an unrelated origin, so this Worker reverse-proxies the docs
prefix.

## Domains

| Domain             | Status                                              |
| ------------------ | --------------------------------------------------- |
| `senseikatana.com` | Docs/library domain — the only one serving `/docs/` |

## Routing

| Path              | Behaviour                                                     |
| ----------------- | ------------------------------------------------------------- |
| `/docs`, `/docs/` | 301 → `/docs/overview` (the home page's public URL)           |
| `/docs/overview*` | The docs landing page (aliased onto the build's section root) |
| `/docs/*`         | Proxied to Pages, path for path                               |
| `/en/docs*`       | 301 → the canonical `/docs…` URLs (legacy links)              |

## Deploy

```bash
bun run deploy:proxy   # from the repo root
```

`scripts/docs.mjs deploy` redeploys this Worker automatically after every docs
deploy: the URL contract (base path, home alias, legacy redirects) is one unit
and both deployments always land together.

Requires `CLOUDFLARE_API_TOKEN` or a `wrangler login` session with Workers
edit permission on the target zones.

## How it works

1. The Worker listens **only** on `/docs*` (and legacy `/en/docs*`) routes
   (see `wrangler.jsonc`).
2. It calls the Pages project through a Service Binding (no HTTP hop).
3. If the binding is unavailable (first deploy), it falls back to an HTTP
   fetch of `katanakit-docs.pages.dev`.
4. Everything outside those prefixes returns 404 so existing zone routes
   (the personal site, the extranet app, samurai site, etc.) are never
   affected.

## Adding a domain

1. Make sure the zone exists in the Cloudflare account.
2. Add a route entry in `wrangler.jsonc`.
3. Re-deploy: `npx wrangler deploy -c workers/docs-proxy/wrangler.jsonc`.

## Removing the proxy

Delete the routes from `wrangler.jsonc` and redeploy, or
`npx wrangler delete -c workers/docs-proxy/wrangler.jsonc` to remove the
Worker entirely. The Pages project keeps running independently at
`katanakit-docs.pages.dev`.
