/**
 * AI domain port — the assistant contract.
 * Innermost layer: no imports from lib/, infrastructure or UI.
 */
import type { Customer, InventoryItem, Order } from '@/domain/warehouse/entities';

export type AssistantProviderName = 'gemini' | 'openrouter' | 'local';

export interface WarehouseSnapshot {
  inventory: InventoryItem[];
  orders: Order[];
  customers: Customer[];
  updatedAt: string;
}

export interface AssistantRequest {
  question: string;
  data: WarehouseSnapshot;
  lang: string;
}

export interface AssistantProvider {
  readonly name: AssistantProviderName;
  readonly isConfigured: boolean;
  /** Throws when the provider cannot answer; the orchestrator falls back. */
  ask(request: AssistantRequest): Promise<string>;
}
