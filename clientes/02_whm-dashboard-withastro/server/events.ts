import type { Response } from 'express';

const clients = new Set<Response>();

export function sseConnect(res: Response): void {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache, no-transform',
		Connection: 'keep-alive',
		'X-Accel-Buffering': 'no',
	});
	res.write(': connected\n\n');
	clients.add(res);

	const ping = setInterval(() => {
		res.write(': ping\n\n');
	}, 15000);

	res.on('close', () => {
		clearInterval(ping);
		clients.delete(res);
	});
}

export function broadcast(event: string, data: unknown): void {
	const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
	for (const client of clients) {
		client.write(payload);
	}
}
