export type Lang = 'es' | 'ca' | 'en';
export type Page = 'about' | 'services' | 'contact' | 'shop';
export type Profile = 'logistica' | 'fullstack' | 'generico';

/**
 * Única fuente de verdad de las rutas generadas.
 *
 * Viven acá y no en el frontmatter de las páginas porque `getStaticPaths()`
 * corre en un scope aislado: no puede leer variables del frontmatter, pero sí
 * los imports a nivel de módulo. Así las tres páginas que necesitan las listas
 * comparten una sola definición.
 */
export const LANGS = ['es', 'ca', 'en'] as const satisfies readonly Lang[];
export const PAGES = ['about', 'services', 'contact', 'shop'] as const satisfies readonly Page[];
export const PROFILE_IDS = ['logistica', 'fullstack', 'generico'] as const satisfies readonly Profile[];
export const ROUTE_IDS = [...PAGES, ...PROFILE_IDS] as const;
export type RouteId = (typeof ROUTE_IDS)[number];

export const meta = {
  name: 'Sergio Jurado Casado',
  email: 'sergiojurado.casado@gmail.com',
  phone: '+34 637 723 747',
  linkedin: 'https://www.linkedin.com/in/senseijurado/',
  github: 'https://github.com/senseikatana',
};

export interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  tasks: string[];
}

export interface EducationEntry {
  t: string;
  p: string;
  d: string;
}

export interface ProfileExp {
  t: string;
  c: string;
  d: string;
  b: string[];
}

export interface ProfileContent {
  title: string;
  role: string;
  desc: string;
  about: string;
  skills: string[];
  exp: ProfileExp[];
}

export interface ServiceItem {
  t: string;
  d: string;
}

export interface Ui {
  home: string;
  about: string;
  services: string;
  shop: string;
  contact: string;
  greeting: string;
  subtitle: string;
  roles: string;
  aboutHeading: string;
  bio: string[];
  location: string;
  teaCert: string;
  license: string;
  availability: string;
  whatIDo: string;
  servicesList: ServiceItem[];
  skillsHardTitle: string;
  skillsHard: string[];
  skillsSoftTitle: string;
  skillsSoft: string[];
  skillsTitle: string;
  languagesTitle: string;
  languages: string[];
  choose: string;
  view: string;
  recentExp: string;
  educationTitle: string;
  fullCV: string;
  links: string;
  shopTitle: string;
  shopIntro: string;
  contactIntro: string;
  formName: string;
  formEmail: string;
  formMsg: string;
  send: string;
  formInvalid: string;
  contactPhone: string;
  contactProfile: string;
  contactRepos: string;
  pickup: string;
  toggleTheme: string;
  footer: string;
  shopSubject: string;
  formSubject: string;
  formHint: string;
}

