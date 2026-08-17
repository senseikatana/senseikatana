import type { Order } from '@/domain/warehouse/entities';
import type { OrderInput, OrderRepository } from '@/domain/warehouse/ports/repositories';

export class OrderUseCases {
  constructor(private readonly repo: OrderRepository) {}

  async list(): Promise<Order[]> {
    return this.repo.list();
  }

  async create(data: OrderInput): Promise<Order> {
    return this.repo.create(data);
  }

  async update(id: string, patch: Partial<Order>): Promise<Order | null> {
    return this.repo.update(id, patch);
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(id);
  }
}
