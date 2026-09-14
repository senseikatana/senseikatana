export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
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
      colors: ['rose', 'teal', 'emerald', 'yellow', 'sky', 'dark', 'white', 'lavender'],
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

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
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
