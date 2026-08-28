// services/logger.service.ts
export type LogLevel = "log" | "info" | "warn" | "error" | "debug";

export class LoggerService {
	private static instance: LoggerService;

	private constructor() {}

	static getInstance(): LoggerService {
		if (!LoggerService.instance) {
			LoggerService.instance = new LoggerService();
		}
		return LoggerService.instance;
	}

	log(...args: unknown[]): void {
		const last: unknown = args[args.length - 1];
		let level: LogLevel = "info";

		if (
			args.length > 1 &&
			typeof last === "string" &&
			(["log", "info", "warn", "error", "debug"] as LogLevel[]).includes(last as LogLevel)
		) {
			level = last as LogLevel;
			args.pop();
		}

		console[level](...args);
	}

	clear(): void {
		console.clear();
	}

	table(data: unknown): void {
		console.table(data);
	}

	// Métodos shortcut para conveniencia
	info(...args: unknown[]): void {
		console.info(...args);
	}

	warn(...args: unknown[]): void {
		console.warn(...args);
	}

	error(...args: unknown[]): void {
		console.error(...args);
	}

	debug(...args: unknown[]): void {
		console.debug(...args);
	}
}

// Instancia exportada para uso directo
export const {log: LOGGER, clear: LOGGER_CLEAR, error: LOGGER_ERROR, table: LOGGER_TABLE }: LoggerService = LoggerService.getInstance();


