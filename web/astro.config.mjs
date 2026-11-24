// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://senseikatana.com',
  output: 'static',
  trailingSlash: 'ignore',
  // The 404 route is an error page, not content: keep it out of the sitemap.
  integrations: [mdx(), sitemap({ filter: (page) => !/\/404\/?$/.test(page) })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ca'],
    fallback: { es: 'en', ca: 'en' },
    routing: { prefixDefaultLocale: false, fallbackType: 'rewrite' },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
