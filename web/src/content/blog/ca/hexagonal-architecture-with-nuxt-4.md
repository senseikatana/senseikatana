---
title: Arquitectura hexagonal amb Nuxt 4
description: Com aplicar els principis de Clean Architecture i Hexagonal Architecture en un projecte Nuxt 4 real.
date: '2025-09-01'
tags: ['arquitectura', 'nuxt', 'clean-architecture', 'typescript']
author: Sergio Jurado Casado
published: true
---

# Arquitectura hexagonal amb Nuxt 4

L'arquitectura hexagonal (també coneguda com "Ports and Adapters") és un patró que separa la lògica de negoci de la infraestructura. En aquest post mostraré com aplicar aquests principis en un projecte Nuxt 4.

## El problema

Quan construïm aplicacions web, és habitual acoblar la lògica de negoci directament al framework. Això fa que el codi sigui difícil de testejar, mantenir i evolucionar.

```typescript
// Anti-patró: lògica acoblada al component
const { data } = await useFetch('/api/products');
const filtered = data.value.filter((p) => p.price > 100);
```

## La solució

L'arquitectura hexagonal proposa tres capes:

1. **Domini**: Entitats i regles de negoci pures
2. **Aplicació**: Casos d'ús que orquestren el domini
3. **Infraestructura**: Framework, base de dades, APIs externes

### Estructura a Nuxt 4

```
src/
├── domain/
│   ├── entities/
│   │   └── Product.ts
│   └── repositories/
│       └── ProductRepository.ts
├── application/
│   └── use-cases/
│       └── GetFeaturedProducts.ts
└── infrastructure/
    ├── repositories/
    │   └── PrismaProductRepository.ts
    └── server/
        └── api/
            └── products/
                └── index.get.ts
```

### Entitat del domini

```typescript
// domain/entities/Product.ts
export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly featured: boolean = false,
  ) {}

  isExpensive(): boolean {
    return this.price > 100;
  }
}
```

### Port (interfície del repositori)

```typescript
// domain/repositories/ProductRepository.ts
export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findFeatured(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
```

### Cas d'ús

```typescript
// application/use-cases/GetFeaturedProducts.ts
export class GetFeaturedProducts {
  constructor(private repository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.findFeatured();
  }
}
```

### Adaptador (implementació)

```typescript
// infrastructure/repositories/PrismaProductRepository.ts
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findFeatured(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { featured: true },
    });
    return products.map((p) => new Product(p.id, p.name, p.price, p.featured));
  }
}
```

## Beneficis

- **Testable**: Pots mockejar el repositori fàcilment
- **Independent del framework**: La lògica de negoci no depèn de Nuxt
- **Flexible**: Canviar de base de dades és només canviar l'adaptador
- **Mantenible**: Cada capa té una responsabilitat clara

## Conclusió

No necessites aplicar arquitectura hexagonal a tot. Comença pels mòduls crítics i ves expandint. La clau és separar la lògica de negoci de la infraestructura.

Al proper post cobriré com testejar aquesta arquitectura amb Vitest.
