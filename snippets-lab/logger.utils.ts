import type { LogLevel } from "./types";

export default function LOGGER(...args: unknown[]): void {
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
