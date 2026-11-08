// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://senseikatana.com',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en'],
    fallback: { ca: 'es', en: 'es' },
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
