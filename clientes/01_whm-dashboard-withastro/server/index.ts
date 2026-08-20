import 'dotenv/config';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { isAuthEnabled, requireAuth } from './auth';
import { ensureSchema, insertMessage, listChats, listMessages, upsertChat } from './db';
import { sseConnect } from './events';
import { kittChat, kittConfigured, kittModel, kittProvider } from './kitt';
import { startTelegramPolling, telegramConfigured, telegramSend } from './telegram';
import {
	ingestWebhook,
	verifyWebhook,
	whatsappConfigured,
	whatsappSend,
} from './whatsapp';

function queryString(value: unknown): string | undefined {
	return typeof value === 'string' ? value : undefined;
}

interface EndpointDoc {
	method: 'GET' | 'POST';
	path: string;
	description: string;
	params: string[];
	auth: boolean;
}

const ENDPOINTS: EndpointDoc[] = [
	{
		method: 'GET',
		path: '/api',
		description: 'Manifest JSON con todos los endpoints disponibles.',
		params: [],
		auth: false,
	},
	{
		method: 'GET',
		path: '/api/health',
		description: 'Liveness del server y estado de configuración de los canales.',
		params: [],
		auth: false,
	},
	{
		method: 'GET',
		path: '/api/events',
		description: 'Hub de eventos en tiempo real (Server-Sent Events).',
		params: [],
		auth: true,
	},
	{
		method: 'GET',
		path: '/api/chats',
		description: 'Lista las conversaciones, opcionalmente filtradas por canal.',
		params: ['channel?'],
		auth: true,
	},
	{
		method: 'GET',
		path: '/api/messages',
		description: 'Lista los mensajes de un chat (polling incremental con afterId).',
		params: ['chatId', 'afterId?'],
		auth: true,
	},
	{
		method: 'POST',
		path: '/api/telegram/send',
		description: 'Envía un mensaje por Telegram.',
		params: ['chatId', 'text'],
		auth: true,
	},
	{
		method: 'GET',
		path: '/api/telegram/status',
		description: 'Indica si el bot de Telegram está configurado.',
		params: [],
		auth: true,
	},
	{
		method: 'POST',
		path: '/api/whatsapp/send',
		description: 'Envía un mensaje por WhatsApp Cloud API.',
		params: ['to', 'text'],
		auth: true,
	},
	{
		method: 'GET',
		path: '/api/whatsapp/status',
		description: 'Estado de WhatsApp Cloud API (phone_id incluido).',
		params: [],
		auth: true,
	},
	{
		method: 'GET',
		path: '/api/whatsapp/webhook',
		description: 'Verificación del webhook de Meta (handshake).',
		params: ['hub.mode', 'hub.verify_token', 'hub.challenge'],
		auth: false,
	},
	{
		method: 'POST',
		path: '/api/whatsapp/webhook',
		description: 'Webhook entrante de Meta con los mensajes de WhatsApp.',
		params: [],
		auth: false,
	},
	{
		method: 'GET',
		path: '/api/kitt/health',
		description: 'Estado del proveedor de IA configurado para KITT.',
		params: [],
		auth: true,
	},
	{
		method: 'POST',
		path: '/api/kitt/chat',
		description: 'Chat con KITT en streaming (SSE): messages, snapshot y files.',
		params: ['messages', 'snapshot?', 'files?'],
		auth: true,
	},
];

