import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/**
 * Tabla de mensajes de contacto.
 * Almacena los mensajes enviados desde el formulario de contacto.
 */
export const contacts = pgTable(
  "contacts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 100 }).notNull(),
    message: text("message").notNull(),
    ageVerified: boolean("age_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("contacts_email_idx").on(table.email),
    index("contacts_created_at_idx").on(table.createdAt),
  ]
);

/**
 * Tabla de analytics/eventos.
 * Registrar eventos de la landing page (page views, CTA clicks, etc).
 */
export const analytics = pgTable(
  "analytics",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    event: varchar("event", { length: 100 }).notNull(),
    page: varchar("page", { length: 255 }),
    metadata: text("metadata"), // JSON string para datos adicionales
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("analytics_event_idx").on(table.event),
    index("analytics_created_at_idx").on(table.createdAt),
  ]
);

/**
 * Tabla de suscriptores de newsletter (preparada para futuro).
 */
export const subscribers = pgTable(
  "subscribers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    source: varchar("source", { length: 100 }), // Por dónde llegaron
    subscribedAt: timestamp("subscribed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  },
  (table) => [
    index("subscribers_email_idx").on(table.email),
  ]
);
