/**
 * Client-side adapter of the repository ports over HTTP.
 *
 * The browser never touches Prisma; it talks to /api/data/* on the same
 * origin. The use-cases and repositories run server-side.
 * Imported by stores.ts (replaces the old insforge-data.ts).
 */
import type { InventoryItem, Order, Customer } from '@/domain/warehouse/entities';
import type {
  InventoryItemInput,
  OrderInput,
  CustomerInput,
} from '@/domain/warehouse/ports/repositories';

async function http<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let payload: { error?: string; data?: T } = {};
  try {
    payload = await res.json();
  } catch {
    // non-JSON response body
  }
  if (!res.ok) throw new Error(payload.error ?? `HTTP ${res.status}`);
  return payload.data as T;
}

// ============================================================
// INVENTORY
// ============================================================

export async function fetchInventory(): Promise<InventoryItem[]> {
  return http<InventoryItem[]>('GET', '/api/data/inventory');
}

export async function insertInventory(data: InventoryItemInput): Promise<InventoryItem> {
  return http<InventoryItem>('POST', '/api/data/inventory', data);
}

export async function updateInventory(
  id: string,
  patch: Partial<InventoryItem>
): Promise<void> {
  await http('PUT', '/api/data/inventory', { id, patch });
}

export async function deleteInventory(id: string): Promise<void> {
  await http('DELETE', '/api/data/inventory', { id });
}

// ============================================================
// ORDERS
// ============================================================

export async function fetchOrders(): Promise<Order[]> {
  return http<Order[]>('GET', '/api/data/orders');
}

export async function insertOrder(data: OrderInput): Promise<Order> {
  return http<Order>('POST', '/api/data/orders', data);
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<void> {
  await http('PUT', '/api/data/orders', { id, patch });
}

export async function deleteOrder(id: string): Promise<void> {
  await http('DELETE', '/api/data/orders', { id });
}

// ============================================================
// CUSTOMERS
// ============================================================

export async function fetchCustomers(): Promise<Customer[]> {
  return http<Customer[]>('GET', '/api/data/customers');
}

export async function insertCustomer(data: CustomerInput): Promise<Customer> {
  return http<Customer>('POST', '/api/data/customers', data);
}

export async function updateCustomer(id: string, patch: Partial<Customer>): Promise<void> {
  await http('PUT', '/api/data/customers', { id, patch });
}

export async function deleteCustomer(id: string): Promise<void> {
  await http('DELETE', '/api/data/customers', { id });
}
