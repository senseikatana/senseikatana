import { Injectable, type LoggerService as NestLoggerService } from "@nestjs/common";

import {
	useLogger,
	useLoggerError,
	useLoggerTable,
	useLoggerWarn,
} from "@/core/services/logger.service.js";

/** Renders any Nest log payload as the string KatanaKit's logger expects. */
function format(message: unknown): string {
	if (typeof message === "string") return message;
	if (message instanceof Error) return message.message;
	try {
		return JSON.stringify(message) ?? String(message);
	} catch {
		return String(message);
	}
}

/**
 * Drop-in replacement for Nest's built-in logger that forwards to
 * `LoggerService` from KatanaKit.
 *
 * Nest's interface has five levels; KatanaKit has `log`, `warn` and `error`,
 * so `debug` and `verbose` both map to `log`. Optional parameters
 * (`context`, error stack, …) are passed through as the logger's `data`
 * argument, untouched.
 *
 * @example
 * ```ts
 * import { NestFactory } from "@nestjs/core";
 * import { KatanaLogger } from "katanakit-js/adapters/nestjs";
 * import { AppModule } from "./app.module";
 *
 * const app = await NestFactory.create(AppModule, { logger: new KatanaLogger() });
 * await app.listen(3000);
 * ```
 */
@Injectable()
export class KatanaLogger implements NestLoggerService {
	log(message: unknown, ...optionalParams: unknown[]): void {
		useLogger(format(message), optionalParams.length ? optionalParams : undefined);
	}

	error(message: unknown, ...optionalParams: unknown[]): void {
		useLoggerError(format(message), optionalParams.length ? optionalParams : undefined);
	}

	warn(message: unknown, ...optionalParams: unknown[]): void {
		useLoggerWarn(format(message), optionalParams.length ? optionalParams : undefined);
	}

	debug(message: unknown, ...optionalParams: unknown[]): void {
		useLogger(format(message), optionalParams.length ? optionalParams : undefined);
	}

	verbose(message: unknown, ...optionalParams: unknown[]): void {
		useLogger(format(message), optionalParams.length ? optionalParams : undefined);
	}

	/** KatanaKit extra: pretty-prints tabular data through `console.table`. */
	table(data: unknown): void {
		useLoggerTable(data);
	}
}
