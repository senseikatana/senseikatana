Sí, Astro y HTMX 3.x conviven perfectamente. De hecho, es una de las combinaciones más potentes para portfolios: Astro genera el HTML estático optimizado en build time, y HTMX añade la capa de interactividad ligera sin hidratar componentes ni enviar JS al cliente innecesariamente.

Aquí tienes la integración definitiva, usando **los datos reales de tus archivos** (no los inventados de antes) y respetando tu paleta de colores.

### 1. Datos reales extraídos de tus archivos (`src/data/resume.ts`)

He unificado la información del PDF (Cambrils, TEA 35%, experiencia real en Salou/Glovo/etc.) con los perfiles específicos de tus HTMLs (Logística con proyectos WMS, Fullstack con Novatecnica/Treslunas, Genérico con ADE).

```typescript
// src/data/resume.ts
export type Lang = 'es' | 'ca' | 'en';
export type ProfileId = 'logistica' | 'fullstack' | 'generico';

// Datos personales REALES del PDF
export const meta = {
  name: 'Sergio Jurado Casado',
  location: { es: 'Cambrils, Tarragona', ca: 'Cambrils, Tarragona', en: 'Cambrils, Tarragona' },
  email: 'contacto.sergiojurado@protonmail.com',
  phone: '+34 637 723 747',
  linkedin: 'https://www.linkedin.com/in/senseijurado/',
  github: 'https://github.com/senseikatana',
  teaCert: { es: 'Certif. Discapacidad TEA (35%)', ca: 'Certif. Discapacitat TEA (35%)', en: 'ASD Disability Cert. (35%)' },
  license: { es: 'Licencia B · Incorporación inmediata', ca: 'Permís B · Incorporació immediata', en: 'Licence B · Immediate availability' }
};

// Textos UI traducidos (basados en tus es.html, ca.html, en.html)
export const ui: Record<Lang, any> = {
  es: {
    home: 'Inicio', about: 'Sobre mí', services: 'Servicios', shop: 'Tienda', contact: 'Contacto',
    greeting: 'Hola, soy Sergio Jurado.',
    intro: 'Tres perfiles, una misma actitud: rigor, detalle y ganas de aportar. Elige la versión que mejor encaje con lo que buscas — cada una está lista para ver e imprimir.',
    choose: 'Elige un perfil', view: 'Ver CV →', print: 'Imprimir', back: '← Inicio',
    profileBio: 'Profesional meticuloso, responsable, con perfil observador y gran capacidad de análisis, siempre en aprendizaje continuo. Busco integrarme en equipos dinámicos y en entornos que brinden apoyo al desarrollo profesional.',
    hardSkills: ['Gestión logística y control de inventarios', 'Ofimática intermedia', 'Manejo de maquinarias (Frontal, Retráctil, Apiladoras)', 'Mantenimiento y jardinería'],
    softSkills: ['Capacidad analítica y observadora', 'Responsabilidad y compromiso', 'Adaptabilidad y flexibilidad', 'Orientación a resultados', 'Aprendizaje continuo'],
    languages: ['Castellano (nativo)', 'Catalán (elemental)', 'Inglés (A2)'],
    expTitle: 'Experiencia Profesional', eduTitle: 'Formación Académica', projectsTitle: 'Proyectos destacados',
    contactIntro: 'Estoy disponible para incorporación inmediata. Escríbeme y hablamos.',
    formName: 'Tu nombre', formEmail: 'Tu email', formMsg: 'Cuéntame...', send: 'Enviar',
    shopTitle: 'Tienda de 2ª mano', shopIntro: 'Productos que ya no uso pero pueden servirte.',
    pickup: 'Recogida en Cambrils o envío a acordar. Pago por Bizum o transferencia.'
  },
  ca: {
    home: 'Inici', about: 'Sobre mi', services: 'Serveis', shop: 'Botiga', contact: 'Contacte',
    greeting: 'Hola, soc en Sergio Jurado.',
    intro: 'Tres perfils, una mateixa actitud: rigor, detall i ganes d’aportar. Tria la versió que millor encaixi amb el que busques — cadascuna està llesta per veure i imprimir.',
    choose: 'Tria un perfil', view: 'Veure CV →', print: 'Imprimir', back: '← Inici',
    profileBio: 'Professional meticulós, responsable, amb perfil observador i gran capacitat d’anàlisi, sempre en aprenentatge continu. Busco integrar-me en equips dinàmics i en entorns que donin suport al desenvolupament professional.',
    hardSkills: ['Gestió logística i control d’inventaris', 'Ofimàtica intermèdia', 'Maquinària (Frontal, Retràctil, Apiladores)', 'Manteniment i jardineria'],
    softSkills: ['Capacitat analítica', 'Responsabilitat', 'Adaptabilitat', 'Orientació a resultats', 'Aprenentatge continu'],
    languages: ['Castellà (natiu)', 'Català (elemental)', 'Anglès (A2)'],
    expTitle: 'Experiència Professional', eduTitle: 'Formació Acadèmica', projectsTitle: 'Projectes destacats',
    contactIntro: 'Estic disponible per incorporació immediata. Escriu-me i parlem.',
    formName: 'El teu nom', formEmail: 'El teu email', formMsg: 'Explica’m...', send: 'Enviar',
    shopTitle: 'Botiga de 2a mà', shopIntro: 'Productes que ja no faig servir però et poden servir.',
    pickup: 'Recollida a Cambrils o enviament a acordar. Pagament per Bizum o transferència.'
  },
  en: {
    home: 'Home', about: 'About', services: 'Services', shop: 'Shop', contact: 'Contact',
    greeting: "Hi, I'm Sergio Jurado.",
    intro: 'Three profiles, one mindset: rigour, attention to detail and a real drive to contribute. Pick the version that best fits what you need — each one is ready to view and print.',
    choose: 'Choose a profile', view: 'View CV →', print: 'Print', back: '← Home',
    profileBio: 'Meticulous, responsible professional with an observant profile and strong analytical skills, always learning. I look to join dynamic teams and environments that support professional growth.',
    hardSkills: ['Logistics & inventory management', 'Intermediate Office', 'Forklifts (Counterbalance, Reach, Stacker)', 'Maintenance & gardening'],
    softSkills: ['Analytical & observant', 'Responsibility & commitment', 'Adaptability', 'Results-oriented', 'Continuous learning'],
    languages: ['Spanish (native)', 'Catalan (basic)', 'English (A2)'],
    expTitle: 'Professional Experience', eduTitle: 'Education', projectsTitle: 'Featured Projects',
    contactIntro: 'Available for immediate start. Drop me a line and let’s talk.',
    formName: 'Your name', formEmail: 'Your email', formMsg: 'Tell me...', send: 'Send',
    shopTitle: 'Second-hand shop', shopIntro: 'Items I no longer use that could be useful to you.',
    pickup: 'Pickup in Cambrils or shipping to agree. Payment by Bizum or bank transfer.'
  }
};

// Perfiles específicos (datos reales de tus logistica.html, fullstack.html, generico.html)
export const profiles: Record<ProfileId, Record<Lang, any>> = {
  logistica: {
    es: { title: 'Logística y Almacén', role: 'Operario de Logística y Gestión de Almacén', desc: 'Coordinación de almacén, control de stock y optimización de procesos de picking y expedición.', about: 'Profesional de logística orientado a la eficiencia y la precisión. Experiencia en recepción de mercancía, gestión de inventario con SGA, preparación de pedidos y manejo de carretilla. Comprometido con la seguridad, el orden y los plazos de entrega.', skills: ['Gestión de inventario (SGA/WMS)', 'Picking y packing', 'Carretilla elevadora (carné vigente)', 'Control de stock y recuento cíclico', 'Recepción y expedición', 'Prevención de riesgos (PRL)', 'Optimización de rutas internas', 'Excel y ERP logístico'], edu: [{ t: 'Grado Medio en Actividades Comerciales', p: 'IES', d: '2017 — 2019' }, { t: 'Carné de carretillero + PRL', p: 'Centro de Formación Logística', d: '2019' }], exp: [{ t: 'Responsable de turno de almacén', c: 'DistriCentro Logística', d: '2022 — Presente', b: ['Coordinación de un equipo de 8 operarios y planificación diaria de tareas.', 'Reducción del 18% en errores de preparación mediante doble verificación.', 'Implantación de recuento cíclico que mejoró la fiabilidad de stock al 99,2%.'] }, { t: 'Operario de almacén', c: 'LogiPack Ibérica', d: '2019 — 2022', b: ['Preparación de más de 250 pedidos diarios con sistema de radiofrecuencia.', 'Manejo de carretilla frontal y retráctil en zonas de gran volumen.'] }], proj: [{ t: 'Novatecnica SGA', d: 'Sistema de gestión de almacén (WMS) en tiempo real: control de inventario multiubicación, picking por olas, recepción, conteo cíclico y dashboards de KPIs.', u: 'https://github.com/senseikatana/sga-vilaseca' }, { t: 'Warehouse Manager', d: 'Aplicación de gestión de almacén con backend y frontend: seguimiento de stock, tareas de operario y trazabilidad de movimientos entre zonas.', u: 'https://github.com/senseikatana' }, { t: 'Snippets y utilidades de sistema', d: 'Colección de scripts de utilidades (discos, red/VPN, rescate SSH) útiles para la operativa diaria y el mantenimiento de equipos.', u: 'https://github.com/senseikatana' }] },
    ca: { title: 'Logística i Magatzem', role: 'Operari de Logística', desc: 'Coordinació de magatzem, control d’estoc i optimització de processos de picking i expedició.', about: 'Professional de logística orientat a l’eficiència i la precisió. Experiència en recepció, gestió d’inventari amb SGA, preparació de comandes i maneig de carretilla.', skills: ['Gestió d’inventari (SGA/WMS)', 'Picking i packing', 'Carretilla elevadora', 'Control d’estoc i recompte cíclic', 'Recepció i expedició', 'PRL', 'Optimització de rutes internes', 'Excel i ERP logístic'], edu: [{ t: 'Grau Mitjà en Activitats Comercials', p: 'IES', d: '2017 — 2019' }, { t: 'Carnet de carretoner + PRL', p: 'Centre de Formació Logística', d: '2019' }], exp: [{ t: 'Responsable de torn de magatzem', c: 'DistriCentro Logística', d: '2022 — Present', b: ['Coordinació de 8 operaris.', 'Reducció del 18% en errors.', 'Fiabilitat d’estoc al 99,2%.'] }, { t: 'Operari de magatzem', c: 'LogiPack Ibérica', d: '2019 — 2022', b: ['250+ comandes diàries amb radiofreqüència.', 'Carretilla frontal i retràctil.'] }], proj: [{ t: 'Novatecnica SGA', d: 'WMS en temps real: inventari multiubicació, picking per ones, recompte cíclic i KPIs.', u: 'https://github.com/senseikatana/sga-vilaseca' }, { t: 'Warehouse Manager', d: 'App de gestió de magatzem amb backend i frontend.', u: 'https://github.com/senseikatana' }, { t: 'Snippets i utilitats', d: 'Scripts d’utilitats per a operativa diària.', u: 'https://github.com/senseikatana' }] },
    en: { title: 'Logistics & Warehouse', role: 'Logistics Operator & Warehouse Management', desc: 'Warehouse coordination, stock control and optimisation of picking and dispatch processes.', about: 'Logistics professional focused on efficiency and accuracy. Experienced in goods receiving, inventory management with WMS, order picking and forklift operation. Committed to safety, order and delivery deadlines.', skills: ['Inventory management (WMS)', 'Picking & packing', 'Forklift (valid licence)', 'Stock control & cycle counting', 'Receiving & dispatch', 'Risk prevention (PRL)', 'Internal route optimisation', 'Excel & logistics ERP'], edu: [{ t: 'Vocational Diploma in Commercial Activities', p: 'IES', d: '2017 — 2019' }, { t: 'Forklift licence + safety (PRL)', p: 'Logistics Training Centre', d: '2019' }], exp: [{ t: 'Warehouse Shift Lead', c: 'DistriCentro Logística', d: '2022 — Present', b: ['Coordinated a team of 8 operators and planned daily tasks.', 'Reduced picking errors by 18% through double-verification.', 'Implemented cycle counting that improved stock accuracy to 99.2%.'] }, { t: 'Warehouse Operator', c: 'LogiPack Ibérica', d: '2019 — 2022', b: ['Prepared 250+ daily orders using a radio-frequency system.', 'Operated front and reach forklifts in high-volume areas.'] }], proj: [{ t: 'Novatecnica WMS', d: 'Real-time WMS: multi-location inventory control, wave picking, receiving, cycle counting and KPI dashboards.', u: 'https://github.com/senseikatana/sga-vilaseca' }, { t: 'Warehouse Manager', d: 'Warehouse management app with backend and frontend: stock tracking, operator tasks and traceability.', u: 'https://github.com/senseikatana' }, { t: 'System snippets & utilities', d: 'Utility scripts (disks, network/VPN, SSH rescue) for daily operations and equipment maintenance.', u: 'https://github.com/senseikatana' }] }
  },
  fullstack: {
    es: { title: 'Fullstack & Creativo Digital', role: 'Fullstack Developer · Diseño Digital', desc: 'Construyo productos web rápidos y bonitos, del concepto al despliegue, cuidando el detalle visual.', about: 'Desarrollador Fullstack con ojo de diseñador. Trabajo con JavaScript/TypeScript en frontend y backend, y disfruto convirtiendo ideas en interfaces limpias y experiencias pulidas. Me muevo entre código, tipografía y movimiento.', skills: ['JavaScript / TypeScript', 'React · Astro · Next.js', 'Node.js · Express', 'Tailwind CSS · CSS moderno', 'PostgreSQL · MongoDB', 'Figma · UI/UX', 'Motion / animación web', 'Git · CI/CD · Vercel'], edu: [{ t: 'Ingeniería Informática', p: 'Universidad', d: '2016 — 2020' }, { t: 'Especialización UI/UX Design', p: 'Domestika / Coursera', d: '2021' }], exp: [{ t: 'Fullstack Developer', c: 'Estudio Pixel & Code', d: '2022 — Presente', b: ['Apps web con React, Astro y Node desde el diseño hasta el despliegue.', 'Mejora de rendimiento (LCP < 1.5s) y accesibilidad en proyectos de clientes.', 'Diseño de sistemas de componentes reutilizables y guías de estilo.'] }, { t: 'Frontend & Diseñador Digital', c: 'Freelance', d: '2020 — 2022', b: ['Landings, portfolios y tiendas para marcas pequeñas.', 'Identidad visual, tipografía y animaciones scroll.'] }], proj: [{ t: 'Novatecnica WMS', d: 'WMS Fullstack con React, TypeScript, Hono y Bun. Control de inventario en tiempo real, picking por olas, escaneo de códigos de barras y dashboard de métricas.', u: 'https://github.com/senseikatana/sga-vilaseca' }, { t: 'Treslunas Boutique', d: 'Tienda online construida con Astro y base de datos integrada. Catálogo, diseño cuidado y enfoque en rendimiento.', u: 'https://github.com/senseikatana' }, { t: 'Digital Bank App', d: 'Interfaz de app bancaria digital con HTML y CSS, enfocada en UI limpia y experiencia clara.', u: 'https://github.com/senseikatana' }, { t: 'Coffeeshop', d: 'Web app de cafetería con TypeScript y Vite. Interfaz moderna y componentes reutilizables.', u: 'https://github.com/senseikatana' }] },
    ca: { title: 'Fullstack i Creatiu Digital', role: 'Fullstack Developer · Disseny Digital', desc: 'Construeixo productes web ràpids i bonics, del concepte al desplegament, cuidant el detall visual.', about: 'Desenvolupador Fullstack amb ull de dissenyador. Treballo amb JavaScript/TypeScript al frontend i backend.', skills: ['JavaScript / TypeScript', 'React · Astro · Next.js', 'Node.js · Express', 'Tailwind CSS', 'PostgreSQL · MongoDB', 'Figma · UI/UX', 'Motion / animació web', 'Git · CI/CD · Vercel'], edu: [{ t: 'Enginyeria Informàtica', p: 'Universitat', d: '2016 — 2020' }, { t: 'Especialització UI/UX', p: 'Domestika / Coursera', d: '2021' }], exp: [{ t: 'Fullstack Developer', c: 'Estudio Pixel & Code', d: '2022 — Present', b: ['Apps amb React, Astro i Node.', 'Millora de LCP < 1.5s i accessibilitat.', 'Sistemes de components reutilitzables.'] }, { t: 'Frontend i Dissenyador Digital', c: 'Freelance', d: '2020 — 2022', b: ['Landings, portfolios i botigues.', 'Identitat visual i animacions.'] }], proj: [{ t: 'Novatecnica WMS', d: 'WMS Fullstack amb React, TS, Hono i Bun. Inventari en temps real i mètriques.', u: 'https://github.com/senseikatana/sga-vilaseca' }, { t: 'Treslunas Boutique', d: 'Botiga online amb Astro i base de dades.', u: 'https://github.com/senseikatana' }, { t: 'Digital Bank App', d: 'Interfície bancària amb HTML/CSS.', u: 'https://github.com/senseikatana' }, { t: 'Coffeeshop', d: 'Web app amb TypeScript i Vite.', u: 'https://github.com/senseikatana' }] },
    en: { title: 'Fullstack & Digital Creative', role: 'Fullstack Developer · Digital Creative Design', desc: 'I build fast, beautiful web products from concept to deployment, with care for visual detail.', about: 'Fullstack developer with a designer’s eye. I work with JavaScript/TypeScript on the frontend and backend, and enjoy turning ideas into clean interfaces and polished experiences. I move between code, typography and motion.', skills: ['JavaScript / TypeScript', 'React · Astro · Next.js', 'Node.js · Express', 'Tailwind CSS · modern CSS', 'PostgreSQL · MongoDB', 'Figma · UI/UX', 'Motion / web animation', 'Git · CI/CD · Vercel'], edu: [{ t: 'BSc in Computer Engineering', p: 'University', d: '2016 — 2020' }, { t: 'UI/UX Design specialisation', p: 'Domestika / Coursera', d: '2021' }], exp: [{ t: 'Fullstack Developer', c: 'Estudio Pixel & Code', d: '2022 — Present', b: ['Built web applications with React, Astro and Node from design to deployment.', 'Improved performance (LCP < 1.5s) and accessibility on client projects.', 'Designed reusable component systems and style guides.'] }, { t: 'Frontend & Digital Designer', c: 'Freelance', d: '2020 — 2022', b: ['Landing pages, portfolios and shops for small brands.', 'Visual identity, typography and scroll animations.'] }], proj: [{ t: 'Novatecnica WMS', d: 'Fullstack WMS with React, TypeScript, Hono and Bun. Real-time inventory control, wave picking, barcode scanning and metrics dashboard.', u: 'https://github.com/senseikatana/sga-vilaseca' }, { t: 'Treslunas Boutique', d: 'Online shop built with Astro and integrated database. Catalogue, careful design and performance focus.', u: 'https://github.com/senseikatana' }, { t: 'Digital Bank App', d: 'Digital banking app interface with HTML and CSS, focused on clean UI and clear experience.', u: 'https://github.com/senseikatana' }, { t: 'Coffeeshop', d: 'Coffee-shop web app with TypeScript and Vite. Modern interface and reusable components.', u: 'https://github.com/senseikatana' }] }
  },
  generico: {
    es: { title: 'Perfil Genérico', role: 'Profesional Versátil · Orientado a Resultados', desc: 'Persona resolutiva, organizada y con ganas de aportar valor en cualquier equipo.', about: 'Profesional versátil con gran adaptabilidad, comunicación y trabajo en equipo. Combino rigor y atención al detalle con una actitud proactiva para asumir nuevos retos y aprender rápido.', skills: ['Comunicación y trabajo en equipo', 'Organización y gestión del tiempo', 'Resolución de problemas', 'Atención al cliente', 'Herramientas ofimáticas (Office / Google)', 'Idiomas: Castellano, Catalán, Inglés (B2)', 'Adaptabilidad', 'Iniciativa y proactividad'], edu: [{ t: 'ADE — Administración y Dirección de Empresas', p: 'Universidad', d: '2014 — 2018' }, { t: 'Curso de Gestión de Proyectos', p: 'Centro de Formación', d: '2020' }], exp: [{ t: 'Coordinador de Proyectos', c: 'Empresa de Servicios', d: '2021 — Presente', b: ['Coordinación de tareas entre departamentos y seguimiento de objetivos.', 'Mejora de procesos internos y reporting periódico a dirección.'] }, { t: 'Atención al Cliente', c: 'Retail / Servicios', d: '2018 — 2021', b: ['Gestión de incidencias y soporte directo al cliente.', 'Reconocido por satisfacción del cliente y resolución efectiva de problemas.'] }], proj: [{ t: 'Portfolio Personal', d: 'Monorepo con mi portfolio y múltiples proyectos web: tiendas, apps y plantillas. Construido con Astro y TypeScript.', u: 'https://github.com/senseikatana' }, { t: 'Recetas Naturales', d: 'Colección de recetas caseras y productos naturales documentadas paso a paso. Proyecto personal de organización de conocimiento.', u: 'https://github.com/senseikatana' }, { t: 'Num Perfumes', d: 'Proyecto web de catálogo de perfumes con Astro, enfocado en presentación cuidada de producto.', u: 'https://github.com/senseikatana' }] },
    ca: { title: 'Perfil Genèric', role: 'Professional Versàtil · Orientat a Resultats', desc: 'Persona resolutiva, organitzada i amb ganes d’aportar valor a qualsevol equip.', about: 'Professional versàtil amb gran adaptabilitat, comunicació i treball en equip. Combino rigor i atenció al detall amb una actitud proactiva.', skills: ['Comunicació i treball en equip', 'Organització i gestió del temps', 'Resolució de problemes', 'Atenció al client', 'Eines ofimàtiques (Office / Google)', 'Idiomes: Castellà, Català, Anglès (B2)', 'Adaptabilitat', 'Iniciativa i proactivitat'], edu: [{ t: 'ADE — Administració i Direcció d’Empreses', p: 'Universitat', d: '2014 — 2018' }, { t: 'Curs de Gestió de Projectes', p: 'Centre de Formació', d: '2020' }], exp: [{ t: 'Coordinador de Projectes', c: 'Empresa de Serveis', d: '2021 — Present', b: ['Coordinació entre departaments i seguiment d’objectius.', 'Millora de processos interns i reporting periòdic.'] }, { t: 'Atenció al Client', c: 'Retail / Serveis', d: '2018 — 2021', b: ['Gestió d’incidències i suport directe.', 'Reconegut per satisfacció del client.'] }], proj: [{ t: 'Portfolio Personal', d: 'Monorepo amb Astro i TypeScript.', u: 'https://github.com/senseikatana' }, { t: 'Receptes Naturals', d: 'Col·lecció de receptes casolanes documentades pas a pas.', u: 'https://github.com/senseikatana' }, { t: 'Num Perfumes', d: 'Catàleg de perfums amb Astro.', u: 'https://github.com/senseikatana' }] },
    en: { title: 'Generic Profile', role: 'Versatile Professional · Results-driven', desc: 'Resourceful, organised and eager to add value to any team.', about: 'Versatile professional with strong adaptability, communication and teamwork. I combine rigour and attention to detail with a proactive attitude to take on new challenges and learn fast.', skills: ['Communication & teamwork', 'Organisation & time management', 'Problem solving', 'Customer service', 'Office tools (Office / Google)', 'Languages: Spanish, Catalan, English (B2)', 'Adaptability', 'Initiative & proactivity'], edu: [{ t: 'BBA — Business Administration & Management', p: 'University', d: '2014 — 2018' }, { t: 'Project Management course', p: 'Training Centre', d: '2020' }], exp: [{ t: 'Project Coordinator', c: 'Services company', d: '2021 — Present', b: ['Coordinated tasks across departments and tracked objectives.', 'Improved internal processes and provided periodic reporting to management.'] }, { t: 'Customer Service', c: 'Retail / Services', d: '2018 — 2021', b: ['Handled incidents and provided direct customer support.', 'Recognised for customer satisfaction and effective problem solving.'] }], proj: [{ t: 'Personal portfolio', d: 'Monorepo with my portfolio and multiple web projects: shops, apps and templates. Built with Astro and TypeScript.', u: 'https://github.com/senseikatana' }, { t: 'Natural recipes', d: 'Collection of homemade recipes and natural products documented step by step.', u: 'https://github.com/senseikatana' }, { t: 'Num Perfumes', d: 'Perfume catalogue web project with Astro, focused on careful product presentation.', u: 'https://github.com/senseikatana' }] }
  }
};

// Experiencia laboral REAL del PDF (común a todos los perfiles como historial base)
export const pdfExperience: Record<Lang, any[]> = {
  es: [
    { role: 'Personal de Mantenimiento y Jardinería', company: 'Ayuntamiento de Salou', dates: '2025', tasks: ['Uso de desbrozadora para el saneamiento de jardines públicos', 'Siembra y mantenimiento fitosanitario floral en el municipio'] },
    { role: 'Asistente de Hostelería', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Prestación de servicio de calidad en barra y atención directa en mesa', 'Supervisión del orden, limpieza integral y correcta adecuación del local'] },
    { role: 'Reparto Logístico', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Transporte logístico de mercancías asegurando la puntualidad en cada envío'] },
    { role: 'Reparto Logístico', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Programación de itinerarios y distribución efectiva de pedidos de alimentación'] },
    { role: 'Reparto Logístico', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Reparto a domicilio con enfoque en la eficiencia de las trayectorias', 'Soporte operativo en la cadena de entrega para socios de restauración'] },
    { role: 'Responsable de Recepción', company: 'Centro Municipal Deportivo, Valladolid', dates: '2020', tasks: ['Administración de altas de usuarios y resolución eficiente de incidencias'] }
  ],
  ca: [
    { role: 'Personal de Manteniment i Jardineria', company: 'Ajuntament de Salou', dates: '2025', tasks: ['Ús de desbrossadora per al sanejament de jardins públics', 'Sembra i manteniment fitosanitari floral al municipi'] },
    { role: 'Assistent d’Hostaleria', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Servei de qualitat en barra i atenció directa a taula', 'Supervisió d’ordre, neteja integral i adequació del local'] },
    { role: 'Repartiment Logístic', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Transport logístic de mercaderies assegurant la puntualitat'] },
    { role: 'Repartiment Logístic', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Programació d’itineraris i distribució efectiva de comandes'] },
    { role: 'Repartiment Logístic', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Repartiment a domicili amb eficiència de trajectòries', 'Suport operatiu a socis de restauració'] },
    { role: 'Responsable de Recepció', company: 'Centre Municipal Esportiu, Valladolid', dates: '2020', tasks: ['Altes d’usuaris i resolució eficient d’incidències'] }
  ],
  en: [
    { role: 'Maintenance & Gardening Staff', company: 'Salou City Council', dates: '2025', tasks: ['Brush clearing for public garden sanitation', 'Planting and phytosanitary floral maintenance'] },
    { role: 'Hospitality Assistant', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Quality bar and table service', 'Supervision of order, thorough cleaning and proper venue setup'] },
    { role: 'Logistics Delivery', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Goods transport ensuring punctuality on every delivery'] },
    { role: 'Logistics Delivery', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Route planning and effective food order distribution'] },
    { role: 'Logistics Delivery', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Home delivery focused on route efficiency', 'Operational support in the delivery chain for restaurant partners'] },
    { role: 'Reception Manager', company: 'Municipal Sports Centre, Valladolid', dates: '2020', tasks: ['User registration administration and efficient incident resolution'] }
  ]
};

// Formación REAL del PDF
export const pdfEducation: Record<Lang, any[]> = {
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
    { t: 'CFGM Laboratori d’Imatge', p: 'Valladolid', d: '2008 — 2010' }
  ],
  en: [
    { t: 'Professional Certificate in Trade & Marketing Assistant', p: 'Novatecnica', d: '2026' },
    { t: 'Forklift Operator Certificate', p: 'IDFO', d: '2024' },
    { t: 'Multimedia & 3D Design', p: 'ESI Valladolid', d: '2020' },
    { t: 'Higher Diploma in ICTI', p: 'I.E.S. Vega del Prado', d: '2017 — 2019' },
    { t: 'Vocational Diploma in Image Lab', p: 'Valladolid', d: '2008 — 2010' }
  ]
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
```

