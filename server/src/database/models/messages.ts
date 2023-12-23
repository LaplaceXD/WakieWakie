import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { conversations } from "./conversations";
import { users } from "./users";

export const messages = pgTable("messages", {
  id: uuid("message_id").notNull().primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull().default(""),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type MessageModel = typeof messages.$inferSelect;
