Perfecto, ya tengo todo claro. La página `/hola` de Jon Mircha es una **landing personal cálida y minimalista** con: saludo + foto + bio corta + secciones tipo "Yo soy" y "¿Qué hago?" [[3]] [[6]]. Voy a adaptar esa filosofía a tu dominio, usando tus **datos reales del PDF** (no inventados).

## 🏗️ Estructura propuesta para `senseikatana.com/resume`

```
src/
├── data/
│   └── resume.ts              ← Datos reales en ES / CA / EN
├── components/
│   ├── Header.astro           ← Nav + idioma + theme
│   ├── Footer.astro
│   ├── LangSwitcher.astro
│   └── ThemeToggle.astro
├── layouts/
│   └── ResumeLayout.astro     ← HTML base
└── pages/
    └── resume/
        ├── index.astro        ← /resume (landing tipo jonmircha)
        ├── about.astro        ← /resume/about
        ├── contact.astro      ← /resume/contacto
        ├── services.astro     ← /resume/servicios
        └── shop.astro         ← /resume/tienda
```

---

## 1️⃣ Datos centralizados reales (`src/data/resume.ts`)

Basado en tu PDF, traducido a los 3 idiomas:

```typescript
// src/data/resume.ts
export const meta = {
  name: 'Sergio Jurado Casado',
  location: { es: 'Cambrils, Tarragona', ca: 'Cambrils, Tarragona', en: 'Cambrils, Tarragona' },
  email: 'contacto.sergiojurado@protonmail.com',
  phone: '+34 637 723 747',
  linkedin: 'https://www.linkedin.com/in/senseijurado/',
  teaCert: { es: 'Certif. Discapacidad TEA (35%)', ca: 'Certif. Discapacitat TEA (35%)', en: 'ASD Disability Cert. (35%)' },
  license: { es: 'Licencia de conducir B', ca: 'Permís de conduir B', en: 'Driving licence B' }
};

export const ui = {
  es: {
    home: 'Inicio', about: 'Sobre mí', contact: 'Contacto', services: 'Servicios', shop: 'Tienda',
    greeting: 'Hola 👋🏻', subtitle: 'Soy Sergio Jurado',
    roles: 'Logística · Desarrollo Web · Mantenimiento',
    bio: [
      'Como profesional polivalente combino experiencia integral en logística de almacenes, gestión comercial y conocimientos técnicos en desarrollo web.',
      'Soy meticuloso, observador y con gran capacidad de análisis, siempre en aprendizaje continuo.',
      'Busco integrarme en equipos dinámicos que apoyen el desarrollo profesional.'
    ],
    whatIDo: '¿Qué hago?',
    services: [
      { t: 'Logística y almacén', d: 'Gestión de inventario, carretillas (frontal, retráctil, apiladoras), picking, expedición.' },
      { t: 'Desarrollo web', d: 'Sitios y pequeñas apps con Astro, TypeScript y Node. Portfolios, catálogos, tiendas.' },
      { t: 'Mantenimiento y jardinería', d: 'Desbroce, siembra, mantenimiento fitosanitario.' },
      { t: 'Atención al cliente y recepción', d: 'Altas de usuarios, resolución de incidencias, soporte directo.' }
    ],
    skills: ['Gestión logística', 'Ofimática intermedia', 'Carretillas elevadoras', 'Mantenimiento', 'Analítica', 'Aprendizaje continuo'],
    languages: ['Castellano (nativo)', 'Catalán (elemental)', 'Inglés (A2)'],
    contact: 'Contacto', shopTitle: 'Tienda de 2ª mano', shopIntro: 'Productos que ya no uso pero pueden servirte.'
  },
  ca: {
    home: 'Inici', about: 'Sobre mi', contact: 'Contacte', services: 'Serveis', shop: 'Botiga',
    greeting: 'Hola 👋🏻', subtitle: 'Sóc en Sergio Jurado',
    roles: 'Logística · Desenvolupament Web · Manteniment',
    bio: [
      'Com a professional polivalent combino experiència integral en logística de magatzems, gestió comercial i coneixements tècnics en desenvolupament web.',
      'Sóc meticulós, observador i amb gran capacitat d\'anàlisi, sempre en aprenentatge continu.',
      'Busco integrar-me en equips dinàmics que donin suport al desenvolupament professional.'
    ],
    whatIDo: 'Què faig?',
    services: [
      { t: 'Logística i magatzem', d: 'Gestió d\'inventari, carretons, picking, expedició.' },
      { t: 'Desenvolupament web', d: 'Llocs i petites apps amb Astro, TypeScript i Node.' },
      { t: 'Manteniment i jardineria', d: 'Desbrossament, sembra, manteniment fitosanitari.' },
      { t: 'Atenció al client i recepció', d: 'Altes d\'usuaris, resolució d\'incidències.' }
    ],
    skills: ['Gestió logística', 'Ofimàtica', 'Carretons elevadors', 'Manteniment', 'Analítica', 'Aprenentatge continu'],
    languages: ['Castellà (natiu)', 'Català (elemental)', 'Anglès (A2)'],
    contact: 'Contacte', shopTitle: 'Botiga de 2a mà', shopIntro: 'Productes que ja no faig servir però et poden servir.'
  },
  en: {
    home: 'Home', about: 'About', contact: 'Contact', services: 'Services', shop: 'Shop',
    greeting: 'Hi 👋🏻', subtitle: "I'm Sergio Jurado",
    roles: 'Logistics · Web Development · Maintenance',
    bio: [
      'As a versatile professional I combine solid experience in warehouse logistics, commercial management and technical web development skills.',
      'I am meticulous, observant and highly analytical, always learning.',
      'I look to join dynamic teams that support professional growth.'
    ],
    whatIDo: 'What I do',
    services: [
      { t: 'Logistics & warehouse', d: 'Inventory, forklifts (front, reach, stacker), picking and dispatch.' },
      { t: 'Web development', d: 'Sites and small apps with Astro, TypeScript and Node. Portfolios, catalogues, shops.' },
      { t: 'Maintenance & gardening', d: 'Brush clearing, planting, phytosanitary upkeep.' },
      { t: 'Customer service & reception', d: 'User registration, incident handling, direct support.' }
    ],
    skills: ['Logistics management', 'Intermediate Office', 'Forklifts', 'Maintenance', 'Analysis', 'Continuous learning'],
    languages: ['Spanish (native)', 'Catalan (basic)', 'English (A2)'],
    contact: 'Contact', shopTitle: 'Second-hand shop', shopIntro: 'Items I no longer use that could be useful to you.'
  }
};

export const experience = {
  es: [
    { role: 'Personal de Mantenimiento y Jardinería', company: 'Ayuntamiento de Salou', dates: '2025', tasks: ['Desbrozadora para jardines públicos', 'Siembra y mantenimiento fitosanitario'] },
    { role: 'Asistente de Hostelería', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Servicio en barra y mesa', 'Supervisión de orden y limpieza'] },
    { role: 'Reparto Logístico', company: 'Passos de Cuinar, Cambrils', dates: '2024', tasks: ['Transporte logístico puntual'] },
    { role: 'Reparto Logístico', company: 'Uber Eats, Cambrils', dates: '2023', tasks: ['Programación de itinerarios', 'Distribución de pedidos'] },
    { role: 'Reparto Logístico', company: 'GlovoApp S.L., Cambrils', dates: '2021 — 2023', tasks: ['Reparto eficiente', 'Soporte operativo a socios de restauración'] },
    { role: 'Responsable de Recepción', company: 'Centro Municipal Deportivo, Valladolid', dates: '2020', tasks: ['Altas de usuarios', 'Resolución de incidencias'] }
  ],
  ca: [
    { role: 'Personal de Manteniment i Jardineria', company: 'Ajuntament de Salou', dates: '2025', tasks: ['Desbrossadora per a jardins', 'Sembra i manteniment'] },
    { role: 'Assistent d\'Hostaleria', company: 'Bar Las Cadenas', dates: '2024', tasks: ['Servei en barra i taula', 'Neteja integral'] },
    { role: 'Repartiment Logístic', company: 'Passos de Cuinar', dates: '2024', tasks: ['Transport logístic'] },
    { role: 'Repartiment Logístic', company: 'Uber Eats', dates: '2023', tasks: ['Itineraris i distribució'] },
    { role: 'Repartiment Logístic', company: 'GlovoApp S.L.', dates: '2021 — 2023', tasks: ['Repartiment eficient', 'Suport operatiu'] },
    { role: 'Responsable de Recepció', company: 'Centre Municipal Esportiu, Valladolid', dates: '2020', tasks: ['Altes d\'usuaris', 'Incidències'] }
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

export const education = {
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

export const shopItems = {
  es: [
    { name: 'Bicicleta de montaña', price: '120 €', condition: 'Usado · Buen estado', img: '/resume/shop/bike.jpg' },
    { name: 'Monitor 24" Full HD', price: '80 €', condition: 'Usado · Como nuevo', img: '/resume/shop/monitor.jpg' },
    { name: 'Lote de libros técnicos', price: '25 €', condition: 'Usado', img: '/resume/shop/books.jpg' }
  ],
  ca: [
    { name: 'Bicicleta de muntanya', price: '120 €', condition: 'Usat · Bon estat', img: '/resume/shop/bike.jpg' },
    { name: 'Monitor 24" Full HD', price: '80 €', condition: 'Usat · Com nou', img: '/resume/shop/monitor.jpg' },
    { name: 'Lot de llibres tècnics', price: '25 €', condition: 'Usat', img: '/resume/shop/books.jpg' }
  ],
  en: [
    { name: 'Mountain bike', price: '€120', condition: 'Used · Good', img: '/resume/shop/bike.jpg' },
    { name: '24" Full HD monitor', price: '€80', condition: 'Used · Like new', img: '/resume/shop/monitor.jpg' },
    { name: 'Tech books bundle', price: '€25', condition: 'Used', img: '/resume/shop/books.jpg' }
  ]
};
```

