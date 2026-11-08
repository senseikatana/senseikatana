---
title: 'Integrations and automation'
description: 'APIs, webhooks and jobs that connect what you already use, so data stops being copied by hand.'
icon: 'i-lucide-plug-zap'
order: 3
featured: true
draft: false
stack: ['TypeScript', 'Python', 'REST', 'Webhooks', 'Docker']
deliverables:
  - 'API design and contracts'
  - 'Idempotent webhooks'
  - 'Synchronisation with Stripe, InsForge or ERPs'
  - 'Migration and backup scripts'
  - 'Retries and observability'
---

## What problem it solves

Information moves by hand between the store, the ERP, the payment gateway and the bank. Every manual copy is a chance to lose a record.

I design integrations that do that work once and well: explicit contracts, safe retries and a log that lets you reconstruct what happened.

## How I approach it

- **Idempotency first**: retrying cannot duplicate a sale or a payment.
- **Versioned contracts**: client and server agree on the shape of the data before writing it.
- **Visible failures**: if something fails, it is known and retried; it does not disappear into an empty `catch`.
- **Automation with judgement**: what needs human judgement is reviewed; the repetitive is automated.

## Who it is not for

It is not for connecting two services of the same suite with an official, already-tested connector. There, custom integration adds risk without value.
