import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// --- CATÁLOGO MAESTRO ---
export const products = sqliteTable('products', {
  nutCode: text('nut_code').primaryKey(), // Ej: NUT0004001
  description: text('description').notNull(), // Ej: ESPARRAGO+2 TUERCAS 1.3/4
  category: text('category', { enum: ['Tornillería', 'Juntas'] }).notNull(),
  subCategory: text('sub_category').notNull(), // Ej: Espárragos/Pernos, Metálicas
  brand: text('brand'), // Ej: ESINSA, novus (Flexitallic)
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// --- GESTIÓN DE CLIENTES ---
export const customers = sqliteTable('customers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  code: text('code').notNull().unique(), // Ej: CLT001
});

// --- PEDIDOS (RELACIONES N:N) ---
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nutCode: text('nut_code').notNull().references(() => products.nutCode),
  customerId: integer('customer_id').notNull().references(() => customers.id),
  quantity: integer('quantity').notNull(),
  destination: text('destination'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// --- UBICACIONES FÍSICAS (ESTANTERÍAS) ---
export const locations = sqliteTable('locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  rackCode: text('rack_code').notNull().unique(), // Ej: A-3-02-2
  nutCode: text('nut_code').notNull().references(() => products.nutCode), // Producto actual
  aisle: text('aisle').notNull(), // Ej: A, B, 1
  rackNumber: integer('rack_number').notNull(), // Ej: 3
  level: integer('level').notNull(), // ¡Rango validado de 0 a 6 en el backend!
  position: integer('position').notNull(), // Ej: 2
});

// --- TRAZABILIDAD DE INVENTARIO ---
export const inventoryLogs = sqliteTable('inventory_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nutCode: text('nut_code').notNull().references(() => products.nutCode),
  locationId: integer('location_id').references(() => locations.id), // Opcional (si el material se mueve)
  quantityChange: integer('quantity_change').notNull(), // Positivo = Entrada, Negativo = Salida
  reason: text('reason', { enum: ['RECEPTION', 'PICKING', 'TRANSFER', 'ADJUSTMENT'] }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});