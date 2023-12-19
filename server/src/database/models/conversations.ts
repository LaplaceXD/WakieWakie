import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const conversations = sqliteTable("conversations", {
  id: text("conversation_id").primaryKey().notNull().$defaultFn(randomUUID),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
