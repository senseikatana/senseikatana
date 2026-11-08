---
title: 'Integraciones y automatización'
description: 'APIs, webhooks y jobs que conectan lo que ya usas, para que los datos dejen de copiarse a mano.'
icon: 'i-lucide-plug-zap'
order: 3
featured: true
draft: false
stack: ['TypeScript', 'Python', 'REST', 'Webhooks', 'Docker']
deliverables:
  - 'Diseño de API y contratos'
  - 'Webhooks idempotentes'
  - 'Sincronización con Stripe, InsForge o ERPs'
  - 'Scripts de migración y respaldo'
  - 'Reintentos y observabilidad'
---

## Qué problema resuelve

La información se mueve a mano entre la tienda, el ERP, la pasarela de pago y el banco. Cada copia manual es una oportunidad de perder un dato.

Diseño integraciones que hacen ese trabajo una sola vez y bien: contratos explícitos, reintentos seguros y un log que permite reconstruir qué pasó.

## Cómo lo abordo

- **Idempotencia primero**: reintentar no puede duplicar una venta ni un pago.
- **Contratos versionados**: el cliente y el servidor acuerdan la forma del dato antes de escribirlo.
- **Fallos visibles**: si algo falla, se sabe y se reintenta; no se pierde en un `catch` vacío.
- **Automatización con criterio**: lo que requiere juicio humano se revisa; lo repetitivo se automatiza.

## Para quién no es

No es para conectar dos servicios de la misma suite con un conector oficial ya probado. Ahí la integración a medida agrega riesgo sin valor.
