export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@pinia/nuxt',
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
      title: 'Sergio Esteban - Full Stack Developer',
      meta: [
        { name: 'description', content: 'Portfolio, CV, Blog y Tienda de Sergio Esteban' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
