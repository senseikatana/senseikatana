# API Reference

## Class: ApifyManager

Main entry point for interacting with Apify services.

### Constructor

`constructor(token: string)`

Initializes the Apify client wrapper. Throws an error if token is missing.

### Methods

#### `runActorAndFetchItems<T>(options: RunActorOptions): Promise<T[]>`

Executes an Actor synchronously and resolves with its generated dataset items.

Parameters:
- actorId (string, required): ID or full name of the target Actor (e.g., 'apify/web-scraper').
- input (Record<string, unknown>, required): Input options passed directly to the Actor.
- memoryMbytes (number, optional): Memory allocation in MB. Default: 1024.
- timeoutSecs (number, optional): Maximum execution duration in seconds.

Returns:
- Promise<T[]>: Array of typed items from the default dataset.

#### getRunStatus(runId: string): Promise<string>

Fetches the lifecycle state of a specific run (e.g., RUNNING, SUCCEEDED, FAILED).

Parameters:
- runId (string, required): The unique identifier of the run.

Returns:
- Promise<string>: The current status string.