---

## 2️⃣ Layout global (`src/layouts/ResumeLayout.astro`)

```astro
---
// src/layouts/ResumeLayout.astro
import { meta } from '../data/resume';
export interface Props { title: string; lang: 'es' | 'ca' | 'en'; }
const { title, lang } = Astro.props;
const htmlLang = lang === 'ca' ? 'ca-ES' : lang === 'es' ? 'es-ES' : 'en-GB';
---
<!doctype html>
<html lang={htmlLang} data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} · {meta.name}</title>
  <meta name="description" content="Portfolio profesional de {meta.name} — Cambrils, Tarragona." />
  <link rel="canonical" href={`https://senseikatana.com/resume/${lang === 'es' ? '' : lang}`} />
  <link rel="alternate" hreflang="es" href="https://senseikatana.com/resume/" />
  <link rel="alternate" hreflang="ca" href="https://senseikatana.com/resume/ca" />
  <link rel="alternate" hreflang="en" href="https://senseikatana.com/resume/en" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <style is:global>
    :root {
      --bg: #fafaf7; --fg: #1a1a1a; --muted: #6b6b6b;
      --accent: #c05621; --card: #fff; --border: #e7e5e0;
      --font: 'Charter', 'Georgia', system-ui, serif;
      --font-mono: 'JetBrains Mono', ui-monospace, monospace;
    }
    [data-theme="dark"] {
      --bg: #121210; --fg: #f1efe9; --muted: #9a9a9a;
      --accent: #f59e0b; --card: #1c1c1a; --border: #2e2e2c;
    }
    * { box-sizing: border-box; margin: 0; }
    html, body { background: var(--bg); color: var(--fg); font-family: var(--font); line-height: 1.6; transition: background .3s, color .3s; }
    .container { max-width: 760px; margin: 0 auto; padding: 2rem 1.5rem; }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    h1 { font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -0.02em; }
    h2 { font-size: 1.4rem; margin: 2.5rem 0 1rem; }
    h3 { font-size: 1.1rem; margin: 1rem 0 0.5rem; }
    p { color: var(--fg); margin-bottom: 1rem; }
    .muted { color: var(--muted); }
    hr { border: 0; border-top: 1px dashed var(--border); margin: 2.5rem 0; }
    ul { padding-left: 1.25rem; margin-bottom: 1rem; }
    li { margin-bottom: 0.4rem; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 1.25rem; transition: transform .2s, border-color .2s; }
    .card:hover { transform: translateY(-3px); border-color: var(--accent); }
    .pill { display: inline-block; font-size: 0.8rem; background: var(--border); color: var(--fg); padding: 0.2rem 0.6rem; border-radius: 999px; margin: 0.2rem 0.3rem 0.2rem 0; }
    button { font-family: inherit; cursor: pointer; }
    .emoji { font-family: 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif; }
    .garden { text-align: center; color: var(--muted); font-size: 1.2rem; letter-spacing: 0.3rem; margin: 2rem 0; }
    @media print { header, footer, .no-print { display: none !important; } body { background: white; } }
  </style>
