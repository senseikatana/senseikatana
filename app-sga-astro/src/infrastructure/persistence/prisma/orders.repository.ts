import type { Order } from '@/domain/warehouse/entities';
import type { OrderInput, OrderRepository } from '@/domain/warehouse/ports/repositories';
import { prisma } from './client';

function toEntity(row: {
  id: string;
  number: string;
  customer: string;
  status: string;
  amount: number;
  date: Date | null;
}): Order {
  return {
    id: row.id,
    number: row.number,
    customer: row.customer,
    status: row.status as Order['status'],
    amount: row.amount,
    date: row.date?.toISOString() ?? null,
  };
}

/** Next sequential order number based on the highest existing one. */
function nextNumber(existing: string[]): string {
  let max = 0;
  for (const number of existing) {
    const num = Number.parseInt(number.replace('#', ''), 10);
    if (!Number.isNaN(num) && num > max) max = num;
  }
  return `#${String(max + 1).padStart(4, '0')}`;
}

export class PrismaOrderRepository implements OrderRepository {
  async list(): Promise<Order[]> {
    const rows = await prisma.order.findMany({ orderBy: { date: 'desc' } });
    return rows.map(toEntity);
  }

  async create(data: OrderInput): Promise<Order> {
    const existing = await prisma.order.findMany({ select: { number: true } });
    const number = nextNumber(existing.map((r) => r.number));
    const row = await prisma.order.create({
      data: {
        ...data,
        number,
        date: data.date ? new Date(data.date) : null,
      },
    });
    return toEntity(row);
  }

  async update(id: string, patch: Partial<Order>): Promise<Order | null> {
    try {
      const { date, ...rest } = patch;
      const row = await prisma.order.update({
        where: { id },
        data: { ...rest, date: date ? new Date(date) : undefined },
      });
      return toEntity(row);
    } catch {
      return null;
    }
  }

  async remove(id: string): Promise<void> {
    await prisma.order.delete({ where: { id } });
  }
}
