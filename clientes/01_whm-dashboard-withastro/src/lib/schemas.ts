import { z } from 'zod';

// ============================================================
// INVENTORY ITEM
// ============================================================
export const InventoryTypeEnum = z.enum([
  'Espárragos',
  'Tuercas',
  'Tornillos sin fin',
  'Juntas',
  'Cajas/Embalaje',
]);
export type InventoryType = z.infer<typeof InventoryTypeEnum>;

export const InventoryItemSchema = z.object({
  id: z.string(),
  nutcode: z.string().regex(/^NUT\d{7}$/, 'Formato: NUT seguido de 7 dígitos'),
  desc: z.string().min(1, 'La descripción es obligatoria'),
  type: InventoryTypeEnum,
  stock: z.number({ message: 'El stock debe ser un número' }).int().min(0, 'El stock no puede ser negativo'),
  loc: z.string().min(1, 'La ubicación es obligatoria'),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export const InventoryItemFormSchema = z.object({
  desc: z.string().min(1, 'La descripción es obligatoria'),
  type: InventoryTypeEnum,
  stock: z.coerce.number({ message: 'El stock debe ser un número' }).int().min(0, 'El stock no puede ser negativo'),
  loc: z.string().min(1, 'La ubicación es obligatoria'),
});
export type InventoryItemForm = z.infer<typeof InventoryItemFormSchema>;

// ============================================================
// ORDER
// ============================================================
export const OrderStatusEnum = z.enum(['paid', 'pending', 'refunded']);
export type OrderStatus = z.infer<typeof OrderStatusEnum>;

export const OrderSchema = z.object({
  id: z.string(),
  number: z.string().regex(/^#\d{4}$/, 'Formato: # seguido de 4 dígitos'),
  customer: z.string().min(1, 'El cliente es obligatorio'),
  status: OrderStatusEnum,
  amount: z.coerce.number({ message: 'El importe debe ser un número' }).min(0, 'El importe no puede ser negativo'),
});
export type Order = z.infer<typeof OrderSchema>;

export const OrderFormSchema = z.object({
  customer: z.string().min(1, 'El cliente es obligatorio'),
  status: OrderStatusEnum,
  amount: z.coerce.number({ message: 'El importe debe ser un número' }).min(0, 'El importe no puede ser negativo'),
});
export type OrderForm = z.infer<typeof OrderFormSchema>;

// ============================================================
// CUSTOMER
// ============================================================
export const CustomerPlanEnum = z.enum(['Team', 'Starter', 'Enterprise']);
export type CustomerPlan = z.infer<typeof CustomerPlanEnum>;

export const CustomerStatusEnum = z.enum(['active', 'trial', 'past-due']);
export type CustomerStatus = z.infer<typeof CustomerStatusEnum>;

export const CustomerSchema = z.object({
  id: z.string(),
  code: z.string().regex(/^CLI\d{5}$/, 'Formato: CLI seguido de 5 dígitos'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  plan: CustomerPlanEnum,
  status: CustomerStatusEnum,
});
export type Customer = z.infer<typeof CustomerSchema>;

export const CustomerFormSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  plan: CustomerPlanEnum,
  status: CustomerStatusEnum,
});
export type CustomerForm = z.infer<typeof CustomerFormSchema>;

// ============================================================
// Generic entity types for the CRUD system
// ============================================================
export type CrudEntity = InventoryItem | Order | Customer;
export type CrudFormData = InventoryItemForm | OrderForm | CustomerForm;
