/**
 * Server-side warehouse snapshot built from the source of truth (Prisma/Neon).
 *
 * JARVIS and the WhatsApp webhook use this to answer 24/7, regardless of
 * whether any browser has the app open. Replaces the legacy warehouse.json
 * file that depended on clients pushing their data via /api/sync-data.
 */
import type { WarehouseSnapshot } from '@/domain/ai/ports';
import { PrismaInventoryRepository } from './prisma/inventory.repository';
import { PrismaOrderRepository } from './prisma/orders.repository';
import { PrismaCustomerRepository } from './prisma/customers.repository';

const inventoryRepo = new PrismaInventoryRepository();
const orderRepo = new PrismaOrderRepository();
const customerRepo = new PrismaCustomerRepository();

export async function loadWarehouseSnapshot(): Promise<WarehouseSnapshot> {
  const [inventory, orders, customers] = await Promise.all([
    inventoryRepo.list(),
    orderRepo.list(),
    customerRepo.list(),
  ]);
  return {
    inventory,
    orders,
    customers,
    updatedAt: new Date().toISOString(),
  };
}
