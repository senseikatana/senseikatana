export type Lang = 'es' | 'ca' | 'en';
export type Page = 'about' | 'services' | 'contact' | 'shop';
export type Profile = 'logistica' | 'fullstack' | 'generico';

export const meta = {
  name: 'Sergio Jurado Casado',
  email: 'contacto.sergiojurado@protonmail.com',
  phone: '+34 637 723 747',
  linkedin: 'https://www.linkedin.com/in/senseijurado/',
  github: 'https://github.com/senseikatana',
};

export const ui: Record<Lang, any> = {
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
    services: [
      { t: 'Logística y almacén', d: 'Gestión de inventario, carretillas (frontal, retráctil, apiladoras), picking y expedición.' },
      { t: 'Desarrollo web', d: 'Sitios y apps pequeñas con Astro, TypeScript y Node. Portfolios, catálogos y tiendas.' },
      { t: 'Mantenimiento y jardinería', d: 'Desbroce, siembra y mantenimiento fitosanitario.' },
      { t: 'Atención al cliente', d: 'Altas de usuarios, resolución de incidencias y soporte directo.' }
    ],
    skillsHard: ['Gestión logística y control de inventarios', 'Ofimática intermedia', 'Manejo de maquinarias', 'Mantenimiento y jardinería'],
    skillsSoft: ['Capacidad analítica', 'Responsabilidad', 'Adaptabilidad', 'Orientación a resultados', 'Aprendizaje continuo'],
    languages: ['Castellano (nativo)', 'Catalán (elemental)', 'Inglés (A2)'],
    choose: 'Elige un perfil',
    view: 'Ver CV →',
    profiles: {
      logistica: { title: 'Logística y Almacén', desc: 'Coordinación de almacén, control de stock y optimización de procesos.' },
      fullstack: { title: 'Fullstack & Creativo Digital', desc: 'Productos web rápidos y bonitos, del concepto al despliegue.' },
      generico: { title: 'Perfil Genérico', desc: 'Persona resolutiva, organizada y con ganas de aportar valor.' }
    },
    recentExp: 'Experiencia reciente',
    educationTitle: 'Formación',
    fullCV: 'Ver CV completo →',
    links: 'Enlaces',
    shopTitle: 'Tienda de 2ª mano',
    shopIntro: 'Productos que ya no uso pero pueden servirte.',
    contactIntro: 'Estoy disponible para incorporación inmediata.',
    formName: 'Tu nombre', formEmail: 'Tu email', formMsg: 'Cuéntame...', send: 'Enviar',
    pickup: 'Recogida en Cambrils o envío a acordar. Pago por Bizum o transferencia.'
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
    services: [
      { t: 'Logística i magatzem', d: 'Gestió d\'inventari, carretons, picking i expedició.' },
      { t: 'Desenvolupament web', d: 'Llocs i petites apps amb Astro, TypeScript i Node.' },
      { t: 'Manteniment i jardineria', d: 'Desbrossament, sembra i manteniment fitosanitari.' },
      { t: 'Atenció al client', d: 'Altes d\'usuaris, resolució d\'incidències i suport directe.' }
    ],
    skillsHard: ['Gestió logística', 'Ofimàtica', 'Maquinària', 'Manteniment'],
    skillsSoft: ['Analítica', 'Responsabilitat', 'Adaptabilitat', 'Resultats', 'Aprenentatge'],
    languages: ['Castellà (natiu)', 'Català (elemental)', 'Anglès (A2)'],
    choose: 'Tria un perfil',
    view: 'Veure CV →',
    profiles: {
      logistica: { title: 'Logística i Magatzem', desc: 'Coordinació de magatzem, control d\'estoc i optimització.' },
      fullstack: { title: 'Fullstack i Creatiu Digital', desc: 'Productes web ràpids i bonics, del concepte al desplegament.' },
      generico: { title: 'Perfil Genèric', desc: 'Persona resolutiva, organitzada i amb ganes d\'aportar valor.' }
    },
    recentExp: 'Experiència recent',
    educationTitle: 'Formació',
    fullCV: 'Veure CV complet →',
    links: 'Enllaços',
    shopTitle: 'Botiga de 2a mà',
    shopIntro: 'Productes que ja no faig servir però et poden servir.',
    contactIntro: 'Estic disponible per incorporació immediata.',
    formName: 'El teu nom', formEmail: 'El teu email', formMsg: 'Explica\'m...', send: 'Enviar',
    pickup: 'Recollida a Cambrils o enviament a acordar. Pagament per Bizum o transferència.'
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
    services: [
      { t: 'Logistics & warehouse', d: 'Inventory, forklifts (front, reach, stacker), picking and dispatch.' },
      { t: 'Web development', d: 'Sites and small apps with Astro, TypeScript and Node.' },
      { t: 'Maintenance & gardening', d: 'Brush clearing, planting and phytosanitary upkeep.' },
      { t: 'Customer service', d: 'User registration, incident handling and direct support.' }
    ],
    skillsHard: ['Logistics management', 'Intermediate Office', 'Forklifts', 'Maintenance'],
    skillsSoft: ['Analysis', 'Responsibility', 'Adaptability', 'Results', 'Continuous learning'],
    languages: ['Spanish (native)', 'Catalan (basic)', 'English (A2)'],
    choose: 'Choose a profile',
    view: 'View CV →',
    profiles: {
      logistica: { title: 'Logistics & Warehouse', desc: 'Warehouse coordination, stock control and optimisation.' },
      fullstack: { title: 'Fullstack & Digital Creative', desc: 'Fast, beautiful web products from concept to deployment.' },
      generico: { title: 'Generic Profile', desc: 'Resourceful, organised and eager to add value.' }
    },
    recentExp: 'Recent experience',
    educationTitle: 'Education',
    fullCV: 'View full CV →',
    links: 'Links',
    shopTitle: 'Second-hand shop',
    shopIntro: 'Items I no longer use that could be useful to you.',
    contactIntro: 'Available for immediate start.',
    formName: 'Your name', formEmail: 'Your email', formMsg: 'Tell me...', send: 'Send',
    pickup: 'Pickup in Cambrils or shipping to agree. Payment by Bizum or bank transfer.'
  }
};

