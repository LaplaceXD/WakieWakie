import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
  id: uuid("conversation_id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ConversationModel = typeof conversations.$inferSelect;
