import { defineMiddleware } from 'astro:middleware';

/** Case studies moved to their own domain; `/works` was this site's old prefix. */
const WORKSPACE = 'https://samuraicoder.dev';

/**
 * Legacy path redirects. The static Cloudflare Pages deploy reads
 * `public/_redirects` (specific slugs, then prefixes); this map keeps
 * `astro dev` consistent for the most common paths.
 *
 * Project URLs are absolute: they leave this site entirely.
 */
const redirects: Record<string, string> = {
  '/hola': '/contact',
  '/resume': '/about',
  '/curriculum': '/about',
  '/servicios': '/services',
  '/blog': '/posts',
  '/getting-started': '/docs/start/getting-started',
  '/ca/servicios': '/ca/services',
  '/ca/blog': '/ca/posts',
  '/en/servicios': '/services',
  '/en/blog': '/posts',
  '/en/posts': '/posts',
  '/en/services': '/services',
  '/en/about': '/about',
  '/en/contact': '/contact',
  // Case studies → samuraicoder.dev
  '/projects': WORKSPACE,
  '/proyectos': WORKSPACE,
  '/works': WORKSPACE,
  '/ca/projects': `${WORKSPACE}/ca`,
  '/ca/proyectos': `${WORKSPACE}/ca`,
  '/ca/works': `${WORKSPACE}/ca`,
  '/en/projects': WORKSPACE,
  '/en/proyectos': WORKSPACE,
  '/en/works': WORKSPACE,
};

/** Prefix redirects, applied only when no exact rule matched. */
const prefixRedirects: [string, string][] = [
  ['/projects/', `${WORKSPACE}/`],
  ['/works/', `${WORKSPACE}/`],
  ['/ca/projects/', `${WORKSPACE}/ca/`],
  ['/ca/works/', `${WORKSPACE}/ca/`],
  ['/en/projects/', `${WORKSPACE}/`],
  ['/en/works/', `${WORKSPACE}/`],
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
