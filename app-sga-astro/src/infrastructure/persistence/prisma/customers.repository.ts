import type { Customer } from '@/domain/warehouse/entities';
import type { CustomerInput, CustomerRepository } from '@/domain/warehouse/ports/repositories';
import { prisma } from './client';

function toEntity(row: {
  id: string;
  code: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  plan: string;
  status: string;
}): Customer {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    email: row.email,
    company: row.company,
    phone: row.phone,
    plan: row.plan as Customer['plan'],
    status: row.status as Customer['status'],
  };
}

/** Next sequential customer code based on the highest existing one. */
function nextCode(existing: string[]): string {
  let max = 0;
  for (const code of existing) {
    const num = Number.parseInt(code.replace('CLI', ''), 10);
    if (!Number.isNaN(num) && num > max) max = num;
  }
  return `CLI${String(max + 1).padStart(5, '0')}`;
}

export class PrismaCustomerRepository implements CustomerRepository {
  async list(): Promise<Customer[]> {
    const rows = await prisma.customer.findMany({ orderBy: { name: 'asc' } });
    return rows.map(toEntity);
  }

  async create(data: CustomerInput): Promise<Customer> {
    const existing = await prisma.customer.findMany({ select: { code: true } });
    const code = nextCode(existing.map((r) => r.code));
    const row = await prisma.customer.create({ data: { ...data, code } });
    return toEntity(row);
  }

  async update(id: string, patch: Partial<Customer>): Promise<Customer | null> {
    try {
      const row = await prisma.customer.update({ where: { id }, data: patch });
      return toEntity(row);
    } catch {
      return null;
    }
  }

  async remove(id: string): Promise<void> {
    await prisma.customer.delete({ where: { id } });
  }
}
