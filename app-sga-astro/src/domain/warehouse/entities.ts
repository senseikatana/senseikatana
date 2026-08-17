/**
 * Domain entities — the ubiquitous language of the warehouse.
 * Innermost layer: no imports from lib/, infrastructure or UI.
 */

export const INVENTORY_TYPES = [
  'Espárragos',
  'Tuercas',
  'Tornillos sin fin',
  'Juntas',
  'Cajas/Embalaje',
] as const;
export type InventoryType = (typeof INVENTORY_TYPES)[number];

export const ORDER_STATUSES = ['paid', 'pending', 'refunded'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const CUSTOMER_PLANS = ['Team', 'Starter', 'Enterprise'] as const;
export type CustomerPlan = (typeof CUSTOMER_PLANS)[number];

export const CUSTOMER_STATUSES = ['active', 'trial', 'past-due'] as const;
export type CustomerStatus = (typeof CUSTOMER_STATUSES)[number];

export interface InventoryItem {
  id: string;
  /** NUT + 7 dígitos, e.g. NUT0004001 */
  nutcode: string;
  desc: string;
  type: InventoryType;
  stock: number;
  minStock: number;
  /** rack code, e.g. A-01-03 */
  loc: string;
}

export interface Order {
  id: string;
  /** e.g. #0001 */
  number: string;
  customer: string;
  status: OrderStatus;
  amount: number;
  date?: string | null;
}

export interface Customer {
  id: string;
  /** e.g. CLI00001 */
  code: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  plan: CustomerPlan;
  status: CustomerStatus;
}