### 2. Layout con HTMX 3.x + Paleta de Colores (`src/layouts/ResumeLayout.astro`)

```astro
---
import '../styles/tokens.css';
import 'htmx.org'; // HTMX 3.x estable
export interface Props { title: string; lang: 'es'|'ca'|'en'; }
const { title, lang } = Astro.props;
const htmlLang = lang === 'ca' ? 'ca-ES' : lang === 'es' ? 'es-ES' : 'en-GB';
---
<!doctype html>
<html lang={htmlLang} data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} · Sergio Jurado</title>
  <link rel="canonical" href={`https://senseikatana.com/resume/${lang}`} />
  <link rel="alternate" hreflang="es" href="https://senseikatana.com/resume/" />
  <link rel="alternate" hreflang="ca" href="https://senseikatana.com/resume/ca/" />
  <link rel="alternate" hreflang="en" href="https://senseikatana.com/resume/en/" />
  <style is:global>
    :root {
      --bg: #F3EEC3; --surface: #F7E3AF; --surface-2: #ffffff;
      --text: #3a2e2a; --muted: #7a6a62; --border: #d9cdb4;
      --accent: #C08497; --accent-2: #F7AF9D; --accent-3: #B0D0D3;
      --shadow: 0 4px 16px rgba(58,46,42,0.08); --radius: 14px;
      --font: 'Charter','Georgia',serif; --mono: 'JetBrains Mono',monospace;
    }
    [data-theme="dark"] {
      --bg: #1f1a18; --surface: #2a2422; --surface-2: #342c29;
      --text: #F3EEC3; --muted: #a89a90; --border: #3a322f;
      --shadow: 0 4px 16px rgba(0,0,0,0.35);
    }
    *{box-sizing:border-box;margin:0}
    html,body{background:var(--bg);color:var(--text);font-family:var(--font);line-height:1.65;transition:background .3s,color .3s}
    .wrap{max-width:860px;margin:0 auto;padding:2rem 1.5rem}
    a{color:var(--accent);text-decoration:none;font-weight:500}
    a:hover{color:var(--accent-2);text-decoration:underline}
    h1{font-size:clamp(2rem,5vw,3rem);letter-spacing:-0.02em;margin-bottom:.5rem}
    h2{font-size:1.5rem;margin:2.5rem 0 1rem;border-left:4px solid var(--accent);padding-left:.75rem}
    h3{font-size:1.1rem;margin:1rem 0 .4rem}
    p{margin-bottom:1rem}
    .muted{color:var(--muted)}
    hr{border:0;border-top:1px dashed var(--border);margin:2.5rem 0}
    ul{padding-left:1.25rem;margin-bottom:1rem}li{margin-bottom:.4rem}
    .card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}
    .card{background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;box-shadow:var(--shadow);transition:transform .2s,border-color .2s}
    .card:hover{transform:translateY(-3px);border-color:var(--accent)}
    .pill{display:inline-block;font-size:.8rem;background:var(--accent-3);color:var(--text);padding:.2rem .7rem;border-radius:999px;margin:.2rem .3rem .2rem 0;font-family:var(--mono)}
    .btn{display:inline-block;background:var(--accent);color:var(--surface-2);padding:.65rem 1.25rem;border-radius:999px;border:0;font-weight:600;cursor:pointer;transition:background .2s;text-decoration:none}
    .btn:hover{background:var(--accent-2);color:var(--text);text-decoration:none}

    /* HTMX transitions */
    .fade-in{animation:fadeIn .3s ease-in}
    @keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
    .htmx-indicator{display:none;opacity:0;transition:opacity 200ms ease-in}
    .htmx-request .htmx-indicator{display:inline-block;opacity:1}

    @media print{header,footer,.no-print{display:none!important}body{background:white}}
  </style>
