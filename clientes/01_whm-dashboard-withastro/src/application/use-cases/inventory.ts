import type { InventoryItem } from '@/domain/warehouse/entities';
import type { InventoryItemInput, InventoryRepository } from '@/domain/warehouse/ports/repositories';
import { NUTCode } from '@/domain/warehouse/value-objects';

/**
 * Inventory use-cases. All business rules for stock live here;
 * the repository is a pure persistence port (DIP).
 */
export class InventoryUseCases {
  constructor(private readonly repo: InventoryRepository) {}

  async list(): Promise<InventoryItem[]> {
    return this.repo.list();
  }

  async getByNUT(nutcode: string): Promise<InventoryItem | null> {
    NUTCode.parse(nutcode);
    return this.repo.findByNutcode(nutcode);
  }

  async create(data: InventoryItemInput): Promise<InventoryItem> {
    return this.repo.create(data);
  }

  async update(id: string, patch: Partial<InventoryItem>): Promise<InventoryItem | null> {
    return this.repo.update(id, patch);
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(id);
  }

  /** Stock can never go negative; returns false when impossible. */
  async deductStock(nutcode: string, qty: number): Promise<boolean> {
    NUTCode.parse(nutcode);
    if (!Number.isInteger(qty) || qty <= 0) return false;
    const item = await this.repo.findByNutcode(nutcode);
    if (!item || item.stock < qty) return false;
    await this.repo.save({ ...item, stock: item.stock - qty });
    return true;
  }
}
