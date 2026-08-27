export type LogLevel = "log" | "warn" | "error" | "info";


export class Logger {

    private instance: Logger = new Logger
    private constructor() {

    }

    static instance() {
        this.instance = 
    }
}


export function LOGGER(...args: unknown[]): void {
	const last: unknown = args[args.length - 1];
	let level: LogLevel = "info";

	if (
		args.length > 1 &&
		typeof last === "string" &&
		["log", "warn", "error", "info"].includes(last)
	) {
		level = last as LogLevel;
		args.pop();
	}

	console[level](...args);
}

LOGGER("Mensaje", {});
