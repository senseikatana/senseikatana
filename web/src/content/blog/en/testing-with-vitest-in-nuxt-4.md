---
title: Testing with Vitest in Nuxt 4
description: A complete guide to writing unit and integration tests in Nuxt 4 projects using Vitest.
date: '2025-08-15'
tags: ['testing', 'vitest', 'nuxt', 'typescript']
author: Sergio Jurado Casado
published: true
---

# Testing with Vitest in Nuxt 4

Testing is not optional, it is a necessity. In this post I will show how to configure and write effective tests in a Nuxt 4 project using Vitest.

## Why Vitest?

Vitest is the recommended testing framework for Vite/Nuxt projects:

- **Speed**: Runs tests in milliseconds using the Vite transformer
- **Jest-compatible**: Same API, direct migration
- **Native TypeScript**: No extra configuration
- **Built-in coverage**: With c8 or istanbul

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

## Testing composables

```typescript
// composables/__tests__/useSlugify.test.ts
import { describe, it, expect } from 'vitest';
import { useSlugify } from 'katanakit-js';

describe('useSlugify', () => {
  it('converts text to a slug', () => {
    expect(useSlugify('Hello World')).toBe('hello-world');
  });

  it('handles special characters', () => {
    expect(useSlugify('Nuxt 4 from Scratch')).toBe('nuxt-4-from-scratch');
  });
});
```

## Testing Pinia stores

```typescript
// stores/__tests__/cart.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '../cart';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('adds items to the cart', () => {
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

  it('calculates the total correctly', () => {
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

## Testing components

```typescript
// components/__tests__/CartSlideover.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CartSlideover from '../CartSlideover.vue';

describe('CartSlideover', () => {
  it('renders the empty cart message', () => {
    const wrapper = mount(CartSlideover);
    expect(wrapper.text()).toContain('Your cart is empty');
  });
});
```

## Running tests

```bash
bun run test          # Run all tests
bun run test --watch  # Watch mode
bun run test --coverage  # With coverage
```

## Tips

1. **Test behaviour, not implementation**: Do not test private methods
2. **Use factories**: Create factories for repetitive test data
3. **Mock the outside**: Mock external APIs and databases
4. **Fast tests**: If a test takes more than a second, review it

## Conclusion

Testing is an investment that pays off with every code change. Start with the critical tests (stores, composables, business logic) and expand from there.

In the next post I will cover deploying Nuxt 4 to production.
