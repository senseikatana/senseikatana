import { describe, expect, it } from "vitest";

import { useEmptyVault } from "@/core/services/keyvault.service.js";
import {
	useAddMcpServer,
	useCreateMcpServer,
	useEmitOpenCodeServers,
	useFindMcpServer,
	useListMcpServers,
	useOpenCodeServersObject,
	useRemoveMcpServer,
} from "@/core/services/mcp.service.js";
import type { VaultData } from "@/types/index.js";

describe("McpService", () => {
	it("should create a remote server entry from a url", () => {
		// Arrange
		const input = { name: "context7", type: "remote", url: "https://mcp.context7.com/mcp" };

		// Act
		const result = useCreateMcpServer(input);

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.type).toBe("remote");
		expect(result.data.url).toBe("https://mcp.context7.com/mcp");
	});

	it("should create a local server entry from a command", () => {
		// Arrange
		const input = { name: "everything", type: "local", command: ["npx", "-y", "server-everything"] };

		// Act
		const result = useCreateMcpServer(input);

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.command).toEqual(["npx", "-y", "server-everything"]);
	});

	it("should return error when a local server has no command", () => {
		// Arrange
		const input = { name: "broken", type: "local" };

		// Act
		const result = useCreateMcpServer(input);

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(400);
	});

	it("should return error when a remote server has no url", () => {
		// Arrange
		const input = { name: "broken", type: "remote" };

		// Act
		const result = useCreateMcpServer(input);

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(400);
	});

	it("should return error when the server name would not survive normalization", () => {
		// Arrange
		const input = { name: "Context 7!", type: "remote", url: "https://example.com/mcp" };

		// Act
		const result = useCreateMcpServer(input);

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(400);
	});

	it("should replace an existing server with the same name", () => {
		// Arrange
		const first = useCreateMcpServer({
			name: "docs",
			type: "remote",
			url: "https://a.example.com/mcp",
		});
		const second = useCreateMcpServer({
			name: "docs",
			type: "remote",
			url: "https://b.example.com/mcp",
		});
		if (!first.ok || !second.ok) throw new Error("fixture failed");
		const data = useAddMcpServer(useEmptyVault(), first.data);

		// Act
		const replaced = useAddMcpServer(data, second.data);

		// Assert
		expect(replaced.mcpServers).toHaveLength(1);
		expect(replaced.mcpServers[0].url).toBe("https://b.example.com/mcp");
	});

	it("should remove a server by name", () => {
		// Arrange
		const entry = useCreateMcpServer({
			name: "docs",
			type: "remote",
			url: "https://example.com/mcp",
		});
		if (!entry.ok) throw new Error("fixture failed");
		const data = useAddMcpServer(useEmptyVault(), entry.data);

		// Act
		const removed = useRemoveMcpServer(data, "docs");

		// Assert
		expect(useListMcpServers(removed)).toHaveLength(0);
	});

	it("should keep the registry unchanged when removing an unknown name", () => {
		// Arrange
		const entry = useCreateMcpServer({
			name: "docs",
			type: "remote",
			url: "https://example.com/mcp",
		});
		if (!entry.ok) throw new Error("fixture failed");
		const data = useAddMcpServer(useEmptyVault(), entry.data);

		// Act
		const ignored = useRemoveMcpServer(data, "missing");

		// Assert
		expect(ignored.mcpServers.map((server) => server.name)).toEqual(["docs"]);
	});

	it("should find a server by name", () => {
		// Arrange
		const entry = useCreateMcpServer({
			name: "docs",
			type: "remote",
			url: "https://example.com/mcp",
		});
		if (!entry.ok) throw new Error("fixture failed");
		const data: VaultData = useAddMcpServer(useEmptyVault(), entry.data);

		// Act & Assert
		expect(useFindMcpServer(data, "docs")).toBe(entry.data);
		expect(useFindMcpServer(data, "missing")).toBeUndefined();
	});

	it("should emit the OpenCode object preserving env references", () => {
		// Arrange
		const entry = useCreateMcpServer({
			name: "private",
			type: "remote",
			url: "https://example.com/mcp",
			headers: { Authorization: "Bearer {env:PRIVATE_MCP_TOKEN}" },
		});
		if (!entry.ok) throw new Error("fixture failed");

		// Act
		const result = useOpenCodeServersObject([entry.data]);

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.private).toEqual({
			type: "remote",
			url: "https://example.com/mcp",
			headers: { Authorization: "Bearer {env:PRIVATE_MCP_TOKEN}" },
		});
	});

	it("should omit the disabled flag when the server is enabled", () => {
		// Arrange
		const entry = useCreateMcpServer({
			name: "docs",
			type: "remote",
			url: "https://example.com/mcp",
		});
		if (!entry.ok) throw new Error("fixture failed");

		// Act
		const result = useOpenCodeServersObject([entry.data]);

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.docs.disabled).toBeUndefined();
	});

	it("should emit a JSON fragment ready for opencode.jsonc", () => {
		// Arrange
		const entry = useCreateMcpServer({
			name: "docs",
			type: "remote",
			url: "https://example.com/mcp",
		});
		if (!entry.ok) throw new Error("fixture failed");

		// Act
		const result = useEmitOpenCodeServers([entry.data]);

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(JSON.parse(result.data)).toEqual({
			docs: { type: "remote", url: "https://example.com/mcp" },
		});
	});

	it("should return error when emitting a hand-made invalid entry", () => {
		// Arrange
		const invalid = { name: "broken", type: "local" } as never;

		// Act
		const result = useOpenCodeServersObject([invalid]);

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(400);
	});
});
