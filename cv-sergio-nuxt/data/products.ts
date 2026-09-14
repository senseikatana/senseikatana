import { useSlugify } from 'katanakit-js'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  currency: string
  image: string
  category: string
  stripePriceId: string
  featured: boolean
  /** Enlace externo de venta (Wallapop, Vinted, etc.). Si está presente, la card enlaza fuera y no usa Stripe. */
  externalUrl?: string
  externalPlatform?: 'wallapop' | 'vinted'
}

export const products: Product[] = [
  {
    id: 'prod-001',
    slug: useSlugify('Curso Nuxt 4 desde Cero'),
    name: 'Curso Nuxt 4 desde Cero',
    description: 'Aprende Nuxt 4 con las mejores prácticas, Composition API, y deployment en producción. Incluye 40+ horas de contenido.',
    price: 49.99,
    currency: 'USD',
    image: '/images/products/nuxt-course.jpg',
    category: 'cursos',
    stripePriceId: 'price_nuxt4_course',
    featured: true,
  },
  {
    id: 'prod-002',
    slug: useSlugify('Template SaaS Nuxt'),
    name: 'Template SaaS Nuxt',
    description: 'Starter kit completo para SaaS con autenticación, pagos, dashboard y panel de administración.',
    price: 79.99,
    currency: 'USD',
    image: '/images/products/saas-template.jpg',
    category: 'templates',
    stripePriceId: 'price_saas_template',
    featured: true,
  },
  {
    id: 'prod-003',
    slug: useSlugify('E-book Arquitectura Limpia'),
    name: 'E-book Arquitectura Limpia',
    description: 'Guía práctica sobre Clean Architecture, Hexagonal Architecture y Domain-Driven Design aplicados a proyectos reales.',
    price: 19.99,
    currency: 'USD',
    image: '/images/products/clean-arch-ebook.jpg',
    category: 'ebooks',
    stripePriceId: 'price_clean_arch_ebook',
    featured: false,
  },
  {
    id: 'prod-004',
    slug: useSlugify('Componentes UI Premium'),
    name: 'Componentes UI Premium',
    description: 'Librería de 50+ componentes Nuxt UI premium con dark mode, accesibilidad y documentación completa.',
    price: 39.99,
    currency: 'USD',
    image: '/images/products/ui-components.jpg',
    category: 'componentes',
    stripePriceId: 'price_ui_components',
    featured: true,
  },
  {
    id: 'prod-005',
    slug: useSlugify('Mentoría 1:1 (1 hora)'),
    name: 'Mentoría 1:1 (1 hora)',
    description: 'Sesión personalizada de mentoría sobre desarrollo web, arquitectura, o resolución de problemas técnicos.',
    price: 59.99,
    currency: 'USD',
    image: '/images/products/mentoring.jpg',
    category: 'servicios',
    stripePriceId: 'price_mentoring_1h',
    featured: false,
  },
  {
    id: 'prod-006',
    slug: useSlugify('Code Review Profesional'),
    name: 'Code Review Profesional',
    description: 'Revisión detallada de tu código con sugerencias de mejora, mejores prácticas y optimización de rendimiento.',
    price: 29.99,
    currency: 'USD',
    image: '/images/products/code-review.jpg',
    category: 'servicios',
    stripePriceId: 'price_code_review',
    featured: false,
  },
  // TODO: reemplazar externalUrl por el enlace real de cada anuncio.
  {
    id: 'ext-001',
    slug: useSlugify('Apple Watch Series 7'),
    name: 'Apple Watch Series 7',
    description: 'Reloj usado en excelente estado, poco uso. Venta a través de Wallapop con envío seguro.',
    price: 199,
    currency: 'EUR',
    image: '/images/products/apple-watch.jpg',
    category: 'segunda-mano',
    stripePriceId: '',
    externalUrl: 'https://es.wallapop.com/user/senseikatana',
    externalPlatform: 'wallapop',
    featured: false,
  },
  {
    id: 'ext-002',
    slug: useSlugify('Zapatillas Nike Air Max'),
    name: 'Zapatillas Nike Air Max',
    description: 'Zapatillas en muy buen estado, talla 42. Publicadas en Vinted con envío a toda España.',
    price: 45,
    currency: 'EUR',
    image: '/images/products/nike-air-max.jpg',
    category: 'segunda-mano',
    stripePriceId: '',
    externalUrl: 'https://www.vinted.es/member/senseikatana',
    externalPlatform: 'vinted',
    featured: false,
  },
]

export const externalPlatformLabel = (platform?: Product['externalPlatform']): string =>
  platform === 'vinted' ? 'Vinted' : 'Wallapop'

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'cursos', label: 'Courses' },
  { id: 'templates', label: 'Templates' },
  { id: 'ebooks', label: 'E-books' },
  { id: 'componentes', label: 'Components' },
  { id: 'servicios', label: 'Services' },
  { id: 'segunda-mano', label: 'Second Hand' },
]
