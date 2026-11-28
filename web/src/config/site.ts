import docsSite from '../../../config/docs-site.json';

/**
 * Docs URLs derived from the shared scheme (`config/docs-site.json`).
 *
 * The docs are VitePress, published to the `katanakit-docs` Pages project and
 * mounted under `/docs/` by the docs-proxy Worker — that path is live and
 * verified (200 on /docs/overview, /docs/api/, /docs/changelog). Deriving from
 * the shared file keeps the nav and llms.txt from drifting into a dead host.
 */
export const docsLinks = {
  home: `${docsSite.siteOrigin}${docsSite.docsHome}`,
  gettingStarted: `${docsSite.siteOrigin}${docsSite.docsBase}/start/getting-started`,
  guides: `${docsSite.siteOrigin}${docsSite.docsBase}/guides/services/`,
  uiKit: `${docsSite.siteOrigin}${docsSite.docsBase}/ui-kit/`,
  api: `${docsSite.siteOrigin}${docsSite.docsBase}/api/`,
  changelog: `${docsSite.siteOrigin}${docsSite.docsBase}/changelog`,
} as const;

/**
 * The portfolio lives in this repo under `web/src/content/works/<locale>/`.
 * `senseikatana.com/works/<slug>` is the canonical URL for every project.
 * These cards mirror the published content; do not add an href that returns
 * 404: check the target first.
 */
export const workUrl = (slug: string) => `/works/${slug}`;

/** Open-source family. Versions are the published npm ones where they exist. */
export const featuredWorks = [
  {
    title: 'KatanaKit',
    sector: 'TypeScript toolkit',
    version: '7.2.0',
    description:
      'Framework-agnostic TypeScript service toolkit organized with hexagonal architecture.',
    stack: ['TypeScript', 'Hexagonal', 'ESM'],
    href: workUrl('katanakit-js'),
  },
  {
    title: 'KatanaKit CSS',
    sector: 'SCSS framework',
    version: '0.12.5',
    description: 'Lightweight, modular SCSS mini-framework with design tokens and utility classes.',
    stack: ['SCSS', 'Design Tokens', 'Utilities'],
    href: workUrl('katanakit-css'),
  },
  {
    title: 'KatanaKit Sysli',
    sector: 'Rust TUI',
    version: '0.1.0',
    description:
      'ksys — lazygit for the whole systemd ecosystem: units, timers, journal, boot, network, sessions and devices in one TUI.',
    stack: ['Rust', 'Systemd', 'TUI'],
    href: workUrl('katanakit-sysli'),
  },
  {
    title: 'HuePlay',
    sector: 'Color tool',
    version: '',
    description:
      'Interactive tool for understanding color spaces: HSL vs modern perceptually uniform OKLCH.',
    stack: ['Colors', 'OKLCH', 'Interactive'],
    href: workUrl('hueplay'),
  },
] as const;

/** Client work, each with its own page in this site. */
export const clientWorks = [
  {
    title: 'Empresa Plana',
    sector: 'Transport and logistics',
    description: 'Public site and internal panel over the same data model.',
    href: workUrl('empresaplana'),
  },
  {
    title: 'ERP-Lite',
    sector: 'ERP / operations',
    description: 'Multi-company ERP: sales, purchasing, warehouse and transport.',
    href: workUrl('erp-lite'),
  },
  {
    title: 'POS System',
    sector: 'Retail',
    description: 'Point of sale configurable per business domain.',
    href: workUrl('pos-system'),
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
  secondary: { label: 'Ver proyectos', href: '/works' },
  /**
   * Primary navigation: Works · Services · About · Contact.
   * `labelKey` resolves through the dictionaries, so each locale shows its own
   * wording. The KatanaKit docs live under /docs on this host.
   */
  nav: [
    { labelKey: 'nav.works', href: '/works' },
    { labelKey: 'nav.services', href: '/services' },
    { labelKey: 'nav.about', href: '/about' },
    { labelKey: 'nav.contact', href: '/contact' },
  ],
  menu: [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.works', href: '/works' },
    { labelKey: 'nav.services', href: '/services' },
    { labelKey: 'nav.about', href: '/about' },
    { labelKey: 'nav.blog', href: '/posts' },
    { labelKey: 'nav.contact', href: '/contact' },
  ],
  footer: [
    {
      title: 'Sitio',
      links: [
        ['Inicio', '/'],
        ['Servicios', '/services'],
        ['Proyectos', '/works'],
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
