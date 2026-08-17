import type { InventoryItem, Order, Customer } from '../entities';

export type InventoryItemInput = Omit<InventoryItem, 'id' | 'nutcode' | 'minStock'> & {
  minStock?: number;
};
export type OrderInput = Omit<Order, 'id' | 'number'>;
export type CustomerInput = Omit<Customer, 'id' | 'code'>;

export interface InventoryRepository {
  list(): Promise<InventoryItem[]>;
  findById(id: string): Promise<InventoryItem | null>;
  findByNutcode(nutcode: string): Promise<InventoryItem | null>;
  create(data: InventoryItemInput): Promise<InventoryItem>;
  update(id: string, patch: Partial<InventoryItem>): Promise<InventoryItem | null>;
  remove(id: string): Promise<void>;
  /** Full-write used by transactional use-cases (e.g. deductStock). */
  save(item: InventoryItem): Promise<InventoryItem>;
}

export interface OrderRepository {
  list(): Promise<Order[]>;
  create(data: OrderInput): Promise<Order>;
  update(id: string, patch: Partial<Order>): Promise<Order | null>;
  remove(id: string): Promise<void>;
}

export interface CustomerRepository {
  list(): Promise<Customer[]>;
  create(data: CustomerInput): Promise<Customer>;
  update(id: string, patch: Partial<Customer>): Promise<Customer | null>;
  remove(id: string): Promise<void>;
}
