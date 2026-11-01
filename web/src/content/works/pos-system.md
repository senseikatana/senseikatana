---
title: 'POS System'
description: 'Punto de venta configurable por dominio, con núcleo hexagonal y transacciones atómicas.'
sector: 'Retail / punto de venta'
year: '2026'
repoUrl: 'https://github.com/senseikatana/pos-system'
role: 'Arquitectura y desarrollo full-stack'
stack: ['Nuxt', 'Vue', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind']
challenge: 'Un punto de venta que sirviera igual para ferretería, retail y electrónica, sin forkear el código por cliente.'
solution: 'Núcleo de dominio agnóstico, puertos y adaptadores, Prisma con transacciones atómicas, RBAC y eventos de dominio. Escáner de código de barras y cuenta corriente.'
outcome: 'Un core configurable por metadatos de producto y unidades, con ventas, deuda de clientes y cierre de caja en la misma transacción.'
featured: true
order: 3
draft: false
---

## Contexto

Cada negocio llama distinto a lo mismo: unidad, kilo, caja, metro. Un POS cerrado obliga a duplicar el proyecto para cada rubro.

## Decisión

El dominio no sabe de Vue ni de Prisma. Los casos de uso orquestan puertos, y la infraestructura implementa esos puertos con Prisma. El cobro, el descuento de stock y la deuda del cliente ocurren en una transacción atómica.

## Detalles técnicos

- Arquitectura hexagonal con puertos y adaptadores.
- RBAC para administrador y cajero, verificado en el servidor.
- Eventos de dominio para venta completada y stock bajo.
- Estrategias de pago intercambiables: efectivo, tarjeta y cuenta corriente.

## Qué aprendí

La configurabilidad real no está en los formularios: está en el modelo. Si el producto puede describir sus unidades y metadatos, el POS no necesita un `if` por rubro.