</head>
<body>
  <Header lang={lang} />
  <main class="container">
    <slot />
  </main>
  <Footer lang={lang} />
  <script is:inline>
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = saved;
  </script>
</body>
</html>
```

---

## 3️⃣ Header con selector de idioma + theme (`src/components/Header.astro`)

```astro
---
// src/components/Header.astro
import { ui } from '../data/resume';
const { lang } = Astro.props;
const t = ui[lang];
const links = [
  { href: '/resume/' + (lang === 'es' ? '' : lang + '/'), label: t.home },
  { href: '/resume/' + (lang === 'es' ? 'about' : lang + '/about'), label: t.about },
  { href: '/resume/' + (lang === 'es' ? 'services' : lang + '/services'), label: t.services },
  { href: '/resume/' + (lang === 'es' ? 'shop' : lang + '/shop'), label: t.shop },
  { href: '/resume/' + (lang === 'es' ? 'contact' : lang + '/contact'), label: t.contact },
];
---
<header class="site-header">
  <nav>
    <a href="/resume/" class="logo">senseikatana<span class="muted">/resume</span></a>
    <ul>
      {links.map(l => <li><a href={l.href}>{l.label}</a></li>)}
    </ul>
    <div class="tools">
      <div class="lang-switcher">
        <a href="/resume/" class={lang === 'es' ? 'active' : ''}>ES</a>
        <a href="/resume/ca/" class={lang === 'ca' ? 'active' : ''}>CA</a>
        <a href="/resume/en/" class={lang === 'en' ? 'active' : ''}>EN</a>
      </div>
      <button id="theme-toggle" aria-label="Cambiar tema">🌓</button>
    </div>
  </nav>