function landingHtml(): string {
	const rows = ENDPOINTS.map(
		(endpoint) => `
		<tr>
			<td><span class="method method-${endpoint.method.toLowerCase()}">${endpoint.method}</span></td>
			<td><code>${endpoint.path}</code></td>
			<td>${endpoint.description}</td>
			<td>${endpoint.params.map((param) => `<code class="param">${param}</code>`).join(' ') || '<span class="muted">—</span>'}</td>
			<td>${endpoint.auth ? '<span class="method method-post">JWT</span>' : '<span class="muted">—</span>'}</td>
		</tr>`,
	).join('');

	return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>WarehouseFlow · Server API</title>
<style>
	:root { color-scheme: dark; }
	* { box-sizing: border-box; }
	body {
		margin: 0;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		background: #0b1120;
		color: #e2e8f0;
		line-height: 1.6;
	}
	.wrap { max-width: 960px; margin: 0 auto; padding: 3rem 1.5rem; }
	.badge {
		display: inline-block;
		border: 1px solid #22d3ee;
		color: #22d3ee;
		border-radius: 9999px;
		padding: 0.15rem 0.7rem;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	h1 { font-size: 1.6rem; margin: 1rem 0 0.25rem; color: #f8fafc; }
	p.lede { color: #94a3b8; margin: 0 0 2rem; }
	.code-url {
		background: #0f172a;
		border: 1px solid #1e293b;
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		font-size: 0.9rem;
		color: #67e8f9;
		margin-bottom: 2rem;
		overflow-x: auto;
	}
	table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
	th {
		text-align: left;
		color: #64748b;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		border-bottom: 1px solid #1e293b;
		padding: 0.6rem 0.5rem;
	}
	td { padding: 0.6rem 0.5rem; border-bottom: 1px solid #16203a; vertical-align: top; }
	td code { color: #a5b4fc; }
	code.param { color: #94a3b8; font-size: 0.75rem; }
	.method {
		font-size: 0.65rem;
		font-weight: 700;
		border-radius: 0.35rem;
		padding: 0.15rem 0.5rem;
		letter-spacing: 0.05em;
	}
	.method-get { background: #0f766e22; color: #2dd4bf; border: 1px solid #0f766e; }
	.method-post { background: #b4530922; color: #fbbf24; border: 1px solid #b45309; }
	.muted { color: #475569; }
	.links { margin-top: 2rem; font-size: 0.85rem; }
	.links a { color: #818cf8; text-decoration: none; }
	.links a:hover { text-decoration: underline; }
	.note { color: #64748b; font-size: 0.8rem; margin-top: 0.5rem; }
</style>
</head>
<body>
<div class="wrap">
	<span class="badge">whm-server · express + sqlite</span>
	<h1>WarehouseFlow · Server API</h1>
	<p class="lede">Backend de mensajería (WhatsApp, Telegram y KITT). Documentación completa en <a href="#" style="color:#818cf8">/docs</a> del dashboard.</p>
	<div class="code-url">http://localhost:8787</div>
	<table>
		<thead>
			<tr><th>Método</th><th>Ruta</th><th>Descripción</th><th>Parámetros</th><th>Auth</th></tr>
		</thead>
		<tbody>${rows}</tbody>
	</table>
	<p class="note">${isAuthEnabled() ? 'Auth JWT habilitado: las rutas marcadas con JWT exigen un token de Supabase (Authorization: Bearer ... o ?token=...).' : 'Auth JWT deshabilitado (modo local): ninguna ruta exige token.'}</p>
	<div class="links">
		<a href="/api">Manifest JSON → /api</a>
		&nbsp;·&nbsp;
		<a href="/api/health">Health check</a>
	</div>
	<p class="note">Documentación interactiva de cada endpoint en /docs del dashboard.</p>
</div>
</body>
</html>`;
}

async function main(): Promise<void> {
	await ensureSchema();

	const app = express();
	const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:4321,http://127.0.0.1:4321')
		.split(',')
		.map((origin) => origin.trim());

	app.use(
		cors({
			origin: (origin, callback) => {
				if (!origin || allowedOrigins.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error('Origen no permitido por CORS.'));
				}
			},
		}),
	);
	app.use(express.json({ limit: '8mb' }));

	const wrap =
		(handler: (req: Request, res: Response) => Promise<void>) =>
		(req: Request, res: Response, next: NextFunction) => {
			handler(req, res).catch(next);
		};

	app.get('/', (_req, res) => {
		res.type('html').send(landingHtml());
	});

	app.get('/api', (_req, res) => {
		res.json({
			name: 'whm-server',
			baseUrl: `http://localhost:${port}`,
			endpoints: ENDPOINTS,
		});
	});

	app.get('/api/health', (_req, res) => {
		res.json({
			ok: true,
			telegram: telegramConfigured(),
			whatsapp: whatsappConfigured(),
			time: Date.now(),
		});
	});

	app.get('/api/events', requireAuth, (req, res) => {
		res.socket?.setTimeout(0);
		sseConnect(res);
	});

	app.get('/api/chats', requireAuth, async (req, res) => {
		res.json(await listChats(queryString(req.query.channel)));
	});

	app.get(
		'/api/messages',
		requireAuth,
		wrap(async (req, res) => {
			const chatId = queryString(req.query.chatId);
			if (!chatId) {
				res.status(400).json({ error: 'Falta chatId.' });
				return;
			}
			const afterId = Number(queryString(req.query.afterId) ?? 0);
			res.json(await listMessages(chatId, Number.isNaN(afterId) ? 0 : afterId));
		}),
	);

	app.post(
		'/api/telegram/send',
		requireAuth,
		wrap(async (req, res) => {
			const chatId = queryString(req.body.chatId);
			const text = queryString(req.body.text);
			if (!chatId || !text) {
				res.status(400).json({ error: 'Faltan chatId o text.' });
				return;
			}
			if (!telegramConfigured()) {
				res.status(400).json({ error: 'Telegram no está configurado.' });
				return;
			}
			await telegramSend(chatId, text);
			const saved = await insertMessage({
				chatId,
				channel: 'telegram',
				direction: 'out',
				text,
				status: 'sent',
			});
			res.json(saved);
		}),
	);

	app.get('/api/telegram/status', requireAuth, (_req, res) => {
		res.json({ configured: telegramConfigured() });
	});

	app.post(
		'/api/whatsapp/send',
		requireAuth,
		wrap(async (req, res) => {
			const to = queryString(req.body.to);
			const text = queryString(req.body.text);
			if (!to || !text) {
				res.status(400).json({ error: 'Faltan to o text.' });
				return;
			}
			if (!whatsappConfigured()) {
				res.status(400).json({ error: 'WhatsApp no está configurado.' });
				return;
			}
			await whatsappSend(to, text);
			const chat = await upsertChat({
				channel: 'whatsapp',
				externalId: to,
				contactName: null,
				timestamp: Date.now(),
			});
			const saved = await insertMessage({
				chatId: chat.id,
				channel: 'whatsapp',
				direction: 'out',
				text,
				status: 'sent',
			});
			res.json(saved);
		}),
	);

	app.get('/api/whatsapp/status', requireAuth, (_req, res) => {
		res.json({
			configured: whatsappConfigured(),
			phoneId: process.env.WHATSAPP_PHONE_ID ?? null,
		});
	});

	app.get('/api/whatsapp/webhook', (req, res) => {
		const challenge = verifyWebhook(req.query as Record<string, unknown>);
		if (challenge === null) {
			res.status(403).send('Verificación de webhook fallida.');
			return;
		}
		res.send(challenge);
	});

	app.post(
		'/api/whatsapp/webhook',
		wrap(async (req, res) => {
			await ingestWebhook(req.body);
			res.sendStatus(200);
		}),
	);

	app.get('/api/kitt/health', requireAuth, (_req, res) => {
		res.json({
			configured: kittConfigured(),
			provider: kittProvider(),
			model: kittModel(),
		});
	});

	app.post(
		'/api/kitt/chat',
		requireAuth,
		wrap(async (req, res) => {
			await kittChat(res, req.body);
		}),
	);

	app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
		console.error('[whm-server] error:', error);
		const message = error instanceof Error ? error.message : 'Error interno del servidor.';
		res.status(500).json({ error: message });
	});

	const port = Number(process.env.PORT ?? 8787);
	app.listen(port, () => {
		console.log(`[whm-server] escuchando en http://localhost:${port}`);
	});

	void startTelegramPolling();
}

main().catch((error) => {
	console.error('[whm-server] no pudo iniciar:', error);
	process.exit(1);
});
