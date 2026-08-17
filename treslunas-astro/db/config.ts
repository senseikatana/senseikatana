import { defineDb, defineTable, column } from 'astro:db';

const Category = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    slug: column.text({ unique: true }),
  }
});

const Product = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    categoryId: column.text({ references: () => Category.columns.id }),
    title: column.text(),
    slug: column.text({ unique: true }),
    description: column.text({ optional: true }),
    price: column.number(),
    images: column.json(), // Array de URLs de imágenes
    isActive: column.boolean({ default: true }),
    isFeatured: column.boolean({ default: false }),
    createdAt: column.date({ default: new Date() }),
  }
});

const ProductVariant = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    productId: column.text({ references: () => Product.columns.id }),
    size: column.text(),      // XS, S, M, L, XL
    color: column.text(),
    stockOnline: column.number({ default: 0 }),
    stockPhysical: column.number({ default: 0 }), // Stock físico en Cambrils
    sku: column.text({ unique: true }),
  }
});

export default defineDb({
  tables: { Category, Product, ProductVariant }
});
