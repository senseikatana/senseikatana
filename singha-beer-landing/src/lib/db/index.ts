import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn(
    "DATABASE_URL not configured. Set it in .env.local"
  );
}

const client = postgres(databaseUrl || "postgresql://localhost:5432/singha");
export const db = drizzle(client, { schema });
