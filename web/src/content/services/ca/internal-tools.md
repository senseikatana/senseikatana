---
title: 'Eines internes'
description: 'Panells, ERP, WMS i POS que substitueixen fulls de càlcul paral·lels i processos que només entén una persona.'
icon: 'i-lucide-panels-top-left'
order: 2
featured: true
draft: false
stack: ['Nuxt', 'Vue', 'FastAPI', 'Prisma', 'PostgreSQL']
deliverables:
  - 'Model de dades i regles de negoci'
  - 'Rols i permisos (RBAC)'
  - 'Auditoria i traçabilitat de canvis'
  - 'Informes, tancaments i exportacions'
  - 'Migració de dades existents'
---

## Quin problema resol

Quan l'estoc viu en tres fulls de càlcul i el tancament de caixa es calcula a mà, el sistema real és la memòria d'una persona. Això no escala i no s'audita.

Construeixo eines internes per a magatzem, logística, retail i back-office: una sola font de veritat, permisos per rol i traçabilitat de qui ha fet què.

## Com ho abordo

- **Domini separat de la interfície**: les regles de negoci no viuen en un component.
- **Transaccions atòmiques**: una venda descompta estoc, registra deute i emet tiquet, o no passa res.
- **Rols explícits**: administrador i operador veuen coses diferents, i el servidor ho verifica.
- **Migració inclosa**: les dades que ja existeixen s'importen i es validen, no es demanen de nou.

## Per a qui no és

No és per a qui necessita un ERP estàndard instal·lat demà. Si un producte de mercat cobreix el 90% del procés, convé començar per aquí.
