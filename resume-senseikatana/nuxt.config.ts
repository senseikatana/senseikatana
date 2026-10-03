export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
  ],

  css: ['~/assets/css/main.css'],

  /*
   * Fuentes self-hosted — @nuxt/fonts las descarga en build y emite reglas
   * @font-face locales. Sin CDN, así la CSP de abajo se puede seguir cumpliendo.
   */
  fonts: {
    families: [
      { name: 'Bebas Neue', provider: 'google', weights: [400] },
      { name: 'Oswald', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'Archivo', provider: 'google', weights: [400, 500, 600, 700, 800, 900] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 700] },
    ],
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "frame-src 'self'",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join('; '),
      },
    },
    '/hola': { redirect: '/about' },
    '/ca/hola': { redirect: '/ca/about' },
    '/en/hola': { redirect: '/en/about' },
    '/resume': { redirect: '/about' },
    '/curriculum': { redirect: '/about' },
    '/es/resume/**': { redirect: '/about' },
    '/ca/resume/**': { redirect: '/ca/about' },
    '/en/resume/**': { redirect: '/en/about' },
  },

  /*
   * Dark-first. `preference` is only the fallback for first-time visitors with
   * no stored choice; once they pick, @nuxt/color-mode persists their choice
   * and never overrides it again.
   */
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  i18n: {
    locales: [
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es.json' },
      { code: 'ca', name: 'Català', language: 'ca-ES', file: 'ca.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    detectBrowserLanguage: false,
    baseUrl: process.env.SITE_URL || 'http://localhost:3000',
  },

  ui: {
    theme: {
      colors: ['forge', 'dark', 'white'],
    },
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },

  /*
    Contact details are PRIVATE runtime config on purpose.

    They must never live in `content/resume/*` — @nuxt/content serialises the
    whole collection into `_payload.json`, which ships to the browser unasked.
    Hiding a `mailto:` in the template does NOT hide it; the payload leaks it.

    Instead the browser only ever sees `/contact/call` and `/contact/whatsapp`,
    and the server resolves those to the real targets via 302.

    Env: NUXT_CONTACT_PHONE=+34...  NUXT_CONTACT_WHATSAPP=34...
  */
  runtimeConfig: {
    contactPhone: '',
    contactWhatsapp: '',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    },
  },

  app: {
    head: {
      title: 'Sergio Jurado Casado — CV',
      htmlAttrs: {
        lang: 'es',
        dir: 'ltr',
      },
      meta: [
        { name: 'description', content: 'CV digital de Sergio Jurado Casado: logística, almacén, comercio y atención al cliente. Cambrils, Tarragona.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