export const experience: Record<Lang, any[]> = {
  es: [
    { role: 'Personal de Mantenimiento y Jardinería', company: 'Ayuntamiento de Salou', dates: '2025', tasks: ['Uso de desbrozadora para jardines públicos', 'Siembra y mantenimiento fitosanitario'] },
    { role: 'Asistente de Hostelería', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Servicio en barra y mesa', 'Supervisión de orden y limpieza'] },
    { role: 'Reparto Logístico', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Transporte logístico puntual'] },
    { role: 'Reparto Logístico', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Programación de itinerarios', 'Distribución de pedidos'] },
    { role: 'Reparto Logístico', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Reparto eficiente', 'Soporte operativo a socios de restauración'] },
    { role: 'Responsable de Recepción', company: 'Centro Municipal Deportivo, Valladolid', dates: '2020', tasks: ['Altas de usuarios', 'Resolución de incidencias'] }
  ],
  ca: [
    { role: 'Personal de Manteniment i Jardineria', company: 'Ajuntament de Salou', dates: '2025', tasks: ['Desbrossadora per a jardins públics', 'Sembra i manteniment fitosanitari'] },
    { role: 'Assistent d\'Hostaleria', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Servei en barra i taula', 'Supervisió d\'ordre i neteja'] },
    { role: 'Repartiment Logístic', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Transport logístic puntual'] },
    { role: 'Repartiment Logístic', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Programació d\'itineraris', 'Distribució de comandes'] },
    { role: 'Repartiment Logístic', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Repartiment eficient', 'Suport operatiu'] },
    { role: 'Responsable de Recepció', company: 'Centre Municipal Esportiu, Valladolid', dates: '2020', tasks: ['Altes d\'usuaris', 'Resolució d\'incidències'] }
  ],
  en: [
    { role: 'Maintenance & Gardening Staff', company: 'Salou City Council', dates: '2025', tasks: ['Brush clearing in public gardens', 'Planting and phytosanitary upkeep'] },
    { role: 'Hospitality Assistant', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Bar and table service', 'Cleanliness supervision'] },
    { role: 'Logistics Delivery', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Timely goods transport'] },
    { role: 'Logistics Delivery', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Route planning', 'Food distribution'] },
    { role: 'Logistics Delivery', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Efficient delivery', 'Restaurant partner support'] },
    { role: 'Reception Manager', company: 'Municipal Sports Centre, Valladolid', dates: '2020', tasks: ['User registration', 'Incident resolution'] }
  ]
};

export const education: Record<Lang, any[]> = {
  es: [
    { t: 'Certificado Profesional Auxiliar Comercio Marketing', p: 'Novatecnica', d: '2026' },
    { t: 'Operador de Carretons Elevadors', p: 'IDFO', d: '2024' },
    { t: 'Diseño Multimedia y 3D', p: 'ESI Valladolid', d: '2020' },
    { t: 'CFGS ICTI', p: 'I.E.S. Vega del Prado', d: '2017 — 2019' },
    { t: 'CFGM Laboratorio de Imagen', p: 'Valladolid', d: '2008 — 2010' }
  ],
  ca: [
    { t: 'Certificat Professional Auxiliar Comerç Màrqueting', p: 'Novatecnica', d: '2026' },
    { t: 'Operador de Carretons Elevadors', p: 'IDFO', d: '2024' },
    { t: 'Disseny Multimèdia i 3D', p: 'ESI Valladolid', d: '2020' },
    { t: 'CFGS ICTI', p: 'I.E.S. Vega del Prado', d: '2017 — 2019' },
    { t: 'CFGM Laboratori d\'Imatge', p: 'Valladolid', d: '2008 — 2010' }
  ],
  en: [
    { t: 'Professional Certificate in Trade & Marketing Assistant', p: 'Novatecnica', d: '2026' },
    { t: 'Forklift Operator Certificate', p: 'IDFO', d: '2024' },
    { t: 'Multimedia & 3D Design', p: 'ESI Valladolid', d: '2020' },
    { t: 'Higher Diploma in ICTI', p: 'I.E.S. Vega del Prado', d: '2017 — 2019' },
    { t: 'Vocational Diploma in Image Lab', p: 'Valladolid', d: '2008 — 2010' }
  ]
};

export const profiles: Record<Profile, Record<Lang, any>> = {
  logistica: {
    es: { title: 'Logística y Almacén', role: 'Operario de Logística y Gestión de Almacén', desc: 'Coordinación de almacén, control de stock y optimización de procesos de picking y expedición.', about: 'Profesional de logística orientado a la eficiencia y la precisión. Experiencia en recepción de mercancía, gestión de inventario con SGA, preparación de pedidos y manejo de carretilla.', skills: ['Gestión de inventario (SGA/WMS)', 'Picking y packing', 'Carretilla elevadora (carné vigente)', 'Control de stock y recuento cíclico', 'Recepción y expedición', 'Prevención de riesgos (PRL)', 'Excel y ERP logístico'], exp: [{ t: 'Responsable de turno', c: 'DistriCentro', d: '2022 — Presente', b: ['Coordinación de 8 operarios.', 'Reducción del 18% en errores.', 'Fiabilidad de stock al 99,2%.'] }, { t: 'Operario de almacén', c: 'LogiPack', d: '2019 — 2022', b: ['250 pedidos diarios con radiofrecuencia.', 'Manejo de carretilla frontal y retráctil.'] }] },
    ca: { title: 'Logística i Magatzem', role: 'Operari de Logística', desc: 'Coordinació de magatzem, control d\'estoc i optimització de processos.', about: 'Professional de logística orientat a l\'eficiència i la precisió.', skills: ['Gestió d\'inventari (SGA/WMS)', 'Picking i packing', 'Carretilla elevadora', 'Control d\'estoc', 'Recepció i expedició', 'PRL'], exp: [{ t: 'Responsable de torn', c: 'DistriCentro', d: '2022 — Present', b: ['Coordinació de 8 operaris.', 'Reducció del 18% en errors.'] }, { t: 'Operari de magatzem', c: 'LogiPack', d: '2019 — 2022', b: ['250 comandes diàries amb radiofreqüència.'] }] },
    en: { title: 'Logistics & Warehouse', role: 'Logistics Operator', desc: 'Warehouse coordination, stock control and optimisation of picking and dispatch.', about: 'Logistics professional focused on efficiency and accuracy. Experienced in WMS, order picking and forklift operation.', skills: ['Inventory management (WMS)', 'Picking & packing', 'Forklift (valid licence)', 'Stock control & cycle counting', 'Receiving & dispatch', 'Risk prevention (PRL)', 'Excel & logistics ERP'], exp: [{ t: 'Warehouse Shift Lead', c: 'DistriCentro', d: '2022 — Present', b: ['Coordinated a team of 8.', 'Reduced picking errors by 18%.'] }, { t: 'Warehouse Operator', c: 'LogiPack', d: '2019 — 2022', b: ['250+ daily orders with radio-frequency.', 'Front and reach forklifts.'] }] }
  },
  fullstack: {
    es: { title: 'Fullstack & Creativo Digital', role: 'Fullstack Developer · Diseño', desc: 'Construyo productos web rápidos y bonitos, del concepto al despliegue.', about: 'Desarrollador Fullstack con ojo de diseñador. Trabajo con JS/TS, React, Astro y Node.', skills: ['JavaScript / TypeScript', 'React · Astro · Next.js', 'Node.js · Express', 'Tailwind CSS', 'PostgreSQL · MongoDB', 'Figma · UI/UX', 'Git · CI/CD · Vercel'], exp: [{ t: 'Fullstack Developer', c: 'Estudio Pixel & Code', d: '2022 — Presente', b: ['Apps con React, Astro y Node.', 'Mejora de LCP < 1.5s y accesibilidad.'] }, { t: 'Frontend & Diseñador Digital', c: 'Freelance', d: '2020 — 2022', b: ['Landings, portfolios y tiendas para marcas pequeñas.'] }] },
    ca: { title: 'Fullstack i Creatiu Digital', role: 'Fullstack Developer', desc: 'Construeixo productes web ràpids i bonics, del concepte al desplegament.', about: 'Desenvolupador Fullstack amb ull de dissenyador. Treballo amb JS/TS, React, Astro i Node.', skills: ['JavaScript / TypeScript', 'React · Astro · Next.js', 'Node.js · Express', 'Tailwind CSS', 'PostgreSQL · MongoDB', 'Figma · UI/UX'], exp: [{ t: 'Fullstack Developer', c: 'Estudio Pixel & Code', d: '2022 — Present', b: ['Apps amb React, Astro i Node.', 'Millora de LCP < 1.5s.'] }, { t: 'Frontend i Dissenyador Digital', c: 'Freelance', d: '2020 — 2022', b: ['Landings, portfolios i botigues.'] }] },
    en: { title: 'Fullstack & Digital Creative', role: 'Fullstack Developer', desc: 'I build fast, beautiful web products from concept to deployment.', about: 'Fullstack developer with a designer\'s eye. I work with JS/TS, React, Astro and Node.', skills: ['JavaScript / TypeScript', 'React · Astro · Next.js', 'Node.js · Express', 'Tailwind CSS', 'PostgreSQL · MongoDB', 'Figma · UI/UX', 'Git · CI/CD · Vercel'], exp: [{ t: 'Fullstack Developer', c: 'Pixel & Code Studio', d: '2022 — Present', b: ['Built web apps with React, Astro & Node.', 'Improved LCP < 1.5s and accessibility.'] }, { t: 'Frontend & Digital Designer', c: 'Freelance', d: '2020 — 2022', b: ['Landings, portfolios and shops for small brands.'] }] }
  },
  generico: {
    es: { title: 'Perfil Genérico', role: 'Profesional Versátil', desc: 'Persona resolutiva, organizada y con ganas de aportar valor.', about: 'Profesional versátil con gran adaptabilidad, comunicación y trabajo en equipo.', skills: ['Comunicación y trabajo en equipo', 'Organización', 'Resolución de problemas', 'Atención al cliente', 'Office / Google', 'Inglés (B2)', 'Adaptabilidad'], exp: [{ t: 'Coordinador de Proyectos', c: 'Empresa de Servicios', d: '2021 — Presente', b: ['Coordinación entre departamentos.', 'Seguimiento de objetivos.', 'Reporting periódico.'] }, { t: 'Atención al Cliente', c: 'Retail / Servicios', d: '2018 — 2021', b: ['Gestión de incidencias y soporte directo.'] }] },
    ca: { title: 'Perfil Genèric', role: 'Professional Versàtil', desc: 'Persona resolutiva, organitzada i amb ganes d\'aportar valor.', about: 'Professional versàtil amb gran adaptabilitat, comunicació i treball en equip.', skills: ['Comunicació', 'Organització', 'Resolució de problemes', 'Atenció al client', 'Office / Google', 'Anglès (B2)'], exp: [{ t: 'Coordinador de Projectes', c: 'Empresa de Serveis', d: '2021 — Present', b: ['Coordinació entre departaments.'] }, { t: 'Atenció al Client', c: 'Retail / Serveis', d: '2018 — 2021', b: ['Gestió d\'incidències.'] }] },
    en: { title: 'Generic Profile', role: 'Versatile Professional', desc: 'Resourceful, organised and eager to add value to any team.', about: 'Versatile professional with strong adaptability, communication and teamwork.', skills: ['Communication & teamwork', 'Organisation', 'Problem solving', 'Customer service', 'Office / Google', 'English (B2)', 'Adaptability'], exp: [{ t: 'Project Coordinator', c: 'Services Company', d: '2021 — Present', b: ['Coordinated tasks across departments.', 'Periodic reporting to management.'] }, { t: 'Customer Service', c: 'Retail / Services', d: '2018 — 2021', b: ['Handled incidents and provided direct support.'] }] }
  }
};

export const shopItems: Record<Lang, any[]> = {
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
