// Health check requerido por render.yaml (healthCheckPath: /api/health)
import type { APIRoute } from 'astro';
import { loadWarehouseSnapshot } from '@/infrastructure/persistence/snapshot';
import { activeJarvisProvider } from '@/infrastructure/ai';

export const GET: APIRoute = async () => {
  const data = await loadWarehouseSnapshot();
  return new Response(JSON.stringify({
    status: 'ok',
    jarvis: activeJarvisProvider(),
    whatsapp: !!(import.meta.env.WHATSAPP_TOKEN && import.meta.env.WHATSAPP_PHONE_NUMBER_ID),
    data: {
      inventory: data.inventory.length,
      orders: data.orders.length,
      customers: data.customers.length,
      updatedAt: data.updatedAt,
    },
    timestamp: new Date().toISOString(),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