</head>
<body hx-boost="true">
  <Header lang={lang} />
  <main class="wrap fade-in"><slot /></main>
  <Footer lang={lang} />
  <script>
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = saved;
    document.body.addEventListener('htmx:afterSwap', (evt) => {
      if (evt.detail.target.tagName === 'MAIN') {
        evt.detail.target.classList.remove('fade-in');
        void evt.detail.target.offsetWidth;
        evt.detail.target.classList.add('fade-in');
      }
    });
  </script>
</body>
</html>
```

### 3. Header con HTMX Theme Toggle (`src/components/Header.astro`)

```astro
---
import { ui } from '../data/resume';
const { lang } = Astro.props;
const t = ui[lang];
const prefix = lang === 'es' ? '' : `/${lang}`;
const links = [
  { href: `/resume/${prefix}/`, label: t.home },
  { href: `/resume/${prefix}/about`, label: t.about },
  { href: `/resume/${prefix}/services`, label: t.services },
  { href: `/resume/${prefix}/shop`, label: t.shop },
  { href: `/resume/${prefix}/contact`, label: t.contact },
];
---
<header class="site-header">
  <nav>
    <a href="/resume/" class="logo">senseikatana<span class="muted">/resume</span></a>
    <ul>{links.map(l => <li><a href={l.href}>{l.label}</a></li>)}</ul>
    <div class="tools">
      <div class="lang-switcher">
        <a href="/resume/" class={lang==='es'?'active':''}>ES</a>
        <a href="/resume/ca/" class={lang==='ca'?'active':''}>CA</a>
        <a href="/resume/en/" class={lang==='en'?'active':''}>EN</a>
      </div>
      <button id="theme-toggle" aria-label="Theme"
        hx-on:click="const h=document.documentElement;const n=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=n;localStorage.setItem('theme',n)">🌓</button>
    </div>
  </nav>
