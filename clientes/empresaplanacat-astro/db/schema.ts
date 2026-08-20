import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const USUARIO_ROLES = ["client", "worker", "admin"] as const;
export type UsuarioRole = (typeof USUARIO_ROLES)[number];

export const lines = sqliteTable("lines", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
	pdfUrl: text("pdf_url").notNull(),
});

export const schedules = sqliteTable(
	"schedules",
	{
		id: integer("id").primaryKey(),
		lineId: integer("line_id").notNull().references(() => lines.id),
		originTown: text("origin_town").notNull(),
		destinationTown: text("destination_town").notNull(),
		departureTime: text("departure_time").notNull(),
		arrivalTime: text("arrival_time").notNull(),
		duration: text("duration").notNull(),
		stopsJson: text("stops_json").notNull(),
	},
	(table) => [index("idx_schedules_line").on(table.lineId)],
);

export const lineConnections = sqliteTable(
	"line_connections",
	{
		id: integer("id").primaryKey(),
		fromLineId: integer("from_line_id").notNull().references(() => lines.id),
		atStop: text("at_stop").notNull(),
		toLineId: integer("to_line_id").notNull().references(() => lines.id),
		waitMin: integer("wait_min").notNull().default(0),
	},
	(table) => [index("idx_line_connections_from").on(table.fromLineId)],
);

export const usuarios = sqliteTable("usuarios", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	fullName: text("full_name", { length: 30 }).notNull(),
	phone: text("phone").notNull(),
	email: text("email").notNull().unique(),
	passkeyHash: text("passkey_hash").notNull(),
	username: text("username", { length: 15 }).notNull().unique(),
	role: text("role", { enum: USUARIO_ROLES }).notNull().default("client"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});