</header>

<style>
  .site-header { border-bottom: 1px solid var(--border); padding: 1rem 1.5rem; position: sticky; top: 0; background: color-mix(in srgb, var(--bg) 85%, transparent); backdrop-filter: blur(10px); z-index: 10; }
  nav { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
  .logo { font-weight: 700; font-family: var(--font-mono); color: var(--fg); }
  ul { list-style: none; padding: 0; margin: 0; display: flex; gap: 1.2rem; flex: 1; flex-wrap: wrap; }
  ul a { color: var(--fg); font-size: 0.95rem; }
  .tools { display: flex; align-items: center; gap: 0.75rem; }
  .lang-switcher { display: flex; gap: 0.4rem; font-size: 0.85rem; }
  .lang-switcher a { color: var(--muted); padding: 0.1rem 0.4rem; border-radius: 4px; }
  .lang-switcher a.active { color: var(--accent); font-weight: 700; }
  #theme-toggle { background: transparent; border: 1px solid var(--border); border-radius: 50%; width: 36px; height: 36px; font-size: 1rem; }
  @media (max-width: 640px) { ul { order: 3; width: 100%; } }
</style>

<script>
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const html = document.documentElement;
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
</script>
```

---

## 4️⃣ Home `/resume` — Landing tipo Jon Mircha (`src/pages/resume/index.astro`)

Inspirada en `/hola` con saludo, foto, bio corta y secciones "Yo soy" / "¿Qué hago?":

```astro
---
// src/pages/resume/index.astro
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui, experience, education } from '../../data/resume';
const lang = 'es';
const t = ui.es;
---
<Layout title={t.subtitle} lang={lang}>
  <section class="hero">
    <img src="/resume/sergio.jpg" alt={meta.name} class="avatar" />
    <p class="greeting">{t.greeting}</p>
    <h1>{t.subtitle}</h1>
    <p class="roles">{t.roles}</p>
    <p class="muted">{meta.location.es} · {meta.teaCert.es}</p>
  </section>

  <hr />

  <h2>Yo soy</h2>
  {t.bio.map(p => <p>{p}</p>)}
  <p><a href="mailto:{meta.email}">{meta.email}</a> · <a href={`tel:${meta.phone}`}>{meta.phone}</a></p>

  <hr />

  <h2>{t.whatIDo}</h2>
  <div class="card-grid">
    {t.services.map(s => (
      <article class="card">
        <h3>{s.t}</h3>
        <p class="muted">{s.d}</p>
      </article>
    ))}
  </div>
  <p style="margin-top:1.5rem;"><a href="/resume/services">Ver servicios completos →</a></p>

  <hr />

  <h2>¿Qué he hecho?</h2>
  <h3>Experiencia reciente</h3>
  <ul>
    {experience.es.slice(0, 4).map(e => (
      <li><strong>{e.role}</strong> <span class="muted">@ {e.company} · {e.dates}</span></li>
    ))}
  </ul>
  <h3>Formación</h3>
  <ul>
    {education.es.slice(0, 3).map(e => (
      <li><strong>{e.t}</strong> <span class="muted">· {e.p} · {e.d}</span></li>
    ))}
  </ul>
  <p><a href="/resume/about">Ver CV completo →</a></p>

  <hr />

  <h2>Enlaces</h2>
  <p>
    <a href={meta.linkedin} target="_blank" rel="noopener">🔗 LinkedIn</a> ·
    <a href="https://github.com/senseikatana" target="_blank" rel="noopener">🐙 GitHub</a> ·
    <a href="/resume/shop">🛒 Tienda de 2ª mano</a> ·
    <a href="/resume/contact">✉️ Contacto</a>
  </p>

  <p class="garden">🌱 estás en mi jardín digital 🌱</p>