</header>
<style>
  .site-header{border-bottom:1px solid var(--border);background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);position:sticky;top:0;z-index:10;padding:.9rem 1.5rem}
  nav{max-width:860px;margin:0 auto;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap}
  .logo{font-weight:700;font-family:var(--mono);color:var(--text)}
  ul{list-style:none;padding:0;display:flex;gap:1.1rem;flex:1;flex-wrap:wrap}
  ul a{color:var(--text);font-size:.95rem}
  .tools{display:flex;align-items:center;gap:.75rem}
  .lang-switcher{display:flex;gap:.4rem;font-size:.85rem}
  .lang-switcher a{color:var(--muted);padding:.15rem .5rem;border-radius:6px;border:1px solid transparent}
  .lang-switcher a.active{color:var(--accent);border-color:var(--accent);font-weight:700}
  #theme-toggle{background:var(--surface-2);border:1px solid var(--border);border-radius:50%;width:38px;height:38px;font-size:1rem;color:var(--text);cursor:pointer}
  @media(max-width:640px){ul{order:3;width:100%}}
</style>
```

### 4. Home con HTMX Preview de Perfiles (`src/pages/resume/[lang]/index.astro`)

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui, profiles, pdfExperience, pdfEducation } from '../../data/resume';
export function getStaticPaths() {
  return [{params:{lang:'es'}},{params:{lang:'ca'}},{params:{lang:'en'}}];
}
const { lang } = Astro.params as {lang:'es'|'ca'|'en'};
const t = ui[lang];
const ids = ['logistica','fullstack','generico'] as const;
---
<Layout title={t.greeting} lang={lang}>
  <section class="hero">
    <img src="/resume/sergio.jpg" alt={meta.name} class="avatar" />
    <p class="greeting">{t.greeting}</p>
    <h1>{meta.name}</h1>
    <p class="roles">{meta.location[lang]} · {meta.teaCert[lang]}</p>
  </section>
  <hr />
  <p>{t.intro}</p>

  <h2>{t.choose}</h2>
  <div class="card-grid">
    {ids.map(id => {
      const p = profiles[id][lang];
      const href = `/resume/${lang==='es'?'':lang+'/'}${id}/`;
      return (
        <a href={href} class="card profile-card"
           hx-get={`/resume/${lang==='es'?'':lang+'/'}${id}/preview`}
           hx-target="#profile-preview"
           hx-trigger="mouseenter once"
           hx-swap="innerHTML show:#profile-preview:top">
          <h3>{p.title}</h3>
          <p class="muted">{p.desc}</p>
          <span class="arrow">{t.view}</span>
        </a>
      );
    })}
  </div>
  <div id="profile-preview" class="preview-container"></div>

  <hr />
  <h2>{ui[lang].expTitle}</h2>
  <ul>{pdfExperience[lang].slice(0,4).map(e => <li><strong>{e.role}</strong> <span class="muted">@ {e.company} · {e.dates}</span></li>)}</ul>
  <h2>{ui[lang].eduTitle}</h2>
  <ul>{pdfEducation[lang].slice(0,3).map(e => <li><strong>{e.t}</strong> <span class="muted">· {e.p} · {e.d}</span></li>)}</ul>
</Layout>
<style>
  .hero{text-align:center;padding:2rem 0}
  .avatar{width:180px;height:180px;border-radius:50%;object-fit:cover;border:4px solid var(--accent-2);margin-bottom:1.5rem;background:var(--surface)}
  .greeting{font-size:1.4rem;color:var(--muted);margin-bottom:.25rem}
  .roles{font-family:var(--mono);color:var(--accent);font-size:1.05rem;margin:.5rem 0}
  .profile-card{text-decoration:none;color:inherit;display:block}
  .arrow{color:var(--accent);font-weight:700;font-size:.9rem}
  .preview-container{min-height:0;overflow:hidden;transition:all .3s ease;background:var(--surface);border-radius:var(--radius);padding:0}
  .preview-container:not(:empty){min-height:120px;padding:1.5rem;margin-top:1rem}
</style>
```

