import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

export default class ServerExpress {
	private static instance: ServerExpress; // Corregido: era Application
	private readonly app: Application;
	private readonly port: number;
	private readonly host: string;

	private constructor(port: number = 3000, host: string = 'http://localhost') {
		this.app = express();
		this.port = port;
		this.host = host;
	}

	static getInstance(): ServerExpress {
		if (!ServerExpress.instance) {
			ServerExpress.instance = new ServerExpress();
		}
		return ServerExpress.instance;
	}

	start(): void {
		this.setupMiddlewares();
		this.setupRoutes();
		this.setupErrorHandling();

		this.app.listen(this.port, () => {
			console.log(`Server running on: ${this.host}:${this.port}`);
		});
	}

	getApp(): Application {
		return this.app;
	}

	private setupMiddlewares(): void {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private setupRoutes(): void {
		this.app.get('/health', (_req: Request, res: Response) => {
			res.json({ status: 'ok', timestamp: new Date().toISOString() });
		});
	}

	private setupErrorHandling(): void {
		this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
			console.error('Unhandled error:', err);
			res.status(500).json({ error: 'Internal Server Error' });
		});

		this.app.use((_req: Request, res: Response) => {
			res.status(404).json({ error: 'Not Found' });
		});
	}
}

// index.ts
// const server = ServerExpress.getInstance();
// server.start();

// En otro archivo
// const server = ServerExpress.getInstance(); // Misma instancia
// const app = server.getApp();