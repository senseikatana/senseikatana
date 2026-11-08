import { defineMiddleware } from 'astro:middleware';

/**
 * Legacy path redirects. The static Cloudflare Pages deploy reads
 * `public/_redirects`; this map keeps `astro dev` and any future on-demand
 * worker consistent with it.
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
  '/en/servicios': '/en/services',
  '/en/proyectos': '/en/projects',
  '/en/works': '/en/projects',
  '/en/blog': '/en/posts',
};

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
  const target = redirects[url.pathname];
  if (target) {
    return redirect(target, 301);
  }
  return next();
});
