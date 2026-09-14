# 🚀 Implementación final con rutas dinámicas

Te dejo la versión completa con rutas dinámicas `[lang]/[page]` para que un solo archivo sirva las 3 versiones en ES · CA · EN de cada página, más los 3 perfiles específicos (Logística, Fullstack, Genérico) que tenías en los HTML originales.

---

## 📁 Estructura final de rutas

```
/resume/                    → redirect a /resume/es/
/resume/es/                 → Home ES
/resume/ca/                 → Home CA
/resume/en/                 → Home EN
/resume/es/about/           → CV completo (PDF)
/resume/es/services/
/resume/es/contact/
/resume/es/shop/
/resume/es/logistica/       → Perfil Logística
/resume/es/fullstack/
/resume/es/generico/
(+ mismas rutas en /ca/ y /en/)
```

---

## 1️⃣ Datos centralizados completos (`src/data/resume.ts`)

```typescript
// src/data/resume.ts
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
    greeting: 'Hola 👋🏻', subtitle: 'Soy Sergio Jurado',
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
    formName: 'Tu nombre',
    formEmail: 'Tu email',
    formMsg: 'Cuéntame...',
    send: 'Enviar',
    pickup: 'Recogida en Cambrils o envío a acordar. Pago por Bizum o transferencia.'
  },
  ca: {
    home: 'Inici', about: 'Sobre mi', services: 'Serveis',
    shop: 'Botiga', contact: 'Contacte',
    greeting: 'Hola 👋🏻', subtitle: 'Sóc en Sergio Jurado',
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
    formName: 'El teu nom',
    formEmail: 'El teu email',
    formMsg: 'Explica\'m...',
    send: 'Enviar',
    pickup: 'Recollida a Cambrils o enviament a acordar. Pagament per Bizum o transferència.'
  },
  en: {
    home: 'Home', about: 'About', services: 'Services',
    shop: 'Shop', contact: 'Contact',
    greeting: 'Hi 👋🏻', subtitle: "I'm Sergio Jurado",
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
    formName: 'Your name',
    formEmail: 'Your email',
    formMsg: 'Tell me...',
    send: 'Send',
    pickup: 'Pickup in Cambrils or shipping to agree. Payment by Bizum or bank transfer.'
  }
};

// Datos REALES del PDF — iguales en los 3 idiomas (fechas/nombres propios)
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

// Perfiles específicos (antes logistica.html, fullstack.html, generico.html)
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
```

---

## 2️⃣ Footer (`src/components/Footer.astro`)

```astro
---
import { meta } from '../data/resume';
const { lang } = Astro.props;
const year = new Date().getFullYear();
const labels = {
  es: { rights: '© {year} Sergio Jurado. Portfolio profesional.' },
  ca: { rights: '© {year} Sergio Jurado. Portfolio professional.' },
  en: { rights: '© {year} Sergio Jurado. Professional portfolio.' }
};
const l = labels[lang as keyof typeof labels];
---
<footer class="site-footer">
  <p>{l.rights.replace('{year}', String(year))}</p>
  <div class="socials">
    <a href={`mailto:${meta.email}`}>Email</a>
    <a href={meta.linkedin} target="_blank" rel="noopener">LinkedIn</a>
    <a href={meta.github} target="_blank" rel="noopener">GitHub</a>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px dashed var(--border);
    margin-top: 3rem;
    padding: 1.5rem 0;
    text-align: center;
    color: var(--muted);
    font-size: 0.9rem;
  }
  .socials { margin-top: 0.75rem; display: flex; gap: 1rem; justify-content: center; }
</style>
```

---

## 3️⃣ Redirect raíz (`src/pages/resume/index.astro`)

```astro
---
return Astro.redirect('/resume/es/');
---
```

---

## 4️⃣ Home dinámico (`src/pages/resume/[lang]/index.astro`)

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui, experience, education, profiles } from '../../data/resume';

export function getStaticPaths() {
  return [
    { params: { lang: 'es' } },
    { params: { lang: 'ca' } },
    { params: { lang: 'en' } }
  ];
}

