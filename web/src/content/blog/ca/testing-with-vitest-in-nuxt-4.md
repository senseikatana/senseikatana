---
title: Testing amb Vitest a Nuxt 4
description: Guia completa per escriure tests unitaris i d'integració en projectes Nuxt 4 fent servir Vitest.
date: '2025-08-15'
tags: ['testing', 'vitest', 'nuxt', 'typescript']
author: Sergio Jurado Casado
published: true
---

# Testing amb Vitest a Nuxt 4

El testing no és opcional, és una necessitat. En aquest post mostraré com configurar i escriure tests efectius en un projecte Nuxt 4 fent servir Vitest.

## Per què Vitest?

Vitest és el framework de testing recomanat per a projectes Vite/Nuxt:

- **Velocitat**: Executa tests en mil·lisegons usant el transformador de Vite
- **Compatible amb Jest**: Mateixa API, migració directa
- **TypeScript natiu**: Sense configuració extra
- **Coverage integrat**: Amb c8 o istanbul

## Setup

```bash
bun add -D vitest @vue/test-utils happy-dom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
});
```

## Testejant composables

```typescript
// composables/__tests__/useSlugify.test.ts
import { describe, it, expect } from 'vitest';
import { useSlugify } from 'katanakit-js';

describe('useSlugify', () => {
  it('converteix text a slug', () => {
    expect(useSlugify('Hola Món')).toBe('hola-mon');
  });

  it('gestiona caràcters especials', () => {
    expect(useSlugify('Nuxt 4 des de zero')).toBe('nuxt-4-des-de-zero');
  });
});
```

## Testejant stores de Pinia

```typescript
// stores/__tests__/cart.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '../cart';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('afegeix items al carret', () => {
    const cart = useCartStore();
    const product = {
      slug: 'test',
      name: 'Test',
      price: 10,
      id: '1',
      currency: 'USD',
      image: '',
      category: '',
      stripePriceId: '',
      featured: false,
    };

    cart.addItem(product);

    expect(cart.items).toHaveLength(1);
    expect(cart.totalItems).toBe(1);
  });

  it('calcula el total correctament', () => {
    const cart = useCartStore();

    cart.addItem({
      slug: 'a',
      name: 'A',
      price: 10,
      id: '1',
      currency: 'USD',
      image: '',
      category: '',
      stripePriceId: '',
      featured: false,
    });
    cart.addItem({
      slug: 'b',
      name: 'B',
      price: 20,
      id: '2',
      currency: 'USD',
      image: '',
      category: '',
      stripePriceId: '',
      featured: false,
    });

    expect(cart.totalPrice).toBe(30);
  });
});
```

## Testejant components

```typescript
// components/__tests__/CartSlideover.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CartSlideover from '../CartSlideover.vue';

describe('CartSlideover', () => {
  it('mostra el missatge de carret buit', () => {
    const wrapper = mount(CartSlideover);
    expect(wrapper.text()).toContain('Your cart is empty');
  });
});
```

## Executar tests

```bash
bun run test          # Executar tots els tests
bun run test --watch  # Mode watch
bun run test --coverage  # Amb coverage
```

## Consells

1. **Testeja comportament, no implementació**: No testegis mètodes privats
2. **Usa factories**: Crea factories per a dades de test repetitives
3. **Mockeja l'exterior**: Mockeja APIs externes i bases de dades
4. **Tests ràpids**: Si un test tarda més d'un segon, revisa'l

## Conclusió

El testing és una inversió que es paga amb cada canvi de codi. Comença pels tests crítics (stores, composables, lògica de negoci) i ves expandint.

Al proper post cobriré el desplegament de Nuxt 4 en producció.
