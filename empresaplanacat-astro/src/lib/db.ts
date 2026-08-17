import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const url = import.meta.env.TURSO_DATABASE_URL;
const authToken = import.meta.env.TURSO_AUTH_TOKEN;

if (!url) {
	throw new Error("TURSO_DATABASE_URL is not set. Copy .env.example to .env and fill in your Turso credentials.");
}

export const client = createClient({
	url,
	authToken,
});

export const db = drizzle(client);
