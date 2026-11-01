/**
 * Brand, navigation and contact data.
 * Single source of truth for anything that is not content.
 */
export const site = {
  name: 'Sergio Jurado',
  legalName: 'Sergio Jurado Casado',
  role: 'Software para operaciones',
  description:
    'Desarrollo software a medida para almacén, logística, retail y back-office: aplicaciones web, paneles internos e integraciones. Cambrils, Tarragona.',
  url: 'https://senseikatana.com',
  locale: 'es_ES',
  lang: 'es',
  location: 'Cambrils · Tarragona',
  social: {
    github: 'https://github.com/senseikatana',
    linkedin: 'https://www.linkedin.com/in/senseijurado/',
  },
  cta: { label: 'Hablemos', href: '/contact' },
  secondary: { label: 'Ver proyectos', href: '/works' },
  nav: [
    { label: 'Servicios', href: '/services' },
    { label: 'Proyectos', href: '/works' },
    { label: 'Blog', href: '/blog' },
  ],
  menu: [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/services' },
    { label: 'Proyectos', href: '/works' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/contact' },
  ],
  footer: [
    {
      title: 'Sitio',
      links: [
        ['Inicio', '/'],
        ['Servicios', '/services'],
        ['Proyectos', '/works'],
        ['Blog', '/blog'],
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
