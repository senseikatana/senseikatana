---
title: 'Integracions i automatització'
description: 'APIs, webhooks i jobs que connecten el que ja uses, perquè les dades deixin de copiar-se a mà.'
icon: 'i-lucide-plug-zap'
order: 3
featured: true
draft: false
stack: ['TypeScript', 'Python', 'REST', 'Webhooks', 'Docker']
deliverables:
  - "Disseny d'API i contractes"
  - 'Webhooks idempotents'
  - 'Sincronització amb Stripe, InsForge o ERPs'
  - 'Scripts de migració i còpia de seguretat'
  - 'Reintents i observabilitat'
---

## Quin problema resol

La informació es mou a mà entre la botiga, l'ERP, la passarel·la de pagament i el banc. Cada còpia manual és una oportunitat de perdre una dada.

Dissenyo integracions que fan aquesta feina una sola vegada i bé: contractes explícits, reintents segurs i un log que permet reconstruir què va passar.

## Com ho abordo

- **Idempotència primer**: reintentar no pot duplicar una venda ni un pagament.
- **Contractes versionats**: el client i el servidor acorden la forma de la dada abans d'escriure-la.
- **Fallades visibles**: si alguna cosa falla, se sap i es reintenta; no es perd en un `catch` buit.
- **Automatització amb criteri**: el que requereix judici humà es revisa; el repetitiu s'automatitza.

## Per a qui no és

No és per connectar dos serveis de la mateixa suite amb un connector oficial ja provat. Aquí la integració a mida afegeix risc sense valor.
