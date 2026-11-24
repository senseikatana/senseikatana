import docsSite from '../../../config/docs-site.json';

/**
 * Docs URLs derived from the shared scheme (`config/docs-site.json`): the
 * navigation and llms.txt build their docs links from here, so they can never
 * point at a dead docs host again.
 */
export const docsLinks = {
  home: `${docsSite.siteOrigin}${docsSite.docsHome}`,
  gettingStarted: `${docsSite.siteOrigin}${docsSite.docsBase}/start/getting-started`,
  guides: `${docsSite.siteOrigin}${docsSite.docsBase}/guides/`,
  uiKit: `${docsSite.siteOrigin}${docsSite.docsBase}/ui-kit/`,
  api: `${docsSite.siteOrigin}${docsSite.docsBase}/api/`,
  changelog: `${docsSite.siteOrigin}${docsSite.docsBase}/changelog`,
} as const;

/**
 * The portfolio lives on its own domain. Case studies are not part of this
 * site's content collections, so the home page links out instead of rendering
 * them: the two sites stay deployable and severable independently.
 */
export const WORKSPACE_URL = 'https://samuraicoder.dev';

/**
 * Featured case studies, as links out to samuraicoder.dev. Kept here rather
 * than in a content collection because this site does not render them.
 */
export const featuredWorks = [
  {
    title: 'Empresa Plana',
    sector: 'Transport and logistics',
    year: '2026',
    description:
      'Public site and internal panel over the same data model: the team publishes, the site serves static.',
    stack: ['Astro', 'TypeScript', 'Prisma', 'InsForge'],
    href: `${WORKSPACE_URL}/empresaplana`,
  },
  {
    title: 'ERP-Lite',
    sector: 'ERP / operations',
    year: '2026',
    description:
      'Multi-company ERP with a FastAPI backend and Nuxt front end: sales, purchasing, warehouse and transport in a single system.',
    stack: ['FastAPI', 'Python', 'Nuxt', 'PostgreSQL'],
    href: `${WORKSPACE_URL}/erp-lite`,
  },
  {
    title: 'POS System',
    sector: 'Retail / point of sale',
    year: '2026',
    description:
      'Point of sale configurable per business domain, with a hexagonal core and atomic transactions.',
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Prisma'],
    href: `${WORKSPACE_URL}/pos-system`,
  },
] as const;

/**
 * Brand, navigation and contact data.
 * Single source of truth for anything that is not content.
 */
export const site = {
  name: 'Sergio Jurado',
  legalName: 'Sergio Jurado Casado',
  role: {
    en: 'Software for operations',
    es: 'Software para operaciones',
    ca: 'Programari per a operacions',
  },
  description: {
    en: 'Custom software for warehouse, logistics, retail and back office: web applications, internal dashboards and integrations. Cambrils, Tarragona.',
    es: 'Desarrollo software a medida para almacén, logística, retail y back-office: aplicaciones web, paneles internos e integraciones. Cambrils, Tarragona.',
    ca: 'Desenvolupament de programari a mida per a magatzem, logística, retail i back-office: aplicacions web, panells interns i integracions. Cambrils, Tarragona.',
  },
  url: 'https://senseikatana.com',
  locale: 'en_US',
  lang: 'en',
  location: 'Cambrils · Tarragona',
  cv: '/cv/sergio-jurado.pdf',
  contact: {
    phone: '+34637723747',
    phoneDisplay: '+34 637 723 747',
    whatsapp: '34637723747',
    email: 'sergiojurado.casado@gmail.com',
    telegram: '',
  },
  social: {
    github: 'https://github.com/senseikatana',
    linkedin: 'https://www.linkedin.com/in/senseijurado/',
  },
  cta: { label: 'Hablemos', href: '/contact' },
  secondary: { label: 'Ver proyectos', href: WORKSPACE_URL },
  nav: [
    { label: 'Servicios', href: '/services' },
    { label: 'Proyectos', href: WORKSPACE_URL, external: true },
    { label: 'Sobre mí', href: '/about' },
    { label: 'Blog', href: '/posts' },
    {
      label: 'Documentación',
      href: docsLinks.home,
      children: [
        { label: 'Getting started', href: docsLinks.gettingStarted },
        { label: 'Guides', href: docsLinks.guides },
        { label: 'UI Kit', href: docsLinks.uiKit },
        { label: 'API reference', href: docsLinks.api },
        { label: 'Changelog', href: docsLinks.changelog },
      ],
    },
  ],
  menu: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/services' },
    { label: 'Proyectos', href: WORKSPACE_URL, external: true },
    { label: 'Sobre mí', href: '/about' },
    { label: 'Blog', href: '/posts' },
    {
      label: 'Documentación',
      href: docsLinks.home,
      children: [
        { label: 'Getting started', href: docsLinks.gettingStarted },
        { label: 'Guides', href: docsLinks.guides },
        { label: 'UI Kit', href: docsLinks.uiKit },
        { label: 'API reference', href: docsLinks.api },
        { label: 'Changelog', href: docsLinks.changelog },
      ],
    },
    { label: 'Contacto', href: '/contact' },
  ],
  footer: [
    {
      title: 'Sitio',
      links: [
        ['Inicio', '/'],
        ['Servicios', '/services'],
        ['Proyectos', WORKSPACE_URL],
        ['Sobre mí', '/about'],
        ['Blog', '/posts'],
      ] as [string, string][],
    },
    {
      title: 'Contacto',
      links: [
        ['Hablemos', '/contact'],
        ['GitHub', 'https://github.com/senseikatana'],
        ['LinkedIn', 'https://www.linkedin.com/in/senseijurado/'],
      ] as [string, string][],
    },
  ],
} as const;
