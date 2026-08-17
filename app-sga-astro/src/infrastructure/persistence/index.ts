import { InventoryUseCases } from '@/application/use-cases/inventory';
import { OrderUseCases } from '@/application/use-cases/orders';
import { CustomerUseCases } from '@/application/use-cases/customers';
import { PrismaInventoryRepository } from './prisma/inventory.repository';
import { PrismaOrderRepository } from './prisma/orders.repository';
import { PrismaCustomerRepository } from './prisma/customers.repository';

// Composition root: server-side adapters wired into the use-cases.
// Browser code must NOT import this module — it imports the HTTP adapter
// from './http/client-data' instead (see stores.ts).
export const inventoryUseCases = new InventoryUseCases(new PrismaInventoryRepository());
export const orderUseCases = new OrderUseCases(new PrismaOrderRepository());
export const customerUseCases = new CustomerUseCases(new PrismaCustomerRepository());
