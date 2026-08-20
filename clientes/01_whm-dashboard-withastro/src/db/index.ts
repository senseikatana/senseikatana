// src/db/index.ts
// Stub for database connection
// TODO: Configure actual database connection with Drizzle ORM

export const db = {
  select: () => ({
    from: () => ({
      where: () => ({
        limit: () => Promise.resolve([]),
      }),
    }),
  }),
  insert: () => ({
    values: () => Promise.resolve(),
  }),
};
