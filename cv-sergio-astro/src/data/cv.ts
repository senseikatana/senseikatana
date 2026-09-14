/**
 * Contenido del CV digital (/hola) — versión en español.
 * Fuente: CV_sergiojurado_photo_2026.pdf (Google Docs, 2026).
 * El PDF descargable vive en public/cv/sergio-jurado.pdf.
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  note?: string;
}

export interface CvProfile {
  slug: string;
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  note?: string;
  pdfUrl: string;
  experience: Experience[];
  education: Education[];
  softSkills: string[];
  hardSkills: string[];
  languages: { name: string; level: string }[];
  additional: string[];
}

export const profile: CvProfile = {
  slug: 'sergio-jurado',
  name: 'Sergio Jurado Casado',
  title: 'Auxiliar de comercio, logística y almacén',
  summary:
    'Soy un profesional meticuloso, responsable, con un perfil observador y gran capacidad de análisis, siempre en aprendizaje continuo. Busco integrarme en equipos dinámicos y en entornos que brinden apoyo al desarrollo profesional. Ofrezco conocimientos técnicos y funcionales, habilidades intermedias en ofimática, experiencia integral en gestión comercial y logística de almacenes.',
  email: 'sergiojurado.casado@gmail.com',
  phone: '+34 637 723 747',
  location: 'Cambrils, Tarragona',
  linkedin: 'https://www.linkedin.com/in/senseijurado/',
  note: 'Certif. Discapacidad TEA (35%)',
  pdfUrl: '/cv/sergio-jurado.pdf',
  experience: [
    {
      company: 'Ayuntamiento de Salou',
      role: 'Personal de Mantenimiento y Jardinería',
      period: '2025',
      description: 'Mantenimiento de espacios verdes municipales.',
      highlights: [
        'Uso de desbrozadora para el saneamiento de jardines públicos',
        'Siembra y mantenimiento fitosanitario floral en el municipio',
      ],
    },
    {
      company: 'Esinsa Gaskets',
      role: 'Prácticas no remuneradas',
      period: '2026',
      description: 'Apoyo operativo en almacén y pedidos.',
      highlights: [
        'Picking de espárragos, arandelas, tornillos y tuercas',
        'Mover cajas y realizar pedidos manuales',
      ],
    },
    {
      company: 'Bar Las Cadenas',
      role: 'Asistente de Hostelería',
      period: '2024',
      description: 'Servicio en barra y atención en sala.',
      highlights: [
        'Prestación de servicio de calidad en barra y atención directa en mesa',
        'Supervisión del orden, limpieza integral y correcta adecuación del local',
      ],
    },
    {
      company: 'Passos de Cuinar, Cambrils',
      role: 'Reparto Logístico',
      period: '2024',
      description: 'Transporte y entrega de mercancías.',
      highlights: [
        'Transporte logístico de mercancías asegurando la puntualidad en cada envío',
      ],
    },
    {
      company: 'Uber Eats, Cambrils',
      role: 'Reparto Logístico',
      period: '2023',
      description: 'Distribución de pedidos de alimentación.',
      highlights: [
        'Programación de itinerarios y distribución efectiva de pedidos de alimentación',
      ],
    },
    {
      company: 'GlovoApp S.L, Cambrils',
      role: 'Reparto Logístico',
      period: '2021 – 2023',
      description: 'Reparto a domicilio y soporte a restauración.',
      highlights: [
        'Reparto a domicilio con enfoque en la eficiencia de las trayectorias',
        'Soporte operativo en la cadena de entrega para socios de restauración',
      ],
    },
    {
      company: 'Centro Municipal Deportivo, Valladolid',
      role: 'Responsable de Recepción',
      period: '2020',
      description: 'Atención al usuario y gestión administrativa.',
      highlights: ['Administración de altas de usuarios y resolución eficiente de incidencias'],
    },
  ],
  education: [
    {
      institution: 'Novatecnica',
      degree: 'Certificado Profesional en Auxiliar Comercio Marketing',
      period: '2026',
      note: 'Carretillas y Ventas',
    },
    { institution: 'Novatecnica, Vila-seca', degree: 'PRL', period: '2026' },
    { institution: 'IDFO', degree: 'Operador de Carretons Elevadors', period: '2024' },
    { institution: 'ESI Valladolid', degree: 'Curso de Diseño Multimedia y 3D', period: '2020' },
    { institution: 'I.E.S. Vega del Prado', degree: 'CFGS — ICTI', period: '2017 – 2019' },
    { institution: 'Valladolid', degree: 'CFGM — Laboratorio de Imagen', period: '2008 – 2010' },
    { institution: 'Valladolid', degree: 'E.S.O.', period: '2005 – 2008' },
  ],
  softSkills: [
    'Capacidad analítica y observadora',
    'Responsabilidad y compromiso',
    'Adaptabilidad y flexibilidad',
    'Orientación a resultados y atención al cliente',
    'Aprendizaje continuo',
  ],
  hardSkills: [
    'Gestión logística y control de inventarios',
    'Ofimática intermedia',
    'Manejo de maquinarias (frontal contrapesada, retráctil, apiladoras)',
    'Mantenimiento y jardinería',
  ],
  languages: [
    { name: 'Castellano', level: 'Nativo (oral y escrita)' },
    { name: 'Catalán', level: 'Elemental (comprensión)' },
    { name: 'Inglés', level: 'A2 — conocimientos básicos operativos' },
  ],
  additional: [
    'Titular de licencia de conducción B',
    'Incorporación inmediata — disponibilidad de mañana y tarde',
  ],
};

export const sections = [
  { id: 'perfil', icon: 'user', title: 'Perfil profesional', label: '01' },
  { id: 'experiencia', icon: 'briefcase', title: 'Experiencia', label: '02' },
  { id: 'formacion', icon: 'graduation-cap', title: 'Formación', label: '03' },
  { id: 'skills', icon: 'sparkles', title: 'Skills', label: '04' },
  { id: 'extra', icon: 'info', title: 'Disponibilidad', label: '05' },
];

export const siteNav = [
  { label: 'Hola', href: '/hola/' },
  { label: 'CV completo', href: '/resume/es/' },
  { label: 'Tienda', href: '/resume/es/shop/' },
  { label: 'Contacto', href: '/resume/es/contact/' },
];