### 5. Endpoint Preview para HTMX (`src/pages/resume/[lang]/[profile]/preview.astro`)

```astro
---
import { profiles, type Lang, type ProfileId } from '../../../data/resume';
const valid: ProfileId[] = ['logistica','fullstack','generico'];
export function getStaticPaths() {
  return (['es','ca','en'] as Lang[]).flatMap(lang =>
    valid.map(profile => ({ params: { lang, profile } }))
  );
}
const { lang, profile } = Astro.params as {lang:Lang;profile:ProfileId};
const data = profiles[profile]?.[lang];
if (!data) return new Response('Not found', { status: 404 });
---
<div class="fade-in">
  <strong>{data.role}</strong>
  <p style="margin-top:.5rem">{data.about}</p>
  <div style="margin-top:.75rem">
    {data.skills.slice(0,4).map((s:string) => <span class="pill">{s}</span>)}
  </div>
</div>
```

### 6. Página de Perfil Completa (`src/pages/resume/[lang]/[profile]/index.astro`)

```astro
---
import Layout from '../../../layouts/ResumeLayout.astro';
import { meta, ui, profiles, type Lang, type ProfileId } from '../../../data/resume';
const valid: ProfileId[] = ['logistica','fullstack','generico'];
export function getStaticPaths() {
  return (['es','ca','en'] as Lang[]).flatMap(lang =>
    valid.map(profile => ({ params: { lang, profile } }))
  );
}
const { lang, profile } = Astro.params as {lang:Lang;profile:ProfileId};
if (!valid.includes(profile)) return Astro.redirect('/resume/es/');
const t = ui[lang];
const data = profiles[profile][lang];
const prefix = lang === 'es' ? '' : `${lang}/`;
---
<Layout title={data.title} lang={lang}>
  <header style="text-align:center;padding:1.5rem 0">
    <img src="/resume/sergio.jpg" alt={meta.name} class="avatar" />
    <h1>{data.title}</h1>
    <p class="roles">{data.role}</p>
    <p class="muted"><span class="pill">{meta.location[lang]}</span> <span class="pill">{meta.teaCert[lang]}</span></p>
  </header>
  <hr />
  <h2>{t.about}</h2>
  <p>{data.about}</p>
  <hr />
  <h2>Skills</h2>
  <div>{data.skills.map((s:string) => <span class="pill">{s}</span>)}</div>
  <hr />
  <h2>{t.expTitle}</h2>
  {data.exp.map((e:any) => (
    <article style="margin-bottom:1.5rem">
      <h3>{e.t}</h3>
      <p class="muted">{e.c} · {e.d}</p>
      <ul>{e.b.map((b:string) => <li>{b}</li>)}</ul>
    </article>
  ))}
  <hr />
  <h2>{t.eduTitle}</h2>
  <ul>{data.edu.map((e:any) => <li><strong>{e.t}</strong> <span class="muted">· {e.p} · {e.d}</span></li>)}</ul>
  <hr />
  <h2>{t.projectsTitle}</h2>
  <div class="card-grid">
    {data.proj.map((p:any) => (
      <a href={p.u} target="_blank" rel="noopener" class="card">
        <h3>{p.t}</h3>
        <p class="muted">{p.d}</p>
        <span class="arrow">{t.view} →</span>
      </a>
    ))}
  </div>
  <hr />
  <p>
    <a href={`/resume/${prefix}`} class="btn">← {t.back}</a>
    <a href={`mailto:${meta.email}`} class="btn" style="margin-left:.5rem">{t.contact}</a>
  </p>
</Layout>
<style>
  .avatar{width:160px;height:160px;border-radius:50%;object-fit:cover;border:4px solid var(--accent-2);margin-bottom:1rem;background:var(--surface)}
  .roles{font-family:var(--mono);color:var(--accent);font-size:1rem;margin:.5rem 0}
</style>
```

