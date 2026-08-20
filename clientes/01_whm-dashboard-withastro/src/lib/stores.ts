import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InventoryItem, Order, Customer } from './schemas';
import { generateNUTCode, generateOrderNumber, generateCustomerCode, generateId, initCounters } from './generator';
import {
  fetchInventory, insertInventory, updateInventory, deleteInventory,
  fetchOrders, insertOrder, updateOrder, deleteOrder,
  fetchCustomers, insertCustomer, updateCustomer, deleteCustomer,
} from '@/infrastructure/persistence/http/client-data';

const SEED_INVENTORY = [
  { id: 'INV001', nutcode: 'NUT0004001', desc: 'Junta espiral DN80 PN16', type: 'Juntas' as const, stock: 45, loc: 'A-01-03', minStock: 100 },
  { id: 'INV002', nutcode: 'NUT0004002', desc: 'Junta espiral DN100 PN16', type: 'Juntas' as const, stock: 120, loc: 'A-01-04', minStock: 80 },
  { id: 'INV003', nutcode: 'NUT0004003', desc: 'Junta plana DN50 PN10', type: 'Juntas' as const, stock: 310, loc: 'A-02-01', minStock: 150 },
  { id: 'INV004', nutcode: 'NUT0004004', desc: 'Junta tórica O-Ring 50x3 NBR', type: 'Juntas' as const, stock: 580, loc: 'A-02-02', minStock: 200 },
  { id: 'INV005', nutcode: 'NUT0004005', desc: 'Junta tórica O-Ring 80x4 FKM', type: 'Juntas' as const, stock: 85, loc: 'A-02-03', minStock: 100 },
  { id: 'INV006', nutcode: 'NUT0002001', desc: 'Espárrago M10x40 A4-80', type: 'Espárragos' as const, stock: 1200, loc: 'B-01-01', minStock: 500 },
  { id: 'INV007', nutcode: 'NUT0002002', desc: 'Espárrago M12x80 A4-80', type: 'Espárragos' as const, stock: 420, loc: 'B-01-02', minStock: 300 },
  { id: 'INV008', nutcode: 'NUT0002003', desc: 'Espárrago M16x100 A4-80', type: 'Espárragos' as const, stock: 180, loc: 'B-01-03', minStock: 200 },
  { id: 'INV009', nutcode: 'NUT0002004', desc: 'Espárrago M20x120 A2-70', type: 'Espárragos' as const, stock: 95, loc: 'B-01-04', minStock: 100 },
  { id: 'INV010', nutcode: 'NUT0001001', desc: 'Tuerca hexagonal M10 A4', type: 'Tuercas' as const, stock: 2400, loc: 'B-02-01', minStock: 1000 },
  { id: 'INV011', nutcode: 'NUT0001002', desc: 'Tuerca hexagonal M12 A4', type: 'Tuercas' as const, stock: 1800, loc: 'B-02-02', minStock: 800 },
  { id: 'INV012', nutcode: 'NUT0001003', desc: 'Tuerca hexagonal M16 A4', type: 'Tuercas' as const, stock: 650, loc: 'B-02-03', minStock: 400 },
  { id: 'INV013', nutcode: 'NUT0001004', desc: 'Tuerca autoblocante M10 A2', type: 'Tuercas' as const, stock: 320, loc: 'B-02-04', minStock: 200 },
  { id: 'INV014', nutcode: 'NUT0003001', desc: 'Tornillo sin fin M8x30', type: 'Tornillos sin fin' as const, stock: 750, loc: 'C-01-01', minStock: 300 },
  { id: 'INV015', nutcode: 'NUT0003002', desc: 'Tornillo sin fin M10x40', type: 'Tornillos sin fin' as const, stock: 480, loc: 'C-01-02', minStock: 250 },
  { id: 'INV016', nutcode: 'NUT0007001', desc: 'Kit brida DN50 PN16 (4 espárragos + 4 tuercas + 1 junta)', type: 'Cajas/Embalaje' as const, stock: 45, loc: 'D-01-01', minStock: 30 },
  { id: 'INV017', nutcode: 'NUT0007002', desc: 'Kit brida DN80 PN16 (8 espárragos + 8 tuercas + 1 junta)', type: 'Cajas/Embalaje' as const, stock: 28, loc: 'D-01-02', minStock: 20 },
  { id: 'INV018', nutcode: 'NUT0007010', desc: 'Kit brida DN100 PN16 (8 espárragos + 8 tuercas + 1 junta)', type: 'Cajas/Embalaje' as const, stock: 15, loc: 'D-01-03', minStock: 15 },
];

const SEED_ORDERS: (Order & { date?: string })[] = [
  { id: 'ORD001', number: '#0001', customer: 'Industrias Tarraco SL', status: 'paid', amount: 1250, date: '2026-07-20' },
  { id: 'ORD002', number: '#0002', customer: 'Gaskets Ibérica SA', status: 'pending', amount: 890, date: '2026-07-22' },
  { id: 'ORD003', number: '#0003', customer: 'Sellados del Mediterráneo', status: 'paid', amount: 2100, date: '2026-07-18' },
  { id: 'ORD004', number: '#0004', customer: 'TecnoJunta SL', status: 'refunded', amount: 340, date: '2026-07-15' },
  { id: 'ORD005', number: '#0005', customer: 'Prefabricados Catalonia', status: 'paid', amount: 1680, date: '2026-07-23' },
  { id: 'ORD006', number: '#0006', customer: 'Almacenes Riu Clar', status: 'pending', amount: 560, date: '2026-07-24' },
];

