---
title: Arquitectura Hexagonal con Nuxt 4
description: Como aplicar los principios de Clean Architecture y Hexagonal Architecture en un proyecto Nuxt 4 real.
date: '2025-09-01'
tags: ['arquitectura', 'nuxt', 'clean-architecture', 'typescript']
author: Sergio Esteban
published: true
---

# Arquitectura Hexagonal con Nuxt 4

La arquitectura hexagonal (tambien conocida como "Ports and Adapters") es un patron que separa la logica de negocio de la infraestructura. En este post, voy a mostrar como aplicar estos principios en un proyecto Nuxt 4.

## El problema

Cuando construimos aplicaciones web, es comun acoplar la logica de negocio directamente al framework. Esto hace que el codigo sea dificil de testear, mantener y evolucionar.

```typescript
// Anti-patron: logica acoplada al componente
const { data } = await useFetch('/api/products')
const filtered = data.value.filter(p => p.price > 100)
```

## La solucion

La arquitectura hexagonal propone tres capas:

1. **Dominio**: Entidades y reglas de negocio puras
2. **Aplicacion**: Casos de uso que orquestan el dominio
3. **Infraestructura**: Framework, base de datos, APIs externas

### Estructura en Nuxt 4

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

### Entidad del dominio

```typescript
// domain/entities/Product.ts
export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly featured: boolean = false
  ) {}

  isExpensive(): boolean {
    return this.price > 100
  }
}
```

### Puerto (interfaz del repositorio)

```typescript
// domain/repositories/ProductRepository.ts
export interface ProductRepository {
  findAll(): Promise<Product[]>
  findFeatured(): Promise<Product[]>
  findById(id: string): Promise<Product | null>
}
```

### Caso de uso

```typescript
// application/use-cases/GetFeaturedProducts.ts
export class GetFeaturedProducts {
  constructor(private repository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.findFeatured()
  }
}
```

### Adaptador (implementacion)

```typescript
// infrastructure/repositories/PrismaProductRepository.ts
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findFeatured(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { featured: true }
    })
    return products.map(p => new Product(p.id, p.name, p.price, p.featured))
  }
}
```

## Beneficios

- **Testable**: Podes mockear el repositorio facilmente
- **Independiente del framework**: La logica de negocio no depende de Nuxt
- **Flexible**: Cambiar de base de datos es solo cambiar el adaptador
- **Maintenable**: Cada capa tiene una responsabilidad clara

## Conclusión

No necesitas aplicar arquitectura hexagonal en todo. Empeza con los modulos criticos y ve expandiendo. La clave es separar la logica de negocio de la infraestructura.

En el proximo post voy a cubrir como testear esta arquitectura con Vitest.
