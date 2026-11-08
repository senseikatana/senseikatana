---
title: 'Web i e-commerce'
description: "Llocs i botigues que carreguen ràpid, s'indexen bé i no depenen d'un connector per funcionar."
icon: 'i-lucide-monitor'
order: 1
featured: true
draft: false
stack: ['Nuxt', 'Astro', 'Next', 'TypeScript', 'Stripe', 'Cloudflare']
deliverables:
  - 'Arquitectura de informació i rutes'
  - 'Implementació en Nuxt, Astro o Next'
  - 'Catàleg, checkout i pagaments amb Stripe'
  - 'i18n ES/CA/EN i SEO tècnic'
  - 'Desplegament i CI a Cloudflare o Vercel'
---

## Quin problema resol

Un web lent o un catàleg que s'edita a mà costa vendes cada dia. També costa temps: cada canvi passa per algú que "sap tocar" la botiga.

Construeixo llocs i botigues on el contingut i el catàleg tenen un model clar, el rendiment forma part del disseny i el desplegament no depèn d'una màquina local.

## Com ho abordo

- **Contingut primer**: rutes, col·leccions i metadades abans de triar components.
- **Rendiment com a requisit**: pressupost de càrrega, imatges optimitzades i HTML estàtic quan el cas ho permet.
- **Checkout sense sorpreses**: preus i quantitats es validen al servidor, mai al client.
- **SEO tècnic**: canonical, `hreflang`, sitemap i dades estructurades des del primer desplegament.

## Casos reals

### Empresa Plana — web pública i panell intern sobre un sol model de dades

Empresa Plana necessitava publicar en castellà i català i, alhora, que el seu equip pogués editar el contingut sense dependre de desenvolupament. En lloc de dues aplicacions amb dues bases de dades, la web i el panell comparteixen un únic esquema.

- **Implementació**: web pública en Astro, panell privat sobre Prisma i InsForge i desplegament estàtic a Cloudflare.
- **Què resol**: l'equip publica des del panell; la web llegeix i serveix HTML estàtic, sense recompilar a mà.
- **Base tècnica**: rutes amb prefix d'idioma, `hreflang` consistent, canonical, sitemap i dades estructurades.

[Veure el cas complet ->](/projects/empresaplana)

### Exemple de botiga: catàleg limitat amb checkout validat al servidor

El patró que uso per a botigues de catàleg curt, com decoració, alimentació o artesania:

- Catàleg com a contingut tipat: producte, variants, preu, estoc i disponibilitat en un model explícit.
- Pàgines de producte estàtiques i regenerades quan canvia el catàleg.
- Checkout amb Stripe i validació de preu, estoc i enviament al servidor, mai al client.
- Panell per editar productes i disponibilitat sense tocar codi ni esperar un desplegament.

És un exemple d'arquitectura, no un client: l'abast real es defineix després del diagnòstic.

## Solucions que podem implementar

- **Web corporativa amb panell de contingut**: Astro o Nuxt amb un model de contingut tipat i edició sense desplegament.
- **Catàleg i botiga**: producte, variants, estoc i preus en un model clar, amb Stripe validat al servidor.
- **Migració des de WordPress o WooCommerce**: contingut, catàleg i redireccions per no perdre posicionament.
- **Multilingüe real**: rutes per idioma, `hreflang`, sitemap per locale i contingut traduïble.
- **Rendiment i SEO tècnic**: pressupost de càrrega, imatges optimitzades, HTML estàtic i dades estructurades.
- **Integracions**: ERP, CRM, enviaments, facturació i pagaments connectats amb contractes explícits.

## Disseny i marca, en equip

Quan el projecte necessita identitat visual, direcció d'art o UX més enllà de la implementació, treballo amb **Bella Romeu** a [Daath Design Studio](https://daathdesign.com/#capabilities). Ella lidera la part de marca i disseny; jo m'encarrego que arribi a producció sense perdre intenció: components, tokens, accessibilitat i rendiment.

Si el projecte és només d'identitat o comunicació, també el puc derivar directament a l'estudi.

## Per a qui no és

No és per a qui busca una plantilla tancada amb quaranta connectors. Si el negoci cap en una pàgina de producte i un formulari, hi ha opcions més barates que un desenvolupament a mida.
