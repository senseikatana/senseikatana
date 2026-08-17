/**
 * Shared LLM prompt construction for the AI providers.
 * Loads the ESINSA FAQ once and builds the JARVIS system prompt with a
 * compact real-time snapshot of the warehouse.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { WarehouseSnapshot } from '@/domain/ai/ports';
import { LOW_STOCK_THRESHOLD } from '@/shared/constants';

let faqCache: string | null = null;
function getFaqKnowledge(): string {
  if (faqCache !== null) return faqCache;
  try {
    faqCache = readFileSync(join(process.cwd(), 'src/data/faqs-esinsa.md'), 'utf-8');
  } catch {
    console.warn('[jarvis] No se encontró src/data/faqs-esinsa.md');
    faqCache = '';
  }
  return faqCache;
}

function buildContextSummary(data: WarehouseSnapshot): string {
  const { inventory, orders, customers } = data;

  const lowStock = inventory.filter((i) => Number(i.stock) < LOW_STOCK_THRESHOLD);
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const totalStock = inventory.reduce((s, i) => s + (Number(i.stock) || 0), 0);

  const invLines = inventory.slice(0, 500).map(
    (i) => `- ${i.nutcode} | ${i.desc} | tipo:${i.type} | stock:${i.stock} | ubicación:${i.loc}`
  );
  const orderLines = orders.slice(-50).map(
    (o) => `- ${o.number} | ${o.customer} | ${o.status} | €${o.amount}`
  );
  const custLines = customers.slice(0, 150).map(
    (c) => `- ${c.code} | ${c.name} | ${c.email} | plan:${c.plan} | ${c.status}`
  );

  return `
DATOS DEL ALMACÉN (actualizado: ${data.updatedAt}):
== RESUMEN ==
Referencias únicas: ${inventory.length}
Stock total: ${totalStock} unidades
Productos con stock bajo (<${LOW_STOCK_THRESHOLD}): ${lowStock.length}
Pedidos totales: ${orders.length} (pendientes: ${pendingOrders.length})
Clientes: ${customers.length}

== INVENTARIO (NUTCODE | descripción | tipo | stock | ubicación) ==
${invLines.join('\n') || '(vacío)'}

== ÚLTIMOS PEDIDOS ==
${orderLines.join('\n') || '(vacío)'}

== CLIENTES ==
${custLines.join('\n') || '(vacío)'}
`.trim();
}

export function buildSystemPrompt(data: WarehouseSnapshot, lang: string): string {
  const langName = lang === 'en' ? 'English' : lang === 'ca' ? 'Català' : 'Español';
  return `Eres JARVIS, el asistente digital del almacén de ESINSA Gasket (Tarragona), fabricante de juntas y tornillería industrial.
Respondes SIEMPRE en ${langName}, de forma breve, precisa y profesional.
Tienes acceso completo y en tiempo real a los datos del almacén (inventario NUTCODE, ubicaciones, pedidos y clientes).
REGLAS:
- Basa tus respuestas EXCLUSIVAMENTE en los datos proporcionados y la base de conocimiento FAQ. No inventes productos, cifras ni PRECIOS.
- Si te piden un producto, indica NUTCODE, stock y ubicación física.
- Si el stock es inferior a ${LOW_STOCK_THRESHOLD}, adviértelo proactivamente.
- Si detectas anomalías (stock crítico, pedidos acumulados), menciónalas al final.
- Para precios o presupuestos formales → deriva al equipo comercial (ver sección 4 de la FAQ).
- Formato WhatsApp: texto plano con emojis moderados, sin tablas Markdown, respuestas cortas.

== BASE DE CONOCIMIENTO DE LA EMPRESA (FAQ) ==
${getFaqKnowledge()}

== DATOS EN TIEMPO REAL DEL ALMACÉN ==
${buildContextSummary(data)}`;
}
