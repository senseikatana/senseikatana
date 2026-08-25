export type LogLevel = 'log' | 'warn' | 'error' | 'info';

export function LOGGER(...args: any[]): void {
  const last = args[args.length - 1];
  let level: LogLevel = 'log';

  if (args.length > 1 && typeof last === 'string' && ['log', 'warn', 'error', 'info'].includes(last)) {
    level = last as LogLevel;
    args.pop();
  }

  console[level](...args);
}