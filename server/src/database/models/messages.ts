import { relations } from "drizzle-orm";
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
  receivedAt: timestamp("received_at"),
  seenedAt: timestamp("seened_at"),
  deletedAt: timestamp("deleted_at"),
  updatedAt: timestamp("updated_at"),
});

export const userMessages = relations(users, ({ many }) => ({
  messages: many(messages),
}));

export const conversationMessages = relations(conversations, ({ many }) => ({
  messages: many(messages),
}));

export const messageRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations),
  user: one(users),
}));

export type Message = typeof messages.$inferSelect;
