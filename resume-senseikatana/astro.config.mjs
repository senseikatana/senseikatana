import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://senseikatana.github.io/14_cv-sergiojurado',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