export const ui: Record<Lang, Ui> = {
  es: {
    home: 'Inicio', about: 'Sobre mí', services: 'Servicios',
    shop: 'Tienda', contact: 'Contacto',
    greeting: 'Hola', subtitle: 'Soy Sergio Jurado',
    roles: 'Logística · Desarrollo Web · Mantenimiento',
    bio: [
      'Profesional meticuloso, responsable, con perfil observador y gran capacidad de análisis, siempre en aprendizaje continuo.',
      'Busco integrarme en equipos dinámicos y en entornos que apoyen el desarrollo profesional.',
      'Ofrezco conocimientos técnicos, habilidades intermedias en ofimática y experiencia integral en gestión comercial y logística.'
    ],
    location: 'Cambrils, Tarragona',
    teaCert: 'Certif. Discapacidad TEA (35%)',
    license: 'Licencia de conducir B',
    availability: 'Incorporación inmediata',
    whatIDo: 'Lo que hago',
    aboutHeading: 'Sobre mí',
    servicesList: [
      { t: 'Logística y almacén', d: 'Gestión de inventario, carretillas (frontal, retráctil, apiladoras), picking y expedición.' },
      { t: 'Desarrollo web', d: 'Sitios y apps pequeñas con Astro, TypeScript y Node. Portfolios, catálogos y tiendas.' },
      { t: 'Mantenimiento y jardinería', d: 'Desbroce, siembra y mantenimiento fitosanitario.' },
      { t: 'Atención al cliente', d: 'Altas de usuarios, resolución de incidencias y soporte directo.' }
    ],
    skillsHardTitle: 'Hard skills',
    skillsHard: ['Gestión logística y control de inventarios', 'Ofimática intermedia', 'Manejo de maquinarias', 'Mantenimiento y jardinería'],
    skillsSoftTitle: 'Soft skills',
    skillsSoft: ['Capacidad analítica', 'Responsabilidad', 'Adaptabilidad', 'Orientación a resultados', 'Aprendizaje continuo'],
    skillsTitle: 'Skills',
    languagesTitle: 'Idiomas',
    languages: ['Castellano (nativo)', 'Catalán (elemental)', 'Inglés (A2)'],
    choose: 'Elige un perfil',
    view: 'Ver CV →',
    recentExp: 'Experiencia reciente',
    educationTitle: 'Formación',
    fullCV: 'Ver CV completo →',
    links: 'Enlaces',
    shopTitle: 'Tienda de 2ª mano',
    shopIntro: 'Productos que ya no uso pero pueden servirte.',
    contactIntro: 'Estoy disponible para incorporación inmediata.',
    formName: 'Tu nombre', formEmail: 'Tu email', formMsg: 'Cuéntame...', send: 'Enviar',
    formInvalid: 'Revisa los campos marcados: falta el nombre, el email no es válido o el mensaje está vacío.',
    contactPhone: 'Tel', contactProfile: 'Perfil', contactRepos: 'Repositorios',
    pickup: 'Recogida en Cambrils o envío a acordar. Pago por Bizum o transferencia.',
    toggleTheme: 'Cambiar tema',
    shopSubject: 'Consulta tienda',
    formSubject: 'Contacto desde la web',
    formHint: 'Al enviar se abrirá tu programa de correo con el mensaje relleno. Si prefieres, escríbeme directo.',
    footer: 'Portfolio profesional.'
  },
  ca: {
    home: 'Inici', about: 'Sobre mi', services: 'Serveis',
    shop: 'Botiga', contact: 'Contacte',
    greeting: 'Hola', subtitle: 'Sóc en Sergio Jurado',
    roles: 'Logística · Desenvolupament Web · Manteniment',
    bio: [
      'Professional meticulós, responsable, amb perfil observador i gran capacitat d\'anàlisi, sempre en aprenentatge continu.',
      'Busco integrar-me en equips dinàmics i en entorns que donin suport al desenvolupament professional.',
      'Ofereixo coneixements tècnics, habilitats intermèdies en ofimàtica i experiència integral en gestió comercial i logística.'
    ],
    location: 'Cambrils, Tarragona',
    teaCert: 'Certif. Discapacitat TEA (35%)',
    license: 'Permís de conduir B',
    availability: 'Incorporació immediata',
    whatIDo: 'Què faig',
    aboutHeading: 'Sobre mi',
    servicesList: [
      { t: 'Logística i magatzem', d: 'Gestió d\'inventari, carretons, picking i expedició.' },
      { t: 'Desenvolupament web', d: 'Llocs i petites apps amb Astro, TypeScript i Node.' },
      { t: 'Manteniment i jardineria', d: 'Desbrossament, sembra i manteniment fitosanitari.' },
      { t: 'Atenció al client', d: 'Altes d\'usuaris, resolució d\'incidències i suport directe.' }
    ],
    skillsHardTitle: 'Habilitats tècniques',
    skillsHard: ['Gestió logística', 'Ofimàtica', 'Maquinària', 'Manteniment'],
    skillsSoftTitle: 'Habilitats personals',
    skillsSoft: ['Analítica', 'Responsabilitat', 'Adaptabilitat', 'Resultats', 'Aprenentatge'],
    skillsTitle: 'Habilitats',
    languagesTitle: 'Idiomes',
    languages: ['Castellà (natiu)', 'Català (elemental)', 'Anglès (A2)'],
    choose: 'Tria un perfil',
    view: 'Veure CV →',
    recentExp: 'Experiència recent',
    educationTitle: 'Formació',
    fullCV: 'Veure CV complet →',
    links: 'Enllaços',
    shopTitle: 'Botiga de 2a mà',
    shopIntro: 'Productes que ja no faig servir però et poden servir.',
    contactIntro: 'Estic disponible per incorporació immediata.',
    formName: 'El teu nom', formEmail: 'El teu email', formMsg: 'Explica\'m...', send: 'Enviar',
    formInvalid: 'Revisa els camps marcats: falta el nom, l\'email no és vàlid o el missatge és buit.',
    contactPhone: 'Tel', contactProfile: 'Perfil', contactRepos: 'Repositoris',
    pickup: 'Recollida a Cambrils o enviament a acordar. Pagament per Bizum o transferència.',
    toggleTheme: 'Canvia el tema',
    shopSubject: 'Consulta botiga',
    formSubject: 'Contacte des de la web',
    formHint: 'En enviar s\'obrirà el teu programa de correu amb el missatge emplenat. Si prefereixes, escriu-me directament.',
    footer: 'Portfolio professional.'
  },
  en: {
    home: 'Home', about: 'About', services: 'Services',
    shop: 'Shop', contact: 'Contact',
    greeting: 'Hi', subtitle: "I'm Sergio Jurado",
    roles: 'Logistics · Web Development · Maintenance',
    bio: [
      'Meticulous, responsible professional with an observant profile and strong analytical skills, always learning.',
      'I look to join dynamic teams and environments that support professional growth.',
      'I offer technical knowledge, intermediate office skills and comprehensive experience in commercial and warehouse management.'
    ],
    location: 'Cambrils, Tarragona',
    teaCert: 'ASD Disability Cert. (35%)',
    license: 'Driving licence B',
    availability: 'Immediate availability',
    whatIDo: 'What I do',
    aboutHeading: 'About me',
    servicesList: [
      { t: 'Logistics & warehouse', d: 'Inventory, forklifts (front, reach, stacker), picking and dispatch.' },
      { t: 'Web development', d: 'Sites and small apps with Astro, TypeScript and Node.' },
      { t: 'Maintenance & gardening', d: 'Brush clearing, planting and phytosanitary upkeep.' },
      { t: 'Customer service', d: 'User registration, incident handling and direct support.' }
    ],
    skillsHardTitle: 'Hard skills',
    skillsHard: ['Logistics management', 'Intermediate Office', 'Forklifts', 'Maintenance'],
    skillsSoftTitle: 'Soft skills',
    skillsSoft: ['Analysis', 'Responsibility', 'Adaptability', 'Results', 'Continuous learning'],
    skillsTitle: 'Skills',
    languagesTitle: 'Languages',
    languages: ['Spanish (native)', 'Catalan (basic)', 'English (A2)'],
    choose: 'Choose a profile',
    view: 'View CV →',
    recentExp: 'Recent experience',
    educationTitle: 'Education',
    fullCV: 'View full CV →',
    links: 'Links',
    shopTitle: 'Second-hand shop',
    shopIntro: 'Items I no longer use that could be useful to you.',
    contactIntro: 'Available for immediate start.',
    formName: 'Your name', formEmail: 'Your email', formMsg: 'Tell me...', send: 'Send',
    formInvalid: 'Please check the highlighted fields: name is missing, the email is not valid, or the message is empty.',
    contactPhone: 'Phone', contactProfile: 'Profile', contactRepos: 'Repositories',
    pickup: 'Pickup in Cambrils or shipping to agree. Payment by Bizum or bank transfer.',
    toggleTheme: 'Toggle theme',
    shopSubject: 'Shop enquiry',
    formSubject: 'Contact via website',
    formHint: 'On submit your email client opens with the message pre-filled. You can also email me directly.',
    footer: 'Professional portfolio.'
  }
};

