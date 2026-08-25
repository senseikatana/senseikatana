import { defineConfig } from 'vite';
import purgecss from 'vite-plugin-purgecss';

const PORT = process.env.PORT || 4321;

export default defineConfig({
  root: '.',
  server: {
    port: PORT,
    open: false,
    host: true,
    hmr: true,
    watch: {
      alwaysStat: true,
      ignored: ['**/node_modules/**', '**/dist/**'],
      atomic: true,
    },
    cors: true,
    allowedHosts: ['localhost'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
  plugins: [
    process.env.NODE_ENV === 'production' &&
      purgecss({
        content: ['./**/*.html', './**/*.js', './**/*.ts'],
        safelist: {
          standard: [/^:root$/, /^html$/, /^body$/, /^\.container$/],
        },
      }),
  ].filter(Boolean),
});