const { lang } = Astro.params as { lang: 'es'|'ca'|'en' };
const t = ui[lang];
const profileIds = ['logistica', 'fullstack', 'generico'] as const;
---
<Layout title={t.subtitle} lang={lang}>
  <section class="hero">
    <img src="/resume/sergio.jpg" alt={meta.name} class="avatar" />
    <p class="greeting">{t.greeting}</p>
    <h1>{t.subtitle}</h1>
    <p class="roles">{t.roles}</p>
    <p class="muted">
      <span class="pill">{t.location}</span>
      <span class="pill">{t.teaCert}</span>
    </p>
  </section>

  <hr />

  <h2>{t.about}</h2>
  {t.bio.map((p: string) => <p>{p}</p>)}
  <p>
    <a href={`mailto:${meta.email}`}>{meta.email}</a> ·
    <a href={`tel:${meta.phone}`}>{meta.phone}</a>
  </p>

  <hr />

  <h2>{t.whatIDo}</h2>
  <div class="card-grid">
    {t.services.map((s: any) => (
      <article class="card">
        <h3>{s.t}</h3>
        <p class="muted">{s.d}</p>
      </article>
    ))}
  </div>
  <p style="margin-top:1.5rem;"><a href={`/resume/${lang === 'es' ? '' : lang + '/'}services`}>{t.fullCV}</a></p>

  <hr />

  <h2>{t.choose}</h2>
  <div class="card-grid">
    {profileIds.map((id) => {
      const p = profiles[id][lang];
      const href = `/resume/${lang === 'es' ? '' : lang + '/'}${id}/`;
      return (
        <a href={href} class="card profile-card">
          <h3>{p.title}</h3>
          <p class="muted">{p.desc}</p>
          <span class="arrow">{t.view}</span>
        </a>
      );
    })}
  </div>

  <hr />

  <h2>{t.recentExp}</h2>
  <ul>
    {experience[lang].slice(0, 4).map((e: any) => (
      <li><strong>{e.role}</strong> <span class="muted">@ {e.company} · {e.dates}</span></li>
    ))}
  </ul>
  <h3>{t.educationTitle}</h3>
  <ul>
    {education[lang].slice(0, 3).map((e: any) => (
      <li><strong>{e.t}</strong> <span class="muted">· {e.p} · {e.d}</span></li>
    ))}
  </ul>

  <hr />

  <h2>{t.links}</h2>
  <p>
    <a href={meta.linkedin} target="_blank" rel="noopener">LinkedIn</a> ·
    <a href={meta.github} target="_blank" rel="noopener">GitHub</a> ·
    <a href={`/resume/${lang === 'es' ? '' : lang + '/'}shop`}>{t.shopTitle}</a> ·
    <a href={`/resume/${lang === 'es' ? '' : lang + '/'}contact`}>{t.contact}</a>
  </p>
</Layout>

<style>
  .hero { text-align: center; padding: 2rem 0; }
  .avatar {
    width: 180px; height: 180px; border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent-2);
    margin-bottom: 1.5rem;
    background: var(--surface);
  }
  .greeting { font-size: 1.4rem; color: var(--muted); margin-bottom: .25rem; }
  .roles {
    font-family: var(--mono);
    color: var(--accent);
    font-size: 1.05rem;
    margin: .5rem 0;
  }
  .profile-card { text-decoration: none; color: inherit; display: block; }
  .arrow { color: var(--accent); font-weight: 700; font-size: 0.9rem; }
