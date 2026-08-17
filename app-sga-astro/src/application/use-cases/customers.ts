import type { Customer } from '@/domain/warehouse/entities';
import type { CustomerInput, CustomerRepository } from '@/domain/warehouse/ports/repositories';

export class CustomerUseCases {
  constructor(private readonly repo: CustomerRepository) {}

  async list(): Promise<Customer[]> {
    return this.repo.list();
  }

  async create(data: CustomerInput): Promise<Customer> {
    return this.repo.create(data);
  }

  async update(id: string, patch: Partial<Customer>): Promise<Customer | null> {
    return this.repo.update(id, patch);
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(id);
  }
}
