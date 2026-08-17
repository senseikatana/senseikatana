import type { InventoryItem, Order, Customer } from './schemas';

let _nutCounter = 0;
let _orderCounter = 0;
let _cliCounter = 0;

export function resetCounters(): void {
  _nutCounter = 0;
  _orderCounter = 0;
  _cliCounter = 0;
}

function seedCounter(existing: string[], prefix: string, digits: number): number {
  let max = 0;
  for (const code of existing) {
    const num = parseInt(code.replace(prefix, ''), 10);
    if (!isNaN(num) && num > max) max = num;
  }
  return max;
}

export function initCounters(items: InventoryItem[], orders: Order[], customers: Customer[]): void {
  _nutCounter = seedCounter(items.map(i => i.nutcode), 'NUT', 7);
  _orderCounter = seedCounter(orders.map(o => o.number), '#', 4);
  _cliCounter = seedCounter(customers.map(c => c.code), 'CLI', 5);
}

export function generateNUTCode(): string {
  _nutCounter++;
  return `NUT${String(_nutCounter).padStart(7, '0')}`;
}

export function generateOrderNumber(): string {
  _orderCounter++;
  return `#${String(_orderCounter).padStart(4, '0')}`;
}

export function generateCustomerCode(): string {
  _cliCounter++;
  return `CLI${String(_cliCounter).padStart(5, '0')}`;
}

let _idCounter = 0;
export function generateId(): string {
  _idCounter++;
  return `id_${Date.now()}_${_idCounter}`;
}