export const experience: Record<Lang, ExperienceEntry[]> = {
  es: [
    { role: 'Personal de Mantenimiento y Jardinería', company: 'Ayuntamiento de Salou', dates: '2025', tasks: ['Uso de desbrozadora para jardines públicos', 'Siembra y mantenimiento fitosanitario'] },
    { role: 'Prácticas No Remuneradas', company: 'Esinsa Gaskets', dates: '2026', tasks: ['Picking de espárragos, arandelas, tornillos y tuercas', 'Mover cajas y realizar pedidos manuales'] },
    { role: 'Asistente de Hostelería', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Servicio en barra y mesa', 'Supervisión de orden y limpieza'] },
    { role: 'Reparto Logístico', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Transporte logístico puntual'] },
    { role: 'Reparto Logístico', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Programación de itinerarios', 'Distribución de pedidos'] },
    { role: 'Reparto Logístico', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Reparto eficiente', 'Soporte operativo a socios de restauración'] },
    { role: 'Responsable de Recepción', company: 'Centro Municipal Deportivo, Valladolid', dates: '2020', tasks: ['Altas de usuarios', 'Resolución de incidencias'] }
  ],
  ca: [
    { role: 'Personal de Manteniment i Jardineria', company: 'Ajuntament de Salou', dates: '2025', tasks: ['Desbrossadora per a jardins públics', 'Sembra i manteniment fitosanitari'] },
    { role: 'Pràctiques No Remunerades', company: 'Esinsa Gaskets', dates: '2026', tasks: ['Picking d\'espàrrecs, volanderes, cargols i femelles', 'Moure caixes i fer comandes manuals'] },
    { role: 'Assistent d\'Hostaleria', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Servei en barra i taula', 'Supervisió d\'ordre i neteja'] },
    { role: 'Repartiment Logístic', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Transport logístic puntual'] },
    { role: 'Repartiment Logístic', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Programació d\'itineraris', 'Distribució de comandes'] },
    { role: 'Repartiment Logístic', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Repartiment eficient', 'Suport operatiu'] },
    { role: 'Responsable de Recepció', company: 'Centre Municipal Esportiu, Valladolid', dates: '2020', tasks: ['Altes d\'usuaris', 'Resolució d\'incidències'] }
  ],
  en: [
    { role: 'Maintenance & Gardening Staff', company: 'Salou City Council', dates: '2025', tasks: ['Brush clearing in public gardens', 'Planting and phytosanitary upkeep'] },
    { role: 'Unpaid Internship', company: 'Esinsa Gaskets', dates: '2026', tasks: ['Picking of studs, washers, screws and nuts', 'Moving boxes and fulfilling manual orders'] },
    { role: 'Hospitality Assistant', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Bar and table service', 'Cleanliness supervision'] },
    { role: 'Logistics Delivery', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Timely goods transport'] },
    { role: 'Logistics Delivery', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Route planning', 'Food distribution'] },
    { role: 'Logistics Delivery', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Efficient delivery', 'Restaurant partner support'] },
    { role: 'Reception Manager', company: 'Municipal Sports Centre, Valladolid', dates: '2020', tasks: ['User registration', 'Incident resolution'] }
  ]
};

export const education: Record<Lang, EducationEntry[]> = {
  es: [
    { t: 'Certificado Profesional Auxiliar Comercio Marketing', p: 'Novatecnica', d: '2026' },
    { t: 'PRL (Prevención de Riesgos Laborales)', p: 'Novatecnica, Vila-seca', d: '2026' },
    { t: 'Operador de Carretons Elevadors', p: 'IDFO', d: '2024' },
    { t: 'Diseño Multimedia y 3D', p: 'ESI Valladolid', d: '2020' },
    { t: 'CFGS ICTI', p: 'I.E.S. Vega del Prado', d: '2017 — 2019' },
    { t: 'CFGM Laboratorio de Imagen', p: 'Valladolid', d: '2008 — 2010' },
    { t: 'E.S.O.', p: 'Valladolid', d: '2005 — 2008' }
  ],
  ca: [
    { t: 'Certificat Professional Auxiliar Comerç Màrqueting', p: 'Novatecnica', d: '2026' },
    { t: 'PRL (Prevenció de Riscos Laborals)', p: 'Novatecnica, Vila-seca', d: '2026' },
    { t: 'Operador de Carretons Elevadors', p: 'IDFO', d: '2024' },
    { t: 'Disseny Multimèdia i 3D', p: 'ESI Valladolid', d: '2020' },
    { t: 'CFGS ICTI', p: 'I.E.S. Vega del Prado', d: '2017 — 2019' },
    { t: 'CFGM Laboratori d\'Imatge', p: 'Valladolid', d: '2008 — 2010' },
    { t: 'E.S.O.', p: 'Valladolid', d: '2005 — 2008' }
  ],
  en: [
    { t: 'Professional Certificate in Trade & Marketing Assistant', p: 'Novatecnica', d: '2026' },
    { t: 'Occupational Risk Prevention (PRL)', p: 'Novatecnica, Vila-seca', d: '2026' },
    { t: 'Forklift Operator Certificate', p: 'IDFO', d: '2024' },
    { t: 'Multimedia & 3D Design', p: 'ESI Valladolid', d: '2020' },
    { t: 'Higher Diploma in ICTI', p: 'I.E.S. Vega del Prado', d: '2017 — 2019' },
    { t: 'Vocational Diploma in Image Lab', p: 'Valladolid', d: '2008 — 2010' },
    { t: 'Compulsory Secondary Education (ESO)', p: 'Valladolid', d: '2005 — 2008' }
  ]
};

/**
 * Ordena por fecha descendente (más reciente primero).
 *
 * Los `dates` son strings con prefijo ISO (`2025`, `2021 — 2023`), así que el
 * orden lexicográfico coincide con el cronológico. Se ordena al renderizar y no
 * en el literal para que agregar un empleo mal ordenado no rompa la cronología.
 */
const byDateDesc = <T extends { dates: string }>(a: T, b: T): number =>
  b.dates.localeCompare(a.dates, 'es');

/**
 * Deriva la experiencia de un perfil desde `experience`, que es la única fuente
 * real de datos de empleo. Ningún perfil puede inventar empleadores.
 *
 * `e.tasks` se copia (`[...]`) a propósito: si no, `profile.exp[*].b` y
 * `experience[*].tasks` serían el mismo array mutable y ordenar o filtrar en un
 * sitio mutaría el otro.
 */
const profileExp = (lang: Lang): ProfileExp[] =>
  [...experience[lang]]
    .sort(byDateDesc)
    .map((e) => ({ t: e.role, c: e.company, d: e.dates, b: [...e.tasks] }));

export const profiles: Record<Profile, Record<Lang, ProfileContent>> = {
  logistica: {
    es: {
      title: 'Logística y almacén',
      role: 'Auxiliar de comercio, logística y almacén',
      desc: 'Reparto, picking y atención al cliente, con carretilla elevadora y PRL certificados.',
      about:
        'Mi base profesional es la logística de última milla y el almacén. He trabajado en Empresas de reparto (Glovo, Uber Eats, Passos de Cuinar) y en almacén (Esinsa Gaskets), haciendo picking, preparación de pedidos, carga y descarga y reparto a domicilio. Además de la parte operativa, he atendido usuarios en un centro municipal deportivo, resolviendo altas e incidencias.',
      skills: [
        'Picking y preparación de pedidos',
        'Carretilla elevadora (certificado IDFO, 2024)',
        'Prevención de Riesgos Laborales (PRL, 2026)',
        'Gestión de inventario y control de stock',
        'Reparto logístico y planificación de rutas',
        'Ofimática intermedia',
        'Atención al cliente y resolución de incidencias',
      ],
      exp: profileExp('es'),
    },
    ca: {
      title: 'Logística i magatzem',
      role: 'Auxiliar de comerç, logística i magatzem',
      desc: 'Repartiment, picking i atenció al client, amb carretilla elevadora i PRL certificats.',
      about:
        'La meva base professional és la logística de d\'última milla i el magatzem. He treballat en empreses de repartiment (Glovo, Uber Eats, Passos de Cuinar) i en magatzem (Esinsa Gaskets), fent picking, preparació de comandes, càrrega i descàrrega i repartiment a domicili. A més de la part operativa, he atès usuaris en un centre municipal esportiu, resolent altes i incidències.',
      skills: [
        'Picking i preparació de comandes',
        'Carretilla elevadora (certificat IDFO, 2024)',
        'Prevenció de Riscos Laborals (PRL, 2026)',
        'Gestió d\'inventari i control d\'estoc',
        'Repartiment logístic i planificació de rutes',
        'Ofimàtica',
        'Atenció al client i resolució d\'incidències',
      ],
      exp: profileExp('ca'),
    },
    en: {
      title: 'Logistics & warehouse',
      role: 'Commerce, logistics & warehouse assistant',
      desc: 'Delivery, picking and customer service, with certified forklift and PRL qualifications.',
      about:
        'My professional base is last-mile logistics and warehouse work. I have worked for delivery companies (Glovo, Uber Eats, Passos de Cuinar) and in a warehouse (Esinsa Gaskets), doing picking, order preparation, loading and home delivery. Alongside the operational side, I handled user registrations and incident resolution at a municipal sports centre.',
      skills: [
        'Picking and order preparation',
        'Forklift operator (IDFO certificate, 2024)',
        'Occupational risk prevention (PRL, 2026)',
        'Inventory management and stock control',
        'Logistics delivery and route planning',
        'Intermediate office software',
        'Customer service and incident resolution',
      ],
      exp: profileExp('en'),
    },
  },
  fullstack: {
    es: {
      title: 'Desarrollo web',
      role: 'Desarrollo web como servicio',
      desc: 'Sitios estáticos y pequeñas apps con Astro, TypeScript y Node.',
      about:
        'El desarrollo web es la otra mitad de mi perfil, y lo ofrezco como servicio: sitios estáticos rápidos, catálogos y portfolios con Astro y TypeScript, con especial cuidado en accesibilidad, SEO e internacionalización. Es el stack con el que construyo mi propio CV, así que el trabajo que entrego es trabajo real y verificable. Mi experiencia profesional es en logística y almacén.',
      skills: [
        'Astro y sitios estáticos',
        'TypeScript',
        'HTML semántico y CSS',
        'Internacionalización (ES/CA/EN)',
        'Accesibilidad (WCAG) y SEO técnico',
        'Git',
        'Node.js',
      ],
      exp: profileExp('es'),
    },
    ca: {
      title: 'Desenvolupament web',
      role: 'Desenvolupament web com a servei',
      desc: 'Llocs estàtics i petites apps amb Astro, TypeScript i Node.',
      about:
        'El desenvolupament web és l\'altra meitat del meu perfil, i l\'ofereixo com a servei: llocs estàtics ràpids, catàlegs i portfolios amb Astro i TypeScript, amb especial atenció a l\'accessibilitat, el SEO i la internacionalització. És el stack amb el qual construeixo el meu propi CV, de manera que el treball que lliuro és treball real i verificable. La meva experiència professional és en logística i magatzem.',
      skills: [
        'Astro i llocs estàtics',
        'TypeScript',
        'HTML semàntic i CSS',
        'Internacionalització (ES/CA/EN)',
        'Accessibilitat (WCAG) i SEO tècnic',
        'Git',
        'Node.js',
      ],
      exp: profileExp('ca'),
    },
    en: {
      title: 'Web development',
      role: 'Web development as a service',
      desc: 'Static sites and small apps with Astro, TypeScript and Node.',
      about:
        'Web development is the other half of my profile, and I offer it as a service: fast static sites, catalogues and portfolios built with Astro and TypeScript, with particular care for accessibility, SEO and internationalisation. It is the stack I use to build my own CV, so the work I deliver is real and verifiable. My professional experience is in logistics and warehouse work.',
      skills: [
        'Astro and static sites',
        'TypeScript',
        'Semantic HTML and CSS',
        'Internationalisation (ES/CA/EN)',
        'Accessibility (WCAG) and technical SEO',
        'Git',
        'Node.js',
      ],
      exp: profileExp('en'),
    },
  },
  generico: {
    es: {
      title: 'Perfil genérico',
      role: 'Profesional versátil',
      desc: 'Organizado, resolutivo y con facilidad para adaptarme a nuevos entornos.',
      about:
        'Profesional meticuloso, responsable, con perfil observador y gran capacidad de análisis, siempre en aprendizaje continuo. He trabajado en los mismos sectores (logística, almacén, hostelería, atención al usuario) y me adapto rápido: lo que me piden, lo aprendo y lo hago bien. Busco integrarme en equipos dinámicos donde pueda aportar.',
      skills: [
        'Capacidad analítica y observadora',
        'Responsabilidad y compromiso',
        'Adaptabilidad y flexibilidad',
        'Aprendizaje continuo',
        'Atención al cliente',
        'Ofimática intermedia',
        'Trabajo en equipo',
      ],
      exp: profileExp('es'),
    },
    ca: {
      title: 'Perfil genèric',
      role: 'Professional versàtil',
      desc: 'Organitzat, resolutiu i amb facilitat per adaptar-me a nous entorns.',
      about:
        'Professional meticulós, responsable, amb perfil observador i gran capacitat d\'anàlisi, sempre en aprenentatge continu. He treballat en els mateixos sectors (logística, magatzem, hostaleria, atenció a l\'usuari) i m\'adapto ràpid: el que em demanen, ho aprenc i ho faig bé. Busco integrar-me en equips dinàmics on pugui aportar.',
      skills: [
        'Capacitat analítica i observadora',
        'Responsabilitat i compromís',
        'Adaptabilitat i flexibilitat',
        'Aprenentatge continu',
        'Atenció al client',
        'Ofimàtica',
        'Treball en equip',
      ],
      exp: profileExp('ca'),
    },
    en: {
      title: 'Generic profile',
      role: 'Versatile professional',
      desc: 'Organised, resourceful and quick to adapt to new environments.',
      about:
        'Meticulous, responsible professional with an observant profile and strong analytical skills, always learning. I have worked across the same sectors (logistics, warehouse, hospitality, user support) and I adapt fast: what I am asked to do, I learn and I do well. I look to join dynamic teams where I can add value.',
      skills: [
        'Analytical and observant approach',
        'Responsibility and commitment',
        'Adaptability and flexibility',
        'Continuous learning',
        'Customer service',
        'Intermediate office software',
        'Teamwork',
      ],
      exp: profileExp('en'),
    },
  },
};

export interface ShopItem {
  name: string;
  price: string;
  condition: string;
}

export const shopItems: Record<Lang, ShopItem[]> = {
  es: [
    { name: 'Bicicleta de montaña', price: '120 €', condition: 'Usado · Buen estado' },
    { name: 'Monitor 24" Full HD', price: '80 €', condition: 'Usado · Como nuevo' },
    { name: 'Lote de libros técnicos', price: '25 €', condition: 'Usado' }
  ],
  ca: [
    { name: 'Bicicleta de muntanya', price: '120 €', condition: 'Usat · Bon estat' },
    { name: 'Monitor 24" Full HD', price: '80 €', condition: 'Usat · Com nou' },
    { name: 'Lot de llibres tècnics', price: '25 €', condition: 'Usat' }
  ],
  en: [
    { name: 'Mountain bike', price: '€120', condition: 'Used · Good' },
    { name: '24" Full HD monitor', price: '€80', condition: 'Used · Like new' },
    { name: 'Tech books bundle', price: '€25', condition: 'Used' }
  ]
};
