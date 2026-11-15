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
  secondary: { label: 'Ver proyectos', href: '/projects' },
  nav: [
    { label: 'Servicios', href: '/services' },
    {
      label: 'Proyectos',
      href: '/projects',
      children: [
        { label: 'Empresa Plana', href: '/projects/empresaplana' },
        { label: 'ERP-Lite', href: '/projects/erp-lite' },
        { label: 'POS System', href: '/projects/pos-system' },
        { labelKey: 'home.worksAll', href: '/projects' },
      ],
    },
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
    {
      label: 'Proyectos',
      href: '/projects',
      children: [
        { label: 'Empresa Plana', href: '/projects/empresaplana' },
        { label: 'ERP-Lite', href: '/projects/erp-lite' },
        { label: 'POS System', href: '/projects/pos-system' },
        { labelKey: 'home.worksAll', href: '/projects' },
      ],
    },
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
        ['Proyectos', '/projects'],
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
