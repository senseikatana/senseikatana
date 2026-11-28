---
title: 'Web y e-commerce'
description: 'Sitios y tiendas que cargan rápido, se indexan bien y no dependen de un plugin para funcionar.'
icon: 'i-lucide-monitor'
order: 1
featured: true
draft: false
stack: ['Nuxt', 'Astro', 'Next', 'TypeScript', 'Stripe', 'Cloudflare']
deliverables:
  - 'Arquitectura de información y rutas'
  - 'Implementación en Nuxt, Astro o Next'
  - 'Catálogo, checkout y pagos con Stripe'
  - 'i18n ES/CA/EN y SEO técnico'
  - 'Deploy y CI en Cloudflare o Vercel'
---

## Qué problema resuelve

Una web lenta o un catálogo que se edita a mano cuesta ventas todos los días. También cuesta tiempo: cada cambio pasa por alguien que "sabe tocar" la tienda.

Construyo sitios y tiendas donde el contenido y el catálogo tienen un modelo claro, el rendimiento es parte del diseño y el deploy no depende de una máquina local.

## Cómo lo abordo

- **Contenido primero**: rutas, colecciones y metadatos antes de elegir componentes.
- **Rendimiento como requisito**: presupuesto de carga, imágenes optimizadas y HTML estático cuando el caso lo permite.
- **Checkout sin sorpresas**: precios y cantidades se validan en el servidor, nunca en el cliente.
- **SEO técnico**: canonical, `hreflang`, sitemap y datos estructurados desde el primer deploy.

## Casos reales

### Empresa Plana — web pública y panel interno sobre un solo modelo de datos

Empresa Plana necesitaba publicar en castellano y catalán y, a la vez, que su equipo pudiera editar el contenido sin depender de desarrollo. En lugar de dos aplicaciones con dos bases de datos, la web y el panel comparten un único esquema.

- **Implementación**: web pública en Astro, panel privado sobre Prisma e InsForge y deploy estático en Cloudflare.
- **Qué resuelve**: el equipo publica desde el panel; la web lee y sirve HTML estático, sin recompilar a mano.
- **Base técnica**: rutas con prefijo de idioma, `hreflang` consistente, canonical, sitemap y datos estructurados.

[Ver el caso completo ->](/works/empresaplana)

### Ejemplo de tienda: catálogo acotado con checkout validado en el servidor

El patrón que uso para tiendas de catálogo corto, como decoración, alimentación o artesanía:

- Catálogo como contenido tipado: producto, variantes, precio, stock y disponibilidad en un modelo explícito.
- Páginas de producto estáticas y regeneradas cuando cambia el catálogo.
- Checkout con Stripe y validación de precio, stock y envío en el servidor, nunca en el cliente.
- Panel para editar productos y disponibilidad sin tocar código ni esperar a un deploy.

Es un ejemplo de arquitectura, no un cliente: el alcance real se define después del diagnóstico.

## Soluciones que podemos implementar

- **Web corporativa con panel de contenido**: Astro o Nuxt con un modelo de contenido tipado y edición sin deploy.
- **Catálogo y tienda**: producto, variantes, stock y precios en un modelo claro, con Stripe validado en el servidor.
- **Migración desde WordPress o WooCommerce**: contenido, catálogo y redirecciones para no perder posicionamiento.
- **Multiidioma real**: rutas por idioma, `hreflang`, sitemap por locale y contenido traducible.
- **Rendimiento y SEO técnico**: presupuesto de carga, imágenes optimizadas, HTML estático y datos estructurados.
- **Integraciones**: ERP, CRM, envíos, facturación y pagos conectados con contratos explícitos.

## Diseño y marca, en equipo

Cuando el proyecto necesita identidad visual, dirección de arte o UX más allá de la implementación, trabajo con **Bella Romeu** en [Daath Design Studio](https://daathdesign.com/#capabilities). Ella lidera la parte de marca y diseño; yo me encargo de que eso llegue a producción sin perder intención: componentes, tokens, accesibilidad y rendimiento.

Si el proyecto es solo de identidad o comunicación, también puedo derivarlo directamente al estudio.

## Para quién no es

No es para quien busca una plantilla cerrada con cuarenta plugins. Si el negocio cabe en una página de producto y un formulario, hay opciones más baratas que un desarrollo a medida.
