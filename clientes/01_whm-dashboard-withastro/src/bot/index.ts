/**
 * ============================================================
 * ESINSA WMS — Bot de WhatsApp (BuilderBot + Baileys) + JARVIS
 * ============================================================
 * Proceso independiente que:
 *   1. Conecta con WhatsApp vía QR (Baileys — 100% gratis, sin Meta API)
 *   2. Recibe mensajes de clientes/operarios
 *   3. Los envía al cerebro JARVIS (POST /api/ai del servidor Astro)
 *   4. Devuelve la respuesta por WhatsApp
 *
 * Uso:
 *   bun run bot          → arranca el bot (escanea el QR la 1ª vez)
 *
 * La sesión queda guardada en bot_sessions/ (no hace falta QR otra vez).
 * ============================================================
 */
import { createBot, createProvider, createFlow, addKeyword, EVENTS } from '@builderbot/bot';
import { JsonFileDB } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';

const BOT_PORT = Number(process.env.BOT_PORT) || 3008;
const JARVIS_URL = process.env.JARVIS_API_URL || 'http://localhost:4321/api/ai';

// ------------------------------------------------------------
// Puente HTTP → JARVIS (cerebro Gemini + FAQ + datos del almacén)
// ------------------------------------------------------------
async function askJarvis(question: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    const res = await fetch(JARVIS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ question, lang: 'es' }),
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json?.reply ?? 'No he podido generar respuesta. Escribe MENU para ver opciones.';
  } catch (err) {
    console.error('[bot] Error llamando a JARVIS:', (err as Error).message);
    return '⚠️ Ahora mismo no puedo consultar el sistema. Inténtalo en unos minutos o escribe HUMANO para hablar con el equipo.';
  }
}

// ------------------------------------------------------------
// Filtros: ignorar grupos, estados y mensajes vacíos
// ------------------------------------------------------------
function isIgnored(ctx: { from: string; body?: string }): boolean {
  if (!ctx.body || !ctx.body.trim()) return true;
  if (ctx.from.includes('@g.us')) return true;              // grupos
  if (ctx.from.includes('status@broadcast')) return true;   // estados
  if (ctx.from.includes('@broadcast')) return true;
  return false;
}

// ------------------------------------------------------------
// Flujo: menú principal
// ------------------------------------------------------------
const menuFlow = addKeyword<Provider, JsonFileDB>(['menu', 'menú', 'MENU', 'inicio'])
  .addAnswer(
    [
      '🤖 *JARVIS — ESINSA Gasket*',
      '',
      'Puedo ayudarte directamente con:',
      '• 📦 *Stock*: "¿queda stock de la junta DN80?"',
      '• 📍 *Ubicación*: "¿dónde está el NUT0004001?"',
      '• 🧾 *Pedidos*: "estado de mis pedidos"',
      '• 🚚 *Envíos y plazos* de entrega',
      '• 📋 *Catálogo*: juntas, espárragos, tuercas, kits de brida',
      '',
      'Escribe tu consulta directamente.',
      'Escribe *HUMANO* si prefieres hablar con una persona.',
    ].join('\n')
  );

// ------------------------------------------------------------
// Flujo: escalado a humano
// ------------------------------------------------------------
const humanFlow = addKeyword<Provider, JsonFileDB>(['humano', 'HUMANO', 'comercial', 'persona', 'operario'])
  .addAnswer(
    [
      '👷 Te paso con el equipo comercial de ESINSA.',
      '',
      '🕐 Horario: L-V 7:00–15:00 h',
      '📧 ventas@esinsa.es',
      '',
      'Te respondemos en menos de 2 h laborables. Si es una parada de planta urgente, indícalo en tu mensaje.',
    ].join('\n')
  );

// ------------------------------------------------------------
// Flujo principal: cualquier otro mensaje → JARVIS
// ------------------------------------------------------------
const jarvisFlow = addKeyword<Provider, JsonFileDB>(EVENTS.WELCOME)
  .addAction(async (ctx, { flowDynamic, provider }) => {
    if (isIgnored(ctx)) return;

    const question = ctx.body.trim();
    console.log(`[bot] ${ctx.from} → ${question}`);

    // Indicador "escribiendo…" (no crítico si falla)
    try {
      await provider.vendor?.sendPresenceUpdate?.('composing', ctx.from);
    } catch { /* noop */ }

    const reply = await askJarvis(question);

    try {
      await provider.vendor?.sendPresenceUpdate?.('paused', ctx.from);
    } catch { /* noop */ }

    await flowDynamic(reply);
  });

// ------------------------------------------------------------
// Arranque
// ------------------------------------------------------------
const main = async () => {
  const adapterFlow = createFlow([jarvisFlow, menuFlow, humanFlow]);
  // Fetch latest WhatsApp Web version to avoid 405 Connection Failure
let waVersion: [number, number, number] = [2, 3000, 1035194821];
try {
  const { fetchLatestBaileysVersion } = await import('baileys');
  const latest = await fetchLatestBaileysVersion();
  waVersion = latest.version as [number, number, number];
  console.log(`[bot] WhatsApp Web version: ${waVersion.join('.')}`);
} catch (e) {
  console.log(`[bot] Using default WhatsApp version: ${waVersion.join('.')}`);
}

const adapterProvider = createProvider(Provider, { version: waVersion });
  const adapterDB = new JsonFileDB({ filename: 'bot_db.json' });

  const { httpServer, handleCtx } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
    log: { logs: { notices: true } },
  });

  // Log de eventos del provider para depuración
  const provider = adapterProvider.getInstance?.() ?? adapterProvider;
  if (provider?.vendor?.ev) {
    provider.vendor.ev.on('connection.update', (update: any) => {
      const { connection, lastDisconnect, qr } = update;
      if (qr) console.log('[bot] QR generado — escanéalo desde WhatsApp');
      if (connection === 'open') console.log('[bot] ✅ Conectado a WhatsApp');
      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        console.log(`[bot] Conexión cerrada. Razón: ${reason}`);
        if (reason === 401) {
          console.log('[bot] Sesión no válida — eliminando para regenerar QR...');
          // El usuario deberá volver a escanear el QR
        }
      }
    });
  }

  httpServer(BOT_PORT);
  console.log(`[bot] ESINSA WhatsApp Bot — Portal QR: http://localhost:${BOT_PORT}`);
  console.log(`[bot] Cerebro JARVIS en: ${JARVIS_URL}`);
  console.log('[bot] Esperando escaneo del QR desde WhatsApp...');
};

main().catch((err) => {
  console.error('[bot] Error fatal:', err);
  process.exit(1);
});