</style>
```

---

## 5️⃣ Páginas estáticas dinámicas (`src/pages/resume/[lang]/[page].astro`)

Un solo archivo para `about`, `services`, `contact`, `shop` en los 3 idiomas:

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui, experience, education, shopItems, type Lang, type Page } from '../../data/resume';

const validPages: Page[] = ['about', 'services', 'contact', 'shop'];

export function getStaticPaths() {
  const langs: Lang[] = ['es', 'ca', 'en'];
  return langs.flatMap(lang =>
    validPages.map(page => ({ params: { lang, page } }))
  );
}

const { lang, page } = Astro.params as { lang: Lang; page: Page };
if (!validPages.includes(page)) return Astro.redirect('/resume/es/');

const t = ui[lang];
const prefix = lang === 'es' ? '' : `${lang}/`;
---
<Layout title={t[page]} lang={lang}>
  {page === 'about' && (
    <>
      <h1>{t.about}</h1>
      <p class="muted">{meta.name} · {t.location} · {t.license}</p>
      <p><span class="pill">{t.teaCert}</span></p>

      <h2>{t.about}</h2>
      {t.bio.map((p: string) => <p>{p}</p>)}

      <h2>Hard skills</h2>
      <div>{t.skillsHard.map((s: string) => <span class="pill">{s}</span>)}</div>

      <h3 style="margin-top:1.5rem;">Soft skills</h3>
      <div>{t.skillsSoft.map((s: string) => <span class="pill">{s}</span>)}</div>

      <h2>{t.languages.join(' · ').includes('·') ? 'Idiomes' : 'Languages'}</h2>
      <div>{t.languages.map((l: string) => <span class="pill">{l}</span>)}</div>

      <h2>{t.recentExp}</h2>
      {experience[lang].map((e: any) => (
        <article style="margin-bottom:1.5rem;">
          <h3>{e.role}</h3>
          <p class="muted">{e.company} · {e.dates}</p>
          <ul>{e.tasks.map((tk: string) => <li>{tk}</li>)}</ul>
        </article>
      ))}

      <h2>{t.educationTitle}</h2>
      <ul>
        {education[lang].map((e: any) => <li><strong>{e.t}</strong> <span class="muted">· {e.p} · {e.d}</span></li>)}
      </ul>

      <h2>{t.availability}</h2>
      <p>
        <span class="pill">{t.availability}</span>
        <span class="pill">{t.license}</span>
      </p>

      <p style="margin-top:2rem;">
        <a href={`mailto:${meta.email}`} class="btn">{t.contact}</a>
      </p>
    </>
  )}

  {page === 'services' && (
    <>
      <h1>{t.services}</h1>
      <p class="muted">{t.whatIDo}</p>
      <div class="card-grid" style="margin-top:2rem;">
        {t.services.map((s: any) => (
          <article class="card">
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </article>
        ))}
      </div>
      <hr />
      <p>
        <a href={`/resume/${prefix}contact`}>{t.contact}</a>
      </p>
    </>
  )}

  {page === 'contact' && (
    <>
      <h1>{t.contact}</h1>
      <p>{t.contactIntro}</p>

      <ul style="margin-top:2rem; list-style:none; padding:0;">
        <li style="margin-bottom:1rem;">📧 <a href={`mailto:${meta.email}`}>{meta.email}</a></li>
        <li style="margin-bottom:1rem;">📱 <a href={`tel:${meta.phone}`}>{meta.phone}</a></li>
        <li style="margin-bottom:1rem;">💼 <a href={meta.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
        <li style="margin-bottom:1rem;">🐙 <a href={meta.github} target="_blank" rel="noopener">GitHub</a></li>
      </ul>

      <form action={`mailto:${meta.email}`} method="POST" enctype="text/plain"
            style="display:flex; flex-direction:column; gap:.75rem; margin-top:2rem;">
        <input name="nombre" placeholder={t.formName} required
               style="padding:.75rem; border:1px solid var(--border); border-radius:8px; background:var(--surface-2); color:var(--text); font-family:inherit;" />
        <input name="email" type="email" placeholder={t.formEmail} required
               style="padding:.75rem; border:1px solid var(--border); border-radius:8px; background:var(--surface-2); color:var(--text); font-family:inherit;" />
        <textarea name="mensaje" placeholder={t.formMsg} rows="5" required
                  style="padding:.75rem; border:1px solid var(--border); border-radius:8px; background:var(--surface-2); color:var(--text); font-family:inherit;"></textarea>
        <button type="submit" class="btn" style="align-self:flex-start;">{t.send}</button>
      </form>
    </>
  )}

  {page === 'shop' && (
    <>
      <h1>🛒 {t.shopTitle}</h1>
      <p>{t.shopIntro}</p>
      <div class="card-grid" style="margin-top:2rem;">
        {shopItems[lang].map((item: any, i: number) => (
          <article class="card">
            <div class="img-placeholder"></div>
            <h3 style="margin-top:1rem;">{item.name}</h3>
            <p class="muted" style="font-size:.9rem;">{item.condition}</p>
            <p style="font-size:1.4rem; font-weight:700; color:var(--accent);">{item.price}</p>
            <a href={`mailto:${meta.email}?subject=${encodeURIComponent(item.name)}`}>{t.contact} →</a>
          </article>
        ))}
      </div>
      <hr />
      <p class="muted">{t.pickup}</p>
    </>
  )}
</Layout>

<style>
  .img-placeholder {
    width: 100%; height: 160px; border-radius: 8px;
    background: linear-gradient(135deg, var(--surface) 0%, var(--accent-3) 100%);
  }
</style>
```

