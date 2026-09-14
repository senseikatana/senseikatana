import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://senseikatana.com',
  base: '/resume',
  trailingSlash: 'always',
  output: 'static'
});
