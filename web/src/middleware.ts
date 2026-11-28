import { defineMiddleware } from 'astro:middleware';

/**
 * Legacy path redirects. The static Cloudflare Pages deploy reads
 * `public/_redirects` (specific slugs, then prefixes); this map keeps
 * `astro dev` consistent for the most common paths.
 *
 * Works are local: `/projects` is the old prefix and `/works` is canonical.
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
  // Works → /works
  '/projects': '/works',
  '/proyectos': '/works',
  '/ca/projects': '/ca/works',
  '/ca/proyectos': '/ca/works',
  '/es/projects': '/es/works',
  '/es/proyectos': '/es/works',
  '/en/projects': '/works',
  '/en/proyectos': '/works',
  '/en/works': '/works',
};

/** Prefix redirects, applied only when no exact rule matched. */
const prefixRedirects: [string, string][] = [
  ['/projects/', '/works/'],
  ['/ca/projects/', '/ca/works/'],
  ['/es/projects/', '/es/works/'],
  ['/en/projects/', '/works/'],
  ['/en/works/', '/works/'],
];

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
  const target = redirects[url.pathname];
  if (target) {
    return redirect(target, 301);
  }

  for (const [prefix, destination] of prefixRedirects) {
    if (url.pathname.startsWith(prefix)) {
      const target = `${destination}${url.pathname.slice(prefix.length)}`;
      return redirect(target, 301);
    }
  }

  return next();
});
