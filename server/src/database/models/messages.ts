import { randomUUID } from "crypto";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { relations, sql } from "drizzle-orm";
import { conversations } from "./conversations";
import { users } from "./users";

export const messages = sqliteTable("messages", {
  id: text("message_id").notNull().$defaultFn(randomUUID),
  conversationId: text("conversation_id")
    .notNull()
    .references(() => conversations.id),
  senderId: text("sender_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull().default(""),
  sentAt: int("sent_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  receivedAt: int("received_at", { mode: "timestamp" }),
  seenedAt: int("seened_at", { mode: "timestamp" }),
  deletedAt: int("deleted_at", { mode: "timestamp" }),
  updatedAt: int("updated_at", { mode: "timestamp" }),
});

export const userMessages = relations(users, ({ many }) => ({
  messages: many(messages),
}));

export const conversationMessages = relations(conversations, ({ many }) => ({
  messages: many(messages),
}));

export const messageConversation = relations(messages, ({ one }) => ({
  conversation: one(conversations),
}));

export const messageUser = relations(messages, ({ one }) => ({
  user: one(users),
}));