const SEED_CUSTOMERS: (Customer & { company?: string; phone?: string })[] = [
  { id: 'CLI001', code: 'CLI001', name: 'Marcos Fernández', email: 'marcos@tarracoind.com', company: 'Industrias Tarraco SL', phone: '+34 977 123 456', plan: 'Enterprise', status: 'active' },
  { id: 'CLI002', code: 'CLI002', name: 'Laura Vidal', email: 'laura@gasketsiberica.com', company: 'Gaskets Ibérica SA', phone: '+34 977 234 567', plan: 'Team', status: 'active' },
  { id: 'CLI003', code: 'CLI003', name: 'Antonio Roca', email: 'antonio@selladosmed.com', company: 'Sellados del Mediterráneo', phone: '+34 977 345 678', plan: 'Enterprise', status: 'active' },
  { id: 'CLI004', code: 'CLI004', name: 'Carmen Puig', email: 'carmen@tecnunjunta.com', company: 'TecnoJunta SL', phone: '+34 977 456 789', plan: 'Starter', status: 'trial' },
  { id: 'CLI005', code: 'CLI005', name: 'Jordi Solé', email: 'jordi@prefabricadoscat.com', company: 'Prefabricados Catalonia', phone: '+34 977 567 890', plan: 'Team', status: 'active' },
  { id: 'CLI006', code: 'CLI006', name: 'Marta Blanca', email: 'marta@riuclar.com', company: 'Almacenes Riu Clar', phone: '+34 977 678 901', plan: 'Starter', status: 'past-due' },
];

// ============================================================
// INVENTORY STORE
// ============================================================
interface InventoryState {
  items: InventoryItem[];
  _loaded: boolean;
  load: () => Promise<void>;
  addItem: (data: { desc: string; type: InventoryItem['type']; stock: number; loc: string }) => Promise<InventoryItem>;
  updateItem: (id: string, data: Partial<InventoryItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  getByNUT: (nutcode: string) => InventoryItem | undefined;
  deductStock: (nutcode: string, qty: number) => Promise<boolean>;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],
      _loaded: false,
      load: async () => {
        try {
          const items = await fetchInventory();
          set({ items, _loaded: true });
        } catch {
          set({ items: SEED_INVENTORY, _loaded: true });
        }
      },
      addItem: async (data) => {
        const item = await insertInventory(data);
        set((s) => ({ items: [...s.items, item] }));
        return item;
      },
      updateItem: async (id, data) => {
        await updateInventory(id, data);
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...data } : i)),
        }));
      },
      deleteItem: async (id) => {
        await deleteInventory(id);
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
      },
      getByNUT: (nutcode) => get().items.find((i) => i.nutcode === nutcode),
      deductStock: async (nutcode, qty) => {
        const item = get().items.find((i) => i.nutcode === nutcode);
        if (!item || item.stock < qty) return false;
        const newStock = item.stock - qty;
        await updateInventory(item.id, { stock: newStock });
        set((s) => ({
          items: s.items.map((i) =>
            i.nutcode === nutcode ? { ...i, stock: newStock } : i
          ),
        }));
        return true;
      },
    }),
    {
      name: 'esinsa_inventory',
      version: 2,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ============================================================
// ORDERS STORE
// ============================================================
interface OrdersState {
  items: Order[];
  _loaded: boolean;
  load: () => Promise<void>;
  addItem: (data: { customer: string; status: Order['status']; amount: number }) => Promise<Order>;
  updateItem: (id: string, data: Partial<Order>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      items: [],
      _loaded: false,
      load: async () => {
        try {
          const items = await fetchOrders();
          set({ items, _loaded: true });
        } catch {
          set({ items: SEED_ORDERS, _loaded: true });
        }
      },
      addItem: async (data) => {
        const item = await insertOrder(data);
        set((s) => ({ items: [...s.items, item] }));
        return item;
      },
      updateItem: async (id, data) => {
        await updateOrder(id, data);
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...data } : i)),
        }));
      },
      deleteItem: async (id) => {
        await deleteOrder(id);
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
      },
    }),
    {
      name: 'esinsa_orders',
      version: 2,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ============================================================
// CUSTOMERS STORE
// ============================================================
interface CustomersState {
  items: Customer[];
  _loaded: boolean;
  load: () => Promise<void>;
  addItem: (data: { name: string; email: string; plan: Customer['plan']; status: Customer['status'] }) => Promise<Customer>;
  updateItem: (id: string, data: Partial<Customer>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

export const useCustomersStore = create<CustomersState>()(
  persist(
    (set) => ({
      items: [],
      _loaded: false,
      load: async () => {
        try {
          const items = await fetchCustomers();
          set({ items, _loaded: true });
        } catch {
          set({ items: SEED_CUSTOMERS, _loaded: true });
        }
      },
      addItem: async (data) => {
        const item = await insertCustomer(data);
        set((s) => ({ items: [...s.items, item] }));
        return item;
      },
      updateItem: async (id, data) => {
        await updateCustomer(id, data);
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, ...data } : i)),
        }));
      },
      deleteItem: async (id) => {
        await deleteCustomer(id);
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
      },
    }),
    {
      name: 'esinsa_customers',
      version: 2,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ============================================================
// Initialize counters from persisted data
// ============================================================
export function seedGenerators(): void {
  const inv = useInventoryStore.getState().items;
  const ord = useOrdersStore.getState().items;
  const cus = useCustomersStore.getState().items;
  initCounters(inv, ord, cus);
}

// Seed on module load in browser context
if (typeof window !== 'undefined') {
  seedGenerators();
}