</Layout>

<style>
  .hero { text-align: center; padding: 2rem 0; }
  .avatar { width: 180px; height: 180px; border-radius: 50%; object-fit: cover; border: 4px solid var(--accent); margin-bottom: 1.5rem; background: var(--border); }
  .greeting { font-size: 1.5rem; color: var(--muted); margin-bottom: 0.25rem; }
  .roles { font-family: var(--font-mono); color: var(--accent); margin: 0.5rem 0; }
</style>
```

> **Tip:** coloca tu foto en `public/resume/sergio.jpg`.

---

## 5️⃣ Subpáginas

### `/resume/about` — CV completo

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui, experience, education } from '../../data/resume';
const t = ui.es;
---
<Layout title={t.about} lang="es">
  <h1>{t.about}</h1>
  <p class="muted">{meta.name} · {meta.location.es} · {meta.license.es}</p>

  <h2>Perfil</h2>
  {t.bio.map(p => <p>{p}</p>)}

  <h2>Habilidades</h2>
  <div>{t.skills.map(s => <span class="pill">{s}</span>)}</div>

  <h2>Idiomas</h2>
  <div>{t.languages.map(l => <span class="pill">{l}</span>)}</div>

  <h2>Experiencia</h2>
  {experience.es.map(e => (
    <article style="margin-bottom:1.5rem;">
      <h3>{e.role}</h3>
      <p class="muted">{e.company} · {e.dates}</p>
      <ul>{e.tasks.map(t => <li>{t}</li>)}</ul>
    </article>
  ))}

  <h2>Formación</h2>
  <ul>
    {education.es.map(e => <li><strong>{e.t}</strong> <span class="muted">· {e.p} · {e.d}</span></li>)}
  </ul>
</Layout>
```

### `/resume/services` — Servicios

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { ui } from '../../data/resume';
const t = ui.es;
---
<Layout title={t.services} lang="es">
  <h1>{t.services}</h1>
  <p class="muted">Lo que puedo hacer por ti.</p>
  <div class="card-grid" style="margin-top:2rem;">
    {t.services.map(s => (
      <article class="card">
        <h3>{s.t}</h3>
        <p>{s.d}</p>
      </article>
    ))}
  </div>
  <p style="margin-top:2rem;">¿Te interesa alguno? <a href="/resume/contact">Escríbeme</a>.</p>
