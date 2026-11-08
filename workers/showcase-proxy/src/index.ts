/**
 * Showcase proxy Worker — serves the `/projects` section of the Astro site at
 * the root of `showcase.senseikatana.com`.
 *
 * The projects section is part of the main Astro build (`web/`), not a separate
 * site. Rather than duplicate the build, this Worker rewrites the subdomain to
 * the canonical `/projects` path on the apex and proxies the response, so
 * `showcase` always mirrors what `/projects` serves.
 *
 * Routing contract (on showcase.senseikatana.com):
 *   `/`           → the projects index (`/projects`)
 *   `/<slug>`     → one project (`/projects/<slug>`)
 *   `/<slug>/*`   → nested project assets (`/projects/<slug>/*`)
 *
 * Query strings pass through unchanged. The origin is the apex, which is
 * served by the site Pages project.
 */

const SITE_ORIGIN = "https://senseikatana.com";
const PROJECTS_BASE = "/projects";

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const { pathname, search } = url;

		// Normalize: showcase root maps to the projects index. A trailing slash
		// is preserved for the index only so relative asset URLs resolve.
		const suffix = pathname === "/" ? "/" : pathname;
		const target = new URL(`${PROJECTS_BASE}${suffix}${search}`, SITE_ORIGIN);

		return fetch(target, {
			method: request.method,
			headers: request.headers,
			body: request.body,
			redirect: "follow",
		});
	},
} satisfies ExportedHandler;