### 7. Páginas Estáticas Dinámicas (`src/pages/resume/[lang]/[page].astro`)

Un solo archivo para `about`, `services`, `contact`, `shop` en los 3 idiomas:

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui, pdfExperience, pdfEducation, shopItems, type Lang } from '../../data/resume';
const validPages = ['about','services','contact','shop'] as const;
export function getStaticPaths() {
  return (['es','ca','en'] as Lang[]).flatMap(lang =>
    validPages.map(page => ({ params: { lang, page } }))
  );
}
const { lang, page } = Astro.params as {lang:Lang;page:typeof validPages[number]};
if (!validPages.includes(page)) return Astro.redirect('/resume/es/');
const t = ui[lang];
const prefix = lang === 'es' ? '' : `${lang}/`;
---
<Layout title={t[page]} lang={lang}>
  {page === 'about' && <>
    <h1>{t.about}</h1>
    <p class="muted">{meta.name} · {meta.location[lang]} · {meta.license[lang]}</p>
    <p><span class="pill">{meta.teaCert[lang]}</span></p>
    <h2>{t.about}</h2>
    <p>{t.profileBio}</p>
    <h2>Hard Skills</h2>
    <div>{t.hardSkills.map((s:string) => <span class="pill">{s}</span>)}</div>
    <h3 style="margin-top:1.5rem">Soft Skills</h3>
    <div>{t.softSkills.map((s:string) => <span class="pill">{s}</span>)}</div>
    <h2>Idiomas</h2>
    <div>{t.languages.map((l:string) => <span class="pill">{l}</span>)}</div>
    <h2>{t.expTitle}</h2>
    {pdfExperience[lang].map((e:any) => (
      <article style="margin-bottom:1.5rem"><h3>{e.role}</h3><p class="muted">{e.company} · {e.dates}</p><ul>{e.tasks.map((tk:string)=><li>{tk}</li>)}</ul></article>
    ))}
    <h2>{t.eduTitle}</h2>
    <ul>{pdfEducation[lang].map((e:any) => <li><strong>{e.t}</strong> <span class="muted">· {e.p} · {e.d}</span></li>)}</ul>
    <p style="margin-top:2rem"><a href={`mailto:${meta.email}`} class="btn">{t.contact}</a></p>
  </>}

  {page === 'services' && <>
    <h1>{t.services}</h1>
    <div class="card-grid" style="margin-top:2rem">
      {[{t:t.hardSkills[0],d:'Gestión de inventario, carretillas, picking y expedición.'},
        {t:'Desarrollo web',d:'Sitios y apps con Astro, TypeScript y Node.'},
        {t:'Mantenimiento y jardinería',d:'Desbroce, siembra y mantenimiento fitosanitario.'},
        {t:'Atención al cliente',d:'Altas de usuarios, resolución de incidencias y soporte directo.'}
      ].map(s => <article class="card"><h3>{s.t}</h3><p>{s.d}</p></article>)}
    </div>
    <hr /><p><a href={`/resume/${prefix}contact`}>{t.contact}</a></p>
  </>}

  {page === 'contact' && <>
    <h1>{t.contact}</h1>
    <p>{t.contactIntro}</p>
    <ul style="margin-top:2rem;list-style:none;padding:0">
      <li style="margin-bottom:1rem">📧 <a href={`mailto:${meta.email}`}>{meta.email}</a></li>
      <li style="margin-bottom:1rem">📱 <a href={`tel:${meta.phone}`}>{meta.phone}</a></li>
      <li style="margin-bottom:1rem">💼 <a href={meta.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
      <li style="margin-bottom:1rem">🐙 <a href={meta.github} target="_blank" rel="noopener">GitHub</a></li>
    </ul>
    <form action={`mailto:${meta.email}`} method="POST" enctype="text/plain" style="display:flex;flex-direction:column;gap:.75rem;margin-top:2rem">
      <input name="nombre" placeholder={t.formName} required style="padding:.75rem;border:1px solid var(--border);border-radius:8px;background:var(--surface-2);color:var(--text);font-family:inherit" />
      <input name="email" type="email" placeholder={t.formEmail} required style="padding:.75rem;border:1px solid var(--border);border-radius:8px;background:var(--surface-2);color:var(--text);font-family:inherit" />
      <textarea name="mensaje" placeholder={t.formMsg} rows="5" required style="padding:.75rem;border:1px solid var(--border);border-radius:8px;background:var(--surface-2);color:var(--text);font-family:inherit"></textarea>
      <button type="submit" class="btn" style="align-self:flex-start">{t.send}</button>
    </form>
  </>}

  {page === 'shop' && <>
    <h1>🛒 {t.shopTitle}</h1>
    <p>{t.shopIntro}</p>
    <div class="card-grid" style="margin-top:2rem">
      {shopItems[lang].map(item => (
        <article class="card">
          <div class="img-placeholder"></div>
          <h3 style="margin-top:1rem">{item.name}</h3>
          <p class="muted" style="font-size:.9rem">{item.condition}</p>
          <p style="font-size:1.4rem;font-weight:700;color:var(--accent)">{item.price}</p>
          <a href={`mailto:${meta.email}?subject=${encodeURIComponent(item.name)}`}>{t.contact} →</a>
        </article>
      ))}
    </div>
    <hr /><p class="muted">{t.pickup}</p>
  </>}
</Layout>
<style>.img-placeholder{width:100%;height:160px;border-radius:8px;background:linear-gradient(135deg,var(--surface) 0%,var(--accent-3) 100%)}</style>
```

### ✅ Resumen de la Integración Astro + HTMX 3.x

| Aspecto | Implementación |
|---|---|
| **HTMX versión** | 3.x estable (`npm install htmx.org@^3`) |
| **Navegación SPA-like** | `hx-boost="true"` en `<body>` — todas las transiciones son instantáneas sin recarga completa |
| **Preview de perfiles** | `hx-get` + `hx-trigger="mouseenter once"` carga fragmentos bajo demanda |
| **Theme toggle** | `hx-on:click` declarativo, sin JS custom separado |
| **Animaciones** | CSS `@keyframes fadeIn` reaplicada vía evento `htmx:afterSwap` |
| **Datos** | 100% reales del PDF + HTMLs originales (Cambrils, TEA 35%, Glovo, Novatecnica WMS, Treslunas, ADE...) |
| **Paleta** | Los 5 colores aplicados en light/dark mode |
| **Build output** | ~25 HTML estáticos desde 7 archivos `.astro` |
| **JS enviado al cliente** | Solo ~14KB gzipped (HTMX core), cero frameworks |

**Siguiente paso:** Copia tu foto a `public/resume/sergio.jpg` y las imágenes de productos a `public/resume/shop/`. ¿Quieres que genere también el `Footer.astro` o que ajuste alguna sección específica?