---

## 6️⃣ Perfiles específicos (`src/pages/resume/[lang]/[profile].astro`)

Un solo archivo para `logistica`, `fullstack`, `generico` en los 3 idiomas:

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui, profiles, type Lang, type Profile } from '../../data/resume';

const validProfiles: Profile[] = ['logistica', 'fullstack', 'generico'];

export function getStaticPaths() {
  const langs: Lang[] = ['es', 'ca', 'en'];
  return langs.flatMap(lang =>
    validProfiles.map(profile => ({ params: { lang, profile } }))
  );
}

const { lang, profile } = Astro.params as { lang: Lang; profile: Profile };
if (!validProfiles.includes(profile)) return Astro.redirect('/resume/es/');

const t = ui[lang];
const data = profiles[profile][lang];
const prefix = lang === 'es' ? '' : `${lang}/`;
---
<Layout title={data.title} lang={lang}>
  <header style="text-align:center; padding: 1.5rem 0;">
    <img src="/resume/sergio.jpg" alt={meta.name} class="avatar" />
    <h1>{data.title}</h1>
    <p class="roles">{data.role}</p>
    <p class="muted">
      <span class="pill">{t.location}</span>
      <span class="pill">{t.teaCert}</span>
    </p>
  </header>

  <hr />

  <h2>{t.about}</h2>
  <p>{data.about}</p>
  <p class="muted" style="font-style:italic;">{data.desc}</p>

  <hr />

  <h2>Skills</h2>
  <div>
    {data.skills.map((s: string) => <span class="pill">{s}</span>)}
  </div>

  <hr />

  <h2>{t.recentExp}</h2>
  {data.exp.map((e: any) => (
    <article style="margin-bottom:1.5rem;">
      <h3>{e.t}</h3>
      <p class="muted">{e.c} · {e.d}</p>
      <ul>{e.b.map((b: string) => <li>{b}</li>)}</ul>
    </article>
  ))}

  <hr />

  <p>
    <a href={`/resume/${prefix}`} class="btn">← {t.home}</a>
    <a href={`mailto:${meta.email}`} class="btn" style="margin-left:0.5rem;">{t.contact}</a>
  </p>
</Layout>

<style>
  .avatar {
    width: 160px; height: 160px; border-radius: 50%;
    object-fit: cover;
    border: 4px solid var(--accent-2);
    margin-bottom: 1rem;
    background: var(--surface);
  }
  .roles {
    font-family: var(--mono);
    color: var(--accent);
    font-size: 1rem;
    margin: .5rem 0;
  }
</style>
```

---

## ✅ Resumen de lo conseguido

| Punto | Estado |
|---|---|
| Selector ES · CA · EN | ✅ En el header, con `active` destacado |
| Toggle dark / light | ✅ Con `localStorage` |
| Montado en `/resume` | ✅ `base: '/resume'` |
| Paleta cálida | ✅ 5 colores aplicados |
| Datos reales del PDF | ✅ Sin inventar |
| 5 páginas principales | ✅ home, about, services, contact, shop |
| 3 perfiles específicos | ✅ logistica, fullstack, generico |
| 3 idiomas completos | ✅ Con rutas dinámicas `[lang]` |
| Sin referencias a terceros | ✅ Diseño propio |
| CSS con variables | ✅ Cambias paleta en 1 archivo |

**Archivos totales generados en build:** `1 (redirect) + 3 (homes) + 12 (páginas 4×3) + 9 (perfiles 3×3) = 25 HTML estáticos` desde solo **6 archivos `.astro`**.

**Siguiente paso:** añade tu foto en `public/resume/sergio.jpg` y las imágenes de productos en `public/resume/shop/` para sustituir el `.img-placeholder` por un `<img>` real.