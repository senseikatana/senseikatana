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
  // Dual Shiki themes: the site switches light/dark (and presets) at runtime, so
  // the code blocks must too. Astro's default is github-dark only, which left
  // dark syntax colours on the light canvas at ~1.2:1 contrast.
  // Both sides use the *high contrast* variants: plain github-light tops out at
  // 4.31:1 on the paper canvas and github-dark comments at 3.63:1 on paper-dark,
  // both under WCAG AA. `global.css` binds --shiki-dark to the dark scheme.
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-high-contrast' },
    },
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
