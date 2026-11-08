import { defineMiddleware } from 'astro:middleware';

/**
 * Legacy path redirects. Kept in one place so the Worker and the site agree:
 * the Worker forwards the request, this returns the 301.
 */
const redirects: Record<string, string> = {
  '/hola': '/contact',
  '/resume': '/',
  '/curriculum': '/',
  '/servicios': '/services',
  '/proyectos': '/works',
  '/ca/servicios': '/services',
  '/en/servicios': '/services',
  '/ca/proyectos': '/works',
  '/en/proyectos': '/works',
};

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
  const target = redirects[url.pathname];
  if (target) {
    return redirect(target, 301);
  }
  return next();
});
