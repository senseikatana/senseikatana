import type { InventoryItem } from '@/domain/warehouse/entities';
import type { InventoryItemInput, InventoryRepository } from '@/domain/warehouse/ports/repositories';
import { prisma } from './client';

function toEntity(row: {
  id: string;
  nutcode: string;
  desc: string;
  type: string;
  stock: number;
  minStock: number;
  loc: string;
}): InventoryItem {
  return {
    id: row.id,
    nutcode: row.nutcode,
    desc: row.desc,
    type: row.type as InventoryItem['type'],
    stock: row.stock,
    minStock: row.minStock,
    loc: row.loc,
  };
}

/** Next sequential NUT code based on the highest existing one. */
function nextNutcode(existing: string[]): string {
  let max = 0;
  for (const nutcode of existing) {
    const num = Number.parseInt(nutcode.replace('NUT', ''), 10);
    if (!Number.isNaN(num) && num > max) max = num;
  }
  return `NUT${String(max + 1).padStart(7, '0')}`;
}

export class PrismaInventoryRepository implements InventoryRepository {
  async list(): Promise<InventoryItem[]> {
    const rows = await prisma.inventoryItem.findMany({ orderBy: { nutcode: 'asc' } });
    return rows.map(toEntity);
  }

  async findById(id: string): Promise<InventoryItem | null> {
    const row = await prisma.inventoryItem.findUnique({ where: { id } });
    return row ? toEntity(row) : null;
  }

  async findByNutcode(nutcode: string): Promise<InventoryItem | null> {
    const row = await prisma.inventoryItem.findUnique({ where: { nutcode } });
    return row ? toEntity(row) : null;
  }

  async create(data: InventoryItemInput): Promise<InventoryItem> {
    const existing = await prisma.inventoryItem.findMany({ select: { nutcode: true } });
    const nutcode = nextNutcode(existing.map((r) => r.nutcode));
    const row = await prisma.inventoryItem.create({ data: { ...data, nutcode } });
    return toEntity(row);
  }

  async update(id: string, patch: Partial<InventoryItem>): Promise<InventoryItem | null> {
    try {
      const row = await prisma.inventoryItem.update({ where: { id }, data: patch });
      return toEntity(row);
    } catch {
      return null;
    }
  }

  async remove(id: string): Promise<void> {
    await prisma.inventoryItem.delete({ where: { id } });
  }

  async save(item: InventoryItem): Promise<InventoryItem> {
    const row = await prisma.inventoryItem.update({
      where: { id: item.id },
      data: { stock: item.stock },
    });
    return toEntity(row);
  }
}