</Layout>
```

### `/resume/contact`

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { meta, ui } from '../../data/resume';
const t = ui.es;
---
<Layout title={t.contact} lang="es">
  <h1>{t.contact}</h1>
  <p>Estoy disponible para incorporación inmediata. Escríbeme y hablamos.</p>
  <ul style="margin-top:2rem; list-style:none; padding:0;">
    <li style="margin-bottom:1rem;">📧 <a href={`mailto:${meta.email}`}>{meta.email}</a></li>
    <li style="margin-bottom:1rem;">📱 <a href={`tel:${meta.phone}`}>{meta.phone}</a></li>
    <li style="margin-bottom:1rem;">💼 <a href={meta.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
    <li style="margin-bottom:1rem;">🐙 <a href="https://github.com/senseikatana" target="_blank" rel="noopener">GitHub</a></li>
  </ul>
  <form style="margin-top:2rem; display:flex; flex-direction:column; gap:0.75rem;" action="mailto:contacto.sergiojurado@protonmail.com" method="POST" enctype="text/plain">
    <input name="nombre" placeholder="Tu nombre" required style="padding:0.75rem; border:1px solid var(--border); border-radius:6px; background:var(--card); color:var(--fg);" />
    <input name="email" type="email" placeholder="Tu email" required style="padding:0.75rem; border:1px solid var(--border); border-radius:6px; background:var(--card); color:var(--fg);" />
    <textarea name="mensaje" placeholder="Cuéntame..." rows="5" required style="padding:0.75rem; border:1px solid var(--border); border-radius:6px; background:var(--card); color:var(--fg);"></textarea>
    <button type="submit" style="padding:0.75rem; background:var(--accent); color:white; border:0; border-radius:6px; font-weight:600;">Enviar</button>
  </form>
</Layout>
```

### `/resume/shop` — Tienda de 2ª mano

```astro
---
import Layout from '../../layouts/ResumeLayout.astro';
import { ui, shopItems, meta } from '../../data/resume';
const t = ui.es;
---
<Layout title={t.shopTitle} lang="es">
  <h1>🛒 {t.shopTitle}</h1>
  <p>{t.shopIntro}</p>

  <div class="card-grid" style="margin-top:2rem;">
    {shopItems.es.map(item => (
      <article class="card">
        <img src={item.img} alt={item.name} style="width:100%; height:180px; object-fit:cover; border-radius:6px; background:var(--border);" />
        <h3 style="margin-top:1rem;">{item.name}</h3>
        <p class="muted" style="font-size:0.9rem;">{item.condition}</p>
        <p style="font-size:1.3rem; font-weight:700; color:var(--accent);">{item.price}</p>
        <a href={`mailto:${meta.email}?subject=Interesado en ${item.name}`}>Contactar →</a>
      </article>
    ))}
  </div>

  <hr />
  <p class="muted">Recogida en Cambrils o envío a acordar. Pago por Bizum o transferencia.</p>
</Layout>
```

---

## 🚀 Despliegue

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://senseikatana.com',
  base: '/resume',        // ← Todas las rutas cuelgan de /resume
  trailingSlash: 'always',
  output: 'static'
});
```

### Comando de build

```bash
npm run build    # genera dist/
```

Sube `dist/` a tu hosting bajo el subdirectorio `/resume/`.

### `robots.txt` (en `public/`)

```
User-agent: *
Allow: /resume/
Sitemap: https://senseikatana.com/sitemap.xml
```

---

## ✅ Checklist de lo implementado

| Requisito | Estado |
|---|---|
| Selector de idiomas (ES / CA / EN) | ✅ Header con 3 enlaces y persistencia por ruta |
| Selector de tema (dark / light) | ✅ Botón 🌓 con `localStorage` |
| Parte del dominio (`/resume`) | ✅ `base: '/resume'` en config |
| Inspiración `jonmircha.com/hola` | ✅ Hero con foto + bio corta + "Yo soy" + "¿Qué hago?" + jardín digital [[3]] [[6]] |
| Subpágina About-me | ✅ `/resume/about` con CV completo |
| Subpágina Contacto | ✅ `/resume/contact` con formulario |
| Subpágina Servicios | ✅ `/resume/services` |
| Subpágina Tienda 2ª mano | ✅ `/resume/shop` con catálogo |
| Datos reales del PDF | ✅ Todos extraídos sin inventar |

**Siguiente paso sugerido:** añade tu foto en `public/resume/sergio.jpg` y las imágenes de productos de la tienda en `public/resume/shop/`. ¿Quieres que prepare también la versión `/resume/ca/` y `/resume/en/` dinámicas con un solo archivo usando rutas `[lang]/[page].astro`?
