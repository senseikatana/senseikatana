import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

// Globals de Vue + Nuxt (auto-imports) y del navegador/node
const globals = {
  // Vue
  ref: 'readonly',
  computed: 'readonly',
  reactive: 'readonly',
  watch: 'readonly',
  onMounted: 'readonly',
  // Nuxt
  useRoute: 'readonly',
  useRouter: 'readonly',
  useAsyncData: 'readonly',
  useFetch: 'readonly',
  useRuntimeConfig: 'readonly',
  useSeoMeta: 'readonly',
  createError: 'readonly',
  queryCollection: 'readonly',
  navigateTo: 'readonly',
  $fetch: 'readonly',
  defineNuxtConfig: 'readonly',
  defineAppConfig: 'readonly',
  defineEventHandler: 'readonly',
  defineContentConfig: 'readonly',
  readBody: 'readonly',
  readRawBody: 'readonly',
  getHeader: 'readonly',
  // Runtime
  process: 'readonly',
  console: 'readonly',
  fetch: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  URL: 'readonly',
}

export default tseslint.config(
  { ignores: ['.nuxt/', '.output/', '.data/', 'node_modules/', 'dist/'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals,
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },

  ...pluginVue.configs['flat/essential'],

  // Soporte de TypeScript en bloques <script lang="ts"> de .vue
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)