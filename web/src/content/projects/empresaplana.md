---
title: 'Empresa Plana'
description: 'Web pública y panel interno sobre un mismo modelo de datos: el equipo publica, la web sirve estático.'
client: 'Empresa Plana'
sector: 'Transporte y logística'
year: '2026'
liveUrl: 'https://empresaplana.cat'
repoUrl: 'https://github.com/senseikatana/empresaplana.cat'
role: 'Diseño técnico e implementación full-stack'
stack: ['Astro', 'TypeScript', 'Prisma', 'InsForge', 'Cloudflare', 'Tailwind']
challenge: 'La web pública y la gestión interna vivían en dos mundos: contenido duplicado, cambios a mano y ninguna fuente única de verdad.'
solution: 'Sitio Astro con i18n ES/CA y un panel privado sobre el mismo modelo de datos (Prisma + InsForge). Autenticación, gestión de contenido y despliegue en Cloudflare.'
outcome: 'Un solo modelo para web y back-office: el equipo publica desde el panel y la web sirve contenido estático, sin recompilar a mano.'
featured: true
order: 1
draft: false
---

## Contexto

Empresa Plana necesitaba una web corporativa con contenido en catalán y castellano, y a la vez una herramienta interna para que el equipo pudiera editar ese contenido sin depender de desarrollo.

## Decisión

En lugar de dos aplicaciones con dos bases de datos, el proyecto usa un único esquema de Prisma. El panel escribe; la web lee y genera estático. Los idiomas son rutas, no copias del contenido.

## Detalles técnicos

- Rutas con prefijo de idioma y `hreflang` consistente.
- Autenticación y sesiones en el servidor, no en el cliente.
- Migraciones versionadas y seeds reproducibles.
- Deploy en Cloudflare con build estático.

## Qué aprendí

El panel y la web comparten más de lo que parece. Cuando el modelo de datos es el mismo, la mitad de los bugs de sincronización desaparecen antes de existir.
