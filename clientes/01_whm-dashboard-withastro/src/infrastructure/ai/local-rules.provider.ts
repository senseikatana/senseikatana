/**
 * Local-rules provider — last link of the JARVIS chain.
 * Rule-based answers over the warehouse snapshot (no LLM, no keys).
 * Always available, so JARVIS never goes down.
 */
import type { AssistantProvider, AssistantRequest } from '@/domain/ai/ports';
import { LOW_STOCK_THRESHOLD } from '@/shared/constants';

export class LocalRulesProvider implements AssistantProvider {
  readonly name = 'local' as const;
  readonly isConfigured = true;

  async ask({ question, data }: AssistantRequest): Promise<string> {
    const q = question.toLowerCase();
    const { inventory, orders, customers } = data;
    const lowStock = inventory.filter((i) => Number(i.stock) < LOW_STOCK_THRESHOLD);
    const pending = orders.filter((o) => o.status === 'pending');

    const nutMatch = q.match(/nut\s?0*(\d+)/i);
    if (nutMatch) {
      const item = inventory.find((i) => String(i.nutcode).toUpperCase().includes(nutMatch[1]));
      if (item) {
        const warn = Number(item.stock) < LOW_STOCK_THRESHOLD ? ' ⚠️ STOCK BAJO' : '';
        return `🔍 ${item.nutcode} — ${item.desc}\n📦 Stock: ${item.stock} uds${warn}\n📍 Ubicación: ${item.loc}\n🏷️ Tipo: ${item.type}`;
      }
      return `❌ No encuentro el código NUT${nutMatch[1]} en el inventario.`;
    }

    if (q.includes('stock bajo') || q.includes('bajo stock') || q.includes('crítico')) {
      if (lowStock.length === 0) return '✅ No hay productos con stock bajo.';
      const lines = lowStock
        .slice(0, 8)
        .map((i) => `• ${i.nutcode} ${i.desc}: ${i.stock} uds (${i.loc})`);
      return `⚠️ ${lowStock.length} producto(s) con stock bajo:\n${lines.join('\n')}${
        lowStock.length > 8 ? `\n…y ${lowStock.length - 8} más.` : ''
      }`;
    }

    if (q.includes('pedido') || q.includes('pendiente')) {
      if (pending.length === 0) return '✅ No hay pedidos pendientes.';
      const lines = pending.slice(0, 8).map((o) => `• ${o.number} — ${o.customer} (€${o.amount})`);
      return `📦 ${pending.length} pedido(s) pendientes:\n${lines.join('\n')}`;
    }

    if (q.includes('resumen') || q.includes('estado') || q.includes('hola') || q.includes('buenas')) {
      const totalStock = inventory.reduce((s, i) => s + (Number(i.stock) || 0), 0);
      return `🤖 JARVIS — Estado del almacén:\n📦 ${inventory.length} referencias (${totalStock} uds)\n⚠️ ${lowStock.length} con stock bajo\n🧾 ${orders.length} pedidos (${pending.length} pendientes)\n👥 ${customers.length} clientes\n\nPregúntame por un NUTCODE, "stock bajo", "pedidos pendientes"…`;
    }

    return `🤖 Puedo ayudarte con:\n• "NUT0004001" → ficha del producto\n• "stock bajo" → alertas\n• "pedidos pendientes"\n• "resumen" → estado general`;
  }
}
