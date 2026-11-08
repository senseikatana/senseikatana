import { defineMiddleware } from 'astro:middleware';

/**
 * Legacy path redirects. The static Cloudflare Pages deploy reads
 * `public/_redirects` (specific slugs, then prefixes); this map keeps
 * `astro dev` consistent for the most common paths.
 */
const redirects: Record<string, string> = {
  '/hola': '/contact',
  '/resume': '/about',
  '/curriculum': '/about',
  '/servicios': '/services',
  '/proyectos': '/projects',
  '/works': '/projects',
  '/blog': '/posts',
  '/docs': '/en/docs/',
  '/getting-started': '/en/docs/start/getting-started',
  '/ca/servicios': '/ca/services',
  '/ca/proyectos': '/ca/projects',
  '/ca/works': '/ca/projects',
  '/ca/blog': '/ca/posts',
  '/en/servicios': '/services',
  '/en/proyectos': '/projects',
  '/en/works': '/projects',
  '/en/blog': '/posts',
  '/en/posts': '/posts',
  '/en/projects': '/projects',
  '/en/services': '/services',
  '/en/about': '/about',
  '/en/contact': '/contact',
};

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
  const target = redirects[url.pathname];
  if (target) {
    return redirect(target, 301);
  }
  return next();
});
