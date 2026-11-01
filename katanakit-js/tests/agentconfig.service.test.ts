import { describe, expect, it } from "vitest";

import { useAgentDefinitions, useEmitAgentConfig } from "@/core/services/agentconfig.service.js";

describe("AgentConfigService", () => {
	it("should list registered agents including opencode and claude-code", () => {
		// Arrange & Act
		const agents = useAgentDefinitions();

		// Assert
		expect(agents.map((agent) => agent.id)).toEqual(["opencode", "claude-code"]);
	});

	it("should return not found for an unknown agent", () => {
		// Arrange & Act
		const result = useEmitAgentConfig("cursor", { provider: "openai", secret: "sk-abc" });

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(404);
	});

	it("should return error when the secret is empty", () => {
		// Arrange & Act
		const result = useEmitAgentConfig("opencode", { provider: "openai", secret: "" });

		// Assert
		expect(result.ok).toBe(false);
		expect(result.error.status).toBe(400);
	});

	it("should reference the env var instead of inlining the secret in the OpenCode config", () => {
		// Arrange
		const secret = "sk-1234567890abcdef1234";

		// Act
		const result = useEmitAgentConfig("opencode", { provider: "openai", secret, reveal: true });

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		const content = result.data.files[0].content;
		expect(content).toContain("{env:OPENAI_API_KEY}");
		expect(content).not.toContain(secret);
	});

	it("should embed registered MCP servers in the OpenCode config", () => {
		// Arrange
		const mcpServers = [
			{
				name: "context7",
				type: "remote" as const,
				url: "https://mcp.context7.com/mcp",
			},
		];

		// Act
		const result = useEmitAgentConfig("opencode", {
			provider: "openai",
			secret: "sk-abc",
			mcpServers,
		});

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		const parsed = JSON.parse(result.data.files[0].content) as {
			mcp: { servers: Record<string, { type: string; url: string }> };
		};
		expect(parsed.mcp.servers.context7.url).toBe("https://mcp.context7.com/mcp");
	});

	it("should mask the secret in the preview unless reveal is set", () => {
		// Arrange
		const secret = "sk-1234567890abcdef1234";

		// Act
		const result = useEmitAgentConfig("claude-code", { provider: "anthropic", secret });

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		const content = result.data.files[0].content;
		expect(content).toContain("sk-12345••••••••••1234");
		expect(content).not.toContain(secret);
		expect(result.data.manual[0].value).not.toContain(secret);
	});

	it("should emit the real secret only when reveal is set", () => {
		// Arrange
		const secret = "sk-1234567890abcdef1234";

		// Act
		const result = useEmitAgentConfig("claude-code", {
			provider: "anthropic",
			secret,
			reveal: true,
		});

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.files[0].content).toContain(secret);
		expect(result.data.manual[0].value).toContain(secret);
	});

	it("should place the base url as ANTHROPIC_BASE_URL for claude-code", () => {
		// Arrange & Act
		const result = useEmitAgentConfig("claude-code", {
			provider: "anthropic",
			secret: "sk-abc",
			baseUrl: "https://gateway.example.com",
			reveal: true,
		});

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.files[0].content).toContain(
			'"ANTHROPIC_BASE_URL": "https://gateway.example.com"',
		);
	});

	it("should warn that the claude-code file holds the key in plaintext", () => {
		// Arrange & Act
		const result = useEmitAgentConfig("claude-code", {
			provider: "anthropic",
			secret: "sk-abc",
			reveal: true,
		});

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.notes.join(" ")).toContain("plaintext");
	});

	it("should honor a custom env name", () => {
		// Arrange & Act
		const result = useEmitAgentConfig("claude-code", {
			provider: "anthropic",
			secret: "sk-abc",
			apiKeyEnv: "ANTHROPIC_AUTH_TOKEN",
			reveal: true,
		});

		// Assert
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.data.files[0].content).toContain('"ANTHROPIC_AUTH_TOKEN"');
	});
});
