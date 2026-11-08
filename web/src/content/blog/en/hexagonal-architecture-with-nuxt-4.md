---
title: Hexagonal Architecture with Nuxt 4
description: How to apply Clean Architecture and Hexagonal Architecture principles in a real Nuxt 4 project.
date: '2025-09-01'
tags: ['architecture', 'nuxt', 'clean-architecture', 'typescript']
author: Sergio Jurado Casado
published: true
---

# Hexagonal Architecture with Nuxt 4

Hexagonal architecture (also known as "Ports and Adapters") is a pattern that separates business logic from infrastructure. In this post I will show how to apply these principles in a Nuxt 4 project.

## The problem

When we build web applications, it is common to couple business logic directly to the framework. This makes the code hard to test, maintain and evolve.

```typescript
// Anti-pattern: logic coupled to the component
const { data } = await useFetch('/api/products');
const filtered = data.value.filter((p) => p.price > 100);
```

## The solution

Hexagonal architecture proposes three layers:

1. **Domain**: Pure entities and business rules
2. **Application**: Use cases that orchestrate the domain
3. **Infrastructure**: Framework, database, external APIs

### Structure in Nuxt 4

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

### Domain entity

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

### Port (repository interface)

```typescript
// domain/repositories/ProductRepository.ts
export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findFeatured(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
```

### Use case

```typescript
// application/use-cases/GetFeaturedProducts.ts
export class GetFeaturedProducts {
  constructor(private repository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.findFeatured();
  }
}
```

### Adapter (implementation)

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

## Benefits

- **Testable**: You can mock the repository easily
- **Framework-independent**: Business logic does not depend on Nuxt
- **Flexible**: Changing databases is just changing the adapter
- **Maintainable**: Each layer has a clear responsibility

## Conclusion

You do not need to apply hexagonal architecture everywhere. Start with the critical modules and expand from there. The key is separating business logic from infrastructure.

In the next post I will cover how to test this architecture with Vitest.
