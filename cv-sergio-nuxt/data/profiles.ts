export interface Experience {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
  note?: string
}

export interface Profile {
  slug: string
  lang: string
  name: string
  title: string
  summary: string
  email: string
  phone: string
  location: string
  linkedin: string
  note?: string
  /** Public path to the downloadable CV PDF (served from `/public`) */
  pdfUrl: string
  experience: Experience[]
  education: Education[]
  softSkills: string[]
  hardSkills: string[]
  languages: { name: string; level: string }[]
  additional: string[]
}

export const profiles: Profile[] = [
  {
    slug: 'sergio-jurado',
    lang: 'es',
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
        highlights: [
          'Administración de altas de usuarios y resolución eficiente de incidencias',
        ],
      },
    ],
    education: [
      {
        institution: 'Novatecnica',
        degree: 'Certificado Profesional en Auxiliar Comercio Marketing',
        period: '2026',
        note: 'Carretillas y Ventas',
      },
      {
        institution: 'Novatecnica, Vila-seca',
        degree: 'PRL',
        period: '2026',
      },
      {
        institution: 'IDFO',
        degree: 'Operador de Carretons Elevadors',
        period: '2024',
      },
      {
        institution: 'ESI Valladolid',
        degree: 'Curso de Diseño Multimedia y 3D',
        period: '2020',
      },
      {
        institution: 'I.E.S. Vega del Prado',
        degree: 'CFGS — ICTI',
        period: '2017 – 2019',
      },
      {
        institution: 'Valladolid',
        degree: 'CFGM — Laboratorio de Imagen',
        period: '2008 – 2010',
      },
      {
        institution: 'Valladolid',
        degree: 'E.S.O.',
        period: '2005 – 2008',
      },
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
      'Incorporación inmediata (hasta finalizar el curso el 10 de julio, solo por las tardes); después, disponibilidad de mañana y tarde',
    ],
  },
  {
    slug: 'sergio-jurado',
    lang: 'en',
    name: 'Sergio Jurado Casado',
    title: 'Commerce, logistics & warehouse assistant',
    summary:
      'I am a meticulous, responsible professional with an observant profile and strong analytical skills, always learning. I look to join dynamic teams and environments that support professional growth. I bring technical and functional knowledge, intermediate office skills, and hands-on experience in commercial operations and warehouse logistics.',
    email: 'sergiojurado.casado@gmail.com',
    phone: '+34 637 723 747',
    location: 'Cambrils, Tarragona',
    linkedin: 'https://www.linkedin.com/in/senseijurado/',
    note: 'Certified disability — ASD (35%)',
    pdfUrl: '/cv/sergio-jurado.pdf',
    experience: [
      {
        company: 'Salou City Council',
        role: 'Maintenance & Gardening Staff',
        period: '2025',
        description: 'Maintenance of municipal green spaces.',
        highlights: [
          'Brush cutter work for public garden upkeep',
          'Planting and phytosanitary floral maintenance in the municipality',
        ],
      },
      {
        company: 'Esinsa Gaskets',
        role: 'Unpaid internship',
        period: '2026',
        description: 'Warehouse and order support.',
        highlights: [
          'Picking of bolts, washers, screws and nuts',
          'Moving boxes and fulfilling manual orders',
        ],
      },
      {
        company: 'Bar Las Cadenas',
        role: 'Hospitality Assistant',
        period: '2024',
        description: 'Bar service and table wait.',
        highlights: [
          'Quality service at the bar and direct table attention',
          'Keeping the venue ordered, clean and properly set up',
        ],
      },
      {
        company: 'Passos de Cuinar, Cambrils',
        role: 'Logistics Delivery',
        period: '2024',
        description: 'Goods transport and delivery.',
        highlights: [
          'Logistics transport of goods ensuring on-time delivery for every shipment',
        ],
      },
      {
        company: 'Uber Eats, Cambrils',
        role: 'Logistics Delivery',
        period: '2023',
        description: 'Food order distribution.',
        highlights: [
          'Route planning and effective distribution of food orders',
        ],
      },
      {
        company: 'GlovoApp S.L, Cambrils',
        role: 'Logistics Delivery',
        period: '2021 – 2023',
        description: 'Home delivery and restaurant partner support.',
        highlights: [
          'Home delivery focused on efficient routes',
          'Operational support in the delivery chain for restaurant partners',
        ],
      },
      {
        company: 'Municipal Sports Centre, Valladolid',
        role: 'Reception Lead',
        period: '2020',
        description: 'User care and administrative management.',
        highlights: [
          'User registrations and efficient incident resolution',
        ],
      },
    ],
    education: [
      {
        institution: 'Novatecnica',
        degree: 'Professional Certificate — Commerce & Marketing Assistant',
        period: '2026',
        note: 'Forklifts and Sales',
      },
      {
        institution: 'Novatecnica, Vila-seca',
        degree: 'Occupational Risk Prevention (PRL)',
        period: '2026',
      },
      {
        institution: 'IDFO',
        degree: 'Forklift Operator Certificate',
        period: '2024',
      },
      {
        institution: 'ESI Valladolid',
        degree: 'Multimedia & 3D Design Course',
        period: '2020',
      },
      {
        institution: 'I.E.S. Vega del Prado',
        degree: 'Higher VET — ICTI',
        period: '2017 – 2019',
      },
      {
        institution: 'Valladolid',
        degree: 'Intermediate VET — Image Laboratory',
        period: '2008 – 2010',
      },
      {
        institution: 'Valladolid',
        degree: 'Compulsory Secondary Education (ESO)',
        period: '2005 – 2008',
      },
    ],
    softSkills: [
      'Analytical and observant mindset',
      'Responsibility and commitment',
      'Adaptability and flexibility',
      'Results orientation and customer care',
      'Continuous learning',
    ],
    hardSkills: [
      'Logistics management and inventory control',
      'Intermediate office software',
      'Machinery operation (counterbalance, reach truck, stackers)',
      'Maintenance and gardening',
    ],
    languages: [
      { name: 'Spanish', level: 'Native (spoken and written)' },
      { name: 'Catalan', level: 'Elementary (comprehension)' },
      { name: 'English', level: 'A2 — basic operational knowledge' },
    ],
    additional: [
      'Holder of driving licence B',
      'Immediate start (until course ends on 10 July, evenings only); afterwards available mornings and evenings',
    ],
  },
]
