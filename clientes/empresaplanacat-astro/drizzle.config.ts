import { defineConfig } from "drizzle-kit";

process.loadEnvFile(".env");

export default defineConfig({
	dialect: "turso",
	schema: "./db/schema.ts",
	out: "./drizzle",
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL ?? "",
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
});
