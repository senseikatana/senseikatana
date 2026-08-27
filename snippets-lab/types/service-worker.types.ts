export type WorkerFunc<TInput, TOutput> = (data: TInput) => TOutput;
export interface WorkerPoolEntry<TInput = unknown, TOutput = unknown> {
	worker: Worker;
	workerUrl: string;
	func: WorkerFunc<TInput, TOutput>;
}
