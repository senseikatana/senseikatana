import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vuejsAccessibility from 'eslint-plugin-vuejs-accessibility'
import tseslint from 'typescript-eslint'

// Globals de Vue + Nuxt (auto-imports) y del navegador/node
const globals = {
  // Vue
  ref: 'readonly',
  computed: 'readonly',
  reactive: 'readonly',
  watch: 'readonly',
  watchEffect: 'readonly',
  onMounted: 'readonly',
  // Nuxt
  useRoute: 'readonly',
  useRouter: 'readonly',
  useAsyncData: 'readonly',
  useFetch: 'readonly',
  useRuntimeConfig: 'readonly',
  useSeoMeta: 'readonly',
  useHead: 'readonly',
  createError: 'readonly',
  queryCollection: 'readonly',
  navigateTo: 'readonly',
  // i18n
  useI18n: 'readonly',
  useSwitchLocalePath: 'readonly',
  useLocalePath: 'readonly',
  useLocaleHead: 'readonly',
  // color mode
  useColorMode: 'readonly',
  $fetch: 'readonly',
  defineNuxtConfig: 'readonly',
  defineAppConfig: 'readonly',
  defineEventHandler: 'readonly',
  defineContentConfig: 'readonly',
  readBody: 'readonly',
  readRawBody: 'readonly',
  getHeader: 'readonly',
  // Server response helpers (server/routes/**)
  setResponseStatus: 'readonly',
  setHeader: 'readonly',
  // Runtime
  process: 'readonly',
  console: 'readonly',
  fetch: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  URL: 'readonly',
  document: 'readonly',
  window: 'readonly',
  navigator: 'readonly',

  // Auto-imported project composables (app/composables/**)
  useDateRange: 'readonly',
}

export default tseslint.config(
  {
    ignores: [
      '.nuxt/',
      '.output/',
      '.data/',
      'node_modules/',
      'dist/',
      // No es código: lo genera Nuxt, no debe lintarse ni reformatearse.
      'tsconfig.json',
      // JSON y Markdown: los parsea @nuxt/content / i18n, no el parser de JS.
      '**/*.json',
      '**/*.md',
      'bun.lock',
    ],
  },

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

  ...pluginVue.configs['flat/recommended'],
  pluginVue.configs['flat/strongly-recommended'],
  vuejsAccessibility.configs['flat/recommended'],

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
      // El orden de atributos en templates es opinión, no bug.
      'vue/attributes-order': 'off',
    },
  },

  // ── Corrección automática de estilo (sin opinionar sobre diseño) ──
  {
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': 'error',
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'space-before-blocks': 'error',
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2],
      'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'always' }],
    },
  },

  // ── Corrección que SÍ toca semántica ──
  {
    rules: {
      // Detecta typos en identificadores (manger/performace) y encomments.
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // Un `.catch()` vacío traga errores en silencio.
      'no-empty': ['error', { allowEmptyCatch: false }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ── Vue/Nuxt ──
      // Un v-for sin :key hace que Vue reutilice DOM incorrectamente.
      'vue/require-v-for-key': 'error',
      // Defecto de accesibilidad: imagen sin alt.
      'vuejs-accessibility/alt-text': 'error',
      'vuejs-accessibility/anchor-has-content': 'error',
      'vuejs-accessibility/click-events-have-key-events': 'error',
      'vuejs-accessibility/no-static-element-interactions': 'error',
      // No renderizar v-if y v-for en el mismo elemento (lógica confusa + coste).
      'vue/no-use-v-if-with-v-for': 'error',
      // Un <a target="_blank"> sin rel="noopener" permite tabnabbing.
      'vue/no-template-target-blank': 'error',
      // Evitar que un click navegue sin avisar al usuario.
      'vue/no-mutating-props': 'error',
    },
  },

  // ── Contenido: JSON/Markdown no pasan por el parser de JS ──
)
