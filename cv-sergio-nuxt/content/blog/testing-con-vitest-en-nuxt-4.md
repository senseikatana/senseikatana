---
title: Testing con Vitest en Nuxt 4
description: Guia completa para escribir tests unitarios y de integracion en proyectos Nuxt 4 usando Vitest.
date: '2025-08-15'
tags: ['testing', 'vitest', 'nuxt', 'typescript']
author: Sergio Esteban
published: true
---

# Testing con Vitest en Nuxt 4

Testing no es opcional es una necesidad. En este post voy a mostrar como configurar y escribir tests efectivos en un proyecto Nuxt 4 usando Vitest.

## Por que Vitest?

Vitest es el framework de testing recomendado para proyectos Vite/Nuxt:

- **Velocidad**: Ejecuta tests en milisegundos usando el transformador de Vite
- **Compatible con Jest**: Misma API, migration directa
- **TypeScript nativo**: Sin configuracion extra
- **Coverage integrado**: Con c8 o istanbul

## Setup

```bash
bun add -D vitest @vue/test-utils happy-dom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
})
```

## Testeando composables

```typescript
// composables/__tests__/useSlugify.test.ts
import { describe, it, expect } from 'vitest'
import { useSlugify } from 'katanakit-js'

describe('useSlugify', () => {
  it('convierte texto a slug', () => {
    expect(useSlugify('Hola Mundo')).toBe('hola-mundo')
  })

  it('maneja caracteres especiales', () => {
    expect(useSlugify('Nuxt 4 desde Cero')).toBe('nuxt-4-desde-cero')
  })
})
```

## Testeando stores de Pinia

```typescript
// stores/__tests__/cart.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('agrega items al carrito', () => {
    const cart = useCartStore()
    const product = { slug: 'test', name: 'Test', price: 10, id: '1', currency: 'USD', image: '', category: '', stripePriceId: '', featured: false }
    
    cart.addItem(product)
    
    expect(cart.items).toHaveLength(1)
    expect(cart.totalItems).toBe(1)
  })

  it('calcula el total correctamente', () => {
    const cart = useCartStore()
    
    cart.addItem({ slug: 'a', name: 'A', price: 10, id: '1', currency: 'USD', image: '', category: '', stripePriceId: '', featured: false })
    cart.addItem({ slug: 'b', name: 'B', price: 20, id: '2', currency: 'USD', image: '', category: '', stripePriceId: '', featured: false })
    
    expect(cart.totalPrice).toBe(30)
  })
})
```

## Testeando componentes

```typescript
// components/__tests__/CartSlideover.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CartSlideover from '../CartSlideover.vue'

describe('CartSlideover', () => {
  it('renderiza mensaje de carrito vacio', () => {
    const wrapper = mount(CartSlideover)
    expect(wrapper.text()).toContain('Your cart is empty')
  })
})
```

## Ejecutar tests

```bash
bun run test          # Ejecutar todos los tests
bun run test --watch  # Modo watch
bun run test --coverage  # Con coverage
```

## Tips

1. **Testea comportamiento, no implementacion**: No testejes metodos privados
2. **Usa factories**: Crea factories para datos de test repetitivos
3. **Mockea el exterior**: Mockea APIs externas y base de datos
4. **Tests rapidos**: Si un test tarda mas de 1 segundo, revisalo

## Conclusión

Testing es una inversion que se paga con cada cambio de codigo. Empeza con los tests criticos (stores, composables, logica de negocio) y ve expandiendo.

En el proximo post voy a cubrir deployment de Nuxt 4 en produccion.
