import { defineMiddleware } from 'astro:middleware';

/** Case studies moved to their own domain; `/works` was this site's old prefix. */
const WORKSPACE = 'https://samuraicoder.dev';

/** The KatanaKit docs moved there too: Starlight at `/katanakit/`. `/docs` 404s here. */
const DOCS = `${WORKSPACE}/katanakit`;

/**
 * Legacy path redirects. The static Cloudflare Pages deploy reads
 * `public/_redirects` (specific slugs, then prefixes); this map keeps
 * `astro dev` consistent for the most common paths.
 *
 * Case studies and docs are absolute: they leave this site entirely.
 */
const redirects: Record<string, string> = {
  '/hola': '/contact',
  '/resume': '/about',
  '/curriculum': '/about',
  '/servicios': '/services',
  '/blog': '/posts',
  '/getting-started': `${DOCS}/start/getting-started/`,
  '/docs': `${DOCS}/`,
  '/docs/overview': `${DOCS}/`,
  '/ca/servicios': '/ca/services',
  '/ca/blog': '/ca/posts',
  '/en/servicios': '/services',
  '/en/blog': '/posts',
  '/en/posts': '/posts',
  '/en/services': '/services',
  '/en/about': '/about',
  '/en/contact': '/contact',
  // Case studies → samuraicoder.dev
  '/projects': `${WORKSPACE}/works`,
  '/proyectos': `${WORKSPACE}/works`,
  '/works': `${WORKSPACE}/works`,
  '/ca/projects': `${WORKSPACE}/ca/works`,
  '/ca/proyectos': `${WORKSPACE}/ca/works`,
  '/ca/works': `${WORKSPACE}/ca/works`,
  '/en/projects': `${WORKSPACE}/works`,
  '/en/proyectos': `${WORKSPACE}/works`,
  '/en/works': `${WORKSPACE}/works`,
};

/** Prefix redirects, applied only when no exact rule matched. */
const prefixRedirects: [string, string][] = [
  ['/projects/', `${WORKSPACE}/works/`],
  ['/works/', `${WORKSPACE}/works/`],
  ['/ca/projects/', `${WORKSPACE}/ca/works/`],
  ['/ca/works/', `${WORKSPACE}/ca/works/`],
  ['/en/projects/', `${WORKSPACE}/works/`],
  ['/en/works/', `${WORKSPACE}/works/`],
  ['/docs/', `${DOCS}/`],
  ['/en/docs/', `${DOCS}/`],
];

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
  const target = redirects[url.pathname];
  if (target) {
    return redirect(target, 301);
  }

  for (const [prefix, destination] of prefixRedirects) {
    if (url.pathname.startsWith(prefix)) {
      return redirect(`${destination}${url.pathname.slice(prefix.length)}`, 301);
    }
  }

  return next();
});
