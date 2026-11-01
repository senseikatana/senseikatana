import type { Server } from "node:http";

import express from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCreateAssistantRouter } from "@/adapters/assistant/assistant.service";
import { AgentService } from "@/core/services/agent.service";
import { useCreateMemoryStore, useInitAssistant } from "@/core/services/assistant.service";

/** Boots the router on an ephemeral port with a fake provider (no network). */
async function useServe(
	resolveSubject?: (request: express.Request) => string | undefined,
): Promise<{ base: string; close: () => Promise<void> }> {
	const app = express();
	app.use(express.json());
	app.use(
		"/assistant",
		useCreateAssistantRouter({
			resolveSubject,
			// Throttling would make the counters in these assertions meaningless.
			rateLimit: (_request, _response, next) => next(),
		}),
	);

	const server: Server = await new Promise((resolve) => {
		const listening = app.listen(0, "127.0.0.1", () => resolve(listening));
	});

	const { port } = server.address() as { port: number };
	return {
		base: `http://127.0.0.1:${port}/assistant`,
		close: () => new Promise((resolve) => server.close(() => resolve())),
	};
}

describe("assistant router — session ownership", () => {
	let current = "mallory";

	beforeEach(() => {
		current = "mallory";

		// Order matters: `useInitAssistant` forwards the agent config, and the
		// agent refuses to initialise without an apiKey.
		AgentService.getInstance().useSetStrategy({
			requestCompletion: async (_config, messages) => ({
				choices: [
					{
						message: {
							role: "assistant",
							content: `echo: ${messages.at(-1)?.content ?? ""}`,
						},
					},
				],
			}),
		} as never);
		AgentService.getInstance().useInitAgent({ apiKey: "test-key" });

		useInitAssistant({ store: useCreateMemoryStore(), apiKey: "test-key" });
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	/** Starts a session for `who` the way a real client would. */
	async function useStartSession(base: string, who: string): Promise<string> {
		current = who;
		const response = await fetch(`${base}/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: `${who} private note` }),
		});
		expect(response.status).toBe(200);
		const body = (await response.json()) as { data: { sessionId: string } };
		return body.data.sessionId;
	}

	it("opens a session on the first message and lets its owner use it", async () => {
		const { base, close } = await useServe(() => current);

		// Regression guard: a fail-closed ownership check must not reject the
		// session this very request just created. That shipped broken once.
		const id = await useStartSession(base, "mallory");

		current = "mallory";
		const read = await fetch(`${base}/sessions/${id}`);
		expect(read.status).toBe(200);
		const body = (await read.json()) as { messages: { content: string }[] };
		expect(body.messages[0].content).toBe("mallory private note");

		current = "mallory";
		const continued = await fetch(`${base}/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ sessionId: id, message: "still mine" }),
		});
		expect(continued.status).toBe(200);

		await close();
	});

	it("refuses to read another subject's session", async () => {
		const { base, close } = await useServe(() => current);
		const victimId = await useStartSession(base, "victim");

		current = "mallory";
		const response = await fetch(`${base}/sessions/${victimId}`);
		// 404, not 403: confirming the session exists would leak that fact.
		expect(response.status).toBe(404);

		await close();
	});

	it("refuses to delete another subject's session and leaves it intact", async () => {
		const { base, close } = await useServe(() => current);
		const victimId = await useStartSession(base, "victim");

		current = "mallory";
		const deleted = await fetch(`${base}/sessions/${victimId}`, { method: "DELETE" });
		expect(deleted.status).toBe(404);

		current = "victim";
		const still = await fetch(`${base}/sessions/${victimId}`);
		expect(still.status).toBe(200);

		await close();
	});

	it("refuses to continue another subject's session", async () => {
		const { base, close } = await useServe(() => current);
		const victimId = await useStartSession(base, "victim");

		current = "mallory";
		const hijack = await fetch(`${base}/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ sessionId: victimId, message: "hijack" }),
		});
		expect(hijack.status).toBe(404);

		await close();
	});

	it("lets a subject delete its own session, then loses access", async () => {
		const { base, close } = await useServe(() => current);
		const id = await useStartSession(base, "mallory");

		current = "mallory";
		expect((await fetch(`${base}/sessions/${id}`, { method: "DELETE" })).status).toBe(204);

		current = "mallory";
		expect((await fetch(`${base}/sessions/${id}`)).status).toBe(404);

		await close();
	});

	it("answers 401 when no subject can be resolved", async () => {
		const { base, close } = await useServe(() => undefined);

		const session = await fetch(`${base}/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: "hello" }),
		});
		expect(session.status).toBe(401);

		await close();
	});

	it("keeps the pre-existing open behaviour when resolveSubject is omitted", async () => {
		// Backwards compatibility: no resolver means no ownership enforcement,
		// exactly as before this feature existed.
		const { base, close } = await useServe();

		const opened = await fetch(`${base}/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: "anonymous" }),
		});
		expect(opened.status).toBe(200);
		const id = ((await opened.json()) as { data: { sessionId: string } }).data.sessionId;

		expect((await fetch(`${base}/sessions/${id}`)).status).toBe(200);

		await close();
	});
});
