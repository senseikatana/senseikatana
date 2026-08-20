import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useInventoryStore, useOrdersStore, useCustomersStore, seedGenerators } from './stores';
import type { InventoryItem, Order, Customer, InventoryItemForm, OrderForm, CustomerForm } from './schemas';

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export const queryKeys = {
  inventory: ['esinsa', 'inventory'] as const,
  orders: ['esinsa', 'orders'] as const,
  customers: ['esinsa', 'customers'] as const,
};

async function askAI(prompt: string): Promise<string> {
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: prompt, lang: 'es' }),
    });
    const data = await res.json();
    return data?.reply ?? '';
  } catch {
    return '';
  }
}

function parseAIJson<T>(text: string): T[] | null {
  try {
    const match = text.match(/\[[\s\S]*\]/);
    if (match) return JSON.parse(match[0]) as T[];
  } catch { /* ignore */ }
  return null;
}

export function useAIGenerateInventory() {
  const qc = useQueryClient();
  const addItem = useInventoryStore((s) => s.addItem);
  return useMutation({
    mutationFn: async (count: number = 3) => {
      const prompt = `Genera ${count} productos de inventario realista para un almacén de juntas y selados industriales ESINSA en Tarragona. Devuelve SOLO un JSON array sin texto extra. Cada objeto debe tener: desc (string, descripción del producto), type (string, uno de: "Juntas", "Espárragos", "Tuercas", "Tornillos sin fin", "Cajas/Embalaje"), stock (number, entre 10 y 500), loc (string, formato "A-01" a "D-02"). Ejemplo: [{"desc":"Junta DN80 PN16","type":"Juntas","stock":120,"loc":"A-01"}]`;
      const reply = await askAI(prompt);
      const parsed = parseAIJson<{ desc: string; type: string; stock: number; loc: string }>(reply);
      const created: InventoryItem[] = [];
      if (parsed && parsed.length > 0) {
        for (const item of parsed.slice(0, count)) {
          created.push(addItem({
            desc: item.desc || 'Producto sin nombre',
            type: (['Juntas', 'Espárragos', 'Tuercas', 'Tornillos sin fin', 'Cajas/Embalaje'].includes(item.type) ? item.type : 'Juntas') as any,
            stock: typeof item.stock === 'number' ? item.stock : 100,
            loc: item.loc || 'A-01',
          }));
        }
      } else {
        const types = ['Juntas', 'Espárragos', 'Tuercas', 'Tornillos sin fin'] as const;
        const locs = ['A-01', 'A-02', 'B-01', 'B-02', 'C-01', 'D-01'];
        for (let i = 0; i < count; i++) {
          created.push(addItem({
            desc: `Producto generado ${Date.now()}-${i}`,
            type: types[i % types.length],
            stock: Math.floor(Math.random() * 400 + 20),
            loc: locs[i % locs.length],
          }));
        }
      }
      return created;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.inventory }),
  });
}

export function useAIGenerateOrders() {
  const qc = useQueryClient();
  const addItem = useOrdersStore((s) => s.addItem);
  return useMutation({
    mutationFn: async (count: number = 3) => {
      const prompt = `Genera ${count} pedidos realistas para ESINSA Gasket, empresa de juntas industriales en Tarragona. Devuelve SOLO un JSON array sin texto extra. Cada objeto: customer (string, nombre de empresa industrial española), status (string, uno de: "paid", "pending", "refunded"), amount (number, entre 50 y 2000). Ejemplo: [{"customer":"Industrias Tarraco SL","status":"paid","amount":890}]`;
      const reply = await askAI(prompt);
      const parsed = parseAIJson<{ customer: string; status: string; amount: number }>(reply);
      const created: Order[] = [];
      if (parsed && parsed.length > 0) {
        for (const o of parsed.slice(0, count)) {
          created.push(addItem({
            customer: o.customer || 'Cliente',
            status: (['paid', 'pending', 'refunded'].includes(o.status) ? o.status : 'pending') as any,
            amount: typeof o.amount === 'number' ? o.amount : 100,
          }));
        }
      } else {
        const companies = ['Industrias Tarraco', 'Gaskets Ibérica', 'Sellados del Mediterráneo', 'TecnoJunta SL', 'Prefabricados Catalonia'];
        for (let i = 0; i < count; i++) {
          created.push(addItem({
            customer: companies[i % companies.length],
            status: 'pending' as const,
            amount: Math.round(Math.random() * 1500 + 100),
          }));
        }
      }
      return created;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.orders }),
  });
}

export function useAIGenerateCustomers() {
  const qc = useQueryClient();
  const addItem = useCustomersStore((s) => s.addItem);
  return useMutation({
    mutationFn: async (count: number = 3) => {
      const prompt = `Genera ${count} clientes realistas para ESINSA Gasket, proveedor de juntas industriales en Tarragona. Devuelve SOLO un JSON array sin texto extra. Cada objeto: name (string, nombre del contacto), email (string, email corporativo), plan (string, uno de: "Starter", "Team", "Enterprise"), status (string, uno de: "active", "trial", "past-due"). Ejemplo: [{"name":"Ana García","email":"ana@tarracoind.com","plan":"Enterprise","status":"active"}]`;
      const reply = await askAI(prompt);
      const parsed = parseAIJson<{ name: string; email: string; plan: string; status: string }>(reply);
      const created: Customer[] = [];
      if (parsed && parsed.length > 0) {
        for (const c of parsed.slice(0, count)) {
          created.push(addItem({
            name: c.name || 'Contacto',
            email: c.email || 'email@empresa.com',
            plan: (['Starter', 'Team', 'Enterprise'].includes(c.plan) ? c.plan : 'Team') as any,
            status: (['active', 'trial', 'past-due'].includes(c.status) ? c.status : 'active') as any,
          }));
        }
      } else {
        const names = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Pedro Sánchez'];
        for (let i = 0; i < count; i++) {
          created.push(addItem({
            name: names[i % names.length],
            email: `contacto${i + 1}@empresa.com`,
            plan: 'Team' as const,
            status: 'active' as const,
          }));
        }
      }
      return created;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.customers }),
  });
}

export function useResetAllData() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await delay(200);
      useInventoryStore.setState({ items: [] });
      useOrdersStore.setState({ items: [] });
      useCustomersStore.setState({ items: [] });
      seedGenerators();
    },
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
}
