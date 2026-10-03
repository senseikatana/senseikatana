import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
      '~~': resolve(__dirname),
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
